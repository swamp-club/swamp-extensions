import { assertEquals } from "@std/assert";
import { generateVercelModels, parseResources } from "./pipeline.ts";

const SCHEMA_PATH = new URL("../schemas/vercel.json", import.meta.url)
  .pathname;

async function schemaExists(): Promise<boolean> {
  try {
    await Deno.stat(SCHEMA_PATH);
    return true;
  } catch {
    return false;
  }
}

async function writeGeneratedFiles(
  outputDir: string,
  result: Awaited<ReturnType<typeof generateVercelModels>>,
): Promise<string[]> {
  const writtenFiles: string[] = [];
  for (const [serviceName, svc] of result.services) {
    const serviceDir = `${outputDir}/vercel/${serviceName}`;
    const modelsDir = `${serviceDir}/extensions/models`;
    const libDir = `${modelsDir}/_lib`;
    await Deno.mkdir(libDir, { recursive: true });

    for (const model of svc.models) {
      const fullPath = `${serviceDir}/${model.filePath}`;
      await Deno.writeTextFile(fullPath, model.sourceCode);
      writtenFiles.push(fullPath);
    }

    const libPath = `${serviceDir}/${svc.libFile.filePath}`;
    await Deno.writeTextFile(libPath, svc.libFile.sourceCode);
    writtenFiles.push(libPath);

    await Deno.writeTextFile(
      `${serviceDir}/${svc.denoConfigFile.filePath}`,
      svc.denoConfigFile.sourceCode,
    );
    await Deno.writeTextFile(
      `${serviceDir}/${svc.manifest.filePath}`,
      svc.manifest.sourceCode,
    );

    const fmt = new Deno.Command("deno", {
      args: ["fmt", "--no-config", serviceDir],
      stdout: "piped",
      stderr: "piped",
    });
    await fmt.output();
  }
  return writtenFiles;
}

Deno.test({
  name: "vercel codegen round-trip: generate, check, lint, idempotency",
  ignore: !(await schemaExists()),
  async fn() {
    const tmpDir = await Deno.makeTempDir({ prefix: "vercel-codegen-test-" });
    try {
      const result = await generateVercelModels({
        outputDir: tmpDir,
        schemaPath: SCHEMA_PATH,
      });

      assertEquals(
        result.errors.length,
        0,
        `codegen errors: ${result.errors.join(", ")}`,
      );

      const tsFiles = await writeGeneratedFiles(tmpDir, result);
      assertEquals(
        tsFiles.length > 0,
        true,
        "should generate at least one file",
      );

      const serviceNames = [...result.services.keys()];
      for (const serviceName of serviceNames) {
        const serviceDir = `${tmpDir}/vercel/${serviceName}`;

        const check = new Deno.Command("deno", {
          args: ["check", "extensions/models/"],
          cwd: serviceDir,
          stdout: "piped",
          stderr: "piped",
        });
        const checkResult = await check.output();
        assertEquals(
          checkResult.code,
          0,
          `deno check failed for ${serviceName}: ${
            new TextDecoder().decode(checkResult.stderr)
          }`,
        );

        const lint = new Deno.Command("deno", {
          args: ["lint", "extensions/models/"],
          cwd: serviceDir,
          stdout: "piped",
          stderr: "piped",
        });
        const lintResult = await lint.output();
        assertEquals(
          lintResult.code,
          0,
          `deno lint failed for ${serviceName}: ${
            new TextDecoder().decode(lintResult.stderr)
          }`,
        );
      }

      const result2 = await generateVercelModels({
        outputDir: tmpDir,
        schemaPath: SCHEMA_PATH,
      });

      assertEquals(
        result2.errors.length,
        0,
        `second run errors: ${result2.errors.join(", ")}`,
      );
      for (const [serviceName, svc] of result2.services) {
        for (const change of svc.modelChanges) {
          assertEquals(
            change.status,
            "unchanged",
            `idempotency failure: ${serviceName}/${change.fileName} was ${change.status}`,
          );
        }
      }
    } finally {
      await Deno.remove(tmpDir, { recursive: true });
    }
  },
});

Deno.test("parseResources records create-required fields, dropping parent params and undefined names", () => {
  const body = (properties: Record<string, unknown>, required: string[]) => ({
    requestBody: {
      content: {
        "application/json": {
          schema: { type: "object", properties, required },
        },
      },
    },
  });
  const ok = (properties: Record<string, unknown>) => ({
    responses: {
      "200": {
        content: {
          "application/json": { schema: { type: "object", properties } },
        },
      },
    },
  });
  const spec = {
    paths: {
      "/v1/projects/{idOrName}/widgets": {
        post: {
          tags: ["widgets"],
          ...body(
            {
              idOrName: { type: "string" },
              key: { type: "string" },
              slug: { type: "string" },
              note: { type: "string" },
            },
            // `ghost` is required but never defined as a property.
            ["idOrName", "key", "slug", "ghost"],
          ),
        },
      },
      "/v1/projects/{idOrName}/widgets/{id}": {
        get: { tags: ["widgets"], ...ok({ id: { type: "string" } }) },
        delete: { tags: ["widgets"] },
      },
    },
  } as unknown as Parameters<typeof parseResources>[0];

  const { resources } = parseResources(spec);

  assertEquals(resources.length, 1);
  assertEquals(resources[0].parentParams.map((pp) => pp.paramName), [
    "idOrName",
  ]);
  // slug is kept under its API name, like every other create property.
  assertEquals(resources[0].createRequiredProperties, ["key", "slug"]);
});

// A deployments-shaped resource: get and create return `id` (in a oneOf, so
// no top-level properties), while list items carry only `uid`. The list also
// returns an unrelated array first, like a team members list.
function deploymentsSpec(listProperties: Record<string, unknown>) {
  const oneOf = {
    oneOf: [{ type: "object", properties: { id: { type: "string" } } }],
  };
  const ok = (schema: unknown) => ({
    responses: { "200": { content: { "application/json": { schema } } } },
  });
  return {
    paths: {
      "/v13/gadgets": {
        post: {
          tags: ["gadgets"],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    project: { type: "string" },
                    gitAccessToken: { type: "string", writeOnly: true },
                    importKey: { type: "string" },
                    hookSecret: { type: "string" },
                    hasSecret: { type: "boolean" },
                    buildMachine: { type: "string" },
                  },
                },
              },
            },
          },
          ...ok(oneOf),
        },
      },
      "/v7/gadgets": {
        get: {
          tags: ["gadgets"],
          ...ok({ type: "object", properties: listProperties }),
        },
      },
      "/v13/gadgets/{idOrUrl}": {
        get: { tags: ["gadgets"], ...ok(oneOf) },
        delete: { tags: ["gadgets"] },
      },
    },
  } as unknown as Parameters<typeof parseResources>[0];
}

const itemsOf = (properties: Record<string, unknown>) => ({
  type: "array",
  items: { type: "object", properties },
});

Deno.test("parseResources keys an idOrUrl resource by id and records uid-only list items", () => {
  const { resources } = parseResources(deploymentsSpec({
    invites: itemsOf({ id: { type: "string" }, email: { type: "string" } }),
    gadgets: itemsOf({
      uid: { type: "string" },
      name: { type: "string" },
      projectId: { type: "string" },
    }),
    pagination: { type: "object" },
  }));

  assertEquals(resources.length, 1);
  const r = resources[0];
  assertEquals(r.identifyingField, "id");
  assertEquals(r.listIdentifyingField, "uid");
  assertEquals(r.listItemProperties, ["uid", "name", "projectId"]);
});

Deno.test("parseResources leaves list items unknown when the item array cannot be identified", () => {
  const { resources } = parseResources(deploymentsSpec({
    invites: itemsOf({ id: { type: "string" } }),
    others: itemsOf({ uid: { type: "string" } }),
  }));

  assertEquals(resources[0].listItemProperties, null);
  assertEquals(resources[0].listIdentifyingField, "id");
});

Deno.test("parseResources marks secret request-body fields sensitive", () => {
  const { resources } = parseResources(deploymentsSpec({}));
  const sensitive = Object.entries(resources[0].createProperties)
    .filter(([, prop]) => prop.sensitive)
    .map(([name]) => name);

  // writeOnly, a secret-like string name, and the explicit PEM private key;
  // not the boolean hasSecret, whose name matches but holds no secret.
  assertEquals(sensitive.sort(), ["gitAccessToken", "hookSecret", "importKey"]);
});
