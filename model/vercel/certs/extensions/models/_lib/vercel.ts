// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated shared helper for Vercel extension models.
// Do not edit manually. Re-generate with: deno task generate:vercel

const API_BASE = Deno.env.get("VERCEL_API_BASE") ?? "https://api.vercel.com";

/**
 * Auth overrides sourced from a model's global arguments. The token field, when
 * set, takes precedence over the VERCEL_TOKEN environment variable and may be
 * wired with a vault.get(...) expression so the credential is sourced from a
 * vault rather than the environment.
 */
export interface AuthOverrides {
  token?: string;
}

/**
 * Team context sourced from a model's global arguments. Nearly every Vercel
 * endpoint accepts teamId or slug as query parameters for team scoping.
 */
export interface TeamContext {
  teamId?: string;
  slug?: string;
}

function getAuth(overrides?: AuthOverrides): string {
  const token = overrides?.token ?? Deno.env.get("VERCEL_TOKEN");
  if (!token) {
    throw new Error(
      "Vercel credentials not set. Provide a token global argument " +
        "(wireable with a vault.get(...) expression), or set the VERCEL_TOKEN " +
        "environment variable.",
    );
  }
  return token;
}

function buildUrl(
  path: string,
  queryParams?: Record<string, string>,
  team?: TeamContext,
): string {
  const params = new URLSearchParams(queryParams);
  if (team?.teamId) params.set("teamId", team.teamId);
  if (team?.slug) params.set("slug", team.slug);
  const qs = params.toString();
  return `${API_BASE}${path}${qs ? "?" + qs : ""}`;
}

async function request(
  method: string,
  path: string,
  body?: Record<string, unknown>,
  auth?: AuthOverrides,
  team?: TeamContext,
  queryParams?: Record<string, string>,
): Promise<Response> {
  const token = getAuth(auth);
  const url = buildUrl(path, queryParams, team);
  const headers: Record<string, string> = {
    "Authorization": `Bearer ${token}`,
    ...(body ? { "Content-Type": "application/json" } : {}),
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
      const parsed = retryAfter ? Number(retryAfter) : NaN;
      const delay = Number.isFinite(parsed)
        ? parsed * 1000
        : 1000 * (attempt + 1);
      await resp.text();
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }
      throw new Error(
        `Vercel API rate limited after ${maxRetries} retries: ${method} ${path}`,
      );
    }

    if (!resp.ok && resp.status !== 404) {
      const text = await resp.text();
      let msg =
        `Vercel API error: ${method} ${path} returned ${resp.status}: ${text}`;
      try {
        const parsed = JSON.parse(text);
        if (parsed?.error?.message) {
          msg =
            `Vercel API error: ${method} ${path} returned ${resp.status}: ${parsed.error.code}: ${parsed.error.message}`;
        }
      } catch { /* not JSON — use raw text */ }
      throw new Error(msg);
    }

    return resp;
  }

  throw new Error(`Unreachable: ${method} ${path}`);
}

export async function create(
  endpoint: string,
  body: Record<string, unknown>,
  auth?: AuthOverrides,
  team?: TeamContext,
  method: "POST" | "PUT" | "PATCH" = "POST",
): Promise<Record<string, unknown>> {
  const resp = await request(method, endpoint, body, auth, team);
  return await resp.json();
}

export async function read(
  endpoint: string,
  id: string,
  auth?: AuthOverrides,
  team?: TeamContext,
): Promise<Record<string, unknown>> {
  const resp = await request(
    "GET",
    `${endpoint}/${encodeURIComponent(id)}`,
    undefined,
    auth,
    team,
  );
  if (resp.status === 404) {
    const text = await resp.text();
    throw new Error(
      `Resource not found: GET ${endpoint}/${id} returned 404: ${text}`,
    );
  }
  return await resp.json();
}

export async function tryRead(
  endpoint: string,
  id: string,
  auth?: AuthOverrides,
  team?: TeamContext,
): Promise<Record<string, unknown> | null> {
  const resp = await request(
    "GET",
    `${endpoint}/${encodeURIComponent(id)}`,
    undefined,
    auth,
    team,
  );
  if (resp.status === 404) {
    await resp.text();
    return null;
  }
  return await resp.json();
}

export async function update(
  endpoint: string,
  id: string,
  body: Record<string, unknown>,
  method: "PATCH" | "PUT" = "PATCH",
  auth?: AuthOverrides,
  team?: TeamContext,
): Promise<Record<string, unknown>> {
  const resp = await request(
    method,
    `${endpoint}/${encodeURIComponent(id)}`,
    body,
    auth,
    team,
  );
  if (resp.status === 404) {
    const text = await resp.text();
    throw new Error(
      `Resource not found: ${method} ${endpoint}/${id} returned 404: ${text}`,
    );
  }
  return await resp.json();
}

export async function remove(
  endpoint: string,
  id: string,
  auth?: AuthOverrides,
  team?: TeamContext,
): Promise<{ existed: boolean }> {
  const resp = await request(
    "DELETE",
    `${endpoint}/${encodeURIComponent(id)}`,
    undefined,
    auth,
    team,
  );
  if (resp.status === 404) {
    await resp.text();
    return { existed: false };
  }
  let data: Record<string, unknown> | undefined;
  try {
    data = await resp.json();
  } catch { /* non-JSON body is fine */ }
  void data;
  return { existed: true };
}

export async function listAll(
  endpoint: string,
  style: "cursor" | "none",
  auth?: AuthOverrides,
  team?: TeamContext,
  queryParams?: Record<string, string>,
  cursorParam: "until" | "next" = "until",
): Promise<Record<string, unknown>[]> {
  const results: Record<string, unknown>[] = [];

  if (style === "cursor") {
    const params: Record<string, string> = {
      ...(queryParams ?? {}),
      limit: "100",
    };
    let cursor: string | undefined;
    const maxPages = 1000;
    let page = 0;
    while (page < maxPages) {
      page++;
      if (cursor) params[cursorParam] = cursor;
      const resp = await request(
        "GET",
        endpoint,
        undefined,
        auth,
        team,
        params,
      );
      const data = await resp.json() as Record<string, unknown>;

      const items = extractArrayFromResponse(data, endpoint);
      if (!items || items.length === 0) break;
      for (const item of items) {
        results.push(item);
      }

      // Check for pagination cursor in the response
      const pagination = (data as Record<string, unknown>).pagination as
        | { next?: number | string; count?: number }
        | undefined;
      if (pagination?.next) {
        cursor = String(pagination.next);
      } else {
        break;
      }
    }
    if (page >= maxPages) {
      throw new Error(
        `Pagination limit exceeded (${maxPages} pages) for ${endpoint} — possible API bug`,
      );
    }
  } else {
    const resp = await request(
      "GET",
      endpoint,
      undefined,
      auth,
      team,
      queryParams,
    );
    const data = await resp.json() as Record<string, unknown>;
    const items = extractArrayFromResponse(data, endpoint);
    if (items) {
      for (const item of items) {
        results.push(item);
      }
    }
  }

  return results;
}

function extractArrayFromResponse(
  data: unknown,
  endpoint: string,
): Record<string, unknown>[] | undefined {
  if (Array.isArray(data)) {
    return data as Record<string, unknown>[];
  }
  if (typeof data !== "object" || data === null) return undefined;
  const obj = data as Record<string, unknown>;

  // Derive expected key from the last path segment (e.g., /v10/projects → "projects")
  const segments = endpoint.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];
  if (
    lastSegment && !lastSegment.startsWith("{") &&
    Array.isArray(obj[lastSegment])
  ) {
    return obj[lastSegment] as Record<string, unknown>[];
  }

  // Fallback: first non-pagination array
  for (const val of Object.values(obj)) {
    if (Array.isArray(val)) {
      return val as Record<string, unknown>[];
    }
  }

  return undefined;
}

export async function tryFindByField(
  endpoint: string,
  field: string,
  value: string,
  style: "cursor" | "none",
  auth?: AuthOverrides,
  team?: TeamContext,
): Promise<Record<string, unknown> | null> {
  const items = await listAll(endpoint, style, auth, team);
  for (const item of items) {
    if (String(item[field]) === value) return item;
  }
  return null;
}
