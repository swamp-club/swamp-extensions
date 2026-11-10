# Swampify

Swampify is a second way into swamp for someone who already has Claude Code or
Codex history. Their own agent assesses those sessions, offers three to five
repeated chores worth automating, builds the one the user picks, and reports
what that chore cost raw against what it costs with swamp. Swamp hosts no model:
the mining is deterministic, and every judgement call is made by the user's own
agent.

This document defines the two data contracts every Swampify piece shares
(swamp-club#4606): a **candidate set** and a **comparison**. They live in
`extensions/models/_lib/contract/swampify.ts`. Unlike the agent session record,
which core owns and this extension copies, these contracts are owned by this
extension, and core copies them.

## The journey

1. **Start.** `swamp start` offers "Start from your past sessions" beside the
   typed task when it finds `~/.claude/projects` or `~/.codex/sessions`. It says
   what will be read, for how long a window, and where results go.
2. **Import and mine.** The agent runs `import` (session records, as today),
   then `assess`, which reads the transcripts and writes one candidate set. No
   model is involved.
3. **Understand.** For the top candidates, the agent opens a few example
   sessions each, merges candidates that are the same chore, and checks the
   registry for a type that fits.
4. **Offer.** The agent shows three to five options, each with its evidence, in
   the terminal and on the dashboard's Swampify panel. The user picks one.
5. **Swamp it.** The getting-started flow finds or creates a behavior or
   workflow, validates it, and runs it once.
6. **Compare.** `compare` writes one comparison for that candidate: what the
   chore cost raw, what the swamp run cost, and when the build pays back.
7. **Graduate.** The agent offers the next candidate, and later re-runs `import`
   and `compare` so the forward figures fill in.

Steps 2 and 6 write the two contracts below. `assess`, `compare`, the Swampify
skill, the `swamp start` option and the core panel each have their own issue.

## Rules both contracts follow

They follow the agent session record's conventions (core's
`design/surfaces/agent-sessions.md`):

- **Strict.** Every object refuses a field it does not name.
- **Bounded.** Every string and list has a cap (`SWAMPIFY_LIMITS`). Counts
  always carry true totals; only the sample lists are capped.
- **Versioned.** `schemaVersion` is in every item. A new field, even an optional
  one, is a new version.
- **A reader that never throws.** `readSwampifyCandidateSet` and
  `readSwampifyComparison` return the item or a skip:

  | Reason    | When                                                    | Note tells the viewer to            |
  | --------- | ------------------------------------------------------- | ----------------------------------- |
  | `newer`   | the version is above what this module reads             | upgrade swamp and the extension     |
  | `older`   | a version this module no longer reads                   | run the assessment or compare again |
  | `invalid` | no integer `schemaVersion`, or content fails the schema | report the bad item                 |

  A note names field paths, never values, except the integer `schemaVersion`.
  Both readers use one exported version gate, `readVersionedGate`. The
  candidate-set reader counts every list on the raw content before it parses
  anything, so an oversized set costs only those counts.
- **Tags for lists.** Each item carries `generatedAt` and a compact `summary` as
  tags, so a list never loads a body.

Times are ISO 8601 UTC (`toISOString()`). Durations are milliseconds. Tokens are
the primary unit; any money figure is optional and an estimate.

## Candidate set (`SwampifyCandidateSet` v1)

One data item per behavior, named `swampify-candidates`, with the `type` tag
`swampify-candidates`. Re-running `assess` writes a new version of the same
item.

| Field             | Meaning                                                                                             |
| ----------------- | --------------------------------------------------------------------------------------------------- |
| `schemaVersion`   | `1`                                                                                                 |
| `generatedAt`     | when the assessment ran                                                                             |
| `importerVersion` | the extension version that wrote it                                                                 |
| `window`          | `since` and `until`: the transcripts' time window                                                   |
| `scope`           | `harnesses` read (slugs, as in session records), `all`, `include` and `exclude` paths (home as `~`) |
| `candidates`      | at most 100, ranked by `assess`                                                                     |

Each candidate:

| Field                                    | Meaning                                                                                                                                                 |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                                     | 32 hex digits from `swampifyCandidateId` (see Ids)                                                                                                      |
| `kind`                                   | `prompt-repeat`, `call-sequence`, `covered-cli` or `headless-job`                                                                                       |
| `invocation`                             | `interactive` or `headless`                                                                                                                             |
| `label`                                  | a deterministic name, at most 200 characters                                                                                                            |
| `occurrences`, `sessions`, `directories` | totals; `directories` counts the distinct working directories the occurrences ran in, which can exceed `sessions`, since a session can change directory |
| `firstSeen`, `lastSeen`                  | the first and last occurrence                                                                                                                           |
| `perOccurrence`                          | cost of one occurrence as ranges (`min`, `median`, `max`): tokens (input, output, cache read, cache write), tool calls, active ms                       |
| `failureRate`                            | the share of occurrences with a failed call, 0 to 1                                                                                                     |
| `sessionRefs`                            | at most 50 sessions it was seen in, each `{ harness, sessionId }` as its session record names it                                                        |
| `steps`                                  | `call-sequence` only: 2 to 8 normalised steps of at most 200 characters                                                                                 |
| `program`                                | `covered-cli` only: the program, at most 200 characters                                                                                                 |
| `excerpts`                               | at most 5 pieces of evidence: `source` (`prompt` or `call`), the session, `text` of at most 300 characters, `truncated` when cut                        |

What a candidate's cost covers depends on its kind. For a prompt-led candidate
(`prompt-repeat`, `headless-job`), an occurrence is the prompt and the turns
that answer it. For `call-sequence` and `covered-cli`, it is the calls, priced
by the turns that made them, because tokens are counted per turn, not per call.

## Comparison (`SwampifyComparison` v1)

One data item per candidate that was swamped, named
`swampify-comparison-<candidate id>` (`swampifyComparisonDataName`), with the
`type` tag `swampify-comparison`.

| Field                                             | Meaning                                                                                                                                       |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `schemaVersion`, `generatedAt`, `importerVersion` | as in the candidate set                                                                                                                       |
| `candidateId`                                     | the candidate it measures                                                                                                                     |
| `target`                                          | `kind` (`behavior` or `workflow`) and its `name`                                                                                              |
| `build`                                           | `tokens` and `activeMs` of the session that built it                                                                                          |
| `history`                                         | past `occurrences`, and `perOccurrence` as two cost ranges: `chore` (its own calls only) and `wholeTurns` (the whole turns that contained it) |
| `swampRun`                                        | `wallMs`, model `tokens` (zero for a behavior run) and `outcome` (`succeeded` or `failed`)                                                    |
| `forward`                                         | `since`, then `raw` and `swamp`: occurrences still done raw, and through the behavior or workflow, each with its cost range                   |
| `breakEven`                                       | occurrences that recover the build cost: `low` against whole turns, `high` against the chore's own calls; `null` when it never pays back      |
| `estimatedUsd`                                    | optional: `build`, `historyPerOccurrence` (`chore` and `wholeTurns` ranges) and `swampRun`, from a price table the writer supplies            |

Replaying a past occurrence is out of scope for v1.

## Rules the JSON Schema cannot express

The checked-in JSON Schemas carry shapes and bounds. These rules are checked
only by the Zod schemas, so an item that passes the JSON Schema can still be
skipped as `invalid`:

- every range has `min <= median <= max`;
- `window.since <= window.until` and `firstSeen <= lastSeen`;
- `steps` are set on a `call-sequence` and only there; `program` on a
  `covered-cli` and only there;
- a `prompt-repeat` is `interactive` and a `headless-job` is `headless` (a
  repeated headless prompt is a headless job);
- there are no more session refs than sessions, and no more sessions than
  occurrences;
- candidate ids are unique within a set, and `scope.harnesses` has no
  duplicates;
- `scope.include` is empty when `scope.all` is set;
- in a comparison, a `perOccurrence` cost is present exactly when its
  occurrences are above zero;
- `breakEven.low <= breakEven.high`, and `high` is `null` when `low` is;
- in `history.perOccurrence`, and in `estimatedUsd.historyPerOccurrence`, each
  `chore` statistic (min, median, max) is at most the same `wholeTurns` one,
  since a chore's calls are part of their turns;
- `estimatedUsd.historyPerOccurrence` needs history occurrences;
- in a candidate set's summary tag, the interactive and headless counts, and the
  counts per kind, each add up to `candidates`; `prompt-repeat` is at most
  `interactive` and `headless-job` at most `headless`; and harnesses have no
  duplicates;
- in a comparison's summary tag, `breakEven` follows the comparison's rule.

## Ids

`swampifyCandidateId(kind, invocation, key)` is the first 32 hex digits of
SHA-256 over `[kind, invocation, key]` as JSON. `assess` defines `key` per kind:
the normalised prompt prefix for `prompt-repeat` and `headless-job`, the joined
steps for `call-sequence`, the program for `covered-cli`.

- **A re-run keeps ids.** The same kind, invocation and key give the same id
  however the window or importer version changes. A comparison stays linked to
  its candidate across assessments.
- **What changes an id:** a different kind, invocation or key, or a change to
  how `assess` normalises a key. Such a change orphans the comparisons keyed on
  old ids, so it is called out in the release.
- **Redaction never changes an id.** The key is hashed before redaction, and
  only the hash is stored, never the key.
- **The hash can be guessed against.** A key holds raw prompt text. For a known
  prompt template carrying a low-entropy secret (a short password, a PIN),
  someone holding the id can test guesses offline. `assess` therefore normalises
  volatile parts (numbers, paths, tokens) out of a key before hashing it, which
  also makes runs that differ only there one candidate.

## Tags

The output spec sets the `type` tag. The rest come from
`swampifyCandidateSetTags(set)` and `swampifyComparisonTags(comparison)`, so
they cannot drift from the body:

| Item          | Tag           | Value                                                                                               |
| ------------- | ------------- | --------------------------------------------------------------------------------------------------- |
| both          | `generatedAt` | the body's `generatedAt` as `toISOString()` writes it                                               |
| candidate set | `summary`     | `since`, `until`, `harnesses`, `candidates`, `interactive`, `headless`, counts per kind             |
| comparison    | `candidateId` | the candidate id                                                                                    |
| comparison    | `summary`     | `candidateId`, `target`, `outcome`, `historyOccurrences`, `forwardRaw`, `forwardSwamp`, `breakEven` |

A candidate set's summary holds counts only, no labels or excerpts. Its
interactive and headless counts, and its counts per kind, each add up to
`candidates`, and its harnesses follow the scope's rules (at least one, no
duplicates). Each summary has its own versioned schema, and
`readSwampifyCandidateSetSummary` and `readSwampifyComparisonSummary` return
`undefined`, never throw, for a tag that is over 4096 characters, is not JSON,
or does not match. Tags are self-reported: a reader always validates the body
when it opens one.

## What is read and what is stored

`assess` reads, on the machine that holds them, Claude Code transcripts and
Codex rollouts in the chosen window and scope: prompts, replies, tool calls and
their output.

What is stored differs by item:

- **Session records stay prompt-free**, as swamp-club#4156 decided. Nothing here
  changes them.
- **A candidate set keeps short excerpts.** Up to 5 per candidate, each at most
  300 characters, from prompts that repeat or from session records' call text.
  `assess` redacts them. Call text comes from the session record and is already
  redacted. Prompt text goes through the importer's redaction plus rules for
  prose, which `assess` adds with its issue: JWTs, PEM private-key blocks, cloud
  secret keys without a keyword, other long high-entropy strings, IP addresses,
  signed URL query strings, and secrets written as "password is …". Prompts that
  start with harness wrappers (skill preambles, pasted-content blocks, messages
  between agents) are not excerpted.
- **Counts, costs and ids** are stored for every candidate. Directory names are
  not, only how many.

The README and the manifest description say records never store prompts. That
stays true until `assess` ships; that release splits the promise: records stay
prompt-free, and the candidate set keeps redacted excerpts as evidence, and says
so.

Where the data then goes is the user's choice, as for any repo data: kept local,
synced to a datastore, or served with `swamp serve`.

## How core reads v1

The JSON Schemas are generated from the Zod schemas and checked in beside the
module: `swampify-candidate-set.schema.json`,
`swampify-candidate-set-summary.schema.json`, `swampify-comparison.schema.json`
and `swampify-comparison-summary.schema.json`. `deno task swampify-schema`
regenerates them, and `swampify_test.ts` fails when any of them drifts.

The contract lives in this extension for now. When the dashboard's Swampify
panel lands, core keeps a copy of `swampify.ts`, unchanged except the zod import
specifier, and of the four JSON Schemas, with a test that fails when they
disagree. This mirrors how this extension copies the session record today. The
module imports nothing but zod and uses no Deno or Node APIs, so the dashboard
can bundle it.

The panel lists items with `data.query`, the type tag predicates
(`SWAMPIFY_CANDIDATES_QUERY_PREDICATE`, `SWAMPIFY_COMPARISON_QUERY_PREDICATE`,
or `swampifyComparisonPredicate(id)` for one candidate) and
`SWAMPIFY_LIST_SELECT`, which reads only names and tags. It opens the candidate
set and a comparison with `data.get` and the readers, shows a skipped item's
note and never its content, and computes nothing, the same rule the findings
follow.
