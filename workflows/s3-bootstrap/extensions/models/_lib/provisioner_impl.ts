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

/**
 * Internal implementation bits for the s3-datastore-bootstrap provisioner.
 *
 * Kept out of the model entrypoint so the entrypoint exposes a narrow
 * public API surface (just `model`). Tests import the helpers and
 * schemas directly from here.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  CreateBucketCommand,
  HeadBucketCommand,
  PutBucketEncryptionCommand,
  PutBucketVersioningCommand,
  PutPublicAccessBlockCommand,
  S3Client,
} from "npm:@aws-sdk/client-s3@3.1024.0";
import {
  CreatePolicyCommand,
  GetPolicyCommand,
  IAMClient,
} from "npm:@aws-sdk/client-iam@3.1024.0";
import {
  GetCallerIdentityCommand,
  STSClient,
} from "npm:@aws-sdk/client-sts@3.1024.0";

// All character classes are intentionally strict: these values are interpolated
// into a shell command + JSON blob in the workflow's `run-setup` step (see
// extensions/workflows/bootstrap-s3-datastore.yaml). Characters outside of
// these classes would break shell quoting or the surrounding JSON.
const S3_BUCKET_NAME_RE = /^[a-z0-9][a-z0-9.\-]{1,61}[a-z0-9]$/;
const AWS_REGION_RE = /^[a-z0-9-]+$/;
const S3_PREFIX_RE = /^[a-zA-Z0-9/_.\-]*$/;
// Allow empty (empty string is the workflow's sentinel for "use the default")
// or 1-128 chars of IAM-valid characters.
const IAM_POLICY_NAME_RE = /^([\w+=,.@-]{1,128})?$/;

/** Inputs the workflow passes into each provisioner invocation. */
export const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this provisioner (used as the unique identifier).",
  ),
  bucket_name: z.string().min(3).max(63).regex(
    S3_BUCKET_NAME_RE,
    "Bucket names must be 3-63 chars, lowercase, letters/numbers/hyphens/dots.",
  ).describe("S3 bucket name to create."),
  region: z.string().regex(
    AWS_REGION_RE,
    "Region must contain only lowercase letters, digits, and hyphens.",
  ).describe("AWS region for the bucket (e.g. us-east-1)."),
  prefix: z.string().regex(
    S3_PREFIX_RE,
    "Prefix may only contain letters, digits, `/`, `_`, `.`, or `-`.",
  ).optional().describe(
    "Optional key prefix within the bucket (surfaced in state for the setup step).",
  ),
  policy_name: z.string().regex(
    IAM_POLICY_NAME_RE,
    "Policy name must match IAM rules (letters, digits, and `+=,.@-`, up to 128 chars).",
  ).optional().describe(
    "IAM managed policy name. Defaults to `swamp-s3-datastore-<bucket_name>`.",
  ),
});

/** State persisted after a successful provision run. */
export const StateSchema = z.object({
  bucket_name: z.string(),
  bucket_arn: z.string(),
  region: z.string(),
  prefix: z.string(),
  policy_name: z.string(),
  policy_arn: z.string(),
  created_at: z.string(),
});

/** Inferred type of a completed `state` resource record. */
export type StateData = z.infer<typeof StateSchema>;

/** Minimal logger interface used by the provisioner helpers. */
export type ProvisionerLogger = {
  info: (msg: string) => void;
  warn: (msg: string) => void;
};

/** Context handed to the `provision` method at runtime by the swamp engine. */
export type ProvisionerContext = {
  globalArgs: z.infer<typeof GlobalArgsSchema>;
  logger: ProvisionerLogger;
  writeResource: (
    specName: string,
    instanceName: string,
    data: unknown,
  ) => Promise<unknown>;
};

/**
 * Returns the explicit `policy_name` if provided, otherwise derives a default
 * of the form `swamp-s3-datastore-<bucket>`.
 */
export function resolvePolicyName(
  bucketName: string,
  policyName: string | undefined,
): string {
  return policyName && policyName.length > 0
    ? policyName
    : `swamp-s3-datastore-${bucketName}`;
}

/**
 * Builds the IAM policy document JSON for the managed policy attached to the
 * bucket. Scoped to the four runtime actions @swamp/s3-datastore requires.
 */
export function policyDocumentFor(bucketName: string): string {
  return JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "SwampS3DatastoreBucketLevel",
        Effect: "Allow",
        Action: ["s3:ListBucket"],
        Resource: `arn:aws:s3:::${bucketName}`,
      },
      {
        Sid: "SwampS3DatastoreObjectLevel",
        Effect: "Allow",
        Action: [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject",
        ],
        Resource: `arn:aws:s3:::${bucketName}/*`,
      },
    ],
  });
}

/**
 * Creates the bucket if it does not exist, or confirms that it already does.
 * Returns whether the bucket was newly created or an existing one was reused.
 */
export async function ensureBucket(
  s3: S3Client,
  region: string,
  bucketName: string,
  logger: ProvisionerLogger,
): Promise<"created" | "reused"> {
  try {
    await s3.send(new HeadBucketCommand({ Bucket: bucketName }));
    logger.info(`Bucket ${bucketName} already exists — reusing.`);
    return "reused";
  } catch (err) {
    const name = (err as { name?: string }).name;
    if (name !== "NotFound" && name !== "NoSuchBucket") throw err;
  }

  logger.info(`Creating bucket ${bucketName} in ${region}.`);
  try {
    await s3.send(
      new CreateBucketCommand({
        Bucket: bucketName,
        // us-east-1 rejects LocationConstraint; every other region requires it.
        CreateBucketConfiguration: region === "us-east-1"
          ? undefined
          : { LocationConstraint: region as never },
      }),
    );
    return "created";
  } catch (err) {
    // TOCTOU: a concurrent provision run could win the race between our
    // HeadBucket probe and this CreateBucket call. BucketAlreadyOwnedByYou
    // means we own it; treat as reused. BucketAlreadyExists (different
    // owner) is a real error — let it propagate.
    const name = (err as { name?: string }).name;
    if (name === "BucketAlreadyOwnedByYou") {
      logger.info(
        `Bucket ${bucketName} was created concurrently — reusing.`,
      );
      return "reused";
    }
    throw err;
  }
}

/**
 * Applies public-access blocks, default SSE-S3 encryption, and versioning to
 * the bucket so it matches @swamp/s3-datastore's expected posture.
 */
export async function hardenBucket(
  s3: S3Client,
  bucketName: string,
): Promise<void> {
  await s3.send(
    new PutPublicAccessBlockCommand({
      Bucket: bucketName,
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        IgnorePublicAcls: true,
        BlockPublicPolicy: true,
        RestrictPublicBuckets: true,
      },
    }),
  );
  await s3.send(
    new PutBucketVersioningCommand({
      Bucket: bucketName,
      VersioningConfiguration: { Status: "Enabled" },
    }),
  );
  await s3.send(
    new PutBucketEncryptionCommand({
      Bucket: bucketName,
      ServerSideEncryptionConfiguration: {
        Rules: [
          {
            ApplyServerSideEncryptionByDefault: { SSEAlgorithm: "AES256" },
            BucketKeyEnabled: true,
          },
        ],
      },
    }),
  );
}

/** Resolves the caller's AWS account ID via STS `GetCallerIdentity`. */
export async function getAccountId(sts: STSClient): Promise<string> {
  const resp = await sts.send(new GetCallerIdentityCommand({}));
  if (!resp.Account) {
    throw new Error("STS GetCallerIdentity returned no Account.");
  }
  return resp.Account;
}

/**
 * Creates or reuses a scoped IAM managed policy and returns its ARN. Handles
 * TOCTOU races where another run created the same policy concurrently.
 */
export async function ensurePolicy(
  iam: IAMClient,
  accountId: string,
  policyName: string,
  bucketName: string,
  logger: ProvisionerLogger,
): Promise<string> {
  const expectedArn = `arn:aws:iam::${accountId}:policy/${policyName}`;
  try {
    const existing = await iam.send(
      new GetPolicyCommand({ PolicyArn: expectedArn }),
    );
    if (existing.Policy?.Arn) {
      logger.info(
        `Managed policy ${policyName} already exists — reusing. ` +
          `Not updating policy document; delete and re-run if it drifted.`,
      );
      return existing.Policy.Arn;
    }
  } catch (err) {
    const name = (err as { name?: string }).name;
    if (name !== "NoSuchEntityException") throw err;
  }

  logger.info(`Creating IAM managed policy ${policyName}.`);
  try {
    const created = await iam.send(
      new CreatePolicyCommand({
        PolicyName: policyName,
        Description:
          `Least-privilege policy for @swamp/s3-datastore on bucket ${bucketName}.`,
        PolicyDocument: policyDocumentFor(bucketName),
      }),
    );
    const arn = created.Policy?.Arn;
    if (!arn) throw new Error("IAM CreatePolicy returned no ARN.");
    return arn;
  } catch (err) {
    // TOCTOU: a concurrent provision run could win the race between our
    // GetPolicy probe and this CreatePolicy call. The ARN is deterministic
    // from accountId + policyName, so return the expected ARN rather than
    // treating this as a failure.
    const name = (err as { name?: string }).name;
    if (name === "EntityAlreadyExistsException") {
      logger.info(
        `IAM managed policy ${policyName} was created concurrently — ` +
          `reusing its ARN.`,
      );
      return expectedArn;
    }
    throw err;
  }
}
