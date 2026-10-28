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

// Shared utilities for @swamp/cfgmgmt reports.

import type {
  MethodReportContext,
  ReportDataHandle,
  ReportDataRepository,
  ReportModelType,
} from "./context.ts";

/** Shared UTF-8 decoder for stored resource content. */
export const decoder = new TextDecoder();

/** A model type as a display string, whether swamp passed a string or a ModelType. */
export function typeString(modelType: ReportModelType): string {
  if (typeof modelType === "string") return modelType;
  if (modelType && typeof modelType === "object") {
    if (typeof modelType.raw === "string") return modelType.raw;
    if (typeof modelType.normalized === "string") return modelType.normalized;
  }
  return String(modelType);
}

/**
 * Argument names whose values a report must never render: sudo passwords,
 * private keys, file and template payloads, container environments, and
 * anything named like a credential. Matched against top-level keys.
 */
const SENSITIVE_KEY =
  /pass(?:word|phrase)|secret|token|credential|^key$|content$|^env(?:ironment)?$|^variables$/i;

/** `scheme://user:pass@host` — the userinfo part of a URL. */
const URL_USERINFO = /\b([a-z][a-z0-9+.-]*:\/\/)[^\s/@]+@/gi;

/** Redacted stand-in for a sensitive value. */
export const REDACTED = "***";

function scrubUrls(val: unknown): unknown {
  if (typeof val === "string") {
    return val.replace(URL_USERINFO, `$1${REDACTED}@`);
  }
  if (Array.isArray(val)) return val.map(scrubUrls);
  return val;
}

/**
 * A copy of a model's arguments (or recorded state) safe to render: values
 * under sensitive keys (whatever their type) are replaced with `***`, and
 * credentials embedded in URLs are masked. Non-objects pass through.
 */
export function redactArgs(globalArgs: unknown): unknown {
  if (!globalArgs || typeof globalArgs !== "object") return globalArgs;
  if (Array.isArray(globalArgs)) return scrubUrls(globalArgs);
  const redacted: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(globalArgs)) {
    if (SENSITIVE_KEY.test(k) && v !== undefined && v !== null) {
      redacted[k] = REDACTED;
    } else {
      redacted[k] = scrubUrls(v);
    }
  }
  return redacted;
}

/**
 * One markdown table cell: objects as JSON, newlines and pipes escaped, and
 * long values truncated to `maxLen` characters.
 */
export function tableCell(val: unknown, maxLen = 120): string {
  let s: string;
  if (val === null || val === undefined) {
    s = "-";
  } else if (typeof val === "object") {
    s = JSON.stringify(val);
  } else {
    s = String(val);
  }
  // collapse newlines and pipes so the table doesn't break
  s = s.replace(/\r?\n/g, " ").replace(/\|/g, "\\|");
  if (s.length > maxLen) s = s.slice(0, maxLen) + "\u2026";
  return s;
}

/** An emoji for a cfgmgmt compliance status (`?` glyph when unknown). */
export function statusIcon(status: unknown): string {
  switch (status) {
    case "compliant":
      return "\u2705";
    case "applied":
      return "\uD83D\uDD27";
    case "non_compliant":
      return "\u26A0\uFE0F";
    case "failed":
      return "\u274C";
    default:
      return "\u2753";
  }
}

/** A line per data handle, for diagnosing a report that found no data. */
export function dumpHandles(
  dataHandles: ReportDataHandle[] | undefined,
): string {
  if (!dataHandles) return "dataHandles is " + String(dataHandles);
  if (!Array.isArray(dataHandles)) {
    return "dataHandles is not an array: " + typeof dataHandles;
  }
  if (dataHandles.length === 0) return "dataHandles is empty []";
  return dataHandles.map((h, i) =>
    `[${i}] name=${JSON.stringify(h.name)} specName=${
      JSON.stringify(h.specName)
    } kind=${JSON.stringify(h.kind)} dataId=${
      JSON.stringify(h.dataId)
    } version=${h.version} keys=[${Object.keys(h).join(",")}]`
  ).join("\n");
}

/**
 * The report context's identifying fields, for diagnostics. Never includes
 * globalArgs or methodArgs.
 */
export function dumpContext(context: MethodReportContext): string {
  const lines: string[] = [];
  lines.push(`scope: ${JSON.stringify(context.scope)}`);
  lines.push(`modelType: ${JSON.stringify(context.modelType)}`);
  lines.push(`modelId: ${JSON.stringify(context.modelId)}`);
  lines.push(
    `definition: ${
      JSON.stringify(
        context.definition
          ? { id: context.definition.id, name: context.definition.name }
          : context.definition,
      )
    }`,
  );
  lines.push(`methodName: ${JSON.stringify(context.methodName)}`);
  lines.push(`executionStatus: ${JSON.stringify(context.executionStatus)}`);
  lines.push(
    `dataHandles:\n${dumpHandles(context.dataHandles)}`,
  );
  lines.push(
    `dataRepository: ${
      context.dataRepository ? typeof context.dataRepository : "missing"
    }`,
  );
  lines.push(`repoDir: ${JSON.stringify(context.repoDir)}`);
  return lines.join("\n");
}

/**
 * The JSON content behind a data handle, or null when it is missing or
 * unreadable (reports degrade to a diagnostic rather than throwing).
 */
export async function readFromHandle(
  dataRepository: ReportDataRepository,
  modelType: ReportModelType,
  modelId: string,
  handle: ReportDataHandle,
): Promise<unknown> {
  try {
    const content = await dataRepository.getContent(
      // swamp accepts the type as handed over: a string from a workflow
      // step, or the ModelType object a method report gets.
      modelType,
      modelId,
      handle.name,
      handle.version,
    );
    if (content) return JSON.parse(decoder.decode(content));
  } catch { /* fall through */ }
  return null;
}

/**
 * A report result explaining why no state could be rendered, with a context
 * dump (no arguments) for debugging.
 */
export function diagResult(
  modelName: string,
  modelType: string,
  method: string,
  execStatus: string,
  message: string,
  context: MethodReportContext,
) {
  context.logger.warn("No renderable data for {model} {method}: {reason}", {
    model: modelName,
    method,
    reason: message,
  });
  const diag = dumpContext(context);
  return {
    markdown: [
      `## \u274C ${modelName}`,
      "",
      `**${message}**`,
      "",
      "### Report Context Dump",
      "",
      "```",
      diag,
      "```",
      "",
    ].join("\n"),
    json: {
      modelName,
      modelType,
      method,
      executionStatus: execStatus,
      status: "diagnostic",
      _diagnostic: message,
      _context: {
        scope: context.scope,
        modelType: context.modelType,
        modelId: context.modelId,
        methodName: context.methodName,
        executionStatus: context.executionStatus,
        dataHandleCount: context.dataHandles?.length ?? null,
        dataHandles: context.dataHandles?.map((h) => ({
          name: h.name,
          specName: h.specName,
          kind: h.kind,
          dataId: h.dataId,
          version: h.version,
        })) ?? null,
        hasDataRepository: !!context.dataRepository,
      },
    },
  };
}
