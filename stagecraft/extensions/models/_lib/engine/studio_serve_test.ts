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

import { assert, assertEquals } from "@std/assert";
import { serveStudio } from "./studio_serve.ts";

// serveStudio on a method context with no data query: it starts, serves the
// page, answers the work-item routes with 422, and stops on the signal. The
// rest of serve runs through the installed swamp CLI in
// integration/engine/studio_test.ts.

Deno.test("studio serve: starts without a data query, and the work-item routes answer 422", async () => {
  // Serve only reads the repo, and lists no factories here: this directory
  // will do, as the unit tests may not write.
  const repoDir = new URL(".", import.meta.url).pathname;
  const abort = new AbortController();
  const logged: string[] = [];
  let listening: (url: string) => void = () => {};
  const listened = new Promise<string>((resolve) => (listening = resolve));
  try {
    const served = serveStudio(
      {
        repoDir,
        definitionRepository: {
          findAllGlobal: () => Promise.resolve([]),
          getPath: () => "",
        },
        logger: {
          info(message) {
            logged.push(message);
            const url = message.match(/^studio: (http:\S+)$/);
            if (url !== null) listening(url[1]);
          },
        },
        signal: abort.signal,
      },
      0,
      { "index.html": { type: "text/html", text: "<p>studio</p>" } },
    );
    // A serve that fails, or ends, before it listens fails the test rather
    // than leaving it waiting.
    const url = await Promise.race([
      listened,
      served.then(() => {
        throw new Error("serve ended before it listened");
      }),
    ]);
    const page = await fetch(url);
    assertEquals(page.status, 200);
    assertEquals(await page.text(), "<p>studio</p>");
    for (const path of ["api/work-items?factory=team", "api/work-items/k-1"]) {
      const res = await fetch(url + path);
      assertEquals(res.status, 422, path);
      assert((await res.text()).includes("cannot read work items"), path);
    }
    assert(logged.some((m) => m.includes("work items are not shown")));
    abort.abort();
    assertEquals(await served, { dataHandles: [] });
  } finally {
    abort.abort();
  }
});
