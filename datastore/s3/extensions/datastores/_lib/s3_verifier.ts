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

/**
 * Verifies an S3 datastore is accessible.
 *
 * Issues a HeadBucket request to verify the bucket exists and credentials are
 * valid, then probes conditional writes. Lock acquisition is a PutObject with
 * `If-None-Match: *`, so an S3-compatible endpoint that silently ignores the
 * header (200 instead of 412) hands the lock to every writer at once. The
 * probe turns that into a failed verification instead of silent corruption.
 */

import type { DatastoreHealthResult, DatastoreVerifier } from "./interfaces.ts";
import {
  S3Client,
  type S3ClientConfig,
  S3OperationError,
} from "./s3_client.ts";

/**
 * Probe objects live under `_control/`, which `isInternalCacheFile` already
 * filters out of cache hydration — an object left behind by a rejected
 * DeleteObject can't surface as a phantom data file.
 */
const PROBE_PREFIX = "_control/conditional-write-probe-";

/** An ETag that cannot match any live object, for the stale If-Match step. */
const STALE_ETAG = '"00000000000000000000000000000000"';

/**
 * ponytail: per-process memo with a 5-minute TTL. Conditional-write support is
 * a static property of an endpoint, so caching the verdict is correct rather
 * than a shortcut; the TTL exists only so a repaired endpoint recovers.
 * Without it, `/api/v1/health/stream` re-collects on a 1s-floored interval and
 * reaches verify(), so one connected admin client would drive 3 PutObject +
 * 1 DeleteObject per second, forever. Raise the TTL if that still costs too
 * much; lower it if slow recovery bites.
 */
const PROBE_TTL_MS = 5 * 60 * 1000;

type ConditionalWriteVerdict =
  | "supported"
  | "ignored"
  | "if-match-unsupported"
  | "write-denied"
  | "inconclusive";

interface ProbeResult {
  verdict: ConditionalWriteVerdict;
  /** Best-effort cleanup outcome; never decides the verdict. */
  cleanup: "ok" | "failed";
  /** The probe key, so a failed cleanup leaves something discoverable. */
  key: string;
  /** Explanation, present whenever the verdict is not "supported". */
  detail?: string;
}

/**
 * Keyed on endpoint|bucket|prefix. Credentials are deliberately absent: they
 * must not end up in a cache key, and the only credential-dependent verdict
 * ("write-denied") is bounded by the TTL — rotated or repaired credentials are
 * re-probed within 5 minutes.
 */
const probeMemo = new Map<string, { at: number; result: ProbeResult }>();

function isNotImplemented(error: unknown): boolean {
  return error instanceof Error &&
    (error.name === "NotImplemented" ||
      (error instanceof S3OperationError && error.httpStatusCode === 501));
}

function isWriteDenied(error: unknown): boolean {
  return error instanceof Error &&
    (error.name === "AccessDenied" || error.name === "Forbidden" ||
      (error instanceof S3OperationError &&
        (error.httpStatusCode === 403 || error.code === "AccessDenied")));
}

export class S3DatastoreVerifier implements DatastoreVerifier {
  private readonly s3: S3Client;
  private readonly bucket: string;
  private readonly memoKey: string;

  constructor(config: S3ClientConfig) {
    this.bucket = config.bucket;
    this.memoKey = `${config.endpoint ?? "aws"}|${config.bucket}|${
      config.prefix ?? ""
    }`;
    this.s3 = new S3Client(config);
  }

  async verify(): Promise<DatastoreHealthResult> {
    const start = performance.now();

    try {
      await this.s3.headBucket();

      const probe = await this.probeConditionalWrites();
      const cleanupNote = probe.cleanup === "failed"
        ? ` The probe object '${probe.key}' could not be deleted and was left in the bucket.`
        : "";
      const details = {
        bucket: this.bucket,
        conditionalWrites: probe.verdict,
        probeCleanup: probe.cleanup,
      };

      if (
        probe.detail !== undefined && probe.verdict !== "if-match-unsupported"
      ) {
        return {
          healthy: false,
          message:
            `S3 bucket '${this.bucket}' is reachable but ${probe.detail}${cleanupNote}`,
          latencyMs: performance.now() - start,
          datastoreType: "@swamp/s3-datastore",
          details,
        };
      }

      return {
        healthy: true,
        message: `S3 bucket '${this.bucket}' is accessible${
          probe.detail !== undefined ? `. Note: ${probe.detail}` : ""
        }${cleanupNote}`,
        latencyMs: performance.now() - start,
        datastoreType: "@swamp/s3-datastore",
        details,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      let hint = "";

      if (message.includes("403") || message.includes("Forbidden")) {
        hint = " Check your AWS credentials and bucket permissions.";
      } else if (message.includes("404") || message.includes("NotFound")) {
        hint = ` The bucket '${this.bucket}' does not exist.`;
      } else if (message.includes("credentials")) {
        hint =
          " Configure AWS credentials (AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY or ~/.aws/credentials).";
      }

      return {
        healthy: false,
        message: `Cannot access S3 bucket '${this.bucket}': ${message}.${hint}`,
        latencyMs: performance.now() - start,
        datastoreType: "@swamp/s3-datastore",
        details: { bucket: this.bucket },
      };
    }
  }

  private async probeConditionalWrites(): Promise<ProbeResult> {
    const cached = probeMemo.get(this.memoKey);
    if (cached !== undefined && Date.now() - cached.at < PROBE_TTL_MS) {
      return cached.result;
    }

    const key = `${PROBE_PREFIX}${crypto.randomUUID()}`;
    const { created, ...verdict } = await this.classify(key);

    let cleanup: "ok" | "failed" = "ok";
    if (created) {
      // Best-effort: a store that rejects DeleteObject but honours both
      // conditional headers is still safe for locking, so a failed delete
      // must not flip a demonstrably working endpoint to unhealthy.
      try {
        await this.s3.deleteObject(key);
      } catch {
        cleanup = "failed";
      }
    }

    const result: ProbeResult = { ...verdict, cleanup, key };
    probeMemo.set(this.memoKey, { at: Date.now(), result });
    return result;
  }

  /** Runs the probe sequence. Never throws; `created` drives cleanup. */
  private async classify(
    key: string,
  ): Promise<
    { created: boolean; verdict: ConditionalWriteVerdict; detail?: string }
  > {
    const body = new TextEncoder().encode("swamp conditional-write probe");

    let created = false;
    try {
      created = await this.s3.putObjectConditional(key, body);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (isWriteDenied(error)) {
        return {
          created: false,
          verdict: "write-denied",
          detail:
            `the credentials cannot write to it: ${message}. Verification probes conditional writes, which needs PutObject and DeleteObject under the configured prefix.`,
        };
      }
      return {
        created: false,
        verdict: "inconclusive",
        detail: `the conditional-write probe could not run: ${message}.`,
      };
    }

    if (!created) {
      return {
        created: false,
        verdict: "inconclusive",
        detail:
          `the conditional-write probe was inconclusive: probe key '${key}' already exists.`,
      };
    }

    try {
      // The same If-None-Match: * write must now fail the precondition.
      if (await this.s3.putObjectConditional(key, body)) {
        return {
          created,
          verdict: "ignored",
          detail:
            "this endpoint ignores conditional writes (If-None-Match); distributed locking would not be safe.",
        };
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        created,
        verdict: "inconclusive",
        detail: `the conditional-write probe could not run: ${message}.`,
      };
    }

    try {
      // A deliberately stale If-Match must fail the precondition too.
      if (await this.s3.putObjectIfMatch(key, body, STALE_ETAG) !== null) {
        return {
          created,
          verdict: "ignored",
          detail:
            "this endpoint ignores conditional writes (If-Match); distributed locking would not be safe.",
        };
      }
    } catch (error) {
      if (isNotImplemented(error)) {
        // Documented fallback: the cache sync warns once and drops to
        // merge-on-write. Locking only needs If-None-Match, which passed.
        return {
          created,
          verdict: "if-match-unsupported",
          detail:
            "this endpoint does not support If-Match, so index writes fall back to merge-on-write without compare-and-swap.",
        };
      }
      const message = error instanceof Error ? error.message : String(error);
      return {
        created,
        verdict: "inconclusive",
        detail: `the conditional-write probe could not run: ${message}.`,
      };
    }

    return { created, verdict: "supported" };
  }
}
