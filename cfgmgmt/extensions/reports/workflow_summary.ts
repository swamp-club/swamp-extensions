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

import { readFromHandle } from "./_lib/helpers.ts";
import type {
  NodeInfoData,
  StateData,
  WorkflowReportContext,
} from "./_lib/context.ts";

interface StepDetail {
  jobName: string;
  stepName: string;
  modelName: string;
  modelType: string;
  methodName: string;
  executionStatus: string;
  complianceStatus: string;
  changes: string[];
  error: string | null;
  dataRead: boolean;
}

/**
 * Workflow-scoped report aggregating every step's compliance status, changes
 * and errors, plus a fleet table from node gather steps.
 */
export const report = {
  name: "@swamp/cfgmgmt-workflow-summary",
  description: "Aggregated compliance summary for a workflow run",
  scope: "workflow",
  labels: ["cfgmgmt", "compliance"],
  execute: async (context: WorkflowReportContext) => {
    const workflowName = context.workflowName;
    const workflowStatus = context.workflowStatus;
    const steps = context.stepExecutions;
    context.logger.info("Summarising {stepCount} steps of {workflow}", {
      stepCount: steps.length,
      workflow: workflowName,
    });

    const succeeded = steps.filter((s) => s.status === "succeeded").length;
    const failed = steps.filter((s) => s.status === "failed").length;
    const skipped = steps.filter((s) => s.status === "skipped").length;
    const total = steps.length;

    const complianceCounts: Record<string, number> = {};
    const fleet: NodeInfoData[] = [];
    const errors: { stepName: string; modelName: string; error: string }[] = [];
    const stepDetails: StepDetail[] = [];

    for (const step of steps) {
      let complianceStatus = "unknown";
      let changes: string[] = [];
      let error: string | null = null;
      let dataRead = false;

      const handles = step.dataHandles || [];
      const stateHandle = handles.find((h) => h.specName === "state");
      const infoHandle = handles.find((h) => h.specName === "info");

      if (
        infoHandle && step.modelType.includes("node") &&
        step.methodName === "gather"
      ) {
        // The info resource's shape is fixed by the node model that writes it.
        const result = (await readFromHandle(
          context.dataRepository,
          step.modelType,
          step.modelId,
          infoHandle,
        )) as NodeInfoData | null;
        if (result) {
          fleet.push({
            hostname: result.hostname,
            os: result.os,
            osVersion: result.osVersion,
            arch: result.arch,
            kernel: result.kernel,
            packageManagers: result.packageManagers,
            gatheredAt: result.gatheredAt,
          });
          dataRead = true;
        }
        complianceStatus = "-";
      } else if (stateHandle) {
        // The state resource's shape is fixed by the cfgmgmt models that write it.
        const result = (await readFromHandle(
          context.dataRepository,
          step.modelType,
          step.modelId,
          stateHandle,
        )) as StateData | null;
        if (result) {
          complianceStatus = result.status || "unknown";
          changes = result.changes || [];
          error = result.error || null;
          dataRead = true;
        }
      }

      if (step.status === "failed" && complianceStatus === "unknown") {
        complianceStatus = "failed";
        error = error || step.error || "step failed (no error details)";
      }

      if (step.status === "skipped") {
        complianceStatus = "-";
      }

      if (complianceStatus !== "-" && complianceStatus !== "unknown") {
        complianceCounts[complianceStatus] =
          (complianceCounts[complianceStatus] || 0) + 1;
      }

      if (error) {
        errors.push({
          stepName: step.stepName,
          modelName: step.modelName,
          error,
        });
      }

      stepDetails.push({
        jobName: step.jobName,
        stepName: step.stepName,
        modelName: step.modelName,
        modelType: step.modelType,
        methodName: step.methodName,
        executionStatus: step.status,
        complianceStatus,
        changes,
        error,
        dataRead,
      });
    }

    // Build markdown
    const md = [
      `# Workflow Summary: ${workflowName}`,
      "",
      `**Status**: ${workflowStatus}`,
      `**Steps**: ${total} total | ${succeeded} succeeded | ${failed} failed | ${skipped} skipped`,
    ];

    if (errors.length > 0) {
      md.push("", "## Errors", "");
      for (const e of errors) {
        md.push(`- **${e.stepName}** (${e.modelName}): ${e.error}`);
      }
    }

    if (fleet.length > 0) {
      md.push(
        "",
        "## Fleet",
        "",
        "| Hostname | OS | Version | Arch | Kernel | Package Managers |",
        "| --- | --- | --- | --- | --- | --- |",
      );
      for (const node of fleet) {
        const pms = (node.packageManagers || []).join(", ");
        md.push(
          `| ${node.hostname} | ${node.os} | ${node.osVersion} | ${node.arch} | ${node.kernel} | ${pms} |`,
        );
      }
    }

    if (Object.keys(complianceCounts).length > 0) {
      md.push(
        "",
        "## Compliance Overview",
        "",
        "| Status | Count |",
        "| --- | --- |",
      );
      const sorted = Object.entries(complianceCounts).sort((a, b) =>
        b[1] - a[1]
      );
      for (const [status, count] of sorted) {
        md.push(`| ${status} | ${count} |`);
      }
    }

    const jobNames = [...new Set(stepDetails.map((s) => s.jobName))];
    for (const jobName of jobNames) {
      const jobSteps = stepDetails.filter((s) => s.jobName === jobName);
      md.push(
        "",
        `## ${jobName}`,
        "",
        "| Step | Model | Method | Status | Compliance | Changes |",
        "| --- | --- | --- | --- | --- | --- |",
      );
      for (const s of jobSteps) {
        const shortType = s.modelType.split("/").pop() || s.modelType;
        const changesDisplay = s.complianceStatus === "-"
          ? "-"
          : s.dataRead
          ? String(s.changes.length)
          : "-";
        md.push(
          `| ${s.stepName} | ${shortType} | ${s.methodName} | ${s.executionStatus} | ${s.complianceStatus} | ${changesDisplay} |`,
        );
      }
    }

    context.logger.info("Summarised {workflow}: {failed} failed", {
      workflow: workflowName,
      failed,
    });
    return {
      markdown: md.join("\n") + "\n",
      json: {
        workflowName,
        workflowStatus,
        summary: {
          total,
          succeeded,
          failed,
          skipped,
          compliance: complianceCounts,
        },
        fleet,
        jobs: Object.fromEntries(
          jobNames.map((name) => [
            name,
            stepDetails.filter((s) => s.jobName === name),
          ]),
        ),
        steps: stepDetails,
      },
    };
  },
};
