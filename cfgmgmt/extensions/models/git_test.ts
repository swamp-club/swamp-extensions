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

import { assertEquals, assertRejects } from "@std/assert";
import { model } from "./git.ts";
import { fakeContext, type FakeRule, withFakeSsh } from "./_lib/fake_ssh.ts";

const REPO = "https://example.com/app.git";

function args(overrides: Record<string, unknown> = {}) {
  return model.globalArguments.parse({
    nodeHost: "web-1",
    path: "/srv/app",
    repo: REPO,
    ensure: "present",
    ...overrides,
  });
}

// An existing checkout on main with a stale origin and owner.
const EXISTING: FakeRule[] = [
  { match: "'/srv/app' &&", stdout: "Y\n" },
  { match: "'/srv/app/.git' &&", stdout: "Y\n" },
  { match: "rev-parse HEAD", stdout: "0123456789abcdef\n" },
  { match: "symbolic-ref", stdout: "main\n" },
  { match: "remote get-url", stdout: "https://example.com/old.git\n" },
  { match: "stat -c", stdout: "root|root\n" },
];

const UPDATE_ARGS = { revision: "release", owner: "app" };

async function expectFailure(
  rules: FakeRule[],
  overrides: Record<string, unknown>,
  message: string,
) {
  await withFakeSsh(rules, async () => {
    const ctx = fakeContext(args(overrides));
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      message,
    );
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].data.status, "failed");
  });
}

Deno.test("git apply: an existing checkout is updated in order", async () => {
  await withFakeSsh(EXISTING, async (fake) => {
    const ctx = fakeContext(args(UPDATE_ARGS));
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    const mutating = (await fake.commands()).filter((c) =>
      /set-url|fetch|checkout|pull|chown/.test(c)
    );
    assertEquals(mutating, [
      `git -C '/srv/app' remote set-url origin '${REPO}'`,
      "git -C '/srv/app' fetch origin",
      "git -C '/srv/app' checkout 'release'",
      "git -C '/srv/app' pull origin 'release'",
      "chown -R 'app' '/srv/app'",
    ]);
  });
});

for (
  const [match, what] of [
    ["remote set-url", "git remote set-url"],
    ["fetch origin", "git fetch origin"],
    ["checkout", "git checkout"],
    ["pull origin", "git pull"],
    ["chown -R", "chown -R"],
  ]
) {
  Deno.test(`git apply: a failed ${what} on an existing checkout records failed`, async () => {
    await expectFailure(
      [{ match, exitCode: 1 }, ...EXISTING],
      UPDATE_ARGS,
      `${what} failed with exit code 1`,
    );
  });
}

Deno.test("git apply: a failed commit checkout on an existing checkout records failed", async () => {
  await expectFailure(
    [{ match: "checkout", exitCode: 1 }, ...EXISTING],
    { repo: "https://example.com/old.git", revision: "fedcba9" },
    "git checkout failed with exit code 1",
  );
});

const CLONE_ARGS = { revision: "abcdef1", depth: 1 };

for (
  const [match, what] of [
    ["git clone", "git clone"],
    ["fetch --unshallow", "git fetch --unshallow"],
    ["checkout", "git checkout"],
  ]
) {
  Deno.test(`git apply: a failed ${what} during clone records failed`, async () => {
    await expectFailure([{ match, exitCode: 1 }], CLONE_ARGS, `${what} failed`);
  });
}

Deno.test("git apply: a failed rm -rf records failed", async () => {
  await expectFailure(
    [{ match: "rm -rf", exitCode: 1 }, ...EXISTING],
    { ensure: "absent" },
    "rm -rf failed with exit code 1",
  );
});

const SECRET = "sudo-pw-s3cret";

/** Every logged message and prop, as one string, for leak checks. */
function logged(ctx: { logs: unknown[] }): string {
  return JSON.stringify(ctx.logs);
}

Deno.test("git check: logs entry and completion without the sudo password", async () => {
  await withFakeSsh(EXISTING, async () => {
    const ctx = fakeContext(
      args({
        repo: "https://example.com/old.git",
        becomePassword: SECRET,
      }),
    );
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "compliant");
    assertEquals(ctx.logs.map((l) => [l.level, l.message]), [
      ["info", "Checking repository {path} on {host}"],
      [
        "info",
        "Repository {path} on {host} is {status} ({changeCount} changes)",
      ],
    ]);
    assertEquals(logged(ctx).includes(SECRET), false);
  });
});

Deno.test("git check: credentials in the repo URL are neither compared nor recorded", async () => {
  const token = "ghp_tokenvalue";
  await withFakeSsh([
    { match: "'/srv/app' &&", stdout: "Y\n" },
    { match: "'/srv/app/.git' &&", stdout: "Y\n" },
    { match: "rev-parse HEAD", stdout: "0123456789abcdef\n" },
    { match: "symbolic-ref", stdout: "main\n" },
    {
      match: "remote get-url",
      stdout: `https://deploy:${token}@example.com/app.git\n`,
    },
    { match: "stat -c", stdout: "root|root\n" },
  ], async () => {
    const ctx = fakeContext(
      args({ repo: `https://deploy:${token}@example.com/app.git` }),
    );
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "compliant");
    const recorded = JSON.stringify(ctx.writes) + logged(ctx);
    assertEquals(recorded.includes(token), false);
  });
});

Deno.test("git apply: a failure is logged at error level", async () => {
  await withFakeSsh(
    [{ match: "rm -rf", exitCode: 1 }, ...EXISTING],
    async () => {
      const ctx = fakeContext(
        args({ ensure: "absent", becomePassword: SECRET }),
      );
      await assertRejects(() => model.methods.apply.execute({}, ctx));
      const last = ctx.logs[ctx.logs.length - 1];
      assertEquals(last.level, "error");
      assertEquals(
        last.message,
        "Applying repository {path} on {host} failed: {error}",
      );
      assertEquals(logged(ctx).includes(SECRET), false);
    },
  );
});
