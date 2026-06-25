import { z } from "npm:zod@4.3.6";

type ExtensionContext = {
  globalArgs: { webhookUrl?: string };
  writeResource: (
    specName: string,
    instanceName: string,
    data: unknown,
  ) => Promise<unknown>;
};

export const extension = {
  type: "@keeb/discord/webhook",
  methods: [{
    sendFromEnv: {
      description:
        "Send a rich embed to Discord, reading DISCORD_WEBHOOK_URL from the environment. Content is JSON with embeds.",
      arguments: z.object({
        content: z.string().describe(
          "JSON-encoded Discord webhook payload with embeds",
        ),
        username: z.string().optional().describe(
          "Override the webhook's default username",
        ),
      }),
      execute: async (
        args: { content: string; username?: string },
        context: ExtensionContext,
      ) => {
        const webhookUrl = context.globalArgs.webhookUrl ||
          Deno.env.get("DISCORD_WEBHOOK_URL");
        if (!webhookUrl) {
          throw new Error(
            "No webhook URL: set DISCORD_WEBHOOK_URL env var or webhookUrl global arg",
          );
        }

        let body: Record<string, unknown>;
        try {
          body = JSON.parse(args.content) as Record<string, unknown>;
        } catch {
          body = { content: args.content.slice(0, 2000) };
        }

        if (args.username) body.username = args.username;

        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Discord webhook error (${response.status}): ${errorText}`,
          );
        }

        const handle = await context.writeResource("result", "result", {
          success: true,
          statusCode: response.status,
          timestamp: new Date().toISOString(),
        });

        return { dataHandles: [handle] };
      },
    },
  }],
};
