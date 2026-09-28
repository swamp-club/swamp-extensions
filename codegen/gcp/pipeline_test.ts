import { assertEquals } from "@std/assert";
import {
  type GcpDiscoveryDocument,
  nonCreatePathParams,
  parseGcpDiscoveryDocument,
} from "./pipeline.ts";

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
