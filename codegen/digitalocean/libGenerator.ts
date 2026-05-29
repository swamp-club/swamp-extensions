// Generates _lib/digitalocean.ts — shared HTTP client and CRUD helpers for DigitalOcean models

/**
 * Generates the shared helper file that all DigitalOcean extension models import.
 * Contains auth, HTTP client, response unwrapping, CRUD operations,
 * action polling, and resource readiness polling.
 * Key differences from Hetzner: PATCH vs PUT update method, queryParams support,
 * token validation via /v2/account, action/readiness polling.
 */
export function generateDigitalOceanLibFile(): string {
  return `// Auto-generated shared helper for DigitalOcean extension models.
// Do not edit manually. Re-generate with: deno task generate:digitalocean

const API_BASE = "https://api.digitalocean.com";

// Tokens validated against GET /v2/account are cached here so each distinct
// token (env var or per-model \`token\` global arg) is validated exactly once.
const validatedTokens = new Set<string>();

/**
 * Resolves the DigitalOcean API token. An explicit token (e.g. from a model's
 * 'token' global argument, which may be wired with a vault.get(...) expression)
 * takes precedence over the DO_API_TOKEN environment variable.
 */
async function getToken(explicitToken?: string): Promise<string> {
  const token = explicitToken ?? Deno.env.get("DO_API_TOKEN");
  if (!token) {
    throw new Error(
      "No DigitalOcean API token found. Provide one via the model's 'token' " +
      "global argument (wired with a vault.get(...) expression) or set the " +
      "DO_API_TOKEN environment variable.",
    );
  }

  if (validatedTokens.has(token)) return token;

  // Validate the token by hitting /v2/account
  const resp = await fetch(\`\${API_BASE}/v2/account\`, {
    headers: { "Authorization": \`Bearer \${token}\` },
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(
      \`DigitalOcean API token is invalid (GET /v2/account returned \${resp.status}): \${text}\`,
    );
  }
  // Drain the response body
  await resp.text();

  validatedTokens.add(token);
  return token;
}

function buildUrl(
  path: string,
  queryParams?: Record<string, string>,
): string {
  const url = new URL(\`\${API_BASE}\${path}\`);
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      url.searchParams.set(key, value);
    }
  }
  return url.toString();
}

async function request(
  method: string,
  path: string,
  body?: Record<string, unknown>,
  queryParams?: Record<string, string>,
  explicitToken?: string,
): Promise<Response> {
  const token = await getToken(explicitToken);
  const url = buildUrl(path, queryParams);
  const headers: Record<string, string> = {
    "Authorization": \`Bearer \${token}\`,
    "Content-Type": "application/json",
  };

  const resp = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!resp.ok) {
    // 404 is handled by callers — not an exception
    if (resp.status === 404) {
      return resp;
    }
    const text = await resp.text();
    throw new Error(
      \`DigitalOcean API error: \${method} \${path} returned \${resp.status}: \${text}\`,
    );
  }

  return resp;
}

function unwrap(data: Record<string, unknown>): Record<string, unknown> {
  const keys = Object.keys(data).filter((k) => k !== "meta" && k !== "links");
  if (keys.length === 0) return data;
  const value = data[keys[0]];
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  // Handle array responses (e.g. multi-create): unwrap the first element
  if (Array.isArray(value) && value.length > 0 && typeof value[0] === "object") {
    return value[0] as Record<string, unknown>;
  }
  return data;
}

export async function create(
  endpoint: string,
  body: Record<string, unknown>,
  queryParams?: Record<string, string>,
  token?: string,
): Promise<Record<string, unknown>> {
  const resp = await request("POST", endpoint, body, queryParams, token);
  const text = await resp.text();
  if (!text) return {};
  const data = JSON.parse(text);
  return unwrap(data);
}

export async function read(
  endpoint: string,
  id: number | string,
  queryParams?: Record<string, string>,
  token?: string,
): Promise<Record<string, unknown>> {
  const resp = await request("GET", \`\${endpoint}/\${id}\`, undefined, queryParams, token);
  if (resp.status === 404) {
    const text = await resp.text();
    throw new Error(
      \`Resource not found: GET \${endpoint}/\${id} returned 404: \${text}\`,
    );
  }
  const data = await resp.json();
  return unwrap(data);
}

export async function tryRead(
  endpoint: string,
  id: number | string,
  queryParams?: Record<string, string>,
  token?: string,
): Promise<Record<string, unknown> | null> {
  const resp = await request("GET", \`\${endpoint}/\${id}\`, undefined, queryParams, token);
  if (resp.status === 404) {
    await resp.text();
    return null;
  }
  const data = await resp.json();
  return unwrap(data);
}

export async function update(
  endpoint: string,
  id: number | string,
  body: Record<string, unknown>,
  method: "PATCH" | "PUT" = "PUT",
  queryParams?: Record<string, string>,
  token?: string,
): Promise<Record<string, unknown>> {
  const resp = await request(method, \`\${endpoint}/\${id}\`, body, queryParams, token);
  if (resp.status === 404) {
    const text = await resp.text();
    throw new Error(
      \`Resource not found: \${method} \${endpoint}/\${id} returned 404: \${text}\`,
    );
  }
  const text = await resp.text();
  if (!text) return {};
  const data = JSON.parse(text);
  return unwrap(data);
}

export async function remove(
  endpoint: string,
  id: number | string,
  queryParams?: Record<string, string>,
  token?: string,
): Promise<{ existed: boolean }> {
  const resp = await request("DELETE", \`\${endpoint}/\${id}\`, undefined, queryParams, token);
  return { existed: resp.status !== 404 };
}

export async function subResourceUpdate(
  endpoint: string,
  id: number | string,
  subPath: string,
  body: Record<string, unknown>,
  method: "PATCH" | "PUT" = "PUT",
  token?: string,
): Promise<void> {
  const resp = await request(method, \`\${endpoint}/\${id}/\${subPath}\`, body, undefined, token);
  // Most sub-resource endpoints return 202/204 with no body — drain the response
  await resp.text();
}

export async function discover(
  endpoint: string,
  token?: string,
): Promise<Record<string, unknown>> {
  const resp = await request("GET", endpoint, undefined, undefined, token);
  const data = await resp.json();
  return unwrap(data);
}

/**
 * List resources and find one matching a field value.
 * Paginates through all results. Returns null if not found.
 */
export async function tryFindByField(
  endpoint: string,
  field: string,
  value: string,
  token?: string,
): Promise<Record<string, unknown> | null> {
  let page = 1;
  const perPage = 200;

  while (true) {
    const resp = await request("GET", endpoint, undefined, {
      page: String(page),
      per_page: String(perPage),
    }, token);
    const data = await resp.json() as Record<string, unknown>;

    // Find the array in the response (skip meta/links)
    for (const [key, val] of Object.entries(data)) {
      if (key === "meta" || key === "links") continue;
      if (Array.isArray(val)) {
        const match = val.find(
          (item: Record<string, unknown>) => item && String(item[field]) === value,
        );
        if (match) return match;
      }
    }

    // Check for more pages
    const meta = data.meta as { total?: number } | undefined;
    if (!meta?.total || page * perPage >= meta.total) break;
    page++;
  }

  return null;
}

/**
 * Polls a DigitalOcean action until it reaches a terminal state.
 * Actions are polled via GET /v2/actions/{actionId}.
 */
export async function pollAction(
  actionId: number | string,
  token?: string,
): Promise<Record<string, unknown>> {
  const maxAttempts = 60;
  const pollDelay = 5000; // 5 seconds

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const resp = await request("GET", \`/v2/actions/\${actionId}\`, undefined, undefined, token);
    if (resp.status === 404) {
      const text = await resp.text();
      throw new Error(
        \`Action not found: GET /v2/actions/\${actionId} returned 404: \${text}\`,
      );
    }
    const data = await resp.json();
    const action = unwrap(data);

    if (action.status === "completed") {
      return action;
    }
    if (action.status === "errored") {
      throw new Error(\`Action \${actionId} failed with status: errored\`);
    }

    await new Promise((resolve) => setTimeout(resolve, pollDelay));
  }

  throw new Error(
    \`Action \${actionId} timed out after \${maxAttempts} attempts\`,
  );
}

/**
 * Posts an action to a resource, optionally polls for completion,
 * and re-reads the parent resource for updated state.
 */
export async function createAndPollAction(
  endpoint: string,
  resourceId: number | string,
  body: Record<string, unknown>,
  waitForCompletion = true,
  token?: string,
): Promise<{
  action: Record<string, unknown>;
  resource?: Record<string, unknown>;
}> {
  const resp = await request(
    "POST",
    \`\${endpoint}/\${resourceId}/actions\`,
    body,
    undefined,
    token,
  );
  const text = await resp.text();
  if (!text) return { action: {} };
  const data = JSON.parse(text);
  const action = unwrap(data);

  if (!waitForCompletion || action.status === "completed") {
    return { action };
  }
  if (action.status === "errored") {
    throw new Error("Action failed immediately with status: errored");
  }

  // Poll the action until completion
  const actionId = action.id;
  if (!actionId) {
    // No action ID to poll — return what we have
    return { action };
  }

  const completedAction = await pollAction(actionId as number | string, token);

  // Re-read the parent resource to get updated state
  const resource = await tryRead(endpoint, resourceId, undefined, token);

  return {
    action: completedAction,
    resource: resource ?? undefined,
  };
}

/**
 * Readiness polling configuration.
 * statusField supports dot-notation for nested fields (e.g. "status.state").
 */
interface ReadinessConfig {
  statusField: string;
  readyValues: string[];
  failedValues?: string[];
}

/**
 * Polls a resource until its status field reaches a ready or failed value.
 * Used after create/update to wait for provisioning to complete.
 */
export async function pollResourceReady(
  endpoint: string,
  resourceId: number | string,
  config: ReadinessConfig,
  token?: string,
): Promise<Record<string, unknown>> {
  const maxAttempts = 60;
  const pollDelay = 10000; // 10 seconds

  const fieldParts = config.statusField.split(".");

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const resource = await read(endpoint, resourceId, undefined, token);

    // Traverse dot-path to get the status value
    let currentStatus: unknown = resource;
    for (const part of fieldParts) {
      if (currentStatus && typeof currentStatus === "object") {
        currentStatus =
          (currentStatus as Record<string, unknown>)[part];
      } else {
        currentStatus = undefined;
        break;
      }
    }

    if (typeof currentStatus === "string") {
      if (config.readyValues.includes(currentStatus)) {
        return resource;
      }
      if (config.failedValues?.includes(currentStatus)) {
        throw new Error(
          \`Resource entered failed state: \${config.statusField}=\${currentStatus}\`,
        );
      }
    }

    await new Promise((resolve) => setTimeout(resolve, pollDelay));
  }

  throw new Error(
    \`Resource readiness timed out after \${maxAttempts} attempts polling \${config.statusField}\`,
  );
}
`;
}
