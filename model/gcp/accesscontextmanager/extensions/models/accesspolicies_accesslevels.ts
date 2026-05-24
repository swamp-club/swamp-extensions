// Auto-generated extension model for @swamp/gcp/accesscontextmanager/accesspolicies-accesslevels
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Access Context Manager AccessPolicies.AccessLevels.
 *
 * An `AccessLevel` is a label that can be applied to requests to Google Cloud services, along with a list of requirements necessary for the label to be applied.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/accessLevels/${shortName}`;
}

const BASE_URL = "https://accesscontextmanager.googleapis.com/";

const GET_CONFIG = {
  "id": "accesscontextmanager.accessPolicies.accessLevels.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "accessLevelFormat": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "accesscontextmanager.accessPolicies.accessLevels.create",
  "path": "v1/{+parent}/accessLevels",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "accesscontextmanager.accessPolicies.accessLevels.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "accesscontextmanager.accessPolicies.accessLevels.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "accesscontextmanager.accessPolicies.accessLevels.list",
  "path": "v1/{+parent}/accessLevels",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "accessLevelFormat": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  basic: z.object({
    combiningFunction: z.enum(["AND", "OR"]).describe(
      "How the `conditions` list should be combined to determine if a request is granted this `AccessLevel`. If AND is used, each `Condition` in `conditions` must be satisfied for the `AccessLevel` to be applied. If OR is used, at least one `Condition` in `conditions` must be satisfied for the `AccessLevel` to be applied. Default behavior is AND.",
    ).optional(),
    conditions: z.array(z.object({
      devicePolicy: z.object({
        allowedDeviceManagementLevels: z.array(z.unknown()).describe(
          "Allowed device management levels, an empty list allows all management levels.",
        ).optional(),
        allowedEncryptionStatuses: z.array(z.unknown()).describe(
          "Allowed encryptions statuses, an empty list allows all statuses.",
        ).optional(),
        osConstraints: z.array(z.unknown()).describe(
          "Allowed OS versions, an empty list allows all types and all versions.",
        ).optional(),
        requireAdminApproval: z.boolean().describe(
          "Whether the device needs to be approved by the customer admin.",
        ).optional(),
        requireCorpOwned: z.boolean().describe(
          "Whether the device needs to be corp owned.",
        ).optional(),
        requireScreenlock: z.boolean().describe(
          "Whether or not screenlock is required for the DevicePolicy to be true. Defaults to `false`.",
        ).optional(),
      }).describe(
        "`DevicePolicy` specifies device specific restrictions necessary to acquire a given access level. A `DevicePolicy` specifies requirements for requests from devices to be granted access levels, it does not do any enforcement on the device. `DevicePolicy` acts as an AND over all specified fields, and each repeated field is an OR over its elements. Any unset fields are ignored. For example, if the proto is { os_type: DESKTOP_WINDOWS, os_type: DESKTOP_LINUX, encryption_status: ENCRYPTED}, then the DevicePolicy will be true for requests originating from encrypted Linux desktops and encrypted Windows desktops.",
      ).optional(),
      ipSubnetworks: z.array(z.string()).describe(
        'CIDR block IP subnetwork specification. May be IPv4 or IPv6. Note that for a CIDR IP address block, the specified IP address portion must be properly truncated (i.e. all the host bits must be zero) or the input is considered malformed. For example, "192.0.2.0/24" is accepted but "192.0.2.1/24" is not. Similarly, for IPv6, "2001:db8::/32" is accepted whereas "2001:db8::1/32" is not. The originating IP of a request must be in one of the listed subnets in order for this Condition to be true. If empty, all IP addresses are allowed.',
      ).optional(),
      members: z.array(z.string()).describe(
        "The request must be made by one of the provided user or service accounts. Groups are not supported. Syntax: `user:{emailid}` `serviceAccount:{emailid}` If not specified, a request may come from any user.",
      ).optional(),
      negate: z.boolean().describe(
        "Whether to negate the Condition. If true, the Condition becomes a NAND over its non-empty fields. Any non-empty field criteria evaluating to false will result in the Condition to be satisfied. Defaults to false.",
      ).optional(),
      regions: z.array(z.string()).describe(
        "The request must originate from one of the provided countries/regions. Must be valid ISO 3166-1 alpha-2 codes.",
      ).optional(),
      requiredAccessLevels: z.array(z.string()).describe(
        'A list of other access levels defined in the same `Policy`, referenced by resource name. Referencing an `AccessLevel` which does not exist is an error. All access levels listed must be granted for the Condition to be true. Example: "`accessPolicies/MY_POLICY/accessLevels/LEVEL_NAME"`',
      ).optional(),
      vpcNetworkSources: z.array(z.object({
        vpcSubnetwork: z.unknown().describe(
          "Sub-segment ranges inside of a VPC Network.",
        ).optional(),
      })).describe(
        "The request must originate from one of the provided VPC networks in Google Cloud. Cannot specify this field together with `ip_subnetworks`.",
      ).optional(),
    })).describe(
      "Required. A list of requirements for the `AccessLevel` to be granted.",
    ).optional(),
  }).describe(
    "`BasicLevel` is an `AccessLevel` using a set of recommended features.",
  ).optional(),
  custom: z.object({
    expr: z.object({
      description: z.string().describe(
        "Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.",
      ).optional(),
      expression: z.string().describe(
        "Textual representation of an expression in Common Expression Language syntax.",
      ).optional(),
      location: z.string().describe(
        "Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file.",
      ).optional(),
      title: z.string().describe(
        "Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.",
      ).optional(),
    }).describe(
      'Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type!= \'private\' && document.type!= \'internal\'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "\'New message received at \' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.',
    ).optional(),
  }).describe(
    "`CustomLevel` is an `AccessLevel` using the Cloud Common Expression Language to represent the necessary conditions for the level to apply to a request. See CEL spec at: https://github.com/google/cel-spec",
  ).optional(),
  description: z.string().describe(
    "Description of the `AccessLevel` and its use. Does not affect behavior.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name for the `AccessLevel`. Format: `accessPolicies/{access_policy}/accessLevels/{access_level}`. The `access_level` component must begin with a letter, followed by alphanumeric characters or `_`. Its maximum length is 50 characters. After you create an `AccessLevel`, you cannot change its `name`.",
  ).optional(),
  title: z.string().describe(
    "Human readable title. Must be unique within the Policy.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  basic: z.object({
    combiningFunction: z.string(),
    conditions: z.array(z.object({
      devicePolicy: z.object({
        allowedDeviceManagementLevels: z.array(z.unknown()),
        allowedEncryptionStatuses: z.array(z.unknown()),
        osConstraints: z.array(z.unknown()),
        requireAdminApproval: z.boolean(),
        requireCorpOwned: z.boolean(),
        requireScreenlock: z.boolean(),
      }),
      ipSubnetworks: z.array(z.string()),
      members: z.array(z.string()),
      negate: z.boolean(),
      regions: z.array(z.string()),
      requiredAccessLevels: z.array(z.string()),
      vpcNetworkSources: z.array(z.object({
        vpcSubnetwork: z.unknown(),
      })),
    })),
  }).optional(),
  custom: z.object({
    expr: z.object({
      description: z.string(),
      expression: z.string(),
      location: z.string(),
      title: z.string(),
    }),
  }).optional(),
  description: z.string().optional(),
  name: z.string(),
  title: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  basic: z.object({
    combiningFunction: z.enum(["AND", "OR"]).describe(
      "How the `conditions` list should be combined to determine if a request is granted this `AccessLevel`. If AND is used, each `Condition` in `conditions` must be satisfied for the `AccessLevel` to be applied. If OR is used, at least one `Condition` in `conditions` must be satisfied for the `AccessLevel` to be applied. Default behavior is AND.",
    ).optional(),
    conditions: z.array(z.object({
      devicePolicy: z.object({
        allowedDeviceManagementLevels: z.array(z.unknown()).describe(
          "Allowed device management levels, an empty list allows all management levels.",
        ).optional(),
        allowedEncryptionStatuses: z.array(z.unknown()).describe(
          "Allowed encryptions statuses, an empty list allows all statuses.",
        ).optional(),
        osConstraints: z.array(z.unknown()).describe(
          "Allowed OS versions, an empty list allows all types and all versions.",
        ).optional(),
        requireAdminApproval: z.boolean().describe(
          "Whether the device needs to be approved by the customer admin.",
        ).optional(),
        requireCorpOwned: z.boolean().describe(
          "Whether the device needs to be corp owned.",
        ).optional(),
        requireScreenlock: z.boolean().describe(
          "Whether or not screenlock is required for the DevicePolicy to be true. Defaults to `false`.",
        ).optional(),
      }).describe(
        "`DevicePolicy` specifies device specific restrictions necessary to acquire a given access level. A `DevicePolicy` specifies requirements for requests from devices to be granted access levels, it does not do any enforcement on the device. `DevicePolicy` acts as an AND over all specified fields, and each repeated field is an OR over its elements. Any unset fields are ignored. For example, if the proto is { os_type: DESKTOP_WINDOWS, os_type: DESKTOP_LINUX, encryption_status: ENCRYPTED}, then the DevicePolicy will be true for requests originating from encrypted Linux desktops and encrypted Windows desktops.",
      ).optional(),
      ipSubnetworks: z.array(z.string()).describe(
        'CIDR block IP subnetwork specification. May be IPv4 or IPv6. Note that for a CIDR IP address block, the specified IP address portion must be properly truncated (i.e. all the host bits must be zero) or the input is considered malformed. For example, "192.0.2.0/24" is accepted but "192.0.2.1/24" is not. Similarly, for IPv6, "2001:db8::/32" is accepted whereas "2001:db8::1/32" is not. The originating IP of a request must be in one of the listed subnets in order for this Condition to be true. If empty, all IP addresses are allowed.',
      ).optional(),
      members: z.array(z.string()).describe(
        "The request must be made by one of the provided user or service accounts. Groups are not supported. Syntax: `user:{emailid}` `serviceAccount:{emailid}` If not specified, a request may come from any user.",
      ).optional(),
      negate: z.boolean().describe(
        "Whether to negate the Condition. If true, the Condition becomes a NAND over its non-empty fields. Any non-empty field criteria evaluating to false will result in the Condition to be satisfied. Defaults to false.",
      ).optional(),
      regions: z.array(z.string()).describe(
        "The request must originate from one of the provided countries/regions. Must be valid ISO 3166-1 alpha-2 codes.",
      ).optional(),
      requiredAccessLevels: z.array(z.string()).describe(
        'A list of other access levels defined in the same `Policy`, referenced by resource name. Referencing an `AccessLevel` which does not exist is an error. All access levels listed must be granted for the Condition to be true. Example: "`accessPolicies/MY_POLICY/accessLevels/LEVEL_NAME"`',
      ).optional(),
      vpcNetworkSources: z.array(z.object({
        vpcSubnetwork: z.unknown().describe(
          "Sub-segment ranges inside of a VPC Network.",
        ).optional(),
      })).describe(
        "The request must originate from one of the provided VPC networks in Google Cloud. Cannot specify this field together with `ip_subnetworks`.",
      ).optional(),
    })).describe(
      "Required. A list of requirements for the `AccessLevel` to be granted.",
    ).optional(),
  }).describe(
    "`BasicLevel` is an `AccessLevel` using a set of recommended features.",
  ).optional(),
  custom: z.object({
    expr: z.object({
      description: z.string().describe(
        "Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.",
      ).optional(),
      expression: z.string().describe(
        "Textual representation of an expression in Common Expression Language syntax.",
      ).optional(),
      location: z.string().describe(
        "Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file.",
      ).optional(),
      title: z.string().describe(
        "Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.",
      ).optional(),
    }).describe(
      'Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type!= \'private\' && document.type!= \'internal\'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "\'New message received at \' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.',
    ).optional(),
  }).describe(
    "`CustomLevel` is an `AccessLevel` using the Cloud Common Expression Language to represent the necessary conditions for the level to apply to a request. See CEL spec at: https://github.com/google/cel-spec",
  ).optional(),
  description: z.string().describe(
    "Description of the `AccessLevel` and its use. Does not affect behavior.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name for the `AccessLevel`. Format: `accessPolicies/{access_policy}/accessLevels/{access_level}`. The `access_level` component must begin with a letter, followed by alphanumeric characters or `_`. Its maximum length is 50 characters. After you create an `AccessLevel`, you cannot change its `name`.",
  ).optional(),
  title: z.string().describe(
    "Human readable title. Must be unique within the Policy.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Access Context Manager AccessPolicies.AccessLevels. Registered at `@swamp/gcp/accesscontextmanager/accesspolicies-accesslevels`. */
export const model = {
  type: "@swamp/gcp/accesscontextmanager/accesspolicies-accesslevels",
  version: "2026.05.24.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An `AccessLevel` is a label that can be applied to requests to Google Cloud s...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a accessLevels",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["basic"] !== undefined) body["basic"] = g["basic"];
        if (g["custom"] !== undefined) body["custom"] = g["custom"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["title"] !== undefined) body["title"] = g["title"];
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
        ) as StateData;
        const instanceName = ((result.name ?? g.name)?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a accessLevels",
      arguments: z.object({
        identifier: z.string().describe("The name of the accessLevels"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName =
          ((result.name ?? g.name)?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update accessLevels attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["basic"] !== undefined) body["basic"] = g["basic"];
        if (g["custom"] !== undefined) body["custom"] = g["custom"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["title"] !== undefined) body["title"] = g["title"];
        for (const key of Object.keys(existing)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = existing[key];
          }
        }
        const result = await updateResource(
          BASE_URL,
          PATCH_CONFIG,
          params,
          body,
          GET_CONFIG,
        ) as StateData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the accessLevels",
      arguments: z.object({
        identifier: z.string().describe("The name of the accessLevels"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
        );
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource("state", instanceName, {
          identifier: args.identifier,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync accessLevels state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            String(g["parent"] ?? ""),
            shortName,
          );
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
          ) as StateData;
          const handle = await context.writeResource(
            "state",
            instanceName,
            result,
          );
          return { dataHandles: [handle] };
        } catch (error: unknown) {
          if (isResourceNotFoundError(error)) {
            const handle = await context.writeResource("state", instanceName, {
              status: "not_found",
              syncedAt: new Date().toISOString(),
            });
            return { dataHandles: [handle] };
          }
          throw error;
        }
      },
    },
    replace_all: {
      description: "replace all",
      arguments: z.object({
        accessLevels: z.any().optional(),
        etag: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["accessLevels"] !== undefined) {
          body["accessLevels"] = args["accessLevels"];
        }
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "accesscontextmanager.accessPolicies.accessLevels.replaceAll",
            "path": "v1/{+parent}/accessLevels:replaceAll",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    test_iam_permissions: {
      description: "test iam permissions",
      arguments: z.object({
        permissions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["permissions"] !== undefined) {
          body["permissions"] = args["permissions"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "accesscontextmanager.accessPolicies.accessLevels.testIamPermissions",
            "path": "v1/{+resource}:testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
