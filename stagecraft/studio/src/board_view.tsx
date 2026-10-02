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

// The Board view: a column per stage, a card per work item, filters above.
// Keyboard: each column is one tab stop. Up and Down move between its
// cards, Left and Right to the neighbouring column's, Home and End to the
// column's first and last; Enter opens the work item. A card is a link, so
// it also opens in a new tab the usual way. Every status a card shows is
// written as text, never colour alone.

import type { JSX } from "preact";
import { useRef } from "preact/hooks";
import type {
  BoardCard,
  Park,
} from "../../extensions/models/_lib/engine/studio_cards.ts";
import {
  boardColumns,
  cardHead,
  COLUMN_PAGE,
  durationText,
  isStale,
  since,
  stageOrder,
} from "./board.ts";
import { routeHref } from "./route.ts";
import {
  board,
  boardError,
  boardFilter,
  clock,
  factory,
  go,
  good,
  graph,
  showFinished,
  shown,
  sourceError,
} from "./state.ts";

/** Which card of each column holds the column's tab stop. */
const active = new Map<string, number>();

function parkText(p: Park): string {
  const over = `${p.count} of ${p.limit}` +
    (p.granted > 0 ? ` + ${p.granted} granted` : "");
  return p.kind === "dispatch-cap"
    ? `PARKED: dispatch cap, ${over}`
    : `PARKED: cycle limit on ${p.to} (${over}), exit ${p.transition}`;
}

function Card(props: {
  card: BoardCard;
  stage: string;
  row: number;
  /** Whether this card holds its column's tab stop. */
  tabStop: boolean;
  stale: boolean;
}) {
  const { card, stage, row, stale, tabStop } = props;
  const now = clock.value;
  const inStage = since(card.enteredAt, now);
  const waited = card.waiting === null ? null : since(card.waiting.since, now);
  const head = cardHead(card);
  const href = routeHref({ view: "work-item", key: card.key });
  const open = (e: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
    // A new tab or window opens the usual way.
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    e.preventDefault();
    void go({ view: "work-item", key: card.key });
  };
  const classes = [
    "card",
    card.waiting !== null ? "waiting" : "",
    card.parked.length > 0 ? "parked" : "",
    stale ? "stale" : "",
  ].filter((c) => c !== "").join(" ");
  return (
    <li>
      <a
        class={classes}
        href={href}
        data-stage={stage}
        data-row={row}
        tabIndex={tabStop ? 0 : -1}
        onClick={open}
        onFocus={() => active.set(stage, row)}
      >
        <span class={`card-title${card.title === null ? " untitled" : ""}`}>
          {card.title ?? card.key}
        </span>
        {
          /* The key is one line, cut off; its full text stays in the card,
            so it is read out, and shows on hover and focus. */
        }
        {(head.key !== "" || head.ref !== null) && (
          <span class="card-head">
            <span class="card-key" title={head.key || undefined}>
              {head.key}
            </span>
            {head.ref !== null && (
              <span class="card-ref" title={head.ref}>{head.ref}</span>
            )}
          </span>
        )}
        <span class="card-meta">
          {inStage === null
            ? "in stage: time unknown"
            : `in stage ${durationText(inStage)}`}
          {card.cycle > 1 && ` · cycle ${card.cycle}`}
        </span>
        {card.waiting !== null && (
          <span class="badge b-wait">
            WAITING ON A PERSON{waited !== null && ` ${durationText(waited)}`}
            {card.waiting.exits.length > 0 &&
              `: ${
                card.waiting.exits.map((x) =>
                  x.gateIds.length > 0
                    ? `${x.transition} (${x.gateIds.join(", ")})`
                    : x.transition
                ).join("; ")
              }`}
          </span>
        )}
        {card.parked.map((p, i) => (
          <span class="badge b-park" key={i}>{parkText(p)}</span>
        ))}
        {stale && (
          <span class="badge b-stale">
            STALE PIN: an older definition than the factory's
          </span>
        )}
        {card.problem !== undefined && (
          <span class="card-problem">{card.problem}</span>
        )}
      </a>
    </li>
  );
}

/** Arrow keys over the cards: within a column, and across columns. */
function onBoardKey(e: JSX.TargetedKeyboardEvent<HTMLDivElement>) {
  const from = (e.target as HTMLElement).closest<HTMLAnchorElement>(
    "a.card",
  );
  if (from === null) return;
  const lists = [...e.currentTarget.querySelectorAll<HTMLElement>(
    ".col-cards",
  )].filter((l) => l.querySelector("a.card") !== null);
  const list = from.closest<HTMLElement>(".col-cards");
  const col = list === null ? -1 : lists.indexOf(list);
  if (col < 0) return;
  const cards = (l: HTMLElement) => [
    ...l.querySelectorAll<HTMLAnchorElement>("a.card"),
  ];
  const here = cards(lists[col]);
  const row = here.indexOf(from);
  let to: HTMLAnchorElement | undefined;
  switch (e.key) {
    case "ArrowDown":
      to = here[Math.min(row + 1, here.length - 1)];
      break;
    case "ArrowUp":
      to = here[Math.max(row - 1, 0)];
      break;
    case "Home":
      to = here[0];
      break;
    case "End":
      to = here.at(-1);
      break;
    case "ArrowRight":
    case "ArrowLeft": {
      const next = lists[col + (e.key === "ArrowRight" ? 1 : -1)];
      if (next === undefined) break;
      const there = cards(next);
      to = there[Math.min(row, there.length - 1)];
      break;
    }
    default:
      return;
  }
  e.preventDefault();
  if (to === undefined || to === from) return;
  from.tabIndex = -1;
  to.tabIndex = 0;
  to.focus();
}

function Filters() {
  const f = boardFilter.value;
  const set = (patch: Partial<typeof f>) => {
    boardFilter.value = { ...f, ...patch };
    shown.value = {};
  };
  const check = (
    key: "waiting" | "parked" | "stalePin",
    label: string,
  ) => (
    <label class="filter">
      <input
        type="checkbox"
        checked={f[key]}
        onChange={(e) => set({ [key]: e.currentTarget.checked })}
      />
      {label}
    </label>
  );
  return (
    <div class="board-tools" role="group" aria-label="Filter work items">
      {check("waiting", "Waiting on a person")}
      {check("parked", "Parked")}
      {check("stalePin", "Stale pin")}
      <label class="filter search">
        <span>Search</span>
        <input
          type="search"
          value={f.text}
          placeholder="key or title"
          onInput={(e) => set({ text: e.currentTarget.value })}
        />
      </label>
      <span class="sep" />
      <label class="filter">
        <input
          type="checkbox"
          checked={showFinished.value}
          onChange={(e) => (showFinished.value = e.currentTarget.checked)}
        />
        Show finished
      </label>
    </div>
  );
}

export function BoardMode() {
  const box = useRef<HTMLDivElement>(null);
  const read = board.value;
  const g = good.value;
  const layout = graph.value;
  const currentDigest = g?.view.digest ?? null;
  const stages = layout === null || g === null ? [] : stageOrder(
    layout,
    (id) => g.definition.stages.find((s) => s.id === id)?.terminal === true,
  );
  const columns = read === null ? [] : boardColumns(stages, read.items, {
    filter: boardFilter.value,
    currentDigest,
    showFinished: showFinished.value,
    shown: shown.value,
  });
  const total = read?.items.length ?? 0;
  const matching = columns.reduce((n, c) => n + c.total, 0);
  return (
    <section class="board-mode" id="mode-panel" aria-label="Board">
      <Filters />
      {sourceError.value !== null && (
        <div class="problem">{sourceError.value}</div>
      )}
      {boardError.value !== null && (
        <div class="problem">
          The work items could not be read: {boardError.value}
        </div>
      )}
      {read !== null && read.problems.length > 0 && (
        <div class="problem">
          {read.problems.length} work item(s) could not be read in full:
          <ul>
            {read.problems.map((p) => (
              <li key={p.key}>
                <code>{p.key}</code>: {p.error}
              </li>
            ))}
          </ul>
        </div>
      )}
      <p class="board-count" role="status" aria-live="polite">
        {read === null
          ? factory.value === null ? "" : "Reading work items…"
          : total === 0
          ? `No work items in ${read.factory} yet.`
          : matching === total
          ? `${total} work item(s)`
          : `${matching} of ${total} work item(s) match`}
      </p>
      <div class="board" ref={box} onKeyDown={onBoardKey}>
        {columns.map((col) => {
          const id = `col-${col.stage}`;
          const finished = col.terminal && !showFinished.value;
          return (
            <section
              class={`col${col.terminal ? " terminal" : ""}${
                col.known ? "" : " unknown"
              }`}
              key={col.stage}
              aria-labelledby={id}
            >
              <h2 id={id} class="col-head">
                <span class="col-name">{col.stage}</span>
                <span class="col-count">
                  {col.total}
                  <span class="sr-only">&nbsp;work item(s)</span>
                </span>
              </h2>
              {!col.known && (
                <p class="col-note">not in the factory's current definition</p>
              )}
              {finished && col.total > 0 && (
                <p class="col-note">finished: Show finished lists them</p>
              )}
              <ul class="col-cards">
                {col.cards.map((card, row, all) => (
                  <Card
                    key={card.key}
                    card={card}
                    stage={col.stage}
                    row={row}
                    tabStop={row ===
                      Math.min(active.get(col.stage) ?? 0, all.length - 1)}
                    stale={isStale(card, currentDigest)}
                  />
                ))}
              </ul>
              {col.cards.length < col.total && !finished && (
                <button
                  type="button"
                  class="more"
                  onClick={() =>
                    shown.value = {
                      ...shown.value,
                      [col.stage]: col.cards.length + COLUMN_PAGE,
                    }}
                >
                  Show more ({col.total - col.cards.length} more)
                </button>
              )}
            </section>
          );
        })}
      </div>
    </section>
  );
}
