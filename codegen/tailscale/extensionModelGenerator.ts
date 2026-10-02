// Generates individual Tailscale extension model .ts files.
// Each file exports `const model = { ... }`. Request handling lives in the
// shared _lib/tailscale.ts; the generated methods wire paths, fields and
// state together. See codegen/designs/tailscale.md for the method sets.

import type { ResolvedAction, ResolvedModel, TsProperty } from "./pipeline.ts";
import { syntheticNameArg } from "./pipeline.ts";
import type {
  CollectionEntry,
  KeyedEntry,
  ObservedEntry,
  SettingsEntry,
} from "./resources.ts";
import { generateCopyrightHeader } from "../shared/licenseGenerator.ts";

export interface ExtensionModelInput {
  model: ResolvedModel;
  /** Extension name, e.g. "@swamp/tailscale" */
  extensionName: string;
  /** CalVer version string */
  version: string;
  /** Pre-built upgrades block to insert after the version line */
  upgradesBlock?: string;
}

const LIB_IMPORTS = [
  "apiRequest",
  "expandPath",
  "fillUnset",
  "instanceName",
  "omit",
  "pickDefined",
  "pickPresent",
  "readOptional",
  "readStored",
  "readRequired",
  "requireArgs",
  "requireStored",
  "unwrapList",
];

const CONNECTION_ARG_LINES = [
  `apiKey: z.string().meta({ sensitive: true }).describe("Tailscale API access token. Overrides the TAILSCALE_API_KEY environment variable. Wire with a vault.get(...) expression.").optional()`,
  `oauthClientId: z.string().describe("OAuth client ID, used with oauthClientSecret instead of an API key. Overrides TAILSCALE_OAUTH_CLIENT_ID.").optional()`,
  `oauthClientSecret: z.string().meta({ sensitive: true }).describe("OAuth client secret. Overrides TAILSCALE_OAUTH_CLIENT_SECRET. Wire with a vault.get(...) expression.").optional()`,
  `oauthScopes: z.array(z.string()).describe("Scopes to request when exchanging the OAuth client credentials; defaults to all of the client's scopes.").optional()`,
  `tailnet: z.string().describe("Tailnet ID. Defaults to TAILSCALE_TAILNET, then '-' (the tailnet of the credential in use).").optional()`,
  `baseUrl: z.string().describe("Tailscale API base URL. Defaults to TAILSCALE_BASE_URL, then https://api.tailscale.com.").optional()`,
];

/** Generates a complete extension model file for one Tailscale resource. */
export function generateTailscaleExtensionModel(
  input: ExtensionModelInput,
): string {
  const { model, extensionName, version } = input;
  const entry = model.entry;
  const modelType = `${extensionName}/${entry.model.replace(/_/g, "-")}`;
  const methods = generateMethods(model);
  const hasSecret = model.secretFields.length > 0;

  const lines: string[] = [];
  lines.push(generateCopyrightHeader(), "");
  lines.push(`// Auto-generated extension model for ${modelType}`);
  lines.push(
    `// Do not edit manually. Re-generate with: deno task generate:tailscale`,
  );
  lines.push("", `// deno-lint-ignore-file no-explicit-any`, "");

  lines.push(`/**`);
  lines.push(` * Swamp extension model for a Tailscale ${entry.noun}.`);
  lines.push(` *`);
  for (const line of wrap(entry.description, 76)) lines.push(` * ${line}`);
  lines.push(` *`);
  lines.push(
    ` * Methods: ${methods.map((m) => `\`${m.name}\``).join(", ")}.`,
  );
  lines.push(` *`);
  lines.push(` * @module`);
  lines.push(` */`, "");

  lines.push(`import { z } from "npm:zod@4.3.6";`);
  const used = LIB_IMPORTS.filter((name) =>
    methods.some((m) => new RegExp(`\\b${name}\\(`).test(m.code))
  );
  lines.push(`import { ${used.join(", ")} } from "./_lib/tailscale.ts";`, "");

  // GlobalArgsSchema
  lines.push(`const GlobalArgsSchema = z.object({`);
  const synthetic = syntheticNameArg(model);
  if (synthetic) {
    lines.push(
      `  ${synthetic}: z.string().describe("Instance name for this ${entry.noun}, used as the unique identifier in the factory pattern"),`,
    );
  }
  for (const [name, prop] of Object.entries(model.args)) {
    lines.push(`  ${argLine(model, name, prop)},`);
  }
  for (const line of CONNECTION_ARG_LINES) lines.push(`  ${line},`);
  lines.push(`});`, "");

  // ResourceSchema
  lines.push(`const ResourceSchema = z.object({`);
  for (const [name, prop] of Object.entries(model.stateProps)) {
    lines.push(`  ${propKey(name)}: ${zodLoose(prop)}.optional(),`);
  }
  lines.push(`}).passthrough();`, "");

  if (hasSecret) {
    lines.push(`const SecretSchema = z.object({`);
    for (const field of model.secretFields) {
      lines.push(
        `  ${propKey(field)}: z.string().meta({ sensitive: true }).optional(),`,
      );
    }
    lines.push(`});`, "");
  }

  // InputsSchema mirrors the global arguments, all optional
  lines.push(`const InputsSchema = z.object({`);
  if (synthetic) lines.push(`  ${synthetic}: z.string().optional(),`);
  for (const [name, prop] of Object.entries(model.args)) {
    lines.push(
      `  ${propKey(name)}: ${zodFull(prop)}${
        model.sensitiveArgs.includes(name) ? ".meta({ sensitive: true })" : ""
      }.optional(),`,
    );
  }
  lines.push(`});`, "");

  lines.push(
    `/** Swamp extension model for a Tailscale ${entry.noun}. Registered at \`${modelType}\`. */`,
  );
  lines.push(`export const model = {`);
  lines.push(`  type: "${modelType}",`);
  lines.push(`  version: "${version}",`);
  if (input.upgradesBlock) lines.push(input.upgradesBlock);
  lines.push(`  globalArguments: GlobalArgsSchema,`);
  lines.push(`  inputsSchema: InputsSchema,`);
  lines.push(`  resources: {`);
  lines.push(`    state: {`);
  lines.push(
    `      description: ${JSON.stringify(`${capitalize(entry.noun)} state`)},`,
  );
  lines.push(`      schema: ResourceSchema,`);
  lines.push(`      lifetime: "infinite",`);
  lines.push(`      garbageCollection: 10,`);
  lines.push(`    },`);
  if (hasSecret) {
    lines.push(`    secret: {`);
    lines.push(
      `      description: ${
        JSON.stringify(
          `Secrets returned only when the ${entry.noun} is created (or its secret rotated). Stored in a vault.`,
        )
      },`,
    );
    lines.push(`      schema: SecretSchema,`);
    lines.push(`      lifetime: "infinite",`);
    lines.push(`      garbageCollection: 10,`);
    lines.push(`    },`);
  }
  if (model.actions.some((a) => a.hasResponse && !a.def.writesState)) {
    lines.push(`    result: {`);
    lines.push(
      `      description: "The response of the most recent run of each action that returns data",`,
    );
    lines.push(`      schema: z.record(z.string(), z.unknown()),`);
    lines.push(`      lifetime: "infinite",`);
    lines.push(`      garbageCollection: 10,`);
    lines.push(`    },`);
  }
  lines.push(`  },`);
  lines.push(`  methods: {`);
  for (const method of methods) lines.push(method.code);
  lines.push(`  },`);
  lines.push(`};`, "");
  return lines.join("\n");
}

// --- Methods ---

interface Method {
  name: string;
  code: string;
}

function generateMethods(model: ResolvedModel): Method[] {
  const entry = model.entry;
  const methods = (() => {
    switch (entry.kind) {
      case "collection":
        return collectionMethods(model, entry);
      case "keyed":
        return keyedMethods(model, entry);
      case "settings":
        return settingsMethods(model, entry);
      case "observed":
        return observedMethods(model, entry);
    }
  })();
  return methods;
}

function method(
  name: string,
  description: string,
  args: string,
  argsType: string,
  body: string[],
): Method {
  const argsName = argsType === "Record<string, never>" ? "_args" : "args";
  return {
    name,
    code: [
      `    ${name}: {`,
      `      description: ${JSON.stringify(description)},`,
      `      arguments: z.object({${args}}),`,
      `      execute: async (${argsName}: ${argsType}, context: any) => {`,
      ...(body.some((line) => /\bg\b/.test(line))
        ? [`        const g = context.globalArgs;`]
        : []),
      ...body.map((line) => `        ${line}`),
      `      },`,
      `    },`,
    ].join("\n"),
  };
}

const NO_ARGS = "Record<string, never>";
const lit = (value: unknown) => JSON.stringify(value);

function pathExpr(
  model: ResolvedModel,
  path: string,
  extra: string[] = [],
): string {
  const parents = model.entry.parentParams ?? [];
  const parts = [...parents.map((p) => `${p}: g.${p}`), ...extra];
  return parts.length === 0
    ? `expandPath(${lit(path)}, g)`
    : `expandPath(${lit(path)}, g, { ${parts.join(", ")} })`;
}

function writeState(nameExpr: string, valueExpr: string): string {
  return `await context.writeResource("state", ${nameExpr}, ${valueExpr})`;
}

/** Statements writing `result` to state (and its secrets to `secret`). */
function writeResultLines(model: ResolvedModel, nameExpr: string): string[] {
  if (model.secretFields.length === 0) {
    return [
      `const handle = ${writeState(nameExpr, "result")};`,
      `return { dataHandles: [handle] };`,
    ];
  }
  const secrets = lit(model.secretFields);
  return [
    `const dataHandles = [${
      writeState(nameExpr, `omit(result, ${secrets})`)
    }];`,
    `const secret = pickPresent(result, ${secrets});`,
    // Instance names are unique across a model's resources, so prefix the
    // secret's with its resource name.
    `if (secret) dataHandles.push(await context.writeResource("secret", \`secret-\${${nameExpr}}\`, secret));`,
    `return { dataHandles };`,
  ];
}

/** State-only write that never touches the `secret` resource. */
function writeStateOnlyLines(model: ResolvedModel, nameExpr: string): string[] {
  const value = model.secretFields.length > 0
    ? `omit(result, ${lit(model.secretFields)})`
    : "result";
  return [
    `const handle = ${writeState(nameExpr, value)};`,
    `return { dataHandles: [handle] };`,
  ];
}

/**
 * Statements returning an action's outcome. Swamp methods return only data
 * handles, so a response worth keeping is written to the `result` resource
 * (instance names are prefixed with the resource name, as swamp requires them
 * to be unique across a model's resources).
 */
function actionReturnLines(action: ResolvedAction, scope: string): string[] {
  if (!action.hasResponse) return [`void resp;`, `return { dataHandles: [] };`];
  const name = `\`result-${scope}${action.def.name}\``;
  return [
    `const data = resp.data && typeof resp.data === "object" && !Array.isArray(resp.data) ? resp.data as Record<string, unknown> : { value: resp.data ?? null };`,
    `const handle = await context.writeResource("result", instanceName(${name}), data);`,
    `return { dataHandles: [handle] };`,
  ];
}

/** Statements running an action's request and returning its result. */
function actionRequestLines(
  action: ResolvedAction,
  pathCode: string,
  bodyCode?: string,
): string[] {
  const opts: string[] = [];
  const bodyFields = Object.keys(action.bodyFields);
  if (bodyCode) opts.push(bodyCode);
  else if (bodyFields.length > 0) {
    opts.push(`body: pickDefined(args, ${lit(bodyFields)})`);
  }
  const queryArgs = Object.keys(action.queryArgs);
  if (queryArgs.length > 0) {
    opts.push(
      `query: { ${queryArgs.map((q) => `${q}: args.${q}`).join(", ")} }`,
    );
  }
  return [
    `const resp = await apiRequest(g, ${
      lit(action.def.op.method)
    }, ${pathCode}${opts.length > 0 ? `, { ${opts.join(", ")} }` : ""});`,
  ];
}

/** Zod argument shape and TS type for an action's method arguments. */
function actionArgs(
  action: ResolvedAction,
  leading: { name: string; zod: string; ts: string }[] = [],
): { args: string; type: string } {
  const fields: { name: string; zod: string; ts: string }[] = [...leading];
  for (const [name, prop] of Object.entries(action.pathArgs)) {
    fields.push({ name, zod: describe(zodFull(prop), prop), ts: "string" });
  }
  for (const [name, prop] of Object.entries(action.bodyFields)) {
    const required = action.bodyRequired.includes(name);
    fields.push({
      name,
      zod: describe(zodFull(prop), prop) + (required ? "" : ".optional()"),
      ts: `${tsType(prop)}`,
    });
  }
  for (const [name, prop] of Object.entries(action.queryArgs)) {
    fields.push({
      name,
      zod: describe(zodFull(prop), prop) + ".optional()",
      ts: tsType(prop),
    });
  }
  if (fields.length === 0) return { args: "", type: NO_ARGS };
  return {
    args: ` ${fields.map((f) => `${propKey(f.name)}: ${f.zod}`).join(", ")} `,
    type: `{ ${fields.map((f) => `${propKey(f.name)}?: ${f.ts}`).join("; ")} }`,
  };
}

// --- collection ---

function collectionMethods(
  model: ResolvedModel,
  entry: CollectionEntry,
): Method[] {
  const methods: Method[] = [];
  const noun = entry.noun;
  const id = entry.idField;
  const naming = entry.namingField;
  // Stored state is keyed on the instance-name argument, never on the
  // resource's own name, so a rename through update still finds it.
  const nameArg = syntheticNameArg(model)!;
  const storedName = `instanceName(g.${nameArg})`;
  const resultName = (idExpr: string) =>
    `instanceName(g.${nameArg}, String(${idExpr}))`;
  const idPath = (path: string, idExpr: string) =>
    pathExpr(model, path, [`${entry.idParam}: ${idExpr}`]);
  const storedLines = [
    `const name = ${storedName};`,
    `const stored = await requireStored(context, name, "run create, get or adopt first");`,
  ];

  // create
  const createBody = [
    entry.createDefaults ? `...${lit(entry.createDefaults)}` : "",
    `...pickDefined(g, ${lit(model.createFields)})`,
    entry.fixedBody ? `...${lit(entry.fixedBody)}` : "",
  ].filter(Boolean).join(", ");
  methods.push(method(
    "create",
    `Create ${article(noun)} ${noun}`,
    "",
    NO_ARGS,
    [
      ...(model.createRequired.length > 0
        ? [`requireArgs(g, ${lit(model.createRequired)}, "create");`]
        : []),
      `// Refuse to orphan a live ${noun} this instance already tracks.`,
      `const existing = await readStored(context, ${storedName});`,
      `// Gone: deleted, not found, or (for keys) revoked or invalid.`,
      `if (existing && !existing.deletedAt && existing.status !== "not_found" && !existing.revoked && existing.invalid !== true) {`,
      `  throw new Error(\`Instance \${${storedName}} already tracks ${noun} \${existing.${id}}. Delete it first, or use a different ${nameArg}.\`);`,
      `}`,
      `const body = { ${createBody} };`,
      `const resp = await apiRequest(g, ${lit(entry.create.method)}, ${
        pathExpr(model, entry.create.path)
      }, { body${entry.arrayBody ? ": [body]" : ""} });`,
      ...(entry.arrayBody
        ? [
          `const created = Array.isArray(resp.data) ? resp.data : [];`,
          `if (created.length === 0) throw new Error(${
            lit(`Tailscale returned no ${noun} from create`)
          });`,
          `const result = created[0] as Record<string, unknown>;`,
        ]
        : [`const result = resp.data as Record<string, unknown>;`]),
      ...writeResultLines(model, resultName(`result.${id}`)),
    ],
  ));

  // get
  methods.push(method(
    "get",
    `Get ${article(noun)} ${noun} by ID`,
    ` id: z.string().describe(${lit(`The ${noun}'s ID`)}) `,
    "{ id: string }",
    [
      `const result = await readRequired(g, ${
        idPath(entry.read.path, "args.id")
      });`,
      `// Write to the tracked instance only when it is this resource (or tracks`,
      `// nothing live); otherwise keep it apart, as list does. adopt re-targets.`,
      `const tracked = await readStored(context, ${storedName});`,
      `const tracksOther = tracked && tracked.${id} !== result.${id} && !tracked.deletedAt && tracked.status !== "not_found" && !tracked.revoked && tracked.invalid !== true;`,
      `const name = tracksOther ? instanceName(\`item-\${args.id}\`) : ${
        resultName("args.id")
      };`,
      ...writeStateOnlyLines(model, "name"),
    ],
  ));

  // update
  if (entry.update) {
    const isPut = entry.update.method === "PUT";
    const fill = model.updateFields.filter((f) =>
      !model.sensitiveArgs.includes(f) && f in model.stateProps
    );
    methods.push(method(
      "update",
      `Update the ${noun} from the global arguments`,
      "",
      NO_ARGS,
      [
        ...storedLines,
        `${
          isPut && fill.length > 0 ? "let" : "const"
        } body: Record<string, unknown> = { ...pickDefined(g, ${
          lit(model.updateFields)
        })${entry.fixedBody ? `, ...${lit(entry.fixedBody)}` : ""} };`,
        ...(isPut && fill.length > 0
          ? [
            `// PUT replaces the ${noun}: keep the live value of unset fields.`,
            `const live = await readRequired(g, ${
              idPath(entry.read.path, `stored.${id}`)
            });`,
            `body = fillUnset(body, live, ${lit(fill)});`,
          ]
          : []),
        `await apiRequest(g, ${lit(entry.update.method)}, ${
          idPath(entry.update.path, `stored.${id}`)
        }, { body });`,
        `const result = await readRequired(g, ${
          idPath(entry.read.path, `stored.${id}`)
        });`,
        ...writeStateOnlyLines(model, "name"),
      ],
    ));
  }

  // delete
  methods.push(method(
    "delete",
    `Delete the ${noun}`,
    ` id: z.string().describe(${
      lit(`The ${noun}'s ID; defaults to the stored ${noun}`)
    }).optional() `,
    "{ id?: string }",
    [
      `const stored = await readStored(context, ${storedName});`,
      `const id = args.id ?? stored?.${id};`,
      `if (id === undefined || id === null || id === "") throw new Error("pass id, or run create, get or adopt first");`,
      `// Record the deletion on the stored instance only when it is that resource;`,
      `// another ID is recorded under item-<id>, as get and list write it, so the`,
      `// stored resource stays tracked.`,
      `const name = stored && stored.${id} === id ? ${storedName} : instanceName(\`item-\${id}\`);`,
      `const resp = await apiRequest(g, ${lit(entry.delete.method)}, ${
        idPath(entry.delete.path, "id")
      }, { allowStatus: [404] });`,
      `const existed = resp.status !== 404;`,
      `const handle = ${
        writeState(
          "name",
          `{ ${
            propKey(id)
          }: id, existed, status: existed ? "deleted" : "not_found", deletedAt: new Date().toISOString() }`,
        )
      };`,
      `return { dataHandles: [handle] };`,
    ],
  ));

  // sync
  methods.push(method(
    "sync",
    `Refresh the stored ${noun} from Tailscale`,
    "",
    NO_ARGS,
    [
      ...storedLines,
      `const result = await readOptional(g, ${
        idPath(entry.read.path, `stored.${id}`)
      });`,
      `if (!result) {`,
      `  const handle = ${
        writeState(
          "name",
          `{ ${
            propKey(id)
          }: stored.${id}, status: "not_found", syncedAt: new Date().toISOString() }`,
        )
      };`,
      `  return { dataHandles: [handle] };`,
      `}`,
      ...writeStateOnlyLines(model, "name"),
    ],
  ));

  // list
  const filter = entry.listFilter
    ? Object.entries(entry.listFilter).map(([k, v]) =>
      `item.${k} === ${lit(v)}`
    ).join(" && ")
    : "";
  methods.push(method(
    "list",
    `List ${noun}s and write each to state`,
    "",
    NO_ARGS,
    [
      `const resp = await apiRequest(g, "GET", ${
        pathExpr(model, entry.list.path)
      }${entry.listQuery ? `, { query: ${lit(entry.listQuery)} }` : ""});`,
      `const items = unwrapList(resp.data, ${lit(model.listWrapperKey)})${
        filter ? `.filter((item) => ${filter})` : ""
      };`,
      `const dataHandles: any[] = [];`,
      `for (const item of items) {`,
      `  const name = instanceName(${
        // Keyed by ID with a prefix, so a listed item can never overwrite
        // the instance this definition tracks.
        `\`item-\${item.${id}}\``}, "unknown");`,
      `  dataHandles.push(${
        writeState(
          "name",
          model.secretFields.length > 0
            ? `omit(item, ${lit(model.secretFields)})`
            : "item",
        )
      });`,
      `}`,
      `return { dataHandles };`,
    ],
  ));

  // lookup — only with a natural naming field
  if (naming) {
    methods.push(method(
      "lookup",
      `Find an existing ${noun} by ${naming} and write it to state`,
      "",
      NO_ARGS,
      [
        `requireArgs(g, [${lit(naming)}], "lookup");`,
        `const resp = await apiRequest(g, "GET", ${
          pathExpr(model, entry.list.path)
        });`,
        `const matches = unwrapList(resp.data, ${
          lit(model.listWrapperKey)
        }).filter((item) => item.${naming} === g.${naming});`,
        `if (matches.length !== 1) {`,
        `  throw new Error(\`Expected one ${noun} with ${naming}=\${g.${naming}}, found \${matches.length}. Use adopt with a specific ID instead.\`);`,
        `}`,
        `const result = await readRequired(g, ${
          idPath(entry.read.path, `matches[0].${id}`)
        });`,
        ...writeStateOnlyLines(model, storedName),
      ],
    ));
  }

  // adopt
  methods.push(method(
    "adopt",
    `Adopt an existing ${noun} by ID into managed state`,
    naming
      ? ` id: z.string().describe(${
        lit(`The ID of the ${noun} to adopt`)
      }), expected_name: z.string().describe(${
        lit(`Expected ${naming}, checked before adopting`)
      }).optional() `
      : ` id: z.string().describe(${lit(`The ID of the ${noun} to adopt`)}) `,
    naming ? "{ id: string; expected_name?: string }" : "{ id: string }",
    [
      `const result = await readRequired(g, ${
        idPath(entry.read.path, "args.id")
      });`,
      ...(naming
        ? [
          `if (args.expected_name !== undefined && result.${naming} !== args.expected_name) {`,
          `  throw new Error(\`Identity mismatch: expected ${naming}=\${args.expected_name} but got \${result.${naming}}\`);`,
          `}`,
        ]
        : []),
      ...writeStateOnlyLines(model, resultName("args.id")),
    ],
  ));

  // actions — target the stored resource
  for (const action of model.actions) {
    const { args, type } = actionArgs(action);
    const extra = [
      `${entry.idParam}: stored.${id}`,
      ...Object.keys(action.pathArgs).map((p) => `${p}: args.${p}`),
    ];
    const body = [
      ...storedLines,
      ...actionRequestLines(action, pathExpr(model, action.def.op.path, extra)),
    ];
    if (action.def.writesState) {
      body.push(`const result = resp.data as Record<string, unknown>;`);
      body.push(
        ...(action.def.writesSecret
          ? writeResultLines(model, "name")
          : writeStateOnlyLines(model, "name")),
      );
    } else {
      body.push(...actionReturnLines(action, "${name}-"));
    }
    methods.push(
      method(action.def.name, action.def.description, args, type, body),
    );
  }
  return methods;
}

// --- keyed ---

function keyedMethods(model: ResolvedModel, entry: KeyedEntry): Method[] {
  const methods: Method[] = [];
  const noun = entry.noun;
  const keyArg = entry.keyField ?? entry.keyParam;
  const keyPath = (path: string, extra: string[] = []) =>
    pathExpr(model, path, [`${entry.keyParam}: g.${keyArg}`, ...extra]);
  const name = `instanceName(g.${keyArg})`;
  const fill = model.createFields.filter((f) =>
    !model.sensitiveArgs.includes(f) && f in model.stateProps
  );
  const exists = entry.existsField
    ? `existing && existing.${entry.existsField} !== undefined && existing.${entry.existsField} !== null && existing.${entry.existsField} !== ""`
    : "existing";
  const required = [...new Set([keyArg, ...model.createRequired])];

  methods.push(method(
    "create",
    `Create the ${noun}; fails if one already exists for ${keyArg}`,
    "",
    NO_ARGS,
    [
      `requireArgs(g, ${lit(required)}, "create");`,
      `// Advisory only: the ${entry.upsert.method} is an unconditional upsert, so two`,
      `// concurrent creates can both pass this check and the later write wins.`,
      `const existing = await readOptional(g, ${keyPath(entry.read.path)});`,
      `if (${exists}) {`,
      `  throw new Error(\`A ${noun} already exists for ${keyArg}=\${g.${keyArg}}. Run get to adopt it, then update.\`);`,
      `}`,
      `await apiRequest(g, ${lit(entry.upsert.method)}, ${
        keyPath(entry.upsert.path)
      }, { body: pickDefined(g, ${lit(model.createFields)}) });`,
      `const result = await readRequired(g, ${keyPath(entry.read.path)});`,
      `const handle = ${writeState(name, "result")};`,
      `return { dataHandles: [handle] };`,
    ],
  ));

  methods.push(method(
    "get",
    `Get the ${noun} for ${keyArg} and write it to state`,
    "",
    NO_ARGS,
    [
      `requireArgs(g, [${lit(keyArg)}], "get");`,
      `const result = await readRequired(g, ${keyPath(entry.read.path)});`,
      `const handle = ${writeState(name, "result")};`,
      `return { dataHandles: [handle] };`,
    ],
  ));

  methods.push(method(
    "update",
    `Update the ${noun} from the global arguments`,
    "",
    NO_ARGS,
    [
      `requireArgs(g, [${lit(keyArg)}], "update");`,
      `// PUT replaces the ${noun}: keep the live value of unset fields.`,
      `const live = await readRequired(g, ${keyPath(entry.read.path)});`,
      `const body = fillUnset(pickDefined(g, ${
        lit(model.createFields)
      }), live, ${lit(fill)});`,
      `await apiRequest(g, ${lit(entry.upsert.method)}, ${
        keyPath(entry.upsert.path)
      }, { body });`,
      `const result = await readRequired(g, ${keyPath(entry.read.path)});`,
      `const handle = ${writeState(name, "result")};`,
      `return { dataHandles: [handle] };`,
    ],
  ));

  methods.push(method(
    "delete",
    `Delete the ${noun}`,
    "",
    NO_ARGS,
    [
      `requireArgs(g, [${lit(keyArg)}], "delete");`,
      `const resp = await apiRequest(g, ${lit(entry.delete.method)}, ${
        keyPath(entry.delete.path)
      }, { allowStatus: [404] });`,
      `const existed = resp.status !== 404;`,
      `const handle = ${
        writeState(
          name,
          `{ ${
            propKey(keyArg)
          }: g.${keyArg}, existed, status: existed ? "deleted" : "not_found", deletedAt: new Date().toISOString() }`,
        )
      };`,
      `return { dataHandles: [handle] };`,
    ],
  ));

  methods.push(method(
    "sync",
    `Refresh the ${noun} from Tailscale`,
    "",
    NO_ARGS,
    [
      `requireArgs(g, [${lit(keyArg)}], "sync");`,
      `const result = await readOptional(g, ${keyPath(entry.read.path)});`,
      `const handle = ${
        writeState(
          name,
          `result ?? { ${
            propKey(keyArg)
          }: g.${keyArg}, status: "not_found", syncedAt: new Date().toISOString() }`,
        )
      };`,
      `return { dataHandles: [handle] };`,
    ],
  ));

  if (entry.list) {
    methods.push(method(
      "list",
      `List ${noun}s and write each to state`,
      "",
      NO_ARGS,
      [
        `const resp = await apiRequest(g, "GET", ${
          pathExpr(model, entry.list.path)
        });`,
        `const items = unwrapList(resp.data, ${lit(model.listWrapperKey)});`,
        `const dataHandles: any[] = [];`,
        `for (const item of items) {`,
        `  dataHandles.push(${
          writeState(`instanceName(item.${keyArg}, "unknown")`, "item")
        });`,
        `}`,
        `return { dataHandles };`,
      ],
    ));
  }

  for (const action of model.actions) {
    const { args, type } = actionArgs(action);
    const extra = Object.keys(action.pathArgs).map((p) => `${p}: args.${p}`);
    methods.push(method(
      action.def.name,
      action.def.description,
      args,
      type,
      [
        `requireArgs(g, [${lit(keyArg)}], ${lit(action.def.name)});`,
        ...actionRequestLines(action, keyPath(action.def.op.path, extra)),
        ...actionReturnLines(action, `\${g.${keyArg}}-`),
      ],
    ));
  }
  return methods;
}

// --- settings ---

function settingsMethods(
  model: ResolvedModel,
  entry: SettingsEntry,
): Method[] {
  if (entry.special === "policyFile") return policyFileMethods(model, entry);

  const noun = entry.noun;
  const parents = entry.parentParams ?? [];
  const name = entry.special === "splitDns"
    ? "instanceName(g.domain)"
    : parents.length > 0
    ? `instanceName([${parents.map((p) => `g.${p}`).join(", ")}].join("-"))`
    : `"current"`;
  const required = entry.special === "splitDns"
    ? ["domain", ...parents]
    : parents;
  const readQuery = entry.readQuery ? `, ${lit(entry.readQuery)}` : "";

  // Statements leaving the current state in `result`
  const readLines = (() => {
    switch (entry.special) {
      case "splitDns":
        return [
          `const data = await readRequired(g, ${
            pathExpr(model, entry.read.path)
          });`,
          `const result = { domain: g.domain, nameservers: (data[g.domain] as string[] | null | undefined) ?? [] };`,
        ];
      case "postureAttribute":
        return [
          `const data = await readRequired(g, ${
            pathExpr(model, entry.read.path)
          });`,
          `const attributes = (data.attributes ?? {}) as Record<string, unknown>;`,
          `const expiries = (data.expiries ?? {}) as Record<string, unknown>;`,
          `const result = { attributeKey: g.attributeKey, value: attributes[g.attributeKey], expiry: expiries[g.attributeKey] };`,
        ];
      default:
        return entry.readFields
          ? [
            `const data = await readRequired(g, ${
              pathExpr(model, entry.read.path)
            }${readQuery});`,
            `const result = pickDefined(data, ${lit(entry.readFields)});`,
          ]
          : [
            `const result = await readRequired(g, ${
              pathExpr(model, entry.read.path)
            }${readQuery});`,
          ];
    }
  })();

  // Statements sending the desired state
  const applyLines = (() => {
    switch (entry.special) {
      case "contacts": {
        const types = model.createFields;
        return [
          `for (const contactType of ${lit(types)}) {`,
          `  if (g[contactType] === undefined) continue;`,
          `  await apiRequest(g, ${lit(entry.apply.method)}, ${
            pathExpr(model, entry.apply.path, ["contactType"])
          }, { body: g[contactType] });`,
          `}`,
        ];
      }
      case "splitDns":
        return [
          `await apiRequest(g, ${lit(entry.apply.method)}, ${
            pathExpr(model, entry.apply.path)
          }, { body: { [g.domain]: g.nameservers } });`,
        ];
      default: {
        const fill = model.createFields.filter((f) =>
          !model.sensitiveArgs.includes(f) && f in model.stateProps
        );
        const replaces = entry.apply.method !== "PATCH" && fill.length > 0 &&
          !entry.readFields && entry.special !== "postureAttribute";
        return [
          `${
            replaces ? "let" : "const"
          } body: Record<string, unknown> = pickDefined(g, ${
            lit(model.createFields)
          });`,
          ...(replaces
            ? [
              `// This endpoint replaces the ${noun}: keep the live value of unset fields.`,
              `body = fillUnset(body, await readRequired(g, ${
                pathExpr(model, entry.read.path)
              }${readQuery}), ${lit(fill)});`,
            ]
            : []),
          `await apiRequest(g, ${lit(entry.apply.method)}, ${
            pathExpr(model, entry.apply.path)
          }, { body });`,
        ];
      }
    }
  })();

  const applyBody = (methodName: string) => [
    ...(required.length > 0 || model.createRequired.length > 0
      ? [
        `requireArgs(g, ${
          lit([...new Set([...required, ...model.createRequired])])
        }, ${lit(methodName)});`,
      ]
      : []),
    ...applyLines,
    ...readLines,
    `const handle = ${writeState(name, "result")};`,
    `return { dataHandles: [handle] };`,
  ];

  const readBody = (methodName: string) => [
    ...(required.length > 0
      ? [`requireArgs(g, ${lit(required)}, ${lit(methodName)});`]
      : []),
    ...readLines,
    `const handle = ${writeState(name, "result")};`,
    `return { dataHandles: [handle] };`,
  ];

  const deleteBody = (() => {
    const lines = required.length > 0
      ? [`requireArgs(g, ${lit(required)}, "delete");`]
      : [];
    const record = (status: string) =>
      `{ status: ${lit(status)}, deletedAt: new Date().toISOString() }`;
    switch (entry.delete.mode) {
      case "noop":
        lines.push(
          `context.logger.warning(${lit(entry.delete.warning)});`,
          `const handle = ${writeState(name, record("unmanaged"))};`,
        );
        break;
      case "clear": {
        const body = entry.special === "splitDns"
          ? "{ [g.domain]: null }"
          : lit(entry.delete.body);
        lines.push(
          `await apiRequest(g, ${lit(entry.delete.op.method)}, ${
            pathExpr(model, entry.delete.op.path)
          }, { body: ${body} });`,
          `const handle = ${writeState(name, record("cleared"))};`,
        );
        break;
      }
      case "api":
        lines.push(
          `const resp = await apiRequest(g, ${lit(entry.delete.op.method)}, ${
            pathExpr(model, entry.delete.op.path)
          }, { allowStatus: [404] });`,
          `const handle = ${
            writeState(
              name,
              `{ status: resp.status === 404 ? "not_found" : "deleted", deletedAt: new Date().toISOString() }`,
            )
          };`,
        );
        break;
    }
    lines.push(`return { dataHandles: [handle] };`);
    return lines;
  })();

  const deleteDescription = entry.delete.mode === "noop"
    ? `Stop managing the ${noun}; Tailscale keeps the current values`
    : entry.delete.mode === "clear"
    ? `Clear the ${noun}`
    : `Delete the ${noun}`;

  const methods: Method[] = [
    method(
      "create",
      `Apply the ${noun} from the global arguments`,
      "",
      NO_ARGS,
      applyBody("create"),
    ),
    method(
      "get",
      `Read the current ${noun} into state`,
      "",
      NO_ARGS,
      readBody("get"),
    ),
    method(
      "update",
      `Apply the ${noun} from the global arguments`,
      "",
      NO_ARGS,
      applyBody("update"),
    ),
    method("delete", deleteDescription, "", NO_ARGS, deleteBody),
    method(
      "sync",
      `Refresh the ${noun} from Tailscale`,
      "",
      NO_ARGS,
      readBody("sync"),
    ),
  ];

  for (const action of model.actions) {
    const { args, type } = actionArgs(action);
    const extra = Object.keys(action.pathArgs).map((p) => `${p}: args.${p}`);
    methods.push(method(
      action.def.name,
      action.def.description,
      args,
      type,
      [
        ...actionRequestLines(
          action,
          pathExpr(model, action.def.op.path, extra),
        ),
        ...actionReturnLines(action, ""),
      ],
    ));
  }
  return methods;
}

function policyFileMethods(
  model: ResolvedModel,
  entry: SettingsEntry,
): Method[] {
  const readPath = pathExpr(model, entry.read.path);
  const applyPath = pathExpr(model, entry.apply.path);
  const readLines = [
    `// Ask for HuJSON so comments and formatting survive.`,
    `const read = await apiRequest(g, "GET", ${readPath}, { accept: "application/hujson", raw: true });`,
    `const result = { policy: String(read.data ?? ""), etag: read.headers.get("ETag") ?? undefined };`,
  ];
  const write = [
    `const handle = await context.writeResource("state", "current", result);`,
    `return { dataHandles: [handle] };`,
  ];
  const post = (ifMatch: string) =>
    `const resp = await apiRequest(g, "POST", ${applyPath}, { rawBody: g.policy, contentType: "application/hujson", headers: ${ifMatch}, allowStatus: [412] });`;

  const methods: Method[] = [
    method(
      "create",
      "Replace the policy file; refuses to overwrite an edited policy unless overwriteExistingContent is set",
      "",
      NO_ARGS,
      [
        `requireArgs(g, ["policy"], "create");`,
        `// "ts-default" only matches a policy file nobody has edited yet.`,
        post(
          `g.overwriteExistingContent ? {} : { "If-Match": '"ts-default"' }`,
        ),
        `if (resp.status === 412) {`,
        `  throw new Error("The tailnet's policy file has been edited, so create will not replace it. Run get to adopt the current policy and then update, or set overwriteExistingContent to replace it.");`,
        `}`,
        ...readLines,
        ...write,
      ],
    ),
    method("get", "Read the current policy file into state", "", NO_ARGS, [
      ...readLines,
      ...write,
    ]),
    method(
      "update",
      "Replace the policy file; refuses if it changed since the last get or sync",
      "",
      NO_ARGS,
      [
        `requireArgs(g, ["policy"], "update");`,
        `const stored = await requireStored(context, "current", "run create or get first");`,
        `if (!stored.etag) throw new Error("No ETag is stored for the policy file, so update cannot check it has not changed. Run get or sync first.");`,
        post(`{ "If-Match": String(stored.etag) }`),
        `if (resp.status === 412) {`,
        `  throw new Error("The policy file changed since the last get or sync. Run sync, reconcile the changes into the policy argument, then update again.");`,
        `}`,
        ...readLines,
        ...write,
      ],
    ),
    method(
      "delete",
      "Stop managing the policy file; resets it to the default only when resetOnDelete is set",
      "",
      NO_ARGS,
      [
        `if (!g.resetOnDelete) {`,
        `  context.logger.warning(${
          lit(entry.delete.mode === "noop" ? entry.delete.warning : "")
        });`,
        `  const handle = await context.writeResource("state", "current", { status: "unmanaged", deletedAt: new Date().toISOString() });`,
        `  return { dataHandles: [handle] };`,
        `}`,
        `// An empty policy file resets the tailnet to the default policy.`,
        `await apiRequest(g, "POST", ${applyPath}, { rawBody: "", contentType: "application/hujson" });`,
        `const handle = await context.writeResource("state", "current", { status: "reset", deletedAt: new Date().toISOString() });`,
        `return { dataHandles: [handle] };`,
      ],
    ),
    method(
      "sync",
      "Refresh the policy file from Tailscale",
      "",
      NO_ARGS,
      [...readLines, ...write],
    ),
  ];

  for (const action of model.actions) {
    const { args, type } = actionArgs(action);
    methods.push(method(
      action.def.name,
      action.def.description,
      args,
      type,
      [
        `requireArgs(g, ["policy"], ${lit(action.def.name)});`,
        ...actionRequestLines(
          action,
          pathExpr(model, action.def.op.path),
          `rawBody: g.policy, contentType: "application/hujson"`,
        ),
        ...actionReturnLines(action, ""),
      ],
    ));
  }
  return methods;
}

// --- observed ---

function observedMethods(model: ResolvedModel, entry: ObservedEntry): Method[] {
  const noun = entry.noun;
  const id = entry.idField;
  const naming = entry.namingField;
  const query = entry.readQuery ? `, ${lit(entry.readQuery)}` : "";
  const idPath = (path: string, idExpr: string, extra: string[] = []) =>
    pathExpr(model, path, [`${entry.idParam}: ${idExpr}`, ...extra]);
  // Keyed by ID: names change (set_name), IDs do not.
  const nameOf = (v: string, idExpr: string) =>
    `instanceName(${v}.${id} ?? ${idExpr}, "unknown")`;
  const idArg = ` id: z.string().describe(${lit(`The ${noun}'s ID`)}) `;
  const readInto = (idExpr: string) =>
    `const result = await readRequired(g, ${
      idPath(entry.read.path, idExpr)
    }${query});`;

  const methods: Method[] = [
    method(
      "get",
      `Get ${article(noun)} ${noun} by ID`,
      idArg,
      "{ id: string }",
      [
        readInto("args.id"),
        `const handle = ${writeState(nameOf("result", "args.id"), "result")};`,
        `return { dataHandles: [handle] };`,
      ],
    ),
  ];

  if (entry.delete) {
    methods.push(method(
      "delete",
      `Delete the ${noun} from the tailnet`,
      idArg,
      "{ id: string }",
      [
        `// Read first so the record lands on the instance get, adopt and list wrote.`,
        `const current = await readOptional(g, ${
          idPath(entry.read.path, "args.id")
        }${query});`,
        `const resp = await apiRequest(g, ${lit(entry.delete.method)}, ${
          idPath(entry.delete.path, "args.id")
        }, { allowStatus: [404] });`,
        `const existed = resp.status !== 404;`,
        `const handle = ${
          writeState(
            `instanceName(current?.${id} ?? args.id)`,
            `{ ${
              propKey(id)
            }: args.id, existed, status: existed ? "deleted" : "not_found", deletedAt: new Date().toISOString() }`,
          )
        };`,
        `return { dataHandles: [handle] };`,
      ],
    ));
  }

  methods.push(method(
    "list",
    `List ${noun}s in the tailnet and write each to state`,
    "",
    NO_ARGS,
    [
      `const resp = await apiRequest(g, "GET", ${
        pathExpr(model, entry.list.path)
      }${entry.readQuery ? `, { query: ${lit(entry.readQuery)} }` : ""});`,
      `const items = unwrapList(resp.data, ${lit(model.listWrapperKey)});`,
      `const dataHandles: any[] = [];`,
      `for (const item of items) {`,
      `  dataHandles.push(${
        writeState(nameOf("item", `item.${id} ?? "unknown"`), "item")
      });`,
      `}`,
      `return { dataHandles };`,
    ],
  ));

  methods.push(method(
    "adopt",
    `Adopt an existing ${noun} by ID into managed state`,
    ` id: z.string().describe(${
      lit(`The ID of the ${noun} to adopt`)
    }), expected_name: z.string().describe(${
      lit(`Expected ${naming}, checked before adopting`)
    }).optional() `,
    "{ id: string; expected_name?: string }",
    [
      readInto("args.id"),
      `if (args.expected_name !== undefined && result.${naming} !== args.expected_name) {`,
      `  throw new Error(\`Identity mismatch: expected ${naming}=\${args.expected_name} but got \${result.${naming}}\`);`,
      `}`,
      `const handle = ${writeState(nameOf("result", "args.id"), "result")};`,
      `return { dataHandles: [handle] };`,
    ],
  ));

  // Actions change the resource, so re-read it into state afterwards.
  for (const action of model.actions) {
    const { args, type } = actionArgs(action, [
      {
        name: "id",
        zod: `z.string().describe(${lit(`The ${noun}'s ID`)})`,
        ts: "string",
      },
    ]);
    const extra = Object.keys(action.pathArgs).map((p) => `${p}: args.${p}`);
    methods.push(method(
      action.def.name,
      action.def.description,
      args,
      type,
      [
        ...actionRequestLines(
          action,
          idPath(action.def.op.path, "args.id", extra),
        ),
        `void resp;`,
        readInto("args.id"),
        `const handle = ${writeState(nameOf("result", "args.id"), "result")};`,
        `return { dataHandles: [handle] };`,
      ],
    ));
  }
  return methods;
}

// --- Zod generation ---

function argLine(model: ResolvedModel, name: string, prop: TsProperty): string {
  let expr = zodFull(prop);
  if (model.sensitiveArgs.includes(name)) expr += ".meta({ sensitive: true })";
  expr = describe(expr, prop);
  if (!model.requiredArgs.includes(name)) expr += ".optional()";
  return `${propKey(name)}: ${expr}`;
}

function describe(expr: string, prop: TsProperty): string {
  return prop.description
    ? `${expr}.describe(${JSON.stringify(prop.description)})`
    : expr;
}

/** Zod expression with constraints, for inputs. */
export function zodFull(prop: TsProperty): string {
  let expr: string;
  switch (prop.type) {
    case "boolean":
      expr = "z.boolean()";
      break;
    case "string":
      expr = prop.enum && prop.enum.length > 0
        ? `z.enum(${JSON.stringify(prop.enum.map(String))})`
        : "z.string()";
      break;
    case "number":
    case "integer": {
      const base = prop.type === "integer" ? "z.number().int()" : "z.number()";
      expr = prop.enum && prop.enum.length > 0
        ? `z.union([${
          prop.enum.map((v) => `z.literal(${JSON.stringify(v)})`).join(", ")
        }])`
        : base;
      break;
    }
    case "array":
      expr = `z.array(${prop.items ? zodFull(prop.items) : "z.unknown()"})`;
      break;
    case "object":
      expr = zodObject(prop, zodFull, true);
      break;
    default:
      expr = prop.variants && prop.variants.length > 1
        ? `z.union([${prop.variants.map(zodFull).join(", ")}])`
        : "z.unknown()";
  }
  return prop.nullable ? `${expr}.nullable()` : expr;
}

/** Zod expression without constraints, for stored state. */
export function zodLoose(prop: TsProperty): string {
  let expr: string;
  switch (prop.type) {
    case "boolean":
      expr = "z.boolean()";
      break;
    case "string":
      expr = "z.string()";
      break;
    case "number":
    case "integer":
      expr = "z.number()";
      break;
    case "array":
      expr = `z.array(${prop.items ? zodLoose(prop.items) : "z.unknown()"})`;
      break;
    case "object":
      expr = zodObject(prop, zodLoose, false);
      break;
    default:
      expr = "z.unknown()";
  }
  return prop.nullable ? `${expr}.nullable()` : expr;
}

function zodObject(
  prop: TsProperty,
  inner: (p: TsProperty) => string,
  keepRequired: boolean,
): string {
  if (prop.properties && Object.keys(prop.properties).length > 0) {
    const required = new Set(keepRequired ? prop.required ?? [] : []);
    const fields = Object.entries(prop.properties).map(([k, v]) =>
      `${propKey(k)}: ${inner(v)}${required.has(k) ? "" : ".optional()"}`
    );
    return `z.object({ ${fields.join(", ")} })${
      keepRequired ? "" : ".passthrough()"
    }`;
  }
  if (prop.additionalProperties) {
    return `z.record(z.string(), ${inner(prop.additionalProperties)})`;
  }
  return "z.record(z.string(), z.unknown())";
}

function tsType(prop: TsProperty): string {
  switch (prop.type) {
    case "boolean":
      return "boolean";
    case "string":
      return "string";
    case "number":
    case "integer":
      return "number";
    case "array":
      return "unknown[]";
    case "object":
      return "Record<string, unknown>";
    default:
      return "unknown";
  }
}

/** An object key, quoted when it is not a plain identifier. */
function propKey(name: string): string {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name) ? name : JSON.stringify(name);
}

/** "a" or "an" for a noun, by its first letter. */
function article(noun: string): string {
  return /^[aeiou]/i.test(noun) ? "an" : "a";
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function wrap(text: string, width: number): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    if (line && line.length + word.length + 1 > width) {
      lines.push(line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(line);
  return lines;
}
