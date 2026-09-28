# Test fixtures

`lifecycles/` holds @swamp/software-factory's four example definitions, ported
to the gatorwalk lifecycle format. They are the evidence that the port still
expresses every lifecycle the old format could. `plugins/` holds stage plugins.

Prompts refer to bindings as `{{name}}`. The CEL vocabulary in `bindings` and
`cel` gates (`item`, `stage`, `artifacts`, `evidence`, `validations`) is defined
in `extensions/models/_lib/cel_context.ts`.
