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

import {
  assertEquals,
  assertRejects,
  assertThrows,
} from "jsr:@std/assert@1.0.19";
import {
  assertVaultExportConformance,
  withMockedCommand,
} from "@systeminit/swamp-testing";
import { vault, VaultAnnotation } from "./onepassword.ts";

Deno.test("vault export conforms to VaultProvider contract", () => {
  assertVaultExportConformance(vault, {
    validConfigs: [
      { op_vault: "Engineering" },
      { op_vault: "Engineering", op_account: "my-team.1password.com" },
      {
        op_vault: "Engineering",
        op_service_account_token_file: "/run/secrets/op-token",
      },
    ],
    invalidConfigs: [
      {},
      { op_vault: "" },
      { op_vault: "Engineering", op_service_account_token_file: "" },
      {
        op_vault: "Engineering",
        op_service_account_token_file: "secrets/op-token",
      },
    ],
  });
});

Deno.test("createProvider returns provider with correct name", () => {
  const provider = vault.createProvider("my-vault", {
    op_vault: "Engineering",
  });
  assertEquals(provider.getName(), "my-vault");
});

Deno.test("createProvider throws on invalid config", () => {
  assertThrows(
    () => vault.createProvider("bad-vault", {}),
    Error,
  );
});

Deno.test("configSchema rejects unknown keys", () => {
  assertThrows(
    () =>
      vault.configSchema.parse({
        op_vault: "Engineering",
        service_account: "sa-token",
      }),
    Error,
    "Unrecognized key",
  );
});

// --- Behavioral tests using withMockedCommand ---

interface MockItemData {
  fields: Map<string, string>;
  notes?: string;
  sectionFields: Map<string, Map<string, string>>;
}

function createOpMock() {
  const items = new Map<string, MockItemData>();

  function ensureItem(name: string): MockItemData {
    if (!items.has(name)) {
      items.set(name, {
        fields: new Map(),
        sectionFields: new Map(),
      });
    }
    return items.get(name)!;
  }

  function buildItemJson(name: string, data: MockItemData): string {
    const sections: Array<{ id: string; label: string }> = [];
    const fields: Array<Record<string, unknown>> = [];

    fields.push({
      id: "notesPlain",
      type: "STRING",
      purpose: "NOTES",
      label: "notesPlain",
      value: data.notes ?? "",
    });

    for (const [fieldName, value] of data.fields) {
      fields.push({
        id: fieldName,
        type: "STRING",
        label: fieldName,
        value,
      });
    }

    for (const [sectionLabel, sectionData] of data.sectionFields) {
      const sectionId = `section-${sectionLabel}`;
      sections.push({ id: sectionId, label: sectionLabel });
      for (const [fieldLabel, value] of sectionData) {
        fields.push({
          id: `${sectionId}-${fieldLabel}`,
          type: "STRING",
          label: fieldLabel,
          value,
          section: { id: sectionId, label: sectionLabel },
        });
      }
    }

    const item: Record<string, unknown> = {
      id: `id-${name}`,
      title: name,
      category: "SECURE_NOTE",
      updated_at: new Date().toISOString(),
      sections,
      fields,
    };

    return JSON.stringify(item);
  }

  function applyTemplateFields(
    data: MockItemData,
    template: Record<string, unknown>,
  ): void {
    const fields = template.fields as
      | Array<Record<string, unknown>>
      | undefined;
    if (!fields) return;
    for (const f of fields) {
      const label = f.label as string;
      const value = f.value as string;
      const section = f.section as { id: string } | undefined;
      if (section) {
        const sectionLabel = (template.sections as
          | Array<{ id: string; label: string }>
          | undefined)
          ?.find((s) => s.id === section.id)?.label ?? section.id;
        if (!data.sectionFields.has(sectionLabel)) {
          data.sectionFields.set(sectionLabel, new Map());
        }
        data.sectionFields.get(sectionLabel)!.set(label, value);
      } else if (f.purpose === "NOTES") {
        data.notes = value || undefined;
      } else {
        data.fields.set(label, value);
      }
    }
  }

  return (cmd: string, args: string[]) => {
    if (cmd !== "op") {
      return { stdout: "", stderr: `unknown command: ${cmd}`, code: 1 };
    }

    if (args.includes("--version")) {
      return { stdout: "2.30.0", code: 0 };
    }

    if (args[0] === "read") {
      const uri = args[1];
      const parts = uri.replace("op://", "").split("/");
      const item = parts[1];
      const field = parts.slice(2).join("/") || "password";
      const itemData = items.get(item);
      if (!itemData) {
        return { stdout: "", stderr: `item "${item}" not found`, code: 1 };
      }
      if (itemData.fields.has(field)) {
        return { stdout: itemData.fields.get(field)! + "\n", code: 0 };
      }
      const slashIdx = field.indexOf("/");
      if (slashIdx >= 0) {
        const section = field.slice(0, slashIdx);
        const sectionField = field.slice(slashIdx + 1);
        const sectionData = itemData.sectionFields.get(section);
        if (sectionData?.has(sectionField)) {
          return { stdout: sectionData.get(sectionField)! + "\n", code: 0 };
        }
      }
      return { stdout: "", stderr: `field "${field}" not found`, code: 1 };
    }

    if (args[0] === "item" && args[1] === "get") {
      const item = args[2];
      if (!items.has(item)) {
        return { stdout: "", stderr: `item "${item}" not found`, code: 1 };
      }
      if (args.includes("--format") && args.includes("json")) {
        return { stdout: buildItemJson(item, items.get(item)!), code: 0 };
      }
      return { stdout: JSON.stringify({ title: item }), code: 0 };
    }

    if (args[0] === "item" && args[1] === "create") {
      const templateArg = args.find((a) => a.startsWith("--template="));
      if (templateArg) {
        const templatePath = templateArg.slice("--template=".length);
        const template = JSON.parse(Deno.readTextFileSync(templatePath));
        const title = template.title ?? "";
        const data = ensureItem(title);
        applyTemplateFields(data, template);
        return { stdout: JSON.stringify({ title }), code: 0 };
      }
      const titleIdx = args.indexOf("--title");
      const title = titleIdx >= 0 ? args[titleIdx + 1] : "";
      const data = ensureItem(title);
      for (const arg of args) {
        if (arg.startsWith("--") || !arg.includes("=")) continue;
        const eqIdx = arg.indexOf("=");
        let fieldRef = arg.slice(0, eqIdx);
        const value = arg.slice(eqIdx + 1);
        const typeMatch = fieldRef.match(/^(.+)\[(\w+)\]$/);
        if (typeMatch) fieldRef = typeMatch[1];
        const dotIdx = fieldRef.indexOf(".");
        if (dotIdx >= 0) {
          const section = fieldRef.slice(0, dotIdx);
          const field = fieldRef.slice(dotIdx + 1);
          if (!data.sectionFields.has(section)) {
            data.sectionFields.set(section, new Map());
          }
          data.sectionFields.get(section)!.set(field, value);
        } else {
          data.fields.set(fieldRef, value);
        }
      }
      return { stdout: JSON.stringify({ title }), code: 0 };
    }

    if (args[0] === "item" && args[1] === "edit") {
      const item = args[2];
      if (!items.has(item)) {
        return { stdout: "", stderr: `item "${item}" not found`, code: 1 };
      }
      const data = items.get(item)!;

      const templateArg = args.find((a) => a.startsWith("--template="));
      if (templateArg) {
        const templatePath = templateArg.slice("--template=".length);
        const template = JSON.parse(Deno.readTextFileSync(templatePath));
        applyTemplateFields(data, template);
        return { stdout: "", code: 0 };
      }

      for (let i = 3; i < args.length; i++) {
        const arg = args[i];
        if (arg.startsWith("--")) {
          i++;
          continue;
        }

        const deleteMatch = arg.match(/^(.+)\[delete\]$/);
        if (deleteMatch) {
          const ref = deleteMatch[1];
          const dotIdx = ref.indexOf(".");
          if (dotIdx >= 0) {
            const section = ref.slice(0, dotIdx);
            const field = ref.slice(dotIdx + 1);
            data.sectionFields.get(section)?.delete(field);
            const sectionData = data.sectionFields.get(section);
            if (sectionData && sectionData.size === 0) {
              data.sectionFields.delete(section);
            }
          }
          continue;
        }

        const eqIdx = arg.indexOf("=");
        if (eqIdx < 0) continue;

        const ref = arg.slice(0, eqIdx);
        const value = arg.slice(eqIdx + 1);

        const typeMatch = ref.match(/^(.+)\[(\w+)\]$/);
        const fieldRef = typeMatch ? typeMatch[1] : ref;

        const dotIdx = fieldRef.indexOf(".");
        if (dotIdx >= 0) {
          const section = fieldRef.slice(0, dotIdx);
          const field = fieldRef.slice(dotIdx + 1);
          if (!data.sectionFields.has(section)) {
            data.sectionFields.set(section, new Map());
          }
          data.sectionFields.get(section)!.set(field, value);
        } else if (fieldRef === "notesPlain") {
          data.notes = value || undefined;
        } else {
          data.fields.set(fieldRef, value);
        }
      }

      return { stdout: "", code: 0 };
    }

    if (args[0] === "item" && args[1] === "delete") {
      const item = args[2];
      if (!items.has(item)) {
        return { stdout: "", stderr: `item "${item}" not found`, code: 1 };
      }
      items.delete(item);
      return { stdout: "", code: 0 };
    }

    if (args[0] === "item" && args[1] === "list") {
      const list = [...items.keys()].map((title) => ({ title }));
      return { stdout: JSON.stringify(list), code: 0 };
    }

    return {
      stdout: "",
      stderr: `unhandled op args: ${args.join(" ")}`,
      code: 1,
    };
  };
}

Deno.test("1password vault: get returns stored secret", async () => {
  const { result } = await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await provider.put("api-key", "sk-test-123");
    return await provider.get("api-key");
  });

  assertEquals(result, "sk-test-123");
});

Deno.test("1password vault: get rejects for missing secret", async () => {
  await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await assertRejects(() => provider.get("nonexistent"));
  });
});

Deno.test("1password vault: put round-trips JSON values without double-escaping", async () => {
  const jsonValue =
    '{"type":"service_account","project_id":"test","private_key":"-----BEGIN RSA PRIVATE KEY-----\\nMIIE...\\n-----END RSA PRIVATE KEY-----\\n"}';
  const { result } = await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await provider.put("gcp-creds", jsonValue);
    return await provider.get("gcp-creds");
  });

  assertEquals(result, jsonValue);
});

Deno.test("1password vault: put via template preserves existing fields", async () => {
  const { result } = await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await provider.put("multi-field", "original-password");
    await provider.put("multi-field/extra", "extra-value");
    // Now update password with a JSON value (triggers template path)
    await provider.put("multi-field", '{"updated":"true"}');
    const password = await provider.get("multi-field");
    const extra = await provider.get("multi-field/extra");
    return { password, extra };
  });

  assertEquals(result.password, '{"updated":"true"}');
  assertEquals(result.extra, "extra-value");
});

Deno.test("1password vault: put creates new item then updates", async () => {
  const { calls } = await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    // First put: itemExists check fails → create
    await provider.put("new-key", "value-1");
    // Second put: itemExists check succeeds → edit
    await provider.put("new-key", "value-2");
  });

  // Calls: --version, item get (exists?), item create, --version (cached?), item get (exists?), item edit
  // The op --version is cached after first call, so we should see:
  // 1. op --version
  // 2. op item get (existence check) → fails
  // 3. op item create
  // 4. op item get (existence check) → succeeds
  // 5. op item edit
  const opCalls = calls.filter((c) => c.command === "op");
  assertEquals(
    opCalls.length >= 4,
    true,
    `Expected at least 4 op calls, got ${opCalls.length}`,
  );
});

Deno.test("1password vault: list returns stored items", async () => {
  const { result } = await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await provider.put("key-a", "val-a");
    await provider.put("key-b", "val-b");
    return await provider.list();
  });

  assertEquals(result.includes("key-a"), true);
  assertEquals(result.includes("key-b"), true);
});

Deno.test("1password vault: getName returns provider name", async () => {
  await withMockedCommand(createOpMock(), () => {
    const provider = vault.createProvider("my-vault", {
      op_vault: "Engineering",
    });
    assertEquals(provider.getName(), "my-vault");
  });
});

// --- Annotation tests ---

Deno.test("1password vault: getAnnotation returns null for unannotated item", async () => {
  const { result } = await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await provider.put("plain-secret", "value");
    return await provider.getAnnotation("plain-secret");
  });

  assertEquals(result, null);
});

Deno.test("1password vault: getAnnotation returns null for missing item", async () => {
  const { result } = await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    return await provider.getAnnotation("nonexistent");
  });

  assertEquals(result, null);
});

Deno.test("1password vault: putAnnotation and getAnnotation roundtrip", async () => {
  const { result } = await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await provider.put("my-key", "secret-value");

    const annotation = VaultAnnotation.create({
      url: "https://console.aws.com/iam",
      notes: "Production API key",
      labels: { env: "prod", team: "infra" },
    });
    await provider.putAnnotation("my-key", annotation);
    return await provider.getAnnotation("my-key");
  });

  assertEquals(result !== null, true);
  assertEquals(result!.url, "https://console.aws.com/iam");
  assertEquals(result!.notes, "Production API key");
  assertEquals(result!.labels.env, "prod");
  assertEquals(result!.labels.team, "infra");
});

Deno.test("1password vault: putAnnotation sets only url", async () => {
  const { result } = await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await provider.put("url-only", "value");

    const annotation = VaultAnnotation.create({
      url: "https://example.com",
    });
    await provider.putAnnotation("url-only", annotation);
    return await provider.getAnnotation("url-only");
  });

  assertEquals(result !== null, true);
  assertEquals(result!.url, "https://example.com");
  assertEquals(result!.notes, undefined);
  assertEquals(Object.keys(result!.labels).length, 0);
});

Deno.test("1password vault: putAnnotation sets only notes", async () => {
  const { result } = await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await provider.put("notes-only", "value");

    const annotation = VaultAnnotation.create({
      notes: "Important note",
    });
    await provider.putAnnotation("notes-only", annotation);
    return await provider.getAnnotation("notes-only");
  });

  assertEquals(result !== null, true);
  assertEquals(result!.url, undefined);
  assertEquals(result!.notes, "Important note");
});

Deno.test("1password vault: putAnnotation rejects invalid label keys", async () => {
  await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await provider.put("bad-labels", "value");

    const annotation = VaultAnnotation.create({
      labels: { "bad.key": "value" },
    });
    await assertRejects(
      () => provider.putAnnotation("bad-labels", annotation),
      Error,
      "must not contain dots",
    );
  });
});

Deno.test("1password vault: putAnnotation rejects label keys with equals", async () => {
  await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await provider.put("bad-labels", "value");

    const annotation = VaultAnnotation.create({
      labels: { "a=b": "value" },
    });
    await assertRejects(
      () => provider.putAnnotation("bad-labels", annotation),
      Error,
      "must not contain",
    );
  });
});

Deno.test("1password vault: putAnnotation rejects empty label keys", async () => {
  await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await provider.put("bad-labels", "value");

    const annotation = VaultAnnotation.create({
      labels: { "": "value" },
    });
    await assertRejects(
      () => provider.putAnnotation("bad-labels", annotation),
      Error,
      "must not be empty",
    );
  });
});

Deno.test("1password vault: putAnnotation with empty annotation is no-op", async () => {
  const { calls } = await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await provider.put("my-key", "value");

    const empty = VaultAnnotation.create({});
    await provider.putAnnotation("my-key", empty);
  });

  const editCalls = calls.filter(
    (c) => c.command === "op" && c.args[0] === "item" && c.args[1] === "edit",
  );
  assertEquals(
    editCalls.length,
    0,
    "should not call op item edit for empty annotation",
  );
});

Deno.test("1password vault: putAnnotation rejects label keys with brackets", async () => {
  await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await provider.put("bad-labels", "value");

    const annotation = VaultAnnotation.create({
      labels: { "bad[key]": "value" },
    });
    await assertRejects(
      () => provider.putAnnotation("bad-labels", annotation),
      Error,
      "must not contain dots",
    );
  });
});

Deno.test("1password vault: deleteAnnotation clears all annotation data", async () => {
  const { result } = await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await provider.put("annotated", "value");

    const annotation = VaultAnnotation.create({
      url: "https://example.com",
      notes: "A note",
      labels: { env: "prod" },
    });
    await provider.putAnnotation("annotated", annotation);

    await provider.deleteAnnotation("annotated");
    return await provider.getAnnotation("annotated");
  });

  assertEquals(result, null);
});

Deno.test("1password vault: deleteAnnotation is idempotent on clean item", async () => {
  await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await provider.put("clean", "value");
    await provider.deleteAnnotation("clean");
    await provider.deleteAnnotation("clean");
  });
});

Deno.test("1password vault: deleteAnnotation on missing item is no-op", async () => {
  await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await provider.deleteAnnotation("nonexistent");
  });
});

Deno.test("1password vault: listAnnotations returns annotated items only", async () => {
  const { result } = await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await provider.put("annotated-1", "val");
    await provider.put("plain", "val");
    await provider.put("annotated-2", "val");

    await provider.putAnnotation(
      "annotated-1",
      VaultAnnotation.create({ url: "https://a.com" }),
    );
    await provider.putAnnotation(
      "annotated-2",
      VaultAnnotation.create({ notes: "note" }),
    );

    return await provider.listAnnotations();
  });

  assertEquals(result.size, 2);
  assertEquals(result.has("annotated-1"), true);
  assertEquals(result.has("annotated-2"), true);
  assertEquals(result.has("plain"), false);
  assertEquals(result.get("annotated-1")!.url, "https://a.com");
  assertEquals(result.get("annotated-2")!.notes, "note");
});

Deno.test("1password vault: listAnnotations returns empty map for empty vault", async () => {
  const { result } = await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    return await provider.listAnnotations();
  });

  assertEquals(result.size, 0);
});

Deno.test("1password vault: VaultAnnotation.merge preserves existing fields", () => {
  const original = VaultAnnotation.create({
    url: "https://original.com",
    notes: "original note",
    labels: { env: "prod" },
  });

  const merged = original.merge({ labels: { team: "infra" } });

  assertEquals(merged.url, "https://original.com");
  assertEquals(merged.notes, "original note");
  assertEquals(merged.labels.env, "prod");
  assertEquals(merged.labels.team, "infra");
});

Deno.test("1password vault: VaultAnnotation.toData omits empty fields", () => {
  const annotation = VaultAnnotation.create({});
  const data = annotation.toData();

  assertEquals(data.url, undefined);
  assertEquals(data.notes, undefined);
  assertEquals(data.labels, undefined);
  assertEquals(typeof data.updatedAt, "string");
});

Deno.test("1password vault: VaultAnnotation.isEmpty returns true when empty", () => {
  const empty = VaultAnnotation.create({});
  assertEquals(empty.isEmpty(), true);

  const withUrl = VaultAnnotation.create({ url: "https://example.com" });
  assertEquals(withUrl.isEmpty(), false);
});

Deno.test("1password vault: provider has annotation methods (duck-typing gate)", () => {
  const provider = vault.createProvider("test", {
    op_vault: "Engineering",
  });
  assertEquals(typeof provider.getAnnotation, "function");
  assertEquals(typeof provider.putAnnotation, "function");
  assertEquals(typeof provider.deleteAnnotation, "function");
  assertEquals(typeof provider.listAnnotations, "function");
});

// --- Section/field separator tests ---

Deno.test("1password vault: put and get round-trip with section/field syntax", async () => {
  const { result } = await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await provider.put("my-item/database/password", "s3cret");
    return await provider.get("my-item/database/password");
  });

  assertEquals(result, "s3cret");
});

Deno.test("1password vault: put translates / to . for op item edit", async () => {
  const { calls } = await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await provider.put("my-item/section/field", "value");
  });

  const createCall = calls.find(
    (c) => c.command === "op" && c.args[0] === "item" && c.args[1] === "create",
  );
  assertEquals(
    createCall !== undefined,
    true,
    "expected an op item create call",
  );
  const fieldArg = createCall!.args.find((a: string) =>
    a.includes("=") && !a.startsWith("--")
  );
  assertEquals(fieldArg, "section.field=value");
});

Deno.test("1password vault: put and get round-trip with plain field (no section)", async () => {
  const { result } = await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await provider.put("my-item/password", "plain-secret");
    return await provider.get("my-item/password");
  });

  assertEquals(result, "plain-secret");
});

// --- Delete tests ---

Deno.test("1password vault: delete removes a stored secret", async () => {
  await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await provider.put("to-delete", "secret-value");
    await provider.delete("to-delete");
    await assertRejects(() => provider.get("to-delete"));
  });
});

Deno.test("1password vault: delete is idempotent on missing item", async () => {
  await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await provider.delete("nonexistent");
  });
});

Deno.test("1password vault: delete removes item from list", async () => {
  const { result } = await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await provider.put("keep-me", "val1");
    await provider.put("delete-me", "val2");
    await provider.delete("delete-me");
    return await provider.list();
  });

  assertEquals(result.includes("keep-me"), true);
  assertEquals(result.includes("delete-me"), false);
});

Deno.test("1password vault: delete with item/field key deletes the whole item", async () => {
  await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await provider.put("my-item/password", "secret");
    await provider.delete("my-item/password");
    await assertRejects(() => provider.get("my-item"));
  });
});

Deno.test("1password vault: delete rejects full op:// URI", async () => {
  await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await assertRejects(
      () => provider.delete("op://Engineering/my-item/password"),
      Error,
      "Cannot use full op:// URI for delete",
    );
  });
});

Deno.test("1password vault: delete propagates vault-not-found error", async () => {
  await withMockedCommand((cmd: string, args: string[]) => {
    if (cmd !== "op") {
      return { stdout: "", stderr: `unknown command: ${cmd}`, code: 1 };
    }
    if (args.includes("--version")) {
      return { stdout: "2.30.0", code: 0 };
    }
    return {
      stdout: "",
      stderr: `"BadVault" isn't a vault in this account`,
      code: 1,
    };
  }, async () => {
    const provider = vault.createProvider("test", {
      op_vault: "BadVault",
    });
    await assertRejects(
      () => provider.delete("some-item"),
      Error,
      "1Password vault",
    );
  });
});

Deno.test("1password vault: provider has delete method (duck-typing gate)", () => {
  const provider = vault.createProvider("test", {
    op_vault: "Engineering",
  });
  assertEquals(typeof provider.delete, "function");
});

// --- Tag pass-through tests ---

Deno.test("1password vault: put with tags creates item with swamp-labels fields", async () => {
  const { calls } = await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await provider.put("tagged-item", "my-value", {
      tags: { environment: "production", team: "platform" },
    });
  });

  const createCall = calls.find(
    (c) => c.command === "op" && c.args[0] === "item" && c.args[1] === "create",
  );
  assertEquals(
    createCall !== undefined,
    true,
    "expected an op item create call",
  );
  const fieldArgs = createCall!.args.filter(
    (a: string) => a.includes("=") && !a.startsWith("--"),
  );
  assertEquals(fieldArgs.includes("password=my-value"), true);
  assertEquals(
    fieldArgs.includes("swamp-labels.environment[text]=production"),
    true,
  );
  assertEquals(
    fieldArgs.includes("swamp-labels.team[text]=platform"),
    true,
  );
});

Deno.test("1password vault: put with tags on existing item adds swamp-labels fields", async () => {
  const { calls } = await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await provider.put("existing-item", "first-value");
    await provider.put("existing-item", "second-value", {
      tags: { env: "staging" },
    });
  });

  const editCalls = calls.filter(
    (c) => c.command === "op" && c.args[0] === "item" && c.args[1] === "edit",
  );
  assertEquals(
    editCalls.length >= 1,
    true,
    "expected at least one op item edit call",
  );
  const lastEdit = editCalls[editCalls.length - 1];
  const fieldArgs = lastEdit.args.filter(
    (a: string) => a.includes("=") && !a.startsWith("--"),
  );
  assertEquals(
    fieldArgs.includes("swamp-labels.env[text]=staging"),
    true,
  );
});

Deno.test("1password vault: put without tags still works (backward compat)", async () => {
  const { result } = await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await provider.put("no-tags", "value-123");
    return await provider.get("no-tags");
  });

  assertEquals(result, "value-123");
});

Deno.test("1password vault: put with invalid tag key rejects", async () => {
  await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await assertRejects(
      () =>
        provider.put("item", "value", {
          tags: { "invalid.key": "value" },
        }),
      Error,
      "Invalid label key",
    );
  });
});

Deno.test("1password vault: put with tags via template path includes tag fields", async () => {
  const { result } = await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await provider.put("template-item", 'value-with-"quotes"', {
      tags: { env: "prod" },
    });
    return await provider.get("template-item");
  });

  assertEquals(result, 'value-with-"quotes"');
});

// --- Whitespace preservation tests (issue #1664) ---

Deno.test("1password vault: get preserves trailing whitespace in secret values", async () => {
  const pemKey =
    "-----BEGIN RSA PRIVATE KEY-----\nMIIE...\n-----END RSA PRIVATE KEY-----\n";
  const { result } = await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await provider.put("pem-key", pemKey);
    return await provider.get("pem-key");
  });

  assertEquals(result, pemKey);
});

Deno.test("1password vault: get preserves leading whitespace in secret values", async () => {
  const paddedValue = "  leading-spaces-matter";
  const { result } = await withMockedCommand(createOpMock(), async () => {
    const provider = vault.createProvider("test", {
      op_vault: "Engineering",
    });
    await provider.put("padded", paddedValue);
    return await provider.get("padded");
  });

  assertEquals(result, paddedValue);
});

// --- Service account token file tests (issue #2789) ---

interface CapturedEnvCall {
  args: string[];
  env: Record<string, string> | undefined;
}

/**
 * Replaces Deno.Command with a stub that records each call's env option.
 * withMockedCommand from @systeminit/swamp-testing drops the options object,
 * so it cannot assert what env reaches the child (swamp-club #3090). Remove
 * this helper once withMockedCommand captures env.
 */
async function withEnvCapturingCommand<T>(
  fn: () => Promise<T>,
  options: { failAuth?: boolean } = {},
): Promise<{ result: T; calls: CapturedEnvCall[] }> {
  const calls: CapturedEnvCall[] = [];
  const original = Deno.Command;
  // @ts-ignore: replacing Deno.Command for testing
  Deno.Command = class {
    #args: string[];
    #env: Record<string, string> | undefined;

    constructor(
      _command: string | URL,
      options?: { args?: string[]; env?: Record<string, string> },
    ) {
      this.#args = options?.args ?? [];
      this.#env = options?.env;
    }

    output(): Promise<Deno.CommandOutput> {
      calls.push({ args: this.#args, env: this.#env });
      if (options.failAuth && this.#args[0] !== "--version") {
        return Promise.resolve({
          success: false,
          code: 1,
          signal: null,
          stdout: new Uint8Array(),
          stderr: new TextEncoder().encode(
            "[ERROR] You are not signed in. authorization failed",
          ),
        } as Deno.CommandOutput);
      }
      const stdout = this.#args[0] === "read" ? "secret-value\n" : "op 2.30.0";
      return Promise.resolve({
        success: true,
        code: 0,
        signal: null,
        stdout: new TextEncoder().encode(stdout),
        stderr: new Uint8Array(),
      } as Deno.CommandOutput);
    }
  };
  try {
    return { result: await fn(), calls };
  } finally {
    Deno.Command = original;
  }
}

/**
 * Runs fn with OP_SERVICE_ACCOUNT_TOKEN unset, so results never depend on
 * the developer's shell, and restores the original value afterwards.
 */
async function withoutTokenEnv<T>(fn: () => Promise<T>): Promise<T> {
  const original = Deno.env.get("OP_SERVICE_ACCOUNT_TOKEN");
  Deno.env.delete("OP_SERVICE_ACCOUNT_TOKEN");
  try {
    return await fn();
  } finally {
    if (original === undefined) {
      Deno.env.delete("OP_SERVICE_ACCOUNT_TOKEN");
    } else {
      Deno.env.set("OP_SERVICE_ACCOUNT_TOKEN", original);
    }
  }
}

Deno.test("1password vault: token file is passed only to the op child", async () => {
  await withoutTokenEnv(async () => {
    const tokenFile = await Deno.makeTempFile();
    try {
      await Deno.writeTextFile(tokenFile, "ops_file_token\n");
      const { result, calls } = await withEnvCapturingCommand(async () => {
        const provider = vault.createProvider("test", {
          op_vault: "Engineering",
          op_service_account_token_file: tokenFile,
        });
        return await provider.get("api-key");
      });

      assertEquals(result, "secret-value");
      const readCall = calls.find((c) => c.args[0] === "read");
      assertEquals(readCall?.env, {
        OP_SERVICE_ACCOUNT_TOKEN: "ops_file_token",
      });
      assertEquals(Deno.env.get("OP_SERVICE_ACCOUNT_TOKEN"), undefined);
    } finally {
      await Deno.remove(tokenFile);
    }
  });
});

Deno.test("1password vault: token file strips leading whitespace and BOM", async () => {
  await withoutTokenEnv(async () => {
    const tokenFile = await Deno.makeTempFile();
    try {
      await Deno.writeTextFile(tokenFile, "\uFEFF  ops_bom_token \r\n");
      const { calls } = await withEnvCapturingCommand(async () => {
        const provider = vault.createProvider("test", {
          op_vault: "Engineering",
          op_service_account_token_file: tokenFile,
        });
        await provider.get("api-key");
      });

      const readCall = calls.find((c) => c.args[0] === "read");
      assertEquals(readCall?.env?.OP_SERVICE_ACCOUNT_TOKEN, "ops_bom_token");
    } finally {
      await Deno.remove(tokenFile);
    }
  });
});

Deno.test("1password vault: token file is re-read on every op call", async () => {
  await withoutTokenEnv(async () => {
    const tokenFile = await Deno.makeTempFile();
    try {
      await Deno.writeTextFile(tokenFile, "first-token");
      const { calls } = await withEnvCapturingCommand(async () => {
        const provider = vault.createProvider("test", {
          op_vault: "Engineering",
          op_service_account_token_file: tokenFile,
        });
        await provider.get("api-key");
        await Deno.writeTextFile(tokenFile, "rotated-token\n");
        await provider.get("api-key");
      });

      const tokens = calls
        .filter((c) => c.args[0] === "read")
        .map((c) => c.env?.OP_SERVICE_ACCOUNT_TOKEN);
      assertEquals(tokens, ["first-token", "rotated-token"]);
    } finally {
      await Deno.remove(tokenFile);
    }
  });
});

Deno.test("1password vault: op --version never receives the token", async () => {
  await withoutTokenEnv(async () => {
    const tokenFile = await Deno.makeTempFile();
    try {
      await Deno.writeTextFile(tokenFile, "ops_file_token");
      const { calls } = await withEnvCapturingCommand(async () => {
        const provider = vault.createProvider("test", {
          op_vault: "Engineering",
          op_service_account_token_file: tokenFile,
        });
        await provider.get("api-key");
      });

      const versionCall = calls.find((c) => c.args[0] === "--version");
      assertEquals(versionCall?.env, undefined);
    } finally {
      await Deno.remove(tokenFile);
    }
  });
});

Deno.test("1password vault: without a token file op inherits the env unchanged", async () => {
  await withoutTokenEnv(async () => {
    const { calls } = await withEnvCapturingCommand(async () => {
      const provider = vault.createProvider("test", {
        op_vault: "Engineering",
      });
      await provider.get("api-key");
    });

    for (const call of calls) {
      assertEquals(call.env, undefined);
    }
  });
});

Deno.test("1password vault: missing token file rejects naming the path", async () => {
  await withoutTokenEnv(async () => {
    const dir = await Deno.makeTempDir();
    const tokenFile = `${dir}/does-not-exist`;
    try {
      await withEnvCapturingCommand(async () => {
        const provider = vault.createProvider("test", {
          op_vault: "Engineering",
          op_service_account_token_file: tokenFile,
        });
        await assertRejects(
          () => provider.get("api-key"),
          Error,
          `token file '${tokenFile}' (NotFound)`,
        );
      });
    } finally {
      await Deno.remove(dir, { recursive: true });
    }
  });
});

Deno.test("1password vault: empty token file rejects", async () => {
  await withoutTokenEnv(async () => {
    const tokenFile = await Deno.makeTempFile();
    try {
      await Deno.writeTextFile(tokenFile, "  \n");
      await withEnvCapturingCommand(async () => {
        const provider = vault.createProvider("test", {
          op_vault: "Engineering",
          op_service_account_token_file: tokenFile,
        });
        await assertRejects(
          () => provider.get("api-key"),
          Error,
          "is empty",
        );
      });
    } finally {
      await Deno.remove(tokenFile);
    }
  });
});

Deno.test("1password vault: op errors never contain the token value", async () => {
  await withoutTokenEnv(async () => {
    const tokenFile = await Deno.makeTempFile();
    const token = "ops_very_secret_token";
    try {
      await Deno.writeTextFile(tokenFile, token);
      const { result: err, calls } = await withEnvCapturingCommand(
        async () => {
          const provider = vault.createProvider("test", {
            op_vault: "Engineering",
            op_service_account_token_file: tokenFile,
          });
          return await assertRejects(() => provider.get("api-key"), Error);
        },
        { failAuth: true },
      );

      // The failing call really carried the token, so its absence from the
      // error is meaningful rather than trivially true.
      const readCall = calls.find((c) => c.args[0] === "read");
      assertEquals(readCall?.env?.OP_SERVICE_ACCOUNT_TOKEN, token);
      assertEquals(err.message.includes(token), false);
      assertEquals(
        err.message.includes("op_service_account_token_file"),
        true,
      );
    } finally {
      await Deno.remove(tokenFile);
    }
  });
});

Deno.test("configSchema rejects a relative op_service_account_token_file", () => {
  assertThrows(
    () =>
      vault.configSchema.parse({
        op_vault: "Engineering",
        op_service_account_token_file: "secrets/op-token",
      }),
    Error,
    "must be an absolute path",
  );
});
