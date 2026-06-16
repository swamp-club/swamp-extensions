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
// Work-item slugs and instance naming.
//
// Deliberately dependency-free (no zod): report extensions bundle without
// the extension's deno.json import map, so anything a report imports must
// avoid bare npm specifiers — and the slug algorithm must live in exactly
// one place.
// ---------------------------------------------------------------------------

/**
 * Turn an arbitrary workItem ref (issue id, ticket URL, anything) into a
 * deterministic, data-instance-safe slug. Name-safe refs pass through
 * unchanged ("ISSUE-42" → "ISSUE-42"); anything lossy gets a stable FNV-1a
 * suffix so distinct work items can never collide after sanitization.
 */
export function workItemSlug(workItem: string): string {
  const sanitized = workItem
    .replaceAll(/[^A-Za-z0-9._-]+/g, "-")
    .replaceAll(/^[-.]+|[-.]+$/g, "")
    .slice(0, 48);
  if (sanitized === workItem) return workItem;
  let hash = 0x811c9dc5;
  for (let i = 0; i < workItem.length; i++) {
    hash ^= workItem.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  const suffix = hash.toString(16).padStart(8, "0");
  return sanitized.length > 0 ? `${sanitized}-${suffix}` : suffix;
}

export const STATE_PREFIX = "state-";
export const JOURNAL_PREFIX = "journal-";
export const ARTIFACT_PREFIX = "artifact-";
export const EVIDENCE_PREFIX = "evidence-";
export const APPROVAL_PREFIX = "approval-";

export function stateInstance(slug: string): string {
  return `${STATE_PREFIX}${slug}`;
}

export function journalInstance(slug: string): string {
  return `${JOURNAL_PREFIX}${slug}`;
}

export function artifactInstance(slug: string, name: string): string {
  return `${ARTIFACT_PREFIX}${slug}-${name}`;
}

export function evidenceInstance(slug: string, name: string): string {
  return `${EVIDENCE_PREFIX}${slug}-${name}`;
}

export function approvalInstance(slug: string, gateId: string): string {
  return `${APPROVAL_PREFIX}${slug}-${gateId}`;
}
