# @swamp/agent-sessions

Imports what coding agents did in this repo as agent session records: the
data the dashboard's Agent sessions page reads. The record is swamp's agent
session record, version 2.

**Preview.** The records and the page are new and may change between
versions. A new version of this extension re-imports every session, so a
change reaches records already written.

## Getting started

The extension ships a skill, `agent-sessions`, that walks an agent through
the first import: it asks whether to import this repo only, a few named
repos, or every repo on the machine, runs the import and opens the page. Ask
your agent to "import my agent sessions". By hand:

```bash
swamp extension pull @swamp/agent-sessions
swamp behavior create @swamp/agent-sessions sessions
swamp behavior run sessions import
swamp dashboard
```

`swamp dashboard` opens this repo's dashboard in the browser. **Agent
sessions** appears in its sidebar once the repo has session records you can
read. The page is marked Preview.

## Who can see the records

Records stay on this machine, in this repo's swamp data, like any other
behavior's data. The import sends nothing anywhere. If the repo's data is
shared (a shared datastore, or `swamp serve` with team members), anyone who
can read this behavior's data can read every session it imported, whoever's
agent ran it: access is per behavior, not per person.

## What it imports

The `import` method reads Claude Code's own transcripts and Codex's rollouts
on this machine, so nothing needs installing or hooking up. It writes one
`session` data item per session and one per subagent, named
`agent-session-claude-code_<id>` or `agent-session-codex_<id>`. Each record
holds:

- the session's turns, with tokens per turn (input, output, cache read, cache
  write), counted once per model reply;
- every tool call: tool, canonical kind, start, end, success, exit code where
  a failed shell call states one, and its target text. A call that never got
  a result (interrupted, or still running) is not counted as a success;
- whether a person steered it (`interactive`) or automation did (`headless`,
  for example `claude -p` or `codex exec`).

Every call is labelled, and each record carries findings (below).

### Codex

Codex (0.165 and later) writes one rollout per session under
`CODEX_HOME/sessions/YYYY/MM/DD/`, `~/.codex/sessions` by default. Its model
runs shell through `exec`, a tool whose input is a script that calls
`exec_command`, `apply_patch` and others, so the record holds what the
script did rather than the script:

- each command it ran is a shell call (`exec_command`), with its exit code
  when it failed; a command killed after its turn was interrupted is a
  failed call in that turn;
- each file an `apply_patch` touched is a call of its own (`apply_patch`), a
  new file a write and any other an edit, so a patch over a definition and a
  source file gives one bypass and one neutral call;
- `exec`, and the `wait` that resumes it, are not calls;
- the collaboration tools are calls with no target: `spawn_agent` a
  subagent call, `followup_task`, `send_message`, `wait_agent` and the rest
  other calls.

Only commands Codex ran are imported: one it declined to run leaves nothing
to read. A turn runs from the prompt to its end or interruption. Tokens are
counted once per model response; Codex counts cached tokens inside its input
tokens, so the record's `input` is the uncached part, as it is for Claude
Code, and `output` includes reasoning tokens.

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
from the lockfile swamp writes when it pulls one: `upstream_extensions.json`
in the repo's models directory, `extensions/models` unless `.swamp.yaml`
sets `modelsDir`. A worktree with no lockfile of its own reads its main
checkout's, since the lockfile is not committed by default. No manifest
says which program an extension wraps, so the extension's name stands in:
its name after the scope, without a `-runner` or `-cli` suffix.
`@swamp/git` covers `git`, `@swamp/deno-runner` covers `deno`.

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

Prompts, replies, reasoning, tool output, file contents, a subagent's brief
and description, search queries or patterns, Codex's `exec` scripts and the
messages its agents send each other, and the OpenAI account ids its rollouts
carry. A call keeps only its target,
from an allowlist per tool: the shell command, the file path, the skill name,
the fetched URL, or a search's path. Any other tool keeps no text.

The target is redacted before it is written:

| Rule | Example |
| ---- | ------- |
| Paths in the session's repo become relative to its root (the worktree's top directory) | `/home/a/repo/models/x.yaml` → `models/x.yaml` |
| Home becomes `~` | `/home/a/notes` → `~/notes` |
| The harness's scratch folders and both harnesses' transcript roots are masked | `$SCRATCH`, `$HARNESS_LOGS/…` |
| Git SHAs (40 hex in a git command, after `@`/`#`, in a `/commit/` URL) and `sha256:` digests are shortened; any other 40-hex, 64-hex or longer hex value is redacted | first 10 characters |
| `token=`, `secret=`, `password=`, `pass=`, `credentials=`, `auth=`, `key=`, `sig=`, `signature=` values, quoted or not (`DB_PASSWORD="two words"`, a signed URL's `X-Goog-Signature=`) | `token=‹redacted›` |
| Authorization headers and bearer tokens | `Authorization: Bearer ‹redacted›` |
| Secret flags, quoted or not, and flags ending in a secret's name (`--client-secret x`, `--db-password 'x'`) | `--password ‹redacted›` |
| Headers named for a secret (`X-Api-Key: x`, `PRIVATE-TOKEN: x`, `X-Auth: x`), and cookies (`Cookie: a=1; b=2`, `curl -b x`) | `X-Api-Key: ‹redacted›` |
| Secret-named fields in a JSON body, plain or with escaped quotes (`{"password":"x"}`) | `{"password":"‹redacted›"}` |
| `-u` credentials, passwords in URLs, `-p` passwords for mysql, `docker login` and `sshpass`, here-strings (`<<< x`) | `curl -u ‹redacted›` |
| Positional secrets: `configure set <secret-name> x`, `config set …:_authToken x`, `gh secret set NAME --body x`, every `k=v` of `vault kv put` / `vault write` | `aws configure set aws_secret_access_key ‹redacted›` |
| Known token shapes (`ghp_`, `github_pat_`, `sk-ant-`, `sk-`, `xox?-`, `AKIA`, `glpat-`) | `‹redacted›` |
| Emails, and logins at an IP address (`user@` and an IPv4 address) | `‹email›` |
| Heredoc bodies, empty or left unterminated too | `<<EOF … EOF` |
| Quoted free text in a shell command: `git commit`/`git tag` `-m` and `--message`; `gh` `--body`, `--title` and `--notes`; `python -c`, `node -e`/`--eval`/`-p`, `deno eval`, `ruby -e`, `perl -e`; every quoted argument of `echo` and `printf`. A quote left open drops the rest of the command. The commands of `sh -c` are kept | `git commit -m ‹text, 27 chars›` |

A versioned specifier such as `zod@4.6.7` or `jsr:@std/path@1.1.4` is not an
email, and is kept.

### What a call's text can still contain

Redaction masks the shapes above; it does not understand every command. A
call's text can still hold:

- the rest of a command line: program names, flags, paths outside home,
  unquoted words, and secrets in a shape the rules above don't know;
- an MCP tool's name, which names its server (`mcp__acme-db__query`);
- a fetched URL with its path and any query parameter not named like a
  secret;
- for Codex, a subagent's task path (`/root/git/models`), which the model
  chose and can describe the task.

Read a few records before sharing a repo's data more widely.

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

A Codex subagent has a rollout of its own, which names the thread that
spawned it; its record's id is its thread id and its `agentId` its task path
(`/root/git/models`). Its rollout starts with a copy of its parent's
history, which is skipped, so only the subagent's own calls are in it.

## Which sessions

Each session's repo is found from the working directory its transcript
records (for Codex, the one the session started in; a later `cd` is not
followed), and Codex's subagents go with the session that spawned them:

1. **The directory exists.** Git names its top directory and its main
   repo, so a worktree counts as the repo it was made from. The repo is
   known by its `origin` remote, normalized (`git@example.com:acme/demo.git`
   and `https://example.com/acme/demo` are both `example.com/acme/demo`;
   credentials in a URL are dropped), so two clones of one remote are one
   repo. A repo with no remote is known by its main checkout's path, home as
   `~`; outside home that is an absolute path.
2. **The directory is gone** (a removed worktree). It counts when it matches
   one of `worktreeGlobs` for a repo already found and the session ran on one
   of that repo's branches. `worktreeGlobs` is empty by default: name where
   your worktrees live, such as `~/worktrees/*/<repo>`, where `<repo>` is a
   repo's directory name. Two repos can share a
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

> **What `all` does.** It puts every project's commands and paths, personal
> and client repos included, into this one repo's data, where anyone who can
> read that data can read them. Use `exclude` for repos that must stay out,
> and think twice before importing with `all` into a repo whose data is
> shared.

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
is gone, its records stay but the import stops tracking it. A resumed Codex
session adds to its rollout, so the next import rewrites it with the new
turns.

Claude Code deletes old transcripts after a while, so the import is the
lasting copy. Records are kept until removed.

Use one `@swamp/agent-sessions` behavior per repo: each one keeps its own
copy of every session it imports.

## Usage

```bash
swamp behavior create @swamp/agent-sessions sessions
swamp behavior run sessions import
swamp behavior run sessions import --input 'repos:json=["~/src/other"]'
swamp behavior run sessions import --input all=true \
  --input 'exclude:json=["~/src/client-repo"]'
```

| Argument | Default | Meaning |
| -------- | ------- | ------- |
| `since` | none | Only sessions whose transcript, rollout or any subagent's changed on or after this date: `2026-10-01` (local midnight) or an ISO 8601 time. A session started earlier but active since is imported. |
| `projectsDir` | `CLAUDE_CONFIG_DIR/projects`, else `~/.claude/projects` | Where Claude Code keeps transcripts. |
| `codexDir` | `CODEX_HOME/sessions`, else `~/.codex/sessions` | Where Codex keeps rollouts. The import needs only one of the two to exist. |
| `worktreeGlobs` | `[]` | Where your worktrees live, such as `~/worktrees/*/<repo>`, so sessions whose worktree was removed can still be placed. `<repo>` is a repo's directory name; a match counts only on one of that repo's branches. |
| `repos` | `[]` | Other repos whose sessions to import too, as paths (`~` and paths relative to this repo work). One that is not there or not a git repo is reported and left out. |
| `all` | `false` | Import every session whose repo can be found, every project's (see above). |
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
host and the paths it looked in.

## Subprocesses

The import runs two programs, each with fixed arguments and no shell:

- `git`, read-only (`--version`, `rev-parse`, `config --get`,
  `for-each-ref`), once per distinct directory, to find a session's repo,
  its main checkout, its remote and its branches. It never prompts for
  credentials, takes no optional locks, and is stopped after 10 seconds.
- swamp itself, `swamp auth whoami --json --no-telemetry`, once per import,
  for the identity records carry.

## The contract copy

`extensions/models/_lib/contract/` holds a copy of swamp's
`src/domain/agent_sessions/session_record.ts` and its two generated JSON
Schemas, from swamp commit f40c05e37. Swamp owns the contract. When it
changes, copy all three again; `session_record_test.ts` fails when the copy
and the JSON Schemas disagree. The copy differs from swamp's in its zod
import specifier and one `swamp-quality-ignore credentials-sensitive-field`
comment above `TokenUsageSchema` (token counts, not secrets); keep both when
re-copying.
