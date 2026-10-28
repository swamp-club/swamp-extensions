// Copyright (C) 2026 Adam Jacob
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
// Test harness for the reports: a recording logger and an in-memory data
// repository.

import type { ReportDataRepository, ReportLogger } from "./context.ts";

/** One recorded log call. */
export interface ReportLogLine {
  level: "debug" | "info" | "warn" | "error";
  message: string;
  props?: Record<string, unknown>;
}

/** A logger that records every call into `lines`. */
export function recordingLogger(): ReportLogger & { lines: ReportLogLine[] } {
  const lines: ReportLogLine[] = [];
  const at =
    (level: ReportLogLine["level"]) =>
    (message: string, props?: Record<string, unknown>) => {
      lines.push({ level, message, props });
    };
  return {
    lines,
    debug: at("debug"),
    info: at("info"),
    warn: at("warn"),
    error: at("error"),
  };
}

/** A data repository serving `data` as JSON for every read (null when null). */
export function jsonRepository(data: unknown): ReportDataRepository {
  return {
    getContent: () =>
      Promise.resolve(
        data === null ? null : new TextEncoder().encode(JSON.stringify(data)),
      ),
  };
}
