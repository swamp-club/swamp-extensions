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
import {
  ADMIN_KEY,
  LAB_ISSUE,
  swampClubFake,
} from "../extensions/models/_lib/swamp_club_fake.ts";
import {
  LINEAR_TYPE,
  SWAMP_CLUB_TYPE,
  type SwampRepo,
  withRepo,
} from "./harness.ts";
import { splitWords } from "./skill_commands.ts";

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

Deno.test("tracker: the swamp-club adapter takes its key from a vault, ripples once per key and posts an attestation once", async () => {
  const fake = swampClubFake();
  const issue = String(LAB_ISSUE);
  const commit = "0123456789abcdef0123456789abcdef01234567";
  try {
    await withRepo(async (repo) => {
      await repo.swamp(["vault", "create", "local_encryption", "secrets"]);
      await repo.swamp(["vault", "put", "secrets", "lab-key", ADMIN_KEY]);

      const { stdout } = await repo.swamp([
        "model",
        "create",
        SWAMP_CLUB_TYPE,
        "lab",
        "--json",
      ]);
      const path = (JSON.parse(stdout) as { path: string }).path;
      const definition = parseYaml(await Deno.readTextFile(path)) as Record<
        string,
        unknown
      >;
      // The key and url are always set, so neither the host's
      // SWAMP_API_KEY (scrubbed anyway) nor its auth.json is read.
      definition.globalArguments = {
        apiKey: "${{ vault.get(secrets, lab-key) }}",
        url: fake.url,
      };
      await Deno.writeTextFile(path, stringifyYaml(definition));

      const method = (name: string, inputs: Record<string, string>) =>
        repo.swamp([
          "model",
          "method",
          "run",
          "lab",
          name,
          ...Object.entries(inputs).flatMap((
            [k, v],
          ) => ["--input", `${k}=${v}`]),
          "--log",
        ]);

      const fetched = await method("fetch_issue", { issue: `#${issue}` });
      assert(fetched.output.includes(`#${issue} (${issue})`), fetched.output);
      const snapshot = await repo.data("lab", `issue-${issue}`);
      assertEquals(snapshot.tracker, "swamp-club");
      assertEquals(fake.requests[0].authorization, `Bearer ${ADMIN_KEY}`);

      const key = { workItem: "build-abcdefgh", journalVersion: "3" };
      const first = await method("comment", {
        issue,
        body: "Planned",
        ...key,
      });
      const second = await method("comment", {
        issue,
        body: "Planned",
        ...key,
      });
      assertEquals(fake.comments.length, 1);
      assert(second.output.includes("already delivered"), second.output);
      const ledger = await repo.data(
        "lab",
        "delivery-comment-build-abcdefgh-3",
      );
      assertEquals((ledger.result as { id: string }).id, fake.comments[0].id);

      await method("set_status", { issue, status: "in_progress" });
      assertEquals(fake.issues[0].status, "in_progress");

      await method("assign", { issue, username: "seth" });
      assertEquals(fake.issues[0].assignees.map((a) => a.username), ["seth"]);

      const attestation = JSON.stringify({
        version: "1",
        subject: { commit, branch: "main" },
        gate: { allPassed: true },
      });
      const posted = await method("post_attestation", { attestation });
      const repeat = await method("post_attestation", { attestation });
      assertEquals(fake.attestations.length, 1);
      assert(repeat.output.includes("already posted"), repeat.output);
      const record = await repo.data("lab", `attestation-${commit}`);
      assertEquals(record.id, fake.attestations[0].id);

      for (const result of [fetched, first, second, posted, repeat]) {
        assert(!result.output.includes(ADMIN_KEY), "the key is not output");
      }
      assert(
        !(await Deno.readTextFile(path)).includes(ADMIN_KEY),
        "the definition keeps the vault expression, not the key",
      );
    });
  } finally {
    await fake.close();
  }
});

/** A swamp-club adapter named lab on the fake, its key from a vault. */
async function labAdapter(repo: SwampRepo, url: string): Promise<void> {
  await repo.swamp(["vault", "create", "local_encryption", "secrets"]);
  await repo.swamp(["vault", "put", "secrets", "lab-key", ADMIN_KEY]);
  const { stdout } = await repo.swamp([
    "model",
    "create",
    SWAMP_CLUB_TYPE,
    "lab",
    "--json",
  ]);
  const path = (JSON.parse(stdout) as { path: string }).path;
  const definition = parseYaml(await Deno.readTextFile(path)) as Record<
    string,
    unknown
  >;
  definition.globalArguments = {
    apiKey: "${{ vault.get(secrets, lab-key) }}",
    url,
  };
  await Deno.writeTextFile(path, stringifyYaml(definition));
}

const MINIMAL = new URL("../testdata/lifecycles/minimal.yaml", import.meta.url);

Deno.test("tracker: claim starts a work item from a Lab issue once, and hands back a reservation after an interrupted start", async () => {
  const fake = swampClubFake();
  const issue = String(LAB_ISSUE);
  try {
    await withRepo(async (repo) => {
      await labAdapter(repo, fake.url);
      await repo.holder(
        "team",
        parseYaml(await Deno.readTextFile(MINIMAL)),
      );
      const claim = (inputs: Record<string, string>) =>
        repo.swamp([
          "model",
          "method",
          "run",
          "lab",
          "claim",
          ...Object.entries(inputs).flatMap((
            [k, v],
          ) => ["--input", `${k}=${v}`]),
          "--log",
        ]);
      const printed = (output: string) => {
        const match = output.match(/Start it: (swamp .* --log)/);
        assert(match !== null, output);
        return match[1];
      };

      const first = await claim({ issue: `#${issue}`, lifecycle: "team" });
      const command = printed(first.output);
      const index = await repo.data("lab", `ticket-${issue}`);
      const key = String(index.key);
      assert(key.startsWith("minimal-"), key);
      assertEquals(index.holder, "team");
      assert(first.output.includes(`is claimed as '${key}'`), first.output);

      // The start never ran: claiming again hands back the same key.
      const again = await claim({ issue });
      assert(again.output.includes("not started yet"), again.output);
      assertEquals(printed(again.output), command);

      // The printed command, as written.
      await repo.swamp(splitWords(command).slice(1));
      const run = await repo.run(key);
      assertEquals(run.externalRefs, {
        "swamp-club": issue,
        "swamp-club.display": `#${issue}`,
      });

      // Read across models on the real engine: the ticket finds its item.
      const started = await claim({ issue: `#${issue}`, lifecycle: "team" });
      assert(
        started.output.includes(
          `is already started: '${key}' at stage 'work'`,
        ),
        started.output,
      );
      assertEquals((await repo.data("lab", `ticket-${issue}`)).key, key);
      assertEquals(fake.comments.length, 0, "claim never writes the ticket");
    });
  } finally {
    await fake.close();
  }
});
