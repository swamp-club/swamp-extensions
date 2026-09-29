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

/**
 * Work-item summary report for gatorwalk-factory.
 *
 * Runs after a work item's `summary` method and persists the same markdown
 * the method logs: the journal as a timeline per era, with the metrics,
 * rendered statically from the run record and the pinned lifecycle. The JSON
 * twin holds the metrics (the same object as the work item's `metrics`
 * record at the same journal version) and the timeline.
 *
 * @module
 */

import { parseRun } from "../models/_lib/run_record.ts";
import { buildSummary } from "../models/_lib/summary.ts";
import {
  checkPinned,
  LIFECYCLE_NAME,
  typeNameOf,
  WORK_ITEM_TYPE,
} from "../models/_lib/work_item_ops.ts";
import { RUN_NAME } from "../models/_lib/run_store.ts";

/** The slice of swamp's MethodReportContext this report reads. */
export interface ReportContext {
  modelType: unknown;
  modelId: string;
  methodName: string;
  executionStatus: "succeeded" | "failed";
  errorMessage?: string;
  definition?: { name?: string };
  dataRepository: {
    getContent(
      type: unknown,
      modelId: string,
      dataName: string,
      version?: number,
    ): Promise<Uint8Array | null>;
  };
}

async function readJson(
  context: ReportContext,
  name: string,
  version?: number,
): Promise<Record<string, unknown> | null> {
  const bytes = await context.dataRepository.getContent(
    context.modelType,
    context.modelId,
    name,
    version,
  );
  if (bytes === null) return null;
  return JSON.parse(new TextDecoder().decode(bytes));
}

export const report = {
  name: "@swamp/gatorwalk-factory/work-item-summary",
  description:
    "Timeline and metrics of a gatorwalk work item, rendered statically from its run record",
  scope: "method",
  labels: ["gatorwalk-factory"],
  execute: async (
    context: ReportContext,
  ): Promise<{ markdown: string; json: Record<string, unknown> }> => {
    if (
      typeNameOf(context.modelType) !== WORK_ITEM_TYPE ||
      context.methodName !== "summary"
    ) {
      return { markdown: "", json: {} };
    }
    const item = context.definition?.name ?? context.modelId;
    // Reports also run on the failure path; persist the reason rather than
    // an empty version.
    if (context.executionStatus !== "succeeded") {
      const error = context.errorMessage ?? "unknown error";
      return {
        markdown: `# Work item ${item}\n\n_Summary failed: ${error}_\n`,
        json: { workItem: item, error },
      };
    }
    const parsed = parseRun(await readJson(context, RUN_NAME));
    if (!parsed.ok) {
      throw new Error(
        `the run record cannot be read:\n${parsed.errors.join("\n")}`,
      );
    }
    const run = parsed.value;
    if (run.lifecycle.version === undefined) {
      throw new Error("the run names no pinned lifecycle version to read");
    }
    const pinned = await checkPinned(
      await readJson(context, LIFECYCLE_NAME, run.lifecycle.version),
      run,
    );
    const built = buildSummary(run, pinned.lifecycle);
    return {
      markdown: built.markdown,
      json: { metrics: built.metrics, timeline: built.timeline },
    };
  },
};
