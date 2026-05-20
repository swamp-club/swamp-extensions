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

import { assertEquals } from "jsr:@std/assert@1.0.19";
import { effectiveHost, effectiveHosts, mergeTransport } from "./hosts.ts";
import { GlobalArgsSchema, TransportSchema } from "./schemas.ts";

Deno.test("mergeTransport: no override returns base, ssh kind", () => {
  const base = TransportSchema.parse({
    kind: "ssh",
    user: "deploy",
    identityFile: "/key",
  });
  const r = mergeTransport(base);
  assertEquals(r.kind, "ssh");
  if (r.kind !== "ssh") throw new Error("unreachable");
  assertEquals(r.user, "deploy");
  assertEquals(r.identityFile, "/key");
  assertEquals(r.port, 22);
});

Deno.test("mergeTransport: ssh override merges shallow", () => {
  const base = TransportSchema.parse({
    kind: "ssh",
    user: "deploy",
    identityFile: "/key",
    port: 22,
  });
  const r = mergeTransport(base, { port: 2222, proxyJump: "bastion" });
  assertEquals(r.kind, "ssh");
  if (r.kind !== "ssh") throw new Error("unreachable");
  assertEquals(r.user, "deploy");
  assertEquals(r.port, 2222);
  assertEquals(r.proxyJump, "bastion");
  assertEquals(r.identityFile, "/key");
});

Deno.test("mergeTransport: override flips ssh → tailscale, ssh fields dropped", () => {
  const base = TransportSchema.parse({
    kind: "ssh",
    user: "deploy",
    identityFile: "/key",
    proxyJump: "bastion",
  });
  const r = mergeTransport(base, {
    kind: "tailscale",
    user: "deploy",
  });
  assertEquals(r.kind, "tailscale");
  if (r.kind !== "tailscale") throw new Error("unreachable");
  assertEquals(r.user, "deploy");
  // No identityFile / proxyJump in the tailscale shape — should not appear.
  assertEquals("identityFile" in r, false);
  assertEquals("proxyJump" in r, false);
});

Deno.test("mergeTransport: override flips tailscale → ssh, tailscale fields dropped", () => {
  const base = TransportSchema.parse({
    kind: "tailscale",
    user: "tail-user",
    sshExtraArgs: ["--verbose"],
  });
  const r = mergeTransport(base, {
    kind: "ssh",
    user: "deploy",
    identityFile: "/key",
  });
  assertEquals(r.kind, "ssh");
  if (r.kind !== "ssh") throw new Error("unreachable");
  assertEquals(r.identityFile, "/key");
  assertEquals(r.user, "deploy");
  assertEquals(r.port, 22);
  assertEquals(r.auth, { kind: "key" });
});

Deno.test("mergeTransport: controlMaster override merges deep", () => {
  const base = TransportSchema.parse({
    kind: "ssh",
    controlMaster: { enabled: true, persistSec: 600 },
  });
  const r = mergeTransport(base, {
    controlMaster: { persistSec: 60 },
  });
  if (r.kind !== "ssh") throw new Error("unreachable");
  assertEquals(r.controlMaster.enabled, true);
  assertEquals(r.controlMaster.persistSec, 60);
});

Deno.test("effectiveHost: merges and preserves tags/attrs", () => {
  const base = TransportSchema.parse({ kind: "ssh", user: "deploy" });
  const h = effectiveHost(base, {
    name: "web-1",
    address: "10.0.0.1",
    tags: ["web", "prod"],
    attrs: { region: "us-east-1", role: "api" },
  });
  assertEquals(h.name, "web-1");
  assertEquals(h.address, "10.0.0.1");
  assertEquals(h.tags, ["web", "prod"]);
  assertEquals(h.attrs.region, "us-east-1");
  assertEquals(h.transport.kind, "ssh");
});

Deno.test("effectiveHost: per-host transport override carries through", () => {
  const base = TransportSchema.parse({ kind: "ssh", user: "deploy" });
  const h = effectiveHost(base, {
    name: "edge-1",
    address: "tail-1",
    tags: [],
    attrs: {},
    transport: { kind: "tailscale", user: "deploy-edge" },
  });
  assertEquals(h.transport.kind, "tailscale");
  if (h.transport.kind !== "tailscale") throw new Error("unreachable");
  assertEquals(h.transport.user, "deploy-edge");
});

Deno.test("effectiveHosts: preserves declaration order", () => {
  const g = GlobalArgsSchema.parse({
    name: "test",
    transport: { kind: "ssh" },
    hosts: [
      { name: "a", address: "1.1.1.1" },
      { name: "b", address: "2.2.2.2" },
      { name: "c", address: "3.3.3.3" },
    ],
  });
  const hs = effectiveHosts(g);
  assertEquals(hs.map((h) => h.name), ["a", "b", "c"]);
});

Deno.test("effectiveHosts: per-host attr is independent (no aliasing)", () => {
  const g = GlobalArgsSchema.parse({
    name: "test",
    transport: { kind: "ssh" },
    hosts: [
      { name: "a", address: "1.1.1.1", attrs: { k: "v1" } },
      { name: "b", address: "2.2.2.2", attrs: { k: "v2" } },
    ],
  });
  const hs = effectiveHosts(g);
  hs[0].attrs.k = "mutated";
  assertEquals(hs[1].attrs.k, "v2"); // mutating one must not affect the other
});
