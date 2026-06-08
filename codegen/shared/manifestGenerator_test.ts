import { assertSnapshot } from "@std/testing/snapshot";
import { generateManifest } from "./manifestGenerator.ts";

Deno.test("generateManifest - full manifest with release notes and additional files", async (t) => {
  await assertSnapshot(
    t,
    generateManifest({
      name: "@swamp/hetzner-cloud",
      version: "2026.04.03.1",
      description: "Hetzner Cloud infrastructure models",
      labels: ["hetzner", "cloud", "infrastructure"],
      modelFiles: ["servers.ts", "ssh_keys.ts", "volumes.ts"],
      releaseNotes: "- Updated: servers, volumes\n- New: ssh_keys",
      additionalFiles: ["README.md", "LICENSE.txt"],
      repository: "https://github.com/swamp-club/swamp-extensions",
      platforms: [],
    }),
  );
});

Deno.test("generateManifest - no release notes, no additional files", async (t) => {
  await assertSnapshot(
    t,
    generateManifest({
      name: "@swamp/aws/ec2",
      version: "2026.01.01.1",
      description: "AWS EC2 infrastructure models",
      labels: ["aws", "ec2", "cloud"],
      modelFiles: ["instance.ts", "vpc.ts"],
    }),
  );
});

Deno.test("generateManifest - model files are sorted", async (t) => {
  await assertSnapshot(
    t,
    generateManifest({
      name: "@swamp/test",
      version: "1.0.0",
      description: "Test",
      labels: ["test"],
      modelFiles: ["z_last.ts", "a_first.ts", "m_middle.ts"],
    }),
  );
});

Deno.test("generateManifest - additional files are sorted", async (t) => {
  await assertSnapshot(
    t,
    generateManifest({
      name: "@swamp/test",
      version: "1.0.0",
      description: "Test",
      labels: ["test"],
      modelFiles: ["model.ts"],
      additionalFiles: ["README.md", "LICENSE.txt", "CHANGELOG.md"],
    }),
  );
});

Deno.test("generateManifest - multiline release notes", async (t) => {
  await assertSnapshot(
    t,
    generateManifest({
      name: "@swamp/test",
      version: "2.0.0",
      description: "Test extension",
      labels: ["test"],
      modelFiles: ["a.ts"],
      releaseNotes:
        "- New: resource_a\n- Updated: resource_b\n- Removed: resource_c",
    }),
  );
});

Deno.test("generateManifest - explicit platforms list", async (t) => {
  await assertSnapshot(
    t,
    generateManifest({
      name: "@swamp/test",
      version: "2026.01.01.1",
      description: "Platform-specific test",
      labels: ["test"],
      modelFiles: ["model.ts"],
      platforms: ["linux-x86_64", "darwin-aarch64"],
    }),
  );
});
