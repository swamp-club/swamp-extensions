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

// Shared helper for Cloudflare GraphQL Analytics extension models.

const API_BASE = "https://api.cloudflare.com/client/v4";

type ResolvedAuth =
  | { style: "token"; token: string }
  | { style: "key"; key: string; email: string };

export interface AuthOverrides {
  apiToken?: string;
  apiKey?: string;
  email?: string;
}

function getAuth(overrides?: AuthOverrides): ResolvedAuth {
  const apiToken = overrides?.apiToken ?? Deno.env.get("CLOUDFLARE_API_TOKEN");
  if (apiToken) {
    return { style: "token", token: apiToken };
  }

  const apiKey = overrides?.apiKey ?? Deno.env.get("CLOUDFLARE_API_KEY");
  const email = overrides?.email ?? Deno.env.get("CLOUDFLARE_EMAIL");
  if (apiKey && email) {
    return { style: "key", key: apiKey, email };
  }

  throw new Error(
    "Cloudflare credentials not set. Provide an apiToken (recommended) or " +
      "apiKey + email global argument (each wireable with a vault.get(...) " +
      "expression), or set the CLOUDFLARE_API_TOKEN environment variable " +
      "(recommended) or CLOUDFLARE_API_KEY + CLOUDFLARE_EMAIL.",
  );
}

function authHeaders(auth: ResolvedAuth): Record<string, string> {
  if (auth.style === "token") {
    return { "Authorization": `Bearer ${auth.token}` };
  }
  return { "X-Auth-Key": auth.key, "X-Auth-Email": auth.email };
}

export interface GraphQLResponse {
  data: Record<string, unknown> | null;
  errors:
    | Array<
      { message: string; path?: string[]; extensions?: Record<string, unknown> }
    >
    | null;
}

export async function query(
  graphqlQuery: string,
  variables: Record<string, unknown>,
  auth?: AuthOverrides,
): Promise<Record<string, unknown>> {
  const resolved = getAuth(auth);
  const url = `${API_BASE}/graphql`;
  const headers: Record<string, string> = {
    ...authHeaders(resolved),
    "Content-Type": "application/json",
  };

  const body = JSON.stringify({ query: graphqlQuery, variables });

  const maxRetries = 3;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const resp = await fetch(url, { method: "POST", headers, body });

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
        `Cloudflare GraphQL API rate limited after ${maxRetries} retries`,
      );
    }

    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(
        `Cloudflare GraphQL API error: POST /graphql returned ${resp.status}: ${text}`,
      );
    }

    const result = await resp.json() as GraphQLResponse;

    if (result.errors && result.errors.length > 0) {
      const messages = result.errors.map((e) => e.message).join("; ");
      throw new Error(`Cloudflare GraphQL query error: ${messages}`);
    }

    if (!result.data) {
      throw new Error("Cloudflare GraphQL response contained no data");
    }

    return result.data;
  }

  throw new Error("Unreachable: POST /graphql");
}
