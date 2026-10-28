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
import { RecordedFailure } from "./_lib/checks.ts";
import { model } from "./template.ts";
import { fakeContext, type LogLine, withFakeSsh } from "./_lib/fake_ssh.ts";

const base = {
  nodeHost: "web-1",
  nodeUser: "deploy",
  path: "/etc/motd",
  ensure: "present",
  template: "<%= greeting %>\n",
  variables: { greeting: "hello" },
  mode: "644",
};

// sha256 of "hello\n"
const HELLO_SHA =
  "5891b5b522d5df086d0ff0b110fbd9d21bb4fc7163af34d08286a2e846f6be03";

function args(overrides: Record<string, unknown> = {}) {
  return model.globalArguments.parse({ ...base, ...overrides });
}

Deno.test("template check: a 3-digit mode matches stat's mode", async () => {
  await withFakeSsh([
    { match: "stat -c", stdout: "regular file|root|root|644\n" },
    { match: "sha256sum", stdout: `${HELLO_SHA}\n` },
  ], async () => {
    const ctx = fakeContext(args());
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "compliant");
    assertEquals(ctx.writes[0].data.changes, []);
  });
});

Deno.test("template apply: a failed chmod records failed state and throws", async () => {
  await withFakeSsh([
    { match: "stat -c", stdout: "regular file|root|root|600\n" },
    { match: "sha256sum", stdout: `${HELLO_SHA}\n` },
    { match: "chmod 644 '/etc/motd'", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "chmod failed",
    );
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].data.status, "failed");
  });
});

Deno.test("template apply: ensure present without a template fails clearly", async () => {
  await withFakeSsh([
    { match: "stat -c", stdout: "NOTFOUND\n" },
  ], async (fake) => {
    const ctx = fakeContext(args({ template: undefined }));
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "template is required when ensure is present",
    );
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].data.status, "failed");
    assertEquals(
      ctx.writes[0].data.error,
      "template is required when ensure is present",
    );
    assertEquals(await fake.commands(), []);
  });
});

Deno.test("template check: ensure absent needs no template", async () => {
  await withFakeSsh([
    { match: "stat -c", stdout: "NOTFOUND\n" },
  ], async () => {
    const ctx = fakeContext(args({ ensure: "absent", template: undefined }));
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "compliant");
  });
});

Deno.test("template check: a render error keeps its detailed failed state and throws", async () => {
  await withFakeSsh([], async () => {
    const ctx = fakeContext(args({ template: "<%= missing.value %>\n" }));
    await assertRejects(
      () => model.methods.check.execute({}, ctx),
      RecordedFailure,
      "Template render error",
    );
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].data.status, "failed");
    assertEquals(
      String(ctx.writes[0].data.error).startsWith("Template render error"),
      true,
    );
  });
});

Deno.test("template apply: a render error keeps its detailed failed state and throws", async () => {
  await withFakeSsh([], async (fake) => {
    const ctx = fakeContext(args({ template: "<%= missing.value %>\n" }));
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      RecordedFailure,
    );
    assertEquals(ctx.writes.length, 1);
    assertEquals(
      String(ctx.writes[0].data.error).startsWith("Template render error"),
      true,
    );
    assertEquals(await fake.commands(), []);
  });
});

const SUDO_PASSWORD = "hunter2-sudo-pw";

/** Entry and completion are logged at info, and no secret reaches any line. */
function assertLogged(
  logs: LogLine[],
  entry: string,
  done: string,
  secrets: string[] = [],
) {
  const text = JSON.stringify(logs);
  for (const secret of [SUDO_PASSWORD, ...secrets]) {
    assertEquals(text.includes(secret), false, text);
  }
  const first = logs.find((l) => l.message.startsWith(entry));
  assertEquals(first?.level, "info", text);
  assertEquals(first?.props?.host, "web-1");
  assertEquals(
    logs.some((l) => l.level === "info" && l.message.includes(done)),
    true,
    text,
  );
}

Deno.test("template: apply logs entry and completion without secrets or rendered content", async () => {
  await withFakeSsh([
    { match: "stat -c", stdout: "NOTFOUND\n" },
  ], async (fake) => {
    const ctx = fakeContext(args({
      variables: { greeting: "render-secret-value" },
      become: true,
      becomePassword: SUDO_PASSWORD,
    }));
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    assertLogged(ctx.logs, "Applying file", "is {status}", [
      "render-secret-value",
    ]);
    // The staged upload carries the rendered content.
    assertEquals(
      [...(await fake.uploads()).values()],
      ["render-secret-value\n"],
    );
  });
});

Deno.test("template check: logs entry and completion", async () => {
  await withFakeSsh([
    { match: "stat -c", stdout: "regular file|root|root|644\n" },
    { match: "sha256sum", stdout: `${HELLO_SHA}\n` },
  ], async () => {
    const ctx = fakeContext(args({ becomePassword: SUDO_PASSWORD }));
    await model.methods.check.execute({}, ctx);
    assertLogged(ctx.logs, "Checking file", "is {status}");
  });
});

Deno.test("template apply: a directory at the path is refused, not written into", async () => {
  await withFakeSsh([
    { match: "test -L", exitCode: 1 },
    { match: "stat -c", stdout: "directory|root|root|755\n" },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "is not a regular file",
    );
    assertEquals(ctx.writes[0].data.status, "failed");
    assertEquals(await fake.uploads(), new Map());
  });
});
