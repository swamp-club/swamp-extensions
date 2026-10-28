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

import {
  assert,
  assertEquals,
  assertRejects,
  assertStringIncludes,
  assertThrows,
} from "@std/assert";
import { model } from "./firewall.ts";
import {
  fakeContext,
  type FakeRule,
  type LogLine,
  withFakeSsh,
} from "./_lib/fake_ssh.ts";

const base = {
  nodeHost: "fw-1",
  port: 80,
  protocol: "tcp",
  action: "allow",
};

function args(overrides: Record<string, unknown> = {}) {
  return model.globalArguments.parse({ ...base, ...overrides });
}

function ufw(status: string): FakeRule[] {
  return [
    { match: "head -1", stdout: "Status: active\n" },
    {
      match: "ufw status",
      stdout:
        "Status: active\n\nTo                         Action      From\n" +
        "--                         ------      ----\n" + status,
    },
  ];
}

const FIREWALLD: FakeRule = {
  match: "firewall-cmd --state",
  stdout: "running\n",
};

function iptables(rules: string): FakeRule[] {
  return [{
    match: "iptables -S",
    stdout: "-P INPUT ACCEPT\n-P OUTPUT ACCEPT\n" + rules,
  }];
}

async function checkStatus(rules: FakeRule[], overrides = {}) {
  let status: unknown;
  await withFakeSsh(rules, async () => {
    const ctx = fakeContext(args(overrides));
    await model.methods.check.execute({}, ctx);
    status = ctx.writes[0].data.status;
  });
  return status;
}

Deno.test("firewall check: iptables dpt:8080 does not satisfy port 80", async () => {
  assertEquals(
    await checkStatus(
      iptables("-A INPUT -p tcp -m tcp --dport 8080 -j ACCEPT\n"),
    ),
    "non_compliant",
  );
  assertEquals(
    await checkStatus(
      iptables("-A INPUT -p tcp -m tcp --dport 80 -j ACCEPT\n"),
    ),
    "compliant",
  );
});

Deno.test("firewall check: iptables action and source are matched", async () => {
  const drop = iptables("-A INPUT -p tcp -m tcp --dport 80 -j DROP\n");
  assertEquals(await checkStatus(drop), "non_compliant");
  assertEquals(await checkStatus(drop, { action: "deny" }), "compliant");
  const sourced = iptables(
    "-A INPUT -s 10.0.0.5/32 -p tcp -m tcp --dport 80 -j ACCEPT\n",
  );
  assertEquals(await checkStatus(sourced), "non_compliant");
  assertEquals(
    await checkStatus(sourced, { source: "10.0.0.5" }),
    "compliant",
  );
});

Deno.test("firewall check: ufw 8080/tcp does not satisfy 80/tcp", async () => {
  assertEquals(
    await checkStatus(ufw("8080/tcp                   ALLOW       Anywhere\n")),
    "non_compliant",
  );
  assertEquals(
    await checkStatus(ufw("80/tcp                     ALLOW       Anywhere\n")),
    "compliant",
  );
});

Deno.test("firewall check: ufw action and direction are matched", async () => {
  const deny = ufw("80/tcp                     DENY        Anywhere\n");
  assertEquals(await checkStatus(deny), "non_compliant");
  assertEquals(await checkStatus(deny, { action: "deny" }), "compliant");
  const out = ufw("80/tcp                     ALLOW OUT   Anywhere\n");
  assertEquals(await checkStatus(out), "non_compliant");
  assertEquals(await checkStatus(out, { direction: "out" }), "compliant");
  const sourced = ufw("80/tcp                     ALLOW       10.0.0.0/8\n");
  assertEquals(await checkStatus(sourced), "non_compliant");
  assertEquals(
    await checkStatus(sourced, { source: "10.0.0.0/8" }),
    "compliant",
  );
});

Deno.test("firewall check: firewalld rich rule action and port are matched", async () => {
  const rule = (port: string, action: string) => [FIREWALLD, {
    match: "--list-rich-rules",
    stdout:
      `rule family="ipv4" source address="10.0.0.0/8" port port="${port}" protocol="tcp" ${action}\n`,
  }];
  const src = { source: "10.0.0.0/8" };
  assertEquals(await checkStatus(rule("80", "accept"), src), "compliant");
  assertEquals(await checkStatus(rule("80", "drop"), src), "non_compliant");
  assertEquals(await checkStatus(rule("8080", "accept"), src), "non_compliant");
});

Deno.test("firewall check: firewalld outbound rules fail clearly", async () => {
  await withFakeSsh([FIREWALLD], async () => {
    const ctx = fakeContext(args({ direction: "out" }));
    await assertRejects(() => model.methods.check.execute({}, ctx));
    assertEquals(ctx.writes[0].data.status, "failed");
  });
});

Deno.test("firewall: no backend fails check and apply", async () => {
  await withFakeSsh([
    { match: "command -v iptables", exitCode: 1 },
  ], async (fake) => {
    for (const method of [model.methods.check, model.methods.apply]) {
      const ctx = fakeContext(args());
      await assertRejects(() => method.execute({}, ctx), Error, "No firewall");
      assertEquals(ctx.writes.length, 1);
      assertEquals(ctx.writes[0].data.status, "failed");
      assertEquals(ctx.writes[0].data.changes, []);
    }
    for (const cmd of await fake.commands()) {
      assertEquals(/iptables -A|ufw allow|--permanent/.test(cmd), false, cmd);
    }
  });
});

Deno.test("firewall apply: firewalld rich rule is quoted once", async () => {
  await withFakeSsh([FIREWALLD], async (fake) => {
    const ctx = fakeContext(args({ source: "10.0.0.0/8" }));
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    const cmds = await fake.commands();
    assertEquals(
      cmds.includes(
        `firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="10.0.0.0/8" port port="80" protocol="tcp" accept'`,
      ),
      true,
      cmds.join("\n"),
    );
    assertEquals(cmds.includes("firewall-cmd --reload"), true);
  });
});

Deno.test("firewall apply: ufw outbound rule uses out", async () => {
  await withFakeSsh(ufw(""), async (fake) => {
    const ctx = fakeContext(args({ direction: "out", action: "deny" }));
    await model.methods.apply.execute({}, ctx);
    assertEquals(
      (await fake.commands()).includes("ufw deny out 80/tcp"),
      true,
    );
  });
});

Deno.test("firewall apply: a failing iptables command records failed", async () => {
  await withFakeSsh([
    ...iptables(""),
    { match: "iptables -A", exitCode: 1, stdout: "permission denied" },
  ], async () => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "exit code 1",
    );
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].data.status, "failed");
  });
});

Deno.test("firewall apply: a failing firewalld reload records failed", async () => {
  await withFakeSsh([
    FIREWALLD,
    { match: "firewall-cmd --reload", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(args({ source: "10.0.0.0/8" }));
    await assertRejects(() => model.methods.apply.execute({}, ctx));
    assertEquals(ctx.writes[0].data.status, "failed");
  });
});

const SECRET = "s3cret-become-pw";
const BECOME = { become: true, becomePassword: SECRET };

/** No log line carries the become password or an interpolated host. */
function assertCleanLogs(logs: LogLine[], host: string) {
  for (const line of logs) {
    const text = line.message + JSON.stringify(line.props ?? {});
    assertEquals(text.includes(SECRET), false, `log leaks secret: ${text}`);
    assertEquals(line.message.includes(host), false, line.message);
  }
}

Deno.test("firewall check: logs entry and completion without secrets", async () => {
  await withFakeSsh(iptables(""), async () => {
    const ctx = fakeContext(args(BECOME));
    await model.methods.check.execute({}, ctx);
    const info = ctx.logs.filter((l) => l.level === "info");
    assert(info.some((l) => l.message.startsWith("Checking ")));
    assert(info.some((l) =>
      l.message.endsWith("is {status}") &&
      l.props?.status === ctx.writes[0].data.status
    ));
    assertCleanLogs(ctx.logs, "fw-1");
  });
});

Deno.test("firewall apply: a failure logs an error without secrets", async () => {
  await withFakeSsh(
    [...iptables(""), { match: "iptables -A", exitCode: 1 }],
    async () => {
      const ctx = fakeContext(args(BECOME));
      await assertRejects(() => model.methods.apply.execute({}, ctx));
      assertEquals(ctx.writes[ctx.writes.length - 1].data.status, "failed");
      assert(ctx.logs.some((l) => l.message.startsWith("Applying ")));
      const errors = ctx.logs.filter((l) => l.level === "error");
      assertEquals(errors.length, 1);
      assertStringIncludes(String(errors[0].props?.error), "iptables failed");
      assertCleanLogs(ctx.logs, "fw-1");
    },
  );
});

Deno.test("firewall: a port outside 1-65535 or not an integer is rejected", () => {
  assertThrows(() => args({ port: 0 }));
  assertThrows(() => args({ port: 65536 }));
  assertThrows(() => args({ port: 80.5 }));
});
