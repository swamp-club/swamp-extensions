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

import { stringify } from "npm:yaml@2.8.3";

// ---------------------------------------------------------------------------
// The workflows stagecraft ships for driving a tracker (swamp-club #3274),
// written out from one description so each stays in step with the round
// method. A run is rounds: the round method on the bound instance (a
// tracker stagecraft ships, or the publisher) records the last round's
// answers and plans the next; then the tracker's operate makes each write,
// in order, each only after the one before succeeded; then the read. A
// workflow cannot loop, so the rounds are written out to a bound, and a
// check at the end fails the run if it stopped or did not finish.
//
//   deno task build:workflows        writes extensions/workflows/*.yaml
//   build_workflows_test.ts          fails when they differ from this
// ---------------------------------------------------------------------------

interface Input {
  name: string;
  /** The round method's argument it fills; the same name by default. */
  argument?: string;
  description: string;
  type?: "string" | "boolean";
  /** Absent: required. */
  default?: string | boolean;
}

interface Kind {
  kind:
    | "publish"
    | "mark_duplicate"
    | "claim"
    | "create"
    | "fetch_issue"
    | "conformance";
  file: string;
  id: string;
  description: string;
  rounds: number;
  /** Whether a round may need a ticket read; false leaves out read jobs. */
  reads?: false;
  inputs: Input[];
}

const TRACKER: Input = {
  name: "tracker",
  description:
    "The tracker instance the factory is bound to: a tracker stagecraft " +
    "ships, or a publisher for a tracker written as a separate extension",
};

export const KINDS: Kind[] = [
  {
    kind: "publish",
    file: "publish.yaml",
    id: "301c82d9-7df9-4fb2-bc57-3414ae9e2d15",
    description:
      "Replay a work item's journal to its ticket: what publish does, for " +
      "any tracker. Run it again after each step; it delivers only what is " +
      "new.",
    rounds: 12,
    inputs: [TRACKER, {
      name: "workItem",
      description: "The work item's key",
    }],
  },
  {
    kind: "mark_duplicate",
    file: "mark_duplicate.yaml",
    id: "8b3681c8-1322-4637-9266-66a81dc5e9ed",
    description:
      "Mark a ticket a duplicate of a primary: relate it duplicate_of and " +
      "close it where the tracker does not. It moves no work item.",
    // Reads of both tickets, the relate, a read, the close, a read: 12
    // leaves room for display ids and a slow tracker.
    rounds: 12,
    inputs: [TRACKER, {
      name: "issue",
      description: "The duplicate ticket",
    }, {
      name: "primary",
      description: "The ticket it duplicates",
    }],
  },
  {
    kind: "claim",
    file: "claim.yaml",
    id: "77b36c9c-f784-47a9-ab6d-39ea84599f09",
    description:
      "Start from a ticket: report its work item, or reserve a key for a " +
      "new one and print the start command.",
    rounds: 3,
    inputs: [TRACKER, {
      name: "issue",
      description: "The ticket: its stable id, or its display identifier",
    }, {
      name: "factory",
      description:
        "The factory to start a new work item under; needed only when the " +
        "ticket has no work item, or its last one has finished",
      default: "",
    }, {
      name: "dryRun",
      description: "Report the ticket's work item, and write nothing",
      type: "boolean",
      default: false,
    }],
  },
  {
    kind: "create",
    file: "create.yaml",
    id: "e0443507-7a20-48b2-bfed-25d06a9bb172",
    description:
      "File a new ticket on the tracker and record it; a retry after the " +
      "tracker accepted it files another.",
    rounds: 3,
    inputs: [TRACKER, {
      name: "title",
      description: "The ticket's title",
    }, {
      name: "body",
      description: "The ticket's body, as markdown",
      default: "",
    }, {
      name: "type",
      description: "One of the tracker's types",
    }],
  },
  {
    kind: "fetch_issue",
    file: "fetch_issue.yaml",
    id: "8ef3524b-6bae-495d-97ad-91185f5a6ae2",
    description:
      "Read a ticket and record it, with the externalRefs to start a work " +
      "item from it.",
    rounds: 3,
    inputs: [TRACKER, {
      name: "issue",
      description: "The ticket: its stable id, or its display identifier",
    }],
  },
  {
    kind: "conformance",
    file: "conformance.yaml",
    id: "4343d3d9-9017-4696-a90f-d1b06c31cbb7",
    description:
      "Check that a tracker meets the tracker contract: the checks " +
      "stagecraft's own trackers pass, made through its operate one call " +
      "at a time. It files and changes tickets, so point it at a tracker " +
      "kept for testing.",
    // The checks make 84 calls on a tracker with every capability.
    rounds: 100,
    reads: false,
    inputs: [TRACKER, {
      name: "statusNames",
      description:
        "Two status names the tracker has, comma-separated; a new ticket " +
        "starts in neither",
    }, {
      name: "createType",
      description: "A type create accepts",
    }, {
      name: "missing",
      description: "A well-formed stable id of no ticket",
    }, {
      name: "entryStatus",
      description:
        "For a tracker that keeps history: a status name entries may carry",
      default: "",
    }, {
      name: "entryTypes",
      description: "For a tracker that keeps history: two ticket types, " +
        "comma-separated; a new ticket is in neither",
      default: "",
    }, {
      name: "user",
      description: "For a tracker that assigns: a user it accepts",
      default: "",
    }],
  },
];

/** The workflow's name: what a person runs. */
export function workflowName(kind: Kind["kind"]): string {
  return `@swamp/stagecraft/${kind.replaceAll("_", "-")}`;
}

/** The workflow for one kind, as data. */
export function workflow(k: Kind): Record<string, unknown> {
  const record = `data.latest(inputs.tracker, "round-${k.kind}-" + run.id)`;
  const roundInputs = (check: boolean): Record<string, unknown> => ({
    kind: k.kind,
    run: "${{ run.id }}",
    ...Object.fromEntries(
      k.inputs.filter((i) => i !== TRACKER).map((
        i,
      ) => [i.argument ?? i.name, `\${{ inputs.${i.name} }}`]),
    ),
    ...(check ? { check: true } : {}),
  });
  const after = (job: string) => [{ job, condition: { type: "completed" } }];
  // swamp runs a forEach's iterations in the order of their names, so the
  // workflow iterates the calls' zero-padded ids (which sort in list order)
  // and reads each call from the round record by its id.
  const call = (field: string) => `${record}.attributes.byId[self.op].${field}`;
  // A call only once the call before it succeeded.
  const guard = `\${{ ${call("prev")} != "" && ` +
    `(data.latest(${call("tracker")}, ${call("prev")}) == null || ` +
    `data.latest(${call("tracker")}, ${
      call("prev")
    }).attributes.ok != true) }}`;
  const calls = (list: "opIds" | "readIds") => ({
    name: "operate",
    forEach: { item: "op", in: `\${{ ${record}.attributes.${list} }}` },
    concurrency: 1,
    guard,
    task: {
      type: "model_method",
      modelIdOrName: `\${{ ${call("tracker")} }}`,
      methodName: "operate",
      inputs: {
        operation: `\${{ ${call("operation")} }}`,
        request: `\${{ ${call("request")} }}`,
        answer: `\${{ ${call("answer")} }}`,
        run: "${{ run.id }}",
      },
    },
  });
  const jobs: Record<string, unknown>[] = [];
  for (let n = 1; n <= k.rounds; n++) {
    const last = k.reads === false ? `write-${n - 1}` : `read-${n - 1}`;
    jobs.push({
      name: `round-${n}`,
      description: n === 1
        ? "Plan the first round"
        : "Record the last round's answers and plan the next",
      ...(n === 1 ? {} : { dependsOn: after(last) }),
      steps: [{
        name: "round",
        ...(n === 1 ? {} : { guard: `\${{ ${record}.attributes.done }}` }),
        task: {
          type: "model_method",
          modelIdOrName: "${{ inputs.tracker }}",
          methodName: "round",
          inputs: roundInputs(false),
        },
      }],
    });
    jobs.push({
      name: `write-${n}`,
      description: "Make the round's writes on the tracker, in order",
      dependsOn: after(`round-${n}`),
      steps: [calls("opIds")],
    });
    if (k.reads !== false) {
      jobs.push({
        name: `read-${n}`,
        description: "Read the ticket the round needs",
        dependsOn: after(`write-${n}`),
        steps: [calls("readIds")],
      });
    }
  }
  jobs.push({
    name: "check",
    description: "Fail the run if it stopped or did not finish",
    dependsOn: after(
      k.reads === false ? `write-${k.rounds}` : `read-${k.rounds}`,
    ),
    steps: [{
      name: "check",
      task: {
        type: "model_method",
        modelIdOrName: "${{ inputs.tracker }}",
        methodName: "round",
        inputs: roundInputs(true),
      },
    }],
  });
  return {
    id: k.id,
    name: workflowName(k.kind),
    description: k.description,
    version: 1,
    inputs: {
      properties: Object.fromEntries(k.inputs.map((i) => [i.name, {
        type: i.type ?? "string",
        description: i.description,
        ...(i.default === undefined ? {} : { default: i.default }),
      }])),
      required: k.inputs.filter((i) => i.default === undefined).map((i) =>
        i.name
      ),
    },
    jobs,
  };
}

const HEADER =
  "# Written by scripts/build_workflows.ts: change it there, then\n" +
  "# run deno task build:workflows.\n";

/** The workflow file's text for one kind. */
export function workflowText(k: Kind): string {
  return HEADER + stringify(workflow(k), { lineWidth: 0 });
}

export const WORKFLOWS_DIR = new URL(
  "../extensions/workflows/",
  import.meta.url,
);

if (import.meta.main) {
  await Deno.mkdir(WORKFLOWS_DIR, { recursive: true });
  for (const k of KINDS) {
    await Deno.writeTextFile(new URL(k.file, WORKFLOWS_DIR), workflowText(k));
  }
}
