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

/**
 * Python's difflib.SequenceMatcher(None, a, b, autojunk=False).get_opcodes(),
 * ported exactly: edit.txt import aligns the edited tokens against the
 * originals the way demo-polish does, so which tokens count as a spelling fix
 * and which as a cut must not drift.
 *
 * @module
 */

export type OpTag = "equal" | "replace" | "delete" | "insert";
export type Opcode = [OpTag, number, number, number, number];

type Block = [number, number, number];

function longestMatch(
  a: string[],
  b2j: Map<string, number[]>,
  alo: number,
  ahi: number,
  blo: number,
  bhi: number,
): Block {
  let besti = alo, bestj = blo, bestsize = 0;
  let j2len = new Map<number, number>();
  for (let i = alo; i < ahi; i++) {
    const next = new Map<number, number>();
    for (const j of b2j.get(a[i]) ?? []) {
      if (j < blo) continue;
      if (j >= bhi) break;
      const k = (j2len.get(j - 1) ?? 0) + 1;
      next.set(j, k);
      if (k > bestsize) {
        besti = i - k + 1;
        bestj = j - k + 1;
        bestsize = k;
      }
    }
    j2len = next;
  }
  // No junk, so difflib's junk-extension loops are no-ops except the
  // popular-element ones, which autojunk=false also disables.
  return [besti, bestj, bestsize];
}

function matchingBlocks(a: string[], b: string[]): Block[] {
  const b2j = new Map<string, number[]>();
  b.forEach((x, j) => {
    const list = b2j.get(x);
    if (list) list.push(j);
    else b2j.set(x, [j]);
  });
  const queue: [number, number, number, number][] = [[
    0,
    a.length,
    0,
    b.length,
  ]];
  const blocks: Block[] = [];
  while (queue.length) {
    const [alo, ahi, blo, bhi] = queue.pop()!;
    const [i, j, k] = longestMatch(a, b2j, alo, ahi, blo, bhi);
    if (k) {
      blocks.push([i, j, k]);
      if (alo < i && blo < j) queue.push([alo, i, blo, j]);
      if (i + k < ahi && j + k < bhi) queue.push([i + k, ahi, j + k, bhi]);
    }
  }
  blocks.sort((x, y) => x[0] - y[0] || x[1] - y[1] || x[2] - y[2]);
  // Collapse adjacent blocks, as difflib does.
  const out: Block[] = [];
  let [i1, j1, k1] = [0, 0, 0];
  for (const [i2, j2, k2] of blocks) {
    if (i1 + k1 === i2 && j1 + k1 === j2) {
      k1 += k2;
    } else {
      if (k1) out.push([i1, j1, k1]);
      [i1, j1, k1] = [i2, j2, k2];
    }
  }
  if (k1) out.push([i1, j1, k1]);
  out.push([a.length, b.length, 0]);
  return out;
}

export function opcodes(a: string[], b: string[]): Opcode[] {
  let i = 0, j = 0;
  const out: Opcode[] = [];
  for (const [ai, bj, size] of matchingBlocks(a, b)) {
    let tag: OpTag | "" = "";
    if (i < ai && j < bj) tag = "replace";
    else if (i < ai) tag = "delete";
    else if (j < bj) tag = "insert";
    if (tag) out.push([tag, i, ai, j, bj]);
    i = ai + size;
    j = bj + size;
    if (size) out.push(["equal", ai, i, bj, j]);
  }
  return out;
}
