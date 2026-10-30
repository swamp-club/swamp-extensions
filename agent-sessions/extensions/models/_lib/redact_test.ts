import { assert, assertEquals, assertFalse } from "jsr:@std/assert@1.0.19";
import {
  callTarget,
  callText,
  capText,
  redact,
  type RedactContext,
  stripHeredocs,
} from "./redact.ts";

const CTX: RedactContext = {
  cwd: "/home/alice/src/demo",
  home: "/home/alice",
  projectsDir: "/home/alice/.claude/projects",
};

Deno.test("redact: the session's cwd becomes relative", () => {
  assertEquals(
    redact(
      "cat /home/alice/src/demo/models/a.yaml && cd /home/alice/src/demo",
      CTX,
    ),
    "cat models/a.yaml && cd .",
  );
});

Deno.test("redact: home becomes ~", () => {
  assertEquals(redact("ls /home/alice/other", CTX), "ls ~/other");
});

Deno.test("redact: harness log paths are masked", () => {
  assertEquals(
    redact("cat /home/alice/.claude/projects/-x/abc.jsonl | wc -l", CTX),
    "cat $HARNESS_LOGS/… | wc -l",
  );
  assertEquals(
    redact("ls ~/.claude/projects/-x", { cwd: "/w" }),
    "ls $HARNESS_LOGS/…",
  );
});

Deno.test("redact: the harness scratch folder is masked", () => {
  assertEquals(
    redact("cat /tmp/nix-shell.ab12/claude-1000/-p/s1/scratchpad/x.txt", CTX),
    "cat $SCRATCH",
  );
  assertEquals(redact("ls /tmp/claude-501/p/q", CTX), "ls $SCRATCH");
});

Deno.test("redact: git SHAs and sha256 digests are shortened, a bare 64-hex value is redacted", () => {
  const sha1 = "0123456789abcdef0123456789abcdef01234567";
  const sha256 = "a".repeat(64);
  assertEquals(
    redact(`git show ${sha1}; docker pull img@sha256:${sha256}`, CTX),
    "git show 0123456789; docker pull img@sha256:aaaaaaaaaa",
  );
  assertEquals(
    redact(`curl -H "X-Foo: ${sha256}"`, CTX),
    `curl -H "X-Foo: ‹redacted›"`,
  );
});

Deno.test("redact: key=value secrets are masked, case-insensitively", () => {
  assertEquals(
    redact("API_KEY=sk-123 run --input token=abc PASSWORD=x secret=y", CTX),
    "API_KEY=‹redacted› run --input token=‹redacted› PASSWORD=‹redacted› secret=‹redacted›",
  );
});

Deno.test("redact: authorization headers and bearer tokens are masked", () => {
  assertEquals(
    redact(`curl -H 'Authorization: Bearer eyJhbGciOi.abc' https://x`, CTX),
    `curl -H 'Authorization: Bearer ‹redacted›' https://x`,
  );
  assertEquals(
    redact("curl -H authorization:abc123 u", CTX),
    "curl -H authorization:‹redacted› u",
  );
  assertEquals(
    redact("echo bearer abcdefgh12345", CTX),
    "echo Bearer ‹redacted›",
  );
});

Deno.test("redact: secret flags followed by a space are masked", () => {
  assertEquals(
    redact("mysql --password hunter2 --token t0k -u root", CTX),
    "mysql --password ‹redacted› --token ‹redacted› -u root",
  );
  // A flag with no value keeps the next flag.
  assertEquals(
    redact("login --password --user x", CTX),
    "login --password --user x",
  );
});

Deno.test("redact: emails are masked", () => {
  assertEquals(
    redact("git commit --author 'A <alice@example.com>'", CTX),
    "git commit --author 'A <‹email›>'",
  );
});

Deno.test("stripHeredocs: drops the body and keeps the rest of the line", () => {
  const cmd = "cat > f.yaml <<'EOF' && echo done\nsecret body\nmore\nEOF\nls";
  assertEquals(stripHeredocs(cmd), "cat > f.yaml <<EOF … EOF && echo done\nls");
});

Deno.test("capText: cuts to 1000 characters and marks it", () => {
  assertEquals(capText("short"), { text: "short" });
  const cut = capText("x".repeat(1500));
  assertEquals(cut.text.length, 1000);
  assert(cut.text.endsWith("…"));
  assertEquals(cut.truncated, true);
  // A cut never splits a surrogate pair.
  const emoji = capText("x".repeat(998) + "😀" + "y".repeat(10));
  assertEquals(emoji.text, "x".repeat(998) + "…");
});

Deno.test("callTarget: only allowlisted fields, never model-written text", () => {
  assertEquals(
    callTarget("Bash", { command: "ls", description: "List" }),
    "ls",
  );
  assertEquals(callTarget("Read", { file_path: "/a" }), "/a");
  assertEquals(callTarget("Skill", { skill: "swamp", args: "do x" }), "swamp");
  assertEquals(
    callTarget("WebFetch", { url: "https://x", prompt: "sum" }),
    "https://x",
  );
  assertEquals(callTarget("Grep", { pattern: "secret", path: "src" }), "src");
  assertEquals(callTarget("WebSearch", { query: "how to" }), "");
  assertEquals(callTarget("Agent", { description: "d", prompt: "p" }), "");
  assertEquals(callTarget("Write", { file_path: "/a", content: "body" }), "/a");
  assertEquals(callTarget("mcp__x__y", { q: "z" }), "");
  assertEquals(callTarget("Bash", "not an object"), "");
});

Deno.test("callText: redacts, then caps", () => {
  assertEquals(
    callText("Bash", { command: "cat /home/alice/src/demo/a token=1" }, CTX),
    { text: "cat a token=‹redacted›" },
  );
});

Deno.test("redact: the cwd and home are replaced only at a path boundary", () => {
  assertEquals(
    redact("ls /home/alice/src/demo-two/x /home/alice/src/demo", CTX),
    "ls ~/src/demo-two/x .",
  );
  assertEquals(redact("ls /home/alicebob/x", CTX), "ls /home/alicebob/x");
  assertEquals(
    redact("curl http://x/www/y", { cwd: "/w" }),
    "curl http://x/www/y",
  );
});

Deno.test("redact: user:password, here-strings, mysql -p and provider tokens are masked", () => {
  assertEquals(
    redact("curl -u admin:hunter2 https://x", CTX),
    "curl -u admin:‹redacted› https://x",
  );
  assertEquals(
    redact("gh auth login --with-token <<< ghp_abc", CTX),
    "gh auth login --with-token <<< ‹redacted›",
  );
  assertEquals(
    redact("mysql -u root -psecret db", CTX),
    "mysql -u root -p‹redacted› db",
  );
  assertEquals(
    redact(
      "deploy ghp_0123456789abcdefABCDEF0123 AKIAABCDEFGHIJKLMNOP sk-ant-api03-abcdefghij xoxb-1234567890-abc",
      CTX,
    ),
    "deploy ‹redacted› ‹redacted› ‹redacted› ‹redacted›",
  );
  // git push -u has no user:password, and is left alone.
  assertEquals(
    redact("git push -u origin main", CTX),
    "git push -u origin main",
  );
});

Deno.test("redact: home is masked before any non-name character", () => {
  assertEquals(
    redact("sed 's#/home/alice#~#g' && grep '/home/alice[^\"]*'", CTX),
    "sed 's#~#~#g' && grep '~[^\"]*'",
  );
});

Deno.test("redact: quoted and prefixed secret flags are masked", () => {
  assertEquals(
    redact(`login --password 'hunter2' --token "abc 123" --api-key='x'`, CTX),
    "login --password ‹redacted› --token ‹redacted› --api-key=‹redacted›",
  );
  assertEquals(
    redact(
      "az login --client-secret abc --db-password=def --private-key k",
      CTX,
    ),
    "az login --client-secret ‹redacted› --db-password=‹redacted› --private-key ‹redacted›",
  );
  // A flag that only contains a secret's name, not ends in it, is kept.
  assertEquals(redact("x --token-file t.txt", CTX), "x --token-file t.txt");
});

Deno.test("redact: login-style -p passwords are masked, quoted or not", () => {
  assertEquals(
    redact("docker login -u me -p s3cret registry.io", CTX),
    "docker login -u me -p ‹redacted› registry.io",
  );
  assertEquals(
    redact("sshpass -p 'pw' ssh host", CTX),
    "sshpass -p ‹redacted› ssh host",
  );
  assertEquals(redact("mysql -p'x y' db", CTX), "mysql -p‹redacted› db");
  // Elsewhere -p is just a flag.
  assertEquals(redact("mkdir -p a/b", CTX), "mkdir -p a/b");
});

Deno.test("redact: a password in a URL is masked, the user and host kept", () => {
  assertEquals(
    redact("psql postgres://admin:hunter2@localhost:5432/db", CTX),
    "psql postgres://admin:‹redacted›@localhost:5432/db",
  );
  assertEquals(
    redact("git clone https://u:p!ss@github.com/o/r", CTX),
    "git clone https://u:‹redacted›@github.com/o/r",
  );
});

Deno.test("redact: secret-named headers are masked", () => {
  assertEquals(
    redact(`curl -H 'X-Api-Key: abc' -H "PRIVATE-TOKEN: def" u`, CTX),
    `curl -H 'X-Api-Key: ‹redacted›' -H "PRIVATE-TOKEN: ‹redacted›" u`,
  );
});

Deno.test("redact: versioned specifiers are not emails", () => {
  assertEquals(
    redact("deno add jsr:@std/path@1.1.4 && npm i zod@4.6.7", CTX),
    "deno add jsr:@std/path@1.1.4 && npm i zod@4.6.7",
  );
  assertEquals(
    redact("swamp extension pull @swamp/aws@2026.10.30.1", CTX),
    "swamp extension pull @swamp/aws@2026.10.30.1",
  );
  assertEquals(redact("mail bob@mail.example.org", CTX), "mail ‹email›");
  assertEquals(
    redact("ssh -p 22 alice@10.0.2.2 true", CTX),
    "ssh -p 22 ‹email› true",
  );
});

Deno.test("redact: the transcript root is masked even when the cwd is home", () => {
  assertEquals(
    redact("cat /home/alice/.claude/projects/-home-alice-x/s.jsonl", {
      ...CTX,
      cwd: "/home/alice",
    }),
    "cat $HARNESS_LOGS/…",
  );
});

Deno.test("stripHeredocs: an empty body, and an unterminated one, are dropped", () => {
  assertEquals(
    stripHeredocs("cat > f <<EOF\nEOF\nls"),
    "cat > f <<EOF … EOF\nls",
  );
  assertEquals(
    stripHeredocs("cat > f <<'END'\nsecret file body\nno end"),
    "cat > f <<EOF …",
  );
  // A here-string is not a heredoc.
  assertEquals(stripHeredocs("gh x <<< tok\nls"), "gh x <<< tok\nls");
});

Deno.test("redact: positional secrets in config set, gh secret set and vault writes", () => {
  assertEquals(
    redact("aws configure set aws_secret_access_key wJalrXUtnFEMI", CTX),
    "aws configure set aws_secret_access_key ‹redacted›",
  );
  assertEquals(
    redact("npm config set //registry.npmjs.org/:_authToken abc", CTX),
    "npm config set //registry.npmjs.org/:_authToken ‹redacted›",
  );
  assertEquals(
    redact("gh secret set API --body 'v'", CTX),
    "gh secret set API --body ‹redacted›",
  );
  assertEquals(
    redact("vault kv put secret/app user=bob pass=x @file && ls", CTX),
    "vault kv put secret/app user=‹redacted› pass=‹redacted› @file && ls",
  );
  // A config set of a harmless name is kept.
  assertEquals(
    redact("git config set user.name Bob", CTX),
    "git config set user.name Bob",
  );
});

Deno.test("redact: a long underscore flag does not backtrack forever", () => {
  const flag = ` --a${"_b".repeat(40)} value`;
  const start = performance.now();
  assertEquals(redact(flag, CTX), flag);
  assert(performance.now() - start < 1000);
});

Deno.test("callText: a huge target is cut before redaction and marked truncated", () => {
  const start = performance.now();
  const out = callText("Bash", { command: `echo ${"z".repeat(200_000)}` }, CTX);
  assert(performance.now() - start < 2000);
  assertEquals(out.text.length, 1000);
  assertEquals(out.truncated, true);
});

Deno.test("redact: JSON-body secrets, plain or escaped, and cookies are masked", () => {
  assertEquals(
    redact(`curl -d '{"user":"bob","password":"hunter2"}' u`, CTX),
    `curl -d '{"user":"bob","password":"‹redacted›"}' u`,
  );
  assertEquals(
    redact(`curl -d "{\\"api_key\\": \\"abc\\"}" u`, CTX),
    `curl -d "{\\"api_key\\": \\"‹redacted›\\"}" u`,
  );
  assertEquals(
    redact(`curl -H 'Cookie: session=abc; theme=dark' -H 'X-Auth: tok' u`, CTX),
    `curl -H 'Cookie: ‹redacted›' -H 'X-Auth: ‹redacted›' u`,
  );
  assertEquals(
    redact("curl -b 'sid=abc' https://x", CTX),
    "curl -b ‹redacted› https://x",
  );
});

Deno.test("callText: a heredoc with no terminator and endless blank lines stays fast", () => {
  const start = performance.now();
  const out = callText(
    "Bash",
    { command: `cat <<A\n${" \n".repeat(200_000)}` },
    CTX,
  );
  assert(performance.now() - start < 2000);
  assertEquals(out.text, "cat <<EOF …");
});

Deno.test("callText: a token split by the input bound is dropped, not kept in part", () => {
  // Paths under the cwd shrink to almost nothing, so the cut lands well
  // inside the stored cap.
  const filler = "/home/alice/src/demo/x ".repeat(173);
  const out = callText(
    "Bash",
    { command: `${filler}ghp_${"A".repeat(40)} tail` },
    CTX,
  );
  assertFalse(out.text.includes("ghp_"));
  assertEquals(out.truncated, true);
});

Deno.test("redact: secret assignments keep no part of a quoted value", () => {
  assertEquals(
    redact(`export DB_PASSWORD="correct horse battery" && run`, CTX),
    "export DB_PASSWORD=‹redacted› && run",
  );
  assertEquals(
    redact(
      "docker run -e POSTGRES_PASSWORD='hunter two' -e PASS=x -e AUTH=y img",
      CTX,
    ),
    "docker run -e POSTGRES_PASSWORD=‹redacted› -e PASS=‹redacted› -e AUTH=‹redacted› img",
  );
});

Deno.test("redact: a URL password holding / or @ is masked whole", () => {
  assertEquals(
    redact("psql postgres://admin:ab/c@d@db/app", CTX),
    "psql postgres://admin:‹redacted›@db/app",
  );
});

Deno.test("stripHeredocs: a shift in shell arithmetic is not a heredoc", () => {
  assertEquals(
    stripHeredocs("echo $((1<<n))\nls -la"),
    "echo $((1<<n))\nls -la",
  );
});

Deno.test("redact: a 40-hex value is shortened as a git SHA only in git context", () => {
  const hex = "0123456789abcdef0123456789abcdef01234567";
  assertEquals(redact(`git show ${hex}`, CTX), "git show 0123456789");
  assertEquals(
    redact(`curl https://x/commit/${hex} && npm i pkg@${hex}`, CTX),
    "curl https://x/commit/0123456789 && npm i pkg@0123456789",
  );
  assertEquals(
    redact(`curl -H 'X-Foo: ${hex}' u`, CTX),
    "curl -H 'X-Foo: ‹redacted›' u",
  );
});

Deno.test("redact: URL signatures, hex or base64, are masked", () => {
  assertEquals(
    redact(`curl 'https://s/o?X-Goog-Signature=${"ab".repeat(256)}&x=1'`, CTX),
    "curl 'https://s/o?X-Goog-Signature=‹redacted›'",
  );
  assertEquals(
    redact("curl 'https://a.blob/x?sv=1&sig=AbC%2Bd%3D&se=2'", CTX),
    "curl 'https://a.blob/x?sv=1&sig=‹redacted›'",
  );
  assertEquals(redact(`echo ${"f".repeat(128)}`, CTX), "echo ‹redacted›");
});
