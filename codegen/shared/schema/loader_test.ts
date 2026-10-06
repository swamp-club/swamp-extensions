import { assertEquals } from "@std/assert";
import { matchesServiceFilter } from "./loader.ts";

Deno.test("matchesServiceFilter - matches the service segment exactly", () => {
  assertEquals(matchesServiceFilter("AWS::Events::EventBus", ["events"]), true);
  assertEquals(matchesServiceFilter("AWS::EC2::Instance", ["EC2"]), true);
  assertEquals(
    matchesServiceFilter("AWS::Bedrock::KnowledgeBase", ["ec2", "bedrock"]),
    true,
  );
});

Deno.test("matchesServiceFilter - ignores substrings of other segments", () => {
  assertEquals(
    matchesServiceFilter("AWS::RDS::EventSubscription", ["events"]),
    false,
  );
  assertEquals(
    matchesServiceFilter("AWS::Lambda::EventSourceMapping", ["events"]),
    false,
  );
  assertEquals(
    matchesServiceFilter("AWS::BedrockAgentCore::Runtime", ["bedrock"]),
    false,
  );
  assertEquals(
    matchesServiceFilter("AWS::EventSchemas::Schema", ["events"]),
    false,
  );
});
