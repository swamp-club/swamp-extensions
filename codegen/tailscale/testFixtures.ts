// Test fixtures: a trimmed, already-dereferenced Tailscale spec covering one
// model of each kind, and helpers to pick resource table entries.

import type { OApiSchema, OApiSpec } from "./pipeline.ts";
import { type ResourceEntry, RESOURCES } from "./resources.ts";

const json = (schema: OApiSchema) => ({
  content: { "application/json": { schema } },
});
const ok = (schema: OApiSchema) => ({ "200": json(schema) });
const object = (
  properties: Record<string, OApiSchema>,
  required?: string[],
): OApiSchema => ({ type: "object", properties, required });
const str: OApiSchema = { type: "string" };
const strings: OApiSchema = { type: "array", items: str };
const pathParam = (name: string) => ({
  name,
  in: "path",
  required: true,
  description: `The ${name}`,
  schema: str,
});
const tailnet = pathParam("tailnet");

const webhook = object({
  endpointId: str,
  endpointUrl: str,
  providerType: { type: "string", enum: ["slack", "discord"] },
  subscriptions: strings,
  secret: { type: "string", format: "password" },
});

const key = object({
  id: str,
  key: str,
  keyType: str,
  description: str,
  expirySeconds: { type: "integer" },
  scopes: strings,
});

const device = object({
  id: str,
  nodeId: str,
  name: str,
  tags: strings,
  keyExpiryDisabled: { type: "boolean" },
  authorized: { type: "boolean" },
});

const oauthApp = object({
  id: str,
  name: str,
  redirectURIs: strings,
  scopes: strings,
  clientSecret: { type: "string", format: "password" },
});
const oauthAppBody = object({
  name: str,
  redirectURIs: strings,
  scopes: strings,
}, ["name", "redirectURIs", "scopes"]);

const service = object({
  name: str,
  comment: str,
  addrs: strings,
});

/** A spec holding exactly the operations the FIXTURE_MODELS entries use. */
export function fixtureSpec(): OApiSpec {
  return {
    paths: {
      "/tailnet/{tailnet}/webhooks": {
        parameters: [tailnet],
        get: {
          responses: ok(
            object({ webhooks: { type: "array", items: webhook } }),
          ),
        },
        post: {
          requestBody: json(object({
            endpointUrl: str,
            providerType: { type: "string", enum: ["slack", "discord"] },
            subscriptions: strings,
          }, ["endpointUrl", "subscriptions"])),
          responses: ok(webhook),
        },
      },
      "/webhooks/{endpointId}": {
        parameters: [pathParam("endpointId")],
        get: { responses: ok(webhook) },
        patch: {
          requestBody: json(object({ subscriptions: strings })),
          responses: ok(webhook),
        },
        delete: { responses: { "200": {} } },
      },
      "/webhooks/{endpointId}/test": {
        parameters: [pathParam("endpointId")],
        post: { responses: { "202": {} } },
      },
      "/webhooks/{endpointId}/rotate": {
        parameters: [pathParam("endpointId")],
        post: { responses: ok(webhook) },
      },
      "/tailnet/{tailnet}/keys": {
        parameters: [tailnet],
        get: {
          parameters: [{
            name: "all",
            in: "query",
            schema: { type: "boolean" },
          }],
          responses: ok(object({ keys: { type: "array", items: key } })),
        },
        post: {
          requestBody: json(object({
            keyType: { type: "string", enum: ["auth", "client", "federated"] },
            description: str,
            capabilities: object({
              devices: object({
                create: object({ reusable: { type: "boolean" } }),
              }),
            }),
            expirySeconds: { type: "integer" },
            scopes: strings,
            tags: strings,
          })),
          responses: ok(key),
        },
      },
      "/tailnet/{tailnet}/keys/{keyId}": {
        parameters: [tailnet, pathParam("keyId")],
        get: { responses: ok(key) },
        delete: { responses: { "200": {} } },
      },
      "/tailnet/{tailnet}/services": {
        parameters: [tailnet],
        get: {
          responses: ok(
            object({ vipServices: { type: "array", items: service } }),
          ),
        },
      },
      "/tailnet/{tailnet}/services/{serviceName}": {
        parameters: [tailnet, pathParam("serviceName")],
        get: { responses: ok(service) },
        put: { requestBody: json(service), responses: ok(service) },
        delete: { responses: { "200": {} } },
      },
      "/tailnet/{tailnet}/services/{serviceName}/devices": {
        parameters: [tailnet, pathParam("serviceName")],
        get: {
          responses: ok(object({ hosts: { type: "array", items: str } })),
        },
      },
      "/tailnet/{tailnet}/services/{serviceName}/device/{deviceId}/approved": {
        parameters: [tailnet, pathParam("serviceName"), pathParam("deviceId")],
        get: { responses: ok(object({ approved: { type: "boolean" } })) },
        post: {
          requestBody: json(object({ approved: { type: "boolean" } })),
          responses: ok(object({ approved: { type: "boolean" } })),
        },
      },
      "/tailnet/{tailnet}/settings": {
        parameters: [tailnet],
        get: {
          responses: ok(object({
            devicesApprovalOn: { type: ["boolean", "null"] },
            devicesKeyDurationDays: { type: "integer" },
          })),
        },
        patch: {
          requestBody: json(object({
            devicesApprovalOn: { type: ["boolean", "null"] },
            devicesKeyDurationDays: { type: "integer" },
          })),
          responses: ok(object({})),
        },
      },
      "/tailnet/{tailnet}/dns/nameservers": {
        parameters: [tailnet],
        get: { responses: ok(object({ dns: strings })) },
        post: {
          requestBody: json(object({ dns: strings })),
          responses: ok(object({ dns: strings })),
        },
      },
      "/tailnet/{tailnet}/dns/split-dns": {
        parameters: [tailnet],
        get: {
          responses: ok({ type: "object", additionalProperties: strings }),
        },
        patch: {
          requestBody: json({ type: "object", additionalProperties: strings }),
          responses: ok({ type: "object", additionalProperties: strings }),
        },
      },
      "/tailnet/{tailnet}/acl": {
        parameters: [tailnet],
        get: { responses: ok({ type: "object" }) },
        post: {
          requestBody: json({ type: "object" }),
          responses: ok({ type: "object" }),
        },
      },
      "/tailnet/{tailnet}/acl/preview": {
        parameters: [tailnet],
        post: {
          parameters: [
            {
              name: "type",
              in: "query",
              schema: { type: "string", enum: ["user", "ipport"] },
            },
            { name: "previewFor", in: "query", schema: str },
          ],
          requestBody: json({ type: "object" }),
          responses: ok(object({ matches: strings })),
        },
      },
      "/tailnet/{tailnet}/acl/validate": {
        parameters: [tailnet],
        post: {
          requestBody: json({ type: "object" }),
          responses: ok(object({ message: str })),
        },
      },
      "/tailnet/{tailnet}/devices": {
        parameters: [tailnet],
        get: {
          responses: ok(object({ devices: { type: "array", items: device } })),
        },
      },
      "/device/{deviceId}": {
        parameters: [pathParam("deviceId")],
        get: {
          parameters: [{ name: "fields", in: "query", schema: str }],
          responses: ok(device),
        },
        delete: { responses: { "200": {} } },
      },
      "/device/{deviceId}/expire": {
        parameters: [pathParam("deviceId")],
        post: { responses: { "200": {} } },
      },
      "/device/{deviceId}/name": {
        parameters: [pathParam("deviceId")],
        post: {
          requestBody: json(object({ name: str }, ["name"])),
          responses: { "200": {} },
        },
      },
      "/device/{deviceId}/ip": {
        parameters: [pathParam("deviceId")],
        post: {
          requestBody: json(object({ ipv4: str }, ["ipv4"])),
          responses: { "200": {} },
        },
      },
      "/device/{deviceId}/tags": {
        parameters: [pathParam("deviceId")],
        post: {
          requestBody: json(object({ tags: strings })),
          responses: { "200": {} },
        },
      },
      "/device/{deviceId}/routes": {
        parameters: [pathParam("deviceId")],
        get: {
          responses: ok(
            object({ advertisedRoutes: strings, enabledRoutes: strings }),
          ),
        },
        post: {
          requestBody: json(object({ routes: strings })),
          responses: ok(
            object({ advertisedRoutes: strings, enabledRoutes: strings }),
          ),
        },
      },
      "/tailnet/{tailnet}/oauth-apps": {
        parameters: [tailnet],
        get: {
          responses: ok(
            object({ oauthApps: { type: "array", items: oauthApp } }),
          ),
        },
        post: { requestBody: json(oauthAppBody), responses: ok(oauthApp) },
      },
      "/tailnet/{tailnet}/oauth-apps/{appId}": {
        parameters: [tailnet, pathParam("appId")],
        get: { responses: ok(oauthApp) },
        put: { requestBody: json(oauthAppBody), responses: ok(oauthApp) },
        delete: { responses: { "200": {} } },
      },
    },
  } as unknown as OApiSpec;
}

/** Resource table entries the fixture spec covers. */
export const FIXTURE_MODELS = [
  "webhook",
  "tailnet_key",
  "service",
  "tailnet_settings",
  "dns_nameservers",
  "dns_split_nameservers",
  "policy_file",
  "device",
  "device_tags",
  "oauth_app",
  "device_subnet_routes",
];

/** Looks up resource table entries by model name. */
export function entries(names: string[] = FIXTURE_MODELS): ResourceEntry[] {
  return names.map((name) => {
    const entry = RESOURCES.find((e) => e.model === name);
    if (!entry) throw new Error(`no resource table entry "${name}"`);
    return entry;
  });
}
