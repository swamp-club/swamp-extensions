// deno-lint-ignore-file no-import-prefix

import { z } from "npm:zod@4.3.6";

export const iamBindingMethods = {
  add_iam_binding: {
    description:
      "add an IAM binding to the bucket (read-modify-write with etag)",
    arguments: z.object({
      role: z.string().describe(
        "IAM role to grant, e.g. roles/storage.objectAdmin",
      ),
      members: z.array(z.string()).describe(
        "Members to bind, e.g. ['user:alice@example.com', 'serviceAccount:sa@project.iam.gserviceaccount.com']",
      ),
      condition: z.object({
        title: z.string(),
        description: z.string().optional(),
        expression: z.string(),
      }).optional().describe("Optional IAM condition for conditional bindings"),
    }),
    execute: async (
      args: Record<string, unknown>,
      context: { globalArgs: Record<string, unknown> },
    ) => {
      const g = context.globalArgs;
      const projectId = await getProjectId();
      const bucketName = g["name"]?.toString() ?? "";
      const userProject = g["userProject"]?.toString() ?? projectId;

      const getResp = await request(
        "GET",
        `${BASE_URL}b/${
          encodeURIComponent(bucketName)
        }/iam?optionsRequestedPolicyVersion=3&userProject=${
          encodeURIComponent(userProject)
        }`,
      );
      if (!getResp.ok) {
        const body = await getResp.text();
        throw new Error(`Failed to get IAM policy: ${getResp.status} ${body}`);
      }
      const policy = await getResp.json() as {
        bindings?: Array<{
          role: string;
          members: string[];
          condition?: {
            title: string;
            description?: string;
            expression: string;
          };
        }>;
        etag: string;
        version?: number;
      };

      const role = args["role"] as string;
      const members = args["members"] as string[];
      const condition = args["condition"] as
        | { title: string; description?: string; expression: string }
        | undefined;

      const bindings = policy.bindings ?? [];
      const existing = bindings.find((b) => {
        if (b.role !== role) return false;
        if (condition && b.condition) {
          return b.condition.title === condition.title &&
            b.condition.expression === condition.expression;
        }
        return !condition && !b.condition;
      });

      if (existing) {
        const memberSet = new Set(existing.members);
        for (const m of members) memberSet.add(m);
        existing.members = [...memberSet];
      } else {
        const newBinding: {
          role: string;
          members: string[];
          condition?: {
            title: string;
            description?: string;
            expression: string;
          };
        } = { role, members: [...new Set(members)] };
        if (condition) newBinding.condition = condition;
        bindings.push(newBinding);
      }

      const setResp = await request(
        "PUT",
        `${BASE_URL}b/${encodeURIComponent(bucketName)}/iam?userProject=${
          encodeURIComponent(userProject)
        }`,
        {
          bindings,
          etag: policy.etag,
          version: 3,
        },
      );
      if (!setResp.ok) {
        const body = await setResp.text();
        throw new Error(`Failed to set IAM policy: ${setResp.status} ${body}`);
      }
      const result = await setResp.json();
      return { result };
    },
  },
  remove_iam_binding: {
    description:
      "remove an IAM binding or specific members from a bucket (read-modify-write with etag)",
    arguments: z.object({
      role: z.string().describe(
        "IAM role to revoke, e.g. roles/storage.objectAdmin",
      ),
      members: z.array(z.string()).optional().describe(
        "Specific members to remove. If omitted, removes the entire binding for this role.",
      ),
      condition: z.object({
        title: z.string(),
        description: z.string().optional(),
        expression: z.string(),
      }).optional().describe(
        "Match condition when removing a conditional binding",
      ),
    }),
    execute: async (
      args: Record<string, unknown>,
      context: { globalArgs: Record<string, unknown> },
    ) => {
      const g = context.globalArgs;
      const projectId = await getProjectId();
      const bucketName = g["name"]?.toString() ?? "";
      const userProject = g["userProject"]?.toString() ?? projectId;

      const getResp = await request(
        "GET",
        `${BASE_URL}b/${
          encodeURIComponent(bucketName)
        }/iam?optionsRequestedPolicyVersion=3&userProject=${
          encodeURIComponent(userProject)
        }`,
      );
      if (!getResp.ok) {
        const body = await getResp.text();
        throw new Error(`Failed to get IAM policy: ${getResp.status} ${body}`);
      }
      const policy = await getResp.json() as {
        bindings?: Array<{
          role: string;
          members: string[];
          condition?: {
            title: string;
            description?: string;
            expression: string;
          };
        }>;
        etag: string;
        version?: number;
      };

      const role = args["role"] as string;
      const members = args["members"] as string[] | undefined;
      const condition = args["condition"] as
        | { title: string; description?: string; expression: string }
        | undefined;

      let bindings = policy.bindings ?? [];
      const idx = bindings.findIndex((b) => {
        if (b.role !== role) return false;
        if (condition && b.condition) {
          return b.condition.title === condition.title &&
            b.condition.expression === condition.expression;
        }
        return !condition && !b.condition;
      });

      if (idx === -1) {
        return { result: { bindings, message: "No matching binding found" } };
      }

      if (members) {
        const removeSet = new Set(members);
        bindings[idx].members = bindings[idx].members.filter((m) =>
          !removeSet.has(m)
        );
        if (bindings[idx].members.length === 0) {
          bindings = bindings.filter((_, i) => i !== idx);
        }
      } else {
        bindings = bindings.filter((_, i) => i !== idx);
      }

      const setResp = await request(
        "PUT",
        `${BASE_URL}b/${encodeURIComponent(bucketName)}/iam?userProject=${
          encodeURIComponent(userProject)
        }`,
        {
          bindings,
          etag: policy.etag,
          version: 3,
        },
      );
      if (!setResp.ok) {
        const body = await setResp.text();
        throw new Error(`Failed to set IAM policy: ${setResp.status} ${body}`);
      }
      const result = await setResp.json();
      return { result };
    },
  },
};
