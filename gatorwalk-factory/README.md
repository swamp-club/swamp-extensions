# gatorwalk-factory

`gatorwalk-factory` is a code name. This is the from-scratch rebuild of
`@swamp/software-factory`: a lifecycle held as data, one model instance per work
item, and a pure state piece that enforces gates and writes a journal. It is
**not published**, and its public name is chosen at go-live.

## Not published until go-live

CI publishes any directory whose `manifest.yaml` changes on main. This directory
therefore has **no `manifest.yaml` at any depth** until go-live, and
`extensions/models/no_manifest_test.ts` fails if one appears. The go-live change
adds the manifest and deletes that test.

## Layout

```
extensions/models/_lib/
  lifecycle_schema.ts   the lifecycle and plugin meta-schema
  payload_schema.ts     JSON Schema 2020-12 payload schemas and contracts
  template.ts           {{name}} placeholders in prompts
testdata/
  lifecycles/           software-factory's examples, ported
  plugins/              stage plugins
```

## The lifecycle format

A lifecycle is ported from software-factory's definition schema: stages, work,
artifacts, evidence, transitions and gates. Three things change:

- **Payload schemas are standard JSON Schema, draft 2020-12**, with standard
  meaning. Two stricter rules apply when a lifecycle is saved: unknown keywords
  and unknown `format` names are rejected, so a typo is an error, not a silent
  no-op. References must be local (`#/...` or `#anchor`), and nothing is
  fetched.
- **Runtime values are bare CEL**, in `work.bindings` and `cel` gates. Never use
  `${{ }}`: a lifecycle lives in a model's `globalArguments`, where the platform
  evaluates `${{ }}` when the definition is saved. This also means a prompt
  cannot contain a literal `${{` (a GitHub Actions snippet, say); the platform
  has no escape for it.
- **Prompts refer to bindings as `{{name}}`**, in `systemPrompt` and `command`.
  A placeholder holds a binding name, never an expression, and an undeclared
  name is an error when the lifecycle is saved. `{{` around anything that is not
  a bare name (`{{ .Values.x }}`, `{{#each}}`) is literal text, and `\{{` is a
  literal `{{`. At dispatch, a null or missing value fails the stage rather than
  rendering blank. See [DESIGN.md](DESIGN.md) for why.
- **References are checked when the lifecycle is saved.** This covers transition
  targets, gate references, `reviews` links and injected context, and every
  problem is reported with its path. Graph analysis (reachability, dead ends,
  ambiguous exits) is separate.

A **plugin** has the same shape plus a `contract`: `inputs` it consumes,
`outputs` its stages produce, named `exits`, and a `parameters` schema. Its
transitions leave through `exit:` rather than `to:`. See
`testdata/plugins/review-plan.yaml`.

## Developing

```bash
cd gatorwalk-factory
deno task check
deno task lint
deno task fmt
deno task test
deno install --frozen
```

These are the same checks that `verification/checks.yaml` runs before a PR.

To try the extension in a scratch swamp repo without publishing it:

```bash
swamp extension source add /path/to/swamp-extensions/gatorwalk-factory
```

There is no model type to run yet. The work-item type and lifecycle holder come
later.
