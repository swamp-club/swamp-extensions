# Writing a tracker for stagecraft

stagecraft publishes work items to a tracker: it files and claims tickets, and
replays each work item's journal to its ticket as comments (or structured
entries), status moves and relations. It ships three trackers: the built-in one
(tickets kept in swamp data), Linear, and the swamp-club Lab. A team that tracks
its work somewhere else (Jira, GitHub Issues, an in-house system) can write its
own tracker as a separate swamp extension, and stagecraft treats it the same
way.

Such a tracker shares no code with stagecraft. It is a swamp model with two
methods, `describe` and `operate`. stagecraft keeps everything else: the
delivery ledger that makes every write happen once, the publish cursor, the
ticket index that claims each ticket for one work item, and snapshots of the
tickets. Those live on a **publisher** (`@swamp/stagecraft/publisher`), a
stagecraft model that sits in front of your tracker. The shipped workflows
(`@swamp/stagecraft/publish`, `claim`, `create`, `fetch-issue`,
`mark-duplicate`) plan each step on the publisher and call your `operate` for
it.

A complete, working example is `examples/notes-tracker` in stagecraft's
repository: a tracker that keeps its tickets in its own swamp data, so it runs
anywhere. Start from it.

## The two methods

### `describe`

Takes no arguments. Writes one record, of a resource spec named `description`,
named `description`, saying what the tracker is:

```json
{
  "tracker": "notes",
  "contract": 1,
  "origin": "snapshot",
  "capabilities": { "history": false, "assign": false, "pullRequests": false },
  "closesDuplicates": false,
  "assignee": "ada"
}
```

- `tracker`: the tracker's name. It is the key work items keep its ticket ids
  under (`externalRefs.notes`, with the display id under `notes.display`), and
  the `tracker.kind` a factory definition names. Lowercase letters, digits and
  `-`, starting with a letter. `builtin`, `linear` and `swamp-club` are taken.
- `contract`: the contract version your tracker meets: `1`. stagecraft refuses a
  tracker that reports another.
- `origin`: `snapshot`. Your tracker owns its tickets' facts; stagecraft keeps
  its last read of them.
- `capabilities`: which optional operations you offer (below).
- `closesDuplicates`: `true` if marking a ticket a duplicate moves it to a
  closed status by itself (Linear's Duplicate status). Otherwise stagecraft
  closes it through the `closed` status key.
- `assignee` (optional, with `assign`): the user publish assigns a ticket to
  when work on it starts. Leave it out to assign no one.

Run it once after creating the instance, and again after changing what it
reports: `swamp model method run <instance> describe`. A factory bound to your
tracker does not validate until it has.

### `operate`

Makes one operation and writes its **answer** as a record. Its arguments:

| Argument    | What                                                                        |
| ----------- | --------------------------------------------------------------------------- |
| `operation` | One of the operations below                                                 |
| `request`   | The operation's request: an object, or a JSON object as a string            |
| `answer`    | The name to write the answer under (`answer-...`), of a spec named `answer` |
| `run`       | The run asking; write it into the answer                                    |

The answer is the result, or the failure:

```json
{ "operation": "comment", "run": "…", "ok": true, "result": { "id": "c-41" } }
```

```json
{
  "operation": "set_status",
  "run": "…",
  "ok": false,
  "kind": "invalid",
  "detail": "no status 'Shipped': open, doing, done"
}
```

Three rules make it safe to retry:

1. **An answer that succeeded is never made again.** Before making anything,
   read the record named `answer`; if it is there with `ok: true`, write nothing
   and return. stagecraft names a delivered write's answer after its ledger
   record, so a run restarted after a crash finds the write was made.
2. **Every failure is an answer.** Catch it and write it with `ok: false`, its
   `kind` and a `detail`; do not let `operate` throw. The workflow makes the
   next call only after this one succeeded.
3. **Write the `run` you were given** into the answer. A failure counts only for
   the run that asked; a later run tries again.

## Operations

Every tracker offers the first six. `post_entry` and `set_type` are the
**history** capability, `assign` the **assign** capability and `link_pr` the
**pullRequests** capability: offer each only if your tracker has it, and say so
in `describe`. stagecraft never asks for one you do not offer.

| Operation     | Request                                | Result                                                |
| ------------- | -------------------------------------- | ----------------------------------------------------- |
| `fetch_issue` | `issue`: stable id or display id       | the ticket (below)                                    |
| `create`      | `title`, `body`, `type`                | the new ticket                                        |
| `comment`     | `issue` (stable id), `body` (markdown) | `id` (and `url`, where the comment has one)           |
| `set_status`  | `issue`, `status`: your status's name  | `changed`, `status`: `{ id, name }`                   |
| `relate`      | `issue`, `type`, `to` (stable ids)     | `changed`                                             |
| `unrelate`    | `issue`, `type`, `to`                  | `changed`                                             |
| `post_entry`  | `issue`, `entry`: a lifecycle entry    | `id`                                                  |
| `set_type`    | `issue`, `type`                        | `changed`, `type`                                     |
| `assign`      | `issue`, `user`                        | `changed`, `user`, `status` (name), `dropped` (users) |
| `link_pr`     | `issue`, `url`                         | `changed`, `url`                                      |

A **ticket**, as `fetch_issue` and `create` return it:

| Field                    | What                                                                         |
| ------------------------ | ---------------------------------------------------------------------------- |
| `id`                     | The stable id: never changes                                                 |
| `display`                | The identifier a person reads (`ABC-12`); may change                         |
| `title`                  | The title                                                                    |
| `url`                    | Where a person reads it, if anywhere                                         |
| `status`                 | `{ id, name }`                                                               |
| `relations`              | Every relation the ticket is in: `{ type, direction, issue, display }`       |
| `description`            | The body, as markdown                                                        |
| `labels`                 | Labels, or the ticket's type where there are none                            |
| `assignees`              | Who it is assigned to                                                        |
| `createdAt`, `updatedAt` | ISO times                                                                    |
| `activity`               | Comments and entries, oldest first: `{ kind, id, author?, body, step?, at }` |

`activity` must give each comment (and entry) under the id `comment` (or
`post_entry`) returned for it: the studio marks what stagecraft posted by those
ids.

A relation's `type` is `parent_of`, `blocked_by`, `related_to` or
`duplicate_of`. `X parent_of Y` reads as `outgoing` on X and `incoming` on Y.

## Failures

A failure's `kind` is one of:

| Kind           | When                                                                   |
| -------------- | ---------------------------------------------------------------------- |
| `auth`         | The credential is missing, wrong or not allowed                        |
| `not_found`    | No ticket has that id                                                  |
| `rate_limited` | The tracker asked you to slow down                                     |
| `invalid`      | The request is refused as it stands: an unknown status or type, a rule |
| `upstream`     | Anything else on the tracker's side                                    |

An `invalid` status move that the tracker knows but cannot make from where the
ticket is (a workflow that only moves forward) also carries
`"reason": "unreachable"`: publish then records it as skipped rather than
failing. An unknown status or type is plain `invalid`, and its `detail` names
the valid ones.

## The rules every tracker keeps

- `fetch_issue` finds a ticket by its stable id and by its display id.
- Moving a ticket to the status it has, relating what is related, and unrelating
  what is not each write nothing and report `changed: false`.
- Relations: no ticket is related to itself; a ticket has one parent; no parent
  chain loops back (walk up to 10 deep); a ticket is a duplicate of one ticket;
  a duplicate's primary is not itself a duplicate; a ticket with duplicates
  cannot become one. Refuse each as `invalid`, writing nothing. Your tracker
  checks these itself, even where the tracker behind it does not.
- Credentials never appear in a request, an answer, a `detail` or a log line.
  Take them as global arguments marked sensitive, wired from a vault
  (`${{ vault.get(<vault>, <key>) }}`), so swamp redacts them.

## Setting it up

```sh
swamp model create @acme/notes-tracker notes --json
swamp model method run notes describe
swamp model create @swamp/stagecraft/publisher notes-pub \
  --global-arg tracker=notes --json
```

Set the publisher's `statuses` in the model file `model create` printed: each
status key the factory definition uses, mapped to your tracker's status name
(`in_progress: Doing`). Then name the tracker in the definition,
`tracker: { kind: notes }`, and bind the factory to the publisher
(`--global-arg tracker=notes-pub`). `validate` checks the binding: a publisher,
whose tracker described itself under the definition's kind and contract 1.

From then on every tracker workflow takes `--input tracker=notes-pub`, the same
as for the trackers stagecraft ships.

## Checking your tracker

The conformance workflow runs the checks stagecraft's own trackers pass, through
your `operate`, one call at a time: fetch, comment and read-back, status moves,
failures by kind, create, each capability you offer, and the relation rules. It
files and changes tickets, so point it at a tracker you keep for testing:

```sh
swamp workflow run @swamp/stagecraft/conformance --input tracker=notes-pub \
  --input statusNames=doing,done --input createType=bug \
  --input missing=n-999999
```

`statusNames` are two statuses a new ticket is not in; `missing` is a
well-formed id of no ticket. With history, add `entryStatus` (a status name an
entry may carry) and `entryTypes` (two types a new ticket is not); with assign,
add `user`. The run fails its last step with the first check that did not hold,
and passes when all do.

## Versioning

The contract is version 1. A change that a tracker written for version 1 would
not meet (a field removed or changed, an operation every tracker must offer)
moves it to 2, and stagecraft says which version it speaks when it refuses a
tracker. A new optional capability or field does not move it.
