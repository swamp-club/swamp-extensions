// Swamp, an Automation Framework Copyright (C) 2026 System Initiative, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify it under the terms
// of the GNU Affero General Public License version 3 as published by the Free
// Software Foundation, with the Swamp Extension and Definition Exception (found in
// the "COPYING-EXCEPTION" file).
//
// Swamp is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
// PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License along
// with Swamp. If not, see <https://www.gnu.org/licenses/>.

import { z } from "npm:zod@4.3.6";
import { STUDIO_ASSETS } from "../_lib/engine/studio_assets.ts";
import {
  serveStudio,
  type StudioContext,
} from "../_lib/engine/studio_serve.ts";

// ---------------------------------------------------------------------------
// The studio: one instance per repo, created once, whose serve method runs
// the studio page on 127.0.0.1 until Ctrl-C. The page lists every factory in
// the repo and shows its definition file and scenario files, reloading them
// as an agent edits them. It never writes: edits come from the agent
// (DESIGN.md, "The studio server").
//
// It is a model type of its own, not a method on the factory, so one studio
// covers every factory and never takes a factory's lock.
// ---------------------------------------------------------------------------

export const model = {
  // A string literal: swamp reads the type from the source without running
  // it. studio_test checks it equals STUDIO_TYPE.
  type: "@swamp/gatorwalk-factory/studio",
  version: "2026.09.30.1",
  globalArguments: z.object({}),
  methods: {
    serve: {
      description:
        "Serve the studio page on 127.0.0.1 until Ctrl-C: every factory's definition and scenarios, read-only, reloaded as they change",
      // Not a read method: it runs for the session, holding this instance's
      // lock, so a second serve on the same studio waits.
      arguments: z.object({
        port: z.coerce.number().int().min(0).max(65535).default(0).describe(
          "The port on 127.0.0.1; 0, the default, picks a free one",
        ),
      }),
      execute: (args: { port: number }, context: StudioContext) =>
        serveStudio(context, args.port, STUDIO_ASSETS),
    },
  },
};
