/**
 * Writes the Swampify contracts' JSON Schemas beside swampify.ts. Run with
 * `deno task swampify-schema`; swampify_test.ts fails when they drift.
 *
 * @module
 */

import { SWAMPIFY_JSON_SCHEMA_FILES } from "./swampify.ts";

for (const [file, schema] of SWAMPIFY_JSON_SCHEMA_FILES) {
  await Deno.writeTextFile(
    new URL(`./${file}`, import.meta.url),
    `${JSON.stringify(schema(), null, 2)}\n`,
  );
}
