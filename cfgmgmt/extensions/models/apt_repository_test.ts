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
import { model } from "./apt_repository.ts";
import { fakeContext, type FakeRule, withFakeSsh } from "./_lib/fake_ssh.ts";

const SOURCES = "/etc/apt/sources.list.d/docker.sources";
const KEY = "/usr/share/keyrings/docker.gpg";

function args(overrides: Record<string, unknown> = {}) {
  return model.globalArguments.parse({
    nodeHost: "web-1",
    name: "docker",
    uris: ["https://download.docker.com/linux/ubuntu"],
    suites: ["noble"],
    components: ["stable"],
    signedBy: KEY,
    gpgKeyUrl: "https://download.docker.com/linux/ubuntu/gpg",
    ...overrides,
  });
}

// The repo file is missing; the key is missing.
const MISSING: FakeRule[] = [{ match: "cat '/etc/apt", exitCode: 1 }];

async function expectFailure(
  rules: FakeRule[],
  overrides: Record<string, unknown>,
  message: string,
) {
  await withFakeSsh(rules, async (fake) => {
    const ctx = fakeContext(args(overrides));
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      message,
    );
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].data.status, "failed");
    assertEquals(await fake.uploads(), new Map());
  });
}

Deno.test("apt_repository apply: key is downloaded, dearmored and repo written", async () => {
  await withFakeSsh(MISSING, async (fake) => {
    const ctx = fakeContext(args());
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    const cmds = await fake.commands();
    assertEquals(cmds.includes("mkdir -p '/usr/share/keyrings'"), true);
    assertEquals(cmds.some((c) => c.startsWith("gpg --dearmor")), true);
    assertEquals(cmds.some((c) => c.startsWith("cp ")), false);
    assertEquals(
      cmds.some((c) => c.startsWith("rm -f '/tmp/.swamp-gpgkey-")),
      true,
    );
    assertEquals([...(await fake.uploads()).keys()], [SOURCES]);
  });
});

Deno.test("apt_repository apply: a binary key is copied when dearmor fails", async () => {
  await withFakeSsh([
    ...MISSING,
    { match: "gpg --dearmor", exitCode: 2 },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    assertEquals(
      (await fake.commands()).some((c) =>
        c.startsWith("cp '/tmp/.swamp-gpgkey-") && c.endsWith(` '${KEY}'`)
      ),
      true,
    );
  });
});

Deno.test("apt_repository apply: a failed mkdir records failed", async () => {
  await expectFailure(
    [...MISSING, { match: "mkdir -p", exitCode: 1 }],
    {},
    "mkdir failed with exit code 1",
  );
});

Deno.test("apt_repository apply: a failed key download records failed", async () => {
  await withFakeSsh([
    ...MISSING,
    { match: "curl -fsSL", exitCode: 22, stdout: "404\n" },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "GPG key download failed with exit code 22",
    );
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].data.status, "failed");
    const cmds = await fake.commands();
    assertEquals(cmds.some((c) => c.startsWith("gpg --dearmor")), false);
    assertEquals(
      cmds.some((c) => c.startsWith("rm -f '/tmp/.swamp-gpgkey-")),
      true,
    );
    assertEquals(await fake.uploads(), new Map());
  });
});

Deno.test("apt_repository apply: failed dearmor and failed copy records failed", async () => {
  await expectFailure(
    [
      ...MISSING,
      { match: "gpg --dearmor", exitCode: 2 },
      { match: "cp '/tmp/", exitCode: 1 },
    ],
    {},
    "GPG key install failed with exit code 1",
  );
});

// Absent: the repo file and key both exist.
const PRESENT: FakeRule[] = [
  { match: "cat '/etc/apt", stdout: "Types: deb\n" },
  { match: "test -f", stdout: "Y\n" },
];

Deno.test("apt_repository apply: a failed repo file removal records failed", async () => {
  await expectFailure(
    [{ match: `rm -f '${SOURCES}'`, exitCode: 1 }, ...PRESENT],
    { ensure: "absent" },
    "rm repository file failed with exit code 1",
  );
});

Deno.test("apt_repository apply: a failed key removal records failed", async () => {
  await expectFailure(
    [{ match: `rm -f '${KEY}'`, exitCode: 1 }, ...PRESENT],
    { ensure: "absent" },
    "rm GPG key failed with exit code 1",
  );
});

const SECRET = "s3cret-sudo-pw";

/** Every log line, flattened, so a test can assert a secret never appears. */
function logText(logs: { message: string; props?: unknown }[]): string {
  return logs.map((l) => `${l.message} ${JSON.stringify(l.props)}`).join("\n");
}

const DESIRED = "Types: deb\n" +
  "URIs: https://download.docker.com/linux/ubuntu\n" +
  "Suites: noble\n" +
  "Components: stable\n" +
  `Signed-By: ${KEY}\n`;

Deno.test("apt_repository check: matching repo file and key are compliant", async () => {
  await withFakeSsh([
    { match: "cat '/etc/apt", stdout: DESIRED },
    { match: "test -f", stdout: "Y\n" },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].name, "web-1");
    assertEquals(ctx.writes[0].data.status, "compliant");
    assertEquals(ctx.writes[0].data.changes, []);
    assertEquals(await fake.uploads(), new Map());
  });
});

Deno.test("apt_repository check: missing file and key are reported, nothing changed", async () => {
  await withFakeSsh(MISSING, async (fake) => {
    const ctx = fakeContext(args());
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "non_compliant");
    assertEquals(ctx.writes[0].data.changes, [
      "download GPG key",
      "create repository file",
    ]);
    assertEquals(await fake.uploads(), new Map());
    for (const cmd of await fake.commands()) {
      assertEquals(/curl|wget|gpg |rm |mkdir/.test(cmd), false, cmd);
    }
  });
});

// Under become, commands are re-quoted inside `sh -c`, so these rules match
// unquoted fragments; the staged-install script (`set -e`) succeeds.
const MISSING_BECOME: FakeRule[] = [
  { match: "set -e" },
  { match: "sources.list.d", exitCode: 1 },
];

Deno.test("apt_repository: methods log entry and completion without leaking the sudo password", async () => {
  await withFakeSsh(MISSING_BECOME, async () => {
    const ctx = fakeContext(args({ become: true, becomePassword: SECRET }));
    await model.methods.apply.execute({}, ctx);
    const infos = ctx.logs.filter((l) => l.level === "info");
    assertEquals(infos.length, 2);
    assertStringIncludes(infos[0].message, "{name}");
    assertEquals(infos[0].props?.name, "docker");
    assertEquals(infos[1].props?.changes, [
      "download GPG key",
      "create repository file",
    ]);
    assertEquals(logText(ctx.logs).includes(SECRET), false);
  });
});

Deno.test("apt_repository: a failure is logged at error level", async () => {
  await withFakeSsh(
    [...MISSING, { match: "mkdir -p", exitCode: 1 }],
    async () => {
      const ctx = fakeContext(args({ become: true, becomePassword: SECRET }));
      await assertRejects(() => model.methods.apply.execute({}, ctx));
      const errors = ctx.logs.filter((l) => l.level === "error");
      assertEquals(errors.length, 1);
      assertEquals(errors[0].props?.host, "web-1");
      assertStringIncludes(String(errors[0].props?.error), "mkdir failed");
      assertEquals(logText(ctx.logs).includes(SECRET), false);
    },
  );
});

Deno.test("apt_repository: a name that is not a plain file name is refused", () => {
  for (const name of ["../../etc/cron.d/x", "a/b", ".hidden", "-x", ""]) {
    assertEquals(
      model.globalArguments.safeParse({ ...args(), name }).success,
      false,
      name,
    );
  }
  assertEquals(model.globalArguments.safeParse(args()).success, true);
});
