import { assert, assertEquals } from "jsr:@std/assert@1.0.19";
import { extension } from "./discord_webhook_env.ts";

Deno.test("extension export has expected shape", () => {
  assertEquals(extension.type, "@keeb/discord/webhook");
  assert(Array.isArray(extension.methods));
  assertEquals(extension.methods.length, 1);
  const methodObj = extension.methods[0];
  assert("sendFromEnv" in methodObj);
});

Deno.test("sendFromEnv method has correct structure", () => {
  const method = extension.methods[0].sendFromEnv;
  assertEquals(typeof method.description, "string");
  assertEquals(typeof method.execute, "function");
  assert(method.arguments);
});

Deno.test("sendFromEnv arguments require content", () => {
  const schema = extension.methods[0].sendFromEnv.arguments;
  const result = schema.parse({ content: '{"embeds": []}' });
  assertEquals(result.content, '{"embeds": []}');
  assertEquals(result.username, undefined);
});

Deno.test("sendFromEnv arguments accept username", () => {
  const schema = extension.methods[0].sendFromEnv.arguments;
  const result = schema.parse({
    content: "hello",
    username: "CVE Watcher",
  });
  assertEquals(result.username, "CVE Watcher");
});

Deno.test("sendFromEnv arguments reject missing content", () => {
  const schema = extension.methods[0].sendFromEnv.arguments;
  let threw = false;
  try {
    schema.parse({});
  } catch {
    threw = true;
  }
  assert(threw, "should reject missing content");
});

Deno.test("sendFromEnv execute throws without webhook URL", async () => {
  const method = extension.methods[0].sendFromEnv;
  const origGet = Deno.env.get;
  Deno.env.get = (key: string) =>
    key === "DISCORD_WEBHOOK_URL" ? undefined : origGet(key);

  let threw = false;
  try {
    await method.execute(
      { content: "test" },
      {
        globalArgs: {},
        writeResource: () => Promise.resolve({}),
      },
    );
  } catch (e: unknown) {
    threw = true;
    const msg = e instanceof Error ? e.message : String(e);
    assert(
      msg.includes("No webhook URL"),
      `unexpected error: ${msg}`,
    );
  } finally {
    Deno.env.get = origGet;
  }
  assert(threw, "should throw when no webhook URL is available");
});
