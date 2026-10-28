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
import { model } from "./docker_image.ts";
import { fakeContext, withFakeSsh } from "./_lib/fake_ssh.ts";

Deno.test("docker_image prune: failure keeps the gathered current state", async () => {
  await withFakeSsh([
    { match: "docker image prune", exitCode: 1 },
    {
      match: "docker image inspect",
      stdout: 'sha256:abc|||["nginx:1.25"]|||2024-01-01|||100\n',
    },
  ], async () => {
    const ctx = fakeContext(model.globalArguments.parse({
      nodeHost: "web-1",
      image: "nginx:1.25",
      ensure: "present",
    }));
    await assertRejects(() => model.methods.prune.execute({}, ctx));
    assertEquals(ctx.writes.length, 1);
    const data = ctx.writes[0].data;
    assertEquals(data.status, "failed");
    assertEquals(data.changes, ["prune dangling images"]);
    assertEquals(data.current, {
      imageExists: true,
      imageId: "sha256:abc",
      tags: ["nginx:1.25"],
      created: "2024-01-01",
      size: 100,
    });
  });
});

const SECRET = "hunter2-docker-image";
const INSPECT = 'sha256:abc|||["nginx:1.25"]|||2024-01-01|||100\n';

function args(overrides: Record<string, unknown> = {}) {
  return model.globalArguments.parse({
    nodeHost: "web-1",
    image: "nginx:1.25",
    ensure: "present",
    become: true,
    becomePassword: SECRET,
    ...overrides,
  });
}

function logText(ctx: ReturnType<typeof fakeContext>): string {
  return ctx.logs.map((l) => l.message + JSON.stringify(l.props ?? {})).join(
    "\n",
  );
}

Deno.test("docker_image check: a present image is compliant", async () => {
  await withFakeSsh([
    { match: "docker image inspect", stdout: INSPECT },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "compliant");
    assertEquals(ctx.writes[0].data.changes, []);
    for (const cmd of await fake.commands()) {
      assertEquals(/docker (pull|rmi)/.test(cmd), false, cmd);
    }
  });
});

Deno.test("docker_image check: a missing image is non_compliant", async () => {
  await withFakeSsh([
    { match: "docker image inspect", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(args());
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "non_compliant");
    assertEquals(ctx.writes[0].data.changes, ["pull image"]);
  });
});

Deno.test("docker_image apply: pulls a missing image and logs without secrets", async () => {
  await withFakeSsh([
    { match: "docker image inspect", exitCode: 1 },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    assertEquals(ctx.writes[0].data.changes, ["pull image"]);
    assertEquals(
      (await fake.commands()).some((c) => c.includes("docker pull")),
      true,
    );
    const logs = logText(ctx);
    assertEquals(logs.includes("Applying image"), true);
    assertEquals(logs.includes("Applied {changes}"), true);
    assertEquals(logs.includes(SECRET), false);
  });
});

Deno.test("docker_image apply: a failed rmi keeps the gathered state", async () => {
  await withFakeSsh([
    { match: "docker rmi", exitCode: 1, stdout: "image is in use\n" },
    { match: "docker image inspect", stdout: INSPECT },
  ], async () => {
    const ctx = fakeContext(args({ ensure: "absent" }));
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "docker rmi failed with exit code 1",
    );
    assertEquals(ctx.writes.length, 1);
    const data = ctx.writes[0].data;
    assertEquals(data.status, "failed");
    assertEquals(data.changes, ["remove image"]);
    assertEquals(
      (data.current as Record<string, unknown>).imageExists,
      true,
    );
    assertEquals(ctx.logs.some((l) => l.level === "error"), true);
    assertEquals(logText(ctx).includes(SECRET), false);
  });
});

Deno.test("docker_image check: docker missing records failed and throws", async () => {
  await withFakeSsh([
    { match: "command -v docker", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.check.execute({}, ctx),
      Error,
      "Docker is not installed",
    );
    assertEquals(ctx.writes[0].data.status, "failed");
  });
});
