// Swamp, an Automation Framework Copyright (C) 2026 System Initiative, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify it under the terms
// of the GNU Affero General Public License version 3 as published by the Free
// Software Foundation, with the Swamp Extension and Definition Exception (found in
// the "COPYING-EXCEPTION" file).
//
// Swamp is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
// PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License along
// with Swamp. If not, see <https://www.gnu.org/licenses/>.

import { join } from "jsr:@std/path@1.1.4";
import { TrackerError } from "./adapter.ts";

// ---------------------------------------------------------------------------
// swamp's stored login, auth.json, as `swamp auth login` writes it. The
// built-in tracker reads its username to assign tickets, and the swamp-club
// Lab adapter reads its key and server. It lives in tracker core so the
// built-in tracker, which ships, imports nothing of the Lab's, which does
// not (DESIGN.md, "the swamp-club Lab adapter is kept, not shipped").
// ---------------------------------------------------------------------------

/** swamp's server, the stored login's when the file names none. */
export const SWAMP_CLUB_URL = "https://swamp-club.com";
/** Whether a url is on swamp-club's legacy domain. */
function isLegacyDomain(url: string): boolean {
  try {
    return new URL(url).hostname === "swamp.club";
  } catch {
    return false;
  }
}

export interface AuthFile {
  serverUrl: string;
  apiKey: string;
  username?: string;
}

/** Where credentials come from; injected in tests. */
export interface CredentialSources {
  env(name: string): string | undefined;
  readAuthFile(): Promise<AuthFile | null>;
}

/**
 * Read swamp's stored login: $XDG_CONFIG_HOME/swamp/auth.json, or
 * $HOME/.config/swamp/auth.json. Null when there is none; a file that is
 * there but cannot be read or parsed is an auth error, not "logged out".
 */
export async function readSwampAuthFile(
  env: (name: string) => string | undefined,
  /** The tracker an auth error names: the one reading the login. */
  tracker: string,
): Promise<AuthFile | null> {
  const xdg = env("XDG_CONFIG_HOME");
  const home = env("HOME");
  const dir = xdg
    ? join(xdg, "swamp")
    : home
    ? join(home, ".config", "swamp")
    : null;
  if (dir === null) return null;
  const path = join(dir, "auth.json");
  let text: string;
  try {
    text = await Deno.readTextFile(path);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) return null;
    throw new TrackerError(
      "auth",
      tracker,
      `could not read the stored login at ${path}: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
  const broken = (why: string) =>
    new TrackerError(
      "auth",
      tracker,
      `the stored login at ${path} ${why}; run \`swamp auth login\``,
    );
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw broken("is not valid JSON");
  }
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw broken("is not a JSON object");
  }
  const creds = parsed as Record<string, unknown>;
  for (const field of ["serverUrl", "apiKey", "username"]) {
    if (creds[field] !== undefined && typeof creds[field] !== "string") {
      throw broken(`has a ${field} that is not a string`);
    }
  }
  const { serverUrl: stored, apiKey, username } = creds as {
    serverUrl?: string;
    apiKey?: string;
    username?: string;
  };
  if (!apiKey) return null;
  // The CLI rewrites the legacy domain when it saves the file; here we only
  // read it, so translate at the read site.
  const serverUrl = stored === undefined || isLegacyDomain(stored)
    ? SWAMP_CLUB_URL
    : stored;
  return {
    serverUrl,
    apiKey,
    username: username || undefined,
  };
}

/** The real environment and the real auth.json, read for `tracker`. */
export function defaultSources(tracker: string): CredentialSources {
  return {
    env: (name) => Deno.env.get(name),
    readAuthFile: () =>
      readSwampAuthFile((name) => Deno.env.get(name), tracker),
  };
}
