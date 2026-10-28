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

// The slice of the swamp report context the cfgmgmt reports use.

/** Logger surface (matches the logger swamp hands every report context). */
export interface ReportLogger {
  debug(message: string, props?: Record<string, unknown>): void;
  info(message: string, props?: Record<string, unknown>): void;
  warn(message: string, props?: Record<string, unknown>): void;
  error(message: string, props?: Record<string, unknown>): void;
}

/** A handle to a piece of data written by a model method. */
export interface ReportDataHandle {
  name: string;
  specName?: string;
  kind?: string;
  dataId?: string;
  version?: number;
}

/** A model type as swamp hands it to reports: a string or a ModelType. */
export type ReportModelType =
  | string
  | {
    raw?: unknown;
    normalized?: unknown;
    toDirectoryPath?: unknown;
  };

/** Reads back the content a model method wrote, by handle name and version. */
export interface ReportDataRepository {
  getContent(
    type: ReportModelType,
    modelId: string,
    dataName: string,
    version?: number,
  ): Promise<Uint8Array | null>;
}

/** Context for method-scoped reports. */
export interface MethodReportContext {
  scope?: string;
  modelType: ReportModelType;
  modelId: string;
  definition: { id: string; name: string };
  methodName: string;
  executionStatus: string;
  dataHandles?: ReportDataHandle[];
  dataRepository: ReportDataRepository;
  logger: ReportLogger;
  repoDir?: string;
  globalArgs?: unknown;
  methodArgs?: unknown;
}

/** One step of a workflow run, as handed to workflow-scoped reports. */
export interface StepExecution {
  jobName: string;
  stepName: string;
  modelName: string;
  modelType: string;
  modelId: string;
  methodName: string;
  status: string;
  error?: string;
  dataHandles?: ReportDataHandle[];
}

/** Context for workflow-scoped reports. */
export interface WorkflowReportContext {
  workflowName: string;
  workflowStatus: string;
  stepExecutions: StepExecution[];
  dataRepository: ReportDataRepository;
  logger: ReportLogger;
}

/** The `state` resource the cfgmgmt models write on check/apply. */
export interface StateData {
  status?: string;
  changes?: string[];
  error?: string | null;
  timestamp?: string;
  current?: Record<string, unknown> | null;
}

/** The `info` resource the node model writes on gather. */
export interface NodeInfoData {
  hostname?: string;
  os?: string;
  osVersion?: string;
  arch?: string;
  kernel?: string;
  packageManagers?: string[];
  gatheredAt?: string;
}
