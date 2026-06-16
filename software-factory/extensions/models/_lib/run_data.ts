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

import { z } from "npm:zod@4.3.6";

// ---------------------------------------------------------------------------
// Run-time data: state, artifact/evidence envelopes, approvals, journal.
//
// One factory instance serves many work items. Every record is namespaced by
// the work item's slug in its instance name (state-<slug>,
// artifact-<slug>-<name>, …) and stamped with the original workItem string
// in its envelope. All data is versioned and immutable.
// ---------------------------------------------------------------------------

export const RunStateSchema = z.object({
  workItem: z.string(),
  stageId: z.string(),
  cycles: z.record(z.string(), z.number().int().positive()),
  enteredAt: z.string(),
  status: z.enum(["active", "terminal"]),
  definitionVersion: z.number().int().positive(),
  startedAt: z.string(),
});

export type RunState = z.infer<typeof RunStateSchema>;

export const ArtifactEnvelopeSchema = z.object({
  name: z.string(),
  workItem: z.string(),
  stageId: z.string(),
  cycle: z.number().int().positive(),
  payload: z.record(z.string(), z.unknown()),
  subjectVersion: z.number().int().positive().optional(),
  recordedAt: z.string(),
  resolvedAt: z.string().optional(),
  note: z.string().optional(),
});

export type ArtifactEnvelope = z.infer<typeof ArtifactEnvelopeSchema>;

export const EvidenceEnvelopeSchema = z.object({
  name: z.string(),
  workItem: z.string(),
  stageId: z.string(),
  cycle: z.number().int().positive(),
  payload: z.record(z.string(), z.unknown()),
  recordedAt: z.string(),
});

export type EvidenceEnvelope = z.infer<typeof EvidenceEnvelopeSchema>;

export const ApprovalRecordSchema = z.object({
  gateId: z.string(),
  workItem: z.string(),
  decision: z.enum(["approved", "rejected"]),
  actor: z.string(),
  note: z.string().optional(),
  stageId: z.string(),
  cycle: z.number().int().positive(),
  decidedAt: z.string(),
});

export type ApprovalRecord = z.infer<typeof ApprovalRecordSchema>;

export const JournalEntrySchema = z.object({
  event: z.string(),
  workItem: z.string(),
  stageId: z.string().optional(),
  summary: z.string(),
  payload: z.record(z.string(), z.unknown()).optional(),
  at: z.string(),
});

export type JournalEntry = z.infer<typeof JournalEntrySchema>;

// ---------------------------------------------------------------------------
// Work-item slugs and instance naming live in run_names.ts (zod-free so
// report extensions can bundle them); re-exported here for the engine.
// ---------------------------------------------------------------------------

export {
  APPROVAL_PREFIX,
  approvalInstance,
  ARTIFACT_PREFIX,
  artifactInstance,
  EVIDENCE_PREFIX,
  evidenceInstance,
  JOURNAL_PREFIX,
  journalInstance,
  STATE_PREFIX,
  stateInstance,
  workItemSlug,
} from "./run_names.ts";

import {
  APPROVAL_PREFIX,
  ARTIFACT_PREFIX,
  EVIDENCE_PREFIX,
  STATE_PREFIX,
  stateInstance,
} from "./run_names.ts";

// ---------------------------------------------------------------------------
// RunView: a materialized snapshot of everything ONE work item's run has
// recorded on this instance. Gate evaluation, CEL contexts, and status
// rendering all read from this. Maps are keyed by logical names ("plan"),
// never physical instance names.
// ---------------------------------------------------------------------------

/** The slice of swamp's data repository the engine needs. */
export interface DataRepositoryLike {
  findAllForModel(
    type: unknown,
    modelId: string,
  ): Promise<{ name: string; version: number }[]>;
  getContent(
    type: unknown,
    modelId: string,
    dataName: string,
    version?: number,
  ): Promise<Uint8Array | null>;
  /**
   * Every stored version of a data name, ascending. Present on swamp's
   * UnifiedDataRepository; the summary's repository-backed reader needs it
   * because `findAllForModel` only surfaces the latest version per name.
   */
  listVersions?(
    type: unknown,
    modelId: string,
    dataName: string,
  ): Promise<number[]>;
}

export interface ArtifactView {
  latest: ArtifactEnvelope;
  /** Version number of the latest record. */
  version: number;
}

export interface EvidenceView {
  latest: EvidenceEnvelope;
  version: number;
}

export interface RunView {
  state: RunState | null;
  artifacts: Map<string, ArtifactView>;
  evidence: Map<string, EvidenceView>;
  /** gateId → every approval record, oldest first. */
  approvals: Map<string, ApprovalRecord[]>;
}

function decode(content: Uint8Array): Record<string, unknown> {
  return JSON.parse(new TextDecoder().decode(content)) as Record<
    string,
    unknown
  >;
}

export async function loadRunView(
  repo: DataRepositoryLike,
  modelType: unknown,
  modelId: string,
  slug: string,
): Promise<RunView> {
  const view: RunView = {
    state: null,
    artifacts: new Map(),
    evidence: new Map(),
    approvals: new Map(),
  };

  const stateName = stateInstance(slug);
  const artifactPrefix = `${ARTIFACT_PREFIX}${slug}-`;
  const evidencePrefix = `${EVIDENCE_PREFIX}${slug}-`;
  const approvalPrefix = `${APPROVAL_PREFIX}${slug}-`;

  const entries = await repo.findAllForModel(modelType, modelId);

  // Group versions by instance name.
  const byName = new Map<string, number[]>();
  for (const entry of entries) {
    const versions = byName.get(entry.name) ?? [];
    versions.push(entry.version);
    byName.set(entry.name, versions);
  }

  for (const [name, versions] of byName) {
    versions.sort((a, b) => a - b);
    const latestVersion = versions[versions.length - 1];

    if (name === stateName) {
      const content = await repo.getContent(
        modelType,
        modelId,
        name,
        latestVersion,
      );
      if (content !== null) {
        view.state = RunStateSchema.parse(decode(content));
      }
      continue;
    }

    if (name.startsWith(artifactPrefix)) {
      const content = await repo.getContent(
        modelType,
        modelId,
        name,
        latestVersion,
      );
      if (content !== null) {
        const envelope = ArtifactEnvelopeSchema.parse(decode(content));
        view.artifacts.set(envelope.name, {
          latest: envelope,
          version: latestVersion,
        });
      }
      continue;
    }

    if (name.startsWith(evidencePrefix)) {
      const content = await repo.getContent(
        modelType,
        modelId,
        name,
        latestVersion,
      );
      if (content !== null) {
        const envelope = EvidenceEnvelopeSchema.parse(decode(content));
        view.evidence.set(envelope.name, {
          latest: envelope,
          version: latestVersion,
        });
      }
      continue;
    }

    if (name.startsWith(approvalPrefix)) {
      const records: ApprovalRecord[] = [];
      for (const version of versions) {
        const content = await repo.getContent(
          modelType,
          modelId,
          name,
          version,
        );
        if (content !== null) {
          records.push(ApprovalRecordSchema.parse(decode(content)));
        }
      }
      if (records.length > 0) {
        view.approvals.set(records[0].gateId, records);
      }
    }
  }

  // Era filtering: a `reset` re-stamps state.startedAt, and records written
  // before it belong to a previous era of this work item's run. They stay in
  // history for audit but are invisible to gates, bindings, and status — a
  // reset run really does start fresh.
  if (view.state !== null) {
    const since = view.state.startedAt;
    for (const [name, artifact] of [...view.artifacts]) {
      if (artifact.latest.recordedAt < since) view.artifacts.delete(name);
    }
    for (const [name, evidence] of [...view.evidence]) {
      if (evidence.latest.recordedAt < since) view.evidence.delete(name);
    }
    for (const [gateId, records] of [...view.approvals]) {
      const kept = records.filter((r) => r.decidedAt >= since);
      if (kept.length > 0) {
        view.approvals.set(gateId, kept);
      } else {
        view.approvals.delete(gateId);
      }
    }
  }

  return view;
}

/**
 * Overview of every work item this instance has run: latest state per
 * state-<slug> instance.
 */
export async function loadAllRunStates(
  repo: DataRepositoryLike,
  modelType: unknown,
  modelId: string,
): Promise<RunState[]> {
  const entries = await repo.findAllForModel(modelType, modelId);
  const latestByName = new Map<string, number>();
  for (const entry of entries) {
    if (!entry.name.startsWith(STATE_PREFIX)) continue;
    const current = latestByName.get(entry.name) ?? 0;
    if (entry.version > current) latestByName.set(entry.name, entry.version);
  }
  const states: RunState[] = [];
  for (const [name, version] of latestByName) {
    const content = await repo.getContent(modelType, modelId, name, version);
    if (content !== null) {
      states.push(RunStateSchema.parse(decode(content)));
    }
  }
  states.sort((a, b) => a.workItem.localeCompare(b.workItem));
  return states;
}

/** Current cycle (entry count) of the run's current stage. */
export function currentCycle(state: RunState): number {
  return state.cycles[state.stageId] ?? 1;
}

/** Entry count for an arbitrary stage (0 when never entered). */
export function entriesInto(state: RunState, stageId: string): number {
  return state.cycles[stageId] ?? 0;
}
