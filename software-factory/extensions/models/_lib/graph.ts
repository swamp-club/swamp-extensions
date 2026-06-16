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

import type {
  FactoryArguments,
  GateSpec,
  StageSpec,
  TransitionSpec,
} from "./definition_schema.ts";
import {
  allArtifactSpecs,
  allEvidenceNames,
  CYCLE_OVERRIDE_PREFIX,
  findArtifactSpec,
  transitionsFrom,
} from "./definition_schema.ts";
import { compileArtifactSchema } from "./artifact_schema.ts";

// ---------------------------------------------------------------------------
// Graph validation: the structural rules a factory definition must satisfy
// beyond the per-field meta-schema. Run at `start`, in the `graph-valid`
// pre-flight check, and via the read-only `validate` method.
// ---------------------------------------------------------------------------

export interface GraphValidation {
  errors: string[];
  warnings: string[];
}

export function validateGraph(args: FactoryArguments): GraphValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  const stageIds = new Set<string>();
  for (const stage of args.stages) {
    if (stageIds.has(stage.id)) {
      errors.push(`duplicate stage id '${stage.id}'`);
    }
    stageIds.add(stage.id);
  }

  const initials = args.stages.filter((s) => s.initial === true);
  if (initials.length !== 1) {
    errors.push(
      `exactly one stage must declare initial: true (found ${initials.length})`,
    );
  }

  const terminals = args.stages.filter((s) => s.terminal === true);
  if (terminals.length === 0) {
    errors.push("at least one stage must declare terminal: true");
  }

  for (const stage of args.stages) {
    if (stage.initial === true && stage.terminal === true) {
      errors.push(`stage '${stage.id}' cannot be both initial and terminal`);
    }
  }

  // Globally-unique artifact and evidence names (instances live in a flat
  // per-run namespace: artifact-<name>, evidence-<name>).
  const artifactNames = new Set<string>();
  for (const { spec, stageId } of allArtifactSpecs(args)) {
    if (artifactNames.has(spec.name)) {
      errors.push(
        `artifact '${spec.name}' (stage '${stageId}') is declared more than once — artifact names are global to the run`,
      );
    }
    artifactNames.add(spec.name);
  }
  const evidenceNames = new Set<string>();
  for (const { name, stageId } of allEvidenceNames(args)) {
    if (evidenceNames.has(name)) {
      errors.push(
        `evidence '${name}' (stage '${stageId}') is declared more than once — evidence names are global to the run`,
      );
    }
    evidenceNames.add(name);
  }

  // reviews: links resolve and are acyclic.
  for (const { spec, stageId } of allArtifactSpecs(args)) {
    if (spec.reviews !== undefined && !artifactNames.has(spec.reviews)) {
      errors.push(
        `artifact '${spec.name}' (stage '${stageId}') reviews undeclared artifact '${spec.reviews}'`,
      );
    }
  }
  for (const { spec } of allArtifactSpecs(args)) {
    const seen = new Set<string>([spec.name]);
    let current = spec.reviews;
    while (current !== undefined) {
      if (seen.has(current)) {
        errors.push(
          `artifact '${spec.name}' has a cyclic reviews chain through '${current}'`,
        );
        break;
      }
      seen.add(current);
      current = findArtifactSpec(args, current)?.spec.reviews;
    }
  }

  // Artifact schemas compile.
  for (const { spec, stageId } of allArtifactSpecs(args)) {
    try {
      compileArtifactSchema(spec);
    } catch (error) {
      errors.push(
        `artifact '${spec.name}' (stage '${stageId}') schema does not compile: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  // Transitions: targets exist, names unique per stage, non-terminal stages
  // have a way out, terminal stages have no outgoing transitions.
  const validateTransitions = (
    transitions: TransitionSpec[],
    where: string,
  ) => {
    const names = new Set<string>();
    for (const t of transitions) {
      if (names.has(t.name)) {
        errors.push(`duplicate transition '${t.name}' on ${where}`);
      }
      names.add(t.name);
      if (!stageIds.has(t.to)) {
        errors.push(
          `transition '${t.name}' on ${where} targets unknown stage '${t.to}'`,
        );
      }
      for (const gate of t.gates ?? []) {
        validateGate(gate, `transition '${t.name}' on ${where}`);
      }
    }
  };

  const validateGate = (gate: GateSpec, where: string) => {
    switch (gate.type) {
      case "artifact-exists": {
        if (!artifactNames.has(gate.config.artifact)) {
          errors.push(
            `${where}: artifact-exists references undeclared artifact '${gate.config.artifact}'`,
          );
        }
        break;
      }
      case "artifact-fresh": {
        const found = findArtifactSpec(args, gate.config.artifact);
        if (found === undefined) {
          errors.push(
            `${where}: artifact-fresh references undeclared artifact '${gate.config.artifact}'`,
          );
        } else if (found.spec.reviews === undefined) {
          errors.push(
            `${where}: artifact-fresh on '${gate.config.artifact}' requires the artifact to declare reviews: <subject>`,
          );
        }
        break;
      }
      case "findings-clear": {
        const found = findArtifactSpec(args, gate.config.artifact);
        if (found === undefined) {
          errors.push(
            `${where}: findings-clear references undeclared artifact '${gate.config.artifact}'`,
          );
        } else if (found.spec.kind !== "findings") {
          errors.push(
            `${where}: findings-clear on '${gate.config.artifact}' requires the artifact to declare kind: findings`,
          );
        }
        break;
      }
      case "human-approval": {
        if (gate.config.id.startsWith(CYCLE_OVERRIDE_PREFIX)) {
          errors.push(
            `${where}: human-approval id '${gate.config.id}' uses the reserved '${CYCLE_OVERRIDE_PREFIX}' prefix`,
          );
        }
        break;
      }
      case "evidence-recorded": {
        if (!evidenceNames.has(gate.config.name)) {
          errors.push(
            `${where}: evidence-recorded references undeclared evidence '${gate.config.name}'`,
          );
        }
        break;
      }
      case "cooldown": {
        if (
          gate.config.afterEvidence !== undefined &&
          !evidenceNames.has(gate.config.afterEvidence)
        ) {
          errors.push(
            `${where}: cooldown references undeclared evidence '${gate.config.afterEvidence}'`,
          );
        }
        if (
          gate.config.afterArtifact !== undefined &&
          !artifactNames.has(gate.config.afterArtifact)
        ) {
          errors.push(
            `${where}: cooldown references undeclared artifact '${gate.config.afterArtifact}'`,
          );
        }
        break;
      }
      case "max-cycles": {
        if (!stageIds.has(gate.config.stage)) {
          errors.push(
            `${where}: max-cycles references unknown stage '${gate.config.stage}'`,
          );
        }
        break;
      }
      case "cel":
      case "workflow-succeeded":
        break;
    }
  };

  for (const stage of args.stages) {
    validateTransitions(stage.transitions ?? [], `stage '${stage.id}'`);
    if (stage.terminal === true && (stage.transitions ?? []).length > 0) {
      warnings.push(
        `terminal stage '${stage.id}' declares transitions — they are unreachable`,
      );
    }
    if (
      stage.terminal !== true &&
      transitionsFrom(args, stage).length === 0
    ) {
      errors.push(
        `non-terminal stage '${stage.id}' has no outgoing transitions (counting global transitions)`,
      );
    }
    if (
      stage.work !== undefined &&
      (stage.work.mode === "workflow" || stage.work.mode === "method") &&
      stage.work.resultEvidence === undefined
    ) {
      warnings.push(
        `stage '${stage.id}' uses mode '${stage.work.mode}' without resultEvidence — its outcome cannot be gated on`,
      );
    }
  }
  validateTransitions(args.globalTransitions ?? [], "globalTransitions");

  // Reachability: every stage reachable from initial; a terminal stage
  // reachable from every stage (warning).
  if (initials.length === 1) {
    const reachable = reachableFrom(args, initials[0].id);
    for (const stage of args.stages) {
      if (!reachable.has(stage.id)) {
        errors.push(
          `stage '${stage.id}' is unreachable from initial stage '${
            initials[0].id
          }'`,
        );
      }
    }
    const terminalIds = new Set(terminals.map((s) => s.id));
    for (const stage of args.stages) {
      if (stage.terminal === true) continue;
      const fromHere = reachableFrom(args, stage.id);
      const canFinish = [...fromHere].some((id) => terminalIds.has(id));
      if (!canFinish) {
        warnings.push(
          `no terminal stage is reachable from stage '${stage.id}'`,
        );
      }
    }
  }

  return { errors, warnings };
}

function reachableFrom(args: FactoryArguments, startId: string): Set<string> {
  const byId = new Map<string, StageSpec>(args.stages.map((s) => [s.id, s]));
  const seen = new Set<string>([startId]);
  const queue = [startId];
  while (queue.length > 0) {
    const id = queue.shift();
    if (id === undefined) break;
    const stage = byId.get(id);
    if (stage === undefined) continue;
    for (const t of transitionsFrom(args, stage)) {
      if (!seen.has(t.to)) {
        seen.add(t.to);
        queue.push(t.to);
      }
    }
  }
  return seen;
}
