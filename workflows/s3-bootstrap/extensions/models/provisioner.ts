/**
 * Provisioner model for @swamp/s3-datastore-bootstrap.
 *
 * Creates (or verifies) a private S3 bucket with hardened defaults and a
 * least-privilege IAM managed policy scoped to that bucket, then records the
 * resulting ARNs so the bootstrap workflow can hand them to
 * `swamp datastore setup extension @swamp/s3-datastore`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { IAMClient } from "npm:@aws-sdk/client-iam@3.1024.0";
import { S3Client } from "npm:@aws-sdk/client-s3@3.1024.0";
import { STSClient } from "npm:@aws-sdk/client-sts@3.1024.0";
import {
  ensureBucket,
  ensurePolicy,
  getAccountId,
  GlobalArgsSchema,
  hardenBucket,
  type ProvisionerContext,
  resolvePolicyName,
  type StateData,
  StateSchema,
} from "./_lib/provisioner_impl.ts";

/**
 * Swamp extension model export. Declares the provisioner type, its argument
 * schema, and the `provision` method invoked by the bootstrap workflow.
 */
export const model = {
  type: "@swamp/s3-datastore-bootstrap/provisioner",
  version: "2026.06.04.1",
  globalArguments: GlobalArgsSchema,
  resources: {
    state: {
      description: "S3 bucket + IAM managed policy provisioned for swamp.",
      schema: StateSchema,
      lifetime: "infinite" as const,
      garbageCollection: 10,
    },
  },
  methods: {
    provision: {
      description:
        "Create/verify the S3 bucket and the scoped IAM managed policy for @swamp/s3-datastore.",
      arguments: z.object({}),
      execute: async (
        _args: Record<string, never>,
        context: ProvisionerContext,
      ) => {
        const g = context.globalArgs;
        const policyName = resolvePolicyName(g.bucket_name, g.policy_name);

        const s3 = new S3Client({ region: g.region });
        const iam = new IAMClient({ region: g.region });
        const sts = new STSClient({ region: g.region });

        try {
          const accountId = await getAccountId(sts);

          await ensureBucket(s3, g.region, g.bucket_name, context.logger);
          // hardenBucket's three operations (PutPublicAccessBlock,
          // PutBucketVersioning, PutBucketEncryption) are declarative
          // set-the-state calls — safe to re-run on every invocation. This
          // also self-heals a partial failure where bucket creation
          // succeeded but one of the hardening calls previously errored.
          await hardenBucket(s3, g.bucket_name);

          const policyArn = await ensurePolicy(
            iam,
            accountId,
            policyName,
            g.bucket_name,
            context.logger,
          );

          const state: StateData = {
            bucket_name: g.bucket_name,
            bucket_arn: `arn:aws:s3:::${g.bucket_name}`,
            region: g.region,
            prefix: g.prefix ?? "",
            policy_name: policyName,
            policy_arn: policyArn,
            created_at: new Date().toISOString(),
          };
          const handle = await context.writeResource("state", g.name, state);
          return { dataHandles: [handle] };
        } finally {
          // Release HTTP connection pools. Benign for one-shot workflow runs
          // but essential if the model is ever invoked in a long-lived host.
          s3.destroy();
          iam.destroy();
          sts.destroy();
        }
      },
    },
  },
};
