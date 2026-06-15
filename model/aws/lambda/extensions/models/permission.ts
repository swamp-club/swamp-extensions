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

// Auto-generated extension model for @swamp/aws/lambda/permission
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Lambda Permission (AWS::Lambda::Permission).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
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
  Action: z.string().min(1).max(256).regex(
    new RegExp("^(lambda:[*]|lambda:[a-zA-Z]+|[*])$"),
  ).describe(
    "The action that the principal can use on the function. For example, lambda:InvokeFunction or lambda:GetFunction.",
  ),
  EventSourceToken: z.string().min(1).max(256).regex(
    new RegExp("^[a-zA-Z0-9._\\-]+$"),
  ).describe(
    "For Alexa Smart Home functions, a token that the invoker must supply.",
  ).optional(),
  FunctionName: z.string().min(1).max(140).regex(
    new RegExp(
      "^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_]+)(:(\\$LATEST|[a-zA-Z0-9-_]+))?$",
    ),
  ).describe(
    "The name or ARN of the Lambda function, version, or alias. **Name formats** *Function name* – my-function (name-only), my-function:v1 (with alias). *Function ARN* – arn:aws:lambda:us-west-2:123456789012:function:my-function. *Partial ARN* – 123456789012:function:my-function. You can append a version number or alias to any of the formats. The length constraint applies only to the full ARN. If you specify only the function name, it is limited to 64 characters in length.",
  ),
  FunctionUrlAuthType: z.enum(["AWS_IAM", "NONE"]).describe(
    "The type of authentication that your function URL uses. Set to AWS_IAM if you want to restrict access to authenticated users only. Set to NONE if you want to bypass IAM authentication to create a public endpoint. For more information, see [Control access to Lambda function URLs](https://docs.aws.amazon.com/lambda/latest/dg/urls-auth.html).",
  ).optional(),
  InvokedViaFunctionUrl: z.boolean().describe(
    "Restricts the lambda:InvokeFunction action to function URL calls. When specified, this option prevents the principal from invoking the function by any means other than the function URL. For more information, see [Control access to Lambda function URLs](https://docs.aws.amazon.com/lambda/latest/dg/urls-auth.html).",
  ).optional(),
  Principal: z.string().min(1).max(256).regex(new RegExp("^.*$")).describe(
    "The AWS-service, AWS-account, IAM user, or IAM role that invokes the function. If you specify a service, use SourceArn or SourceAccount to limit who can invoke the function through that service.",
  ),
  PrincipalOrgID: z.string().min(12).max(34).regex(
    new RegExp("^o-[a-z0-9]{10,32}$"),
  ).describe(
    "The identifier for your organization in AOlong. Use this to grant permissions to all the AWS-accounts under this organization.",
  ).optional(),
  SourceAccount: z.string().min(12).max(12).regex(new RegExp("^\\d{12}$"))
    .describe(
      "For AWS-service, the ID of the AWS-account that owns the resource. Use this together with SourceArn to ensure that the specified account owns the resource. It is possible for an Amazon S3 bucket to be deleted by its owner and recreated by another account.",
    ).optional(),
  SourceArn: z.string().min(12).max(1024).regex(
    new RegExp(
      "^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-])+:((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.*)$",
    ),
  ).describe(
    "For AWS-services, the ARN of the AWS resource that invokes the function. For example, an Amazon S3 bucket or Amazon SNS topic. Note that Lambda configures the comparison using the StringLike operator.",
  ).optional(),
});

const StateSchema = z.object({
  Id: z.string(),
  Action: z.string().optional(),
  EventSourceToken: z.string().optional(),
  FunctionName: z.string(),
  FunctionUrlAuthType: z.string().optional(),
  InvokedViaFunctionUrl: z.boolean().optional(),
  Principal: z.string().optional(),
  PrincipalOrgID: z.string().optional(),
  SourceAccount: z.string().optional(),
  SourceArn: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Action: z.string().min(1).max(256).regex(
    new RegExp("^(lambda:[*]|lambda:[a-zA-Z]+|[*])$"),
  ).describe(
    "The action that the principal can use on the function. For example, lambda:InvokeFunction or lambda:GetFunction.",
  ).optional(),
  EventSourceToken: z.string().min(1).max(256).regex(
    new RegExp("^[a-zA-Z0-9._\\-]+$"),
  ).describe(
    "For Alexa Smart Home functions, a token that the invoker must supply.",
  ).optional(),
  FunctionName: z.string().min(1).max(140).regex(
    new RegExp(
      "^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_]+)(:(\\$LATEST|[a-zA-Z0-9-_]+))?$",
    ),
  ).describe(
    "The name or ARN of the Lambda function, version, or alias. **Name formats** *Function name* – my-function (name-only), my-function:v1 (with alias). *Function ARN* – arn:aws:lambda:us-west-2:123456789012:function:my-function. *Partial ARN* – 123456789012:function:my-function. You can append a version number or alias to any of the formats. The length constraint applies only to the full ARN. If you specify only the function name, it is limited to 64 characters in length.",
  ).optional(),
  FunctionUrlAuthType: z.enum(["AWS_IAM", "NONE"]).describe(
    "The type of authentication that your function URL uses. Set to AWS_IAM if you want to restrict access to authenticated users only. Set to NONE if you want to bypass IAM authentication to create a public endpoint. For more information, see [Control access to Lambda function URLs](https://docs.aws.amazon.com/lambda/latest/dg/urls-auth.html).",
  ).optional(),
  InvokedViaFunctionUrl: z.boolean().describe(
    "Restricts the lambda:InvokeFunction action to function URL calls. When specified, this option prevents the principal from invoking the function by any means other than the function URL. For more information, see [Control access to Lambda function URLs](https://docs.aws.amazon.com/lambda/latest/dg/urls-auth.html).",
  ).optional(),
  Principal: z.string().min(1).max(256).regex(new RegExp("^.*$")).describe(
    "The AWS-service, AWS-account, IAM user, or IAM role that invokes the function. If you specify a service, use SourceArn or SourceAccount to limit who can invoke the function through that service.",
  ).optional(),
  PrincipalOrgID: z.string().min(12).max(34).regex(
    new RegExp("^o-[a-z0-9]{10,32}$"),
  ).describe(
    "The identifier for your organization in AOlong. Use this to grant permissions to all the AWS-accounts under this organization.",
  ).optional(),
  SourceAccount: z.string().min(12).max(12).regex(new RegExp("^\\d{12}$"))
    .describe(
      "For AWS-service, the ID of the AWS-account that owns the resource. Use this together with SourceArn to ensure that the specified account owns the resource. It is possible for an Amazon S3 bucket to be deleted by its owner and recreated by another account.",
    ).optional(),
  SourceArn: z.string().min(12).max(1024).regex(
    new RegExp(
      "^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-])+:((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.*)$",
    ),
  ).describe(
    "For AWS-services, the ARN of the AWS resource that invokes the function. For example, an Amazon S3 bucket or Amazon SNS topic. Note that Lambda configures the comparison using the StringLike operator.",
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

/** Swamp extension model for Lambda Permission. Registered at `@swamp/aws/lambda/permission`. */
export const model = {
  type: "@swamp/aws/lambda/permission",
  version: "2026.06.15.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Lambda Permission resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Lambda Permission",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Lambda::Permission",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
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
      description: "Get a Lambda Permission",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lambda Permission",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Lambda::Permission",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
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
      description: "Delete a Lambda Permission",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lambda Permission",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Lambda::Permission",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
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
      description: "Sync Lambda Permission state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
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
        const idParts = [
          existing.FunctionName?.toString(),
          existing.Id?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::Lambda::Permission",
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
  },
};
