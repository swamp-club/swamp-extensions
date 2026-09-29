import { assert, assertEquals } from "@std/assert";
import {
  classifyGcpSchemaFile,
  describesSameGcpSurface,
  type GcpDiscoveryDocument,
  generateGcpModels,
  isStableGcpVersion,
  mergeGcpDiscoveryDocument,
  nonCreatePathParams,
  type NormalizedGcpSchema,
  parseGcpDiscoveryDocument,
} from "./pipeline.ts";

type RawDoc = Parameters<typeof mergeGcpDiscoveryDocument>[0];

function makeDiscoveryDoc(
  overrides: Partial<GcpDiscoveryDocument>,
): GcpDiscoveryDocument {
  return {
    kind: "discovery#restDescription",
    name: "testapi",
    version: "v1",
    title: "Test API",
    baseUrl: "https://test.googleapis.com/v1/",
    basePath: "/v1/",
    rootUrl: "https://test.googleapis.com/",
    servicePath: "v1/",
    schemas: {},
    ...overrides,
  };
}

Deno.test("parseGcpDiscoveryDocument - listResponseArrayField prefers resource name match over first candidate", () => {
  const doc = makeDiscoveryDoc({
    name: "calendar",
    title: "Calendar API",
    schemas: {
      Event: {
        type: "object",
        properties: {
          id: { type: "string" },
          summary: { type: "string" },
        },
      },
      Reminder: {
        type: "object",
        properties: {
          method: { type: "string" },
          minutes: { type: "integer" },
        },
      },
    },
    resources: {
      events: {
        methods: {
          get: {
            id: "calendar.events.get",
            path: "calendars/{calendarId}/events/{eventId}",
            httpMethod: "GET",
            parameterOrder: ["calendarId", "eventId"],
            parameters: {
              calendarId: { type: "string", location: "path", required: true },
              eventId: { type: "string", location: "path", required: true },
            },
            response: {
              type: "object",
              properties: {
                id: { type: "string" },
                summary: { type: "string" },
              },
            },
          },
          list: {
            id: "calendar.events.list",
            path: "calendars/{calendarId}/events",
            httpMethod: "GET",
            parameterOrder: ["calendarId"],
            parameters: {
              calendarId: { type: "string", location: "path", required: true },
              pageToken: { type: "string", location: "query" },
            },
            response: {
              type: "object",
              properties: {
                defaultReminders: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      method: { type: "string" },
                      minutes: { type: "integer" },
                    },
                  },
                },
                events: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      summary: { type: "string" },
                    },
                  },
                },
                nextPageToken: { type: "string" },
              },
            },
          },
        },
      },
    },
  });

  const resources = parseGcpDiscoveryDocument(doc);
  assertEquals(resources.length, 1);
  assertEquals(resources[0].listResponseArrayField, "events");
});

Deno.test("parseGcpDiscoveryDocument - listResponseArrayField falls back to 'items' when no resource name match", () => {
  const doc = makeDiscoveryDoc({
    name: "calendar",
    title: "Calendar API",
    schemas: {},
    resources: {
      events: {
        methods: {
          get: {
            id: "calendar.events.get",
            path: "calendars/{calendarId}/events/{eventId}",
            httpMethod: "GET",
            parameterOrder: ["calendarId", "eventId"],
            parameters: {
              calendarId: { type: "string", location: "path", required: true },
              eventId: { type: "string", location: "path", required: true },
            },
            response: {
              type: "object",
              properties: {
                id: { type: "string" },
                summary: { type: "string" },
              },
            },
          },
          list: {
            id: "calendar.events.list",
            path: "calendars/{calendarId}/events",
            httpMethod: "GET",
            parameterOrder: ["calendarId"],
            parameters: {
              calendarId: { type: "string", location: "path", required: true },
              pageToken: { type: "string", location: "query" },
            },
            response: {
              type: "object",
              properties: {
                defaultReminders: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      method: { type: "string" },
                      minutes: { type: "integer" },
                    },
                  },
                },
                items: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      summary: { type: "string" },
                    },
                  },
                },
                nextPageToken: { type: "string" },
              },
            },
          },
        },
      },
    },
  });

  const resources = parseGcpDiscoveryDocument(doc);
  assertEquals(resources.length, 1);
  assertEquals(resources[0].listResponseArrayField, "items");
});

Deno.test("parseGcpDiscoveryDocument - listResponseArrayField uses first candidate when no resource name or items match", () => {
  const doc = makeDiscoveryDoc({
    name: "customapi",
    title: "Custom API",
    schemas: {},
    resources: {
      widgets: {
        methods: {
          get: {
            id: "customapi.widgets.get",
            path: "widgets/{widgetId}",
            httpMethod: "GET",
            parameterOrder: ["widgetId"],
            parameters: {
              widgetId: { type: "string", location: "path", required: true },
            },
            response: {
              type: "object",
              properties: {
                id: { type: "string" },
              },
            },
          },
          list: {
            id: "customapi.widgets.list",
            path: "widgets",
            httpMethod: "GET",
            parameterOrder: [],
            parameters: {
              pageToken: { type: "string", location: "query" },
            },
            response: {
              type: "object",
              properties: {
                gadgets: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      name: { type: "string" },
                    },
                  },
                },
                nextPageToken: { type: "string" },
              },
            },
          },
        },
      },
    },
  });

  const resources = parseGcpDiscoveryDocument(doc);
  assertEquals(resources.length, 1);
  assertEquals(resources[0].listResponseArrayField, "gadgets");
});

// Create-only required fields must not be required in GlobalArgsSchema, or
// list/get/delete fail validation without synthetic create values. Fields a
// non-create method reads from globalArgs stay required.
function makeRequiredSplitDoc(): GcpDiscoveryDocument {
  const itemSchema = {
    type: "object",
    properties: {
      name: {
        type: "string",
        annotations: { required: ["testapi.widgets.insert"] },
      },
      destRange: {
        type: "string",
        annotations: { required: ["testapi.widgets.insert"] },
      },
      region: {
        type: "string",
        annotations: { required: ["testapi.widgets.insert"] },
      },
      description: { type: "string" },
    },
  };
  return makeDiscoveryDoc({
    resources: {
      widgets: {
        methods: {
          get: {
            id: "testapi.widgets.get",
            path: "projects/{project}/zones/{zone}/widgets/{widget}",
            httpMethod: "GET",
            parameterOrder: ["project", "zone", "widget"],
            parameters: {
              project: { type: "string", location: "path", required: true },
              zone: { type: "string", location: "path", required: true },
              widget: { type: "string", location: "path", required: true },
            },
            response: itemSchema,
          },
          insert: {
            id: "testapi.widgets.insert",
            path: "projects/{project}/zones/{zone}/widgets/{widgetId}",
            httpMethod: "POST",
            parameterOrder: ["project", "zone", "widgetId"],
            parameters: {
              project: { type: "string", location: "path", required: true },
              zone: { type: "string", location: "path", required: true },
              widgetId: { type: "string", location: "path", required: true },
            },
            request: itemSchema,
            response: itemSchema,
          },
          list: {
            id: "testapi.widgets.list",
            path: "projects/{project}/regions/{region}/widgets",
            httpMethod: "GET",
            parameterOrder: ["project", "region"],
            parameters: {
              project: { type: "string", location: "path", required: true },
              region: { type: "string", location: "path", required: true },
              pageToken: { type: "string", location: "query" },
            },
            response: {
              type: "object",
              properties: { items: { type: "array", items: itemSchema } },
            },
          },
        },
      },
    },
  });
}

Deno.test("parseGcpDiscoveryDocument - create-only required fields move out of GlobalArgs required", () => {
  const [resource] = parseGcpDiscoveryDocument(makeRequiredSplitDoc());
  // Body fields required only by insert, and an insert-only path param.
  assertEquals(
    [...resource.createRequiredProperties].sort(),
    ["destRange", "name", "widgetId"],
  );
});

Deno.test("parseGcpDiscoveryDocument - fields read by non-create methods stay required", () => {
  const [resource] = parseGcpDiscoveryDocument(makeRequiredSplitDoc());
  // zone: get path param. region: insert-required body field that list reads.
  assertEquals([...resource.requiredProperties].sort(), ["region", "zone"]);
});

Deno.test("nonCreatePathParams - skips the identifier of get/update/patch/delete, keeps all list params", () => {
  const method = (parameterOrder: string[]) => ({
    id: "x",
    path: "",
    httpMethod: "GET",
    parameterOrder,
  });
  assertEquals(
    nonCreatePathParams(
      method(["project", "zone", "widget"]),
      undefined,
      method(["project", "zone", "widget"]),
      method(["project", "zone", "widget"]),
      method(["project", "region"]),
    ).sort(),
    ["location", "parent", "project", "region", "zone"],
  );
});

Deno.test("classifyGcpSchemaFile - preferred and additional-version filenames", () => {
  assertEquals(classifyGcpSchemaFile("compute.json"), {
    stem: "compute",
    baseService: "compute",
    isAdditionalVersion: false,
  });
  const additional: [string, string][] = [
    ["iam-v1.json", "iam"],
    ["compute-2026-09-01.json", "compute"],
    ["compute-stable.json", "compute"],
    ["chromewebstore-v1.1.json", "chromewebstore"],
    ["dfareporting-v3.5.json", "dfareporting"],
    ["admin-directory_v1.json", "admin"],
  ];
  for (const [filename, baseService] of additional) {
    const result = classifyGcpSchemaFile(filename);
    assertEquals(result.baseService, baseService, filename);
    assertEquals(result.isAdditionalVersion, true, filename);
  }
});

function widgetsDoc(
  version: string,
  listParams: Record<string, unknown>,
  extraResources: Record<string, unknown> = {},
): Record<string, unknown> {
  const crud = (plural: string) => ({
    methods: {
      get: {
        id: `widgetapi.${plural}.get`,
        path: `v1/{+name}`,
        httpMethod: "GET",
        parameterOrder: ["name"],
        parameters: {
          name: { type: "string", location: "path", required: true },
        },
        response: { $ref: "Widget" },
      },
      list: {
        id: `widgetapi.${plural}.list`,
        path: `v1/{+parent}/${plural}`,
        httpMethod: "GET",
        parameterOrder: ["parent"],
        parameters: {
          parent: { type: "string", location: "path", required: true },
          ...listParams,
        },
        response: { $ref: "ListWidgetsResponse" },
      },
    },
  });
  const resources: Record<string, unknown> = { widgets: crud("widgets") };
  for (const name of Object.keys(extraResources)) {
    resources[name] = crud(name);
  }
  return {
    kind: "discovery#restDescription",
    name: "widgetapi",
    version,
    title: "Widget API",
    baseUrl: "https://widgetapi.googleapis.com/",
    basePath: "",
    rootUrl: "https://widgetapi.googleapis.com/",
    servicePath: "",
    schemas: {
      Widget: {
        id: "Widget",
        type: "object",
        properties: { name: { type: "string" } },
      },
      ListWidgetsResponse: {
        id: "ListWidgetsResponse",
        type: "object",
        properties: {
          widgets: { type: "array", items: { $ref: "Widget" } },
          nextPageToken: { type: "string" },
        },
      },
    },
    resources,
  };
}

function datedWithSetName(): Record<string, unknown> {
  const doc = widgetsDoc("2026-09-01", {}, { gadgets: {} });
  const resources = doc.resources as Record<
    string,
    { methods: Record<string, unknown> }
  >;
  resources.widgets.methods.setName = {
    id: "widgetapi.widgets.setName",
    path: "v1/{+name}:setName",
    httpMethod: "POST",
    parameterOrder: ["name"],
    parameters: {
      name: { type: "string", location: "path", required: true },
    },
    response: { $ref: "Widget" },
  };
  return doc;
}

Deno.test("generateGcpModels - filtered and full runs select the same schema per service", async () => {
  const schemaPath = await Deno.makeTempDir();
  const fullOut = await Deno.makeTempDir();
  const filteredOut = await Deno.makeTempDir();
  try {
    // The preferred doc has a list parameter the dated version lacks; the
    // dated version adds a method and a resource the preferred doc does not
    // have. Both describe the same HTTP surface, so the result must keep all
    // three. The dated filename sorts before "widgetapi.json", which is what
    // used to let it outrank the preferred doc in a full run.
    await Deno.writeTextFile(
      `${schemaPath}/widgetapi.json`,
      JSON.stringify(widgetsDoc("v1", {
        returnPartialSuccess: { type: "boolean", location: "query" },
      })),
    );
    await Deno.writeTextFile(
      `${schemaPath}/widgetapi-2026-09-01.json`,
      JSON.stringify(datedWithSetName()),
    );
    const other = widgetsDoc("v1", {});
    other.name = "otherapi";
    await Deno.writeTextFile(
      `${schemaPath}/otherapi.json`,
      JSON.stringify(other),
    );

    const full = await generateGcpModels({ schemaPath, outputDir: fullOut });
    const filtered = await generateGcpModels({
      schemaPath,
      outputDir: filteredOut,
      services: ["widgetapi"],
    });

    assertEquals(full.errors, []);
    assertEquals(filtered.errors, []);
    assertEquals([...filtered.services.keys()], ["widgetapi"]);

    const fullModels = full.services.get("widgetapi")!.models;
    const filteredModels = filtered.services.get("widgetapi")!.models;
    assertEquals(
      fullModels.map((m) => m.filePath).sort(),
      filteredModels.map((m) => m.filePath).sort(),
    );
    for (const model of fullModels) {
      const match = filteredModels.find((m) => m.filePath === model.filePath)!;
      assertEquals(model.sourceCode, match.sourceCode);
    }

    const widgets = fullModels.find((m) => m.filePath.endsWith("/widgets.ts"));
    assert(widgets, "widgets model generated");
    assert(
      widgets.sourceCode.includes("returnPartialSuccess"),
      "widgets model keeps the preferred document's parameter",
    );
    assert(
      widgets.sourceCode.includes("widgetapi.widgets.setName"),
      "widgets model keeps the dated version's extra method",
    );
    assert(
      fullModels.some((m) => m.filePath.endsWith("/gadgets.ts")),
      "additional-version-only resource is merged",
    );
  } finally {
    await Deno.remove(schemaPath, { recursive: true });
    await Deno.remove(fullOut, { recursive: true });
    await Deno.remove(filteredOut, { recursive: true });
  }
});

Deno.test("generateGcpModels - reports a schema whose document name does not match its filename", async () => {
  const schemaPath = await Deno.makeTempDir();
  const outputDir = await Deno.makeTempDir();
  try {
    await Deno.writeTextFile(
      `${schemaPath}/widgetapi-v2.json`,
      JSON.stringify(widgetsDoc("v2", {})),
    );
    const mismatched = widgetsDoc("v1", {});
    mismatched.name = "gadgetapi";
    await Deno.writeTextFile(
      `${schemaPath}/widgetapi.json`,
      JSON.stringify(mismatched),
    );

    const result = await generateGcpModels({ schemaPath, outputDir });

    assertEquals(result.errors.length, 1);
    assert(result.errors[0].startsWith("widgetapi:"), result.errors[0]);
    assert(!result.services.has("gadgetapi"));
  } finally {
    await Deno.remove(schemaPath, { recursive: true });
    await Deno.remove(outputDir, { recursive: true });
  }
});

Deno.test("describesSameGcpSurface - same paths merge, different paths do not", () => {
  const v1 = widgetsDoc("v1", {}) as unknown as RawDoc;
  const dated = widgetsDoc("2026-09-01", {}, {
    gadgets: {},
  }) as unknown as RawDoc;
  assert(describesSameGcpSurface(v1, dated));

  const moved = widgetsDoc("v2", {}) as unknown as RawDoc;
  moved.resources!.widgets.methods!.get.path = "v2/{+name}";
  assert(!describesSameGcpSurface(v1, moved));

  const disjoint = widgetsDoc("v2", {}) as unknown as RawDoc;
  disjoint.name = "widgetapi";
  disjoint.resources = { other: { methods: {} } };
  assert(!describesSameGcpSurface(v1, disjoint));
});

Deno.test("mergeGcpDiscoveryDocument - additive, preferred wins, enums stay aligned", () => {
  const target = widgetsDoc("v1", {
    returnPartialSuccess: { type: "boolean", location: "query" },
  }) as unknown as RawDoc;
  const source = widgetsDoc("2026-09-01", {}) as unknown as RawDoc;
  // enumDescriptions is present in raw discovery JSON but not modelled in
  // NormalizedGcpSchema, hence the widened literal.
  target.schemas.Widget.properties!.kind = {
    type: "string",
    enum: ["A", "B"],
    enumDescriptions: ["a", "b"],
  } as NormalizedGcpSchema;
  target.schemas.Widget.description = "preferred";
  source.schemas.Widget.properties!.kind = {
    type: "string",
    enum: ["A", "C", "B"],
    enumDescriptions: ["x", "c", "y"],
  } as NormalizedGcpSchema;
  source.schemas.Widget.properties!.extra = { type: "string" };
  source.schemas.Widget.description = "addl";
  source.resources!.widgets.methods!.setName = {
    id: "widgetapi.widgets.setName",
    path: "v1/{+name}:setName",
    httpMethod: "POST",
  };

  mergeGcpDiscoveryDocument(target, source);

  const kind = target.schemas.Widget.properties!.kind as {
    enum: string[];
    enumDescriptions: string[];
  };
  assertEquals(kind.enum, ["A", "B", "C"]);
  assertEquals(kind.enumDescriptions, ["a", "b", "c"]);
  assert(target.schemas.Widget.properties!.extra, "property added");
  assertEquals(target.schemas.Widget.description, "preferred");
  assert(target.resources!.widgets.methods!.setName, "method added");
  assert(
    target.resources!.widgets.methods!.list.parameters!.returnPartialSuccess,
    "preferred-only parameter kept",
  );
});

Deno.test("generateGcpModels - a different-surface version still contributes only missing resources", async () => {
  const schemaPath = await Deno.makeTempDir();
  const outputDir = await Deno.makeTempDir();
  try {
    await Deno.writeTextFile(
      `${schemaPath}/widgetapi.json`,
      JSON.stringify(widgetsDoc("v2", {})),
    );
    const v1 = widgetsDoc("v1", {
      legacyFlag: { type: "boolean", location: "query" },
    }, { gadgets: {} });
    const resources = v1.resources as Record<
      string,
      { methods: Record<string, { path: string }> }
    >;
    for (const r of Object.values(resources)) {
      for (const m of Object.values(r.methods)) m.path = `legacy/${m.path}`;
    }
    await Deno.writeTextFile(
      `${schemaPath}/widgetapi-v1.json`,
      JSON.stringify(v1),
    );

    const result = await generateGcpModels({ schemaPath, outputDir });
    const models = result.services.get("widgetapi")!.models;
    const widgets = models.find((m) => m.filePath.endsWith("/widgets.ts"))!;
    assert(!widgets.sourceCode.includes("legacyFlag"));
    assert(models.some((m) => m.filePath.endsWith("/gadgets.ts")));
  } finally {
    await Deno.remove(schemaPath, { recursive: true });
    await Deno.remove(outputDir, { recursive: true });
  }
});

Deno.test("describesSameGcpSurface - different servicePath is a different surface", () => {
  const v1 = widgetsDoc("v1", {}) as unknown as RawDoc;
  const other = widgetsDoc("stable", {}) as unknown as RawDoc;
  other.servicePath = "stable/";
  assert(!describesSameGcpSurface(v1, other));
});

Deno.test("mergeGcpDiscoveryDocument - never adds constraints to an existing definition", () => {
  const target = widgetsDoc("v1", {}) as unknown as RawDoc;
  const source = widgetsDoc("2026-09-01", {}) as unknown as RawDoc;
  // Free-form in the preferred version, constrained in the additional one.
  target.schemas.Widget.properties!.mode = { type: "string" };
  source.schemas.Widget.properties!.mode = {
    type: "string",
    enum: ["X", "Y"],
  };
  // Reference in the preferred version, inline shape in the additional one.
  target.schemas.Widget.properties!.owner = { $ref: "Owner" } as
    & NormalizedGcpSchema
    & { $ref: string };
  source.schemas.Widget.properties!.owner = {
    type: "object",
    properties: { id: { type: "string" } },
  };
  // A free-form object must not gain properties.
  target.schemas.Widget.properties!.labels = { type: "object" };
  source.schemas.Widget.properties!.labels = {
    type: "object",
    properties: { env: { type: "string" } },
  };
  // A parallel array shorter than the source enum gets a filler.
  target.schemas.Widget.properties!.state = {
    type: "string",
    enum: ["ON"],
    enumDescriptions: ["on"],
  } as NormalizedGcpSchema;
  source.schemas.Widget.properties!.state = {
    type: "string",
    enum: ["ON", "OFF"],
  };

  mergeGcpDiscoveryDocument(target, source);

  const props = target.schemas.Widget.properties! as Record<
    string,
    Record<string, unknown>
  >;
  assertEquals(props.mode, { type: "string" });
  assertEquals(props.owner, { $ref: "Owner" });
  assertEquals(props.labels, { type: "object" });
  assertEquals(props.state.enum, ["ON", "OFF"]);
  assertEquals(props.state.enumDescriptions, ["on", ""]);
});

Deno.test("generateGcpModels - preview versions contribute nothing", async () => {
  const schemaPath = await Deno.makeTempDir();
  const outputDir = await Deno.makeTempDir();
  try {
    await Deno.writeTextFile(
      `${schemaPath}/widgetapi.json`,
      JSON.stringify(widgetsDoc("v1", {})),
    );
    const preview = datedWithSetName();
    preview.version = "preview";
    await Deno.writeTextFile(
      `${schemaPath}/widgetapi-preview.json`,
      JSON.stringify(preview),
    );

    const result = await generateGcpModels({ schemaPath, outputDir });
    const models = result.services.get("widgetapi")!.models;
    const widgets = models.find((m) => m.filePath.endsWith("/widgets.ts"))!;
    assert(!widgets.sourceCode.includes("widgetapi.widgets.setName"));
    // A preview-only resource is not generated either.
    assert(!models.some((m) => m.filePath.endsWith("/gadgets.ts")));
  } finally {
    await Deno.remove(schemaPath, { recursive: true });
    await Deno.remove(outputDir, { recursive: true });
  }
});

Deno.test("mergeGcpDiscoveryDocument - added parameters and properties are optional", () => {
  const target = widgetsDoc("v1", {}) as unknown as RawDoc;
  const source = widgetsDoc("2026-09-01", {
    mustSet: { type: "string", location: "query", required: true },
  }) as unknown as RawDoc;
  source.schemas.Widget.properties!.extra = {
    type: "string",
    annotations: { required: ["widgetapi.widgets.get"] },
  };
  // An own "__proto__" key, as JSON.parse produces; a plain assignment would
  // call the prototype setter instead of creating the key.
  Object.defineProperty(source.schemas.Widget.properties!, "__proto__", {
    value: { type: "string", polluted: true },
    enumerable: true,
    configurable: true,
    writable: true,
  });

  mergeGcpDiscoveryDocument(target, source);

  const param = target.resources!.widgets.methods!.list.parameters!
    .mustSet as unknown as Record<string, unknown>;
  assertEquals(param, { type: "string", location: "query" });
  assertEquals(target.schemas.Widget.properties!.extra, { type: "string" });
  const props = target.schemas.Widget.properties!;
  assertEquals(Object.getPrototypeOf(props), Object.prototype);
  assert(!Object.hasOwn(props, "__proto__"));
});

Deno.test("mergeGcpDiscoveryDocument - parameters created on an existing method are optional", () => {
  type Methods = Record<string, Record<string, unknown>>;
  const methodsOf = (doc: Record<string, unknown>) =>
    (doc.resources as Record<string, { methods: Methods }>).widgets.methods;
  const target = widgetsDoc("v1", {});
  const source = widgetsDoc("2026-09-01", {});
  // The preferred get has no parameters key at all.
  delete methodsOf(target).get.parameters;
  (methodsOf(source).get.parameters as Record<string, unknown>).view = {
    type: "string",
    location: "query",
    required: true,
  };
  // A method only the additional version has keeps its own required flags.
  methodsOf(source).setName = {
    id: "widgetapi.widgets.setName",
    path: "v1/{+name}:setName",
    httpMethod: "POST",
    parameters: {
      name: { type: "string", location: "path", required: true },
    },
  };

  mergeGcpDiscoveryDocument(
    target as unknown as RawDoc,
    source as unknown as RawDoc,
  );

  const params = methodsOf(target).get.parameters as Methods;
  assertEquals(params.name, { type: "string", location: "path" });
  assertEquals(params.view, { type: "string", location: "query" });
  const setName = methodsOf(target).setName.parameters as Methods;
  assertEquals(setName.name.required, true);
});

Deno.test("generateGcpModels - a merge that breaks parsing falls back to unmerged versions", async () => {
  const schemaPath = await Deno.makeTempDir();
  const outputDir = await Deno.makeTempDir();
  try {
    await Deno.writeTextFile(
      `${schemaPath}/widgetapi.json`,
      JSON.stringify(widgetsDoc("v1", {})),
    );
    // A null schema is copied in by the merge and makes dereferencing throw.
    const dated = datedWithSetName();
    (dated.schemas as Record<string, unknown>).Broken = null;
    await Deno.writeTextFile(
      `${schemaPath}/widgetapi-2026-09-01.json`,
      JSON.stringify(dated),
    );

    const result = await generateGcpModels({ schemaPath, outputDir });
    const models = result.services.get("widgetapi")!.models;
    const widgets = models.find((m) => m.filePath.endsWith("/widgets.ts"))!;
    assert(widgets, "preferred resources are still generated");
    assert(!widgets.sourceCode.includes("widgetapi.widgets.setName"));
    assert(
      result.errors.some((e) =>
        e.startsWith("widgetapi: merging widgetapi-2026-09-01 failed")
      ),
      `merge failure recorded: ${result.errors.join("; ")}`,
    );
  } finally {
    await Deno.remove(schemaPath, { recursive: true });
    await Deno.remove(outputDir, { recursive: true });
  }
});

Deno.test("generateGcpModels - a version conflicting with an earlier merge is not merged", async () => {
  const schemaPath = await Deno.makeTempDir();
  const outputDir = await Deno.makeTempDir();
  try {
    await Deno.writeTextFile(
      `${schemaPath}/widgetapi.json`,
      JSON.stringify(widgetsDoc("v1", {})),
    );
    // Sorts first and is merged: adds setName at v1/{+name}:setName.
    await Deno.writeTextFile(
      `${schemaPath}/widgetapi-2026-09-01.json`,
      JSON.stringify(datedWithSetName()),
    );
    // Same surface as v1, but defines setName at a different path.
    const conflicting = datedWithSetName();
    conflicting.version = "stable";
    const resources = conflicting.resources as Record<
      string,
      { methods: Record<string, { path: string }> }
    >;
    resources.widgets.methods.setName.path = "v1/{+name}:rename";
    // A method only this version has: dropped with the rest of the version,
    // because the version as a whole no longer counts as the same surface.
    resources.widgets.methods.archive = {
      ...resources.widgets.methods.setName,
      id: "widgetapi.widgets.archive",
      path: "v1/{+name}:archive",
    } as unknown as { path: string };
    await Deno.writeTextFile(
      `${schemaPath}/widgetapi-stable.json`,
      JSON.stringify(conflicting),
    );

    const result = await generateGcpModels({ schemaPath, outputDir });
    const widgets = result.services.get("widgetapi")!.models.find((m) =>
      m.filePath.endsWith("/widgets.ts")
    )!;
    assert(widgets.sourceCode.includes("{+name}:setName"));
    assert(!widgets.sourceCode.includes("{+name}:rename"));
    assert(!widgets.sourceCode.includes("widgetapi.widgets.archive"));
  } finally {
    await Deno.remove(schemaPath, { recursive: true });
    await Deno.remove(outputDir, { recursive: true });
  }
});

Deno.test("generateGcpModels - an API name containing 'preview' still merges same-surface versions", async () => {
  const schemaPath = await Deno.makeTempDir();
  const outputDir = await Deno.makeTempDir();
  try {
    const rename = (doc: Record<string, unknown>) => {
      doc.name = "previewapi";
      return JSON.stringify(doc).replaceAll("widgetapi.", "previewapi.");
    };
    await Deno.writeTextFile(
      `${schemaPath}/previewapi.json`,
      rename(widgetsDoc("v1", {})),
    );
    await Deno.writeTextFile(
      `${schemaPath}/previewapi-2026-09-01.json`,
      rename(datedWithSetName()),
    );

    const result = await generateGcpModels({ schemaPath, outputDir });
    assertEquals(result.errors, []);
    const widgets = result.services.get("previewapi")!.models.find((m) =>
      m.filePath.endsWith("/widgets.ts")
    )!;
    assert(widgets.sourceCode.includes("previewapi.widgets.setName"));
  } finally {
    await Deno.remove(schemaPath, { recursive: true });
    await Deno.remove(outputDir, { recursive: true });
  }
});

Deno.test("mergeGcpDiscoveryDocument - keeps the longer description and enum description", () => {
  const target = widgetsDoc("v1", {}) as unknown as RawDoc;
  const source = widgetsDoc("2026-09-01", {}) as unknown as RawDoc;
  target.schemas.Widget.description = "Short.";
  source.schemas.Widget.description = "Short, with examples.";
  target.schemas.Widget.properties!.name.description = "Full name, with rules.";
  source.schemas.Widget.properties!.name.description = "Name.";
  target.schemas.Widget.properties!.kind = {
    type: "string",
    enum: ["A", "B"],
    enumDescriptions: ["a", "b, in detail"],
  } as NormalizedGcpSchema;
  source.schemas.Widget.properties!.kind = {
    type: "string",
    enum: ["B", "A"],
    enumDescriptions: ["b", "a, in detail"],
  } as NormalizedGcpSchema;

  mergeGcpDiscoveryDocument(target, source);

  assertEquals(target.schemas.Widget.description, "Short, with examples.");
  assertEquals(
    target.schemas.Widget.properties!.name.description,
    "Full name, with rules.",
  );
  const kind = target.schemas.Widget.properties!.kind as {
    enum: string[];
    enumDescriptions: string[];
  };
  assertEquals(kind.enum, ["A", "B"]);
  assertEquals(kind.enumDescriptions, ["a, in detail", "b, in detail"]);
});

Deno.test("isStableGcpVersion - alpha, beta and preview versions are not stable", () => {
  for (const v of ["v1", "v2", "stable", "2026-09-01"]) {
    assert(isStableGcpVersion(v), v);
  }
  for (const v of ["alpha", "v1beta1", "preview", "2026-10-01-preview"]) {
    assert(!isStableGcpVersion(v), v);
  }
});

Deno.test("generateGcpModels - a resource that fails keeps its existing model instead of being pruned", async () => {
  const schemaPath = await Deno.makeTempDir();
  const outputDir = await Deno.makeTempDir();
  try {
    const doc = widgetsDoc("v1", {}, { gadgets: {} });
    const resources = doc.resources as Record<
      string,
      { methods: Record<string, { response?: { $ref: string } }> }
    >;
    // gadgets gets its own schema with a malformed description, which makes
    // only that resource fail to parse.
    for (const m of Object.values(resources.gadgets.methods)) {
      if (m.response?.$ref === "Widget") m.response = { $ref: "Gadget" };
    }
    (doc.schemas as Record<string, unknown>).Gadget = {
      id: "Gadget",
      type: "object",
      properties: { name: { type: "string", description: 7 } },
    };
    await Deno.writeTextFile(
      `${schemaPath}/widgetapi.json`,
      JSON.stringify(doc),
    );
    // gadgets was published by an earlier run.
    const modelsDir = `${outputDir}/gcp/widgetapi/extensions/models`;
    await Deno.mkdir(modelsDir, { recursive: true });
    await Deno.writeTextFile(`${modelsDir}/gadgets.ts`, "// last good\n");

    const result = await generateGcpModels({ schemaPath, outputDir });
    assert(
      result.errors.some((e) => e.startsWith("widgetapi.gadgets: ")),
      `parse failure reported: ${result.errors.join("; ")}`,
    );
    const service = result.services.get("widgetapi")!;
    assert(service.models.some((m) => m.filePath.endsWith("/widgets.ts")));
    assertEquals(service.keptModelFileNames, ["gadgets.ts"]);
    assert(
      service.manifest.sourceCode.includes("gadgets.ts"),
      "kept model stays in the manifest",
    );

    // Without errors nothing is kept, so a model removed upstream is pruned.
    await Deno.writeTextFile(
      `${schemaPath}/widgetapi.json`,
      JSON.stringify(widgetsDoc("v1", {})),
    );
    const clean = await generateGcpModels({ schemaPath, outputDir });
    assertEquals(clean.services.get("widgetapi")!.keptModelFileNames, []);
  } finally {
    await Deno.remove(schemaPath, { recursive: true });
    await Deno.remove(outputDir, { recursive: true });
  }
});

Deno.test("generateGcpModels - a document that fails keeps the models it used to produce", async () => {
  const schemaPath = await Deno.makeTempDir();
  const outputDir = await Deno.makeTempDir();
  try {
    await Deno.writeTextFile(
      `${schemaPath}/widgetapi.json`,
      JSON.stringify(widgetsDoc("v2", {})),
    );
    // A different-surface version that used to contribute gadgets now fails
    // to dereference, while the preferred version still generates widgets.
    const v1 = widgetsDoc("v1", {}, { gadgets: {} });
    const resources = v1.resources as Record<
      string,
      { methods: Record<string, { path: string }> }
    >;
    for (const r of Object.values(resources)) {
      for (const m of Object.values(r.methods)) m.path = `legacy/${m.path}`;
    }
    (v1.schemas as Record<string, unknown>).Broken = null;
    await Deno.writeTextFile(
      `${schemaPath}/widgetapi-v1.json`,
      JSON.stringify(v1),
    );
    const modelsDir = `${outputDir}/gcp/widgetapi/extensions/models`;
    await Deno.mkdir(modelsDir, { recursive: true });
    await Deno.writeTextFile(`${modelsDir}/gadgets.ts`, "// last good\n");

    const result = await generateGcpModels({ schemaPath, outputDir });
    assert(
      result.errors.some((e) => e.startsWith("widgetapi-v1: ")),
      `document failure reported: ${result.errors.join("; ")}`,
    );
    const service = result.services.get("widgetapi")!;
    assert(service.models.some((m) => m.filePath.endsWith("/widgets.ts")));
    assertEquals(service.keptModelFileNames, ["gadgets.ts"]);
    assert(service.manifest.sourceCode.includes("gadgets.ts"));
  } finally {
    await Deno.remove(schemaPath, { recursive: true });
    await Deno.remove(outputDir, { recursive: true });
  }
});
