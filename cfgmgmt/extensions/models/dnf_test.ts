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
import { model } from "./dnf.ts";
import { fakeContext, withFakeSsh } from "./_lib/fake_ssh.ts";

function args(overrides: Record<string, unknown> = {}) {
  return model.globalArguments.parse({
    nodeHost: "web-1",
    packages: ["nginx"],
    ...overrides,
  });
}

Deno.test("dnf check: package names with regex metacharacters are parsed", async () => {
  await withFakeSsh([
    { match: "rpm -q 'g++'", stdout: "g++-11.4.1-3.el9.x86_64\n" },
    { match: "rpm -q 'libstdc++'", stdout: "libstdc++-11.4.1-3.el9.x86_64\n" },
  ], async () => {
    const ctx = fakeContext(args({
      packages: ["g++", "libstdc++"],
      version: "11.4.1-3.el9.x86_64",
    }));
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "compliant");
    assertEquals(ctx.writes[0].data.packages, [
      { name: "g++", installed: true, version: "11.4.1-3.el9.x86_64" },
      { name: "libstdc++", installed: true, version: "11.4.1-3.el9.x86_64" },
    ]);
  });
});

Deno.test("dnf apply: failed install keeps the detailed failed record", async () => {
  await withFakeSsh([
    { match: "rpm -q", exitCode: 1 },
    {
      match: "dnf install",
      stdout: "No match for argument: nginx\n",
      exitCode: 1,
    },
  ], async () => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "exit code 1",
    );
    assertEquals(ctx.writes.length, 1);
    const data = ctx.writes[0].data;
    assertEquals(data.status, "failed");
    assertEquals(data.changes, ["install nginx"]);
    assertEquals(data.stdout, "No match for argument: nginx\n");
    assertEquals(data.packages, [
      { name: "nginx", installed: false, version: null },
    ]);
  });
});

const SECRET = "s3cret-sudo-pw";

/** Every log line, flattened, so a test can assert a secret never appears. */
function logText(logs: { message: string; props?: unknown }[]): string {
  return logs.map((l) => `${l.message} ${JSON.stringify(l.props)}`).join("\n");
}

Deno.test("dnf check: installed packages are compliant", async () => {
  await withFakeSsh([
    { match: "rpm -q '", stdout: "nginx-1.20.1-14.el9.x86_64\n" },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].name, "web-1");
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

Deno.test("dnf apply: ensure absent removes an installed package", async () => {
  await withFakeSsh([
    { match: "rpm -q '", stdout: "nginx-1.20.1-14.el9.x86_64\n" },
  ], async (fake) => {
    const ctx = fakeContext(args({ ensure: "absent" }));
    await model.methods.apply.execute({}, ctx);
    const last = ctx.writes[ctx.writes.length - 1];
    assertEquals(last.data.status, "applied");
    assertEquals(last.data.changes, ["remove nginx"]);
    assertEquals(
      (await fake.commands()).some((c) =>
        c.includes("'nginx'") && /remove|uninstall|-R /.test(c)
      ),
      true,
    );
  });
});

Deno.test("dnf list: records every installed package", async () => {
  await withFakeSsh([
    { match: "rpm -qa", stdout: "nginx 1.20.1-14.el9\ncurl 7.76.1-26.el9\n" },
  ], async () => {
    const ctx = fakeContext(args());
    await model.methods.list.execute({}, ctx);
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].specName, "installed");
    assertEquals(ctx.writes[0].data.count, 2);
  });
});

Deno.test("dnf check: an unexpected failure records failed and throws", async () => {
  await withFakeSsh([
    { match: "rpm -q '", exitCode: 1 },
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

Deno.test("dnf: methods log entry and completion without leaking the sudo password", async () => {
  await withFakeSsh([
    { match: "rpm -q '", stdout: "nginx-1.20.1-14.el9.x86_64\n" },
  ], async () => {
    const ctx = fakeContext(args({ become: true, becomePassword: SECRET }));
    await model.methods.check.execute({}, ctx);
    const infos = ctx.logs.filter((l) => l.level === "info");
    assertEquals(infos.length, 2);
    assertStringIncludes(infos[0].message, "{host}");
    assertEquals(infos[0].props?.host, "web-1");
    assertEquals(infos[1].props?.status, "compliant");
    assertEquals(logText(ctx.logs).includes(SECRET), false);
  });
});

Deno.test("dnf: a failure is logged at error level without leaking the sudo password", async () => {
  await withFakeSsh([
    { match: "dnf makecache", stdout: "boom\n", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(args({ become: true, becomePassword: SECRET }));
    await assertRejects(() => model.methods.refresh.execute({}, ctx));
    const errors = ctx.logs.filter((l) => l.level === "error");
    assertEquals(errors.length, 1);
    assertEquals(errors[0].props?.host, "web-1");
    assertEquals(typeof errors[0].props?.error, "string");
    assertEquals(logText(ctx.logs).includes(SECRET), false);
  });
});

Deno.test("dnf check: a version pin without the arch matches rpm's NEVRA", async () => {
  await withFakeSsh([
    { match: "rpm -q '", stdout: "nginx-1.20.1-14.el9.x86_64\n" },
  ], async () => {
    const ctx = fakeContext(args({ version: "1.20.1-14.el9" }));
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "compliant");
    assertEquals(ctx.writes[0].data.changes, []);
  });
});

Deno.test("dnf check: a different pinned version is reported as an upgrade", async () => {
  await withFakeSsh([
    { match: "rpm -q '", stdout: "nginx-1.20.1-14.el9.x86_64\n" },
  ], async () => {
    const ctx = fakeContext(args({ version: "1.20.1-15.el9" }));
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "non_compliant");
    assertEquals(ctx.writes[0].data.changes, [
      "upgrade nginx from 1.20.1-14.el9.x86_64 to 1.20.1-15.el9",
    ]);
  });
});

Deno.test("dnf: a package name the package manager could read as an option is refused", () => {
  for (const name of ["-y", "--reinstall", "two words", ""]) {
    assertEquals(
      model.globalArguments.safeParse({ nodeHost: "web-1", packages: [name] })
        .success,
      false,
      name,
    );
  }
});
