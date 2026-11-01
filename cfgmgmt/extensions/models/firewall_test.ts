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

// Status lines below are copied from real ufw 0.36.2, `iptables -S` and
// firewalld 2.1.1 (offline) output.
const UFW_TWO_DESTINATIONS =
  "10.0.0.5 8080/tcp          ALLOW       10.0.0.0/24                # app-42-lan\n" +
  "10.0.0.6 8080/tcp          ALLOW       10.0.0.0/24                # app-43-lan\n";
const APP_42 = {
  port: 8080,
  source: "10.0.0.0/24",
  destination: "10.0.0.5",
  comment: "app-42-lan",
};

async function applyCommands(rules: FakeRule[], overrides = {}) {
  let commands: string[] = [];
  await withFakeSsh(rules, async (fake) => {
    await model.methods.apply.execute({}, fakeContext(args(overrides)));
    commands = await fake.commands();
  });
  return commands;
}

Deno.test("firewall check: ufw tells rules apart by destination and comment", async () => {
  const rules = ufw(UFW_TWO_DESTINATIONS);
  assertEquals(await checkStatus(rules, APP_42), "compliant");
  assertEquals(
    await checkStatus(rules, { ...APP_42, comment: "app-43-lan" }),
    "non_compliant",
  );
  assertEquals(
    await checkStatus(rules, { ...APP_42, destination: "10.0.0.7" }),
    "non_compliant",
  );
  const { comment: _comment, ...noComment } = APP_42;
  assertEquals(await checkStatus(rules, noComment), "compliant");
  const { destination: _destination, ...noDestination } = APP_42;
  assertEquals(await checkStatus(rules, noDestination), "non_compliant");
});

Deno.test("firewall check: ufw reads v6 and outbound lines", async () => {
  assertEquals(
    await checkStatus(
      ufw("80/tcp (v6)                ALLOW       Anywhere (v6)\n"),
    ),
    "compliant",
  );
  assertEquals(
    await checkStatus(
      ufw(
        "2001:db8::1 85/tcp         ALLOW       Anywhere (v6)              # six\n",
      ),
      { port: 85, destination: "2001:db8::1", comment: "six" },
    ),
    "compliant",
  );
  assertEquals(
    await checkStatus(
      ufw(
        "10.0.0.8 83/tcp            ALLOW OUT   Anywhere                   # outbound\n",
      ),
      { port: 83, destination: "10.0.0.8", direction: "out" },
    ),
    "compliant",
  );
});

Deno.test("firewall check: an existing config never matches a ufw rule with a destination", async () => {
  const rules = ufw("10.0.0.5 80/tcp            ALLOW       Anywhere\n");
  assertEquals(await checkStatus(rules), "non_compliant");
});

Deno.test("firewall check: ufw prints single-host addresses without a prefix", async () => {
  const rule = ufw("10.0.0.10 84/tcp           ALLOW       10.0.0.9\n");
  assertEquals(
    await checkStatus(rule, {
      port: 84,
      source: "10.0.0.9/32",
      destination: "10.0.0.10/32",
    }),
    "compliant",
  );
  const v6 = ufw("85/tcp (v6)                ALLOW       2001:db8::1\n");
  assertEquals(
    await checkStatus(v6, { port: 85, source: "2001:db8::1/128" }),
    "compliant",
  );
});

Deno.test("firewall check: a /32 IPv6 network keeps its prefix on ufw", async () => {
  const rule = ufw("85/tcp (v6)                ALLOW       2001:db8::/32\n");
  assertEquals(
    await checkStatus(rule, { port: 85, source: "2001:db8::/32" }),
    "compliant",
  );
  assertEquals(
    await checkStatus(rule, { port: 85, source: "2001:db8::" }),
    "non_compliant",
  );
});

Deno.test("firewall apply: ufw adds with the comment and deletes without it", async () => {
  const added = await applyCommands(ufw(""), APP_42);
  assertEquals(
    added.includes(
      "ufw allow from '10.0.0.0/24' to '10.0.0.5' port 8080 proto tcp comment 'app-42-lan'",
    ),
    true,
    added.join("\n"),
  );
  const deleted = await applyCommands(ufw(UFW_TWO_DESTINATIONS), {
    ...APP_42,
    ensure: "absent",
  });
  assertEquals(
    deleted.includes(
      "ufw delete allow from '10.0.0.0/24' to '10.0.0.5' port 8080 proto tcp",
    ),
    true,
    deleted.join("\n"),
  );
  assertEquals(deleted.some((c) => c.includes("app-43-lan")), false);
});

Deno.test("firewall apply: ufw with a differing comment updates the rule", async () => {
  const commands = await applyCommands(ufw(UFW_TWO_DESTINATIONS), {
    ...APP_42,
    comment: "renamed",
  });
  assertEquals(
    commands.some((c) => c.startsWith("ufw allow") && c.includes("'renamed'")),
    true,
    commands.join("\n"),
  );
});

Deno.test("firewall apply: ufw destination without a source uses from any", async () => {
  const commands = await applyCommands(ufw(""), {
    destination: "10.0.0.7",
    direction: "out",
  });
  assertEquals(
    commands.includes(
      "ufw allow out from any to '10.0.0.7' port 80 proto tcp",
    ),
    true,
    commands.join("\n"),
  );
});

Deno.test("firewall apply: commands for existing configs are unchanged", async () => {
  assertEquals(
    (await applyCommands(ufw(""))).includes("ufw allow 80/tcp"),
    true,
  );
  assertEquals(
    (await applyCommands(ufw(""), { source: "10.0.0.0/8" })).includes(
      "ufw allow from '10.0.0.0/8' to any port 80 proto tcp",
    ),
    true,
  );
  assertEquals(
    (await applyCommands(iptables(""))).includes(
      "iptables -A INPUT -p tcp --dport 80 -j ACCEPT",
    ),
    true,
  );
  assertEquals(
    (await applyCommands([FIREWALLD])).includes(
      "firewall-cmd --permanent --add-port=80/tcp",
    ),
    true,
  );
});

function firewalldRich(rules: string): FakeRule[] {
  return [FIREWALLD, { match: "--list-rich-rules", stdout: rules }];
}

Deno.test("firewall apply: firewalld destination sets family and uses a rich rule", async () => {
  const commands = await applyCommands([FIREWALLD], {
    destination: "10.0.0.5",
  });
  assertEquals(
    commands.includes(
      `firewall-cmd --permanent --add-rich-rule='rule family="ipv4" destination address="10.0.0.5" port port="80" protocol="tcp" accept'`,
    ),
    true,
    commands.join("\n"),
  );
  const both = await applyCommands([FIREWALLD], {
    source: "2001:db8::/64",
    destination: "2001:db8::1",
    action: "deny",
  });
  assertEquals(
    both.includes(
      `firewall-cmd --permanent --add-rich-rule='rule family="ipv6" source address="2001:db8::/64" destination address="2001:db8::1" port port="80" protocol="tcp" drop'`,
    ),
    true,
    both.join("\n"),
  );
});

Deno.test("firewall check: firewalld matches the destination exactly", async () => {
  const rules = firewalldRich(
    `rule family="ipv4" source address="10.0.0.0/24" destination address="10.0.0.6/32" port port="80" protocol="tcp" accept\n`,
  );
  const src = { source: "10.0.0.0/24" };
  assertEquals(
    await checkStatus(rules, { ...src, destination: "10.0.0.6/32" }),
    "compliant",
  );
  assertEquals(
    await checkStatus(rules, { ...src, destination: "10.0.0.7" }),
    "non_compliant",
  );
});

Deno.test("firewall: firewalld rejects a comment on check and apply", async () => {
  await withFakeSsh(firewalldRich(""), async (fake) => {
    for (const method of [model.methods.check, model.methods.apply]) {
      const ctx = fakeContext(args({ source: "10.0.0.0/8", comment: "x" }));
      await assertRejects(() => method.execute({}, ctx), Error, "comment");
      assertEquals(ctx.writes[0].data.status, "failed");
    }
    assertEquals(
      (await fake.commands()).some((c) => c.includes("--permanent")),
      false,
    );
  });
});

Deno.test("firewall check: iptables tells rules apart by destination and comment", async () => {
  const rules = iptables(
    `-A INPUT -d 10.0.0.5/32 -p tcp -m tcp --dport 80 -m comment --comment "app one" -j ACCEPT\n` +
      "-A INPUT -d 10.0.0.6/32 -p tcp -m tcp --dport 80 -m comment --comment app2 -j ACCEPT\n",
  );
  assertEquals(
    await checkStatus(rules, { destination: "10.0.0.5", comment: "app one" }),
    "compliant",
  );
  assertEquals(
    await checkStatus(rules, { destination: "10.0.0.6", comment: "app2" }),
    "compliant",
  );
  assertEquals(
    await checkStatus(rules, { destination: "10.0.0.5", comment: "app2" }),
    "non_compliant",
  );
  assertEquals(
    await checkStatus(rules, { destination: "10.0.0.5" }),
    "compliant",
  );
});

Deno.test("firewall check: an iptables comment is not read as options", async () => {
  const rules = iptables(
    `-A INPUT -p tcp -m tcp --dport 80 -m comment --comment "a -j DROP -d 10.0.0.9" -j ACCEPT\n`,
  );
  assertEquals(await checkStatus(rules), "compliant");
  assertEquals(await checkStatus(rules, { action: "deny" }), "non_compliant");
  assertEquals(
    await checkStatus(
      iptables(
        `-A INPUT -p tcp -m tcp --dport 80 -m comment --comment "say \\"-j DROP\\" now" -j ACCEPT\n`,
      ),
      { action: "deny" },
    ),
    "non_compliant",
  );
});

Deno.test("firewall apply: iptables carries destination and comment on add and delete", async () => {
  const wanted = { destination: "10.0.0.5", comment: "app one" };
  const added = await applyCommands(iptables(""), wanted);
  assertEquals(
    added.includes(
      "iptables -A INPUT -p tcp --dport 80 -d '10.0.0.5' -m comment --comment 'app one' -j ACCEPT",
    ),
    true,
    added.join("\n"),
  );
  const deleted = await applyCommands(
    iptables(
      `-A INPUT -d 10.0.0.5/32 -p tcp -m tcp --dport 80 -m comment --comment "app one" -j ACCEPT\n`,
    ),
    { ...wanted, ensure: "absent" },
  );
  assertEquals(
    deleted.includes(
      "iptables -D INPUT -p tcp --dport 80 -d '10.0.0.5' -m comment --comment 'app one' -j ACCEPT",
    ),
    true,
    deleted.join("\n"),
  );
});

Deno.test("firewall apply: iptables delete reuses a comment the config does not set", async () => {
  const deleted = await applyCommands(
    iptables(
      `-A INPUT -p tcp -m tcp --dport 80 -m comment --comment "say \\"hi\\"" -j ACCEPT\n`,
    ),
    { ensure: "absent" },
  );
  assertEquals(
    deleted.includes(
      `iptables -D INPUT -p tcp --dport 80 -m comment --comment 'say "hi"' -j ACCEPT`,
    ),
    true,
    deleted.join("\n"),
  );
});

const NARROWER_IPTABLES =
  "-A INPUT -d 10.0.0.5/32 -p tcp -m tcp --dport 80 -j DROP\n";
const NARROWER_RICH =
  `rule family="ipv4" destination address="10.0.0.5" port port="80" protocol="tcp" drop\n`;

for (
  const [name, rules, exact] of [
    [
      "iptables",
      iptables(NARROWER_IPTABLES),
      iptables(
        NARROWER_IPTABLES + "-A INPUT -p tcp -m tcp --dport 80 -j DROP\n",
      ),
    ],
    [
      "firewalld",
      firewalldRich(NARROWER_RICH),
      firewalldRich(
        NARROWER_RICH + `rule port port="80" protocol="tcp" drop\n`,
      ),
    ],
  ] as const
) {
  const mutating = /iptables -[AD] |--permanent/;

  Deno.test(`firewall check: ${name} reports a narrower rule instead of compliant`, async () => {
    await withFakeSsh([...rules], async () => {
      const ctx = fakeContext(args({ action: "deny" }));
      await model.methods.check.execute({}, ctx);
      const data = ctx.writes[0].data;
      assertEquals(data.status, "non_compliant");
      const current = data.current as Record<string, unknown>;
      assertEquals(current.ruleExists, false);
      assertStringIncludes(String(current.narrowerRule), "10.0.0.5");
      assertStringIncludes(String(data.changes), "10.0.0.5");
    });
  });

  Deno.test(`firewall apply: ${name} refuses to add a rule broader than a narrower one`, async () => {
    await withFakeSsh([...rules], async (fake) => {
      const ctx = fakeContext(args({ action: "deny" }));
      await assertRejects(
        () => model.methods.apply.execute({}, ctx),
        Error,
        "destination",
      );
      assertEquals(ctx.writes[0].data.status, "failed");
      for (const cmd of await fake.commands()) {
        assertEquals(mutating.test(cmd), false, cmd);
      }
    });
  });

  Deno.test(`firewall apply: ${name} ensure absent leaves a narrower rule alone`, async () => {
    await withFakeSsh([...rules], async (fake) => {
      const ctx = fakeContext(args({ action: "deny", ensure: "absent" }));
      await model.methods.apply.execute({}, ctx);
      assertEquals(ctx.writes[0].data.status, "compliant");
      for (const cmd of await fake.commands()) {
        assertEquals(mutating.test(cmd), false, cmd);
      }
    });
  });

  Deno.test(`firewall check: ${name} finds an exact rule listed after a narrower one`, async () => {
    await withFakeSsh([...exact], async () => {
      const ctx = fakeContext(args({ action: "deny" }));
      await model.methods.check.execute({}, ctx);
      const data = ctx.writes[0].data;
      assertEquals(data.status, "compliant");
      const current = data.current as Record<string, unknown>;
      assertEquals(current.narrowerRule, null);
    });
  });
}

Deno.test("firewall check: firewalld plain-port configs do not read rich rules", async () => {
  const rules = [
    FIREWALLD,
    {
      match: "--list-rich-rules",
      stdout:
        `rule family="ipv4" destination address="10.0.0.5" port port="80" protocol="tcp" accept\n`,
    },
    { match: "--list-ports", stdout: "\n" },
  ];
  const commands = await applyCommands(rules);
  assertEquals(
    commands.includes("firewall-cmd --permanent --add-port=80/tcp"),
    true,
    commands.join("\n"),
  );
});

Deno.test("firewall: ufw keeps adding the broader rule, as it always has", async () => {
  const commands = await applyCommands(
    ufw("10.0.0.5 80/tcp            ALLOW       Anywhere\n"),
  );
  assertEquals(
    commands.includes("ufw allow 80/tcp"),
    true,
    commands.join("\n"),
  );
});

Deno.test("firewall: an unsafe comment or destination is rejected", () => {
  for (
    const comment of [
      "",
      "it's",
      'a"b',
      "a#b",
      "a\\b",
      "a\nb",
      "$(id)",
      " leading",
      "trailing ",
      "two  spaces",
      "x".repeat(256),
    ]
  ) {
    assertThrows(() => args({ comment }), Error, undefined, comment);
  }
  assertEquals(args({ comment: "app-42 lan_1.x" }).comment, "app-42 lan_1.x");
  assertThrows(() => args({ destination: "10.0.0.5; id" }));
});

Deno.test("firewall apply: iptables with a comment still refuses to widen a narrower rule", async () => {
  await withFakeSsh(iptables(NARROWER_IPTABLES), async (fake) => {
    const ctx = fakeContext(args({ action: "deny", comment: "web" }));
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "destination",
    );
    for (const cmd of await fake.commands()) {
      assertEquals(/iptables -[AD] /.test(cmd), false, cmd);
    }
  });
});

Deno.test("firewall check: a negated iptables destination matches nothing", async () => {
  const rules = iptables(
    "-A INPUT ! -d 10.0.0.5/32 -p tcp -m tcp --dport 80 -j ACCEPT\n",
  );
  assertEquals(
    await checkStatus(rules, { destination: "10.0.0.5" }),
    "non_compliant",
  );
  await withFakeSsh([...rules], async () => {
    const ctx = fakeContext(args());
    await model.methods.check.execute({}, ctx);
    const current = ctx.writes[0].data.current as Record<string, unknown>;
    assertEquals(current.ruleExists, false);
    assertEquals(current.narrowerRule, null);
  });
});

Deno.test("firewall check: a negated firewalld destination matches nothing", async () => {
  const rules = firewalldRich(
    `rule family="ipv4" destination NOT address="10.0.0.5" port port="80" protocol="tcp" drop\n`,
  );
  assertEquals(await checkStatus(rules, { action: "deny" }), "non_compliant");
  assertEquals(
    await checkStatus(rules, { action: "deny", destination: "10.0.0.5" }),
    "non_compliant",
  );
});

Deno.test("firewall check: a firewalld log prefix is not read as a destination", async () => {
  const rules = firewalldRich(
    `rule family="ipv4" source address="10.0.0.0/8" port port="80" protocol="tcp" log prefix="destination blocked" accept\n`,
  );
  assertEquals(
    await checkStatus(rules, { source: "10.0.0.0/8" }),
    "compliant",
  );
});

Deno.test("firewall apply: iptables delete keeps an empty existing comment", async () => {
  const deleted = await applyCommands(
    iptables(
      `-A INPUT -p tcp -m tcp --dport 80 -m comment --comment "" -j ACCEPT\n`,
    ),
    { ensure: "absent" },
  );
  assertEquals(
    deleted.includes(
      "iptables -D INPUT -p tcp --dport 80 -m comment --comment '' -j ACCEPT",
    ),
    true,
    deleted.join("\n"),
  );
});
