// Copyright (C) 2026 System Initiative, Inc.
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

import { z } from "npm:zod@4.3.6";
import { STUDIO_ASSETS } from "../_lib/engine/studio_assets.ts";
import { parsePublicOrigin } from "../_lib/engine/studio_server.ts";
import {
  serveStudio,
  type StudioContext,
} from "../_lib/engine/studio_serve.ts";

// ---------------------------------------------------------------------------
// The studio: one instance per repo, created once, whose serve method runs
// the studio page on 127.0.0.1 until Ctrl-C, and answers at a public origin
// too when a reverse proxy or tunnel is given one. The page lists every
// factory in the repo and shows its definition file and scenario files,
// reloading them as an agent edits them. It never writes: edits come from the agent
// (DESIGN.md, "The studio server").
//
// It is a model type of its own, not a method on the factory, so one studio
// covers every factory and never takes a factory's lock.
// ---------------------------------------------------------------------------

/**
 * The `@swamp/stagecraft/studio` model: serves the studio page, which shows
 * every factory in the repository and its work items.
 */
export const model = {
  // A string literal: swamp reads the type from the source without running
  // it. studio_test checks it equals STUDIO_TYPE.
  type: "@swamp/stagecraft/studio",
  version: "2026.09.30.1",
  globalArguments: z.object({}),
  methods: {
    serve: {
      description:
        "Serve the studio page on 127.0.0.1 until Ctrl-C, and at publicOrigin through a proxy when given: every factory's definition and scenarios, read-only, reloaded as they change",
      // Not a read method: it runs for the session, holding this instance's
      // lock, so a second serve on the same studio waits.
      arguments: z.object({
        port: z.coerce.number().int().min(0).max(65535).default(0).describe(
          "The port on 127.0.0.1; 0, the default, picks a free one",
        ),
        publicOrigin: z.string().superRefine((text, ctx) => {
          try {
            parsePublicOrigin(text);
          } catch (e) {
            ctx.addIssue({ code: "custom", message: (e as Error).message });
          }
        }).optional()
          .describe(
            "The origin a reverse proxy or tunnel publishes the studio at, such as https://studio.example.com. Requests with that Host or Origin are answered too; the studio has no authentication, so the proxy must provide it",
          ),
      }),
      execute: (
        args: { port: number; publicOrigin?: string },
        context: StudioContext,
      ) => serveStudio(context, args.port, STUDIO_ASSETS, args.publicOrigin),
    },
  },
};
