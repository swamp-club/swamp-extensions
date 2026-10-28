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
import { model } from "./archive.ts";
import { fakeContext, withFakeSsh } from "./_lib/fake_ssh.ts";

const base = {
  nodeHost: "app-1",
  source: "/tmp/app.tar.gz",
  dest: "/opt/app",
};

function args(overrides: Record<string, unknown> = {}) {
  return model.globalArguments.parse({ ...base, ...overrides });
}

Deno.test("archive check: unknown extension fails instead of assuming tar.gz", async () => {
  await withFakeSsh([
    { match: "test -f", stdout: "Y\n" },
    { match: "ls -A", stdout: "NONE\n" },
  ], async () => {
    const ctx = fakeContext(args({ source: "/tmp/app.bin" }));
    await assertRejects(
      () => model.methods.check.execute({}, ctx),
      Error,
      "set format explicitly",
    );
    assertEquals(ctx.writes[0].data.status, "failed");
  });
});

Deno.test("archive apply: unknown extension fails before touching dest", async () => {
  await withFakeSsh([
    { match: "test -f", stdout: "Y\n" },
    { match: "ls -A", stdout: "NONE\n" },
  ], async (fake) => {
    const ctx = fakeContext(args({ source: "/tmp/app.bin" }));
    await assertRejects(() => model.methods.apply.execute({}, ctx));
    assertEquals(ctx.writes[0].data.status, "failed");
    for (const cmd of await fake.commands()) {
      assertEquals(/mkdir|tar |unzip/.test(cmd), false, cmd);
    }
  });
});

Deno.test("archive apply: explicit format overrides an unknown extension", async () => {
  await withFakeSsh([
    { match: "test -f", stdout: "Y\n" },
    { match: "ls -A", stdout: "NONE\n" },
  ], async (fake) => {
    const ctx = fakeContext(args({ source: "/tmp/app.bin", format: "tar.xz" }));
    await model.methods.apply.execute({}, ctx);
    assertEquals(
      (await fake.commands()).includes(
        "tar -xJf '/tmp/app.bin' -C '/opt/app'",
      ),
      true,
    );
  });
  assertEquals(
    model.globalArguments.safeParse({ ...base, format: "rar" }).success,
    false,
  );
});

Deno.test("archive check: an empty dest without creates is non_compliant", async () => {
  await withFakeSsh([
    { match: "test -f", stdout: "Y\n" },
    { match: "ls -A", stdout: "EMPTY\n" },
  ], async () => {
    const ctx = fakeContext(args());
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "non_compliant");
    assertEquals(ctx.writes[0].data.changes, ["extract archive"]);
  });
});

Deno.test("archive check: a populated dest without creates is compliant", async () => {
  await withFakeSsh([
    { match: "test -f", stdout: "Y\n" },
    { match: "ls -A", stdout: "FULL\n" },
  ], async () => {
    const ctx = fakeContext(args());
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "compliant");
  });
});

Deno.test("archive apply: a failed extraction is retried on the next run", async () => {
  // First run: dest is created by mkdir -p, then tar fails.
  await withFakeSsh([
    { match: "test -f", stdout: "Y\n" },
    { match: "ls -A", stdout: "NONE\n" },
    { match: "tar -xzf", exitCode: 2 },
  ], async () => {
    const ctx = fakeContext(args());
    await assertRejects(() => model.methods.apply.execute({}, ctx));
    assertEquals(ctx.writes[0].data.status, "failed");
  });
  // Second run: dest exists but is empty, so extraction runs again.
  await withFakeSsh([
    { match: "test -f", stdout: "Y\n" },
    { match: "ls -A", stdout: "EMPTY\n" },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    assertEquals(
      (await fake.commands()).includes(
        "tar -xzf '/tmp/app.tar.gz' -C '/opt/app'",
      ),
      true,
    );
  });
});

Deno.test("archive apply: a failed mkdir records failed", async () => {
  await withFakeSsh([
    { match: "test -f", stdout: "Y\n" },
    { match: "ls -A", stdout: "NONE\n" },
    { match: "mkdir -p", exitCode: 1 },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await assertRejects(() => model.methods.apply.execute({}, ctx));
    assertEquals(ctx.writes[0].data.status, "failed");
    for (const cmd of await fake.commands()) {
      assertEquals(cmd.startsWith("tar "), false, cmd);
    }
  });
});

const SECRET = "hunter2-archive";

function logText(ctx: ReturnType<typeof fakeContext>): string {
  return ctx.logs.map((l) => l.message + JSON.stringify(l.props ?? {})).join(
    "\n",
  );
}

Deno.test("archive check: a missing source records failed and throws", async () => {
  await withFakeSsh([
    { match: "test -f", stdout: "N\n" },
    { match: "ls -A", stdout: "NONE\n" },
  ], async () => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.check.execute({}, ctx),
      Error,
      "Source archive not found",
    );
    assertEquals(ctx.writes.length, 1);
    const data = ctx.writes[0].data;
    assertEquals(data.status, "failed");
    assertEquals(
      (data.current as Record<string, unknown>).sourceExists,
      false,
    );
  });
});

Deno.test("archive apply: extracts and chowns, logging without secrets", async () => {
  await withFakeSsh([
    { match: "test -f", stdout: "Y\n" },
    { match: "ls -A", stdout: "NONE\n" },
  ], async (fake) => {
    const ctx = fakeContext(args({
      owner: "app",
      group: "app",
      become: true,
      becomePassword: SECRET,
    }));
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    assertEquals(ctx.writes[0].data.changes, ["extract archive"]);
    const cmds = await fake.commands();
    assertEquals(cmds.some((c) => c.includes("chown -R")), true);
    const logs = logText(ctx);
    assertEquals(logs.includes("Extracting {source}"), true);
    assertEquals(logs.includes("Extracted {source}"), true);
    assertEquals(logs.includes(SECRET), false);
  });
});

Deno.test("archive apply: a failed extraction keeps the gathered state", async () => {
  await withFakeSsh([
    { match: "test -f", stdout: "Y\n" },
    { match: "ls -A", stdout: "NONE\n" },
    { match: "tar -xzf", exitCode: 2, stdout: "gzip: unexpected EOF\n" },
  ], async () => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "Extraction failed with exit code 2",
    );
    const data = ctx.writes[0].data;
    assertEquals(data.changes, ["extract archive"]);
    assertEquals(
      (data.current as Record<string, unknown>).sourceExists,
      true,
    );
    assertEquals(ctx.logs.some((l) => l.level === "error"), true);
  });
});

Deno.test("archive check: a failed remote probe is not reported as a missing source", async () => {
  await withFakeSsh([
    { match: "test -f", exitCode: 1, stdout: "sudo: a password is required\n" },
  ], async () => {
    const ctx = fakeContext(args({ become: true }));
    await assertRejects(
      () => model.methods.check.execute({}, ctx),
      Error,
      "source check failed with exit code 1",
    );
    assertEquals(ctx.writes[0].data.status, "failed");
  });
});
