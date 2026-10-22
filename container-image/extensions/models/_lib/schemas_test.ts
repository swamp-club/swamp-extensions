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

import { assertEquals, assertThrows } from "jsr:@std/assert@1.0.19";
import {
  BuildArgsSchema,
  BuildxBuildArgsSchema,
  GlobalArgsSchema,
  LoginArgsSchema,
  RunArgsSchema,
} from "./schemas.ts";

Deno.test("GlobalArgsSchema - defaults binary to docker", () => {
  const result = GlobalArgsSchema.parse({ name: "test" });
  assertEquals(result.binary, "docker");
});

Deno.test("GlobalArgsSchema - accepts podman", () => {
  const result = GlobalArgsSchema.parse({ name: "test", binary: "podman" });
  assertEquals(result.binary, "podman");
});

Deno.test("GlobalArgsSchema - accepts container (Apple Containers)", () => {
  const result = GlobalArgsSchema.parse({ name: "test", binary: "container" });
  assertEquals(result.binary, "container");
});

Deno.test("GlobalArgsSchema - rejects arbitrary binary values", () => {
  assertThrows(() => {
    GlobalArgsSchema.parse({ name: "test", binary: "/usr/bin/evil" });
  });
});

Deno.test("GlobalArgsSchema - rejects empty name", () => {
  assertThrows(() => {
    GlobalArgsSchema.parse({ name: "" });
  });
});

Deno.test("BuildArgsSchema - defaults context to '.'", () => {
  const result = BuildArgsSchema.parse({});
  assertEquals(result.context, ".");
  assertEquals(result.noCache, false);
});

Deno.test("BuildArgsSchema - accepts exportFormat oci", () => {
  const result = BuildArgsSchema.parse({
    exportFormat: "oci",
    exportPath: "/tmp/out.tar",
  });
  assertEquals(result.exportFormat, "oci");
  assertEquals(result.exportPath, "/tmp/out.tar");
});

Deno.test("BuildArgsSchema - rejects newlines in tag", () => {
  assertThrows(() => {
    BuildArgsSchema.parse({ tag: "myapp\nmalicious" });
  });
});

Deno.test("BuildArgsSchema - rejects NUL bytes in dockerfile", () => {
  assertThrows(() => {
    BuildArgsSchema.parse({ dockerfile: "Dockerfile\x00evil" });
  });
});

Deno.test("BuildArgsSchema - platform is optional", () => {
  assertEquals(BuildArgsSchema.parse({}).platform, undefined);
  assertEquals(
    BuildArgsSchema.parse({ platform: "linux/amd64" }).platform,
    "linux/amd64",
  );
});

Deno.test("BuildArgsSchema - rejects newlines in platform", () => {
  assertThrows(() => {
    BuildArgsSchema.parse({ platform: "linux/amd64\nevil" });
  });
});

Deno.test("RunArgsSchema - parses minimal input", () => {
  const result = RunArgsSchema.parse({ image: "alpine:latest" });
  assertEquals(result.image, "alpine:latest");
});

Deno.test("RunArgsSchema - rejects newlines in image name", () => {
  assertThrows(() => {
    RunArgsSchema.parse({ image: "alpine\nmalicious" });
  });
});

Deno.test("RunArgsSchema - rejects newlines in volume mounts", () => {
  assertThrows(() => {
    RunArgsSchema.parse({
      image: "alpine",
      volumes: ["/host:/container\nevil"],
    });
  });
});

Deno.test("LoginArgsSchema - password has sensitive meta", () => {
  const shape = LoginArgsSchema.shape;
  const meta = shape.password.meta()!;
  assertEquals(meta.sensitive, true);
});

Deno.test("LoginArgsSchema - rejects empty password", () => {
  assertThrows(() => {
    LoginArgsSchema.parse({ username: "user", password: "" });
  });
});

Deno.test("LoginArgsSchema - rejects newlines in username", () => {
  assertThrows(() => {
    LoginArgsSchema.parse({
      username: "user\nmalicious",
      password: "secret",
    });
  });
});

Deno.test("BuildxBuildArgsSchema - requires platforms and tags", () => {
  assertThrows(() => {
    BuildxBuildArgsSchema.parse({ context: "." });
  });
});

Deno.test("BuildxBuildArgsSchema - parses full input", () => {
  const result = BuildxBuildArgsSchema.parse({
    platforms: ["linux/amd64", "linux/arm64"],
    tags: ["registry.example.com/app:latest"],
    push: true,
    buildArgs: { NODE_ENV: "production" },
  });
  assertEquals(result.platforms, ["linux/amd64", "linux/arm64"]);
  assertEquals(result.push, true);
});

Deno.test("BuildxBuildArgsSchema - rejects empty platforms", () => {
  assertThrows(() => {
    BuildxBuildArgsSchema.parse({
      platforms: [],
      tags: ["app:latest"],
    });
  });
});

Deno.test("BuildxBuildArgsSchema - rejects newlines in platform", () => {
  assertThrows(() => {
    BuildxBuildArgsSchema.parse({
      platforms: ["linux/amd64\nevil"],
      tags: ["app:latest"],
    });
  });
});
