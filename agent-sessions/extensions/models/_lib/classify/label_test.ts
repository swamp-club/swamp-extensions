import { assertEquals } from "jsr:@std/assert@1.0.19";
import { coverageOf, NO_COVERAGE } from "./coverage.ts";
import { labelCall, type LabelContext } from "./label.ts";

const bare: LabelContext = { root: "/r", coverage: NO_COVERAGE };
const covered: LabelContext = {
  root: "/r",
  coverage: coverageOf(["@swamp/git", "@swamp/deno-runner"]),
};

const shell = (command: string, ctx = bare) =>
  labelCall("Bash", { command }, ctx);

Deno.test("labelCall: a swamp segment is a swamp call, named by its subcommand", () => {
  assertEquals(shell("cd x && swamp model method run a sync --json"), {
    label: "swamp",
    category: "swamp model method",
    rule: "program = swamp",
  });
  assertEquals(shell("/usr/local/bin/swamp data get a").label, "swamp");
});

Deno.test("labelCall: a shell write to a definition is a bypass, even beside swamp", () => {
  assertEquals(
    shell("cat > models/a.yaml <<EOF\nx: 1\nEOF\nswamp model validate a"),
    {
      label: "bypass",
      category: "hand-edited definition",
      rule: "shell write to a swamp-managed path then ran swamp",
    },
  );
  assertEquals(shell("sed -i 's/a/b/' workflows/w.yaml").label, "bypass");
  assertEquals(
    shell("echo x | tee grants/g.yaml").category,
    "hand-edited definition",
  );
  assertEquals(
    shell("python3 - <<EOF\nopen(p, 'w').write(s)\nEOF\n# p = vaults/v.yaml")
      .category,
    "hand-edited definition",
  );
});

Deno.test("labelCall: a shell write elsewhere is user code", () => {
  assertEquals(shell("cat > src/a.ts <<EOF\nx\nEOF"), {
    label: "neutral",
    category: "user code (shell write)",
    rule: "shell write outside swamp-managed paths",
  });
});

Deno.test("labelCall: reading swamp's state directly is a bypass", () => {
  assertEquals(
    shell("cat .swamp/data/x/y.json").category,
    "read swamp state directly",
  );
  assertEquals(
    labelCall("Read", { file_path: "/r/.swamp/data/a" }, bare).label,
    "bypass",
  );
});

Deno.test("labelCall: a covered program is a bypass; read-only git is not", () => {
  assertEquals(shell("git commit -m x", covered), {
    label: "bypass",
    category: "git — covered by @swamp/git",
    rule: "program = git; @swamp/git is installed in this repo",
  });
  assertEquals(
    shell("deno test -A", covered).category,
    "deno — covered by @swamp/deno-runner",
  );
  assertEquals(shell("git -C x status && git log -3", covered), {
    label: "neutral",
    category: "git (read-only)",
    rule: "git read-only subcommand",
  });
  // Without the extension, deno is any other CLI and git stays neutral.
  assertEquals(shell("deno test").category, "other CLI: deno");
  assertEquals(shell("git commit -m x").label, "neutral");
});

Deno.test("labelCall: other programs that are not read-only are other CLI", () => {
  assertEquals(shell("ls && curl -s https://x | jq ."), {
    label: "bypass",
    category: "other CLI: curl",
    rule: "program = curl; no installed extension covers it",
  });
  assertEquals(shell("ls -la | grep x | wc -l").category, "read-only shell");
});

Deno.test("labelCall: reading pulled extension source is neutral, marked as a docs gap", () => {
  assertEquals(shell("cat .swamp/pulled-extensions/@swamp/git/models/git.ts"), {
    label: "neutral",
    category: "read extension source",
    rule: "read-only; .swamp/pulled-extensions (docs gap signal)",
  });
  assertEquals(
    labelCall(
      "Read",
      { file_path: "/r/.swamp/pulled-extensions/@x/y/a.ts" },
      bare,
    )
      .category,
    "read extension source",
  );
});

Deno.test("labelCall: file edits to swamp paths are bypasses; extensions and user code are neutral", () => {
  for (
    const path of ["/r/models/a.yaml", "/r/.swamp.yaml", "/r/grants/g.yaml"]
  ) {
    assertEquals(
      labelCall("Edit", { file_path: path }, bare).category,
      "hand-edited definition",
    );
  }
  assertEquals(
    labelCall("NotebookEdit", { notebook_path: "/r/vaults/n.ipynb" }, bare)
      .label,
    "bypass",
  );
  assertEquals(
    labelCall("Write", { file_path: "/r/extensions/models/a.ts" }, bare)
      .category,
    "extension authoring",
  );
  assertEquals(labelCall("Write", { file_path: "/r/src/a.ts" }, bare), {
    label: "neutral",
    category: "user code",
    rule: "Write outside swamp-managed paths",
  });
});

Deno.test("labelCall: skills, subagents and other tools are neutral", () => {
  assertEquals(
    labelCall("Skill", { skill: "swamp" }, bare).category,
    "skill: swamp",
  );
  assertEquals(labelCall("Agent", {}, bare), {
    label: "neutral",
    category: "agent",
    rule: "Agent tool",
  });
});

Deno.test("labelCall: stored category and rule hold no paths, flag values or secrets", () => {
  // A flag's value is not a subcommand.
  assertEquals(
    shell("swamp --repo-dir /home/alice/repo model get a").category,
    "swamp model get",
  );
  // A program by path is stored by its name; the home path never is.
  const tool = shell("/home/alice/.local/bin/mytool --go");
  assertEquals(tool.category, "other CLI: mytool");
  assertEquals(tool.rule.includes("/home/alice"), false);
  // A quoted assignment prefix is skipped whole, not taken as the program.
  const deploy = shell('AUTH="Bearer s3cr3tvalue" ./deploy.sh');
  assertEquals(deploy.category, "other CLI: deploy.sh");
  assertEquals(JSON.stringify(deploy).includes("s3cr3t"), false);
  // Anything that is not a plain name is not stored.
  assertEquals(
    shell("'weird prog' x").category,
    "other CLI: an unnamed program",
  );
});

Deno.test("labelCall: a covered program found by path; extension source is not a definition", () => {
  assertEquals(
    shell("/usr/bin/git commit -m x", covered).category,
    "git — covered by @swamp/git",
  );
  assertEquals(
    shell("cat > extensions/models/foo.ts <<EOF\nx\nEOF").category,
    "user code (shell write)",
  );
  assertEquals(
    shell("sed -i 's/a/b/' /r/extensions/workflows/w.ts").label,
    "neutral",
  );
  // A definition in the repo still is.
  assertEquals(
    shell("sed -i 's/a/b/' /r/models/a.yaml").category,
    "hand-edited definition",
  );
});

Deno.test("labelCall: the swamp state rule names the folder it read", () => {
  assertEquals(
    shell("cat .swamp/outputs/x").rule,
    "path under .swamp/outputs; swamp data and output commands cover it",
  );
});
