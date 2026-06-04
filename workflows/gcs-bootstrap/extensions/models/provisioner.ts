/**
 * Provisioner model for @swamp/gcs-datastore-bootstrap.
 *
 * Creates (or verifies) a private GCS bucket with hardened defaults and a
 * project-scoped custom IAM role, then records the resulting identifiers so
 * the bootstrap workflow can hand them to
 * `swamp datastore setup extension @swamp/gcs-datastore`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createGcpClient,
  ensureBucket,
  ensureCustomRole,
  GlobalArgsSchema,
  hardenBucket,
  type ProvisionerContext,
  resolveRoleId,
  type StateData,
  StateSchema,
} from "./_lib/provisioner_impl.ts";

/**
 * Swamp extension model export. Declares the provisioner type, its argument
 * schema, and the `provision` method invoked by the bootstrap workflow.
 */
export const model = {
  type: "@swamp/gcs-datastore-bootstrap/provisioner",
  version: "2026.06.04.1",
  globalArguments: GlobalArgsSchema,
  upgrades: [
    {
      toVersion: "2026.06.04.1",
      description: "Copyright and branding update to Elder Swamp Club, Inc. " +
        "No code, schema, or behavior change.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  resources: {
    state: {
      description:
        "GCS bucket + project-scoped custom IAM role provisioned for swamp.",
      schema: StateSchema,
      lifetime: "infinite" as const,
      garbageCollection: 10,
    },
  },
  methods: {
    provision: {
      description:
        "Create/verify the GCS bucket and the scoped custom IAM role for @swamp/gcs-datastore.",
      arguments: z.object({}),
      execute: async (
        _args: Record<string, never>,
        context: ProvisionerContext,
      ) => {
        const g = context.globalArgs;
        const roleId = resolveRoleId(g.bucket_name, g.role_id);
        const client = createGcpClient();

        await ensureBucket(
          client,
          g.project_id,
          g.bucket_name,
          g.location,
          context.logger,
        );
        // hardenBucket's PATCH is declarative — safe to re-run on every
        // invocation. The hardening fields are also set inline in the
        // insert call above, but re-applying defends against a partial
        // failure path where the insert succeeded but a follow-up
        // configuration change drifted the bucket out of policy.
        await hardenBucket(client, g.bucket_name);

        const roleName = await ensureCustomRole(
          client,
          g.project_id,
          roleId,
          g.bucket_name,
          context.logger,
        );

        const state: StateData = {
          bucket_name: g.bucket_name,
          project_id: g.project_id,
          location: g.location,
          prefix: g.prefix ?? "",
          role_id: roleId,
          role_name: roleName,
          created_at: new Date().toISOString(),
        };
        const handle = await context.writeResource(
          "state",
          g.bucket_name,
          state,
        );
        return { dataHandles: [handle] };
      },
    },
  },
};
