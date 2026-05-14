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
 * Swamp vault provider backed by AWS Secrets Manager.
 *
 * Reads and writes secrets through the AWS SDK v3, using the default AWS
 * credential chain. Use this entrypoint when a swamp deployment should store
 * its secrets in AWS Secrets Manager rather than the local vault.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  CreateSecretCommand,
  GetSecretValueCommand,
  ListSecretsCommand,
  PutSecretValueCommand,
  SecretsManagerClient,
} from "npm:@aws-sdk/client-secrets-manager@3.1046.0";
import { AwsSmOperationError, wrapAwsSmError } from "./aws_sm_errors.ts";

/**
 * Minimal contract implemented by swamp vault providers. Exported so that
 * downstream consumers and tests can type-check against a public interface
 * rather than an inferred shape.
 */
export interface VaultProvider {
  /** Fetches the current value of the given secret. */
  get(secretKey: string): Promise<string>;
  /** Writes a new value for the given secret, creating it if it does not exist. */
  put(secretKey: string, secretValue: string): Promise<void>;
  /** Lists all secret keys visible to the vault. */
  list(): Promise<string[]>;
  /** Returns the swamp-assigned name of this vault instance. */
  getName(): string;
}

class AwsSmVaultProvider implements VaultProvider {
  private readonly client: SecretsManagerClient;
  private readonly name: string;

  constructor(name: string, config: { region: string }) {
    this.name = name;
    this.client = new SecretsManagerClient({ region: config.region });
  }

  async get(secretKey: string): Promise<string> {
    const command = new GetSecretValueCommand({ SecretId: secretKey });
    let response;
    try {
      response = await this.client.send(command);
    } catch (error) {
      throw wrapAwsSmError("GetSecretValue", error);
    }

    const secretValue = response.SecretString ||
      (response.SecretBinary
        ? new TextDecoder().decode(response.SecretBinary)
        : "");

    if (!secretValue) {
      throw new Error(`Secret '${secretKey}' not found or has no value`);
    }

    return secretValue;
  }

  async put(secretKey: string, secretValue: string): Promise<void> {
    try {
      const putCommand = new PutSecretValueCommand({
        SecretId: secretKey,
        SecretString: secretValue,
      });
      await this.client.send(putCommand);
    } catch (error) {
      const wrapped = wrapAwsSmError("PutSecretValue", error);
      // The wrapper preserves the SDK error's `name`, so name-matching
      // keeps the create-on-missing fallback working without importing
      // ResourceNotFoundException from the SDK.
      if (
        wrapped instanceof AwsSmOperationError &&
        wrapped.name === "ResourceNotFoundException"
      ) {
        try {
          const createCommand = new CreateSecretCommand({
            Name: secretKey,
            SecretString: secretValue,
          });
          await this.client.send(createCommand);
        } catch (createError) {
          throw wrapAwsSmError("CreateSecret", createError);
        }
      } else {
        throw wrapped;
      }
    }
  }

  async list(): Promise<string[]> {
    const secretNames: string[] = [];
    let nextToken: string | undefined;

    do {
      const command = new ListSecretsCommand({ NextToken: nextToken });
      let response;
      try {
        response = await this.client.send(command);
      } catch (error) {
        throw wrapAwsSmError("ListSecrets", error);
      }

      if (response.SecretList) {
        for (const secret of response.SecretList) {
          if (secret.Name) {
            secretNames.push(secret.Name);
          }
        }
      }

      nextToken = response.NextToken;
    } while (nextToken);

    return secretNames.sort();
  }

  getName(): string {
    return this.name;
  }
}

/**
 * Extension entrypoint registered with swamp. Declares the vault type, its
 * configuration schema, and the factory used to instantiate a provider.
 */
export const vault = {
  type: "@swamp/aws-sm",
  name: "AWS Secrets Manager",
  description:
    "AWS Secrets Manager vault provider. Uses the default AWS credential chain for authentication.",
  configSchema: z.object({
    // deno-fmt-ignore
    region: z.string().min(1).describe("AWS region where the Secrets Manager secrets are stored e.g. us-east-1"),
  }),
  createProvider(
    name: string,
    config: Record<string, unknown>,
  ): VaultProvider {
    const parsed = vault.configSchema.parse(config);
    return new AwsSmVaultProvider(name, parsed);
  },
};
