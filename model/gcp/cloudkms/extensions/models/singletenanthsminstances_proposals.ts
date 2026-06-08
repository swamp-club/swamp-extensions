// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
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

// Auto-generated extension model for @swamp/gcp/cloudkms/singletenanthsminstances-proposals
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Key Management Service (KMS) SingleTenantHsmInstances.Proposals.
 *
 * A SingleTenantHsmInstanceProposal represents a proposal to perform an operation on a SingleTenantHsmInstance.
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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/proposals/${shortName}`;
}

const BASE_URL = "https://cloudkms.googleapis.com/";

const GET_CONFIG = {
  "id": "cloudkms.projects.locations.singleTenantHsmInstances.proposals.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
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

const INSERT_CONFIG = {
  "id": "cloudkms.projects.locations.singleTenantHsmInstances.proposals.create",
  "path": "v1/{+parent}/proposals",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "singleTenantHsmInstanceProposalId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "cloudkms.projects.locations.singleTenantHsmInstances.proposals.delete",
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
  "id": "cloudkms.projects.locations.singleTenantHsmInstances.proposals.list",
  "path": "v1/{+parent}/proposals",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "orderBy": {
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
    "showDeleted": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  addQuorumMember: z.object({
    twoFactorPublicKeyPem: z.string().describe(
      "Required. The public key associated with the 2FA key for the new quorum member to add. Public keys must be associated with RSA 2048 keys.",
    ).optional(),
  }).describe(
    "Add a quorum member to the SingleTenantHsmInstance. This will increase the total_approver_count by 1. The SingleTenantHsmInstance must be in the ACTIVE state to perform this operation.",
  ).optional(),
  deleteSingleTenantHsmInstance: z.object({}).describe(
    "Delete the SingleTenantHsmInstance. Deleting a SingleTenantHsmInstance will make all CryptoKeys attached to the SingleTenantHsmInstance unusable. The SingleTenantHsmInstance must not be in the DELETING or DELETED state to perform this operation.",
  ).optional(),
  disableSingleTenantHsmInstance: z.object({}).describe(
    "Disable the SingleTenantHsmInstance. The SingleTenantHsmInstance must be in the ACTIVE state to perform this operation.",
  ).optional(),
  enableSingleTenantHsmInstance: z.object({}).describe(
    "Enable the SingleTenantHsmInstance. The SingleTenantHsmInstance must be in the DISABLED state to perform this operation.",
  ).optional(),
  expireTime: z.string().describe(
    "The time at which the SingleTenantHsmInstanceProposal will expire if not approved and executed.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name for this SingleTenantHsmInstance in the format `projects/*/locations/*/singleTenantHsmInstances/*/proposals/*`.",
  ).optional(),
  quorumParameters: z.object({
    approvedTwoFactorPublicKeyPems: z.array(z.string()).describe(
      "Output only. The public keys associated with the 2FA keys that have already approved the SingleTenantHsmInstanceProposal by signing the challenge.",
    ).optional(),
    challenges: z.array(z.object({
      challenge: z.string().describe(
        "Output only. The challenge to be signed by the 2FA key indicated by the public key.",
      ).optional(),
      publicKeyPem: z.string().describe(
        "Output only. The public key associated with the 2FA key that should sign the challenge.",
      ).optional(),
    })).describe(
      "Output only. The challenges to be signed by 2FA keys for quorum auth. M of N of these challenges are required to be signed to approve the operation.",
    ).optional(),
    requiredApproverCount: z.number().int().describe(
      "Output only. The required numbers of approvers. This is the M value used for M of N quorum auth. It is less than the number of public keys.",
    ).optional(),
  }).describe(
    "Parameters of quorum approval for the SingleTenantHsmInstanceProposal.",
  ).optional(),
  refreshSingleTenantHsmInstance: z.object({}).describe(
    "Refreshes the SingleTenantHsmInstance. This operation must be performed periodically to keep the SingleTenantHsmInstance active. This operation must be performed before unrefreshed_duration_until_disable has passed. The SingleTenantHsmInstance must be in the ACTIVE state to perform this operation.",
  ).optional(),
  registerTwoFactorAuthKeys: z.object({
    requiredApproverCount: z.number().int().describe(
      "Required. The required numbers of approvers to set for the SingleTenantHsmInstance. This is the M value used for M of N quorum auth. Must be greater than or equal to 2 and less than or equal to total_approver_count - 1.",
    ).optional(),
    twoFactorPublicKeyPems: z.array(z.string()).describe(
      "Required. The public keys associated with the 2FA keys for M of N quorum auth. Public keys must be associated with RSA 2048 keys.",
    ).optional(),
  }).describe(
    "Register 2FA keys for the SingleTenantHsmInstance. This operation requires all Challenges to be signed by 2FA keys. The SingleTenantHsmInstance must be in the PENDING_TWO_FACTOR_AUTH_REGISTRATION state to perform this operation.",
  ).optional(),
  removeQuorumMember: z.object({
    twoFactorPublicKeyPem: z.string().describe(
      "Required. The public key associated with the 2FA key for the quorum member to remove. Public keys must be associated with RSA 2048 keys.",
    ).optional(),
  }).describe(
    "Remove a quorum member from the SingleTenantHsmInstance. This will reduce total_approver_count by 1. The SingleTenantHsmInstance must be in the ACTIVE state to perform this operation.",
  ).optional(),
  requiredActionQuorumParameters: z.object({
    approvedTwoFactorPublicKeyPems: z.array(z.string()).describe(
      "Output only. The public keys associated with the 2FA keys that have already approved the SingleTenantHsmInstanceProposal by signing the challenge.",
    ).optional(),
    quorumChallenges: z.array(z.object({
      challenge: z.string().describe(
        "Output only. The challenge to be signed by the 2FA key indicated by the public key.",
      ).optional(),
      publicKeyPem: z.string().describe(
        "Output only. The public key associated with the 2FA key that should sign the challenge.",
      ).optional(),
    })).describe(
      "Output only. The challenges to be signed by 2FA keys for quorum auth. M of N of these challenges are required to be signed to approve the operation.",
    ).optional(),
    requiredApproverCount: z.number().int().describe(
      "Output only. The required number of quorum approvers. This is the M value used for M of N quorum auth. It is less than the number of public keys.",
    ).optional(),
    requiredChallenges: z.array(z.object({
      challenge: z.string().describe(
        "Output only. The challenge to be signed by the 2FA key indicated by the public key.",
      ).optional(),
      publicKeyPem: z.string().describe(
        "Output only. The public key associated with the 2FA key that should sign the challenge.",
      ).optional(),
    })).describe(
      "Output only. A list of specific challenges that must be signed. For some operations, this will contain a single challenge.",
    ).optional(),
  }).describe(
    "Parameters for an approval that has both required challenges and a quorum.",
  ).optional(),
  ttl: z.string().describe(
    "Input only. The TTL for the SingleTenantHsmInstanceProposal. Proposals will expire after this duration.",
  ).optional(),
  singleTenantHsmInstanceProposalId: z.string().describe(
    "Optional. It must be unique within a location and match the regular expression `[a-zA-Z0-9_-]{1,63}`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  addQuorumMember: z.object({
    twoFactorPublicKeyPem: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  deleteSingleTenantHsmInstance: z.object({}).optional(),
  deleteTime: z.string().optional(),
  disableSingleTenantHsmInstance: z.object({}).optional(),
  enableSingleTenantHsmInstance: z.object({}).optional(),
  expireTime: z.string().optional(),
  failureReason: z.string().optional(),
  name: z.string(),
  purgeTime: z.string().optional(),
  quorumParameters: z.object({
    approvedTwoFactorPublicKeyPems: z.array(z.string()),
    challenges: z.array(z.object({
      challenge: z.string(),
      publicKeyPem: z.string(),
    })),
    requiredApproverCount: z.number(),
  }).optional(),
  refreshSingleTenantHsmInstance: z.object({}).optional(),
  registerTwoFactorAuthKeys: z.object({
    requiredApproverCount: z.number(),
    twoFactorPublicKeyPems: z.array(z.string()),
  }).optional(),
  removeQuorumMember: z.object({
    twoFactorPublicKeyPem: z.string(),
  }).optional(),
  requiredActionQuorumParameters: z.object({
    approvedTwoFactorPublicKeyPems: z.array(z.string()),
    quorumChallenges: z.array(z.object({
      challenge: z.string(),
      publicKeyPem: z.string(),
    })),
    requiredApproverCount: z.number(),
    requiredChallenges: z.array(z.object({
      challenge: z.string(),
      publicKeyPem: z.string(),
    })),
  }).optional(),
  state: z.string().optional(),
  ttl: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  addQuorumMember: z.object({
    twoFactorPublicKeyPem: z.string().describe(
      "Required. The public key associated with the 2FA key for the new quorum member to add. Public keys must be associated with RSA 2048 keys.",
    ).optional(),
  }).describe(
    "Add a quorum member to the SingleTenantHsmInstance. This will increase the total_approver_count by 1. The SingleTenantHsmInstance must be in the ACTIVE state to perform this operation.",
  ).optional(),
  deleteSingleTenantHsmInstance: z.object({}).describe(
    "Delete the SingleTenantHsmInstance. Deleting a SingleTenantHsmInstance will make all CryptoKeys attached to the SingleTenantHsmInstance unusable. The SingleTenantHsmInstance must not be in the DELETING or DELETED state to perform this operation.",
  ).optional(),
  disableSingleTenantHsmInstance: z.object({}).describe(
    "Disable the SingleTenantHsmInstance. The SingleTenantHsmInstance must be in the ACTIVE state to perform this operation.",
  ).optional(),
  enableSingleTenantHsmInstance: z.object({}).describe(
    "Enable the SingleTenantHsmInstance. The SingleTenantHsmInstance must be in the DISABLED state to perform this operation.",
  ).optional(),
  expireTime: z.string().describe(
    "The time at which the SingleTenantHsmInstanceProposal will expire if not approved and executed.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name for this SingleTenantHsmInstance in the format `projects/*/locations/*/singleTenantHsmInstances/*/proposals/*`.",
  ).optional(),
  quorumParameters: z.object({
    approvedTwoFactorPublicKeyPems: z.array(z.string()).describe(
      "Output only. The public keys associated with the 2FA keys that have already approved the SingleTenantHsmInstanceProposal by signing the challenge.",
    ).optional(),
    challenges: z.array(z.object({
      challenge: z.string().describe(
        "Output only. The challenge to be signed by the 2FA key indicated by the public key.",
      ).optional(),
      publicKeyPem: z.string().describe(
        "Output only. The public key associated with the 2FA key that should sign the challenge.",
      ).optional(),
    })).describe(
      "Output only. The challenges to be signed by 2FA keys for quorum auth. M of N of these challenges are required to be signed to approve the operation.",
    ).optional(),
    requiredApproverCount: z.number().int().describe(
      "Output only. The required numbers of approvers. This is the M value used for M of N quorum auth. It is less than the number of public keys.",
    ).optional(),
  }).describe(
    "Parameters of quorum approval for the SingleTenantHsmInstanceProposal.",
  ).optional(),
  refreshSingleTenantHsmInstance: z.object({}).describe(
    "Refreshes the SingleTenantHsmInstance. This operation must be performed periodically to keep the SingleTenantHsmInstance active. This operation must be performed before unrefreshed_duration_until_disable has passed. The SingleTenantHsmInstance must be in the ACTIVE state to perform this operation.",
  ).optional(),
  registerTwoFactorAuthKeys: z.object({
    requiredApproverCount: z.number().int().describe(
      "Required. The required numbers of approvers to set for the SingleTenantHsmInstance. This is the M value used for M of N quorum auth. Must be greater than or equal to 2 and less than or equal to total_approver_count - 1.",
    ).optional(),
    twoFactorPublicKeyPems: z.array(z.string()).describe(
      "Required. The public keys associated with the 2FA keys for M of N quorum auth. Public keys must be associated with RSA 2048 keys.",
    ).optional(),
  }).describe(
    "Register 2FA keys for the SingleTenantHsmInstance. This operation requires all Challenges to be signed by 2FA keys. The SingleTenantHsmInstance must be in the PENDING_TWO_FACTOR_AUTH_REGISTRATION state to perform this operation.",
  ).optional(),
  removeQuorumMember: z.object({
    twoFactorPublicKeyPem: z.string().describe(
      "Required. The public key associated with the 2FA key for the quorum member to remove. Public keys must be associated with RSA 2048 keys.",
    ).optional(),
  }).describe(
    "Remove a quorum member from the SingleTenantHsmInstance. This will reduce total_approver_count by 1. The SingleTenantHsmInstance must be in the ACTIVE state to perform this operation.",
  ).optional(),
  requiredActionQuorumParameters: z.object({
    approvedTwoFactorPublicKeyPems: z.array(z.string()).describe(
      "Output only. The public keys associated with the 2FA keys that have already approved the SingleTenantHsmInstanceProposal by signing the challenge.",
    ).optional(),
    quorumChallenges: z.array(z.object({
      challenge: z.string().describe(
        "Output only. The challenge to be signed by the 2FA key indicated by the public key.",
      ).optional(),
      publicKeyPem: z.string().describe(
        "Output only. The public key associated with the 2FA key that should sign the challenge.",
      ).optional(),
    })).describe(
      "Output only. The challenges to be signed by 2FA keys for quorum auth. M of N of these challenges are required to be signed to approve the operation.",
    ).optional(),
    requiredApproverCount: z.number().int().describe(
      "Output only. The required number of quorum approvers. This is the M value used for M of N quorum auth. It is less than the number of public keys.",
    ).optional(),
    requiredChallenges: z.array(z.object({
      challenge: z.string().describe(
        "Output only. The challenge to be signed by the 2FA key indicated by the public key.",
      ).optional(),
      publicKeyPem: z.string().describe(
        "Output only. The public key associated with the 2FA key that should sign the challenge.",
      ).optional(),
    })).describe(
      "Output only. A list of specific challenges that must be signed. For some operations, this will contain a single challenge.",
    ).optional(),
  }).describe(
    "Parameters for an approval that has both required challenges and a quorum.",
  ).optional(),
  ttl: z.string().describe(
    "Input only. The TTL for the SingleTenantHsmInstanceProposal. Proposals will expire after this duration.",
  ).optional(),
  singleTenantHsmInstanceProposalId: z.string().describe(
    "Optional. It must be unique within a location and match the regular expression `[a-zA-Z0-9_-]{1,63}`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Key Management Service (KMS) SingleTenantHsmInstances.Proposals. Registered at `@swamp/gcp/cloudkms/singletenanthsminstances-proposals`. */
export const model = {
  type: "@swamp/gcp/cloudkms/singletenanthsminstances-proposals",
  version: "2026.06.08.1",
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
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
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
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A SingleTenantHsmInstanceProposal represents a proposal to perform an operati...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a proposals",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["addQuorumMember"] !== undefined) {
          body["addQuorumMember"] = g["addQuorumMember"];
        }
        if (g["deleteSingleTenantHsmInstance"] !== undefined) {
          body["deleteSingleTenantHsmInstance"] =
            g["deleteSingleTenantHsmInstance"];
        }
        if (g["disableSingleTenantHsmInstance"] !== undefined) {
          body["disableSingleTenantHsmInstance"] =
            g["disableSingleTenantHsmInstance"];
        }
        if (g["enableSingleTenantHsmInstance"] !== undefined) {
          body["enableSingleTenantHsmInstance"] =
            g["enableSingleTenantHsmInstance"];
        }
        if (g["expireTime"] !== undefined) body["expireTime"] = g["expireTime"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["quorumParameters"] !== undefined) {
          body["quorumParameters"] = g["quorumParameters"];
        }
        if (g["refreshSingleTenantHsmInstance"] !== undefined) {
          body["refreshSingleTenantHsmInstance"] =
            g["refreshSingleTenantHsmInstance"];
        }
        if (g["registerTwoFactorAuthKeys"] !== undefined) {
          body["registerTwoFactorAuthKeys"] = g["registerTwoFactorAuthKeys"];
        }
        if (g["removeQuorumMember"] !== undefined) {
          body["removeQuorumMember"] = g["removeQuorumMember"];
        }
        if (g["requiredActionQuorumParameters"] !== undefined) {
          body["requiredActionQuorumParameters"] =
            g["requiredActionQuorumParameters"];
        }
        if (g["ttl"] !== undefined) body["ttl"] = g["ttl"];
        if (g["singleTenantHsmInstanceProposalId"] !== undefined) {
          body["singleTenantHsmInstanceProposalId"] =
            g["singleTenantHsmInstanceProposalId"];
        }
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["RUNNING", "SUCCEEDED"],
              "failedValues": ["FAILED"],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
          credentials,
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
      description: "Get a proposals",
      arguments: z.object({
        identifier: z.string().describe("The name of the proposals"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
    delete: {
      description: "Delete the proposals",
      arguments: z.object({
        identifier: z.string().describe("The name of the proposals"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
          credentials,
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
      description: "Sync proposals state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            shortName,
          );
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
            credentials,
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
    list: {
      description: "List proposals resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Only include resources that match the filter in the response. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering).",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. Specify how the results should be sorted. If not specified, the results will be sorted in the default order. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering).",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Optional limit on the number of SingleTenantHsmInstanceProposals to include in the response. Further SingleTenantHsmInstanceProposals can subsequently be obtained by including the ListSingleTenantHsmInstanceProposalsResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default.",
        ).optional(),
        showDeleted: z.boolean().describe(
          "Optional. If set to true, HsmManagement.ListSingleTenantHsmInstanceProposals will also return SingleTenantHsmInstanceProposals in DELETED state.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["showDeleted"] !== undefined) {
          params["showDeleted"] = String(args["showDeleted"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "singleTenantHsmInstanceProposals",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.name?.toString() ?? String(i)).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource(
            "state",
            instanceName,
            item,
          );
          dataHandles.push(handle);
        }
        return { dataHandles, result: { count: items.length, nextPageToken } };
      },
    },
    approve: {
      description: "approve",
      arguments: z.object({
        quorumReply: z.any().optional(),
        requiredActionQuorumReply: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["quorumReply"] !== undefined) {
          body["quorumReply"] = args["quorumReply"];
        }
        if (args["requiredActionQuorumReply"] !== undefined) {
          body["requiredActionQuorumReply"] = args["requiredActionQuorumReply"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "cloudkms.projects.locations.singleTenantHsmInstances.proposals.approve",
            "path": "v1/{+name}:approve",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    execute: {
      description: "execute",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "cloudkms.projects.locations.singleTenantHsmInstances.proposals.execute",
            "path": "v1/{+name}:execute",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
