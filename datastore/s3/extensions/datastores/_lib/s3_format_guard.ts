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

/**
 * Keeps the v2 file sync off a datastore it cannot sync (swamp-club#3549).
 *
 * Swamp releases before v20261008.201010.0 read no format marker, so they
 * would sync a v3 bucket as v2: list it whole, publish a v2 index over it and
 * push Litestream's objects back as files. Extensions are pinned per repo, so
 * an old binary in a v3 repo loads this extension, and the sync service
 * refuses for it: before its first remote data operation it reads the
 * datastore-wide marker at `_control/datastore-format` and refuses format 3
 * or newer, and a marker it cannot parse.
 *
 * A read that fails (403, 5xx, network, the deadline) fails open, as core's
 * guard does: that operation behaves as it did before, and the next one core
 * starts reads the marker again. This is defence in depth for
 * binaries older than core's guard, and failing closed would block every v2
 * sync during a control-plane outage.
 */

/** The root control-plane key of the format marker, as the client sees it. */
export const DATASTORE_FORMAT_MARKER_KEY = "_control/datastore-format";

/** Core's error code for a datastore whose format a binary cannot read. */
export const DATASTORE_FORMAT_UNSUPPORTED_CODE = "datastore_format_unsupported";

/**
 * How long the marker read may take, once the caller's credentials are
 * resolved, before that read fails open.
 */
export const DATASTORE_FORMAT_READ_TIMEOUT_MS = 3_000;

/**
 * How many failed reads one service makes before it stops checking. A read
 * that fails open is not cached, so one slow or failed first request does not
 * turn the guard off for the service's life; the bound keeps a lasting outage
 * from costing every operation another deadline.
 */
export const DATASTORE_FORMAT_MAX_FAILED_READS = 3;

/** The first format the v2 file sync must not touch. */
const FIRST_UNSYNCABLE_FORMAT = 3;

/** Largest marker accepted, as core's parser: anything bigger is garbled. */
const MARKER_MAX_BYTES = 64 * 1024;

/** The longest `writtenBy` value shown in the message, as core's. */
const MAX_WRITTEN_BY_DISPLAY = 64;

const UPGRADE_HINT =
  "Upgrade swamp to the latest release (`swamp update`). Nothing was synced.";

/**
 * The sync service refused a datastore. `code` matches core's guard, but the
 * message is complete without it: an old binary shows only the message.
 */
export class DatastoreFormatUnsupportedError extends Error {
  readonly code = DATASTORE_FORMAT_UNSUPPORTED_CODE;

  constructor(message: string) {
    super(message);
    this.name = "DatastoreFormatUnsupportedError";
  }
}

/**
 * Throws {@link DatastoreFormatUnsupportedError} when the marker's bytes
 * name a format the v2 file sync must not touch (`minReaderFormat`, or
 * `format` without it, of 3 or more) or are not a valid marker. No marker
 * (null) passes. Parsing follows core's `parseDatastoreFormatMarker`.
 */
export function assertSyncableDatastoreFormat(bytes: Uint8Array | null): void {
  if (bytes === null) return;
  const marker = parseMarker(bytes);
  if (typeof marker === "string") {
    throw new DatastoreFormatUnsupportedError(
      `The datastore format marker ${DATASTORE_FORMAT_MARKER_KEY} is not a ` +
        `valid format marker (${marker}), so this swamp release can't tell ` +
        `whether it can open this datastore. ${UPGRADE_HINT}`,
    );
  }
  if ((marker.minReaderFormat ?? marker.format) < FIRST_UNSYNCABLE_FORMAT) {
    return;
  }
  const writtenBy = displayWrittenBy(marker.writtenBy);
  throw new DatastoreFormatUnsupportedError(
    `This datastore uses format ${marker.format}` +
      (writtenBy ? ` (written by swamp ${writtenBy})` : "") +
      `, which this swamp release can't open. ${UPGRADE_HINT}`,
  );
}

interface ParsedMarker {
  readonly format: number;
  readonly minReaderFormat?: number;
  readonly writtenBy?: string;
}

/** The parsed marker, or why it is not one. */
function parseMarker(bytes: Uint8Array): ParsedMarker | string {
  if (bytes.byteLength > MARKER_MAX_BYTES) {
    return `larger than ${MARKER_MAX_BYTES} bytes`;
  }
  let value: unknown;
  try {
    value = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  } catch {
    return "not valid JSON";
  }
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return "not a JSON object";
  }
  const record = value as Record<string, unknown>;
  const { format, minReaderFormat, writtenBy } = record;
  if (!isFormatNumber(format)) return "format must be a positive integer";
  if (minReaderFormat !== undefined && !isFormatNumber(minReaderFormat)) {
    return "minReaderFormat must be a positive integer";
  }
  if (writtenBy !== undefined && typeof writtenBy !== "string") {
    return "writtenBy must be a string";
  }
  return {
    format,
    ...(minReaderFormat !== undefined ? { minReaderFormat } : {}),
    ...(writtenBy !== undefined ? { writtenBy } : {}),
  };
}

function isFormatNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) &&
    value >= 1;
}

function displayWrittenBy(writtenBy: string | undefined): string | undefined {
  if (writtenBy === undefined) return undefined;
  // deno-lint-ignore no-control-regex
  const printable = writtenBy.replace(/[\u0000-\u001f\u007f-\u009f]/g, "")
    .trim();
  if (printable.length === 0) return undefined;
  return printable.length > MAX_WRITTEN_BY_DISPLAY
    ? `${printable.slice(0, MAX_WRITTEN_BY_DISPLAY)}…`
    : printable;
}

/**
 * Runs the format check once per sync service and shares it between
 * callers.
 *
 * The shared read runs under its own deadline only, never a caller's signal,
 * so one caller's abort cannot reject it for the others or be cached; each
 * caller races the shared check against its own signal. The deadline firing
 * is a failed read, so it fails open like any other.
 *
 * A marker that was read is cached, a refusal included: a process does not
 * see a datastore change format mid-run. After a read that failed open, only
 * the start of an operation core calls ({@link ensure}) reads again, up to
 * {@link DATASTORE_FORMAT_MAX_FAILED_READS} failed reads, after which the
 * service syncs without the check. The steps inside an operation
 * ({@link ensureWithinOperation}) never block once a read has failed open,
 * not even on a re-read another operation started meanwhile. So an operation
 * either refuses at its start or runs to the end: it waits out at most one
 * deadline and never stops partway, however operations overlap.
 */
export class DatastoreFormatGate {
  private check: Promise<void> | null = null;
  // The settled check failed open and the next operation may read again.
  private failedOpen = false;
  private failedReads = 0;

  constructor(
    private readonly readMarker: (
      signal: AbortSignal,
    ) => Promise<Uint8Array | null>,
    private readonly logPrefix: string,
    private readonly timeoutMs: number = DATASTORE_FORMAT_READ_TIMEOUT_MS,
  ) {}

  /**
   * For the start of an operation core calls. Resolves when the datastore
   * may be synced; rejects with {@link DatastoreFormatUnsupportedError}, or
   * with `signal`'s reason when the caller aborts first. Reads the marker
   * unless it was read, and again after a read that failed open.
   *
   * `credentialsReady` is the caller's credentials preflight, when it runs
   * one. The read starts at once, but its deadline starts only once the
   * preflight settles: on a cold process the first request also resolves
   * credentials (an SSO refresh, an assume-role chain, a token exchange),
   * which must not use up the read's time.
   */
  ensure(
    signal?: AbortSignal,
    credentialsReady?: Promise<unknown>,
  ): Promise<void> {
    if (signal?.aborted) return Promise.reject(signal.reason);
    if (!this.check || this.failedOpen) this.start(credentialsReady);
    return raceAbort(this.check!, signal);
  }

  /**
   * For a step inside an operation that already called {@link ensure}. Once
   * any read has failed open, it resolves at once: the operation was let in,
   * so it runs to the end, whatever a later read by another operation finds.
   * Otherwise it shares the read its operation made (or, on a service that
   * has never checked, makes one).
   */
  ensureWithinOperation(signal?: AbortSignal): Promise<void> {
    if (signal?.aborted) return Promise.reject(signal.reason);
    if (this.failedReads > 0) return Promise.resolve();
    if (!this.check) this.start();
    return raceAbort(this.check!, signal);
  }

  private start(credentialsReady?: Promise<unknown>): void {
    this.failedOpen = false;
    const check = this.run(credentialsReady).then((read) => {
      if (read) return;
      this.failedReads++;
      if (this.failedReads < DATASTORE_FORMAT_MAX_FAILED_READS) {
        this.failedOpen = true;
      } else {
        console.debug(
          `${this.logPrefix} ${this.failedReads} reads of the format ` +
            "marker failed; this service syncs without the format check",
        );
      }
    });
    // Callers see the rejection through raceAbort; this keeps a refusal
    // nobody awaits any more from surfacing as unhandled.
    check.catch(() => {});
    this.check = check;
  }

  /**
   * Reads and checks the marker: true once it was read and allows the sync,
   * false when the read failed open. Rejects only with a refusal.
   */
  private async run(credentialsReady?: Promise<unknown>): Promise<boolean> {
    const deadline = new AbortController();
    let timer: ReturnType<typeof setTimeout> | undefined;
    let settled = false;
    const startDeadline = () => {
      // A read that finished before the preflight did needs no clock.
      if (settled) return;
      timer = setTimeout(
        () =>
          deadline.abort(
            new Error(`no answer within ${this.timeoutMs} ms`),
          ),
        this.timeoutMs,
      );
    };
    let bytes: Uint8Array | null;
    try {
      const read = this.readMarker(deadline.signal);
      if (credentialsReady) {
        // A failed preflight fails the caller's operation itself; here it
        // only starts the clock.
        credentialsReady.then(startDeadline, startDeadline);
      } else {
        startDeadline();
      }
      bytes = await raceAbort(read, deadline.signal);
    } catch (error) {
      console.debug(
        `${this.logPrefix} could not read the format marker ` +
          `${DATASTORE_FORMAT_MARKER_KEY} (${describe(error)}); syncing ` +
          "without the format check this time, as core's guard does",
      );
      return false;
    } finally {
      settled = true;
      clearTimeout(timer);
    }
    assertSyncableDatastoreFormat(bytes);
    return true;
  }
}

/** `promise`, or a rejection with `signal`'s reason if it aborts first. */
function raceAbort<T>(promise: Promise<T>, signal?: AbortSignal): Promise<T> {
  if (!signal) return promise;
  if (signal.aborted) return Promise.reject(signal.reason);
  return new Promise<T>((resolve, reject) => {
    const onAbort = () => reject(signal.reason);
    signal.addEventListener("abort", onAbort, { once: true });
    promise.then(
      (value) => {
        signal.removeEventListener("abort", onAbort);
        resolve(value);
      },
      (error) => {
        signal.removeEventListener("abort", onAbort);
        reject(error);
      },
    );
  });
}

function describe(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
