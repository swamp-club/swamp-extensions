import { z } from "npm:zod@4.6.7";

type ExtensionContext = {
  globalArgs: z.infer<typeof WebhookGlobalArgs>;
  writeResource: (
    specName: string,
    instanceName: string,
    data: unknown,
  ) => Promise<unknown>;
};

const WebhookGlobalArgs = z.object({
  webhookUrl: z
    .string()
    .min(1)
    .meta({ sensitive: true })
    .describe(
      "Discord webhook URL. Supply via ${{ vault.get(your-vault, your-key) }} " +
        "or falls back to the DISCORD_WEBHOOK_URL environment variable.",
    )
    .optional(),
});

export const extension = {
  type: "@keeb/discord/webhook",
  globalArguments: WebhookGlobalArgs,
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
        const webhookUrl = context.globalArgs.webhookUrl ??
          Deno.env.get("DISCORD_WEBHOOK_URL");
        if (!webhookUrl) {
          throw new Error(
            "No webhook URL: supply webhookUrl via vault.get() global arg or set DISCORD_WEBHOOK_URL env var",
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
          signal: AbortSignal.timeout(30_000),
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
