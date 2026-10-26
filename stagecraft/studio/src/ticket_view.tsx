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

// The ticket page, /f/<factory>/ticket/<id>: a ticket on the factory's
// tracker that no work item has taken, as the tracker recorded it, and the
// command that claims it for the factory. Opened from a Not started or
// Claimed card on the Board.

import { claimCommand } from "./board.ts";
import {
  copyLine,
  loadTicketPage,
  ticketAt,
  ticketPage,
  ticketPageError,
  tickets,
} from "./state.ts";
import { Crumbs, TicketBody } from "./work_item_view.tsx";

/** What claim says it will do for this ticket, from the factory's tickets,
 * which the ticket page reads with the ticket. */
function claimNote(factory: string, id: string): string {
  const read = tickets.value;
  const data = read?.factory === factory ? read.data : null;
  const claimed = data?.supported
    ? data.claimed.find((c) => c.id === id)
    : undefined;
  if (claimed !== undefined) {
    return `Claimed as ${claimed.key} for ${claimed.factory}, but not ` +
      `started: running claim again prints the start command.`;
  }
  return "Claim reserves a work-item key for the ticket and prints the " +
    "command that starts it.";
}

export function TicketMode() {
  const at = ticketAt.value;
  const held = ticketPage.value;
  const error = ticketPageError.value;
  if (at === null) return null;
  const read = held !== null && held.factory === at.factory &&
      held.id === at.id
    ? held.data
    : null;
  const ticket = read?.state === "ok" ? read.ticket : null;
  const command = claimCommand(
    ticket?.tracker ?? "<tracker>",
    ticket?.display ?? at.id,
    at.factory,
  );
  return (
    <section class="ticket-mode" id="mode-panel" aria-label="Ticket">
      <div class="item-head">
        <Crumbs board={at.factory} itemKey={ticket?.display ?? at.id} />
        <h1>
          {ticket === null
            ? (
              <>
                Ticket <span class="key">{at.id}</span>
              </>
            )
            : (
              <>
                <span class="key">{ticket.display}</span> {ticket.title}
              </>
            )}
        </h1>
      </div>
      <div class="insp ticket">
        {error !== null && (
          <p class="problem" role="alert">
            Could not read the ticket: {error}
          </p>
        )}
        {read === null
          ? error === null &&
            <p class="empty" role="status">Reading the ticket…</p>
          : read.state === "ok"
          ? (
            <>
              <h4>Start work on it</h4>
              <p class="hint">{claimNote(at.factory, at.id)}</p>
              <div class="claim">
                <code class="claim-command">{command}</code>
                <button
                  type="button"
                  class="wide"
                  onClick={() => void copyLine(command)}
                >
                  Copy
                </button>
              </div>
              <TicketBody ticket={read.ticket} factory={at.factory} />
            </>
          )
          : (
            <p class="empty">
              The factory's tracker has no record of ticket {at.id}.
            </p>
          )}
        <button
          type="button"
          class="wide"
          onClick={() => void loadTicketPage()}
        >
          Refresh
        </button>
      </div>
    </section>
  );
}
