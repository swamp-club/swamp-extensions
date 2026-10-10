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

// ---------------------------------------------------------------------------
// swamp's rules for naming a model or a workflow, copied (#3190).
//
// swamp does not export its name checks, so they are mirrored here exactly:
// the patterns, the length limit, the scoped `@collective/name` form and the
// messages. Copied from swamp at fbfa141c (2026-10-08):
//
// - modelNameViolation: definitionNameViolation in
//   src/domain/definitions/definition.ts (DEFINITION_NAME_PATTERN,
//   DEFINITION_NAME_MAX_LENGTH, definitionNameBase, definitionNameStrict).
// - workflowNameViolation: workflowNameViolation in
//   src/domain/workflows/workflow.ts (WORKFLOW_NAME_PATTERN,
//   WORKFLOW_NAME_MAX_LENGTH, workflowNameBase, workflowNameStrict).
//
// These are the rules swamp applies when it creates a name, so every model
// and workflow made today satisfies them; swamp still reads older names that
// do not. swamp_names_test.ts holds swamp's own test cases; when swamp
// changes a rule, change it here and there together.
// ---------------------------------------------------------------------------

/** The longest model or workflow name swamp creates. */
export const SWAMP_NAME_MAX_LENGTH = 64;

const MODEL_NAME_PATTERN = /^[a-z0-9][a-z0-9_-]*$/;
const WORKFLOW_NAME_PATTERN = /^[a-z0-9][a-z0-9-]*$/;
const SCOPED_NAME_PATTERN = /^@[a-z0-9_-]+\/[a-z0-9_-]+(\/[a-z0-9_-]+)*$/;

/** The rule both kinds share: no path traversal, and '/' only in a scoped
 * name. */
function baseViolation(kind: string, name: string): string | undefined {
  if (name === "") return `${kind} name must not be empty.`;
  const traversal = name.includes("..") || name.includes("\\") ||
    name.includes("\0");
  if (traversal || (name.includes("/") && !SCOPED_NAME_PATTERN.test(name))) {
    return `${kind} name must not contain '..', '\\', or null bytes ` +
      "(path traversal). '/' is only allowed in scoped @collective/name " +
      "patterns.";
  }
  return undefined;
}

/**
 * The first rule a model name breaks, or undefined when swamp would create
 * it. A model id (a lowercase UUID) satisfies it too.
 */
export function modelNameViolation(name: string): string | undefined {
  const base = baseViolation("Definition", name);
  if (base !== undefined) return base;
  if (!name.includes("/") && !MODEL_NAME_PATTERN.test(name)) {
    return "Definition name must be lowercase alphanumeric with hyphens or " +
      "underscores (e.g. 'my-server'). Must start with a letter or number.";
  }
  if (name.length > SWAMP_NAME_MAX_LENGTH) {
    return `Definition name must be at most ${SWAMP_NAME_MAX_LENGTH} ` +
      "characters.";
  }
  return undefined;
}

/**
 * The first rule a workflow name breaks, or undefined when swamp would
 * create it. A scoped name gets the shared rule only, as in swamp.
 */
export function workflowNameViolation(name: string): string | undefined {
  const base = baseViolation("Workflow", name);
  if (base !== undefined || name.includes("/")) return base;
  if (!WORKFLOW_NAME_PATTERN.test(name)) {
    return "Workflow name must be lowercase alphanumeric with hyphens (e.g. " +
      "'deploy-pipeline'). Must start with a letter or number.";
  }
  if (name.length > SWAMP_NAME_MAX_LENGTH) {
    return `Workflow name must be at most ${SWAMP_NAME_MAX_LENGTH} ` +
      "characters.";
  }
  return undefined;
}
