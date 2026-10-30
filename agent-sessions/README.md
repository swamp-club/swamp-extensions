# @swamp/agent-sessions

Imports what coding agents did in this repo as agent session records: the
data the dashboard's agent sessions page reads (swamp-club#4155). The record
is swamp's agent session record, version 2 (swamp-club#4154, #4178).

**Private while it is a prototype.** The manifest sets `visibility: private`.

## What it imports

The `import` method reads Claude Code's own transcripts on this machine, so
nothing needs installing or hooking up. It writes one `session` data item per
Claude Code session and one per subagent, named
`agent-session-claude-code_<id>`. Each record holds:

- the session's turns, with tokens per turn (input, output, cache read, cache
  write), counted once per model reply;
- every tool call: tool, canonical kind, start, end, success, exit code where
  a failed shell call states one, and its target text. A call that never got
  a result (interrupted, or still running) is not counted as a success;
- whether a person steered it (`interactive`) or automation did (`headless`,
  for example `claude -p`).

Calls are written `unlabeled`. Classifying them as swamp, bypass or neutral
is a later step (swamp-club#4157).

### Never stored

Prompts, replies, tool output, file contents, a subagent's brief and
description, and search queries or patterns. A call keeps only its target,
from an allowlist per tool: the shell command, the file path, the skill name,
the fetched URL, or a search's path. Any other tool keeps no text.

The target is redacted before it is written:

| Rule | Example |
| ---- | ------- |
| The session's cwd becomes relative | `/home/a/repo/models/x.yaml` → `models/x.yaml` |
| Home becomes `~` | `/home/a/notes` → `~/notes` |
| The harness's scratch folders and transcript root are masked | `$SCRATCH`, `$HARNESS_LOGS/…` |
| Git SHAs (40 hex in a git command, after `@`/`#`, in a `/commit/` URL) and `sha256:` digests are shortened; any other 40-hex, 64-hex or longer hex value is redacted | first 10 characters |
| `token=`, `secret=`, `password=`, `pass=`, `credentials=`, `auth=`, `key=`, `sig=`, `signature=` values, quoted or not (`DB_PASSWORD="two words"`, a signed URL's `X-Goog-Signature=`) | `token=‹redacted›` |
| Authorization headers and bearer tokens | `Authorization: Bearer ‹redacted›` |
| Secret flags, quoted or not, and flags ending in a secret's name (`--client-secret x`, `--db-password 'x'`) | `--password ‹redacted›` |
| Headers named for a secret (`X-Api-Key: x`, `PRIVATE-TOKEN: x`, `X-Auth: x`), and cookies (`Cookie: a=1; b=2`, `curl -b x`) | `X-Api-Key: ‹redacted›` |
| Secret-named fields in a JSON body, plain or with escaped quotes (`{"password":"x"}`) | `{"password":"‹redacted›"}` |
| `-u user:password`, passwords in URLs, `-p` passwords for mysql, `docker login` and `sshpass`, here-strings (`<<< x`) | `postgres://admin:‹redacted›@host` |
| Positional secrets: `configure set <secret-name> x`, `config set …:_authToken x`, `gh secret set NAME --body x`, every `k=v` of `vault kv put` / `vault write` | `aws configure set aws_secret_access_key ‹redacted›` |
| Known token shapes (`ghp_`, `github_pat_`, `sk-ant-`, `sk-`, `xox?-`, `AKIA`, `glpat-`) | `‹redacted›` |
| Emails, and logins at an IP address (`user@10.0.2.2`) | `‹email›` |
| Heredoc bodies, empty or left unterminated too | `<<EOF … EOF` |

A versioned specifier such as `zod@4.6.7` or `jsr:@std/path@1.1.4` is not an
email, and is kept.

Text over 1000 characters is cut and the call is marked `truncated`.
Redaction reads at most the first 4000 characters of a target (heredocs are
stripped from the first 16000), so a call holding a huge inline blob cannot
slow the import down. A short word the cut splits is dropped, so no partial
token is kept.

A session longer than the record allows (2,000 calls in one turn, 20,000 in
a session, 5,000 turns) keeps what fits; the import warns how many calls it
left out.

### Subagents

Each subagent, nested ones included, is its own record at full detail. It
names its parent session and its subagent type, and copies the parent's
`interactive` or `headless`. The call that started it points at it through
`subagentSessionId`.

## Which sessions

A session belongs to this repo when the working directory its transcript
records is:

- the repo or a directory below it;
- a worktree that `git worktree list` shows;
- or a path matching one of `worktreeGlobs`, for worktrees git no longer
  lists, when the session ran on one of this repo's branches. The default,
  `~/.cue/work/*/<repo>`, covers cue's worktrees; `<repo>` is the repo
  directory's name. Two repos can share a directory name, so the branch is
  what tells them apart; `main` and `master` prove nothing and never count.

Sessions from other repos on the machine are never read beyond the first
lines that name their directory and branch. The import remembers them by a
hash of their path, size and modification time, so the next import does not
read them again, and no other repo's paths are stored. A worktree session
left out only because its branch was missing is not remembered, so it is
imported once the branch is fetched.

## Re-importing

Run `import` as often as you like. A session whose transcript and subagent
files have the same size and modification time as at the last import, by the
same importer version, is skipped and writes nothing. A changed one is
rewritten under the same name, and swamp keeps one version of it. A new
version of this extension re-imports every session, so a fix reaches records
already written. A session that does not fit the record is reported once and
tried again only when its files or the extension change; one whose files
could not be read is tried again on the next import. When a subagent's
transcript is gone, or it is placed under a different parent, the record its
old id left behind is removed. A session that could not be written is tried
again next import; the others keep their place. When a session's transcript
is gone, its records stay but the import stops tracking it.

Claude Code deletes old transcripts after a while, so the import is the
lasting copy. Records are kept until removed.

Use one `@swamp/agent-sessions` behavior per repo: each one keeps its own
copy of every session.

## Usage

```bash
swamp model create @swamp/agent-sessions sessions
swamp model method run sessions import
```

| Argument | Default | Meaning |
| -------- | ------- | ------- |
| `since` | none | Only sessions whose transcript or any subagent changed on or after this date: `2026-10-01` (local midnight) or an ISO 8601 time. A session started earlier but active since is imported. |
| `projectsDir` | `CLAUDE_CONFIG_DIR/projects`, else `~/.claude/projects` | Where Claude Code keeps transcripts. |
| `worktreeGlobs` | `["~/.cue/work/*/<repo>"]` | Extra working directories that are this repo, counted only on this repo's branches. |

When you are logged in to swamp-club, each record carries your swamp-club
user id and username, taken once per import from `swamp auth whoami`.
Logged out, or with a collective API key, records carry no identity. If
`whoami` does not answer (offline, slow), a session keeps the identity its
last import recorded; one imported for the first time is written without
one and attributed by the next import that reaches `whoami`.

## Where it runs

The import reads files on the machine it runs on. It must run where the
transcripts are. Under `swamp serve --remote-only` a method runs on a worker,
which has no transcripts, and the import fails with an error that names the
host and the path it looked in.

## The contract copy

`extensions/models/_lib/contract/` holds a copy of swamp's
`src/domain/agent_sessions/session_record.ts` and its two generated JSON
Schemas, from swamp commit f40c05e37. Swamp owns the contract. When it
changes, copy all three again; `session_record_test.ts` fails when the copy
and the JSON Schemas disagree.
