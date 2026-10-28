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

import {
  diagResult,
  readFromHandle,
  redactArgs,
  statusIcon,
  tableCell,
  typeString,
} from "./_lib/helpers.ts";
import type { MethodReportContext, StateData } from "./_lib/context.ts";

/**
 * Method-scoped report rendering a cfgmgmt model's `state` resource after
 * check or apply: status, error, changes, current state, and the arguments
 * used (sensitive values redacted).
 */
export const report = {
  name: "@swamp/cfgmgmt-state",
  description: "Compliance state after check or apply",
  scope: "method",
  labels: ["cfgmgmt", "compliance"],
  execute: async (context: MethodReportContext) => {
    const modelName = context.definition.name;
    const modelType = typeString(context.modelType);
    const method = context.methodName;
    const execStatus = context.executionStatus;
    context.logger.info("Rendering state report for {model} {method}", {
      model: modelName,
      method,
    });

    if (!context.dataHandles || !Array.isArray(context.dataHandles)) {
      return diagResult(
        modelName,
        modelType,
        method,
        execStatus,
        "dataHandles is missing or not an array",
        context,
      );
    }

    if (context.dataHandles.length === 0) {
      return diagResult(
        modelName,
        modelType,
        method,
        execStatus,
        "dataHandles is empty -- no data was returned by the method execution",
        context,
      );
    }

    const stateHandle = context.dataHandles.find(
      (h) => h.specName === "state",
    );
    if (!stateHandle) {
      return diagResult(
        modelName,
        modelType,
        method,
        execStatus,
        `No handle with specName="state" found in ${context.dataHandles.length} handle(s)`,
        context,
      );
    }

    // The state resource's shape is fixed by the cfgmgmt models that write it.
    const data = (await readFromHandle(
      context.dataRepository,
      context.modelType,
      context.modelId,
      stateHandle,
    )) as StateData | null;
    if (!data) {
      return diagResult(
        modelName,
        modelType,
        method,
        execStatus,
        `Found state handle (name=${
          JSON.stringify(stateHandle.name)
        }, version=${stateHandle.version}) but dataRepository.getContent() returned null`,
        context,
      );
    }

    const status = data.status || "unknown";
    const icon = statusIcon(status);
    const changes = data.changes || [];
    const error = data.error || null;
    const timestamp = data.timestamp || "";
    const current = (redactArgs(data.current) as StateData["current"]) ||
      null;
    const gArgs = redactArgs(context.globalArgs);
    const mArgs = redactArgs(context.methodArgs);

    const lines = [
      `## ${icon} ${modelName}`,
      "",
      "| Field | Value |",
      "| --- | --- |",
      `| **Type** | \`${modelType}\` |`,
      `| **Method** | ${method} |`,
      `| **Status** | ${status} |`,
      `| **Timestamp** | ${timestamp} |`,
    ];

    if (error) {
      lines.push(`| **Error** | ${error} |`);
    }

    if (
      gArgs && typeof gArgs === "object" &&
      Object.keys(gArgs).length > 0
    ) {
      lines.push(
        "",
        "### Global Arguments",
        "",
        "| Argument | Value |",
        "| --- | --- |",
      );
      for (const [key, val] of Object.entries(gArgs)) {
        lines.push(`| ${key} | ${tableCell(val)} |`);
      }
    }

    if (
      mArgs && typeof mArgs === "object" &&
      Object.keys(mArgs).length > 0
    ) {
      lines.push(
        "",
        "### Method Arguments",
        "",
        "| Argument | Value |",
        "| --- | --- |",
      );
      for (const [key, val] of Object.entries(mArgs)) {
        lines.push(`| ${key} | ${tableCell(val)} |`);
      }
    }

    if (changes.length > 0) {
      lines.push("", "### Changes");
      for (const change of changes) {
        lines.push(`- ${change}`);
      }
    }

    if (current && typeof current === "object") {
      lines.push(
        "",
        "### Current State",
        "",
        "| Property | Value |",
        "| --- | --- |",
      );
      for (const [key, val] of Object.entries(current)) {
        lines.push(`| ${key} | ${tableCell(val)} |`);
      }
    }

    context.logger.info("Rendered state report for {model}: {status}", {
      model: modelName,
      status,
    });
    return {
      markdown: lines.join("\n") + "\n",
      json: {
        modelName,
        modelType,
        method,
        executionStatus: execStatus,
        status,
        changes,
        error,
        timestamp,
        current,
        globalArgs: gArgs,
        methodArgs: mArgs,
      },
    };
  },
};
