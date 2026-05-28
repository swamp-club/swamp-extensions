// Auto-generated shared helper for Hetzner Cloud extension models.
// Do not edit manually. Re-generate with: deno task generate:hetzner

const API_BASE = "https://api.hetzner.cloud/v1";

// Tokens validated against GET /locations are cached here so each distinct
// token (env var or per-model `token` global arg) is validated exactly once.
const validatedTokens = new Set<string>();

/**
 * Resolves the Hetzner API token. An explicit token (e.g. from a model's
 * 'token' global argument, which may be wired with a vault.get(...) expression)
 * takes precedence over the HETZNER_API_TOKEN environment variable.
 */
async function getToken(explicitToken?: string): Promise<string> {
  const token = explicitToken ?? Deno.env.get("HETZNER_API_TOKEN");
  if (!token) {
    throw new Error(
      "No Hetzner API token found. Provide one via the model's 'token' global " +
        "argument (wired with a vault.get(...) expression) or set the " +
        "HETZNER_API_TOKEN environment variable.",
    );
  }

  if (validatedTokens.has(token)) return token;

  // Validate the token by hitting a lightweight endpoint
  const resp = await fetch(`${API_BASE}/locations`, {
    headers: { "Authorization": `Bearer ${token}` },
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(
      `Hetzner API token is invalid (GET /locations returned ${resp.status}): ${text}`,
    );
  }
  // Drain the response body
  await resp.text();

  validatedTokens.add(token);
  return token;
}

async function request(
  method: string,
  path: string,
  body?: Record<string, unknown>,
  options?: {
    allowStatus?: number[];
    queryParams?: Record<string, string>;
    token?: string;
  },
): Promise<Response> {
  const token = await getToken(options?.token);
  let url = `${API_BASE}${path}`;
  if (options?.queryParams) {
    const u = new URL(url);
    for (const [key, value] of Object.entries(options.queryParams)) {
      u.searchParams.set(key, value);
    }
    url = u.toString();
  }
  const headers: Record<string, string> = {
    "Authorization": `Bearer ${token}`,
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
    // Allow-listed statuses bubble up to the caller for bespoke handling
    // (e.g. remove() retries on 422 resource_in_use).
    if (options?.allowStatus?.includes(resp.status)) {
      return resp;
    }
    const text = await resp.text();
    throw new Error(
      `Hetzner API error: ${method} ${path} returned ${resp.status}: ${text}`,
    );
  }

  return resp;
}

function unwrap(data: Record<string, unknown>): Record<string, unknown> {
  const keys = Object.keys(data).filter((k) =>
    k !== "meta" && k !== "links" && k !== "actions" && k !== "action"
  );
  if (keys.length === 0) return data;
  const value = data[keys[0]];
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return data;
}

/**
 * Unwraps a Hetzner list envelope (e.g. `{ servers: [...], meta: {...} }`) to the
 * inner array. Returns the first non-meta/links/action value that is an array.
 */
function unwrapList(data: Record<string, unknown>): Record<string, unknown>[] {
  const keys = Object.keys(data).filter((k) =>
    k !== "meta" && k !== "links" && k !== "actions" && k !== "action"
  );
  for (const key of keys) {
    const value = data[key];
    if (Array.isArray(value)) {
      return value as Record<string, unknown>[];
    }
  }
  return [];
}

export async function create(
  endpoint: string,
  body: Record<string, unknown>,
  token?: string,
): Promise<Record<string, unknown>> {
  const resp = await request("POST", endpoint, body, { token });
  const data = await resp.json();
  return unwrap(data);
}

export async function read(
  endpoint: string,
  id: number | string,
  token?: string,
): Promise<Record<string, unknown>> {
  const resp = await request("GET", `${endpoint}/${id}`, undefined, { token });
  if (resp.status === 404) {
    const text = await resp.text();
    throw new Error(
      `Resource not found: GET ${endpoint}/${id} returned 404: ${text}`,
    );
  }
  const data = await resp.json();
  return unwrap(data);
}

export async function tryRead(
  endpoint: string,
  id: number | string,
  token?: string,
): Promise<Record<string, unknown> | null> {
  const resp = await request("GET", `${endpoint}/${id}`, undefined, { token });
  if (resp.status === 404) {
    await resp.text();
    return null;
  }
  const data = await resp.json();
  return unwrap(data);
}

/**
 * Lists every resource at a collection endpoint, following Hetzner's
 * `meta.pagination.next_page` cursor until exhausted (per_page=50, the API max).
 * `queryParams` (e.g. `{ label_selector: "env=prod" }`) are sent on every page.
 *
 * A bounded page guard prevents an infinite loop on a malformed `next_page`; if
 * it trips, the partial result is returned and a warning is logged rather than
 * silently truncating.
 */
export async function listAll(
  endpoint: string,
  queryParams?: Record<string, string>,
  token?: string,
): Promise<Record<string, unknown>[]> {
  const perPage = 50;
  const maxPages = 1000;
  const items: Record<string, unknown>[] = [];
  let page = 1;

  for (let fetched = 0; fetched < maxPages; fetched++) {
    const params: Record<string, string> = {
      ...queryParams,
      page: String(page),
      per_page: String(perPage),
    };
    const resp = await request("GET", endpoint, undefined, {
      queryParams: params,
      token,
    });
    const data = await resp.json() as Record<string, unknown>;
    for (const item of unwrapList(data)) {
      items.push(item);
    }

    const meta = data.meta as
      | { pagination?: { next_page?: number | null } }
      | undefined;
    const nextPage = meta?.pagination?.next_page;
    if (nextPage === null || nextPage === undefined) {
      return items;
    }
    page = nextPage;
  }

  console.warn(
    `Hetzner listAll(${endpoint}): stopped after ${maxPages} pages ` +
      `(${items.length} items); more may exist. Narrow with a label_selector.`,
  );
  return items;
}

export async function update(
  endpoint: string,
  id: number | string,
  body: Record<string, unknown>,
  token?: string,
): Promise<Record<string, unknown>> {
  const resp = await request("PUT", `${endpoint}/${id}`, body, { token });
  if (resp.status === 404) {
    const text = await resp.text();
    throw new Error(
      `Resource not found: PUT ${endpoint}/${id} returned 404: ${text}`,
    );
  }
  const data = await resp.json();
  return unwrap(data);
}

/**
 * Delete a Hetzner resource. Retries on 422 `resource_in_use` because Hetzner
 * processes detach propagation asynchronously — an immediate firewall DELETE
 * after a server DELETE can return 422 until the firewall-from-server detach
 * has propagated. Other 422 error codes (protected, invalid_input, etc.) are
 * surfaced unchanged, as is every non-422 non-404 status.
 *
 * Loop shape mirrors the polling helpers in `codegen/digitalocean/libGenerator.ts`
 * (pollAction, pollResourceReady) for provider-to-provider consistency.
 */
export async function remove(
  endpoint: string,
  id: number | string,
  token?: string,
): Promise<{ existed: boolean }> {
  const maxAttempts = 3;
  const pollDelay = 3000;
  let lastBody = "";

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const resp = await request(
      "DELETE",
      `${endpoint}/${id}`,
      undefined,
      { allowStatus: [422], token },
    );
    if (resp.status !== 422) {
      return { existed: resp.status !== 404 };
    }

    lastBody = await resp.text();
    let errorCode: string | undefined;
    try {
      const parsed = JSON.parse(lastBody) as { error?: { code?: string } };
      errorCode = parsed?.error?.code;
    } catch {
      // Body isn't JSON — we can't confirm it's a transient resource_in_use,
      // so surface the 422 verbatim rather than retrying blindly.
      throw new Error(
        `Hetzner API error: DELETE ${endpoint}/${id} returned 422: ${lastBody}`,
      );
    }
    if (errorCode !== "resource_in_use") {
      throw new Error(
        `Hetzner API error: DELETE ${endpoint}/${id} returned 422: ${lastBody}`,
      );
    }

    if (attempt < maxAttempts - 1) {
      await new Promise((resolve) => setTimeout(resolve, pollDelay));
    }
  }

  throw new Error(
    `Hetzner API error: DELETE ${endpoint}/${id} timed out after ${maxAttempts} attempts (422 resource_in_use): ${lastBody}`,
  );
}
