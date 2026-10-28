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
import { model } from "./node.ts";
import { fakeContext, withFakeSsh } from "./_lib/fake_ssh.ts";

function args(overrides: Record<string, unknown> = {}) {
  return model.globalArguments.parse({ hostname: "web-1", ...overrides });
}

Deno.test("node gather: parses uname, os-release and package managers", async () => {
  await withFakeSsh([
    { match: "uname -srm", stdout: "Linux 6.8.0-45-generic x86_64\n" },
    {
      match: "/etc/os-release",
      stdout: 'NAME="Ubuntu"\nID=ubuntu\nVERSION_ID="24.04"\n',
    },
    { match: "command -v apt-get", stdout: "/usr/bin/apt-get\n" },
    { match: "command -v", exitCode: 1 },
    { match: "hostname", stdout: "web-1.example.com\n" },
  ], async () => {
    const ctx = fakeContext(args());
    await model.methods.gather.execute({}, ctx);
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].specName, "info");
    assertEquals(ctx.writes[0].name, "web-1");
    const { gatheredAt, ...rest } = ctx.writes[0].data;
    assertEquals(typeof gatheredAt, "string");
    assertEquals(rest, {
      hostname: "web-1.example.com",
      os: "ubuntu",
      osVersion: "24.04",
      arch: "x86_64",
      kernel: "6.8.0-45-generic",
      packageManagers: ["apt"],
    });
    const messages = ctx.logs.map((l) => l.message);
    assertEquals(messages.includes("Gathering facts from {host}"), true);
    assertEquals(
      messages.includes("Gathered facts from {host}: {os} {osVersion}"),
      true,
    );
  });
});

Deno.test("node gather: a failed uname throws without writing facts", async () => {
  await withFakeSsh([
    { match: "uname -srm", exitCode: 255 },
  ], async () => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.gather.execute({}, ctx),
      Error,
      "ssh to ",
    );
    assertEquals(ctx.writes.length, 0);
    assertEquals(ctx.logs.some((l) => l.level === "error"), true);
  });
});

Deno.test("node gather: an invalid host is rejected", async () => {
  await withFakeSsh([], async () => {
    const ctx = fakeContext(args({ hostname: "-oProxyCommand=x" }));
    await assertRejects(() => model.methods.gather.execute({}, ctx));
    assertEquals(ctx.writes.length, 0);
  });
});
