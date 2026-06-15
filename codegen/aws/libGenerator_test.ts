import { assertEquals } from "@std/assert";
import { generateAwsLibFile } from "./libGenerator.ts";

// The generated `_lib/aws.ts` is a string template. To test resolveRegion()
// (which is module-private), we write a modified copy that exports it, then
// dynamic-import with a cache-busting query so each test gets a fresh module.

interface ResolveRegionLib {
  resolveRegion: (
    credentials?: { region?: string },
  ) => string;
}

async function importResolveRegion(): Promise<
  { mod: ResolveRegionLib; cleanup: () => Promise<void> }
> {
  const generated = generateAwsLibFile();
  // Export resolveRegion and strip the CloudControl import (not needed for
  // region resolution tests, and avoids downloading the npm package).
  const testable = generated
    .replace("function resolveRegion(", "export function resolveRegion(")
    .replace(/^import\s+\{[\s\S]*?\}\s+from\s+"npm:@aws-sdk.*?";/m, "")
    .replace(/^import\s+jsonpatch.*?;/m, "");
  const tmp = await Deno.makeTempFile({ suffix: ".ts" });
  await Deno.writeTextFile(tmp, testable);
  try {
    const mod = await import(
      `file://${tmp}?v=${crypto.randomUUID()}`
    ) as unknown as ResolveRegionLib;
    return {
      mod,
      cleanup: async () => {
        await Deno.remove(tmp);
      },
    };
  } catch (err) {
    await Deno.remove(tmp);
    throw err;
  }
}

function withEnv(
  vars: Record<string, string | undefined>,
  fn: () => void,
): void {
  const originals: Record<string, string | undefined> = {};
  for (const key of Object.keys(vars)) {
    originals[key] = Deno.env.get(key);
  }
  try {
    for (const [key, val] of Object.entries(vars)) {
      if (val === undefined) {
        Deno.env.delete(key);
      } else {
        Deno.env.set(key, val);
      }
    }
    fn();
  } finally {
    for (const [key, val] of Object.entries(originals)) {
      if (val === undefined) {
        Deno.env.delete(key);
      } else {
        Deno.env.set(key, val);
      }
    }
  }
}

Deno.test("resolveRegion: explicit credentials.region wins over everything", async () => {
  const { mod, cleanup } = await importResolveRegion();
  try {
    withEnv(
      { AWS_REGION: "ap-southeast-1", AWS_DEFAULT_REGION: "ap-northeast-1" },
      () => {
        assertEquals(
          mod.resolveRegion({ region: "eu-west-2" }),
          "eu-west-2",
        );
      },
    );
  } finally {
    await cleanup();
  }
});

Deno.test("resolveRegion: AWS_REGION takes precedence over AWS_DEFAULT_REGION", async () => {
  const { mod, cleanup } = await importResolveRegion();
  try {
    withEnv(
      {
        AWS_REGION: "us-west-2",
        AWS_DEFAULT_REGION: "eu-central-1",
        AWS_PROFILE: undefined,
        AWS_CONFIG_FILE: undefined,
      },
      () => {
        assertEquals(mod.resolveRegion(), "us-west-2");
      },
    );
  } finally {
    await cleanup();
  }
});

Deno.test("resolveRegion: AWS_DEFAULT_REGION used when AWS_REGION is unset", async () => {
  const { mod, cleanup } = await importResolveRegion();
  try {
    withEnv(
      {
        AWS_REGION: undefined,
        AWS_DEFAULT_REGION: "eu-central-1",
        AWS_PROFILE: undefined,
        AWS_CONFIG_FILE: undefined,
      },
      () => {
        assertEquals(mod.resolveRegion(), "eu-central-1");
      },
    );
  } finally {
    await cleanup();
  }
});

Deno.test("resolveRegion: reads region from ~/.aws/config default profile", async () => {
  const { mod, cleanup } = await importResolveRegion();
  const configFile = await Deno.makeTempFile({ suffix: ".ini" });
  try {
    await Deno.writeTextFile(
      configFile,
      "[default]\nregion = ap-southeast-2\noutput = json\n",
    );
    withEnv(
      {
        AWS_REGION: undefined,
        AWS_DEFAULT_REGION: undefined,
        AWS_PROFILE: undefined,
        AWS_CONFIG_FILE: configFile,
      },
      () => {
        assertEquals(mod.resolveRegion(), "ap-southeast-2");
      },
    );
  } finally {
    await Deno.remove(configFile);
    await cleanup();
  }
});

Deno.test("resolveRegion: reads region from named profile", async () => {
  const { mod, cleanup } = await importResolveRegion();
  const configFile = await Deno.makeTempFile({ suffix: ".ini" });
  try {
    await Deno.writeTextFile(
      configFile,
      "[default]\nregion = us-east-1\n\n[profile staging]\nregion = eu-west-1\n",
    );
    withEnv(
      {
        AWS_REGION: undefined,
        AWS_DEFAULT_REGION: undefined,
        AWS_PROFILE: "staging",
        AWS_CONFIG_FILE: configFile,
      },
      () => {
        assertEquals(mod.resolveRegion(), "eu-west-1");
      },
    );
  } finally {
    await Deno.remove(configFile);
    await cleanup();
  }
});

Deno.test("resolveRegion: falls back to us-east-1 when all sources absent", async () => {
  const { mod, cleanup } = await importResolveRegion();
  try {
    withEnv(
      {
        AWS_REGION: undefined,
        AWS_DEFAULT_REGION: undefined,
        AWS_PROFILE: undefined,
        AWS_CONFIG_FILE: "/nonexistent/path/config",
        HOME: undefined,
      },
      () => {
        assertEquals(mod.resolveRegion(), "us-east-1");
      },
    );
  } finally {
    await cleanup();
  }
});

Deno.test("resolveRegion: falls back to us-east-1 when HOME is unset and no AWS_CONFIG_FILE", async () => {
  const { mod, cleanup } = await importResolveRegion();
  try {
    withEnv(
      {
        AWS_REGION: undefined,
        AWS_DEFAULT_REGION: undefined,
        AWS_PROFILE: undefined,
        AWS_CONFIG_FILE: undefined,
        HOME: undefined,
      },
      () => {
        assertEquals(mod.resolveRegion(), "us-east-1");
      },
    );
  } finally {
    await cleanup();
  }
});
