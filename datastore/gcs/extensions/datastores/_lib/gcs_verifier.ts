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
 * Verifies a GCS datastore is accessible.
 *
 * Issues a bucket GET to verify the bucket exists, credentials are valid and
 * IAM permissions are sufficient, then probes generation preconditions. Lock
 * acquisition is an upload with `ifGenerationMatch=0`, so an endpoint that
 * silently ignores the precondition (200 where a 412 is required) hands the
 * lock to every writer at once. The probe turns that into a failed
 * verification instead of silent corruption.
 */

import type { DatastoreHealthResult, DatastoreVerifier } from "./interfaces.ts";
import {
  GcsClient,
  type GcsClientConfig,
  GcsOperationError,
} from "./gcs_client.ts";

/**
 * Probe objects live under `_control/`, which `isInternalCacheFile` already
 * filters out of cache hydration — an object left behind by a rejected
 * delete can't surface as a phantom data file.
 */
const PROBE_PREFIX = "_control/conditional-write-probe-";

/**
 * ponytail: per-process memo with a 5-minute TTL. Generation-precondition
 * support is a static property of an endpoint, so caching the verdict is
 * correct rather than a shortcut; the TTL exists only so a repaired endpoint
 * recovers. Without it, `/api/v1/health/stream` re-collects on a 1s-floored
 * interval and reaches verify(), so one connected admin client would drive
 * 2 uploads + 1 delete per second, forever. Raise the TTL if that still costs
 * too much; lower it if slow recovery bites.
 */
const PROBE_TTL_MS = 5 * 60 * 1000;

type ConditionalWriteVerdict =
  | "supported"
  | "ignored"
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
 * Keyed on apiEndpoint|bucket|prefix. Credentials are deliberately absent:
 * they must not end up in a cache key, and the only credential-dependent
 * verdict ("write-denied") is bounded by the TTL — a rotated, repaired or
 * refreshed credential is re-probed within 5 minutes.
 */
const probeMemo = new Map<string, { at: number; result: ProbeResult }>();

/**
 * 403 is the narrow-IAM case. 401 is the one GCS has and S3 does not: a
 * token that expired between the bucket GET and the probe upload, or a
 * bucket readable anonymously while writes require auth. Both are credential
 * problems, not compatibility problems, and must not be reported as one.
 */
function isWriteDenied(error: unknown): boolean {
  return error instanceof GcsOperationError &&
    (error.httpStatusCode === 401 || error.httpStatusCode === 403);
}

/**
 * A generation that provably differs from `generation`, for the stale-CAS
 * step. Real GCS generations are microsecond timestamps so a literal "1" is
 * never live, but deriving it keeps the step honest against any endpoint.
 */
function staleGeneration(generation: string): string {
  return generation === "1" ? "2" : "1";
}

export class GcsDatastoreVerifier implements DatastoreVerifier {
  private readonly gcs: GcsClient;
  private readonly bucket: string;
  private readonly memoKey: string;

  constructor(config: GcsClientConfig) {
    this.bucket = config.bucket;
    this.memoKey = `${config.apiEndpoint ?? "gcs"}|${config.bucket}|${
      config.prefix ?? ""
    }`;
    this.gcs = new GcsClient(config);
  }

  async verify(): Promise<DatastoreHealthResult> {
    const start = performance.now();

    try {
      await this.gcs.bucketExists();

      const probe = await this.probeConditionalWrites();
      const cleanupNote = probe.cleanup === "failed"
        ? ` The probe object '${probe.key}' could not be deleted and was left in the bucket.`
        : "";
      const details = {
        bucket: this.bucket,
        conditionalWrites: probe.verdict,
        probeCleanup: probe.cleanup,
      };

      if (probe.detail !== undefined) {
        return {
          healthy: false,
          message:
            `GCS bucket '${this.bucket}' is reachable but ${probe.detail}${cleanupNote}`,
          latencyMs: performance.now() - start,
          datastoreType: "@swamp/gcs-datastore",
          details,
        };
      }

      return {
        healthy: true,
        message: `GCS bucket '${this.bucket}' is accessible${cleanupNote}`,
        latencyMs: performance.now() - start,
        datastoreType: "@swamp/gcs-datastore",
        details,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      let hint = "";

      if (message.includes("403") || message.includes("Forbidden")) {
        hint =
          " Check your GCP credentials and bucket IAM permissions (storage.buckets.get required).";
      } else if (message.includes("404") || message.includes("Not Found")) {
        hint = ` The bucket '${this.bucket}' does not exist.`;
      } else if (
        message.includes("credentials") || message.includes("token") ||
        message.includes("Could not obtain")
      ) {
        hint =
          " Configure GCP credentials: set GOOGLE_APPLICATION_CREDENTIALS, " +
          "run 'gcloud auth application-default login', or attach a service account.";
      }

      return {
        healthy: false,
        message:
          `Cannot access GCS bucket '${this.bucket}': ${message}.${hint}`,
        latencyMs: performance.now() - start,
        datastoreType: "@swamp/gcs-datastore",
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
    const { mayExist, ...verdict } = await this.classify(key);

    let cleanup: "ok" | "failed" = "ok";
    if (mayExist) {
      // Best-effort: an endpoint that honours preconditions but rejects the
      // delete is still safe for locking, so a failed cleanup must not flip a
      // demonstrably working endpoint to unhealthy.
      try {
        await this.gcs.deleteObject(key);
      } catch {
        cleanup = "failed";
      }
    }

    const result: ProbeResult = { ...verdict, cleanup, key };
    probeMemo.set(this.memoKey, { at: Date.now(), result });
    return result;
  }

  /**
   * Runs the probe sequence. Never throws; `mayExist` drives cleanup.
   *
   * `mayExist` is deliberately not "we saw a success". An upload that GCS
   * committed before the connection dropped — or whose response we could not
   * parse — leaves an object behind while reporting a failure here, so those
   * ambiguous outcomes must still be cleaned up. Only a definitive rejection
   * (the credentials cannot write) and a pre-existing key are known not to
   * have left anything of ours.
   */
  private async classify(
    key: string,
  ): Promise<
    { mayExist: boolean; verdict: ConditionalWriteVerdict; detail?: string }
  > {
    const body = new TextEncoder().encode("swamp conditional-write probe");

    let generation: string;
    try {
      const first = await this.gcs.putObjectConditional(key, body);
      if (first === null) {
        return {
          // The key is someone else's; deleting it is not ours to do.
          mayExist: false,
          verdict: "inconclusive",
          detail:
            `the generation-precondition probe was inconclusive: probe key '${key}' already exists.`,
        };
      }
      generation = first.generation;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (isWriteDenied(error)) {
        return {
          // A rejected write leaves nothing behind.
          mayExist: false,
          verdict: "write-denied",
          detail:
            `the credentials cannot write to it: ${message}. Verification probes generation preconditions, which needs storage.objects.create and storage.objects.delete under the configured prefix — either the request was not authenticated, or it was authenticated without those permissions.`,
        };
      }
      // Ambiguous: a transport drop or an unparseable response can follow an
      // upload GCS already committed. Try the delete anyway — it is
      // best-effort, and a 404 on a key that was never written is a no-op.
      return {
        mayExist: true,
        verdict: "inconclusive",
        detail: `the generation-precondition probe could not run: ${message}.`,
      };
    }

    try {
      // The same ifGenerationMatch=0 upload must now fail the precondition.
      if (await this.gcs.putObjectConditional(key, body) !== null) {
        return {
          mayExist: true,
          verdict: "ignored",
          detail:
            "this endpoint ignores generation preconditions (ifGenerationMatch=0); distributed locking would not be safe.",
        };
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        mayExist: true,
        verdict: "inconclusive",
        detail: `the generation-precondition probe could not run: ${message}.`,
      };
    }

    try {
      // A deliberately stale ifGenerationMatch must fail the precondition too
      // — that is the precondition the shard-first index merge relies on.
      const cas = await this.gcs.putObjectCas(
        key,
        body,
        staleGeneration(generation),
      );
      if (cas !== null) {
        return {
          mayExist: true,
          verdict: "ignored",
          detail:
            "this endpoint ignores generation preconditions (ifGenerationMatch=<generation>); distributed locking would not be safe.",
        };
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        mayExist: true,
        verdict: "inconclusive",
        detail: `the generation-precondition probe could not run: ${message}.`,
      };
    }

    return { mayExist: true, verdict: "supported" };
  }
}
