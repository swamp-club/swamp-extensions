# Test fixtures

`factories/` holds three of @swamp/software-factory's example definitions,
ported to the stagecraft factory definition format. They are the evidence that
the port still expresses every factory definition the old format could. They
name placeholder `@acme` models and workflows, so they are test fixtures, not
examples to copy; the fourth, `minimal.yaml`, is one of the skill's examples
(`../.claude/skills/stagecraft/references/examples/`). `auth/` holds stored
swamp logins (`<dir>/swamp/auth.json`) for the swamp-club adapter's credential
tests; the key in them is not a real one.

`definition-versions/v<N>/` holds whole factories (`definition:` and
`scenarios:`) frozen at each `schemaVersion` stagecraft has shipped, each beside
`<name>.expected.json`, its definition in the current form.
`extensions/models/_lib/engine/definition_versions_test.ts` upgrades each one,
checks it against the expected form, and runs its saved scenarios. Never edit a
frozen fixture: a format change adds fixtures at its new version and updates
every `.expected.json` (DESIGN.md, "Format changes upgrade, they never break").

Prompts refer to bindings as `{{name}}`. The CEL vocabulary in `bindings` and
`cel` gates (`item`, `stage`, `artifacts`, `evidence`, `validations`) is defined
in `extensions/models/_lib/cel_context.ts`.

Every fixture is also analysed as a graph
(`extensions/models/_lib/graph_test.ts`) and must have no errors. The warnings
each one has are listed in that test with the reason they are expected. The
ported examples' rework loops set no `maxCycles`, as the originals did, so the
default cycle limit is their only bound.
