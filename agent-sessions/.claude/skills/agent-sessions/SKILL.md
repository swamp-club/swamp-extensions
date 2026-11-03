---
name: agent-sessions
description: >
  Set up @swamp/agent-sessions and import what coding agents (Claude Code,
  Codex) did in this repo, then open the dashboard's Agent sessions page.
  Asks which sessions to import: this repo only, a few named repos, or every
  repo on the machine. Use when the user wants to see, import, track or
  review their agent sessions, what their agents did, which calls bypassed
  swamp, or to get started with agent observation. Triggers on "import my
  sessions", "agent sessions", "set up agent sessions", "what did my agents
  do", "show my Claude Code sessions", "import Codex sessions".
---

# Agent sessions: first import

Walk the user through one import and open the page. Run each command
yourself, in the swamp repo the user is in, on the machine where their agent
transcripts are (not a `swamp serve --remote-only` worker).

## 1. Say what it does

Before asking anything, tell the user in a few lines:

- It reads Claude Code's transcripts (`~/.claude/projects`) and Codex's
  rollouts (`~/.codex/sessions`) on this machine. Nothing is installed or
  hooked, and nothing leaves the machine: records go into this repo's swamp
  data.
- It never stores prompts, replies, reasoning, tool output or file contents.
  For each tool call it keeps the tool, timing, success, and one target: the
  command line, path, skill name or URL.
- That target is redacted: paths become relative, home becomes `~`, known
  secret shapes and emails are masked, heredoc bodies are dropped, and
  quoted free text (commit messages, PR bodies, `python -c` code, what
  `echo` writes) keeps only its length.
- Anyone who can read this repo's swamp data can read the records.

## 2. Ask which sessions to import

Ask one question, with these three choices:

1. **This repo only** (the default, recommended): sessions that ran in this
   repo, a directory below it, or any of its worktrees.
2. **This repo and a few others**: ask for the other repos' paths. Their
   sessions are stored in this repo's data too.
3. **Every repo on this machine**: say plainly what this does before they
   pick it. Every project's commands and paths, personal and client repos
   included, land in this repo's data, readable by anyone who can read it.
   If they choose it, ask whether any repos must stay out, by path or remote
   URL.

Don't ask about anything else. The other inputs (`since`, `projectsDir`,
`codexDir`, `worktreeGlobs`) have working defaults; see the extension's
README if the user asks.

## 3. Create the behavior

Check whether the repo already has one:

```bash
swamp behavior list --json
```

If a behavior of type `@swamp/agent-sessions` exists, use its name. Use one
per repo: each keeps its own copy of every session it imports. Otherwise
create it:

```bash
swamp behavior create @swamp/agent-sessions sessions
```

## 4. Run the import

Use the choice from step 2:

```bash
# 1. This repo only
swamp behavior run sessions import

# 2. Also other repos (paths; ~ and paths relative to this repo work)
swamp behavior run sessions import --input 'repos:json=["~/src/api","../web"]'

# 3. Every repo, leaving some out
swamp behavior run sessions import --input all=true \
  --input 'exclude:json=["~/src/client-repo"]'
```

The import ends with a line such as `Imported 42 of 42 sessions (7
subagents); 0 unchanged, 0 skipped`. Tell the user those counts and any
warnings it printed. If it says sessions were skipped because their repo
could not be found, those ran in directories that are gone or not git repos;
that is expected.

If it fails because no transcripts were found, it names the paths it looked
in. Claude Code keeps them in `CLAUDE_CONFIG_DIR/projects` when that is set,
and Codex in `CODEX_HOME/sessions`; pass `projectsDir` or `codexDir` only if
the user keeps them somewhere else.

If it imported 0 sessions, the user has no agent sessions for the repos they
picked yet. Say so and stop.

## 5. Open the page

```bash
swamp dashboard
```

It opens this repo's dashboard in the browser, with no `swamp serve`
needed, and keeps running until stopped, so start it in the background or
ask the user to run it. Over ssh, or with no browser, add `--no-browser`
and give the user the URL it prints. **Agent sessions** appears in the
sidebar once the repo has session records the viewer can read; the page is
marked **Preview**, since what it shows may change.

Tell the user they can run step 4's command again at any time: unchanged
sessions are skipped, and new or resumed ones are added.
