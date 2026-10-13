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

interface GcpCredentials {
  projectId: string;
  accessToken: string;
}

let cachedCredentials: GcpCredentials | undefined;
let cachedAt = 0;
const TOKEN_TTL_MS = 50 * 60 * 1000;

export async function getCredentials(
  projectIdOverride?: string,
): Promise<GcpCredentials> {
  const directToken = Deno.env.get("GCP_ACCESS_TOKEN")?.trim();
  if (directToken) {
    const projectId = projectIdOverride ??
      Deno.env.get("GCP_PROJECT")?.trim() ??
      Deno.env.get("GOOGLE_CLOUD_PROJECT")?.trim() ?? "";
    return { projectId, accessToken: directToken };
  }

  if (cachedCredentials && (Date.now() - cachedAt) < TOKEN_TTL_MS) {
    if (projectIdOverride) {
      return {
        projectId: projectIdOverride,
        accessToken: cachedCredentials.accessToken,
      };
    }
    return cachedCredentials;
  }
  cachedCredentials = undefined;

  const credJson = Deno.env.get("GOOGLE_APPLICATION_CREDENTIALS_JSON");
  if (credJson) {
    cachedCredentials = await activateServiceAccountFromJson(credJson);
    cachedAt = Date.now();
    return applyProjectOverride(cachedCredentials, projectIdOverride);
  }

  const credFile = Deno.env.get("GOOGLE_APPLICATION_CREDENTIALS");
  if (credFile) {
    const fileContent = await Deno.readTextFile(credFile);
    cachedCredentials = await activateServiceAccountFromJson(fileContent);
    cachedAt = Date.now();
    return applyProjectOverride(cachedCredentials, projectIdOverride);
  }

  cachedCredentials = await getApplicationDefaultCredentials();
  cachedAt = Date.now();
  return applyProjectOverride(cachedCredentials, projectIdOverride);
}

function applyProjectOverride(
  creds: GcpCredentials,
  override?: string,
): GcpCredentials {
  const projectId = override ??
    Deno.env.get("GCP_PROJECT")?.trim() ??
    Deno.env.get("GOOGLE_CLOUD_PROJECT")?.trim() ??
    creds.projectId;
  return { projectId, accessToken: creds.accessToken };
}

async function activateServiceAccountFromJson(
  json: string,
): Promise<GcpCredentials> {
  let creds: { client_email?: string; project_id?: string };
  try {
    creds = JSON.parse(json);
  } catch {
    throw new Error("Service account JSON is not valid JSON");
  }

  if (!creds.client_email || !creds.project_id) {
    throw new Error(
      "Service account JSON must contain client_email and project_id",
    );
  }

  const tmpFile = await Deno.makeTempFile({ suffix: ".json" });
  try {
    await Deno.writeTextFile(tmpFile, json);
    const activateResult = await new Deno.Command("gcloud", {
      args: [
        "auth",
        "activate-service-account",
        creds.client_email,
        "--key-file",
        tmpFile,
        "--quiet",
      ],
      stdout: "piped",
      stderr: "piped",
    }).output();
    if (!activateResult.success) {
      const stderr = new TextDecoder().decode(activateResult.stderr);
      throw new Error(`Failed to activate service account: ${stderr}`);
    }

    const tokenResult = await new Deno.Command("gcloud", {
      args: ["auth", "print-access-token", creds.client_email],
      stdout: "piped",
      stderr: "piped",
    }).output();
    if (!tokenResult.success) {
      const stderr = new TextDecoder().decode(tokenResult.stderr);
      throw new Error(`Failed to get access token: ${stderr}`);
    }

    const accessToken = new TextDecoder().decode(tokenResult.stdout).trim();
    return { projectId: creds.project_id, accessToken };
  } finally {
    try {
      await Deno.remove(tmpFile);
    } catch { /* ignore */ }
  }
}

async function getApplicationDefaultCredentials(): Promise<GcpCredentials> {
  const tokenResult = await new Deno.Command("gcloud", {
    args: ["auth", "application-default", "print-access-token"],
    stdout: "piped",
    stderr: "piped",
  }).output();
  if (!tokenResult.success) {
    const stderr = new TextDecoder().decode(tokenResult.stderr);
    throw new Error(
      "No GCP credentials found. Set one of:\n" +
        "  - GCP_ACCESS_TOKEN (pre-obtained OAuth2 access token)\n" +
        "  - GOOGLE_APPLICATION_CREDENTIALS_JSON (inline service account JSON)\n" +
        "  - GOOGLE_APPLICATION_CREDENTIALS (path to service account JSON file)\n" +
        "  - Run: gcloud auth application-default login\n" +
        `gcloud error: ${stderr}`,
    );
  }

  const accessToken = new TextDecoder().decode(tokenResult.stdout).trim();

  const projectResult = await new Deno.Command("gcloud", {
    args: ["config", "get-value", "project"],
    stdout: "piped",
    stderr: "piped",
  }).output();
  let projectId = "";
  if (projectResult.success) {
    const p = new TextDecoder().decode(projectResult.stdout).trim();
    if (p && p !== "(unset)") projectId = p;
  }

  return { projectId, accessToken };
}

export async function authenticatedFetch(
  url: string,
  opts: {
    method: string;
    body?: unknown;
    projectIdOverride?: string;
  },
): Promise<Response> {
  const creds = await getCredentials(opts.projectIdOverride);
  const headers: Record<string, string> = {
    "Authorization": `Bearer ${creds.accessToken}`,
    "Content-Type": "application/json",
  };

  const resp = await fetch(url, {
    method: opts.method,
    headers,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });

  if (resp.status === 401) {
    await resp.text();
    cachedCredentials = undefined;
    const freshCreds = await getCredentials(opts.projectIdOverride);
    return await fetch(url, {
      method: opts.method,
      headers: {
        "Authorization": `Bearer ${freshCreds.accessToken}`,
        "Content-Type": "application/json",
      },
      body: opts.body ? JSON.stringify(opts.body) : undefined,
    });
  }

  return resp;
}

export function clearCredentialCache(): void {
  cachedCredentials = undefined;
  cachedAt = 0;
}

export async function resolveProjectId(
  configProjectId?: string,
): Promise<string> {
  if (configProjectId) return configProjectId;
  const creds = await getCredentials();
  if (creds.projectId) return creds.projectId;
  throw new Error(
    "Could not resolve GCP project ID. Set 'project_id' in vault config, " +
      "or set the GOOGLE_CLOUD_PROJECT environment variable, " +
      "or run 'gcloud config set project <id>'.",
  );
}
