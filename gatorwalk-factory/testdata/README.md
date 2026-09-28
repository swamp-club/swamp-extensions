# Test fixtures

`lifecycles/` holds @swamp/software-factory's four example definitions, ported
to the gatorwalk lifecycle format. They are the evidence that the port still
expresses every lifecycle the old format could. `plugins/` holds stage plugins.

Prompts refer to bindings as `{{name}}`. The CEL vocabulary in `bindings` and
`cel` gates (`item`, `artifacts`, `evidence`, `validations`) is provisional: the
runtime defines it. The schema only checks that each expression is valid CEL.
