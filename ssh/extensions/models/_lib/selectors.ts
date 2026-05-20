// Swamp, an Automation Framework
// Copyright (C) 2026 System Initiative, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

/**
 * Selector evaluation. Takes the `hosts` argument from a method call —
 * `"all"`, an array of names, or a CEL string — and produces the matched
 * subset of `EffectiveHost[]`.
 *
 * CEL evaluation uses the per-call Environment supplied by the swamp host
 * via `ctx.createCelEnvironment()`. We register `matchesRegex` and
 * `cidrContains` on every call — registrations are scoped to that
 * Environment instance and do not bleed into anything else.
 *
 * Missing host attributes (e.g. `host.attrs.region` when a host has no
 * `region` attr) make the host not match. The runtime catches the
 * cel-js `EvaluationError` and emits a debug log entry naming the host
 * and the missing key — useful in tests, silent in normal runs. Parse
 * errors in the expression itself are propagated to the caller so the
 * `select-syntax` check can refuse the call before execute starts.
 *
 * @module
 */

import { cidrContains } from "./cidr.ts";
import type { Selector } from "./schemas.ts";
import type { EffectiveHost } from "./hosts.ts";

/**
 * Minimal interface our code needs from a cel-js `Environment`. We avoid
 * importing `Environment` as a named type — per the swamp extension guide,
 * `ReturnType<typeof ctx.createCelEnvironment>` is the canonical way to
 * type it without pinning the library.
 *
 * Structural typing here matches both the host-provided Environment and
 * a locally constructed one.
 */
export interface CelEnvLike {
  parse(expression: string): {
    (context: Record<string, unknown>): unknown;
  };
  registerFunction(
    signature: string,
    impl: (...args: never[]) => unknown,
  ): void;
}

/** Logger surface used by selector evaluation. Matches MethodContext.logger. */
export interface SelectorLogger {
  debug(message: string, ...args: unknown[]): void;
}

/**
 * Build a host record into the shape exposed to CEL. We snapshot the
 * fields rather than handing the EffectiveHost over directly so that
 * future internal fields don't accidentally become part of the public
 * selector surface.
 */
function celContext(host: EffectiveHost): Record<string, unknown> {
  return {
    host: {
      name: host.name,
      address: host.address,
      port: host.transport.kind === "ssh" ? host.transport.port : 22,
      user: host.transport.user ?? "",
      tags: host.tags,
      transport: host.transport.kind,
      env: host.env,
      attrs: host.attrs,
    },
  };
}

/**
 * Register the bundled helper functions on a fresh Environment.
 *
 * - `matchesRegex(s, pat)` — JavaScript-regex test.
 * - `cidrContains(cidr, addr)` — IPv4/IPv6 containment.
 *
 * Both are pure, total functions (no exceptions on bad input — see the
 * cidr module for the rationale). Bad regex patterns DO throw, which
 * surfaces as an EvaluationError and excludes the host with a log.
 */
export function registerHelpers(env: CelEnvLike): void {
  env.registerFunction(
    "matchesRegex(string, string): bool",
    ((value: string, pattern: string) =>
      new RegExp(pattern).test(value)) as unknown as (
        ...args: never[]
      ) => unknown,
  );
  env.registerFunction(
    "cidrContains(string, string): bool",
    ((cidr: string, addr: string) => cidrContains(cidr, addr)) as unknown as (
      ...args: never[]
    ) => unknown,
  );
}

/**
 * Compile a CEL expression. Throws on parse errors; the call site (the
 * `select-syntax` check) catches and reports them before the method runs.
 */
export function compile(
  env: CelEnvLike,
  expression: string,
): (host: EffectiveHost) => boolean {
  const program = env.parse(expression);
  return (host) => {
    try {
      const result = program(celContext(host));
      return result === true;
    } catch (err) {
      // Re-throw — caller decides whether to treat as no-match.
      throw err;
    }
  };
}

/**
 * Resolve a selector value to the matching subset of `hosts`.
 *
 * Form rules:
 * - `"all"` returns every host.
 * - `string[]` selects exact names (an unknown name silently produces no
 *   matches for that entry — empty selection is caught by the
 *   `fleet-non-empty` check, not here).
 * - bare string is a CEL expression evaluated per host.
 *
 * For CEL evaluation, a host whose expression throws an `EvaluationError`
 * (typically: missing attribute) does not match and produces a debug log
 * entry. Other errors propagate.
 */
export function selectHosts(
  selector: Selector,
  hosts: EffectiveHost[],
  env: CelEnvLike,
  logger: SelectorLogger,
): EffectiveHost[] {
  if (selector === "all") {
    return [...hosts];
  }

  if (Array.isArray(selector)) {
    const wanted = new Set(selector);
    return hosts.filter((h) => wanted.has(h.name));
  }

  // CEL string. Helpers are scoped to this Environment.
  registerHelpers(env);
  const predicate = compile(env, selector);

  const matched: EffectiveHost[] = [];
  for (const host of hosts) {
    try {
      if (predicate(host)) matched.push(host);
    } catch (err) {
      // cel-js's EvaluationError carries `name === "EvaluationError"`.
      // We accept the message as a debug hint and exclude the host.
      // Anything else propagates — it represents a real bug, not a
      // soft attribute miss.
      if (looksLikeEvaluationError(err)) {
        logger.debug(
          "selector skipped host {host}: {message}",
          {
            host: host.name,
            message: err instanceof Error ? err.message : String(err),
          },
        );
        continue;
      }
      throw err;
    }
  }
  return matched;
}

function looksLikeEvaluationError(err: unknown): boolean {
  if (err instanceof Error) {
    if (err.name === "EvaluationError") return true;
    // Defensive fallback — different cel-js versions name the class
    // differently. The "No such key" message is stable across releases.
    if (err.message.includes("No such key")) return true;
  }
  return false;
}
