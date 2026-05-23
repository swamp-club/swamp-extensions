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
 * Swamp vault provider backed by Azure Key Vault.
 *
 * Reads and writes secrets through the official `@azure/keyvault-secrets`
 * client, authenticating with `DefaultAzureCredential`. Use this entrypoint
 * when a swamp deployment should store its secrets in Azure Key Vault.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { DefaultAzureCredential } from "npm:@azure/identity@4.13.1";
import {
  SecretClient,
  type SecretClientOptions,
} from "npm:@azure/keyvault-secrets@4.11.2";
import type { TokenCredential } from "@azure/core-auth";

export interface VaultProvider {
  get(secretKey: string): Promise<string>;
  put(secretKey: string, secretValue: string): Promise<void>;
  list(): Promise<string[]>;
  getName(): string;
}

interface VaultAnnotationData {
  url?: string;
  notes?: string;
  labels?: Record<string, string>;
  updatedAt: string;
}

export class VaultAnnotation {
  readonly url: string | undefined;
  readonly notes: string | undefined;
  readonly labels: Readonly<Record<string, string>>;
  readonly updatedAt: Date;

  constructor(
    url: string | undefined,
    notes: string | undefined,
    labels: Record<string, string>,
    updatedAt: Date,
  ) {
    this.url = url;
    this.notes = notes;
    this.labels = Object.freeze({ ...labels });
    this.updatedAt = updatedAt;
  }

  static create(fields: {
    url?: string;
    notes?: string;
    labels?: Record<string, string>;
  }): VaultAnnotation {
    return new VaultAnnotation(
      fields.url,
      fields.notes,
      fields.labels ?? {},
      new Date(),
    );
  }

  static fromData(data: VaultAnnotationData): VaultAnnotation {
    return new VaultAnnotation(
      data.url,
      data.notes,
      data.labels ?? {},
      new Date(data.updatedAt),
    );
  }

  toData(): VaultAnnotationData {
    const data: VaultAnnotationData = {
      updatedAt: this.updatedAt.toISOString(),
    };
    if (this.url !== undefined) data.url = this.url;
    if (this.notes !== undefined) data.notes = this.notes;
    if (Object.keys(this.labels).length > 0) {
      data.labels = { ...this.labels };
    }
    return data;
  }

  merge(updates: {
    url?: string;
    notes?: string;
    labels?: Record<string, string>;
  }): VaultAnnotation {
    return new VaultAnnotation(
      updates.url !== undefined ? updates.url : this.url,
      updates.notes !== undefined ? updates.notes : this.notes,
      { ...this.labels, ...(updates.labels ?? {}) },
      new Date(),
    );
  }

  isEmpty(): boolean {
    return this.url === undefined &&
      this.notes === undefined &&
      Object.keys(this.labels).length === 0;
  }
}

export interface VaultAnnotationProvider {
  getAnnotation(secretKey: string): Promise<VaultAnnotation | null>;
  putAnnotation(
    secretKey: string,
    annotation: VaultAnnotation,
  ): Promise<void>;
  deleteAnnotation(secretKey: string): Promise<void>;
  listAnnotations(): Promise<Map<string, VaultAnnotation>>;
}

const TAG_PREFIX = "swamp.";
const TAG_URL = `${TAG_PREFIX}url`;
const TAG_NOTES = `${TAG_PREFIX}notes`;
const TAG_UPDATED_AT = `${TAG_PREFIX}updatedAt`;
const TAG_LABEL_PREFIX = `${TAG_PREFIX}label.`;

function tagsToAnnotation(
  tags: Record<string, string> | undefined,
): VaultAnnotation | null {
  if (!tags) return null;

  const hasSwampTags = Object.keys(tags).some((k) => k.startsWith(TAG_PREFIX));
  if (!hasSwampTags) return null;

  const labels: Record<string, string> = {};
  for (const [key, value] of Object.entries(tags)) {
    if (key.startsWith(TAG_LABEL_PREFIX)) {
      labels[key.slice(TAG_LABEL_PREFIX.length)] = value;
    }
  }

  return new VaultAnnotation(
    tags[TAG_URL],
    tags[TAG_NOTES],
    labels,
    tags[TAG_UPDATED_AT] ? new Date(tags[TAG_UPDATED_AT]) : new Date(),
  );
}

const MAX_AZURE_TAGS = 15;

function annotationToTags(
  annotation: VaultAnnotation,
  existingTags: Record<string, string> | undefined,
): Record<string, string> {
  const tags: Record<string, string> = {};

  // Preserve non-swamp tags
  if (existingTags) {
    for (const [key, value] of Object.entries(existingTags)) {
      if (!key.startsWith(TAG_PREFIX)) {
        tags[key] = value;
      }
    }
  }

  if (annotation.url !== undefined) tags[TAG_URL] = annotation.url;
  if (annotation.notes !== undefined) tags[TAG_NOTES] = annotation.notes;
  tags[TAG_UPDATED_AT] = annotation.updatedAt.toISOString();

  for (const [key, value] of Object.entries(annotation.labels)) {
    tags[`${TAG_LABEL_PREFIX}${key}`] = value;
  }

  if (Object.keys(tags).length > MAX_AZURE_TAGS) {
    throw new Error(
      `Annotation would produce ${Object.keys(tags).length} tags, ` +
        `exceeding Azure Key Vault's limit of ${MAX_AZURE_TAGS}. ` +
        `Reduce the number of labels.`,
    );
  }

  return tags;
}

function stripAnnotationTags(
  tags: Record<string, string> | undefined,
): Record<string, string> {
  if (!tags) return {};
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(tags)) {
    if (!key.startsWith(TAG_PREFIX)) {
      result[key] = value;
    }
  }
  return result;
}

function toAzureSecretName(name: string): string {
  return name.replace(/[/_]/g, "-");
}

class AzureKvVaultProvider implements VaultProvider, VaultAnnotationProvider {
  private readonly client: SecretClient;
  private readonly name: string;
  private readonly secretPrefix: string;

  constructor(
    name: string,
    config: { vault_url: string; secret_prefix?: string },
    credential?: TokenCredential,
    clientOptions?: SecretClientOptions,
  ) {
    this.name = name;
    this.secretPrefix = config.secret_prefix ?? "";
    const cred = credential ?? new DefaultAzureCredential();
    this.client = new SecretClient(config.vault_url, cred, clientOptions);
  }

  async get(secretKey: string): Promise<string> {
    const azureSecretName = toAzureSecretName(
      this.secretPrefix + secretKey,
    );
    const secret = await this.client.getSecret(azureSecretName);

    if (!secret.value) {
      throw new Error(
        `Secret '${secretKey}' in vault '${this.name}' has no value`,
      );
    }

    return secret.value;
  }

  async put(secretKey: string, secretValue: string): Promise<void> {
    const azureSecretName = toAzureSecretName(
      this.secretPrefix + secretKey,
    );
    await this.client.setSecret(azureSecretName, secretValue);
  }

  async list(): Promise<string[]> {
    const secretNames: string[] = [];

    for await (
      const secretProperties of this.client.listPropertiesOfSecrets()
    ) {
      if (secretProperties.name) {
        const name = secretProperties.name;
        if (this.secretPrefix && name.startsWith(this.secretPrefix)) {
          secretNames.push(name.slice(this.secretPrefix.length));
        } else if (!this.secretPrefix) {
          secretNames.push(name);
        }
      }
    }

    return secretNames.sort();
  }

  getName(): string {
    return this.name;
  }

  async getAnnotation(secretKey: string): Promise<VaultAnnotation | null> {
    const azureSecretName = toAzureSecretName(
      this.secretPrefix + secretKey,
    );
    try {
      const secret = await this.client.getSecret(azureSecretName);
      return tagsToAnnotation(
        secret.properties.tags as Record<string, string> | undefined,
      );
    } catch (error) {
      throw new Error(
        `Failed to read annotation for '${secretKey}': ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  // Read-modify-write: not atomic. Concurrent writers to the same secret
  // can silently overwrite each other's annotation changes.
  async putAnnotation(
    secretKey: string,
    annotation: VaultAnnotation,
  ): Promise<void> {
    const azureSecretName = toAzureSecretName(
      this.secretPrefix + secretKey,
    );
    try {
      const secret = await this.client.getSecret(azureSecretName);
      const version = secret.properties.version;
      if (!version) {
        throw new Error(`Secret '${secretKey}' has no version`);
      }
      const existingTags = secret.properties.tags as
        | Record<string, string>
        | undefined;
      const newTags = annotationToTags(annotation, existingTags);
      await this.client.updateSecretProperties(
        azureSecretName,
        version,
        { tags: newTags },
      );
    } catch (error) {
      throw new Error(
        `Failed to write annotation for '${secretKey}': ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  async deleteAnnotation(secretKey: string): Promise<void> {
    const azureSecretName = toAzureSecretName(
      this.secretPrefix + secretKey,
    );
    try {
      const secret = await this.client.getSecret(azureSecretName);
      const version = secret.properties.version;
      if (!version) {
        throw new Error(`Secret '${secretKey}' has no version`);
      }
      const existingTags = secret.properties.tags as
        | Record<string, string>
        | undefined;
      const cleaned = stripAnnotationTags(existingTags);
      await this.client.updateSecretProperties(
        azureSecretName,
        version,
        { tags: cleaned },
      );
    } catch (error) {
      throw new Error(
        `Failed to delete annotation for '${secretKey}': ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  async listAnnotations(): Promise<Map<string, VaultAnnotation>> {
    const annotations = new Map<string, VaultAnnotation>();
    try {
      for await (
        const secretProperties of this.client.listPropertiesOfSecrets()
      ) {
        if (secretProperties.name) {
          const annotation = tagsToAnnotation(
            secretProperties.tags as Record<string, string> | undefined,
          );
          if (annotation) {
            let keyName = secretProperties.name;
            if (
              this.secretPrefix && keyName.startsWith(this.secretPrefix)
            ) {
              keyName = keyName.slice(this.secretPrefix.length);
            } else if (this.secretPrefix) {
              continue;
            }
            annotations.set(keyName, annotation);
          }
        }
      }
    } catch (error) {
      throw new Error(
        `Failed to list annotations in vault '${this.name}': ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
    return annotations;
  }
}

export const vault = {
  type: "@swamp/azure-kv",
  name: "Azure Key Vault",
  description:
    "Azure Key Vault vault provider. Uses DefaultAzureCredential for authentication.",
  configSchema: z.object({
    // deno-fmt-ignore
    vault_url: z.string().url("Azure Key Vault URL is required").describe("Full URL of the Azure Key Vault e.g. https://my-vault.vault.azure.net"),
    // deno-fmt-ignore
    secret_prefix: z.string().optional().describe("Optional prefix to namespace secrets within the vault e.g. swamp- to scope all reads and writes"),
  }),
  createProvider(
    name: string,
    config: Record<string, unknown>,
  ): VaultProvider & VaultAnnotationProvider {
    const parsed = vault.configSchema.parse(config);
    return new AzureKvVaultProvider(name, parsed);
  },
};

export function _createTestProvider(
  name: string,
  config: { vault_url: string; secret_prefix?: string },
  credential: TokenCredential,
  clientOptions?: SecretClientOptions,
): VaultProvider & VaultAnnotationProvider {
  return new AzureKvVaultProvider(name, config, credential, clientOptions);
}
