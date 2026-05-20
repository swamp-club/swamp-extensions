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
 * Merge fleet-default transport with per-host overrides to produce a fully
 * resolved `EffectiveHost`. This is the only place that decides what each
 * host's spawn argv will be built against — the runner and selectors see
 * only the merged result.
 *
 * @module
 */

import type {
  Auth,
  GlobalArgs,
  Host,
  SshTransport,
  TailscaleTransport,
  Transport,
  TransportOverride,
} from "./schemas.ts";

/**
 * Resolved per-host transport — the discriminated union mirrors
 * `TransportSchema`, but every field that has a fleet-or-host default is
 * already filled in.
 */
export type EffectiveTransport =
  | (Omit<SshTransport, "kind"> & { kind: "ssh" })
  | (Omit<TailscaleTransport, "kind"> & { kind: "tailscale" });

/**
 * A host after fleet/override merging. Selectors evaluate against this shape;
 * the runner builds argv from it.
 */
export interface EffectiveHost {
  name: string;
  address: string;
  tags: string[];
  attrs: Record<string, unknown>;
  env: Record<string, string>;
  transport: EffectiveTransport;
}

/**
 * Default values for any ssh-transport field that has a fleet-or-host
 * default. Used when a host flips `kind: tailscale` → `kind: ssh` and the
 * fleet default was tailscale (so nothing else carries forward).
 */
const SSH_DEFAULTS = {
  port: 22 as const,
  auth: { kind: "key" as const } satisfies Auth,
  connectTimeoutSec: 10 as const,
  controlMaster: { enabled: true as const, persistSec: 600 as const },
  extraOptions: [] as readonly string[],
};

const TAILSCALE_DEFAULTS = {
  sshExtraArgs: [] as readonly string[],
};

function mergeSshTransport(
  base: SshTransport,
  override: TransportOverride,
): EffectiveTransport {
  return {
    kind: "ssh",
    user: pick(override.user, base.user),
    port: pick(override.port, base.port),
    auth: pick(override.auth, base.auth),
    identityFile: pick(override.identityFile, base.identityFile),
    identityAgent: pick(override.identityAgent, base.identityAgent),
    identitiesOnly: pick(override.identitiesOnly, base.identitiesOnly),
    knownHostsFile: pick(override.knownHostsFile, base.knownHostsFile),
    strictHostKeyChecking: pick(
      override.strictHostKeyChecking,
      base.strictHostKeyChecking,
    ),
    connectTimeoutSec: pick(
      override.connectTimeoutSec,
      base.connectTimeoutSec,
    ),
    serverAliveIntervalSec: pick(
      override.serverAliveIntervalSec,
      base.serverAliveIntervalSec,
    ),
    proxyJump: pick(override.proxyJump, base.proxyJump),
    proxyCommand: pick(override.proxyCommand, base.proxyCommand),
    extraOptions: override.extraOptions ?? base.extraOptions,
    controlMaster: {
      enabled: pick(
        override.controlMaster?.enabled,
        base.controlMaster.enabled,
      ),
      persistSec: pick(
        override.controlMaster?.persistSec,
        base.controlMaster.persistSec,
      ),
    },
  };
}

function mergeTailscaleTransport(
  base: TailscaleTransport,
  override: TransportOverride,
): EffectiveTransport {
  return {
    kind: "tailscale",
    user: pick(override.user, base.user),
    tailscaleBinary: pick(override.tailscaleBinary, base.tailscaleBinary),
    sshExtraArgs: override.sshExtraArgs ?? base.sshExtraArgs,
  };
}

function pick<T>(a: T | undefined, b: T): T;
function pick<T>(a: T | undefined, b: T | undefined): T | undefined;
function pick<T>(a: T | undefined, b: T | undefined): T | undefined {
  return a !== undefined ? a : b;
}

/**
 * Merge a fleet-default transport with a per-host override.
 *
 * If `override.kind` flips the discriminator (e.g. fleet default is `ssh`
 * but the host says `tailscale`), the result uses a synthetic blank base
 * of the override's kind, then layers the override fields on top. That
 * matches the design: a host opting into a different transport doesn't
 * inherit fields meaningful only to the other kind.
 */
export function mergeTransport(
  base: Transport,
  override?: TransportOverride,
): EffectiveTransport {
  if (!override) {
    if (base.kind === "ssh") {
      return mergeSshTransport(base, {});
    }
    return mergeTailscaleTransport(base, {});
  }

  const effectiveKind = override.kind ?? base.kind;

  if (effectiveKind === "ssh") {
    const sshBase: SshTransport = base.kind === "ssh" ? base : {
      kind: "ssh",
      port: SSH_DEFAULTS.port,
      auth: SSH_DEFAULTS.auth,
      connectTimeoutSec: SSH_DEFAULTS.connectTimeoutSec,
      controlMaster: SSH_DEFAULTS.controlMaster,
      extraOptions: [...SSH_DEFAULTS.extraOptions],
    };
    return mergeSshTransport(sshBase, override);
  }

  const tsBase: TailscaleTransport = base.kind === "tailscale" ? base : {
    kind: "tailscale",
    sshExtraArgs: [...TAILSCALE_DEFAULTS.sshExtraArgs],
  };
  return mergeTailscaleTransport(tsBase, override);
}

/**
 * Resolve a single host record into an `EffectiveHost`. Merges fleet
 * transport with the host's override (if any), copies tags/attrs, and
 * preserves any explicit `env` map.
 */
export function effectiveHost(
  fleetTransport: Transport,
  host: Host,
): EffectiveHost {
  return {
    name: host.name,
    address: host.address,
    tags: [...host.tags],
    attrs: { ...host.attrs },
    env: { ...(host.env ?? {}) },
    transport: mergeTransport(fleetTransport, host.transport),
  };
}

/**
 * Resolve every host in the fleet into its `EffectiveHost`. The result is
 * a stable array — order matches `globalArgs.hosts`.
 */
export function effectiveHosts(globalArgs: GlobalArgs): EffectiveHost[] {
  return globalArgs.hosts.map((h) => effectiveHost(globalArgs.transport, h));
}
