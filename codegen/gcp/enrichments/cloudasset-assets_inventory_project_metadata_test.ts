import { assertEquals, assertRejects } from "@std/assert";

const modelPath = new URL(
  "../../../model/gcp/cloudasset/extensions/models/assets.ts",
  import.meta.url,
).href;

// deno-lint-ignore no-explicit-any
let model: any;

const READ_MASK =
  "name,assetType,project,folders,organization,displayName,location,state,createTime,updateTime,parentFullResourceName,parentAssetType";

function searchResult(name: string, extra: Record<string, unknown> = {}) {
  return {
    name: `//compute.googleapis.com/projects/p/zones/z/instances/${name}`,
    assetType: "compute.googleapis.com/Instance",
    project: "projects/123",
    location: "us-central1-a",
    state: "RUNNING",
    ...extra,
  };
}

interface MockServerState {
  requests: Array<{ method: string; path: string; params: URLSearchParams }>;
}

function createMockServer(
  handler: (
    req: Request,
    state: MockServerState,
  ) => Response | Promise<Response>,
): { port: number; close: () => Promise<void>; state: MockServerState } {
  const state: MockServerState = { requests: [] };
  const server = Deno.serve({ port: 0, onListen() {} }, (req) => {
    const url = new URL(req.url);
    state.requests.push({
      method: req.method,
      path: decodeURIComponent(url.pathname),
      params: url.searchParams,
    });
    return handler(req, state);
  });
  const addr = server.addr as Deno.NetAddr;
  return {
    port: addr.port,
    close: () => server.shutdown(),
    state,
  };
}

function createMockContext(globalArgs: Record<string, unknown>) {
  const artifacts = new Map<string, unknown>();
  return {
    context: {
      globalArgs,
      modelType: "@swamp/gcp/cloudasset/assets",
      modelId: "test-model",
      writeResource(
        _type: string,
        instanceName: string,
        data: unknown,
      ): { type: string; name: string } {
        artifacts.set(instanceName, JSON.parse(JSON.stringify(data)));
        return { type: "state", name: instanceName };
      },
    },
    artifacts,
  };
}

// deno-lint-ignore no-explicit-any
type Snapshot = any;

async function withEnv(fn: () => Promise<void>) {
  const origToken = Deno.env.get("GCP_ACCESS_TOKEN");
  const origProject = Deno.env.get("GCP_PROJECT");
  try {
    Deno.env.set("GCP_ACCESS_TOKEN", "test-token");
    Deno.env.set("GCP_PROJECT", "test-project");
    await fn();
  } finally {
    if (origToken !== undefined) Deno.env.set("GCP_ACCESS_TOKEN", origToken);
    else Deno.env.delete("GCP_ACCESS_TOKEN");
    if (origProject !== undefined) Deno.env.set("GCP_PROJECT", origProject);
    else Deno.env.delete("GCP_PROJECT");
  }
}

function assertStateSchemaAccepts(snapshot: Snapshot) {
  const parsed = model.resources.state.schema.safeParse(snapshot);
  assertEquals(parsed.success, true, JSON.stringify(parsed.error));
}

// Dynamic import so _lib/gcp.ts relative imports resolve correctly.
// sanitizeResources: false because the gcp.ts module caches credentials
// and Deno.serve keeps a connection pool.
Deno.test({
  name: "inventory_project_metadata: setup - dynamic import",
  sanitizeResources: false,
  async fn() {
    const mod = await import(`${modelPath}?v=${crypto.randomUUID()}`);
    model = mod.model;
  },
});

Deno.test({
  name:
    "inventory_project_metadata: full pagination — 3 pages, fixed pageSize/readMask/scope, sorted by name",
  sanitizeResources: false,
  async fn() {
    const server = createMockServer((req) => {
      const token = new URL(req.url).searchParams.get("pageToken");
      if (!token) {
        return Response.json({
          results: [searchResult("c"), searchResult("a")],
          nextPageToken: "p2",
        });
      }
      if (token === "p2") {
        return Response.json({
          results: [searchResult("b")],
          nextPageToken: "p3",
        });
      }
      return Response.json({ results: [searchResult("d")] });
    });
    try {
      await withEnv(async () => {
        const { context, artifacts } = createMockContext({
          apiEndpoint: `http://localhost:${server.port}/`,
        });
        const result = await model.methods.inventory_project_metadata.execute(
          { project: "proj-1" },
          context,
        );
        assertEquals(result.dataHandles.length, 1);

        const stored: Snapshot = artifacts.get(
          "project_metadata_snapshot_projects_proj-1",
        );
        assertEquals(stored.name, "project_metadata_snapshot_projects_proj-1");
        assertEquals(stored.scope, "projects/proj-1");
        assertEquals(stored.count, 4);
        assertEquals(stored.pageCount, 3);
        assertEquals(
          stored.resources.map((r: { name: string }) =>
            r.name.split("/").pop()
          ),
          ["a", "b", "c", "d"],
        );
        assertEquals(stored.coverage, "caller-visible");
        assertEquals(stored.source, "search-index");
        assertStateSchemaAccepts(stored);

        assertEquals(server.state.requests.length, 3);
        for (const r of server.state.requests) {
          assertEquals(r.method, "GET");
          assertEquals(r.path, "/v1/projects/proj-1:searchAllResources");
          assertEquals(r.params.get("pageSize"), "500");
          assertEquals(r.params.get("readMask"), READ_MASK);
        }
        assertEquals(server.state.requests[1].params.get("pageToken"), "p2");
        assertEquals(server.state.requests[2].params.get("pageToken"), "p3");
      });
    } finally {
      await server.close();
    }
  },
});

Deno.test({
  name: "inventory_project_metadata: query and assetTypes forwarded verbatim",
  sanitizeResources: false,
  async fn() {
    const server = createMockServer(() => Response.json({}));
    try {
      await withEnv(async () => {
        const { context, artifacts } = createMockContext({
          apiEndpoint: `http://localhost:${server.port}/`,
        });
        await model.methods.inventory_project_metadata.execute(
          {
            project: "projects/proj-1",
            query: 'state:ACTIVE AND labels.env="prod"',
            assetTypes:
              "compute.googleapis.com.*,storage.googleapis.com/Bucket",
          },
          context,
        );
        const params = server.state.requests[0].params;
        assertEquals(params.get("query"), 'state:ACTIVE AND labels.env="prod"');
        assertEquals(
          params.get("assetTypes"),
          "compute.googleapis.com.*,storage.googleapis.com/Bucket",
        );
        const stored: Snapshot = artifacts.get(
          "project_metadata_snapshot_projects_proj-1",
        );
        assertEquals(stored.query, 'state:ACTIVE AND labels.env="prod"');
      });
    } finally {
      await server.close();
    }
  },
});

Deno.test({
  name:
    "inventory_project_metadata: payload fields stripped even when readMask is ignored",
  sanitizeResources: false,
  async fn() {
    const server = createMockServer(() =>
      Response.json({
        results: [searchResult("a", {
          folders: ["folders/9"],
          organization: "organizations/1",
          createTime: "2026-01-01T00:00:00Z",
          additionalAttributes: { secretish: "value" },
          description: "x".repeat(1000),
          versionedResources: [{ resource: { big: true } }],
          labels: { owner: "someone" },
          tags: [{ tagKey: "k" }],
          kmsKeys: ["key"],
          attachedResources: [{}],
          relationships: {},
          sccSecurityMarks: {},
          enrichments: [],
        })],
      })
    );
    try {
      await withEnv(async () => {
        const { context, artifacts } = createMockContext({
          apiEndpoint: `http://localhost:${server.port}/`,
        });
        await model.methods.inventory_project_metadata.execute(
          { project: "proj-1" },
          context,
        );
        const stored: Snapshot = artifacts.get(
          "project_metadata_snapshot_projects_proj-1",
        );
        assertEquals(Object.keys(stored.resources[0]).sort(), [
          "assetType",
          "createTime",
          "folders",
          "location",
          "name",
          "organization",
          "project",
          "state",
        ]);
      });
    } finally {
      await server.close();
    }
  },
});

Deno.test({
  name:
    "inventory_project_metadata: maxAssets exceeded — throws and persists nothing",
  sanitizeResources: false,
  async fn() {
    const server = createMockServer(() =>
      Response.json({
        results: [searchResult("a"), searchResult("b"), searchResult("c")],
      })
    );
    try {
      await withEnv(async () => {
        const { context, artifacts } = createMockContext({
          apiEndpoint: `http://localhost:${server.port}/`,
        });
        const err = await assertRejects(
          () =>
            model.methods.inventory_project_metadata.execute(
              { project: "proj-1", maxAssets: 2 },
              context,
            ),
          Error,
        );
        assertEquals(err.message.includes("exceeds maxAssets"), true);
        assertEquals(err.message.includes("NOT persisted"), true);
        assertEquals(artifacts.size, 0);
      });
    } finally {
      await server.close();
    }
  },
});

Deno.test({
  name:
    "inventory_project_metadata: non-2xx page — throws with status, persists nothing",
  sanitizeResources: false,
  async fn() {
    const server = createMockServer((req) => {
      const token = new URL(req.url).searchParams.get("pageToken");
      if (!token) {
        return Response.json({
          results: [searchResult("a")],
          nextPageToken: "p2",
        });
      }
      return Response.json(
        { error: { code: 403, message: "Permission denied" } },
        { status: 403 },
      );
    });
    try {
      await withEnv(async () => {
        const { context, artifacts } = createMockContext({
          apiEndpoint: `http://localhost:${server.port}/`,
        });
        const err = await assertRejects(
          () =>
            model.methods.inventory_project_metadata.execute(
              { project: "proj-1" },
              context,
            ),
          Error,
          "403",
        );
        assertEquals(err.message.includes("page 2"), true);
        assertEquals(artifacts.size, 0);
      });
    } finally {
      await server.close();
    }
  },
});

Deno.test({
  name:
    "inventory_project_metadata: non-JSON 200 body — throws with scope and page",
  sanitizeResources: false,
  async fn() {
    const server = createMockServer(() =>
      new Response("<html>gateway</html>", { status: 200 })
    );
    try {
      await withEnv(async () => {
        const { context, artifacts } = createMockContext({
          apiEndpoint: `http://localhost:${server.port}/`,
        });
        const err = await assertRejects(
          () =>
            model.methods.inventory_project_metadata.execute(
              { project: "proj-1" },
              context,
            ),
          Error,
          "non-JSON",
        );
        assertEquals(err.message.includes("projects/proj-1"), true);
        assertEquals(err.message.includes("page 1"), true);
        assertEquals(artifacts.size, 0);
      });
    } finally {
      await server.close();
    }
  },
});

Deno.test({
  name: "inventory_project_metadata: page without results is treated as empty",
  sanitizeResources: false,
  async fn() {
    const server = createMockServer((req) => {
      const token = new URL(req.url).searchParams.get("pageToken");
      if (!token) return Response.json({ nextPageToken: "p2" });
      return Response.json({ results: [searchResult("a")] });
    });
    try {
      await withEnv(async () => {
        const { context, artifacts } = createMockContext({
          apiEndpoint: `http://localhost:${server.port}/`,
        });
        await model.methods.inventory_project_metadata.execute(
          { project: "proj-1" },
          context,
        );
        const stored: Snapshot = artifacts.get(
          "project_metadata_snapshot_projects_proj-1",
        );
        assertEquals(stored.count, 1);
        assertEquals(stored.pageCount, 2);
      });
    } finally {
      await server.close();
    }
  },
});

Deno.test({
  name: "inventory_project_metadata: repeated page token — throws",
  sanitizeResources: false,
  async fn() {
    const server = createMockServer(() =>
      Response.json({ results: [searchResult("a")], nextPageToken: "loop" })
    );
    try {
      await withEnv(async () => {
        const { context, artifacts } = createMockContext({
          apiEndpoint: `http://localhost:${server.port}/`,
        });
        await assertRejects(
          () =>
            model.methods.inventory_project_metadata.execute(
              { project: "proj-1" },
              context,
            ),
          Error,
          "Repeated pagination token",
        );
        assertEquals(server.state.requests.length, 2);
        assertEquals(artifacts.size, 0);
      });
    } finally {
      await server.close();
    }
  },
});

Deno.test({
  name:
    "inventory_project_metadata: empty project — persists zero-count snapshot with coverage",
  sanitizeResources: false,
  async fn() {
    const server = createMockServer(() => Response.json({}));
    try {
      await withEnv(async () => {
        const { context, artifacts } = createMockContext({
          apiEndpoint: `http://localhost:${server.port}/`,
        });
        await model.methods.inventory_project_metadata.execute(
          { project: "proj-1" },
          context,
        );
        const stored: Snapshot = artifacts.get(
          "project_metadata_snapshot_projects_proj-1",
        );
        assertEquals(stored.count, 0);
        assertEquals(stored.resources, []);
        assertEquals(stored.coverage, "caller-visible");
        assertEquals(stored.source, "search-index");
        assertEquals(typeof stored.note, "string");
        assertEquals(typeof stored.fetchedAt, "string");
        assertStateSchemaAccepts(stored);
      });
    } finally {
      await server.close();
    }
  },
});

Deno.test({
  name:
    "inventory_project_metadata: project defaults to credentials project; folder/org scopes rejected",
  sanitizeResources: false,
  async fn() {
    const server = createMockServer(() => Response.json({}));
    try {
      await withEnv(async () => {
        const { context, artifacts } = createMockContext({
          apiEndpoint: `http://localhost:${server.port}/`,
        });
        await model.methods.inventory_project_metadata.execute({}, context);
        assertEquals(
          server.state.requests[0].path,
          "/v1/projects/test-project:searchAllResources",
        );
        assertEquals(
          artifacts.has("project_metadata_snapshot_projects_test-project"),
          true,
        );

        for (const bad of ["folders/9", "organizations/1", "projects/a/b"]) {
          await assertRejects(
            () =>
              model.methods.inventory_project_metadata.execute(
                { project: bad },
                context,
              ),
            Error,
            "single project",
          );
        }
        assertEquals(server.state.requests.length, 1);
      });
    } finally {
      await server.close();
    }
  },
});

Deno.test({
  name: "inventory_project_metadata: maxAssets must be a positive integer",
  fn() {
    const args = model.methods.inventory_project_metadata.arguments;
    assertEquals(args.safeParse({ maxAssets: 0 }).success, false);
    assertEquals(args.safeParse({ maxAssets: -1 }).success, false);
    assertEquals(args.safeParse({ maxAssets: 1.5 }).success, false);
    assertEquals(args.safeParse({ maxAssets: 1 }).success, true);
    assertEquals(args.safeParse({}).success, true);
  },
});
