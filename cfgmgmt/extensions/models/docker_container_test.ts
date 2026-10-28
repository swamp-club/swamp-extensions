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
import { model } from "./docker_container.ts";
import { fakeContext, withFakeSsh } from "./_lib/fake_ssh.ts";

const base = {
  nodeHost: "docker-1",
  name: "web",
  image: "nginx:1.25",
  ensure: "running",
};

function args(overrides: Record<string, unknown> = {}) {
  return model.globalArguments.parse({ ...base, ...overrides });
}

const INSPECT = JSON.stringify([{
  State: { Status: "running" },
  Image: "sha256:abc",
  Config: { Image: "nginx:1.25", Env: ["PATH=/usr/bin"] },
  HostConfig: {
    PortBindings: {
      "80/tcp": [{ HostIp: "127.0.0.1", HostPort: "8080" }],
      "53/udp": [{ HostIp: "", HostPort: "5353" }],
    },
    RestartPolicy: { Name: "always" },
  },
  Mounts: [
    {
      Type: "volume",
      Name: "data",
      Source: "/var/lib/docker/volumes/data/_data",
      Destination: "/data",
      RW: true,
    },
    { Type: "bind", Source: "/etc/web", Destination: "/conf", RW: false },
  ],
}]);

Deno.test("docker_container check: empty inspect array means not existing", async () => {
  await withFakeSsh([
    { match: "docker inspect", stdout: "[]\n" },
  ], async () => {
    const ctx = fakeContext(args());
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "non_compliant");
    assertEquals(ctx.writes[0].data.changes, [
      "create container",
      "start container",
    ]);
  });
});

Deno.test("docker_container check: host IP ports and named volumes are compliant", async () => {
  await withFakeSsh([
    { match: "docker inspect", stdout: INSPECT },
  ], async () => {
    const ctx = fakeContext(args({
      ports: ["127.0.0.1:8080:80", "5353:53/udp"],
      volumes: ["data:/data", "/etc/web:/conf:ro"],
      restart: "always",
    }));
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes[0].data.changes, []);
    assertEquals(ctx.writes[0].data.status, "compliant");
  });
});

Deno.test("docker_container check: a different host IP or volume is drift", async () => {
  await withFakeSsh([
    { match: "docker inspect", stdout: INSPECT },
  ], async () => {
    const ctx = fakeContext(args({
      ports: ["8080:80", "5353:53/udp"],
      volumes: ["other:/data", "/etc/web:/conf:ro"],
    }));
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes[0].data.changes, [
      "ports changed",
      "volumes changed",
      "recreate container",
    ]);
  });
});

Deno.test("docker_container logs: a failure is recorded and rethrown", async () => {
  await withFakeSsh([
    {
      match: "docker logs",
      exitCode: 1,
      stdout: "Error: No such container: web",
    },
  ], async () => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.logs.execute({ lines: 10 }, ctx),
      Error,
      "No such container",
    );
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].specName, "logs");
    assertEquals(ctx.writes[0].data.output, null);
    assertEquals(
      String(ctx.writes[0].data.error).includes("No such container"),
      true,
    );
  });
});

Deno.test("docker_container logs: output is recorded", async () => {
  await withFakeSsh([
    { match: "docker logs", stdout: "hello\n" },
  ], async () => {
    const ctx = fakeContext(args());
    await model.methods.logs.execute({ lines: 10 }, ctx);
    assertEquals(ctx.writes[0].data.output, "hello\n");
    assertEquals(ctx.writes[0].data.error, null);
  });
});

Deno.test("docker_container restart: the detailed failed state is kept", async () => {
  await withFakeSsh([
    { match: "docker restart", exitCode: 1 },
    { match: "docker inspect", stdout: INSPECT },
  ], async () => {
    const ctx = fakeContext(args());
    await assertRejects(() => model.methods.restart.execute({}, ctx));
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].data.status, "failed");
    assertEquals(ctx.writes[0].data.changes, ["restart container"]);
    const current = ctx.writes[0].data.current as { containerExists: boolean };
    assertEquals(current.containerExists, true);
  });
});

Deno.test("docker_container apply: a failed removal records failed", async () => {
  await withFakeSsh([
    { match: "docker inspect", stdout: INSPECT },
    { match: "docker rm -f", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(args({ ensure: "absent" }));
    await assertRejects(() => model.methods.apply.execute({}, ctx));
    assertEquals(ctx.writes[0].data.status, "failed");
  });
});

const SECRET = "hunter2-docker-container";

function logText(ctx: ReturnType<typeof fakeContext>): string {
  return ctx.logs.map((l) => l.message + JSON.stringify(l.props ?? {})).join(
    "\n",
  );
}

Deno.test("docker_container apply: creates and starts a missing container, logging no secrets", async () => {
  await withFakeSsh([
    { match: "docker inspect", exitCode: 1 },
  ], async (fake) => {
    const ctx = fakeContext(args({
      environment: [`DB_PASSWORD=${SECRET}-env`],
      become: true,
      becomePassword: SECRET,
    }));
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    assertEquals(ctx.writes[0].data.changes, [
      "create container",
      "start container",
    ]);
    const cmds = await fake.commands();
    assertEquals(cmds.some((c) => c.includes("docker create")), true);
    assertEquals(cmds.some((c) => c.includes("docker start")), true);
    const logs = logText(ctx);
    assertEquals(logs.includes("Applying container"), true);
    assertEquals(logs.includes("Applied {changes}"), true);
    assertEquals(logs.includes(SECRET), false);
  });
});

Deno.test("docker_container apply: a failed recreate keeps the gathered state", async () => {
  await withFakeSsh([
    { match: "docker inspect", stdout: INSPECT },
    { match: "docker rm", exitCode: 1, stdout: "container is running\n" },
  ], async (fake) => {
    const ctx = fakeContext(args({ image: "nginx:1.27" }));
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "docker rm failed with exit code 1",
    );
    assertEquals(ctx.writes.length, 1);
    const data = ctx.writes[0].data;
    assertEquals(data.status, "failed");
    assertEquals(data.changes, [
      "image: nginx:1.25 -> nginx:1.27",
      "recreate container",
    ]);
    assertEquals(
      (data.current as { containerExists: boolean }).containerExists,
      true,
    );
    assertEquals(
      (await fake.commands()).some((c) => c.includes("docker create")),
      false,
    );
    assertEquals(ctx.logs.some((l) => l.level === "error"), true);
  });
});

Deno.test("docker_container logs: lines must be a positive integer", () => {
  const schema = model.methods.logs.arguments;
  assertEquals(schema.safeParse({ lines: 0 }).success, false);
  assertEquals(schema.safeParse({ lines: 1.5 }).success, false);
  assertEquals(schema.safeParse({}).success, true);
});

// An image's own VOLUME (mysql's /var/lib/mysql, say) shows up as an
// anonymous volume. It must not count as drift: recreating the container
// would give it a fresh, empty volume on every apply.
const WITH_ANONYMOUS_VOLUME = JSON.stringify(
  JSON.parse(INSPECT).map((c: { Mounts: unknown[] }) => ({
    ...c,
    Mounts: [
      ...c.Mounts,
      {
        Type: "volume",
        Name: "3f".repeat(32),
        Source: `/var/lib/docker/volumes/${"3f".repeat(32)}/_data`,
        Destination: "/var/lib/mysql",
        RW: true,
      },
    ],
  })),
);

Deno.test("docker_container: an image's anonymous volume is not drift", async () => {
  await withFakeSsh([
    { match: "docker inspect", stdout: WITH_ANONYMOUS_VOLUME },
  ], async (fake) => {
    const desired = args({
      ports: ["127.0.0.1:8080:80", "5353:53/udp"],
      volumes: ["data:/data", "/etc/web:/conf:ro"],
      restart: "always",
    });
    const check = fakeContext(desired);
    await model.methods.check.execute({}, check);
    assertEquals(check.writes[0].data.status, "compliant");
    const apply = fakeContext(desired);
    await model.methods.apply.execute({}, apply);
    assertEquals(apply.writes[0].data.status, "compliant");
    assertEquals(
      (await fake.commands()).some((c) => /docker (rm|create|stop)/.test(c)),
      false,
    );
  });
});
