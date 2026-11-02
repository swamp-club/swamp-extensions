// Copyright (C) 2026 System Initiative, Inc.
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

// Edge cues (swamp-club #3380): a pane that scrolls says what is out of view
// at each edge, so no stage is off screen without a cue, even where the
// platform hides scrollbars. A cue is a button naming how many stages are
// past that edge; it scrolls the pane, never the page, to the nearest one.
// The Board uses them across; the graph across and down.

import type { RefObject } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { offscreen } from "./board.ts";

export type Axis = "x" | "y";
export type Side = "before" | "after";

/** An item a cue can name: its element's `data-cue`, unique in the pane,
 * and the name read out, its `data-cue-name` (else the id). */
export interface Cued {
  id: string;
  name: string;
}

/** What is past each edge of a pane. */
export type Hidden = Record<Side, Cued[]>;

const NONE: Hidden = { before: [], after: [] };
/** Room left between a revealed item and the pane's edge. */
const PAD = 12;

const reducedMotion = () =>
  globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

/** The pane's visible span on an axis, in viewport coordinates. */
function view(box: HTMLElement, axis: Axis): [number, number] {
  const r = box.getBoundingClientRect();
  return axis === "x"
    ? [r.left + box.clientLeft, r.left + box.clientLeft + box.clientWidth]
    : [r.top + box.clientTop, r.top + box.clientTop + box.clientHeight];
}

function items(box: HTMLElement, axis: Axis) {
  return [...box.querySelectorAll<Element>("[data-cue]")].map((el) => {
    const r = el.getBoundingClientRect();
    const id = el.getAttribute("data-cue")!;
    return {
      id,
      name: el.getAttribute("data-cue-name") ?? id,
      start: axis === "x" ? r.left : r.top,
      end: axis === "x" ? r.right : r.bottom,
    };
  });
}

/**
 * Run `attach` on the ref's element whenever it is a different element than
 * last time (first mount, or a pane that replaced its element), undoing the
 * last attach first, and on unmount. A dependency list cannot do this: it is
 * read during render, before the ref is set.
 */
export function useAttach(
  box: RefObject<HTMLElement>,
  attach: (el: HTMLElement) => () => void,
) {
  const bound = useRef<{ el: HTMLElement; undo: () => void } | null>(null);
  useEffect(() => {
    const el = box.current;
    if (bound.current?.el === el) return;
    bound.current?.undo();
    bound.current = el === null ? null : { el, undo: attach(el) };
  });
  useEffect(() => () => bound.current?.undo(), []);
}

/**
 * What lies past each edge of the pane on each axis asked for: the
 * elements marked `data-cue`. Measured after every render, on scroll and on
 * resize, once per frame.
 */
export function useHidden(
  box: RefObject<HTMLElement>,
  axes: readonly Axis[],
): Partial<Record<Axis, Hidden>> {
  const [hidden, setHidden] = useState<Partial<Record<Axis, Hidden>>>({});
  const last = useRef("");
  const frame = useRef(0);
  const measure = () => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const el = box.current;
      if (el === null) return;
      const next: Partial<Record<Axis, Hidden>> = {};
      for (const axis of axes) {
        const [start, end] = view(el, axis);
        const all = items(el, axis);
        const name = new Map(all.map((it) => [it.id, it.name]));
        const { before, after } = offscreen(all, start, end);
        const cued = (ids: string[]) =>
          ids.map((id) => ({ id, name: name.get(id)! }));
        next[axis] = { before: cued(before), after: cued(after) };
      }
      const key = JSON.stringify(next);
      if (key === last.current) return;
      last.current = key;
      setHidden(next);
    });
  };
  // After every render: cards, rails and zoom all move things.
  useEffect(measure);
  useAttach(box, (el) => {
    el.addEventListener("scroll", measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", measure);
      ro.disconnect();
      cancelAnimationFrame(frame.current);
    };
  });
  return hidden;
}

/** Scroll the pane, only it, so the item is just inside `side`. */
export function reveal(
  box: HTMLElement,
  id: string,
  axis: Axis,
  side: Side,
) {
  const el = box.querySelector(`[data-cue="${CSS.escape(id)}"]`);
  if (el === null) return;
  const r = el.getBoundingClientRect();
  const [start, end] = view(box, axis);
  const [lo, hi] = axis === "x" ? [r.left, r.right] : [r.top, r.bottom];
  const delta = side === "before" ? lo - start - PAD : hi - end + PAD;
  box.scrollBy({
    [axis === "x" ? "left" : "top"]: delta,
    behavior: reducedMotion() ? "instant" : "smooth",
  });
}

const ARROW: Record<Axis, Record<Side, string>> = {
  x: { before: "◀", after: "▶" },
  y: { before: "▲", after: "▼" },
};
const WHERE: Record<Axis, Record<Side, string>> = {
  x: { before: "to the left", after: "to the right" },
  y: { before: "above", after: "below" },
};

/**
 * The cue at one edge: nothing when nothing is past it. Pressing it brings
 * the nearest hidden stage into view.
 */
export function EdgeCue(props: {
  box: RefObject<HTMLElement>;
  hidden: Hidden | undefined;
  axis: Axis;
  side: Side;
  /** What an item is: "stage", "column". */
  noun: string;
}) {
  const { box, hidden, axis, side, noun } = props;
  const past = hidden?.[side] ?? NONE[side];
  if (past.length === 0) return null;
  const nearest = side === "before" ? past[past.length - 1] : past[0];
  const count = `${past.length} ${noun}${past.length === 1 ? "" : "s"}`;
  const label = `${count} ${WHERE[axis][side]}: ${
    past.map((p) => p.name).join(", ")
  }. Show ${nearest.name}`;
  const arrow = ARROW[axis][side];
  return (
    <button
      type="button"
      class={`edge-cue cue-${axis} cue-${side}`}
      aria-label={label}
      title={label}
      onClick={() => box.current && reveal(box.current, nearest.id, axis, side)}
    >
      {side === "before" && <span aria-hidden="true">{arrow}</span>}
      <span aria-hidden="true">{count}</span>
      {side === "after" && <span aria-hidden="true">{arrow}</span>}
    </button>
  );
}
