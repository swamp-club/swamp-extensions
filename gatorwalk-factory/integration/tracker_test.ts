// Swamp, an Automation Framework Copyright (C) 2026 System Initiative, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify it under the terms
// of the GNU Affero General Public License version 3 as published by the Free
// Software Foundation, with the Swamp Extension and Definition Exception (found in
// the "COPYING-EXCEPTION" file).
//
// Swamp is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
// PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License along
// with Swamp. If not, see <https://www.gnu.org/licenses/>.

import { assert, assertEquals } from "@std/assert";
import { parse as parseYaml, stringify as stringifyYaml } from "@std/yaml";
import {
  FAKE_TOKEN,
  ISSUE_UUID,
  linearFake,
} from "../extensions/models/_lib/linear_fake.ts";
import { LINEAR_TYPE, withRepo } from "./harness.ts";

// ---------------------------------------------------------------------------
// The Linear adapter on the real engine: its token comes from a vault made
// inside the temp repo (a local_encryption vault keeps its key there too, so
// no vault of the host is touched), and it talks to the local Linear fake.
// This is the only test of vault wiring: that swamp resolves the vault.get
// expression at run time, and that the token stays out of the definition
// and the run's output.
// ---------------------------------------------------------------------------

Deno.test("tracker: the Linear adapter takes its token from a vault and delivers a keyed comment once", async () => {
  const fake = linearFake();
  try {
    await withRepo(async (repo) => {
      await repo.swamp(["vault", "create", "local_encryption", "secrets"]);
      await repo.swamp(["vault", "put", "secrets", "linear-token", FAKE_TOKEN]);

      const { stdout } = await repo.swamp([
        "model",
        "create",
        LINEAR_TYPE,
        "linear",
        "--json",
      ]);
      const path = (JSON.parse(stdout) as { path: string }).path;
      const definition = parseYaml(await Deno.readTextFile(path)) as Record<
        string,
        unknown
      >;
      definition.globalArguments = {
        apiToken: "${{ vault.get(secrets, linear-token) }}",
        apiUrl: fake.url,
        statuses: { started: "In Progress" },
      };
      await Deno.writeTextFile(path, stringifyYaml(definition));

      const method = (name: string, inputs: Record<string, string>) =>
        repo.swamp([
          "model",
          "method",
          "run",
          "linear",
          name,
          ...Object.entries(inputs).flatMap((
            [k, v],
          ) => ["--input", `${k}=${v}`]),
          "--log",
        ]);

      const fetched = await method("fetch_issue", { issue: "GW-16" });
      assert(fetched.output.includes(ISSUE_UUID), fetched.output);
      assertEquals(fake.requests[0].authorization, FAKE_TOKEN);

      const key = { workItem: "build-abcdefgh", journalVersion: "3" };
      const first = await method("comment", {
        issue: ISSUE_UUID,
        body: "Planned",
        ...key,
      });
      const second = await method("comment", {
        issue: ISSUE_UUID,
        body: "Planned",
        ...key,
      });
      assertEquals(fake.comments.length, 1);
      assert(second.output.includes("already delivered"), second.output);
      const ledger = await repo.data(
        "linear",
        "delivery-comment-build-abcdefgh-3",
      );
      assertEquals(
        (ledger.result as { id: string }).id,
        fake.comments[0].id,
      );

      await method("set_status", { issue: ISSUE_UUID, status: "started" });
      assertEquals(fake.issues[0].stateId, "state-progress");

      for (const result of [fetched, first, second]) {
        assert(!result.output.includes(FAKE_TOKEN), "the token is not output");
      }
      assert(
        !(await Deno.readTextFile(path)).includes(FAKE_TOKEN),
        "the definition keeps the vault expression, not the token",
      );
    });
  } finally {
    await fake.close();
  }
});
