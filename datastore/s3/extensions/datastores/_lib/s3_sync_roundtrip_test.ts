// Swamp, an Automation Framework
// Copyright (C) 2026 System Initiative, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

import { assert } from "jsr:@std/assert@1.0.19";
import { assertSyncServiceRoundTripConformance } from "@swamp-club/swamp-testing";
import { S3CacheSyncService } from "./s3_cache_sync.ts";
import { S3Client } from "./s3_client.ts";
import { createS3EmulatorHandler } from "./s3_emulator_test_util.ts";

// Core's round-trip suite: two sync services on one bucket, as two machines
// would see it. It is what holds fetchContent to the DatastoreSyncService
// contract (swamp-club#3160).
//
// sanitizeResources: false — the AWS SDK's pooled connections outlive the
// test body but are reclaimed by GC.
Deno.test({
  name: "S3CacheSyncService passes the sync round-trip conformance suite",
  sanitizeResources: false,
  fn: async () => {
    const priorKey = Deno.env.get("AWS_ACCESS_KEY_ID");
    const priorSecret = Deno.env.get("AWS_SECRET_ACCESS_KEY");
    Deno.env.set("AWS_ACCESS_KEY_ID", "test");
    Deno.env.set("AWS_SECRET_ACCESS_KEY", "test");
    try {
      const result = await assertSyncServiceRoundTripConformance(async () => {
        const { handler, state } = createS3EmulatorHandler();
        const server = Deno.serve({ port: 0, onListen() {} }, handler);
        const { port } = server.addr as Deno.NetAddr;
        const connect = async () => {
          const cacheDir = await Deno.makeTempDir({ prefix: "s3sync-rt-" });
          const s3 = new S3Client({
            bucket: "test-bucket",
            region: "us-east-1",
            endpoint: `http://127.0.0.1:${port}`,
            forcePathStyle: true,
          });
          return { service: new S3CacheSyncService(s3, cacheDir), cacheDir };
        };
        const first = await connect();
        const second = await connect();
        return {
          first,
          second,
          // 403 is not retried, so one denial fails the whole call.
          failNextPush: () => {
            let armed = true;
            state.options.denyPut = () => {
              const deny = armed;
              armed = false;
              return deny;
            };
          },
          failNextFetch: () => {
            let armed = true;
            state.options.respondToGet = () => {
              if (!armed) return undefined;
              armed = false;
              return new Response(
                `<?xml version="1.0"?><Error><Code>AccessDenied</Code><Message>AccessDenied</Message></Error>`,
                { status: 403, headers: { "content-type": "application/xml" } },
              );
            };
          },
          namespace: "conformance-ns",
          cleanup: async () => {
            await server.shutdown();
            await Deno.remove(first.cacheDir, { recursive: true });
            await Deno.remove(second.cacheDir, { recursive: true });
          },
        };
      });
      for (
        const name of [
          "round-trip",
          "push-deletes",
          "bulk-mark",
          "failed-push-retry",
          "two-phase",
          "pull-nothing-new",
          "forward-slash-paths",
          "fetch-content",
          "fetch-content-error",
          "fetch-content-namespace",
        ]
      ) {
        assert(result.passed.includes(name), `${name} did not run`);
      }
      for (const { name, reason } of result.skipped) {
        console.log(`skipped ${name}: ${reason}`);
      }
    } finally {
      if (priorKey !== undefined) Deno.env.set("AWS_ACCESS_KEY_ID", priorKey);
      else Deno.env.delete("AWS_ACCESS_KEY_ID");
      if (priorSecret !== undefined) {
        Deno.env.set("AWS_SECRET_ACCESS_KEY", priorSecret);
      } else Deno.env.delete("AWS_SECRET_ACCESS_KEY");
    }
  },
});
