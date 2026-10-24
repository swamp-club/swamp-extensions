// deno-lint-ignore-file no-explicit-any no-import-prefix

import { z } from "npm:zod@4.6.7";

// `request` is auto-imported by the generator for all enrichments; reference it
// so the generated model's import isn't flagged as unused by deno lint.
void request;

export const membershipReconcileMethods = {
  set_members: {
    description:
      "Reconcile group membership to an exact desired set — add missing members, delete members not in the set",
    arguments: z.object({
      desiredMembers: z.array(z.object({
        id: z.string().describe(
          "The preferredMemberKey.id (email address or external identity) of the desired member",
        ),
        roles: z.array(z.object({
          name: z.string().describe(
            "Role name: OWNER, MANAGER, or MEMBER",
          ),
        })).optional().describe(
          "Roles to assign when creating a new membership. Defaults to [{ name: 'MEMBER' }] if omitted. Ignored for members that already exist.",
        ),
      })).describe(
        "The exact set of members the group should have after reconciliation. Members not in this list will be removed.",
      ),
      maxPages: z.number().optional().describe(
        "Maximum pages to fetch when listing current members (default: 100). Each page returns up to 200 members.",
      ),
    }),
    execute: async (
      args: Record<string, unknown>,
      context: any,
    ) => {
      const g = context.globalArgs;
      const baseUrl = g["apiEndpoint"]?.toString() ??
        Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
      const credentials = _buildGcpCredentials(g);
      const parent = String(g["parent"] ?? "");

      const desiredMembers = args["desiredMembers"] as Array<{
        id: string;
        roles?: Array<{ name: string }>;
      }>;
      const maxPages = (args["maxPages"] as number | undefined) ?? 100;

      const { items: currentMembers, nextPageToken } = await listResources(
        baseUrl,
        LIST_CONFIG,
        { parent },
        "memberships",
        maxPages,
        credentials,
      );

      if (nextPageToken) {
        throw new Error(
          `Group has more members than ${maxPages} pages can fetch. ` +
            `Increase maxPages to avoid incorrectly removing unfetched members.`,
        );
      }

      const desiredIds = new Set(desiredMembers.map((m) => m.id));
      const currentById = new Map<string, any>();
      for (const member of currentMembers) {
        const id = member?.preferredMemberKey?.id;
        if (id) currentById.set(id, member);
      }

      const toCreate = desiredMembers.filter((m) => !currentById.has(m.id));
      const toDelete = currentMembers.filter((m: any) => {
        const id = m?.preferredMemberKey?.id;
        return id && !desiredIds.has(id);
      });

      const created: any[] = [];
      for (const member of toCreate) {
        const body: Record<string, unknown> = {
          preferredMemberKey: { id: member.id },
          roles: member.roles ?? [{ name: "MEMBER" }],
        };
        try {
          const result = await createResource(
            baseUrl,
            INSERT_CONFIG,
            { parent },
            body,
            GET_CONFIG,
            undefined,
            undefined,
            credentials,
          );
          created.push(result);
        } catch (createErr) {
          if (!isAlreadyExistsError(createErr)) throw createErr;
          const { items } = await listResources(
            baseUrl,
            LIST_CONFIG,
            { parent },
            "memberships",
            100,
            credentials,
          );
          const existing = items.find((item: any) =>
            item?.preferredMemberKey?.id === member.id
          );
          if (existing) created.push(existing);
          else throw createErr;
        }
      }

      const deleted: string[] = [];
      for (const member of toDelete) {
        const memberName = member.name as string;
        await deleteResource(
          baseUrl,
          DELETE_CONFIG,
          { name: memberName },
          credentials,
        );
        deleted.push(member.preferredMemberKey?.id ?? memberName);
      }

      const { items: reconciledMembers } = await listResources(
        baseUrl,
        LIST_CONFIG,
        { parent },
        "memberships",
        maxPages,
        credentials,
      );

      const dataHandles = [];
      for (let i = 0; i < reconciledMembers.length; i++) {
        const item = reconciledMembers[i];
        const instanceName = (item.name?.toString() ?? String(i)).replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          item,
        );
        dataHandles.push(handle);
      }

      return {
        dataHandles,
        result: {
          created: created.length,
          deleted: deleted.length,
          deletedIds: deleted,
          total: reconciledMembers.length,
        },
      };
    },
  },
};
