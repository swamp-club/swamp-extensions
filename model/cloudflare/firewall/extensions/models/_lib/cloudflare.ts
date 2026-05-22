// Auto-generated shared helper for Cloudflare extension models.
// Do not edit manually. Re-generate with: deno task generate:cloudflare

const API_BASE = "https://api.cloudflare.com/client/v4";

let validatedAuth: { style: "token"; token: string } | {
  style: "key";
  key: string;
  email: string;
} | undefined;

async function getAuth(): Promise<typeof validatedAuth & object> {
  if (validatedAuth) return validatedAuth;

  const apiToken = Deno.env.get("CLOUDFLARE_API_TOKEN");
  if (apiToken) {
    const resp = await fetch(`${API_BASE}/user/tokens/verify`, {
      headers: { "Authorization": `Bearer ${apiToken}` },
    });
    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(
        `CLOUDFLARE_API_TOKEN is invalid (GET /user/tokens/verify returned ${resp.status}): ${text}`,
      );
    }
    await resp.text();
    validatedAuth = { style: "token", token: apiToken };
    return validatedAuth;
  }

  const apiKey = Deno.env.get("CLOUDFLARE_API_KEY");
  const email = Deno.env.get("CLOUDFLARE_EMAIL");
  if (apiKey && email) {
    const resp = await fetch(`${API_BASE}/user`, {
      headers: { "X-Auth-Key": apiKey, "X-Auth-Email": email },
    });
    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(
        `CLOUDFLARE_API_KEY/EMAIL is invalid (GET /user returned ${resp.status}): ${text}`,
      );
    }
    await resp.text();
    validatedAuth = { style: "key", key: apiKey, email };
    return validatedAuth;
  }

  throw new Error(
    "Cloudflare credentials not set. Set CLOUDFLARE_API_TOKEN " +
      "(recommended) or CLOUDFLARE_API_KEY + CLOUDFLARE_EMAIL. " +
      "Use: swamp vault set CLOUDFLARE_API_TOKEN <your-token>",
  );
}

function authHeaders(
  auth: typeof validatedAuth & object,
): Record<string, string> {
  if (auth.style === "token") {
    return { "Authorization": `Bearer ${auth.token}` };
  }
  return { "X-Auth-Key": auth.key, "X-Auth-Email": auth.email };
}

async function request(
  method: string,
  path: string,
  body?: Record<string, unknown>,
): Promise<Response> {
  const auth = await getAuth();
  const url = `${API_BASE}${path}`;
  const headers: Record<string, string> = {
    ...authHeaders(auth),
    "Content-Type": "application/json",
  };

  const maxRetries = 3;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const resp = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (resp.status === 429) {
      const retryAfter = resp.headers.get("Retry-After");
      const delay = retryAfter
        ? parseInt(retryAfter) * 1000
        : 1000 * (attempt + 1);
      await resp.text();
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }
      throw new Error(
        `Cloudflare API rate limited after ${maxRetries} retries: ${method} ${path}`,
      );
    }

    if (!resp.ok && resp.status !== 404) {
      const text = await resp.text();
      throw new Error(
        `Cloudflare API error: ${method} ${path} returned ${resp.status}: ${text}`,
      );
    }

    return resp;
  }

  throw new Error(`Unreachable: ${method} ${path}`);
}

function assertSuccess(data: Record<string, unknown>): void {
  if (data.success === false) {
    const errors = data.errors as
      | Array<{ code: number; message: string }>
      | undefined;
    const msg = errors?.map((e) => `${e.code}: ${e.message}`).join("; ") ??
      "Unknown error";
    throw new Error(`Cloudflare API error: ${msg}`);
  }
}

function unwrap(data: Record<string, unknown>): Record<string, unknown> {
  assertSuccess(data);
  if (
    "result" in data && data.result !== null &&
    typeof data.result === "object" && !Array.isArray(data.result)
  ) {
    return data.result as Record<string, unknown>;
  }
  return data;
}

export async function create(
  endpoint: string,
  body: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const resp = await request("POST", endpoint, body);
  const data = await resp.json();
  return unwrap(data);
}

export async function read(
  endpoint: string,
  id: string,
): Promise<Record<string, unknown>> {
  const resp = await request("GET", `${endpoint}/${id}`);
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
  id: string,
): Promise<Record<string, unknown> | null> {
  const resp = await request("GET", `${endpoint}/${id}`);
  if (resp.status === 404) {
    await resp.text();
    return null;
  }
  const data = await resp.json();
  return unwrap(data);
}

export async function update(
  endpoint: string,
  id: string,
  body: Record<string, unknown>,
  method: "PATCH" | "PUT" = "PATCH",
): Promise<Record<string, unknown>> {
  const resp = await request(method, `${endpoint}/${id}`, body);
  if (resp.status === 404) {
    const text = await resp.text();
    throw new Error(
      `Resource not found: ${method} ${endpoint}/${id} returned 404: ${text}`,
    );
  }
  const data = await resp.json();
  return unwrap(data);
}

export async function remove(
  endpoint: string,
  id: string,
): Promise<{ existed: boolean }> {
  const resp = await request("DELETE", `${endpoint}/${id}`);
  if (resp.status === 404) {
    await resp.text();
    return { existed: false };
  }
  // Some DELETE responses have a body, some don't
  try {
    const data = await resp.json();
    assertSuccess(data);
  } catch {
    // Empty body or non-JSON is fine for DELETEs
  }
  return { existed: true };
}

export async function listAll(
  endpoint: string,
  style: "page" | "cursor" | "none",
  queryParams?: Record<string, string>,
): Promise<Record<string, unknown>[]> {
  const results: Record<string, unknown>[] = [];
  const params = new URLSearchParams(queryParams);

  if (style === "page") {
    params.set("per_page", "100");
    let page = 1;
    while (true) {
      params.set("page", String(page));
      const resp = await request("GET", `${endpoint}?${params.toString()}`);
      const data = await resp.json() as Record<string, unknown>;
      assertSuccess(data);
      const items = data.result;
      if (!Array.isArray(items) || items.length === 0) break;
      for (const item of items) {
        results.push(item as Record<string, unknown>);
      }
      const info = data.result_info as
        | { total_pages?: number; page?: number }
        | undefined;
      if (!info?.total_pages || page >= info.total_pages) break;
      page++;
    }
  } else if (style === "cursor") {
    params.set("limit", "100");
    let cursor: string | undefined;
    while (true) {
      if (cursor) params.set("cursor", cursor);
      const resp = await request("GET", `${endpoint}?${params.toString()}`);
      const data = await resp.json() as Record<string, unknown>;
      assertSuccess(data);
      const items = data.result;
      if (!Array.isArray(items) || items.length === 0) break;
      for (const item of items) {
        results.push(item as Record<string, unknown>);
      }
      const info = data.result_info as { cursor?: string } | undefined;
      cursor = info?.cursor;
      if (!cursor) break;
    }
  } else {
    const resp = await request("GET", `${endpoint}?${params.toString()}`);
    const data = await resp.json() as Record<string, unknown>;
    assertSuccess(data);
    const items = data.result;
    if (Array.isArray(items)) {
      for (const item of items) {
        results.push(item as Record<string, unknown>);
      }
    }
  }

  return results;
}

export async function tryFindByField(
  endpoint: string,
  field: string,
  value: string,
  style: "page" | "cursor" | "none",
): Promise<Record<string, unknown> | null> {
  const items = await listAll(endpoint, style);
  for (const item of items) {
    if (String(item[field]) === value) return item;
  }
  return null;
}
