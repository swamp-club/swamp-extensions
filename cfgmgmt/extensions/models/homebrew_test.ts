// Copyright (C) 2026 Adam Jacob
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.
import { assertEquals, assertRejects, assertStringIncludes } from "@std/assert";
import { model } from "./homebrew.ts";
import { fakeContext, withFakeSsh } from "./_lib/fake_ssh.ts";

function args(overrides: Record<string, unknown> = {}) {
  return model.globalArguments.parse({
    nodeHost: "mac-1",
    packages: ["jq"],
    ...overrides,
  });
}

Deno.test("homebrew apply: failed install keeps the detailed failed record", async () => {
  await withFakeSsh([
    { match: "brew list", exitCode: 1 },
    { match: "brew install", stdout: "Error: No formula jq\n", exitCode: 1 },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "brew install failed with exit code 1",
    );
    assertEquals(ctx.writes.length, 1);
    const data = ctx.writes[0].data;
    assertEquals(data.status, "failed");
    assertEquals(data.changes, ["install jq"]);
    assertEquals(data.stdout, "Error: No formula jq\n");
    assertEquals(data.packages, [
      { name: "jq", installed: false, version: null },
    ]);
    assertEquals((await fake.commands()).includes("brew install 'jq'"), true);
  });
});

const SECRET = "s3cret-sudo-pw";

/** Every log line, flattened, so a test can assert a secret never appears. */
function logText(logs: { message: string; props?: unknown }[]): string {
  return logs.map((l) => `${l.message} ${JSON.stringify(l.props)}`).join("\n");
}

Deno.test("homebrew check: installed packages are compliant", async () => {
  await withFakeSsh([
    { match: "brew list --formula '", stdout: "jq 1.7.1\n" },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].name, "mac-1");
    assertEquals(ctx.writes[0].data.status, "compliant");
    assertEquals(ctx.writes[0].data.changes, []);
    assertEquals(ctx.writes[0].data.error, null);
    assertEquals(
      (ctx.writes[0].data.packages as { installed: boolean }[])[0].installed,
      true,
    );
    for (const cmd of await fake.commands()) {
      assertEquals(
        / install | remove | uninstall |-S |-R /.test(cmd),
        false,
        cmd,
      );
    }
  });
});

Deno.test("homebrew apply: ensure absent removes an installed package", async () => {
  await withFakeSsh([
    { match: "brew list --formula '", stdout: "jq 1.7.1\n" },
  ], async (fake) => {
    const ctx = fakeContext(args({ ensure: "absent" }));
    await model.methods.apply.execute({}, ctx);
    const last = ctx.writes[ctx.writes.length - 1];
    assertEquals(last.data.status, "applied");
    assertEquals(last.data.changes, ["remove jq"]);
    assertEquals(
      (await fake.commands()).some((c) =>
        c.includes("'jq'") && /remove|uninstall|-R /.test(c)
      ),
      true,
    );
  });
});

Deno.test("homebrew list: records every installed package", async () => {
  await withFakeSsh([
    {
      match: "brew list --formula --versions",
      stdout: "jq 1.7.1\nwget 1.24.5\n",
    },
  ], async () => {
    const ctx = fakeContext(args());
    await model.methods.list.execute({}, ctx);
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].specName, "installed");
    assertEquals(ctx.writes[0].data.count, 2);
  });
});

Deno.test("homebrew check: an unexpected failure records failed and throws", async () => {
  await withFakeSsh([
    { match: "brew list --formula '", exitCode: 1 },
  ], async () => {
    // A query that exits 1 reads as "not installed", so the unexpected failure
    // is injected at the first state write instead.
    const ctx = fakeContext(args());
    const realWrite = ctx.writeResource;
    let first = true;
    ctx.writeResource = (spec, name, data) => {
      if (first) {
        first = false;
        return Promise.reject(new Error("datastore unavailable"));
      }
      return realWrite(spec, name, data);
    };
    await assertRejects(
      () => model.methods.check.execute({}, ctx),
      Error,
      "datastore unavailable",
    );
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].data.status, "failed");
    assertEquals(ctx.writes[0].data.packages, null);
    assertEquals(ctx.writes[0].data.error, "datastore unavailable");
  });
});

Deno.test("homebrew: methods log entry and completion without leaking the sudo password", async () => {
  await withFakeSsh([
    { match: "brew list --formula '", stdout: "jq 1.7.1\n" },
  ], async () => {
    const ctx = fakeContext(args({ become: true, becomePassword: SECRET }));
    await model.methods.check.execute({}, ctx);
    const infos = ctx.logs.filter((l) => l.level === "info");
    assertEquals(infos.length, 2);
    assertStringIncludes(infos[0].message, "{host}");
    assertEquals(infos[0].props?.host, "mac-1");
    assertEquals(infos[1].props?.status, "compliant");
    assertEquals(logText(ctx.logs).includes(SECRET), false);
  });
});

Deno.test("homebrew: a failure is logged at error level without leaking the sudo password", async () => {
  await withFakeSsh([
    { match: "brew update", stdout: "boom\n", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(args({ become: true, becomePassword: SECRET }));
    await assertRejects(() => model.methods.refresh.execute({}, ctx));
    const errors = ctx.logs.filter((l) => l.level === "error");
    assertEquals(errors.length, 1);
    assertEquals(errors[0].props?.host, "mac-1");
    assertEquals(typeof errors[0].props?.error, "string");
    assertEquals(logText(ctx.logs).includes(SECRET), false);
  });
});

Deno.test("homebrew: a package name the package manager could read as an option is refused", () => {
  for (const name of ["-y", "--reinstall", "two words", ""]) {
    assertEquals(
      model.globalArguments.safeParse({ nodeHost: "web-1", packages: [name] })
        .success,
      false,
      name,
    );
  }
});
