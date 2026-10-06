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

/**
 * Swamp vault provider backed by 1Password.
 *
 * Delegates all secret operations to the official `op` CLI. By default the
 * provider inherits whichever authentication mechanism `op` is configured with
 * (service account token, desktop app, or Connect server). When
 * `op_service_account_token_file` is set, the service account token is read
 * from that file on each `op` call and passed only to the `op` child process,
 * never to the swamp process environment. Use this
 * entrypoint when a swamp deployment should store its secrets in 1Password.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { SpanStatusCode } from "npm:@opentelemetry/api@1.9.0";
import { Attr, getTracer } from "./_lib/tracing.ts";

/**
 * Minimal contract implemented by swamp vault providers. Exported so that
 * downstream consumers and tests can type-check against a public interface
 * rather than an inferred shape.
 */
export interface VaultPutOptions {
  tags?: Record<string, string>;
}

export interface VaultProvider {
  /** Fetches the current value of the given secret. */
  get(secretKey: string): Promise<string>;
  /** Writes a new value for the given secret, creating it if it does not exist. */
  put(
    secretKey: string,
    secretValue: string,
    options?: VaultPutOptions,
  ): Promise<void>;
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

export class VaultAnnotation {
  readonly url: string | undefined;
  readonly notes: string | undefined;
  readonly labels: Readonly<Record<string, string>>;
  readonly updatedAt: Date;

  private constructor(
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
      updates.labels !== undefined
        ? { ...this.labels, ...updates.labels }
        : { ...this.labels },
      new Date(),
    );
  }

  isEmpty(): boolean {
    return this.url === undefined &&
      this.notes === undefined &&
      Object.keys(this.labels).length === 0;
  }
}

const SWAMP_ANNOTATIONS_SECTION = "swamp-annotations";
const SWAMP_LABELS_SECTION = "swamp-labels";

const INVALID_LABEL_KEY_PATTERN = /[.\[\]\/\\=]/;

function validateLabelKey(key: string): void {
  if (!key) {
    throw new Error("Label key must not be empty.");
  }
  if (INVALID_LABEL_KEY_PATTERN.test(key)) {
    throw new Error(
      `Invalid label key '${key}': label keys must not contain dots, brackets, slashes, backslashes, or equals signs ` +
        `because these characters conflict with the 1Password CLI field reference syntax.`,
    );
  }
}

interface OpItemField {
  id: string;
  type: string;
  label: string;
  value: string;
  purpose?: string;
  section?: { id: string; label?: string };
}

interface OpItem {
  id: string;
  title: string;
  category: string;
  updated_at?: string;
  urls?: Array<{ label?: string; primary?: boolean; href: string }>;
  sections?: Array<{ id: string; label: string }>;
  fields?: OpItemField[];
}

interface ParsedSecretKey {
  item: string;
  field: string;
  isFullUri: boolean;
  uri: string;
}

function parseSecretKey(secretKey: string, opVault: string): ParsedSecretKey {
  if (secretKey.startsWith("op://")) {
    const uriPath = secretKey.slice("op://".length);
    const parts = uriPath.split("/");
    const item = parts[1] ?? "";
    const field = parts.slice(2).join("/") || "password";
    return { item, field, isFullUri: true, uri: secretKey };
  }

  const slashIndex = secretKey.indexOf("/");
  if (slashIndex === -1) {
    return {
      item: secretKey,
      field: "password",
      isFullUri: false,
      uri: `op://${opVault}/${secretKey}/password`,
    };
  }

  const item = secretKey.slice(0, slashIndex);
  const field = secretKey.slice(slashIndex + 1);
  return {
    item,
    field,
    isFullUri: false,
    uri: `op://${opVault}/${secretKey}`,
  };
}

class OnePasswordVaultProvider implements VaultProvider {
  private readonly name: string;
  private readonly opVault: string;
  private readonly opAccount: string | undefined;
  private readonly tokenFile: string | undefined;
  private opInstalled: boolean | undefined;

  constructor(
    name: string,
    config: {
      op_vault: string;
      op_account?: string;
      op_service_account_token_file?: string;
    },
  ) {
    this.name = name;
    this.opVault = config.op_vault;
    this.opAccount = config.op_account;
    this.tokenFile = config.op_service_account_token_file;
  }

  async get(secretKey: string): Promise<string> {
    return await getTracer().startActiveSpan("1password get", async (span) => {
      span.setAttributes({
        [Attr.RPC_SYSTEM]: "op-cli",
        [Attr.RPC_SERVICE]: "1Password",
        [Attr.RPC_METHOD]: "read",
        [Attr.VAULT_NAME]: this.name,
        [Attr.VAULT_SECRET_KEY]: secretKey,
      });
      try {
        await this.checkOpInstalled();
        const parsed = parseSecretKey(secretKey, this.opVault);
        const args = ["read", parsed.uri];
        if (this.opAccount) {
          args.push("--account", this.opAccount);
        }
        const result = await this.runOp(args);
        return result.replace(/\n$/, "");
      } catch (err) {
        if (err instanceof Error) {
          span.setStatus({ code: SpanStatusCode.ERROR, message: err.message });
          span.recordException(err);
          span.setAttribute(Attr.ERROR_TYPE, err.name);
        }
        throw err;
      } finally {
        span.end();
      }
    });
  }

  async put(
    secretKey: string,
    secretValue: string,
    options?: VaultPutOptions,
  ): Promise<void> {
    return await getTracer().startActiveSpan("1password put", async (span) => {
      span.setAttributes({
        [Attr.RPC_SYSTEM]: "op-cli",
        [Attr.RPC_SERVICE]: "1Password",
        [Attr.RPC_METHOD]: "put",
        [Attr.VAULT_NAME]: this.name,
        [Attr.VAULT_SECRET_KEY]: secretKey,
      });
      try {
        await this.checkOpInstalled();
        const parsed = parseSecretKey(secretKey, this.opVault);

        if (parsed.isFullUri) {
          throw new Error(
            "Cannot use full op:// URI for put operations. Use a relative key (e.g., 'item-name' or 'item-name/field').",
          );
        }

        const tags = options?.tags;
        if (tags) {
          for (const key of Object.keys(tags)) {
            validateLabelKey(key);
          }
        }

        if (secretValue.includes('"')) {
          await this.putViaTemplate(parsed, secretValue, tags);
        } else {
          await this.putViaFieldAssignment(parsed, secretValue, tags);
        }
      } catch (err) {
        if (err instanceof Error) {
          span.setStatus({ code: SpanStatusCode.ERROR, message: err.message });
          span.recordException(err);
          span.setAttribute(Attr.ERROR_TYPE, err.name);
        }
        throw err;
      } finally {
        span.end();
      }
    });
  }

  private async putViaFieldAssignment(
    parsed: ParsedSecretKey,
    secretValue: string,
    tags?: Record<string, string>,
  ): Promise<void> {
    const editField = parsed.field.replace(/\//g, ".");
    const itemExists = await this.itemExists(parsed.item);

    const tagArgs: string[] = [];
    if (tags) {
      for (const [key, value] of Object.entries(tags)) {
        tagArgs.push(`${SWAMP_LABELS_SECTION}.${key}[text]=${value}`);
      }
    }

    if (itemExists) {
      const args = [
        "item",
        "edit",
        parsed.item,
        `${editField}=${secretValue}`,
        ...tagArgs,
        "--vault",
        this.opVault,
      ];
      if (this.opAccount) {
        args.push("--account", this.opAccount);
      }
      await this.runOp(args);
    } else {
      const args = [
        "item",
        "create",
        "--category",
        "Secure Note",
        "--title",
        parsed.item,
        `${editField}=${secretValue}`,
        ...tagArgs,
        "--vault",
        this.opVault,
      ];
      if (this.opAccount) {
        args.push("--account", this.opAccount);
      }
      await this.runOp(args);
    }
  }

  private async putViaTemplate(
    parsed: ParsedSecretKey,
    secretValue: string,
    tags?: Record<string, string>,
  ): Promise<void> {
    const existingItem = await this.getItemJson(parsed.item);
    const templatePath = Deno.makeTempFileSync({ suffix: ".json" });
    try {
      if (existingItem) {
        const fields = existingItem.fields ?? [];
        const editField = parsed.field.replace(/\//g, ".");
        const dotIdx = editField.indexOf(".");
        let found = false;

        if (dotIdx >= 0) {
          const sectionLabel = editField.slice(0, dotIdx);
          const fieldLabel = editField.slice(dotIdx + 1);
          let section = existingItem.sections?.find(
            (s) => s.label === sectionLabel,
          );
          if (!section) {
            const sectionId = `section-${sectionLabel}`;
            section = { id: sectionId, label: sectionLabel };
            existingItem.sections = existingItem.sections ?? [];
            existingItem.sections.push(section);
          }
          for (const f of fields) {
            if (f.section?.id === section.id && f.label === fieldLabel) {
              f.value = secretValue;
              found = true;
              break;
            }
          }
          if (!found) {
            fields.push({
              id: `${section.id}-${fieldLabel}`,
              type: "STRING",
              label: fieldLabel,
              value: secretValue,
              section: { id: section.id },
            });
          }
        } else {
          for (const f of fields) {
            if (f.label === editField) {
              f.value = secretValue;
              found = true;
              break;
            }
          }
          if (!found) {
            fields.push({
              id: editField,
              type: "STRING",
              label: editField,
              value: secretValue,
            });
          }
        }

        existingItem.fields = fields;

        if (tags) {
          const sectionId = `section-${SWAMP_LABELS_SECTION}`;
          let section = existingItem.sections?.find(
            (s: { id: string }) => s.id === sectionId,
          );
          if (!section) {
            section = { id: sectionId, label: SWAMP_LABELS_SECTION };
            existingItem.sections = existingItem.sections ?? [];
            existingItem.sections.push(section);
          }
          for (const [key, value] of Object.entries(tags)) {
            const existing = fields.find(
              (f: OpItemField) =>
                f.section?.id === sectionId && f.label === key,
            );
            if (existing) {
              existing.value = value;
            } else {
              fields.push({
                id: `${sectionId}-${key}`,
                type: "STRING",
                label: key,
                value,
                section: { id: sectionId },
              });
            }
          }
        }

        Deno.writeTextFileSync(templatePath, JSON.stringify(existingItem));

        const args = [
          "item",
          "edit",
          parsed.item,
          `--template=${templatePath}`,
          "--vault",
          this.opVault,
        ];
        if (this.opAccount) {
          args.push("--account", this.opAccount);
        }
        await this.runOp(args);
      } else {
        const editField = parsed.field.replace(/\//g, ".");
        const dotIdx = editField.indexOf(".");
        const fields: OpItemField[] = [];
        const sections: Array<{ id: string; label: string }> = [];

        if (dotIdx >= 0) {
          const sectionLabel = editField.slice(0, dotIdx);
          const fieldLabel = editField.slice(dotIdx + 1);
          const sectionId = `section-${sectionLabel}`;
          sections.push({ id: sectionId, label: sectionLabel });
          fields.push({
            id: `${sectionId}-${fieldLabel}`,
            type: "STRING",
            label: fieldLabel,
            value: secretValue,
            section: { id: sectionId },
          });
        } else {
          fields.push({
            id: editField,
            type: "STRING",
            label: editField,
            value: secretValue,
          });
        }

        if (tags) {
          const sectionId = `section-${SWAMP_LABELS_SECTION}`;
          sections.push({ id: sectionId, label: SWAMP_LABELS_SECTION });
          for (const [key, value] of Object.entries(tags)) {
            fields.push({
              id: `${sectionId}-${key}`,
              type: "STRING",
              label: key,
              value,
              section: { id: sectionId },
            });
          }
        }

        const template = {
          title: parsed.item,
          category: "SECURE_NOTE",
          sections,
          fields,
        };

        Deno.writeTextFileSync(templatePath, JSON.stringify(template));

        const args = [
          "item",
          "create",
          `--template=${templatePath}`,
          "--vault",
          this.opVault,
        ];
        if (this.opAccount) {
          args.push("--account", this.opAccount);
        }
        await this.runOp(args);
      }
    } finally {
      try {
        Deno.removeSync(templatePath);
      } catch {
        // Best-effort cleanup
      }
    }
  }

  async delete(secretKey: string): Promise<void> {
    return await getTracer().startActiveSpan(
      "1password delete",
      async (span) => {
        span.setAttributes({
          [Attr.RPC_SYSTEM]: "op-cli",
          [Attr.RPC_SERVICE]: "1Password",
          [Attr.RPC_METHOD]: "item delete",
          [Attr.VAULT_NAME]: this.name,
          [Attr.VAULT_SECRET_KEY]: secretKey,
        });
        try {
          await this.checkOpInstalled();
          const parsed = parseSecretKey(secretKey, this.opVault);

          if (parsed.isFullUri) {
            throw new Error(
              "Cannot use full op:// URI for delete operations. Use a relative key (e.g., 'item-name' or 'item-name/field').",
            );
          }

          const args = [
            "item",
            "delete",
            parsed.item,
            "--vault",
            this.opVault,
          ];
          if (this.opAccount) {
            args.push("--account", this.opAccount);
          }

          try {
            await this.runOp(args);
          } catch (error: unknown) {
            if (
              error instanceof Error &&
              error.message.includes("not found") &&
              !error.message.startsWith("1Password vault")
            ) {
              return;
            }
            throw error;
          }
        } catch (err) {
          if (err instanceof Error) {
            span.setStatus({
              code: SpanStatusCode.ERROR,
              message: err.message,
            });
            span.recordException(err);
            span.setAttribute(Attr.ERROR_TYPE, err.name);
          }
          throw err;
        } finally {
          span.end();
        }
      },
    );
  }

  async list(): Promise<string[]> {
    return await getTracer().startActiveSpan("1password list", async (span) => {
      span.setAttributes({
        [Attr.RPC_SYSTEM]: "op-cli",
        [Attr.RPC_SERVICE]: "1Password",
        [Attr.RPC_METHOD]: "item list",
        [Attr.VAULT_NAME]: this.name,
      });
      try {
        await this.checkOpInstalled();
        const args = [
          "item",
          "list",
          "--vault",
          this.opVault,
          "--format",
          "json",
        ];
        if (this.opAccount) {
          args.push("--account", this.opAccount);
        }

        const result = await this.runOp(args);
        if (!result.trim()) {
          return [];
        }
        const items: Array<{ title: string }> = JSON.parse(result);
        return items.map((item) => item.title).sort();
      } catch (err) {
        if (err instanceof Error) {
          span.setStatus({ code: SpanStatusCode.ERROR, message: err.message });
          span.recordException(err);
          span.setAttribute(Attr.ERROR_TYPE, err.name);
        }
        throw err;
      } finally {
        span.end();
      }
    });
  }

  getName(): string {
    return this.name;
  }

  async getAnnotation(
    secretKey: string,
  ): Promise<VaultAnnotation | null> {
    return await getTracer().startActiveSpan(
      "1password getAnnotation",
      async (span) => {
        span.setAttributes({
          [Attr.RPC_SYSTEM]: "op-cli",
          [Attr.RPC_SERVICE]: "1Password",
          [Attr.RPC_METHOD]: "getAnnotation",
          [Attr.VAULT_NAME]: this.name,
          [Attr.VAULT_SECRET_KEY]: secretKey,
        });
        try {
          await this.checkOpInstalled();
          const parsed = parseSecretKey(secretKey, this.opVault);
          const item = await this.getItemJson(parsed.item);
          if (!item) return null;

          let url: string | undefined;
          let notes: string | undefined;
          const labels: Record<string, string> = {};

          if (item.fields) {
            const annotationsSection = item.sections?.find(
              (s) => s.label === SWAMP_ANNOTATIONS_SECTION,
            );
            const labelsSection = item.sections?.find(
              (s) => s.label === SWAMP_LABELS_SECTION,
            );

            for (const field of item.fields) {
              if (field.purpose === "NOTES" && field.value) {
                notes = field.value;
              }
              if (
                annotationsSection &&
                field.section?.id === annotationsSection.id &&
                field.label === "url" && field.value
              ) {
                url = field.value;
              }
              if (
                labelsSection && field.section?.id === labelsSection.id &&
                field.label && field.value
              ) {
                labels[field.label] = field.value;
              }
            }
          }

          if (
            url === undefined && notes === undefined &&
            Object.keys(labels).length === 0
          ) {
            return null;
          }

          if (item.updated_at) {
            return VaultAnnotation.fromData({
              url,
              notes,
              labels,
              updatedAt: item.updated_at,
            });
          }
          return VaultAnnotation.create({ url, notes, labels });
        } catch (err) {
          if (err instanceof Error) {
            span.setStatus({
              code: SpanStatusCode.ERROR,
              message: err.message,
            });
            span.recordException(err);
            span.setAttribute(Attr.ERROR_TYPE, err.name);
          }
          throw err;
        } finally {
          span.end();
        }
      },
    );
  }

  async putAnnotation(
    secretKey: string,
    annotation: {
      url?: string;
      notes?: string;
      labels?: Readonly<Record<string, string>>;
    },
  ): Promise<void> {
    return await getTracer().startActiveSpan(
      "1password putAnnotation",
      async (span) => {
        span.setAttributes({
          [Attr.RPC_SYSTEM]: "op-cli",
          [Attr.RPC_SERVICE]: "1Password",
          [Attr.RPC_METHOD]: "putAnnotation",
          [Attr.VAULT_NAME]: this.name,
          [Attr.VAULT_SECRET_KEY]: secretKey,
        });
        try {
          await this.checkOpInstalled();
          const parsed = parseSecretKey(secretKey, this.opVault);

          if (annotation.labels) {
            for (const key of Object.keys(annotation.labels)) {
              validateLabelKey(key);
            }
          }

          const fieldArgs: string[] = [];

          if (annotation.url !== undefined) {
            fieldArgs.push(
              `${SWAMP_ANNOTATIONS_SECTION}.url[url]=${annotation.url}`,
            );
          }

          if (annotation.notes !== undefined) {
            fieldArgs.push(`notesPlain=${annotation.notes}`);
          }

          if (annotation.labels) {
            for (const [key, value] of Object.entries(annotation.labels)) {
              fieldArgs.push(
                `${SWAMP_LABELS_SECTION}.${key}[text]=${value}`,
              );
            }
          }

          if (fieldArgs.length === 0) return;

          const args: string[] = [
            "item",
            "edit",
            parsed.item,
            "--vault",
            this.opVault,
            ...fieldArgs,
          ];

          if (this.opAccount) {
            args.push("--account", this.opAccount);
          }

          await this.runOp(args);
        } catch (err) {
          if (err instanceof Error) {
            span.setStatus({
              code: SpanStatusCode.ERROR,
              message: err.message,
            });
            span.recordException(err);
            span.setAttribute(Attr.ERROR_TYPE, err.name);
          }
          throw err;
        } finally {
          span.end();
        }
      },
    );
  }

  async deleteAnnotation(secretKey: string): Promise<void> {
    return await getTracer().startActiveSpan(
      "1password deleteAnnotation",
      async (span) => {
        span.setAttributes({
          [Attr.RPC_SYSTEM]: "op-cli",
          [Attr.RPC_SERVICE]: "1Password",
          [Attr.RPC_METHOD]: "deleteAnnotation",
          [Attr.VAULT_NAME]: this.name,
          [Attr.VAULT_SECRET_KEY]: secretKey,
        });
        try {
          await this.checkOpInstalled();
          const parsed = parseSecretKey(secretKey, this.opVault);

          const item = await this.getItemJson(parsed.item);
          if (!item) return;

          const args: string[] = [
            "item",
            "edit",
            parsed.item,
            "--vault",
            this.opVault,
          ];
          let hasEdits = false;

          const annotationsSection = item.sections?.find(
            (s) => s.label === SWAMP_ANNOTATIONS_SECTION,
          );
          if (annotationsSection && item.fields) {
            for (const field of item.fields) {
              if (field.section?.id === annotationsSection.id && field.label) {
                args.push(
                  `${SWAMP_ANNOTATIONS_SECTION}.${field.label}[delete]`,
                );
                hasEdits = true;
              }
            }
          }

          const hasNotes = item.fields?.some(
            (f) => f.purpose === "NOTES" && f.value,
          );
          if (hasNotes) {
            args.push("notesPlain=");
            hasEdits = true;
          }

          const labelsSection = item.sections?.find(
            (s) => s.label === SWAMP_LABELS_SECTION,
          );
          if (labelsSection && item.fields) {
            for (const field of item.fields) {
              if (field.section?.id === labelsSection.id && field.label) {
                args.push(`${SWAMP_LABELS_SECTION}.${field.label}[delete]`);
                hasEdits = true;
              }
            }
          }

          if (!hasEdits) return;

          if (this.opAccount) {
            args.push("--account", this.opAccount);
          }

          await this.runOp(args);
        } catch (err) {
          if (err instanceof Error) {
            span.setStatus({
              code: SpanStatusCode.ERROR,
              message: err.message,
            });
            span.recordException(err);
            span.setAttribute(Attr.ERROR_TYPE, err.name);
          }
          throw err;
        } finally {
          span.end();
        }
      },
    );
  }

  async listAnnotations(): Promise<Map<string, VaultAnnotation>> {
    return await getTracer().startActiveSpan(
      "1password listAnnotations",
      async (span) => {
        span.setAttributes({
          [Attr.RPC_SYSTEM]: "op-cli",
          [Attr.RPC_SERVICE]: "1Password",
          [Attr.RPC_METHOD]: "listAnnotations",
          [Attr.VAULT_NAME]: this.name,
        });
        try {
          const annotations = new Map<string, VaultAnnotation>();
          const items = await this.list();
          for (const itemName of items) {
            const annotation = await this.getAnnotation(itemName);
            if (annotation) {
              annotations.set(itemName, annotation);
            }
          }
          return annotations;
        } catch (err) {
          if (err instanceof Error) {
            span.setStatus({
              code: SpanStatusCode.ERROR,
              message: err.message,
            });
            span.recordException(err);
            span.setAttribute(Attr.ERROR_TYPE, err.name);
          }
          throw err;
        } finally {
          span.end();
        }
      },
    );
  }

  private async getItemJson(itemName: string): Promise<OpItem | null> {
    const args = [
      "item",
      "get",
      itemName,
      "--vault",
      this.opVault,
      "--format",
      "json",
    ];
    if (this.opAccount) {
      args.push("--account", this.opAccount);
    }
    try {
      const result = await this.runOp(args);
      return JSON.parse(result) as OpItem;
    } catch {
      return null;
    }
  }

  private async itemExists(itemName: string): Promise<boolean> {
    const args = [
      "item",
      "get",
      itemName,
      "--vault",
      this.opVault,
      "--format",
      "json",
    ];
    if (this.opAccount) {
      args.push("--account", this.opAccount);
    }
    try {
      await this.runOp(args);
      return true;
    } catch {
      return false;
    }
  }

  private async checkOpInstalled(): Promise<void> {
    if (this.opInstalled === true) {
      return;
    }

    try {
      const command = new Deno.Command("op", {
        args: ["--version"],
        stdin: "null",
        stdout: "piped",
        stderr: "piped",
      });
      const { success } = await command.output();
      if (success) {
        this.opInstalled = true;
        return;
      }
    } catch {
      // op not found
    }

    throw new Error(
      "1Password CLI (op) is not installed or not in PATH.\n\n" +
        "Install it from: https://developer.1password.com/docs/cli/get-started/\n\n" +
        "After installing, authenticate using one of:\n" +
        "  - Service account: export OP_SERVICE_ACCOUNT_TOKEN=<token>,\n" +
        "    or set op_service_account_token_file in the vault config\n" +
        "  - Desktop app: enable CLI integration in 1Password settings\n" +
        "  - Connect Server: export OP_CONNECT_HOST and OP_CONNECT_TOKEN",
    );
  }

  /**
   * Builds the extra env for an authenticated `op` child. Returns undefined
   * when no token file is configured, so `op` inherits the process env as
   * before. Otherwise the token is re-read on every call (so rotation needs no
   * restart) and handed only to the child — never set on `Deno.env`, which
   * swamp serve snapshots and ships to remote workers.
   */
  private async buildOpEnv(): Promise<Record<string, string> | undefined> {
    if (this.tokenFile === undefined) {
      return undefined;
    }

    let contents: string;
    try {
      contents = await Deno.readTextFile(this.tokenFile);
    } catch (err) {
      const kind = err instanceof Error ? err.name : "Error";
      throw new Error(
        `Failed to read 1Password service account token file '${this.tokenFile}' (${kind}). ` +
          `op_service_account_token_file must be an absolute path to a readable file.`,
      );
    }

    // trim() also drops a leading byte-order mark, which some editors write.
    const token = contents.trim();
    if (token === "") {
      throw new Error(
        `1Password service account token file '${this.tokenFile}' is empty.`,
      );
    }
    return { OP_SERVICE_ACCOUNT_TOKEN: token };
  }

  private async runOp(args: string[]): Promise<string> {
    const subcommand = args[0] === "item" ? `${args[0]} ${args[1]}` : args[0];
    return await getTracer().startActiveSpan(
      `1password op ${subcommand}`,
      async (span) => {
        span.setAttributes({
          [Attr.RPC_SYSTEM]: "op-cli",
          [Attr.RPC_SERVICE]: "1Password",
          [Attr.RPC_METHOD]: subcommand ?? "unknown",
        });
        try {
          const env = await this.buildOpEnv();
          const command = new Deno.Command("op", {
            args,
            ...(env ? { env } : {}),
            stdin: "null",
            stdout: "piped",
            stderr: "piped",
          });

          const { success, stdout, stderr } = await command.output();
          const stdoutText = new TextDecoder().decode(stdout);
          const stderrText = new TextDecoder().decode(stderr);

          if (!success) {
            const errorMessage = stderrText.trim() || "Unknown error";

            if (
              errorMessage.includes("not signed in") ||
              errorMessage.includes("authorization") ||
              errorMessage.includes("authenticate")
            ) {
              throw new Error(
                `1Password authentication failed.\n\n` +
                  `Authenticate using one of:\n` +
                  `  - Service account: export OP_SERVICE_ACCOUNT_TOKEN=<token>,\n` +
                  `    or set op_service_account_token_file in the vault config\n` +
                  `  - Desktop app: enable CLI integration in 1Password settings\n` +
                  `  - Sign in: op signin\n\n` +
                  `Error: ${errorMessage}`,
              );
            }

            if (
              errorMessage.includes("isn't a vault") ||
              (errorMessage.includes("vault") &&
                errorMessage.includes("not found"))
            ) {
              throw new Error(
                `1Password vault '${this.opVault}' not found. Verify the vault name in your configuration.\n\n` +
                  `Error: ${errorMessage}`,
              );
            }

            throw new Error(`1Password CLI error: ${errorMessage}`);
          }

          return stdoutText;
        } catch (err) {
          if (err instanceof Error) {
            span.setStatus({
              code: SpanStatusCode.ERROR,
              message: err.message,
            });
            span.recordException(err);
            span.setAttribute(Attr.ERROR_TYPE, err.name);
          }
          throw err;
        } finally {
          span.end();
        }
      },
    );
  }
}

/**
 * Extension entrypoint registered with swamp. Declares the vault type, its
 * configuration schema, and the factory used to instantiate a provider.
 */
export const vault = {
  type: "@swamp/1password",
  name: "1Password",
  description:
    "1Password vault provider. Uses the 1Password CLI (op) for secret operations.",
  configSchema: z.object({
    op_vault: z.string().min(1).describe("The 1Password vault to use"),
    op_account: z.string().optional().describe("Account shorthand or UUID"),
    op_service_account_token_file: z.string().min(1).refine(
      // POSIX absolute, Windows drive-absolute, or UNC path.
      (p) =>
        p.startsWith("/") || /^[A-Za-z]:[\\/]/.test(p) || p.startsWith("\\\\"),
      "op_service_account_token_file must be an absolute path",
    ).optional().describe(
      "Absolute path to a file containing a 1Password service account token " +
        "(not the token itself). Read on each op call and passed only to the " +
        "op child process.",
    ),
  }).strict(),
  createProvider(
    name: string,
    config: Record<string, unknown>,
  ): VaultProvider & {
    delete(secretKey: string): Promise<void>;
    getAnnotation(secretKey: string): Promise<VaultAnnotation | null>;
    putAnnotation(
      secretKey: string,
      annotation: {
        url?: string;
        notes?: string;
        labels?: Readonly<Record<string, string>>;
      },
    ): Promise<void>;
    deleteAnnotation(secretKey: string): Promise<void>;
    listAnnotations(): Promise<Map<string, VaultAnnotation>>;
  } {
    const parsed = vault.configSchema.parse(config);
    return new OnePasswordVaultProvider(name, parsed);
  },
};
