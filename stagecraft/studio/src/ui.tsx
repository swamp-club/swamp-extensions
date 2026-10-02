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
// Small pieces the views share: how a work mode is shown (by colour, and
// always with a glyph and a label, never colour alone), tab lists, Copy
// reference buttons, and the 'c' shortcut.

import type { JSX } from "preact";
import { copyReference } from "./state.ts";
import type { Target } from "./selection.ts";

export const MODES: Record<
  string,
  { label: string; glyph: string; cls: string; blurb: string }
> = {
  interactive: {
    label: "Interactive",
    glyph: "◈",
    cls: "m-int",
    blurb: "an agent works with a person in the session",
  },
  dispatch: {
    label: "Dispatch",
    glyph: "⇉",
    cls: "m-dis",
    blurb: "a fresh agent gets a packet and works alone",
  },
  workflow: {
    label: "Workflow",
    glyph: "⚙",
    cls: "m-wf",
    blurb: "a swamp workflow runs; no agent judgement",
  },
  method: {
    label: "Method",
    glyph: "ƒ",
    cls: "m-me",
    blurb: "a model method runs; no agent judgement",
  },
  none: {
    label: "No work",
    glyph: "○",
    cls: "m-none",
    blurb: "nothing is done here",
  },
};

export const modeMeta = (mode: string | undefined) =>
  MODES[mode ?? "none"] ?? MODES.none;

/** The target an element carries for the 'c' shortcut. */
export const TARGET_ATTR = "data-target";

/** Tabs: Left and Right move between them (the ARIA tabs pattern). */
export function Tabs<T extends string>(props: {
  label: string;
  tabs: [T, string][];
  value: T;
  onChange: (tab: T) => void;
  controls: string;
  class?: string;
}) {
  const onKey = (e: JSX.TargetedKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const i = props.tabs.findIndex(([k]) => k === props.value);
    const n = props.tabs.length;
    const next = props.tabs[(i + (e.key === "ArrowRight" ? 1 : n - 1)) % n][0];
    e.preventDefault();
    props.onChange(next);
    // currentTarget is null once the event is done; keep the list now.
    const list = e.currentTarget;
    requestAnimationFrame(() =>
      list.querySelector<HTMLButtonElement>(`[data-tab="${next}"]`)?.focus()
    );
  };
  return (
    <div
      class={props.class ?? "tabs"}
      role="tablist"
      aria-label={props.label}
      onKeyDown={onKey}
    >
      {props.tabs.map(([k, text]) => (
        <button
          type="button"
          role="tab"
          key={k}
          data-tab={k}
          id={`tab-${k}`}
          aria-selected={props.value === k}
          aria-controls={props.controls}
          tabIndex={props.value === k ? 0 : -1}
          onClick={() => props.onChange(k)}
        >
          {text}
        </button>
      ))}
    </div>
  );
}

export function CopyButton(
  { target, label }: { target: Target; label: string },
) {
  return (
    <button
      type="button"
      class="copy"
      title="Copy a reference to paste to the agent (c)"
      aria-label={`Copy reference to ${label}`}
      onClick={(e) => {
        e.stopPropagation();
        void copyReference(target);
      }}
    >
      ⧉ Copy reference
    </button>
  );
}

/**
 * The 'c' shortcut, for a region that has focus: it copies the reference of
 * the focused element's target. It never listens on the whole document
 * (WCAG 2.2 SC 2.1.4: a one-key shortcut acts only where focus is).
 */
export function onCopyKey(
  e: JSX.TargetedKeyboardEvent<HTMLElement>,
  fallback?: Target | null,
) {
  if (e.key !== "c" || e.ctrlKey || e.metaKey || e.altKey) return false;
  const el = (e.target as Element).closest(`[${TARGET_ATTR}]`);
  const raw = el?.getAttribute(TARGET_ATTR);
  const target = raw ? JSON.parse(raw) as Target : fallback ?? null;
  if (target === null) return false;
  e.preventDefault();
  void copyReference(target);
  return true;
}

/**
 * Scroll `pane` so `el` is in view, and nothing else. scrollIntoView also
 * scrolls every ancestor, the page included, and the page has no scrollbar
 * at desktop width, so a scroll there could not be undone.
 */
export function reveal(
  pane: Element | null,
  el: Element | null | undefined,
  center = false,
) {
  if (pane === null || el === null || el === undefined) return;
  const p = pane.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  const axis = (
    start: number,
    size: number,
    viewStart: number,
    viewSize: number,
  ) => {
    if (center) return start - viewStart - (viewSize - size) / 2;
    if (start < viewStart) return start - viewStart;
    if (start + size > viewStart + viewSize) {
      // Too big to fit: show its start.
      return size > viewSize
        ? start - viewStart
        : start + size - (viewStart + viewSize);
    }
    return 0;
  };
  pane.scrollTop += axis(r.top, r.height, p.top, pane.clientHeight);
  pane.scrollLeft += axis(r.left, r.width, p.left, pane.clientWidth);
}
