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
import { model } from "./certificate.ts";
import { fakeContext, withFakeSsh } from "./_lib/fake_ssh.ts";

function args(overrides: Record<string, unknown> = {}) {
  return model.globalArguments.parse({
    nodeHost: "web-1",
    name: "site",
    certContent: "CERT\n",
    keyContent: "KEY\n",
    certPath: "/etc/ssl/site.crt",
    keyPath: "/etc/ssl/site.key",
    ...overrides,
  });
}

Deno.test("certificate check: chainPath without chainContent is a validation error", async () => {
  await withFakeSsh([], async (fake) => {
    const ctx = fakeContext(args({ chainPath: "/etc/ssl/chain.pem" }));
    await assertRejects(() => model.methods.check.execute({}, ctx));
    assertEquals(ctx.writes[0].data.status, "failed");
    assertStringIncludes(String(ctx.writes[0].data.error), "chainPath");
    assertEquals(await fake.commands(), []);
  });
});

Deno.test("certificate apply: non-RSA key mismatch is caught via public keys", async () => {
  await withFakeSsh([
    { match: "stat -L", stdout: "regular file\n" },
    {
      match: "sha256sum",
      stdout:
        "0000000000000000000000000000000000000000000000000000000000000000  /x\n",
    },
    { match: "openssl x509 -noout -pubkey", stdout: "PUB-A\n" },
    { match: "openssl pkey -pubout", stdout: "PUB-B\n" },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "do not match",
    );
    const cmds = await fake.commands();
    assertEquals(cmds.some((c) => c.includes("openssl rsa")), false);
  });
});

Deno.test("certificate apply: matching public keys pass validation", async () => {
  await withFakeSsh([
    { match: "stat -L", stdout: "regular file\n" },
    {
      match: "sha256sum",
      stdout:
        "0000000000000000000000000000000000000000000000000000000000000000  /x\n",
    },
    { match: "openssl x509 -noout -pubkey", stdout: "PUB-A\n" },
    { match: "openssl pkey -pubout", stdout: "PUB-A\n" },
  ], async () => {
    const ctx = fakeContext(args());
    await model.methods.apply.execute({}, ctx);
    const last = ctx.writes[ctx.writes.length - 1];
    assertEquals(last.data.status, "applied");
    assertEquals(
      (last.data.current as { certKeyMatch: boolean | null }).certKeyMatch,
      true,
    );
  });
});

Deno.test("certificate apply: a failed chmod fails the run", async () => {
  await withFakeSsh([
    { match: "stat -L", stdout: "NOTFOUND\n" },
    { match: "chmod '", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "chmod",
    );
    assertEquals(ctx.writes[ctx.writes.length - 1].data.status, "failed");
  });
});

const SECRET = "sudo-pw-s3cret";

/** Every logged message and prop, as one string, for leak checks. */
function logged(ctx: { logs: unknown[] }): string {
  return JSON.stringify(ctx.logs);
}

const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----MIIsecret";

Deno.test("certificate apply: logs entry and completion without key or password", async () => {
  await withFakeSsh([
    { match: "stat -L", stdout: "NOTFOUND\n" },
  ], async () => {
    const ctx = fakeContext(
      args({
        keyContent: PRIVATE_KEY,
        validate: false,
        become: true,
        becomePassword: SECRET,
      }),
    );
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    assertEquals(ctx.logs.map((l) => [l.level, l.message]), [
      ["info", "Applying certificate {name} on {host}"],
      [
        "info",
        "Certificate {name} on {host} is {status} ({changeCount} changes)",
      ],
    ]);
    const all = logged(ctx) + JSON.stringify(ctx.writes);
    assertEquals(all.includes(SECRET), false);
    assertEquals(all.includes(PRIVATE_KEY), false);
  });
});

Deno.test("certificate apply: a failure is logged without the private key", async () => {
  await withFakeSsh([
    { match: "stat -L", stdout: "NOTFOUND\n" },
    { match: "chmod", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(
      args({ keyContent: PRIVATE_KEY, become: true, becomePassword: SECRET }),
    );
    await assertRejects(() => model.methods.apply.execute({}, ctx));
    assertEquals(ctx.logs[ctx.logs.length - 1].level, "error");
    const all = logged(ctx);
    assertEquals(all.includes(SECRET), false);
    assertEquals(all.includes(PRIVATE_KEY), false);
  });
});
