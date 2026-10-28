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
  tableCell,
  typeString,
} from "./_lib/helpers.ts";
import type { MethodReportContext, NodeInfoData } from "./_lib/context.ts";

/**
 * Method-scoped report rendering the node model's `info` resource after
 * gather: OS, arch, kernel, package managers, and the arguments used
 * (sensitive values redacted).
 */
export const report = {
  name: "@swamp/cfgmgmt-node-state",
  description: "Node info after gathering facts",
  scope: "method",
  labels: ["cfgmgmt"],
  execute: async (context: MethodReportContext) => {
    const modelName = context.definition.name;
    const modelType = typeString(context.modelType);
    const method = context.methodName;
    const execStatus = context.executionStatus;
    context.logger.info("Rendering node report for {model} {method}", {
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

    const infoHandle = context.dataHandles.find(
      (h) => h.specName === "info",
    );
    if (!infoHandle) {
      return diagResult(
        modelName,
        modelType,
        method,
        execStatus,
        `No handle with specName="info" found in ${context.dataHandles.length} handle(s)`,
        context,
      );
    }

    // The info resource's shape is fixed by the cfgmgmt models that write it.
    const data = (await readFromHandle(
      context.dataRepository,
      context.modelType,
      context.modelId,
      infoHandle,
    )) as NodeInfoData | null;
    if (!data) {
      return diagResult(
        modelName,
        modelType,
        method,
        execStatus,
        `Found info handle (name=${
          JSON.stringify(infoHandle.name)
        }, version=${infoHandle.version}) but dataRepository.getContent() returned null`,
        context,
      );
    }

    const icon = execStatus === "succeeded" ? "\u2705" : "\u274C";
    const pms = (data.packageManagers || []).join(", ");
    const gArgs = redactArgs(context.globalArgs);
    const mArgs = redactArgs(context.methodArgs);
    const lines = [
      `## ${icon} ${modelName}`,
      "",
      "| Field | Value |",
      "| --- | --- |",
      `| **Type** | \`${modelType}\` |`,
      `| **Method** | ${method} |`,
      `| **Hostname** | ${data.hostname} |`,
      `| **OS** | ${data.os} ${data.osVersion} |`,
      `| **Arch** | ${data.arch} |`,
      `| **Kernel** | ${data.kernel} |`,
      `| **Package Managers** | ${pms} |`,
      `| **Gathered At** | ${data.gatheredAt} |`,
    ];

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

    context.logger.info("Rendered node report for {model}", {
      model: modelName,
    });
    return {
      markdown: lines.join("\n") + "\n",
      json: {
        modelName,
        modelType,
        method,
        executionStatus: execStatus,
        hostname: data.hostname,
        os: data.os,
        osVersion: data.osVersion,
        arch: data.arch,
        kernel: data.kernel,
        packageManagers: data.packageManagers || [],
        gatheredAt: data.gatheredAt,
        globalArgs: gArgs,
        methodArgs: mArgs,
      },
    };
  },
};
