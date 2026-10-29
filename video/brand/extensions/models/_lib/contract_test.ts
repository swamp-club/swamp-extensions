// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import { assertEquals } from "jsr:@std/assert@1.0.19";
import { z } from "zod";
import { CardsResourceSchema, PresenterSchema } from "./contract.ts";
import { CardsResourceSchema as CoreCards } from "../../../../extensions/models/_lib/cards.ts";
import { PresenterSchema as CorePresenter } from "../../../../extensions/models/presenter.ts";

/** A JSON Schema with the human descriptions left out. */
function shape(schema: z.ZodType): unknown {
  return JSON.parse(
    JSON.stringify(z.toJSONSchema(schema)),
    (key, value) => key === "description" ? undefined : value,
  );
}

// Brand keeps copies (extensions can't import each other); these fail when
// @swamp/video changes either shape, so brand follows.
Deno.test("the cards contract is @swamp/video's", () => {
  assertEquals(shape(CardsResourceSchema), shape(CoreCards));
});

Deno.test("the presenter is @swamp/video/presenter's", () => {
  assertEquals(shape(PresenterSchema), shape(CorePresenter));
});
