/// <reference lib="dom" />
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
// The work-item page (/w/<key>): one work item on the graph of the
// definition it pinned, with where it is, what it waits on in status's
// words, its journal as a timeline, its ticket, and the run as a scenario to
// copy. Read-only, like the rest of the studio. Keyboard: the graph keeps
// its own keys; the timeline is one tab stop, Up and Down move through it,
// Home and End to its ends, Enter or Space picks an entry and selects its
// stage on the graph. Every state is written as text, never colour alone.

import type { JSX } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { durationText } from "./board.ts";
import { EXIT_LABELS, exitState } from "./simulate.ts";
import { MetricsTab } from "./simulate_view.tsx";
import {
  clock,
  copyItemReference,
  copyItemScenario,
  factory,
  go,
  itemCopy,
  itemEntry,
  type ItemTab,
  itemTab,
  itemTicket,
  itemTicketError,
  loadTicket,
  pickEntry,
  pinnedIsOlder,
  prepareItemCopy,
  workItem,
  workItemError,
  workItemKey,
} from "./state.ts";
import { Markdown } from "./markdown.tsx";
import { routeHref } from "./route.ts";
import { Tabs } from "./ui.tsx";
import {
  activityLabel,
  copyIsCurrent,
  followActive,
  ticketRefs,
  type TicketView,
  timelineOf,
  titleOf,
  waiting,
  webLink,
} from "./work_item.ts";

const when = (at: string) => new Date(at).toLocaleString();

/** Where the page is: under its factory's Board. Board waits for the
 * factory to be known. */
function Crumbs({ board, itemKey }: { board: string | null; itemKey: string }) {
  return (
    <nav class="crumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          {board === null ? "Board" : (
            <a
              href={routeHref({ view: "board", factory: board })}
              onClick={(e) => {
                if (
                  e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey ||
                  e.altKey
                ) return;
                e.preventDefault();
                void go({ view: "board", factory: board });
              }}
            >
              Board
            </a>
          )}
        </li>
        <li aria-current="page">{itemKey}</li>
      </ol>
    </nav>
  );
}

/** The page's head: the work item, where it is, and a notice when it is
 * drawn on an older definition than the factory's file. */
export function ItemHead() {
  const item = workItem.value;
  const error = workItemError.value;
  if (item === null) {
    return (
      <div class="item-head">
        <Crumbs board={factory.value} itemKey={workItemKey.value ?? ""} />
        <h1>
          Work item <span class="key">{workItemKey.value ?? ""}</span>
        </h1>
        {error !== null
          ? <div class="problem" role="alert">{error}</div>
          : <p class="empty" role="status">Reading the work item…</p>}
      </div>
    );
  }
  const run = item.data.run;
  const title = titleOf(run);
  const w = waiting(item);
  return (
    <>
      <div class="item-head">
        <Crumbs board={run.factory} itemKey={run.key} />
        <h1>{title}</h1>
        {title !== run.key && <span class="key">{run.key}</span>}
        <div class="chips">
          <a
            class="lchip"
            href={`/f/${encodeURIComponent(run.factory)}/board`}
            onClick={(e) => {
              e.preventDefault();
              void go({ view: "board", factory: run.factory });
            }}
          >
            factory {run.factory}
          </a>
          <span class="lchip">stage {run.stage}</span>
          <span class="lchip">cycle {w.cycle}</span>
          <span class={`lchip${w.terminal ? " good" : ""}`}>{run.status}</span>
          {w.person.length > 0 && (
            <span class="lchip gold">waiting on a person</span>
          )}
          {w.parkedAtDispatchCap && (
            <span class="lchip pink">parked at the dispatch cap</span>
          )}
        </div>
        <button
          type="button"
          class="copy"
          title="Copy a reference to paste to the agent"
          onClick={() => void copyItemReference()}
        >
          ⧉ Copy reference
        </button>
      </div>
      {error !== null && (
        <p class="problem" role="alert">
          Could not read it again: {error}. Showing it as last read.
        </p>
      )}
      {pinnedIsOlder.value && (
        <p class="item-notice" role="note">
          Drawn on the definition this work item pinned ({item.data.pinned
            .digest.slice(0, 19)}…), which is older than factory{" "}
          {factory.value}'s file now. It runs on the pinned one until a reset
          adopts the new one.
        </p>
      )}
    </>
  );
}

function NowTab() {
  const item = workItem.value!;
  const w = waiting(item);
  const waited = durationText(clock.value - Date.parse(w.since));
  return (
    <div class="insp">
      <p class="eyebrow">from status · read {when(item.data.at)}</p>
      <h2 class="insp-title">{w.stage}</h2>
      <ul class="waits">
        {w.terminal && <li class="w-done">finished at stage {w.stage}</li>}
        {w.person.map((p) => (
          <li class="w-person" key={p.exit}>
            waiting on a person: exit {p.exit} → {p.to}
            {p.gates.length > 0
              ? `, deciding ${p.gates.join(", ")}`
              : p.manual
              ? ", a person's go for a manual exit"
              : ""}
          </li>
        ))}
        {w.parkedAtDispatchCap && (
          <li class="w-parked">
            parked at the dispatch cap: waiting on a person to grant a dispatch
            override
          </li>
        )}
        {w.personRecords.length > 0 && (
          <li class="w-person">
            a person records: {w.personRecords.join(", ")}
          </li>
        )}
        {w.dispatch !== null && (
          <li class="w-dispatch">
            work: {w.dispatch.mode}
            {w.dispatch.ready
              ? ", ready to dispatch"
              : `; dispatch not ready: ${w.dispatch.problems.join("; ")}`}
          </li>
        )}
        {!w.terminal && (
          <li>
            in this stage entry since {when(w.since)} ({waited})
          </li>
        )}
      </ul>
      {item.data.readiness.length > 0 && (
        <>
          <h3>Exits</h3>
          <ul class="readiness">
            {item.data.readiness.map((r) => {
              const state = exitState(r);
              return (
                <li class={`rd r-${state}`} key={r.name}>
                  <span class="rs">{EXIT_LABELS[state]}</span>
                  <b>{r.manual ? `✋ ${r.name}` : r.name}</b>
                  <span class="to">→ {r.to}</span>
                  {r.failures.length > 0 && (
                    <ul>
                      {r.failures.map((m, i) => <li key={i}>{m}</li>)}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

function TimelineTab() {
  const item = workItem.value!;
  const entries = timelineOf(item.data.run);
  const picked = itemEntry.value;
  const [active, setActive] = useState(entries.length - 1);
  // On the last entry, the active one follows new entries as they arrive.
  const seen = useRef(entries.length);
  useEffect(() => {
    setActive((a) => followActive(a, seen.current, entries.length));
    seen.current = entries.length;
  }, [entries.length]);
  const list = useRef<HTMLOListElement>(null);
  const at = Math.min(Math.max(active, 0), entries.length - 1);
  useEffect(() => {
    list.current?.querySelector(`#tl-${at}`)?.scrollIntoView({
      block: "nearest",
    });
  }, [at]);
  const onKey = (e: JSX.TargetedKeyboardEvent<HTMLOListElement>) => {
    const last = entries.length - 1;
    const next = e.key === "ArrowDown"
      ? Math.min(last, at + 1)
      : e.key === "ArrowUp"
      ? Math.max(0, at - 1)
      : e.key === "Home"
      ? 0
      : e.key === "End"
      ? last
      : null;
    if (next !== null) {
      e.preventDefault();
      setActive(next);
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      pickEntry(entries[at].index);
    }
  };
  if (entries.length === 0) return <p class="empty">No journal yet.</p>;
  return (
    <ol
      class="timeline"
      ref={list}
      role="listbox"
      tabIndex={0}
      aria-label="Journal, oldest first; Enter picks an entry and selects its stage"
      aria-activedescendant={`tl-${at}`}
      onKeyDown={onKey}
    >
      {entries.map((e, i) => (
        <li
          key={e.index}
          id={`tl-${i}`}
          role="option"
          aria-selected={picked === e.index}
          class={[
            e.earlier ? "earlier" : "",
            picked === e.index ? "picked" : "",
            i === at ? "active" : "",
          ].filter(Boolean).join(" ")}
          onClick={() => {
            setActive(i);
            pickEntry(e.index);
          }}
        >
          <time dateTime={e.at}>{when(e.at)}</time>
          <span class="tt">
            {e.type}
            {e.earlier ? " · an earlier era" : ""}
          </span>
          <span class="tx">
            {e.text} <small>@{e.stage}</small>
            {e.actor !== null && <small>{` · ${e.actor}`}</small>}
          </span>
        </li>
      ))}
    </ol>
  );
}

/** How a relation reads from this ticket: outgoing (this ticket is the
 * subject, X in X parent_of Y), then incoming. */
const RELATION_TEXT: Record<string, [string, string]> = {
  parent_of: ["parent of", "child of"],
  blocked_by: ["blocked by", "blocks"],
  duplicate_of: ["duplicate of", "duplicated by"],
  related_to: ["related to", "related to"],
};

/** What a person calls the tracker a ticket lives on, for its link out. */
function trackerName(kind: string): string {
  return kind === "linear"
    ? "Linear"
    : kind === "swamp-club"
    ? "the Lab"
    : kind;
}

function TicketTab() {
  const item = workItem.value!;
  const run = item.data.run;
  const held = itemTicket.value;
  const t = held?.key === run.key ? held.data : null;
  const error = itemTicketError.value;
  // Read when the tab opens for this work item; Refresh reads again.
  useEffect(() => {
    void loadTicket();
  }, [run.key]);
  const refs = ticketRefs(run);
  const refresh = (
    <button
      type="button"
      class="wide"
      onClick={() => void loadTicket()}
    >
      Refresh
    </button>
  );
  return (
    <div class="insp ticket">
      <p class="eyebrow">
        tracker {run.tracker.instance} ({run.tracker.kind})
      </p>
      {refs.length > 0 && (
        <dl class="stats">
          {refs.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      )}
      {error !== null && (
        <p class="problem" role="alert">
          Could not read the ticket: {error}
        </p>
      )}
      {t === null
        ? error === null &&
          <p class="empty" role="status">Reading the ticket…</p>
        : t.state === "none"
        ? <p class="empty">No ticket: this work item names none.</p>
        : t.state === "missing"
        ? (
          <p class="empty">
            Tracker {t.tracker} has no record of ticket {t.id}{" "}
            yet: run its fetch_issue or claim to record one.
          </p>
        )
        : <TicketBody ticket={t.ticket} />}
      {(t === null || t.state !== "none") && refresh}
    </div>
  );
}

function TicketBody({ ticket }: { ticket: TicketView }) {
  const external = ticket.origin === "snapshot" && webLink(ticket.url);
  return (
    <>
      <h3>
        <span class="key">{ticket.display}</span> {ticket.title}
      </h3>
      {external && (
        <p>
          <a href={ticket.url} target="_blank" rel="noopener noreferrer">
            Open {ticket.display} in {trackerName(ticket.kind)} ↗
          </a>
        </p>
      )}
      <p class="hint">
        {ticket.fetchedAt !== undefined
          ? `As ${ticket.tracker} last recorded it, ${
            when(ticket.fetchedAt)
          }. Run its fetch_issue to record a newer copy.`
          : "The built-in ticket itself."}
      </p>
      <dl class="stats">
        <div>
          <dt>status</dt>
          <dd>{ticket.status.name}</dd>
        </div>
        {ticket.labels.length > 0 && (
          <div>
            <dt>{ticket.origin === "builtin" ? "type" : "labels"}</dt>
            <dd>{ticket.labels.join(", ")}</dd>
          </div>
        )}
        <div>
          <dt>assigned</dt>
          <dd>
            {ticket.assignees.length > 0
              ? ticket.assignees.join(", ")
              : "no one"}
          </dd>
        </div>
        {ticket.createdAt !== undefined && (
          <div>
            <dt>created</dt>
            <dd>{when(ticket.createdAt)}</dd>
          </div>
        )}
        {ticket.updatedAt !== undefined && (
          <div>
            <dt>updated</dt>
            <dd>{when(ticket.updatedAt)}</dd>
          </div>
        )}
      </dl>
      <h4>Description</h4>
      {ticket.description === null
        ? (
          <p class="empty">
            This copy was recorded before the tracker read descriptions: run its
            fetch_issue to record a new one.
          </p>
        )
        : ticket.description.trim() === ""
        ? <p class="empty">No description.</p>
        : <Markdown text={ticket.description} />}
      {ticket.relations.length > 0 && (
        <>
          <h4>Relations</h4>
          <ul class="relations">
            {ticket.relations.map((r, i) => {
              const [out, inc] = RELATION_TEXT[r.type] ?? [r.type, r.type];
              const key = r.workItem;
              return (
                <li key={i}>
                  {r.direction === "outgoing" ? out : inc}{" "}
                  {key === null ? r.display : (
                    <a
                      href={routeHref({ view: "work-item", key })}
                      onClick={(e) => {
                        if (e.button !== 0 || e.metaKey || e.ctrlKey) return;
                        e.preventDefault();
                        void go({ view: "work-item", key });
                      }}
                    >
                      {r.display} (work item {key})
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </>
      )}
      <h4>Comments and lifecycle entries</h4>
      {ticket.activity === null
        ? (
          <p class="empty">
            This copy was recorded before the tracker read comments: run its
            fetch_issue to record a new one.
          </p>
        )
        : ticket.activity.length === 0
        ? <p class="empty">None yet.</p>
        : (
          <ol class="activity" aria-label="Comments and entries, oldest first">
            {ticket.activity.map((a, i) => {
              const label = activityLabel(a);
              return (
                <li key={a.id ?? i} class={`act act-${label.kind}`}>
                  <p class="act-head">
                    <span class="act-label">{label.text}</span>{" "}
                    <time dateTime={a.at}>{when(a.at)}</time>
                  </p>
                  {a.kind === "comment"
                    ? <Markdown text={a.body} />
                    : <p>{a.body}</p>}
                </li>
              );
            })}
          </ol>
        )}
    </>
  );
}

function ScenarioTab() {
  const run = workItem.value!.data.run;
  const c = itemCopy.value !== null && copyIsCurrent(itemCopy.value, run)
    ? itemCopy.value
    : null;
  // Made again only when the journal grows, not on every live re-read.
  useEffect(() => {
    void prepareItemCopy();
  }, [run.key, run.journal.length]);
  if (c === null) return <p class="empty" role="status">Replaying the run…</p>;
  return (
    <div class="insp">
      <p class="eyebrow">this run as a scenario entry</p>
      {c.made.entries !== run.journal.length && (
        <p class="hint">
          Copied from the run as it was read with its payloads, which has{" "}
          {c.made.entries} journal entries where this page shows{" "}
          {run.journal.length}; the page catches up on its next read.
        </p>
      )}
      <p role="status">
        {c.passed
          ? "Replayed on the pinned definition: it ends where the run is."
          : `Replayed on the pinned definition, it goes otherwise: ${
            c.problem ?? "it does not end where the run is"
          }`}
      </p>
      {c.notes.length > 0 && (
        <ul class="notes">
          {c.notes.map((n, i) => <li key={i}>{n}</li>)}
        </ul>
      )}
      {c.text !== "" && (
        <>
          <pre class="copy-yaml" tabIndex={0} aria-label="Scenario entry YAML">
        {c.text}
          </pre>
          <button
            type="button"
            class="wide"
            onClick={() => void copyItemScenario()}
          >
            Copy as scenario
          </button>
        </>
      )}
      <p class="hint">
        Paste it under globalArguments.scenarios in the factory's model
        definition, or give it to the agent to save; the studio writes nothing.
      </p>
    </div>
  );
}

function PanelBody() {
  if (workItem.value === null) return null;
  switch (itemTab.value) {
    case "now":
      return <NowTab />;
    case "timeline":
      return <TimelineTab />;
    case "metrics":
      return <MetricsTab />;
    case "ticket":
      return <TicketTab />;
    case "scenario":
      return <ScenarioTab />;
  }
}

/** The page's panel: where it is now, its timeline, metrics, ticket and the
 * run as a scenario. */
export function ItemPanel() {
  return (
    <aside class="panel" aria-label="Work item">
      <Tabs<ItemTab>
        label="Work item"
        tabs={[
          ["now", "Now"],
          ["timeline", "Timeline"],
          ["metrics", "Metrics"],
          ["ticket", "Ticket"],
          ["scenario", "Scenario"],
        ]}
        value={itemTab.value}
        onChange={(t) => (itemTab.value = t)}
        controls="item-body"
      />
      <div
        class="panel-body"
        id="item-body"
        role="tabpanel"
        aria-labelledby={`tab-${itemTab.value}`}
      >
        <PanelBody />
      </div>
    </aside>
  );
}

/** The bar's way to a work item by key: it opens /w/<key>. */
export function GoToItem() {
  const [key, setKey] = useState("");
  return (
    <form
      class="item-go"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        const k = key.trim();
        if (k !== "") void go({ view: "work-item", key: k });
      }}
    >
      <label for="item-key" class="sr-only">Go to work item, by key</label>
      <input
        id="item-key"
        type="search"
        placeholder="work item key"
        autocomplete="off"
        spellcheck={false}
        value={key}
        onInput={(e) => setKey(e.currentTarget.value)}
      />
      <button type="submit" class="wide">Go</button>
    </form>
  );
}
