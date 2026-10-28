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
import { model } from "./dnf_repository.ts";
import { fakeContext, withFakeSsh } from "./_lib/fake_ssh.ts";

const REPO = "/etc/yum.repos.d/docker-ce-stable.repo";
const SECRET = "s3cret-sudo-pw";

function args(overrides: Record<string, unknown> = {}) {
  return model.globalArguments.parse({
    nodeHost: "web-1",
    name: "docker-ce-stable",
    description: "Docker CE Stable",
    baseurl: "https://download.example.com/linux/fedora/$releasever/stable",
    gpgkey: "https://download.example.com/linux/fedora/gpg",
    ...overrides,
  });
}

const DESIRED = "[docker-ce-stable]\n" +
  "name=Docker CE Stable\n" +
  "baseurl=https://download.example.com/linux/fedora/$releasever/stable\n" +
  "enabled=1\n" +
  "gpgcheck=1\n" +
  "gpgkey=https://download.example.com/linux/fedora/gpg\n";

/** Every log line, flattened, so a test can assert a secret never appears. */
function logText(logs: { message: string; props?: unknown }[]): string {
  return logs.map((l) => `${l.message} ${JSON.stringify(l.props)}`).join("\n");
}

Deno.test("dnf_repository check: a matching .repo file is compliant", async () => {
  await withFakeSsh([
    { match: `cat '${REPO}'`, stdout: DESIRED },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].specName, "state");
    assertEquals(ctx.writes[0].name, "web-1");
    assertEquals(ctx.writes[0].data, {
      name: "docker-ce-stable",
      status: "compliant",
      current: { repoFileExists: true, repoContent: DESIRED },
      changes: [],
      error: null,
      timestamp: ctx.writes[0].data.timestamp,
    });
    assertEquals(await fake.uploads(), new Map());
  });
});

Deno.test("dnf_repository check: drift is reported without changing anything", async () => {
  await withFakeSsh([
    {
      match: `cat '${REPO}'`,
      stdout: DESIRED.replace("enabled=1", "enabled=0"),
    },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "non_compliant");
    assertEquals(ctx.writes[0].data.changes, ["update repository file"]);
    assertEquals(await fake.uploads(), new Map());
    for (const cmd of await fake.commands()) {
      assertEquals(/rm |mv /.test(cmd), false, cmd);
    }
  });
});

Deno.test("dnf_repository apply: a missing .repo file is written", async () => {
  await withFakeSsh([
    { match: `cat '${REPO}'`, exitCode: 1 },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].data.status, "applied");
    assertEquals(ctx.writes[0].data.changes, ["create repository file"]);
    assertEquals(await fake.uploads(), new Map([[REPO, DESIRED]]));
  });
});

Deno.test("dnf_repository apply: a compliant repo is left alone", async () => {
  await withFakeSsh([
    { match: `cat '${REPO}'`, stdout: DESIRED },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "compliant");
    assertEquals(await fake.uploads(), new Map());
  });
});

Deno.test("dnf_repository apply: ensure absent removes the .repo file", async () => {
  await withFakeSsh([
    { match: `cat '${REPO}'`, stdout: DESIRED },
  ], async (fake) => {
    const ctx = fakeContext(args({ ensure: "absent" }));
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    assertEquals(ctx.writes[0].data.changes, ["remove repository file"]);
    assertEquals((await fake.commands()).includes(`rm -f '${REPO}'`), true);
  });
});

Deno.test("dnf_repository apply: a failed removal records failed and throws", async () => {
  await withFakeSsh([
    { match: `rm -f '${REPO}'`, exitCode: 1 },
    { match: `cat '${REPO}'`, stdout: DESIRED },
  ], async () => {
    const ctx = fakeContext(args({ ensure: "absent" }));
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "rm repository file failed with exit code 1",
    );
    assertEquals(ctx.writes.length, 1);
    const data = ctx.writes[0].data;
    assertEquals(data.status, "failed");
    assertEquals(data.current, { repoFileExists: false, repoContent: null });
    assertEquals(data.changes, []);
    assertStringIncludes(String(data.error), "rm repository file failed");
  });
});

// Under become, commands are re-quoted inside `sh -c`, so these rules match
// unquoted fragments; the staged-install script (`set -e`) succeeds.
Deno.test("dnf_repository: methods log entry and completion without leaking the sudo password", async () => {
  await withFakeSsh([
    { match: "set -e" },
    { match: "yum.repos.d", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(args({ become: true, becomePassword: SECRET }));
    await model.methods.apply.execute({}, ctx);
    const infos = ctx.logs.filter((l) => l.level === "info");
    assertEquals(infos.length, 2);
    assertStringIncludes(infos[0].message, "{name}");
    assertEquals(infos[0].props?.name, "docker-ce-stable");
    assertEquals(infos[1].props?.changes, ["create repository file"]);
    assertEquals(logText(ctx.logs).includes(SECRET), false);
  });
});

Deno.test("dnf_repository: a failure is logged at error level", async () => {
  await withFakeSsh([
    { match: "rm -f", exitCode: 1 },
    { match: "yum.repos.d", stdout: DESIRED },
  ], async () => {
    const ctx = fakeContext(
      args({ ensure: "absent", become: true, becomePassword: SECRET }),
    );
    await assertRejects(() => model.methods.apply.execute({}, ctx));
    const errors = ctx.logs.filter((l) => l.level === "error");
    assertEquals(errors.length, 1);
    assertEquals(errors[0].props?.name, "docker-ce-stable");
    assertEquals(logText(ctx.logs).includes(SECRET), false);
  });
});

Deno.test("dnf_repository: a name that is not a plain file name is refused", () => {
  for (const name of ["../../etc/cron.d/x", "a/b", ".hidden", "-x", ""]) {
    assertEquals(
      model.globalArguments.safeParse({ ...args(), name }).success,
      false,
      name,
    );
  }
  assertEquals(model.globalArguments.safeParse(args()).success, true);
});
