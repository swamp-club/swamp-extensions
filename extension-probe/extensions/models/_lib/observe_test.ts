import { assertEquals } from "jsr:@std/assert@1.0.19";
import {
  findAuditSession,
  parseJsonStream,
  parseNonoAudit,
  parseRunOutput,
  parseStubCall,
} from "./observe.ts";

// Shapes recorded from real `swamp behavior run --json` runs against stef.
const FAILED =
  `{"event":"definition_auto_created","modelType":"@skunk-ape/stef","definitionName":"probe-lint-empty"}
{
  "error": "One of text or path is required.",
  "code": "method_execution_failed"
}
`;
const SUCCEEDED =
  `{"event":"definition_auto_created","modelType":"@skunk-ape/stef"}
{
  "modelName": "probe-lint-text",
  "methodName": "lint",
  "status": "succeeded",
  "dataArtifacts": [
    { "id": "1", "name": "findings-latest", "attributes": { "clean": false, "note": "a } brace" } }
  ]
}`;

Deno.test("parseJsonStream splits concatenated documents, braces in strings and all", () => {
  const docs = parseJsonStream(SUCCEEDED);
  assertEquals(docs.length, 2);
  assertEquals(parseJsonStream("noise {not json} more"), []);
});

Deno.test("parseRunOutput reads a failure", () => {
  assertEquals(parseRunOutput(FAILED, ""), {
    status: "failed",
    errorCode: "method_execution_failed",
    errorText: "One of text or path is required.",
    data: [],
  });
});

Deno.test("parseRunOutput reads a success and its data", () => {
  const r = parseRunOutput(SUCCEEDED, "");
  assertEquals(r.status, "succeeded");
  assertEquals(r.data.map((d) => d.name), ["findings-latest"]);
  assertEquals(JSON.parse(r.data[0].json).note, "a } brace");
});

Deno.test("parseRunOutput says unknown when nothing parses", () => {
  assertEquals(parseRunOutput("segfault", "").status, "unknown");
});

// The shape `nono audit show <id> --json` printed for a proxied run.
const AUDIT = JSON.stringify({
  session_id: "5994f2a7777cf8f6",
  network_events: [
    {
      mode: "connect",
      decision: "allow",
      target: "swamp-club.com",
      port: 443,
      method: "CONNECT",
      path: null,
      reason: null,
    },
    {
      mode: "connect",
      decision: "deny",
      denial_category: "host_denied",
      target: "evil.example",
      port: 443,
      method: null,
      reason: "host evil.example:443 is not in the allowlist",
    },
  ],
});

Deno.test("parseNonoAudit reads allowed and denied attempts", () => {
  assertEquals(parseNonoAudit(AUDIT), [
    { decision: "allow", host: "swamp-club.com", port: 443, method: "CONNECT" },
    {
      decision: "deny",
      host: "evil.example",
      port: 443,
      reason: "host evil.example:443 is not in the allowlist",
    },
  ]);
  assertEquals(parseNonoAudit("not json"), null);
  assertEquals(parseNonoAudit('{"session_id":"x"}'), null);
});

Deno.test("findAuditSession picks the newest session that tracked the path", () => {
  const list = JSON.stringify([
    {
      session_id: "old",
      started: "2026-11-03T08:00:00",
      tracked_paths: ["/b/steps/001"],
    },
    {
      session_id: "new",
      started: "2026-11-03T09:00:00",
      tracked_paths: ["/b/repo", "/b/steps/001"],
    },
    {
      session_id: "other",
      started: "2026-11-03T10:00:00",
      tracked_paths: ["/b/steps/002"],
    },
  ]);
  assertEquals(findAuditSession(list, "/b/steps/001"), "new");
  assertEquals(findAuditSession(list, "/nowhere"), null);
});

Deno.test("parseStubCall splits NUL-separated argv", () => {
  assertEquals(
    parseStubCall({
      invokedAs: "/box/bin/claude",
      argv: "-p\0--model\0claude-opus-5\0",
      cwd: "/box/tmp/x\n",
      stdin: "draft",
    }),
    {
      invokedAs: "/box/bin/claude",
      argv: ["-p", "--model", "claude-opus-5"],
      cwd: "/box/tmp/x",
      stdin: "draft",
    },
  );
});
