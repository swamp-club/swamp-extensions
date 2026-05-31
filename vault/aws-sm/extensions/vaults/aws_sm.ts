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
  DescribeSecretCommand,
  GetSecretValueCommand,
  ListSecretsCommand,
  PutSecretValueCommand,
  SecretsManagerClient,
  TagResourceCommand,
  UntagResourceCommand,
  UpdateSecretCommand,
} from "npm:@aws-sdk/client-secrets-manager@3.1053.0";
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

export interface VaultAnnotationData {
  url?: string;
  notes?: string;
  labels?: Record<string, string>;
  updatedAt: string;
}

export interface VaultAnnotation {
  readonly url: string | undefined;
  readonly notes: string | undefined;
  readonly labels: Readonly<Record<string, string>>;
  readonly updatedAt: Date;
  toData(): VaultAnnotationData;
  merge(updates: {
    url?: string;
    notes?: string;
    labels?: Record<string, string>;
  }): VaultAnnotation;
  isEmpty(): boolean;
}

export function createVaultAnnotation(fields: {
  url?: string;
  notes?: string;
  labels?: Record<string, string>;
  updatedAt?: Date;
}): VaultAnnotation {
  const url = fields.url;
  const notes = fields.notes;
  const labels = Object.freeze({ ...fields.labels });
  const updatedAt = fields.updatedAt ?? new Date();
  return {
    url,
    notes,
    labels,
    updatedAt,
    toData(): VaultAnnotationData {
      const data: VaultAnnotationData = {
        updatedAt: updatedAt.toISOString(),
      };
      if (url !== undefined) data.url = url;
      if (notes !== undefined) data.notes = notes;
      if (Object.keys(labels).length > 0) {
        data.labels = { ...labels };
      }
      return data;
    },
    merge(updates: {
      url?: string;
      notes?: string;
      labels?: Record<string, string>;
    }): VaultAnnotation {
      return createVaultAnnotation({
        url: updates.url !== undefined ? updates.url : url,
        notes: updates.notes !== undefined ? updates.notes : notes,
        labels: updates.labels !== undefined
          ? { ...labels, ...updates.labels }
          : { ...labels },
      });
    },
    isEmpty(): boolean {
      return url === undefined &&
        notes === undefined &&
        Object.keys(labels).length === 0;
    },
  };
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

// Legacy tag key: the annotation URL used to be stored as this tag. We no
// longer WRITE it — AWS tag values reject URL characters like `?` and `&`, so
// query-string URLs failed (issue #495). The URL now lives in the secret
// Description (see composeDescription). This key is retained read-only so
// annotations created before the change keep their URL.
const LEGACY_SWAMP_URL_TAG_KEY = "swamp:url";

// Sentinel prefix for the URL trailer line appended to the secret Description.
const URL_TRAILER_PREFIX = "swamp:url=";

/**
 * Serialize `notes` and `url` into a single secret Description string. The URL
 * is appended as a trailing `swamp:url=<url>` line so it stays human-readable
 * in the AWS console — unlike a tag value, the Description accepts any
 * character. Returns `undefined` when there is nothing to store.
 */
function composeDescription(
  notes: string | undefined,
  url: string | undefined,
): string | undefined {
  const trailer = url !== undefined ? `${URL_TRAILER_PREFIX}${url}` : undefined;
  if (notes !== undefined && trailer !== undefined) {
    return `${notes}\n\n${trailer}`;
  }
  if (trailer !== undefined) return trailer;
  return notes;
}

/**
 * Inverse of {@link composeDescription}. Recovers `{ notes, url }` from a
 * Description. The URL is taken from a trailing `swamp:url=<url>` line when
 * present; everything before it (minus the single `\n\n` separator that
 * composeDescription inserts) is returned verbatim as `notes`, so the
 * round-trip is lossless.
 *
 * Known limitation: a note whose final line is literally `swamp:url=<x>` is
 * misread as the URL. The in-band sentinel cannot avoid this without an
 * out-of-band store; the probability is vanishingly low.
 */
function parseDescription(
  description: string | undefined,
): { notes: string | undefined; url: string | undefined } {
  if (description === undefined || description === "") {
    return { notes: undefined, url: undefined };
  }
  const lastNewline = description.lastIndexOf("\n");
  const lastLine = description.slice(lastNewline + 1);
  if (!lastLine.startsWith(URL_TRAILER_PREFIX)) {
    return { notes: description, url: undefined };
  }
  const url = lastLine.slice(URL_TRAILER_PREFIX.length);
  if (lastNewline === -1) {
    // Description is exactly the trailer: URL only, no notes.
    return { notes: undefined, url };
  }
  // Strip the single `\n\n` separator composeDescription inserted: `lastNewline`
  // is its second `\n`; drop the first too when present.
  const notesEnd = description[lastNewline - 1] === "\n"
    ? lastNewline - 1
    : lastNewline;
  const notes = description.slice(0, notesEnd);
  return { notes: notes === "" ? undefined : notes, url };
}

/**
 * Derive annotation fields from a secret's Description and Tags. Centralizes
 * the read path so getAnnotation, listAnnotations, and putAnnotation's
 * read-modify-write stay consistent. The URL comes from the Description; if
 * absent there, it falls back to the legacy `swamp:url` tag (Description wins
 * when both are present). Non-`aws:` / non-legacy tags become labels.
 */
function readAnnotationFields(
  description: string | undefined,
  tags: { Key?: string; Value?: string | null }[],
): {
  notes: string | undefined;
  url: string | undefined;
  labels: Record<string, string>;
} {
  const { notes, url: descriptionUrl } = parseDescription(description);
  let url = descriptionUrl;
  const labels: Record<string, string> = {};
  for (const tag of tags) {
    if (!tag.Key) continue;
    if (tag.Key === LEGACY_SWAMP_URL_TAG_KEY) {
      if (url === undefined) url = tag.Value ?? undefined;
    } else if (!tag.Key.startsWith("aws:")) {
      labels[tag.Key] = tag.Value ?? "";
    }
  }
  return { notes, url, labels };
}

class AwsSmVaultProvider implements VaultProvider, VaultAnnotationProvider {
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

  async getAnnotation(secretKey: string): Promise<VaultAnnotation | null> {
    let response;
    try {
      response = await this.client.send(
        new DescribeSecretCommand({ SecretId: secretKey }),
      );
    } catch (error) {
      throw wrapAwsSmError("DescribeSecret", error);
    }

    const { notes, url, labels } = readAnnotationFields(
      response.Description || undefined,
      response.Tags ?? [],
    );

    const hasAnnotation = notes !== undefined ||
      url !== undefined ||
      Object.keys(labels).length > 0;
    if (!hasAnnotation) return null;

    return createVaultAnnotation({
      url,
      notes,
      labels: Object.keys(labels).length > 0 ? labels : undefined,
      updatedAt: response.LastChangedDate ?? undefined,
    });
  }

  async putAnnotation(
    secretKey: string,
    annotation: VaultAnnotation,
  ): Promise<void> {
    // notes and url share the secret Description, so a partial update (e.g.
    // only --url or only --notes) must read-modify-write to avoid clobbering
    // the field the caller didn't set. Read the existing annotation first,
    // recovering url from the Description or — for not-yet-migrated secrets —
    // the legacy swamp:url tag.
    let existing;
    try {
      existing = await this.client.send(
        new DescribeSecretCommand({ SecretId: secretKey }),
      );
    } catch (error) {
      throw wrapAwsSmError("DescribeSecret", error);
    }
    const current = readAnnotationFields(
      existing.Description || undefined,
      existing.Tags ?? [],
    );

    const notes = annotation.notes !== undefined
      ? annotation.notes
      : current.notes;
    const url = annotation.url !== undefined ? annotation.url : current.url;
    const description = composeDescription(notes, url) ?? "";

    // Pass only SecretId and Description, never SecretString/SecretBinary, to
    // avoid rotating the secret value. Skip the write when nothing changed so a
    // labels-only update doesn't needlessly rewrite the Description.
    if (description !== (existing.Description ?? "")) {
      try {
        await this.client.send(
          new UpdateSecretCommand({
            SecretId: secretKey,
            Description: description,
          }),
        );
      } catch (error) {
        throw wrapAwsSmError("UpdateSecret", error);
      }
    }

    // Labels are stored as tags. url is intentionally NOT written as a tag —
    // AWS tag values reject URL characters; it lives in the Description above.
    const tagsToSet: { Key: string; Value: string }[] = [];
    if (annotation.labels) {
      for (const [key, value] of Object.entries(annotation.labels)) {
        tagsToSet.push({ Key: key, Value: value });
      }
    }

    if (tagsToSet.length > 0) {
      try {
        await this.client.send(
          new TagResourceCommand({
            SecretId: secretKey,
            Tags: tagsToSet,
          }),
        );
      } catch (error) {
        throw wrapAwsSmError("TagResource", error);
      }
    }
  }

  async deleteAnnotation(secretKey: string): Promise<void> {
    try {
      await this.client.send(
        new UpdateSecretCommand({
          SecretId: secretKey,
          Description: "",
        }),
      );
    } catch (error) {
      throw wrapAwsSmError("UpdateSecret", error);
    }

    let response;
    try {
      response = await this.client.send(
        new DescribeSecretCommand({ SecretId: secretKey }),
      );
    } catch (error) {
      throw wrapAwsSmError("DescribeSecret", error);
    }

    const tagKeysToRemove: string[] = [];
    for (const tag of response.Tags ?? []) {
      if (!tag.Key) continue;
      if (tag.Key === LEGACY_SWAMP_URL_TAG_KEY || !tag.Key.startsWith("aws:")) {
        tagKeysToRemove.push(tag.Key);
      }
    }

    if (tagKeysToRemove.length > 0) {
      try {
        await this.client.send(
          new UntagResourceCommand({
            SecretId: secretKey,
            TagKeys: tagKeysToRemove,
          }),
        );
      } catch (error) {
        throw wrapAwsSmError("UntagResource", error);
      }
    }
  }

  async listAnnotations(): Promise<Map<string, VaultAnnotation>> {
    const annotations = new Map<string, VaultAnnotation>();
    let nextToken: string | undefined;

    do {
      let response;
      try {
        response = await this.client.send(
          new ListSecretsCommand({ NextToken: nextToken }),
        );
      } catch (error) {
        throw wrapAwsSmError("ListSecrets", error);
      }

      for (const secret of response.SecretList ?? []) {
        if (!secret.Name) continue;

        const { notes, url, labels } = readAnnotationFields(
          secret.Description || undefined,
          secret.Tags ?? [],
        );

        const hasAnnotation = notes !== undefined ||
          url !== undefined ||
          Object.keys(labels).length > 0;
        if (hasAnnotation) {
          annotations.set(
            secret.Name,
            createVaultAnnotation({
              url,
              notes,
              labels: Object.keys(labels).length > 0 ? labels : undefined,
              updatedAt: secret.LastChangedDate ?? undefined,
            }),
          );
        }
      }

      nextToken = response.NextToken;
    } while (nextToken);

    return annotations;
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
