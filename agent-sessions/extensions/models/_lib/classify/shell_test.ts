import { assertEquals } from "jsr:@std/assert@1.0.19";
import { program, segments } from "./shell.ts";

Deno.test("segments: splits on operators, pipes and newlines outside quotes", () => {
  assertEquals(
    segments("cd x && swamp model get a | jq . ; echo 'a && b'\nls"),
    ["cd x", "swamp model get a", "jq .", "echo 'a && b'", "ls"],
  );
  assertEquals(segments("(git status) || true"), ["git status", "true"]);
});

Deno.test("segments: drops run prefixes, assignments and comments", () => {
  assertEquals(
    segments(
      "FOO=1 env -u A timeout 5 swamp data get x; X=2; # note\ntime deno test",
    ),
    ["swamp data get x", "deno test"],
  );
  assertEquals(segments("for f in *; do cat $f; done"), [
    "for f in *",
    "cat $f",
    "done",
  ]);
});

Deno.test("segments: a redirect to stderr is not a separator, and heredoc bodies are ignored", () => {
  assertEquals(segments("swamp x 2>&1 | tail -2"), ["swamp x 2>&1", "tail -2"]);
  assertEquals(
    segments("cat > a <<EOF\nrm -rf / && curl x\nEOF\nswamp model validate a"),
    ["cat > a <<EOF … EOF", "swamp model validate a"],
  );
});

Deno.test("program: the segment's first word", () => {
  assertEquals(program("git -C x status"), "git");
  assertEquals(program(""), "");
});

Deno.test("segments: a quoted assignment prefix is dropped whole", () => {
  assertEquals(segments(`AUTH="Bearer x y" TOKEN='a b' ./deploy.sh`), [
    "./deploy.sh",
  ]);
  assertEquals(segments(`A="x y"; ls`), ["ls"]);
});
