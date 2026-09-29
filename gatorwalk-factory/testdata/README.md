# Test fixtures

`lifecycles/` holds @swamp/software-factory's four example definitions, ported
to the gatorwalk lifecycle format. They are the evidence that the port still
expresses every lifecycle the old format could. `lifecycles/apply-target.yaml`
is a lifecycle with a placeholder stage for the `review-plan` stage template
(`../templates/review-plan.yaml`) to be applied to.
`lifecycles/starter-sketch.yaml` has a placeholder for each starter stage
template, and `lifecycles/starter-core.yaml` is what applying them gives,
written by hand. `auth/` holds stored swamp logins (`<dir>/swamp/auth.json`) for
the swamp-club adapter's credential tests; the key in them is not a real one.

Prompts refer to bindings as `{{name}}`. The CEL vocabulary in `bindings` and
`cel` gates (`item`, `stage`, `artifacts`, `evidence`, `validations`) is defined
in `extensions/models/_lib/cel_context.ts`.

Every fixture is also analysed as a graph
(`extensions/models/_lib/graph_test.ts`) and must have no errors. The warnings
each one has are listed in that test with the reason they are expected. The
ported examples' rework loops set no `maxCycles`, as the originals did, so the
default cycle limit is their only bound.
