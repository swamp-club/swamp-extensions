// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/aws/iam/user
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for IAM User (AWS::IAM::User).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";
import {
  type AccessKeyMetadata,
  CreateAccessKeyCommand,
  DeleteAccessKeyCommand,
  GetUserCommand,
  IAMClient,
  ListAccessKeysCommand,
  ListAttachedUserPoliciesCommand,
  ListGroupsForUserCommand,
  ListUserPoliciesCommand,
  ListUserTagsCommand,
  SimulatePrincipalPolicyCommand,
  type Tag,
  TagUserCommand,
  UntagUserCommand,
} from "npm:@aws-sdk/client-iam@3.1156.0";
import {
  GetCallerIdentityCommand,
  STSClient,
} from "npm:@aws-sdk/client-sts@3.1156.0";
import { NodeHttpHandler } from "npm:@smithy/node-http-handler@4.9.7";

const PolicySchema = z.object({
  PolicyDocument: z.record(z.string(), z.unknown()).describe(
    "The entire contents of the policy that defines permissions. For more information, see [Overview of JSON policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#access_policies-json).",
  ),
  PolicyName: z.string().describe(
    "The friendly name (not ARN) identifying the policy.",
  ),
});

const TagSchema = z.object({
  Key: z.string().describe(
    "The key name that can be used to look up or retrieve the associated value. For example, Department or Cost Center are common choices.",
  ),
  Value: z.string().describe(
    "The value associated with this tag. For example, tags with a key name of Department could have values such as Human Resources, Accounting, and Support. Tags with a key name of Cost Center might have values that consist of the number associated with the different cost centers in your company. Typically, many resources have tags with the same key name but with different values.",
  ),
});

const GlobalArgsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).describe(
    "AWS access key ID; overrides AWS_ACCESS_KEY_ID environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).describe(
    "AWS secret access key; overrides AWS_SECRET_ACCESS_KEY environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  sessionToken: z.string().meta({ sensitive: true }).describe(
    "AWS session token for temporary credentials; overrides AWS_SESSION_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  region: z.string().describe(
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  Path: z.string().describe(
    "The path for the user name. For more information about paths, see [IAM identifiers](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html) in the *IAM User Guide*. This parameter is optional. If it is not included, it defaults to a slash (/). This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of either a forward slash (/) by itself or a string that must begin and end with forward slashes. In addition, it can contain any ASCII character from the! ( \\u0021) through the DEL character ( \\u007F), including most punctuation characters, digits, and upper and lowercased letters.",
  ).optional(),
  ManagedPolicyArns: z.array(z.string()).describe(
    "A list of Amazon Resource Names (ARNs) of the IAM managed policies that you want to attach to the user. For more information about ARNs, see [Amazon Resource Names (ARNs) and Service Namespaces](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html) in the *General Reference*.",
  ).optional(),
  Policies: z.array(PolicySchema).describe(
    "Adds or updates an inline policy document that is embedded in the specified IAM user. To view AWS::IAM::User snippets, see [Declaring an User Resource](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/quickref-iam.html#scenario-iam-user). The name of each policy for a role, user, or group must be unique. If you don't choose unique names, updates to the IAM identity will fail. For information about limits on the number of inline policies that you can embed in a user, see [Limitations on Entities](https://docs.aws.amazon.com/IAM/latest/UserGuide/LimitationsOnEntities.html) in the *User Guide*.",
  ).optional(),
  UserName: z.string().describe(
    'The name of the user to create. Do not include the path in this value. This parameter allows (per its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-. The user name must be unique within the account. User names are not distinguished by case. For example, you cannot create users named both "John" and "john". If you don\'t specify a name, CFN generates a unique physical ID and uses that ID for the user name. If you specify a name, you must specify the CAPABILITY_NAMED_IAM value to acknowledge your template\'s capabilities. For more information, see [Acknowledging Resources in Templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-template.html#using-iam-capabilities). Naming an IAM resource can cause an unrecoverable error if you reuse the same template in multiple Regions. To prevent this, we recommend using Fn::Join and AWS::Region to create a Region-specific name, as in the following example: {"Fn::Join": ["", [{"Ref": "AWS::Region"}, {"Ref": "MyResourceName"}]]}.',
  ).optional(),
  Groups: z.array(z.string()).describe(
    "A list of group names to which you want to add the user.",
  ).optional(),
  LoginProfile: z.object({
    PasswordResetRequired: z.boolean().describe(
      "Specifies whether the user is required to set a new password on next sign-in.",
    ).optional(),
    Password: z.string().describe("The user's password."),
  }).describe(
    "Creates a password for the specified IAM user. A password allows an IAM user to access AWS services through the console. You can use the CLI, the AWS API, or the *Users* page in the IAM console to create a password for any IAM user. Use [ChangePassword](https://docs.aws.amazon.com/IAM/latest/APIReference/API_ChangePassword.html) to update your own existing password in the *My Security Credentials* page in the console. For more information about managing passwords, see [Managing passwords](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_ManagingLogins.html) in the *User Guide*.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of tags that you want to attach to the new user. Each tag consists of a key name and an associated value. For more information about tagging, see [Tagging IAM resources](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_tags.html) in the *IAM User Guide*. If any one of the tags is invalid or if you exceed the allowed maximum number of tags, then the entire request fails and the resource is not created.",
  ).optional(),
  PermissionsBoundary: z.string().describe(
    "The ARN of the managed policy that is used to set the permissions boundary for the user. A permissions boundary policy defines the maximum permissions that identity-based policies can grant to an entity, but does not grant permissions. Permissions boundaries do not define the maximum permissions that a resource-based policy can grant to an entity. To learn more, see [Permissions boundaries for IAM entities](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html) in the *IAM User Guide*. For more information about policy types, see [Policy types](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#access_policy-types) in the *IAM User Guide*.",
  ).optional(),
});

// User tag whose value is the id of the one access key swamp owns on the
// user. Keys whose id is not in this tag are foreign and never touched.
const IAM_USER_OWNED_KEY_TAG = "swamp-owned-access-key-id";

/**
 * Read and write access to this method's own output resource, bound by the
 * generated model to one instance. `read` resolves vault references, so a
 * sensitive field comes back as the stored secret.
 */
interface CustomMethodResourceIO {
  write(data: Record<string, unknown>): Promise<unknown>;
  read(): Promise<Record<string, unknown> | null>;
}

const ObserverAccessKeyOutputSchema = z.object({
  userName: z.string(),
  userArn: z.string(),
  accountId: z.string(),
  accessKeyId: z.string(),
  status: z.string(),
  createDate: z.string().optional(),
  // Stored in a vault; the persisted resource holds only a vault reference.
  secretAccessKey: z.string().meta({ sensitive: true }),
  provisionedAt: z.string(),
});

const AccessVerificationOutputSchema = z.object({
  userName: z.string(),
  // Absent only when the user could not be read.
  userArn: z.string().optional(),
  accessKeyId: z.string(),
  callerArn: z.string().optional(),
  callerAccount: z.string().optional(),
  identityMatches: z.boolean(),
  identityAttempts: z.number(),
  // Why the key could not authenticate, when it could not; never the secret.
  identityError: z.string().optional(),
  // Why the verification could not finish (lookup, simulation or deadline).
  error: z.string().optional(),
  actions: z.array(z.object({
    action: z.string(),
    expected: z.enum(["allowed", "denied"]),
    decision: z.string(),
    pass: z.boolean(),
  })),
  passed: z.boolean(),
  observedAt: z.string(),
});

function iamUserDisableImds(): void {
  // disableImdsIfOffEc2 inlined — enrichments run at codegen time, not extension runtime
  if (
    !Deno.env.get("AWS_EC2_METADATA_DISABLED") &&
    !Deno.env.get("AWS_CONTAINER_CREDENTIALS_RELATIVE_URI") &&
    !Deno.env.get("AWS_CONTAINER_CREDENTIALS_FULL_URI")
  ) {
    Deno.env.set("AWS_EC2_METADATA_DISABLED", "true");
  }
}

function iamUserClientConfig(
  credentials: AwsCredentials,
): Record<string, unknown> {
  iamUserDisableImds();
  const region = credentials.region ??
    Deno.env.get("AWS_REGION") ??
    Deno.env.get("AWS_DEFAULT_REGION") ??
    "us-east-1";
  const config: Record<string, unknown> = {
    region,
    requestHandler: new NodeHttpHandler(),
  };
  if (credentials.accessKeyId && credentials.secretAccessKey) {
    config.credentials = {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      ...(credentials.sessionToken
        ? { sessionToken: credentials.sessionToken }
        : {}),
    };
  }
  return config;
}

function createIamUserIamClient(credentials: AwsCredentials): IAMClient {
  return new IAMClient(iamUserClientConfig(credentials));
}

function createIamUserStsClient(credentials: AwsCredentials): STSClient {
  return new STSClient(iamUserClientConfig(credentials));
}

/** Short, secret-free description of an SDK or other error. */
function iamUserErrorText(error: unknown): string {
  if (error instanceof Error) {
    const status = (error as { $metadata?: { httpStatusCode?: number } })
      .$metadata?.httpStatusCode;
    return `${error.name}${
      status ? ` (HTTP ${status})` : ""
    }: ${error.message}`;
  }
  return String(error);
}

function iamUserStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((v): v is string => typeof v === "string")
    : [];
}

/** Follows IsTruncated/Marker to the last page and concatenates the items. */
async function iamUserPaginate<T>(
  fetchPage: (
    marker: string | undefined,
  ) => Promise<{ items: T[]; isTruncated?: boolean; marker?: string }>,
): Promise<T[]> {
  const all: T[] = [];
  let marker: string | undefined;
  for (;;) {
    const page = await fetchPage(marker);
    all.push(...page.items);
    if (!page.isTruncated || !page.marker) return all;
    marker = page.marker;
  }
}

async function iamUserListTags(
  iam: IAMClient,
  userName: string,
): Promise<Tag[]> {
  return await iamUserPaginate(async (Marker) => {
    const r = await iam.send(
      new ListUserTagsCommand({ UserName: userName, Marker }),
    );
    return {
      items: r.Tags ?? [],
      isTruncated: r.IsTruncated,
      marker: r.Marker,
    };
  });
}

async function iamUserListKeys(
  iam: IAMClient,
  userName: string,
): Promise<AccessKeyMetadata[]> {
  return await iamUserPaginate(async (Marker) => {
    const r = await iam.send(
      new ListAccessKeysCommand({ UserName: userName, Marker }),
    );
    return {
      items: r.AccessKeyMetadata ?? [],
      isTruncated: r.IsTruncated,
      marker: r.Marker,
    };
  });
}

function iamUserOwnedKeyId(tags: Tag[]): string | undefined {
  return tags.find((t) => t.Key === IAM_USER_OWNED_KEY_TAG)?.Value;
}

/**
 * Checks the account, the user's path and tags, and that every attached
 * inline policy, managed policy and group is declared or explicitly allowed.
 * Returns the user's ARN and current tags.
 */
async function iamUserVerifyOwnership(
  iam: IAMClient,
  sts: STSClient,
  args: Record<string, unknown>,
  userName: string,
): Promise<{ userArn: string; accountId: string; tags: Tag[] }> {
  const expectedAccountId = args.expectedAccountId;
  if (typeof expectedAccountId !== "string" || expectedAccountId === "") {
    throw new Error("expectedAccountId is required");
  }
  const identity = await sts.send(new GetCallerIdentityCommand({}));
  if (identity.Account !== expectedAccountId) {
    throw new Error(
      `refusing: credentials belong to account ${identity.Account}, not the expected account ${expectedAccountId}`,
    );
  }

  const user = (await iam.send(new GetUserCommand({ UserName: userName })))
    .User;
  if (!user?.Arn) throw new Error(`IAM user ${userName} was not found`);
  const expectedPath = typeof args.Path === "string" && args.Path !== ""
    ? args.Path
    : "/";
  if ((user.Path ?? "/") !== expectedPath) {
    throw new Error(
      `refusing: user ${userName} has path ${user.Path}, expected ${expectedPath}`,
    );
  }

  const declaredTags = Array.isArray(args.Tags)
    ? (args.Tags as Array<Record<string, unknown>>).filter((t) =>
      typeof t?.Key === "string" && typeof t?.Value === "string"
    )
    : [];
  if (declaredTags.length === 0) {
    throw new Error(
      "refusing: declare at least one ownership tag in Tags so the user can be verified as owned",
    );
  }
  const tags = await iamUserListTags(iam, userName);
  for (const declared of declaredTags) {
    const actual = tags.find((t) => t.Key === declared.Key);
    if (actual?.Value !== declared.Value) {
      throw new Error(
        `refusing: user ${userName} tag ${declared.Key} is ${
          actual ? `"${actual.Value}"` : "missing"
        }, expected "${declared.Value}"`,
      );
    }
  }

  const allowedInline = new Set([
    ...(Array.isArray(args.Policies)
      ? (args.Policies as Array<Record<string, unknown>>)
        .map((p) => p?.PolicyName)
        .filter((n): n is string => typeof n === "string")
      : []),
    ...iamUserStringArray(args.allowedInlinePolicyNames),
  ]);
  const allowedManaged = new Set([
    ...iamUserStringArray(args.ManagedPolicyArns),
    ...iamUserStringArray(args.allowedManagedPolicyArns),
  ]);
  const allowedGroups = new Set([
    ...iamUserStringArray(args.Groups),
    ...iamUserStringArray(args.allowedGroups),
  ]);

  const inline = await iamUserPaginate(async (Marker) => {
    const r = await iam.send(
      new ListUserPoliciesCommand({ UserName: userName, Marker }),
    );
    return {
      items: r.PolicyNames ?? [],
      isTruncated: r.IsTruncated,
      marker: r.Marker,
    };
  });
  const managed = await iamUserPaginate(async (Marker) => {
    const r = await iam.send(
      new ListAttachedUserPoliciesCommand({ UserName: userName, Marker }),
    );
    return {
      items: (r.AttachedPolicies ?? []).map((p) => p.PolicyArn ?? ""),
      isTruncated: r.IsTruncated,
      marker: r.Marker,
    };
  });
  const groups = await iamUserPaginate(async (Marker) => {
    const r = await iam.send(
      new ListGroupsForUserCommand({ UserName: userName, Marker }),
    );
    return {
      items: (r.Groups ?? []).map((g) => g.GroupName ?? ""),
      isTruncated: r.IsTruncated,
      marker: r.Marker,
    };
  });

  const foreign = [
    ...inline.filter((n) => !allowedInline.has(n)).map((n) =>
      `inline policy ${n}`
    ),
    ...managed.filter((a) => !allowedManaged.has(a)).map((a) =>
      `managed policy ${a}`
    ),
    ...groups.filter((g) => !allowedGroups.has(g)).map((g) => `group ${g}`),
  ];
  if (foreign.length > 0) {
    throw new Error(
      `refusing: user ${userName} has attachments that are neither declared nor allowed: ${
        foreign.join(", ")
      }`,
    );
  }

  return { userArn: user.Arn, accountId: expectedAccountId, tags };
}

/** True when a read-back secret is a real value, not empty or an unresolved reference. */
function iamUserSecretUsable(value: unknown): boolean {
  return typeof value === "string" && value !== "" && !value.startsWith("${{");
}

/**
 * Provisions the one access key swamp owns on an observer IAM user and
 * stores its secret through the sensitive `secretAccessKey` field, so only a
 * vault reference is persisted.
 *
 * Refuses unless the account, the user's path and tags, and every attached
 * policy and group match what is declared or allowed. Foreign keys are never
 * touched. On a re-run the owned key is reused only after its stored secret
 * is read back from the vault. A new key that cannot be stored and read back
 * is deleted again, so a failed run never leaves an owned key without a
 * recoverable secret.
 */
async function provisionAccessKey(
  args: Record<string, unknown>,
  credentials: AwsCredentials,
  io: CustomMethodResourceIO,
): Promise<void> {
  const userName = args.UserName;
  if (typeof userName !== "string" || userName === "") {
    throw new Error("UserName is required to provision an access key");
  }
  const replaceOwnedKey = args.replaceOwnedKey === true;
  const iam = createIamUserIamClient(credentials);
  const sts = createIamUserStsClient(credentials);
  try {
    const { userArn, accountId, tags } = await iamUserVerifyOwnership(
      iam,
      sts,
      args,
      userName,
    );

    // Ownership comes from the owned-key tag or from this model's stored
    // record. The generated update rewrites Tags to the declared set and drops
    // the tag, so the stored record must also count.
    let stored: Record<string, unknown> | null = null;
    let storedReadError: unknown;
    try {
      stored = await io.read();
    } catch (error) {
      storedReadError = error;
    }
    const taggedId = iamUserOwnedKeyId(tags);
    const recordedId = typeof stored?.accessKeyId === "string"
      ? stored.accessKeyId
      : undefined;
    const ownedIds = new Set(
      [taggedId, recordedId].filter((id): id is string => !!id),
    );
    const keys = await iamUserListKeys(iam, userName);
    const foreignKeys = keys.filter((k) => !ownedIds.has(k.AccessKeyId ?? ""));
    if (foreignKeys.length > 0) {
      throw new Error(
        `refusing: user ${userName} has access keys swamp does not own: ${
          foreignKeys.map((k) => k.AccessKeyId).join(", ")
        }. Nothing was changed.`,
      );
    }
    if (keys.length > 1) {
      throw new Error(
        `refusing: the owned-key tag and the stored record name different keys on ${userName} (${
          keys.map((k) => k.AccessKeyId).join(", ")
        }). Delete the one that is not in use, then re-run.`,
      );
    }
    const ownedKey = keys[0];
    const ownedId = ownedKey?.AccessKeyId;

    if (ownedKey && !replaceOwnedKey) {
      if (storedReadError !== undefined) {
        throw new Error(
          `refusing: the owned access key ${ownedId} exists but its stored record could not be read (${
            iamUserErrorText(storedReadError)
          }). If the secret is lost, re-run with replaceOwnedKey=true.`,
        );
      }
      if (ownedKey.Status !== "Active") {
        throw new Error(
          `refusing: the owned access key ${ownedId} is ${ownedKey.Status}. Re-run with replaceOwnedKey=true to replace it.`,
        );
      }
      if (
        recordedId === ownedId &&
        iamUserSecretUsable(stored?.secretAccessKey)
      ) {
        // Put the tag back if an update removed it.
        if (taggedId !== ownedId) {
          await iam.send(
            new TagUserCommand({
              UserName: userName,
              Tags: [{ Key: IAM_USER_OWNED_KEY_TAG, Value: ownedId! }],
            }),
          );
        }
        return;
      }
      throw new Error(
        `refusing: the owned access key ${ownedId} exists but its secret cannot be recovered from the vault. Re-run with replaceOwnedKey=true to replace that key.`,
      );
    }

    const replacedId = ownedKey && replaceOwnedKey
      ? ownedKey.AccessKeyId
      : undefined;
    if (ownedKey && replaceOwnedKey) {
      await iam.send(
        new DeleteAccessKeyCommand({
          UserName: userName,
          AccessKeyId: ownedKey.AccessKeyId,
        }),
      );
    }

    const created = (await iam.send(
      new CreateAccessKeyCommand({ UserName: userName }),
    )).AccessKey;
    if (!created?.AccessKeyId || !created.SecretAccessKey) {
      throw new Error("CreateAccessKey returned no key");
    }
    const newId = created.AccessKeyId;
    const secret = created.SecretAccessKey;

    // Deletes the new key and, when the owned tag still names it, removes the
    // tag. The tag is kept if the key survives, so replaceOwnedKey can still
    // clean it up. Returns a description of anything that could not be undone.
    const rollback = async (): Promise<string | undefined> => {
      const problems: string[] = [];
      let keyDeleted = false;
      try {
        await iam.send(
          new DeleteAccessKeyCommand({
            UserName: userName,
            AccessKeyId: newId,
          }),
        );
        keyDeleted = true;
      } catch (error) {
        problems.push(`could not delete key: ${iamUserErrorText(error)}`);
      }
      let tagged = false;
      if (!keyDeleted) {
        try {
          tagged = iamUserOwnedKeyId(await iamUserListTags(iam, userName)) ===
            newId;
        } catch {
          // Tag state unknown; the message below says how to recover either way.
        }
        return `${
          problems.join("; ")
        }. Access key ${newId} is stranded on ${userName}; ${
          tagged
            ? "re-run with replaceOwnedKey=true to replace it"
            : "it is not tagged as owned, so delete it manually before re-running"
        }`;
      }
      try {
        tagged = iamUserOwnedKeyId(await iamUserListTags(iam, userName)) ===
          newId;
        if (tagged) {
          await iam.send(
            new UntagUserCommand({
              UserName: userName,
              TagKeys: [IAM_USER_OWNED_KEY_TAG],
            }),
          );
        }
      } catch (error) {
        // The key is gone, so a leftover tag only names a missing key, which
        // the next run ignores.
        problems.push(`could not remove owned tag: ${iamUserErrorText(error)}`);
      }
      return problems.length > 0 ? problems.join("; ") : undefined;
    };

    const fail = async (what: string, error?: unknown): Promise<never> => {
      const leftover = await rollback();
      const cause = error === undefined ? "" : ` (${iamUserErrorText(error)})`;
      const message = leftover
        ? `${what}${cause}. Rollback was incomplete: ${leftover}.`
        : `${what}${cause}. The new key was deleted; nothing was provisioned and it is safe to re-run.`;
      throw new Error(message.split(secret).join("[redacted]"));
    };

    try {
      await iam.send(
        new TagUserCommand({
          UserName: userName,
          Tags: [{ Key: IAM_USER_OWNED_KEY_TAG, Value: newId }],
        }),
      );
    } catch (error) {
      return await fail("tagging the new access key as owned failed", error);
    }

    // A concurrent run may have created its own key or retagged the user.
    // A list that merely lags the writes (IAM is eventually consistent) is
    // retried briefly; another key or another tag value fails at once.
    let settled = false;
    for (let check = 1; check <= 3 && !settled; check++) {
      let keysAfter: AccessKeyMetadata[];
      let tagAfter: string | undefined;
      try {
        keysAfter = await iamUserListKeys(iam, userName);
        tagAfter = iamUserOwnedKeyId(await iamUserListTags(iam, userName));
      } catch (error) {
        return await fail("re-checking keys after tagging failed", error);
      }
      // The key this run replaced, and the tag value before this run, may
      // still show while the listings lag; only ids never seen here mean
      // another run.
      const knownIds = new Set(
        [newId, replacedId, taggedId].filter((id): id is string => !!id),
      );
      const otherKeys = keysAfter.filter((k) =>
        !knownIds.has(k.AccessKeyId ?? "")
      );
      if (otherKeys.length > 0 || (tagAfter && !knownIds.has(tagAfter))) {
        return await fail(
          "refusing: another key or owned tag appeared while provisioning (concurrent run?)",
        );
      }
      settled = keysAfter.length === 1 &&
        keysAfter[0].AccessKeyId === newId && tagAfter === newId;
      if (!settled && check < 3) {
        await new Promise((resolve) => setTimeout(resolve, 1_000));
      }
    }
    if (!settled) {
      return await fail(
        "the new key or its owned tag did not appear in IAM listings after tagging",
      );
    }

    const record = {
      userName,
      userArn,
      accountId,
      accessKeyId: newId,
      status: created.Status ?? "Active",
      ...(created.CreateDate
        ? { createDate: created.CreateDate.toISOString() }
        : {}),
      secretAccessKey: secret,
      provisionedAt: new Date().toISOString(),
    };

    let written = false;
    try {
      await io.write(record);
      written = true;
      const back = await io.read();
      if (back?.accessKeyId !== newId || back?.secretAccessKey !== secret) {
        throw new Error("the stored secret did not read back from the vault");
      }
    } catch (error) {
      return await fail(
        written
          ? "reading the stored secret back failed; the latest observerAccessKey version now points at a deleted key until the next successful run"
          : "storing the secret in the vault failed",
        error,
      );
    }
  } finally {
    iam.destroy();
    sts.destroy();
  }
}

function iamUserBoundedInt(
  value: unknown,
  fallback: number,
  min: number,
  max: number,
): number {
  const n = typeof value === "number" && Number.isFinite(value)
    ? Math.trunc(value)
    : fallback;
  return Math.min(Math.max(n, min), max);
}

/**
 * One deadline for a whole method call. `within` settles as soon as the
 * deadline passes, even if the SDK is still waiting out a retry backoff, and
 * the signal aborts any request in flight.
 */
function iamUserDeadline(timeoutMs: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return {
    signal: controller.signal,
    expired: () => controller.signal.aborted,
    clear: () => clearTimeout(timer),
    within<T>(promise: Promise<T>): Promise<T> {
      return new Promise<T>((resolve, reject) => {
        const onAbort = () => reject(new Error("deadline exceeded"));
        if (controller.signal.aborted) {
          onAbort();
        } else {
          controller.signal.addEventListener("abort", onAbort, { once: true });
        }
        promise.then((value) => {
          controller.signal.removeEventListener("abort", onAbort);
          resolve(value);
        }, (error) => {
          controller.signal.removeEventListener("abort", onAbort);
          reject(error);
        });
      });
    },
  };
}

/**
 * Verifies a provisioned observer key: STS must identify the key as this
 * user, and the IAM policy simulator must allow every permitted action and
 * deny every denied one. Writes the evidence, then fails the run if any
 * check failed. Never records the secret.
 */
async function verifyAccessKey(
  args: Record<string, unknown>,
  credentials: AwsCredentials,
  io: CustomMethodResourceIO,
): Promise<void> {
  const userName = args.UserName;
  if (typeof userName !== "string" || userName === "") {
    throw new Error("UserName is required to verify an access key");
  }
  const keyId = args.observerAccessKeyId;
  const keySecret = args.observerSecretAccessKey;
  if (typeof keyId !== "string" || keyId === "") {
    throw new Error("observerAccessKeyId is required");
  }
  if (typeof keySecret !== "string" || keySecret === "") {
    throw new Error("observerSecretAccessKey is required");
  }
  const permitted = iamUserStringArray(args.permittedActions);
  const denied = iamUserStringArray(args.deniedActions);
  const timeoutMs = iamUserBoundedInt(args.timeoutMs, 30_000, 1_000, 120_000);

  const deadline = iamUserDeadline(timeoutMs);
  const iam = createIamUserIamClient(credentials);
  const observerSts = createIamUserStsClient({
    accessKeyId: keyId,
    secretAccessKey: keySecret,
    region: credentials.region,
  });
  // Every outcome after the inputs are valid leaves an evidence record, so
  // a failed run never leaves an earlier passing record as the latest one.
  let userArn: string | undefined;
  let attempts = 0;
  let callerArn: string | undefined;
  let callerAccount: string | undefined;
  let identityError: string | undefined;
  const actions: Array<{
    action: string;
    expected: "allowed" | "denied";
    decision: string;
    pass: boolean;
  }> = [];
  let written = false;
  const writeEvidence = async (fields: Record<string, unknown>) => {
    written = true;
    await io.write({
      userName,
      ...(userArn ? { userArn } : {}),
      accessKeyId: keyId,
      ...(callerArn ? { callerArn } : {}),
      ...(callerAccount ? { callerAccount } : {}),
      identityAttempts: attempts,
      ...(identityError ? { identityError } : {}),
      actions,
      observedAt: new Date().toISOString(),
      ...fields,
    });
  };
  try {
    const user = (await deadline.within(iam.send(
      new GetUserCommand({ UserName: userName }),
      { abortSignal: deadline.signal },
    ))).User;
    if (!user?.Arn) throw new Error(`IAM user ${userName} was not found`);
    userArn = user.Arn;

    // A new key takes a few seconds to become usable, so retry while STS
    // rejects it as unknown.
    for (;;) {
      attempts++;
      try {
        const identity = await deadline.within(observerSts.send(
          new GetCallerIdentityCommand({}),
          { abortSignal: deadline.signal },
        ));
        callerArn = identity.Arn;
        callerAccount = identity.Account;
        break;
      } catch (error) {
        const name = error instanceof Error ? error.name : "";
        if (deadline.expired() || name !== "InvalidClientTokenId") {
          identityError =
            `the observer key could not authenticate after ${attempts} attempt(s): ${
              iamUserErrorText(error).split(keySecret).join("[redacted]")
            }`;
          break;
        }
      }
      let sleepTimer: ReturnType<typeof setTimeout> | undefined;
      try {
        await deadline.within(
          new Promise((resolve) => {
            sleepTimer = setTimeout(resolve, 1_000);
          }),
        );
      } catch {
        clearTimeout(sleepTimer);
        identityError =
          `the observer key was still rejected when the deadline passed after ${attempts} attempt(s)`;
        break;
      }
    }

    if (identityError !== undefined) {
      await writeEvidence({ identityMatches: false, passed: false });
      throw new Error(`access key verification failed: ${identityError}`);
    }

    const all = [...permitted, ...denied];
    if (all.length > 0) {
      const results = await iamUserPaginate(async (Marker) => {
        const r = await deadline.within(iam.send(
          new SimulatePrincipalPolicyCommand({
            PolicySourceArn: userArn,
            ActionNames: all,
            Marker,
          }),
          { abortSignal: deadline.signal },
        ));
        return {
          items: r.EvaluationResults ?? [],
          isTruncated: r.IsTruncated,
          marker: r.Marker,
        };
      });
      const decisions = new Map(
        results.map((r) => [r.EvalActionName ?? "", r.EvalDecision ?? ""]),
      );
      for (const action of permitted) {
        const decision = decisions.get(action) ?? "missing";
        actions.push({
          action,
          expected: "allowed",
          decision,
          pass: decision === "allowed",
        });
      }
      for (const action of denied) {
        const decision = decisions.get(action) ?? "missing";
        actions.push({
          action,
          expected: "denied",
          decision,
          pass: decision === "implicitDeny" || decision === "explicitDeny",
        });
      }
    }

    const identityMatches = callerArn === userArn;
    const passed = identityMatches && actions.every((a) => a.pass);
    await writeEvidence({ identityMatches, passed });
    if (!passed) {
      const failures = [
        ...(identityMatches
          ? []
          : [`key authenticates as ${callerArn}, not ${userArn}`]),
        ...actions.filter((a) => !a.pass).map((a) =>
          `${a.action} expected ${a.expected}, got ${a.decision}`
        ),
      ];
      throw new Error(`access key verification failed: ${failures.join("; ")}`);
    }
  } catch (error) {
    if (written) throw error;
    // GetUser, the policy simulation or the deadline failed before any
    // evidence was written.
    const message = iamUserErrorText(error).split(keySecret).join("[redacted]");
    try {
      await writeEvidence({
        identityMatches: !!userArn && callerArn === userArn,
        passed: false,
        error: message,
      });
    } catch (writeError) {
      throw new Error(
        `access key verification failed: ${message} (the failing evidence record could not be written either: ${
          iamUserErrorText(writeError)
        })`,
      );
    }
    throw new Error(`access key verification failed: ${message}`);
  } finally {
    deadline.clear();
    iam.destroy();
    observerSts.destroy();
  }
}

const StateSchema = z.object({
  Path: z.string().optional(),
  ManagedPolicyArns: z.array(z.string()).optional(),
  Policies: z.array(PolicySchema).optional(),
  UserName: z.string(),
  Groups: z.array(z.string()).optional(),
  Arn: z.string().optional(),
  LoginProfile: z.object({
    PasswordResetRequired: z.boolean(),
    Password: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  PermissionsBoundary: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Path: z.string().describe(
    "The path for the user name. For more information about paths, see [IAM identifiers](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html) in the *IAM User Guide*. This parameter is optional. If it is not included, it defaults to a slash (/). This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of either a forward slash (/) by itself or a string that must begin and end with forward slashes. In addition, it can contain any ASCII character from the! ( \\u0021) through the DEL character ( \\u007F), including most punctuation characters, digits, and upper and lowercased letters.",
  ).optional(),
  ManagedPolicyArns: z.array(z.string()).describe(
    "A list of Amazon Resource Names (ARNs) of the IAM managed policies that you want to attach to the user. For more information about ARNs, see [Amazon Resource Names (ARNs) and Service Namespaces](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html) in the *General Reference*.",
  ).optional(),
  Policies: z.array(PolicySchema).describe(
    "Adds or updates an inline policy document that is embedded in the specified IAM user. To view AWS::IAM::User snippets, see [Declaring an User Resource](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/quickref-iam.html#scenario-iam-user). The name of each policy for a role, user, or group must be unique. If you don't choose unique names, updates to the IAM identity will fail. For information about limits on the number of inline policies that you can embed in a user, see [Limitations on Entities](https://docs.aws.amazon.com/IAM/latest/UserGuide/LimitationsOnEntities.html) in the *User Guide*.",
  ).optional(),
  UserName: z.string().describe(
    'The name of the user to create. Do not include the path in this value. This parameter allows (per its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-. The user name must be unique within the account. User names are not distinguished by case. For example, you cannot create users named both "John" and "john". If you don\'t specify a name, CFN generates a unique physical ID and uses that ID for the user name. If you specify a name, you must specify the CAPABILITY_NAMED_IAM value to acknowledge your template\'s capabilities. For more information, see [Acknowledging Resources in Templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-template.html#using-iam-capabilities). Naming an IAM resource can cause an unrecoverable error if you reuse the same template in multiple Regions. To prevent this, we recommend using Fn::Join and AWS::Region to create a Region-specific name, as in the following example: {"Fn::Join": ["", [{"Ref": "AWS::Region"}, {"Ref": "MyResourceName"}]]}.',
  ).optional(),
  Groups: z.array(z.string()).describe(
    "A list of group names to which you want to add the user.",
  ).optional(),
  LoginProfile: z.object({
    PasswordResetRequired: z.boolean().describe(
      "Specifies whether the user is required to set a new password on next sign-in.",
    ).optional(),
    Password: z.string().describe("The user's password.").optional(),
  }).describe(
    "Creates a password for the specified IAM user. A password allows an IAM user to access AWS services through the console. You can use the CLI, the AWS API, or the *Users* page in the IAM console to create a password for any IAM user. Use [ChangePassword](https://docs.aws.amazon.com/IAM/latest/APIReference/API_ChangePassword.html) to update your own existing password in the *My Security Credentials* page in the console. For more information about managing passwords, see [Managing passwords](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_ManagingLogins.html) in the *User Guide*.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of tags that you want to attach to the new user. Each tag consists of a key name and an associated value. For more information about tagging, see [Tagging IAM resources](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_tags.html) in the *IAM User Guide*. If any one of the tags is invalid or if you exceed the allowed maximum number of tags, then the entire request fails and the resource is not created.",
  ).optional(),
  PermissionsBoundary: z.string().describe(
    "The ARN of the managed policy that is used to set the permissions boundary for the user. A permissions boundary policy defines the maximum permissions that identity-based policies can grant to an entity, but does not grant permissions. Permissions boundaries do not define the maximum permissions that a resource-based policy can grant to an entity. To learn more, see [Permissions boundaries for IAM entities](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html) in the *IAM User Guide*. For more information about policy types, see [Policy types](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#access_policy-types) in the *IAM User Guide*.",
  ).optional(),
});

const _credentialKeys = new Set([
  "accessKeyId",
  "secretAccessKey",
  "sessionToken",
  "region",
]);

function _buildCredentials(g: Record<string, unknown>): AwsCredentials {
  return {
    accessKeyId: g.accessKeyId as string | undefined,
    secretAccessKey: g.secretAccessKey as string | undefined,
    sessionToken: g.sessionToken as string | undefined,
    region: g.region as string | undefined,
  };
}

/** Swamp extension model for IAM User. Registered at `@swamp/aws/iam/user`. */
export const model = {
  type: "@swamp/aws/iam/user",
  version: "2026.10.28.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
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
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.06.1",
      description: "Added: accessKeyId, secretAccessKey, sessionToken, region",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.17.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.28.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "IAM User resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    observerAccessKey: {
      description:
        "The swamp-owned access key for this user; secretAccessKey is stored in a vault and persisted only as a vault reference",
      schema: ObserverAccessKeyOutputSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    accessVerification: {
      description:
        "Evidence from the most recent verifyAccessKey call: caller identity and per-action policy decisions; never contains the secret",
      schema: AccessVerificationOutputSchema,
      lifetime: "30d",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IAM User",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::IAM::User",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.UserName ?? g.UserName)?.toString() ?? "current").replace(
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
    get: {
      description: "Get a IAM User",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IAM User",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::IAM::User",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.UserName ?? context.globalArgs.UserName)?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
            .replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a IAM User",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.UserName?.toString() ?? "current").replace(
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
        const identifier = existing.UserName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::IAM::User",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IAM::User",
          identifier,
          currentState,
          desiredState,
          ["UserName"],
          credentials,
        );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete a IAM User",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IAM User",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::IAM::User",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.UserName?.toString() ?? args.identifier).replace(
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
      description: "Sync IAM User state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.UserName?.toString() ?? "current").replace(
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
        const identifier = existing.UserName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::IAM::User",
            identifier,
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
              identifier,
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
      description: "List IAM User resources",
      arguments: z.object({
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
        resourceModel: z.string().describe(
          "JSON resource model for parent-scoped listing (e.g. parent identifier)",
        ).optional(),
      }),
      execute: async (
        args: { maxPages?: number; resourceModel?: string },
        context: any,
      ) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { items, nextToken } = await listResources("AWS::IAM::User", {
          resourceModel: args.resourceModel,
          maxPages: args.maxPages,
          credentials,
        });
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName =
            (item.properties?.UserName?.toString() ?? item.identifier).replace(
              /[\/\\]/g,
              "_",
            ).replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource("state", instanceName, {
            ...item.properties,
            _identifier: item.identifier,
          });
          dataHandles.push(handle);
        }
        return {
          dataHandles,
          result: { count: items.length, nextPageToken: nextToken },
        };
      },
    },
    provisionAccessKey: {
      description:
        "Provision the one swamp-owned access key on this user after verifying the account, path, tags and attachments; the secret is stored only in a vault, and a re-run reuses the key once its stored secret reads back",
      arguments: z.object({
        expectedAccountId: z.string().regex(/^[0-9]{12}$/).describe(
          "AWS account ID the caller credentials and user must belong to",
        ),
        allowedInlinePolicyNames: z.array(z.string()).describe(
          "Inline policies allowed on the user in addition to the declared Policies, e.g. ones attached through the user_policy model",
        ).optional(),
        allowedManagedPolicyArns: z.array(z.string()).describe(
          "Managed policy ARNs allowed on the user in addition to the declared ManagedPolicyArns",
        ).optional(),
        allowedGroups: z.array(z.string()).describe(
          "Groups the user may belong to in addition to the declared Groups",
        ).optional(),
        replaceOwnedKey: z.boolean().describe(
          "Delete the swamp-owned key and create a new one; use when its stored secret is lost. Keys swamp does not own are never touched",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const mergedArgs = { ...context.globalArgs, ...args };
        const instanceKey = mergedArgs["UserName"];
        const instanceName = ("observerAccessKey-" +
          (instanceKey === undefined || instanceKey === null ||
              String(instanceKey) === ""
            ? "provisionAccessKey"
            : String(instanceKey))).replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, "");
        const dataHandles: unknown[] = [];
        const io = {
          write: async (data: Record<string, unknown>) => {
            const handle = await context.writeResource(
              "observerAccessKey",
              instanceName,
              data,
            );
            dataHandles.push(handle);
            return handle;
          },
          read: async (): Promise<Record<string, unknown> | null> =>
            (await context.readResource(instanceName)) as
              | Record<string, unknown>
              | null,
        };
        await provisionAccessKey(mergedArgs, credentials, io);
        return { dataHandles };
      },
    },
    verifyAccessKey: {
      description:
        "Verify a provisioned access key authenticates as this user and that the user's policies allow and deny the given actions; records the evidence and fails on any mismatch",
      arguments: z.object({
        observerAccessKeyId: z.string().describe(
          "Access key ID to verify (not secret; recorded in the evidence). Wire from the observerAccessKey resource's accessKeyId",
        ),
        observerSecretAccessKey: z.string().meta({ sensitive: true }).describe(
          "Secret for the access key. Wire with an expression reading the observerAccessKey resource's vault reference so it is never typed in plain text",
        ),
        permittedActions: z.array(z.string()).describe(
          "IAM actions the user must be allowed, e.g. ec2:DescribeInstances",
        ).optional(),
        deniedActions: z.array(z.string()).describe(
          "IAM actions the user must be denied, e.g. iam:CreateAccessKey",
        ).optional(),
        timeoutMs: z.number().int().min(1000).max(120000).describe(
          "Deadline for the whole verification in milliseconds (default: 30000)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const mergedArgs = { ...context.globalArgs, ...args };
        const instanceKey = mergedArgs["UserName"];
        const instanceName = ("accessVerification-" +
          (instanceKey === undefined || instanceKey === null ||
              String(instanceKey) === ""
            ? "verifyAccessKey"
            : String(instanceKey))).replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, "");
        const dataHandles: unknown[] = [];
        const io = {
          write: async (data: Record<string, unknown>) => {
            const handle = await context.writeResource(
              "accessVerification",
              instanceName,
              data,
            );
            dataHandles.push(handle);
            return handle;
          },
          read: async (): Promise<Record<string, unknown> | null> =>
            (await context.readResource(instanceName)) as
              | Record<string, unknown>
              | null,
        };
        await verifyAccessKey(mergedArgs, credentials, io);
        return { dataHandles };
      },
    },
  },
};
