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

Every call is labelled, and each record carries findings (below).

## Labels

Each call is labelled `swamp` (it used swamp), `bypass` (it did a job swamp
could have done, around it) or `neutral` (neither), with a category and the
rule that decided it. Rules only, no model. They read the call's raw input,
heredoc bodies included, before redaction; the first that matches wins. A
category or rule keeps only a program's plain file name and swamp's
subcommand words, never a path, a flag's value or an assignment:

| Rule | Label | Category |
| ---- | ----- | -------- |
| A shell write (`cat >`, `sed -i`, `tee`, a redirect, a script writing a file) to a swamp-managed path: `models/`, `workflows/`, `vaults/`, `grants/`, `.swamp.yaml` (not an extension's own `extensions/models/`). Wins over a swamp call in the same command | bypass | hand-edited definition |
| Any shell segment whose program is `swamp` | swamp | `swamp <command>` |
| Any other shell write | neutral | user code (shell write) |
| Reading `.swamp/data`, `.swamp/outputs` or `.swamp/logs` directly | bypass | read swamp state directly |
| Running a program an installed extension covers; read-only git subcommands (`status`, `log`, `diff`, `show`, …) are not | bypass | `git — covered by @swamp/git` |
| Reading `.swamp/pulled-extensions` with read-only programs | neutral | read extension source |
| Any other program that is not read-only | bypass | `other CLI: <program>` |
| Read-only programs (`ls`, `cat`, `grep`, `jq`, …) and other git | neutral | read-only shell, git |
| An edit or write to a swamp-managed path, or under `.swamp/` | bypass | hand-edited definition |
| An edit or write under `extensions/`, or elsewhere | neutral | extension authoring, user code |
| A Read of `.swamp/data`; of `.swamp/pulled-extensions` | bypass; neutral | read swamp state directly; read extension source |
| Skills, searches, web, MCP, subagents and other tools | neutral | the tool |

**Coverage** comes from the extensions installed in the session's repo, read
from its `.swamp/upstream_extensions.json` (a worktree, whose `.swamp` is
not checked in, reads its main checkout's). No manifest says which program
an extension wraps, so the extension's name stands in: its name after the
scope, without a `-runner` or `-cli` suffix. `@swamp/git` covers `git`,
`@swamp/deno-runner` covers `deno`.

## Findings

Each record gets findings from its own calls, so a subagent's findings are
about that subagent and its calls are never counted in its parent's. Each
names where to tune: a skill, a rule or swamp.

| Finding | Severity |
| ------- | -------- |
| The same definition hand-edited 3 or more times, with the calls that failed between the first and last edit | high when any failed between, else medium |
| Failed calls less than 3 minutes apart | medium for 2, high for 3 or more |
| Running a program an installed extension covers, one finding per program | medium |
| 3 or more reads of pulled extension source (a docs or skill gap) | medium |

### Never stored

Prompts, replies, tool output, file contents, a subagent's brief and
description, and search queries or patterns. A call keeps only its target,
from an allowlist per tool: the shell command, the file path, the skill name,
the fetched URL, or a search's path. Any other tool keeps no text.

The target is redacted before it is written:

| Rule | Example |
| ---- | ------- |
| Paths in the session's repo become relative to its root (the worktree's top directory) | `/home/a/repo/models/x.yaml` → `models/x.yaml` |
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

Each session's repo is found from the working directory its transcript
records:

1. **The directory exists.** Git names its top directory and its main
   repo, so a worktree counts as the repo it was made from. The repo is
   known by its `origin` remote, normalized (`git@example.com:acme/demo.git`
   and `https://example.com/acme/demo` are both `example.com/acme/demo`;
   credentials in a URL are dropped), so two clones of one remote are one
   repo. A repo with no remote is known by its main checkout's path, home as
   `~`; outside home that is an absolute path.
2. **The directory is gone** (a removed worktree). It counts when it matches
   one of `worktreeGlobs` for a repo already found and the session ran on one
   of that repo's branches. The default, `~/.cue/work/*/<repo>`, covers cue's
   worktrees; `<repo>` is a repo's directory name. Two repos can share a
   directory name, so the branch is what tells them apart; `main` and
   `master` prove nothing and never count, and a branch two such repos both
   have leaves the session unplaced (repos the import has seen sessions of
   count, including ones it skipped reading).
3. **Otherwise** (not a git folder, a repo that is gone) the session is
   skipped, and the import reports how many were.

Git runs once per distinct directory. By default the import takes the
sessions of the repo it runs in: the repo, a directory below it (one since
deleted too), or any of its worktrees. Without git on PATH it takes the
sessions at or below the repo's path, and says so. When the swamp repo is a folder inside a larger git repo,
only sessions in that folder (in any worktree) count. A swamp repo that is
not a git repo takes the sessions at or below its path. A git repo nested in
the swamp repo is its own repo and is not taken.

- `repos` adds other repos, by path. Each is matched the same way, and its
  records land in the repo the import runs in.
- `all` takes every session on the machine whose repo can be found.
- `exclude` leaves repos out, by path or remote URL. Excluding one clone
  leaves out every clone of its remote. Excluding the repo the import runs in
  is an error.

> **`all` is for internal or local testing only.** It puts every project's
> commands and paths, personal and client repos included, into one repo's
> data. Use `exclude` for repos that must stay out, and never push that data
> anywhere shared.

Each record names its repo in `repo` (also in its `summary` tag) and in a
`repo` tag, so a list can filter by repo. Two swamp repos in different
folders of one git repo share one name.

Sessions not imported are never read beyond the first lines that name their
directory and branch. The import remembers each transcript, by a hash of
its path, with its size and modification time and hashes of its repo's name
and main checkout, so the next import does not read it again, even with
different `repos`, `all` or `exclude`. No path or repo name is stored in
plain text, though the hashes are unsalted: someone holding the data can
test a guessed repo name. A repo known by its path (no remote) is not
remembered, so once it gains a remote it is read again under its new name. A
session placed by its branch, or not placed at all, is not remembered, so a
later fetch or clone can place it. A run that imports fewer repos than an
earlier one leaves the others' records and import state alone.

## Re-importing

Run `import` as often as you like. A session whose transcript and subagent
files have the same size and modification time as at the last import, by the
same importer version, with the same extensions installed in its repo, is
skipped and writes nothing. Pulling or removing an extension relabels that
repo's sessions on the next import. A changed one is
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
copy of every session it imports.

## Usage

```bash
swamp model create @swamp/agent-sessions sessions
swamp model method run sessions import
swamp model method run sessions import --input 'repos:json=["~/src/other"]'
swamp model method run sessions import --input all=true \
  --input 'exclude:json=["~/src/client-repo"]'
```

| Argument | Default | Meaning |
| -------- | ------- | ------- |
| `since` | none | Only sessions whose transcript or any subagent changed on or after this date: `2026-10-01` (local midnight) or an ISO 8601 time. A session started earlier but active since is imported. |
| `projectsDir` | `CLAUDE_CONFIG_DIR/projects`, else `~/.claude/projects` | Where Claude Code keeps transcripts. |
| `worktreeGlobs` | `["~/.cue/work/*/<repo>"]` | Where removed worktrees were. `<repo>` is a repo's directory name; a match counts only on one of that repo's branches. |
| `repos` | `[]` | Other repos whose sessions to import too, as paths (`~` and paths relative to this repo work). One that is not there or not a git repo is reported and left out. |
| `all` | `false` | Import every session whose repo can be found. Internal or local testing only (see above). |
| `exclude` | `[]` | Repos to leave out, as paths or remote URLs. |

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
