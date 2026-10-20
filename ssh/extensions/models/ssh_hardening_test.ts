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
 * End-to-end tests for the swamp-club #3581 hardening, driven through the
 * model's methods with the runner's executor seam standing in for ssh,
 * scp, ssh-agent and ssh-add: pinned/tofu host keys, `repin`,
 * `open`'s host-key options, exec `argv`, atomic copy and agent-backed
 * identityContent. No live hosts.
 *
 * @module
 */

import {
  assert,
  assertEquals,
  assertNotEquals,
  assertRejects,
  assertStringIncludes,
} from "jsr:@std/assert@1.0.19";
import { createModelTestContext } from "@systeminit/swamp-testing";
import { model } from "./ssh.ts";
import {
  type CommandExecutor,
  denoExecutor,
  type ExecOutcome,
  type ExecRequest,
  resetCommandExecutor,
  setCommandExecutor,
} from "./_lib/runner.ts";
import type { FleetContext } from "./_lib/operations.ts";
import { computeFingerprint, hostKeyPinName } from "./_lib/host_keys.ts";

const makeEnv = createModelTestContext().context.createCelEnvironment;

const KEY_A_B64 = btoa("host-key-a-bytes");
const KEY_B_B64 = btoa("host-key-b-bytes");
const KEY_A = `ssh-ed25519 ${KEY_A_B64}`;
const KEY_B = `ssh-ed25519 ${KEY_B_B64}`;

interface Write {
  specName: string;
  name: string;
  data: Record<string, unknown>;
  tags?: Record<string, string>;
}

function harness(
  globalArgs: Record<string, unknown>,
  seed: Record<string, Record<string, unknown>> = {},
) {
  const resources = new Map(Object.entries(seed));
  const writes: Write[] = [];
  const warns: string[] = [];
  const ctx: FleetContext = {
    signal: new AbortController().signal,
    globalArgs,
    modelType: "@swamp/ssh",
    modelId: "id",
    methodName: "exec",
    logger: {
      debug() {},
      info() {},
      warn: (m: string) => warns.push(m),
      error() {},
    },
    writeResource: (specName, name, data, overrides) => {
      writes.push({ specName, name, data, tags: overrides?.tags });
      resources.set(name, data);
      return Promise.resolve({ name });
    },
    readResource: (name) => Promise.resolve(resources.get(name) ?? null),
    createCelEnvironment: makeEnv,
    dataRepository: {
      findAllForModel: () => Promise.resolve([]),
      delete: () => Promise.resolve(),
    },
  };
  return { ctx, resources, writes, warns };
}

function fleet(
  transport: Record<string, unknown>,
  extra: Record<string, unknown> = {},
) {
  return {
    name: "fleet",
    transport: { kind: "ssh", user: "deploy", ...transport },
    hosts: [{ name: "web-1", address: "10.0.0.1" }],
    ...extra,
  };
}

/** Value of `-o <Key>=...` in a request, or undefined. */
function opt(req: ExecRequest, key: string): string | undefined {
  const argv = [req.command, ...req.args];
  for (let i = 0; i < argv.length - 1; i++) {
    if (argv[i] === "-o" && argv[i + 1].startsWith(`${key}=`)) {
      return argv[i + 1].slice(key.length + 1);
    }
  }
  return undefined;
}

function ok(stdout = ""): Promise<ExecOutcome> {
  return Promise.resolve({ code: 0, signal: null, stdout, stderr: "" });
}

function recording(
  respond: (req: ExecRequest) => Promise<ExecOutcome> = () => ok(),
): { executor: CommandExecutor; requests: ExecRequest[] } {
  const requests: ExecRequest[] = [];
  return {
    requests,
    executor: (req) => {
      requests.push(req);
      return respond(req);
    },
  };
}

async function pinFor(address: string, port: number, b64: string) {
  return {
    name: await hostKeyPinName(address, port),
    data: {
      fleet: "fleet",
      address,
      port,
      keys: [{
        algorithm: "ssh-ed25519",
        publicKey: `ssh-ed25519 ${b64}`,
        fingerprint: await computeFingerprint(b64),
      }],
      firstSeenAt: "2026-01-01T00:00:00.000Z",
      pinnedAt: "2026-01-01T00:00:00.000Z",
    },
  };
}

const CHANGED_KEY_STDERR = (fp: string) =>
  "@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @\n" +
  "The fingerprint for the ED25519 key sent by the remote host is\n" +
  `${fp}.\n` +
  "Host key verification failed.\n";

async function exists(path: string): Promise<boolean> {
  try {
    await Deno.stat(path);
    return true;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// pinned
// ---------------------------------------------------------------------------

Deno.test({
  name: "pinned: exec verifies only against a per-call file holding hostKeys",
  fn: async () => {
    const h = harness(fleet({ hostKeys: [`${KEY_A} root@web-1`] }));
    let fileContent = "";
    const rec = recording(async (req) => {
      fileContent = await Deno.readTextFile(opt(req, "UserKnownHostsFile")!);
      return ok();
    });
    setCommandExecutor(rec.executor);
    try {
      await model.methods.exec.execute(
        model.methods.exec.arguments.parse({ hosts: "all", command: "true" }),
        h.ctx,
      );
      const req = rec.requests[0];
      const alias = opt(req, "HostKeyAlias")!;
      assert(alias.startsWith("swamp-"));
      assertEquals(opt(req, "StrictHostKeyChecking"), "yes");
      assertEquals(opt(req, "GlobalKnownHostsFile"), "/dev/null");
      assertEquals(fileContent, `${alias} ${KEY_A}\n`);
      assert(!(await exists(opt(req, "UserKnownHostsFile")!)), "file removed");
      // pinned never writes a pin resource.
      assert(!h.writes.some((w) => w.specName === "hostKeyPin"));
    } finally {
      resetCommandExecutor();
    }
  },
});

Deno.test({
  name: "pinned: OpenSSH refusal becomes a typed host-key-changed error",
  fn: async () => {
    const h = harness(fleet({ hostKeys: [KEY_A] }));
    const presented = await computeFingerprint(KEY_B_B64);
    setCommandExecutor(() =>
      Promise.resolve({
        code: 255,
        signal: null,
        stdout: "",
        stderr: CHANGED_KEY_STDERR(presented),
      })
    );
    try {
      const err = await assertRejects(() =>
        model.methods.exec.execute(
          model.methods.exec.arguments.parse({ hosts: "all", command: "true" }),
          h.ctx,
        )
      );
      const pinned = await computeFingerprint(KEY_A_B64);
      assertStringIncludes(
        (err as Error).message,
        `host key changed for 10.0.0.1:22: pinned ${pinned}, presented ${presented}`,
      );
      // The run record carries the same error and was written before the throw.
      const run = h.writes.find((w) => w.specName === "runResult")!;
      assertStringIncludes(String(run.data.error), "host key changed");
    } finally {
      resetCommandExecutor();
    }
  },
});

// ---------------------------------------------------------------------------
// tofu
// ---------------------------------------------------------------------------

/** Executor that behaves like ssh accept-new: records `key` in the file. */
function acceptNew(b64: string, requests: ExecRequest[] = []): CommandExecutor {
  return async (req) => {
    requests.push(req);
    const file = opt(req, "UserKnownHostsFile");
    const alias = opt(req, "HostKeyAlias");
    if (file && alias && opt(req, "StrictHostKeyChecking") === "accept-new") {
      await Deno.writeTextFile(file, `${alias} ssh-ed25519 ${b64}\n`, {
        append: true,
      });
    }
    return ok();
  };
}

Deno.test({
  name: "tofu: first contact pins the accepted key; next call is strict",
  fn: async () => {
    const h = harness(fleet({ hostKeyPolicy: "tofu" }));
    const requests: ExecRequest[] = [];
    setCommandExecutor(acceptNew(KEY_A_B64, requests));
    try {
      const args = model.methods.exec.arguments.parse({
        hosts: "all",
        command: "true",
      });
      const first = await model.methods.exec.execute(args, h.ctx);
      assertEquals(opt(requests[0], "StrictHostKeyChecking"), "accept-new");

      const pinName = await hostKeyPinName("10.0.0.1", 22);
      const pinWrite = h.writes.find((w) => w.specName === "hostKeyPin")!;
      assertEquals(pinWrite.name, pinName);
      assertEquals(pinWrite.data.address, "10.0.0.1");
      assertEquals(pinWrite.data.port, 22);
      assertEquals(
        (pinWrite.data.keys as { fingerprint: string }[])[0].fingerprint,
        await computeFingerprint(KEY_A_B64),
      );
      assert(first.dataHandles.some((d) => d.name === pinName));

      await model.methods.exec.execute(args, h.ctx);
      assertEquals(opt(requests[1], "StrictHostKeyChecking"), "yes");
      // The ControlPath does not depend on the pin, so the master opened on
      // first contact is reused.
      assertEquals(
        opt(requests[0], "ControlPath"),
        opt(requests[1], "ControlPath"),
      );
      assertEquals(
        h.writes.filter((w) => w.specName === "hostKeyPin").length,
        1,
        "a strict call never re-writes the pin",
      );
    } finally {
      resetCommandExecutor();
    }
  },
});

Deno.test({
  name: "tofu: existing pin is enforced and a changed key fails closed",
  fn: async () => {
    const pin = await pinFor("10.0.0.1", 22, KEY_A_B64);
    const h = harness(fleet({ hostKeyPolicy: "tofu" }), {
      [pin.name]: pin.data,
    });
    let content = "";
    const presented = await computeFingerprint(KEY_B_B64);
    setCommandExecutor(async (req) => {
      content = await Deno.readTextFile(opt(req, "UserKnownHostsFile")!);
      return {
        code: 255,
        signal: null,
        stdout: "",
        stderr: CHANGED_KEY_STDERR(presented),
      };
    });
    try {
      const err = await assertRejects(() =>
        model.methods.exec.execute(
          model.methods.exec.arguments.parse({ hosts: "all", command: "true" }),
          h.ctx,
        )
      );
      assertStringIncludes(content, `ssh-ed25519 ${KEY_A_B64}`);
      assertStringIncludes((err as Error).message, `presented ${presented}`);
      assert(
        !h.writes.some((w) => w.specName === "hostKeyPin"),
        "never re-pinned",
      );
    } finally {
      resetCommandExecutor();
    }
  },
});

Deno.test({
  name: "tofu: a pin that appeared mid-call with the same key skips the write",
  fn: async () => {
    const pin = await pinFor("10.0.0.1", 22, KEY_A_B64);
    const h = harness(fleet({ hostKeyPolicy: "tofu" }));
    const inner = acceptNew(KEY_A_B64);
    setCommandExecutor(async (req) => {
      const out = await inner(req);
      h.resources.set(pin.name, pin.data); // parallel first contact won
      return out;
    });
    try {
      await model.methods.exec.execute(
        model.methods.exec.arguments.parse({ hosts: "all", command: "true" }),
        h.ctx,
      );
      assert(!h.writes.some((w) => w.specName === "hostKeyPin"));
    } finally {
      resetCommandExecutor();
    }
  },
});

Deno.test({
  name:
    "tofu: a pin that appeared mid-call with a different key fails the host",
  fn: async () => {
    const pin = await pinFor("10.0.0.1", 22, KEY_B_B64);
    const h = harness(fleet({ hostKeyPolicy: "tofu" }));
    const inner = acceptNew(KEY_A_B64);
    setCommandExecutor(async (req) => {
      const out = await inner(req);
      h.resources.set(pin.name, pin.data);
      return out;
    });
    try {
      const err = await assertRejects(() =>
        model.methods.exec.execute(
          model.methods.exec.arguments.parse({ hosts: "all", command: "true" }),
          h.ctx,
        )
      );
      assertStringIncludes((err as Error).message, "host key changed");
      assert(!h.writes.some((w) => w.specName === "hostKeyPin"));
    } finally {
      resetCommandExecutor();
    }
  },
});

Deno.test({
  name: "tofu: pin is keyed by address:port, shared by hosts on one endpoint",
  fn: async () => {
    const h = harness({
      ...fleet({ hostKeyPolicy: "tofu" }),
      hosts: [
        { name: "a", address: "10.0.0.1" },
        { name: "b", address: "10.0.0.1" },
        { name: "c", address: "10.0.0.1", transport: { port: 2222 } },
      ],
    });
    setCommandExecutor(acceptNew(KEY_A_B64));
    try {
      await model.methods.exec.execute(
        model.methods.exec.arguments.parse({
          hosts: "all",
          command: "true",
          parallel: 1,
        }),
        h.ctx,
      );
      const pins = h.writes.filter((w) => w.specName === "hostKeyPin");
      assertEquals(
        pins.map((p) => p.name).sort(),
        [
          await hostKeyPinName("10.0.0.1", 22),
          await hostKeyPinName("10.0.0.1", 2222),
        ].sort(),
      );
    } finally {
      resetCommandExecutor();
    }
  },
});

// ---------------------------------------------------------------------------
// repin
// ---------------------------------------------------------------------------

Deno.test({
  name:
    "repin: replaces the pin over a fresh connection and records the old one",
  fn: async () => {
    const pin = await pinFor("10.0.0.1", 22, KEY_A_B64);
    const h = harness(fleet({ hostKeyPolicy: "tofu" }), {
      [pin.name]: pin.data,
    });
    const requests: ExecRequest[] = [];
    setCommandExecutor(acceptNew(KEY_B_B64, requests));
    try {
      await model.methods.repin.execute(
        model.methods.repin.arguments.parse({ hosts: "all" }),
        h.ctx,
      );
      const req = requests[0];
      assertEquals(opt(req, "StrictHostKeyChecking"), "accept-new");
      assertEquals(opt(req, "ControlMaster"), "no");
      assertEquals(opt(req, "ControlPath"), "none");
      const write = h.writes.find((w) => w.specName === "hostKeyPin")!;
      assertEquals(
        (write.data.keys as { fingerprint: string }[])[0].fingerprint,
        await computeFingerprint(KEY_B_B64),
      );
      assertEquals(write.data.previousFingerprints, [
        await computeFingerprint(KEY_A_B64),
      ]);
      assert(h.warns.some((w) => w.includes("repinned")));
    } finally {
      resetCommandExecutor();
    }
  },
});

Deno.test("repin: refuses hosts that are not tofu", async () => {
  const h = harness(fleet({ hostKeys: [KEY_A] }));
  await assertRejects(
    () =>
      model.methods.repin.execute(
        model.methods.repin.arguments.parse({ hosts: "all" }),
        h.ctx,
      ),
    Error,
    "only applies to hosts with hostKeyPolicy 'tofu'",
  );
});

Deno.test({
  name: "repin: fails when ssh recorded no key",
  fn: async () => {
    const h = harness(fleet({ hostKeyPolicy: "tofu" }));
    setCommandExecutor(() => ok());
    try {
      await assertRejects(
        () =>
          model.methods.repin.execute(
            model.methods.repin.arguments.parse({ hosts: "all" }),
            h.ctx,
          ),
        Error,
        "recorded no host key",
      );
    } finally {
      resetCommandExecutor();
    }
  },
});

// ---------------------------------------------------------------------------
// open
// ---------------------------------------------------------------------------

Deno.test({
  name: "open: master carries the declared host-key policy and extraOptions",
  fn: async () => {
    const h = harness(fleet({
      hostKeys: [KEY_A],
      connectTimeoutSec: 7,
      extraOptions: ["LogLevel=ERROR"],
    }));
    const rec = recording();
    setCommandExecutor(rec.executor);
    try {
      await model.methods.open.execute(
        model.methods.open.arguments.parse({ hosts: "all" }),
        h.ctx,
      );
      const req = rec.requests[0];
      assertEquals(opt(req, "ControlMaster"), "yes");
      assertEquals(opt(req, "StrictHostKeyChecking"), "yes");
      assert(opt(req, "HostKeyAlias")?.startsWith("swamp-"));
      assertEquals(opt(req, "ConnectTimeout"), "7");
      assertEquals(opt(req, "LogLevel"), "ERROR");
    } finally {
      resetCommandExecutor();
    }
  },
});

Deno.test({
  name:
    "open: legacy strictHostKeyChecking/knownHostsFile now reach the master",
  fn: async () => {
    const h = harness(fleet({
      strictHostKeyChecking: "yes",
      knownHostsFile: "/etc/swamp/known_hosts",
    }));
    const rec = recording();
    setCommandExecutor(rec.executor);
    try {
      await model.methods.open.execute(
        model.methods.open.arguments.parse({ hosts: "all" }),
        h.ctx,
      );
      assertEquals(opt(rec.requests[0], "StrictHostKeyChecking"), "yes");
      assertEquals(
        opt(rec.requests[0], "UserKnownHostsFile"),
        "/etc/swamp/known_hosts",
      );
    } finally {
      resetCommandExecutor();
    }
  },
});

Deno.test({
  name: "open: tofu first contact pins from the master connection",
  fn: async () => {
    const h = harness(fleet({ hostKeyPolicy: "tofu" }));
    setCommandExecutor(acceptNew(KEY_A_B64));
    try {
      await model.methods.open.execute(
        model.methods.open.arguments.parse({ hosts: "all" }),
        h.ctx,
      );
      assert(h.writes.some((w) => w.specName === "hostKeyPin"));
    } finally {
      resetCommandExecutor();
    }
  },
});

// ---------------------------------------------------------------------------
// exec argv
// ---------------------------------------------------------------------------

Deno.test("exec argv: elements are quoted and recorded", async () => {
  const h = harness(fleet({}));
  const rec = recording();
  setCommandExecutor(rec.executor);
  try {
    await model.methods.exec.execute(
      model.methods.exec.arguments.parse({
        hosts: "all",
        argv: ["touch", "a file", "$HOME"],
        sudo: true,
      }),
      h.ctx,
    );
    const args = rec.requests[0].args;
    assertEquals(args[args.length - 1], "sudo -n -- 'touch' 'a file' '$HOME'");
    const run = h.writes.find((w) => w.specName === "runResult")!;
    const recorded = run.data.args as Record<string, unknown>;
    assertEquals(recorded.argv, ["touch", "a file", "$HOME"]);
    assertEquals(recorded.command, undefined);
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// atomic copy
// ---------------------------------------------------------------------------

Deno.test({
  name: "copy atomic: uploads to a staging sibling, then finalizes over ssh",
  fn: async () => {
    const src = await Deno.makeTempFile();
    await Deno.writeTextFile(src, "payload");
    const h = harness(fleet({}));
    const rec = recording();
    setCommandExecutor(rec.executor);
    try {
      await model.methods.copy.execute(
        model.methods.copy.arguments.parse({
          hosts: "all",
          src,
          dst: "/etc/app/app.conf",
          direction: "to",
          atomic: true,
          mode: "0644",
          verifySha256: true,
        }),
        h.ctx,
      );
      assertEquals(rec.requests.length, 3);
      const [prepare, upload, finalize] = rec.requests;
      assertEquals(prepare.command, "ssh");
      assertStringIncludes(prepare.args.at(-1)!, "umask 077; set -C");
      assertEquals(upload.command, "scp");
      const target = upload.args[upload.args.length - 1];
      const m = target.match(
        /^deploy@10\.0\.0\.1:\/etc\/app\/\.app\.conf\.swamp-([0-9a-f]{32})$/,
      );
      assert(m !== null, target);
      assertEquals(finalize.command, "ssh");
      const remote = finalize.args[finalize.args.length - 1];
      assertStringIncludes(remote, `'/etc/app/.app.conf.swamp-${m[1]}'`);
      assertStringIncludes(remote, "'/etc/app/app.conf' '0644' ''");
      assertStringIncludes(prepare.args.at(-1)!, `.app.conf.swamp-${m[1]}'`);
      // A new dst falls back to the local source's mode.
      const srcMode = ((await Deno.stat(src)).mode! & 0o7777).toString(8);
      assert(remote.endsWith(` '${srcMode}'`), remote);
      const digest = Array.from(
        new Uint8Array(
          await crypto.subtle.digest(
            "SHA-256",
            new TextEncoder().encode("payload"),
          ),
        ),
      ).map((b) => b.toString(16).padStart(2, "0")).join("");
      assertStringIncludes(remote, `'${digest}'`);
      const runs = h.writes.filter((w) => w.specName === "runResult");
      assertEquals(runs.length, 1, "one runResult per host");
      assertEquals(runs[0].data.error, undefined);
    } finally {
      resetCommandExecutor();
      await Deno.remove(src);
    }
  },
});

Deno.test({
  name:
    "copy atomic: failed upload cleans its staging file and names the stage",
  fn: async () => {
    const h = harness(fleet({}));
    const rec = recording((req) =>
      Promise.resolve(
        req.command === "scp"
          ? { code: 1, signal: null, stdout: "", stderr: "scp: disk full" }
          : { code: 0, signal: null, stdout: "", stderr: "" },
      )
    );
    setCommandExecutor(rec.executor);
    try {
      const err = await assertRejects(() =>
        model.methods.copy.execute(
          model.methods.copy.arguments.parse({
            hosts: "all",
            src: "./f",
            dst: "/etc/f",
            direction: "to",
            atomic: true,
          }),
          h.ctx,
        )
      );
      assertStringIncludes((err as Error).message, "upload failed (exit 1)");
      assertEquals(rec.requests.map((r) => r.command), ["ssh", "scp", "ssh"]);
      const cleanup = rec.requests[2];
      assertStringIncludes(
        cleanup.args[cleanup.args.length - 1],
        "rm -f -- '/etc/.f.swamp-",
      );
    } finally {
      resetCommandExecutor();
    }
  },
});

Deno.test({
  name: "copy atomic: finalize failure (sha mismatch) names the stage",
  fn: async () => {
    const h = harness(fleet({}));
    const rec = recording((req) =>
      Promise.resolve(
        req.command === "ssh" && req.args.at(-1)!.includes("mv -f")
          ? {
            code: 3,
            signal: null,
            stdout: "",
            stderr: "swamp-copy: sha256 mismatch",
          }
          : { code: 0, signal: null, stdout: "", stderr: "" },
      )
    );
    setCommandExecutor(rec.executor);
    try {
      const err = await assertRejects(() =>
        model.methods.copy.execute(
          model.methods.copy.arguments.parse({
            hosts: "all",
            src: "./f",
            dst: "/etc/f",
            direction: "to",
            atomic: true,
          }),
          h.ctx,
        )
      );
      assertStringIncludes((err as Error).message, "finalize failed (exit 3)");
      assertStringIncludes((err as Error).message, "sha256 mismatch");
    } finally {
      resetCommandExecutor();
    }
  },
});

// ---------------------------------------------------------------------------
// identityContent via ssh-agent
// ---------------------------------------------------------------------------

const PEM_1 =
  "-----BEGIN OPENSSH PRIVATE KEY-----\none\n-----END OPENSSH PRIVATE KEY-----\n";
const PEM_2 =
  "-----BEGIN OPENSSH PRIVATE KEY-----\ntwo\n-----END OPENSSH PRIVATE KEY-----\n";
// PEM_1's key in the older PEM encoding: different text, same public key.
const PEM_1_RSA =
  "-----BEGIN RSA PRIVATE KEY-----\none\n-----END RSA PRIVATE KEY-----\n";

/**
 * Fake ssh-agent / ssh-add: `ssh-add -` loads the key on stdin, `ssh-add -L`
 * lists loaded keys in load order, as the real agent does. Like the real
 * agent it holds a key once, whatever its encoding; `ssh-add -D` empties it.
 * `failAddAt` fails only the nth key load (1-based). ssh succeeds.
 */
function agentExecutor(
  requests: ExecRequest[],
  failAdd = false,
  failAddAt?: number,
): CommandExecutor {
  const loaded: string[] = [];
  let adds = 0;
  return (req) => {
    requests.push(req);
    if (req.command === "ssh-agent") {
      return ok(
        req.args[0] === "-k"
          ? ""
          : "SSH_AUTH_SOCK=/x; export SSH_AUTH_SOCK;\nSSH_AGENT_PID=4242; export SSH_AGENT_PID;\n",
      );
    }
    if (req.command === "ssh-add" && req.args[0] === "-L") {
      return ok(loaded.map((l) => l + "\n").join(""));
    }
    if (req.command === "ssh-add" && failAdd) {
      return Promise.resolve({
        code: 2,
        signal: null,
        stdout: "",
        stderr: "Could not open a connection to your authentication agent.",
      });
    }
    if (req.command === "ssh-add" && req.args[0] === "-D") {
      loaded.length = 0;
      return ok();
    }
    if (req.command === "ssh-add" && ++adds === failAddAt) {
      return Promise.resolve({
        code: 1,
        signal: null,
        stdout: "",
        stderr: "agent refused operation",
      });
    }
    if (req.command === "ssh-add") {
      const line = req.stdin === PEM_1 || req.stdin === PEM_1_RSA
        ? `${KEY_A} (stdin)`
        : `${KEY_B} (stdin)`;
      if (!loaded.includes(line)) loaded.push(line);
    }
    return ok();
  };
}

Deno.test({
  name:
    "identityContent agent: each host gets its own key via the agent, no key file",
  fn: async () => {
    const h = harness({
      ...fleet({}),
      hosts: [
        {
          name: "a",
          address: "10.0.0.1",
          transport: { identityContent: PEM_1 },
        },
        {
          name: "b",
          address: "10.0.0.2",
          transport: { identityContent: PEM_2 },
        },
      ],
    });
    const requests: ExecRequest[] = [];
    const pubContents = new Map<string, string>();
    const inner = agentExecutor(requests);
    setCommandExecutor(async (req) => {
      if (req.command === "ssh") {
        const i = req.args.indexOf("-i");
        pubContents.set(
          req.args.at(-2)!,
          await Deno.readTextFile(req.args[i + 1]),
        );
        assert(
          !req.args[i + 1].includes("swamp-ssh-key-"),
          "no private key file",
        );
      }
      return inner(req);
    });
    try {
      await model.methods.exec.execute(
        model.methods.exec.arguments.parse({ hosts: "all", command: "true" }),
        h.ctx,
      );
      const agentStart = requests.find((r) => r.command === "ssh-agent")!;
      const socket = agentStart.args[2];
      const ssh = requests.filter((r) => r.command === "ssh");
      for (const r of ssh) {
        assertEquals(opt(r, "IdentityAgent"), socket);
        assertEquals(opt(r, "IdentitiesOnly"), "yes");
      }
      assertEquals(pubContents.get("deploy@10.0.0.1"), `${KEY_A} (stdin)\n`);
      assertEquals(pubContents.get("deploy@10.0.0.2"), `${KEY_B} (stdin)\n`);
      // The private key went to ssh-add over stdin, with a lifetime.
      const adds = requests.filter((r) =>
        r.command === "ssh-add" && r.args[0] !== "-L"
      );
      assertEquals(adds.map((r) => r.stdin).sort(), [PEM_1, PEM_2].sort());
      assert(adds.every((r) => r.args[0] === "-t" && r.args.at(-1) === "-"));
      assertEquals(adds[0].env.SSH_AUTH_SOCK, socket);
      // Agent killed, socket directory removed.
      const kill = requests.find((r) =>
        r.command === "ssh-agent" && r.args[0] === "-k"
      )!;
      assertEquals(kill.env.SSH_AGENT_PID, "4242");
      assert(!(await exists(socket.slice(0, socket.lastIndexOf("/")))));
    } finally {
      resetCommandExecutor();
    }
  },
});

/** Three hosts: PEM_1, PEM_2, then PEM_1's key in the PEM encoding. */
function twoEncodingsFleet(extra: Record<string, unknown> = {}) {
  return harness({
    ...fleet({}),
    ...extra,
    hosts: [
      { name: "a", address: "10.0.0.1", transport: { identityContent: PEM_1 } },
      { name: "b", address: "10.0.0.2", transport: { identityContent: PEM_2 } },
      {
        name: "c",
        address: "10.0.0.3",
        transport: { identityContent: PEM_1_RSA },
      },
    ],
  });
}

for (const mode of ["auto", "agent"] as const) {
  Deno.test({
    name:
      `identityContent ${mode}: the same key in two encodings shares one .pub`,
    fn: async () => {
      const h = twoEncodingsFleet({ identityContentMode: mode });
      const requests: ExecRequest[] = [];
      const identity = new Map<string, string>();
      const inner = agentExecutor(requests);
      setCommandExecutor((req) => {
        if (req.command === "ssh") {
          const i = req.args.indexOf("-i");
          identity.set(req.args.at(-2)!, req.args[i + 1]);
          assert(
            !req.args[i + 1].includes("swamp-ssh-key-"),
            "no private key file",
          );
        }
        return inner(req);
      });
      try {
        await model.methods.exec.execute(
          model.methods.exec.arguments.parse({
            hosts: "all",
            command: "true",
          }),
          h.ctx,
        );
        assertEquals(
          identity.get("deploy@10.0.0.3"),
          identity.get("deploy@10.0.0.1"),
        );
        assertNotEquals(
          identity.get("deploy@10.0.0.2"),
          identity.get("deploy@10.0.0.1"),
        );
        // Identified by loading it alone, then the other keys were reloaded.
        const adds = requests.filter((r) =>
          r.command === "ssh-add" && r.args[0] !== "-L"
        );
        assertEquals(adds.map((r) => r.args[0] === "-D" ? "-D" : r.stdin), [
          PEM_1,
          PEM_2,
          PEM_1_RSA,
          "-D",
          PEM_1_RSA,
          PEM_1,
          PEM_2,
        ]);
        assertEquals(h.warns, []);
      } finally {
        resetCommandExecutor();
      }
    },
  });
}

Deno.test({
  name:
    "identityContent auto: a failed reload after identifying a duplicate falls back to the temp file",
  fn: async () => {
    const h = twoEncodingsFleet();
    const requests: ExecRequest[] = [];
    // Loads: PEM_1, PEM_2, PEM_1_RSA, PEM_1_RSA alone, then the PEM_1 reload.
    setCommandExecutor(agentExecutor(requests, false, 5));
    try {
      await model.methods.exec.execute(
        model.methods.exec.arguments.parse({ hosts: "all", command: "true" }),
        h.ctx,
      );
      const ssh = requests.filter((r) => r.command === "ssh");
      assertEquals(ssh.length, 3);
      for (const r of ssh) {
        assert(r.args[r.args.indexOf("-i") + 1].includes("swamp-ssh-key-"));
        assertEquals(opt(r, "IdentityAgent"), undefined);
      }
      assert(h.warns.some((w) => w.includes("temporary key file")));
      assert(
        requests.some((r) => r.command === "ssh-agent" && r.args[0] === "-k"),
      );
    } finally {
      resetCommandExecutor();
    }
  },
});

Deno.test({
  name:
    "identityContent agent mode: a failed reload after identifying a duplicate fails closed",
  fn: async () => {
    const h = twoEncodingsFleet({ identityContentMode: "agent" });
    const requests: ExecRequest[] = [];
    setCommandExecutor(agentExecutor(requests, false, 5));
    try {
      await assertRejects(
        () =>
          model.methods.exec.execute(
            model.methods.exec.arguments.parse({
              hosts: "all",
              command: "true",
            }),
            h.ctx,
          ),
        Error,
        "agent refused operation",
      );
      assert(!requests.some((r) => r.command === "ssh"), "never connected");
      assert(
        requests.some((r) => r.command === "ssh-agent" && r.args[0] === "-k"),
      );
    } finally {
      resetCommandExecutor();
    }
  },
});

Deno.test({
  name:
    "identityContent auto: falls back to the temp file when the agent fails",
  fn: async () => {
    const h = harness(fleet({ identityContent: PEM_1 }));
    const requests: ExecRequest[] = [];
    setCommandExecutor(agentExecutor(requests, true));
    try {
      await model.methods.exec.execute(
        model.methods.exec.arguments.parse({ hosts: "all", command: "true" }),
        h.ctx,
      );
      const ssh = requests.find((r) => r.command === "ssh")!;
      const i = ssh.args.indexOf("-i");
      assert(ssh.args[i + 1].includes("swamp-ssh-key-"));
      assertEquals(opt(ssh, "IdentityAgent"), undefined);
      assert(h.warns.some((w) => w.includes("temporary key file")));
      // The partially started agent was still killed.
      assert(
        requests.some((r) => r.command === "ssh-agent" && r.args[0] === "-k"),
      );
    } finally {
      resetCommandExecutor();
    }
  },
});

Deno.test({
  name: "identityContent agent mode: fails instead of writing the key to disk",
  fn: async () => {
    const h = harness(
      fleet({ identityContent: PEM_1 }, { identityContentMode: "agent" }),
    );
    const requests: ExecRequest[] = [];
    setCommandExecutor(agentExecutor(requests, true));
    try {
      await assertRejects(
        () =>
          model.methods.exec.execute(
            model.methods.exec.arguments.parse({
              hosts: "all",
              command: "true",
            }),
            h.ctx,
          ),
        Error,
        "identityContentMode 'agent'",
      );
      assert(!requests.some((r) => r.command === "ssh"), "never connected");
    } finally {
      resetCommandExecutor();
    }
  },
});

// ---------------------------------------------------------------------------
// Fixes from verification review
// ---------------------------------------------------------------------------

Deno.test("tofu: an unreadable pin fails closed before connecting", async () => {
  const name = await hostKeyPinName("10.0.0.1", 22);
  const h = harness(fleet({ hostKeyPolicy: "tofu" }), {
    [name]: { fleet: "fleet", address: "10.0.0.1", port: 22, keys: [] },
  });
  const rec = recording();
  setCommandExecutor(rec.executor);
  try {
    await assertRejects(
      () =>
        model.methods.exec.execute(
          model.methods.exec.arguments.parse({ hosts: "all", command: "true" }),
          h.ctx,
        ),
      Error,
      "run `repin` to replace it",
    );
    assertEquals(rec.requests.length, 0, "never connected");
    assert(!h.writes.some((w) => w.specName === "hostKeyPin"));
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("repin: replaces an unreadable pin", async () => {
  const name = await hostKeyPinName("10.0.0.1", 22);
  const h = harness(fleet({ hostKeyPolicy: "tofu" }), {
    [name]: { garbage: true },
  });
  setCommandExecutor(acceptNew(KEY_A_B64));
  try {
    await model.methods.repin.execute(
      model.methods.repin.arguments.parse({ hosts: "all" }),
      h.ctx,
    );
    assert(h.writes.some((w) => w.specName === "hostKeyPin"));
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("repin: a probe that fails auth does not replace the pin", async () => {
  const pin = await pinFor("10.0.0.1", 22, KEY_A_B64);
  const h = harness(fleet({ hostKeyPolicy: "tofu" }), {
    [pin.name]: pin.data,
  });
  const inner = acceptNew(KEY_B_B64);
  setCommandExecutor(async (req) => {
    await inner(req); // key exchange completed and recorded the key
    return {
      code: 255,
      signal: null,
      stdout: "",
      stderr: "deploy@10.0.0.1: Permission denied (publickey).",
    };
  });
  try {
    await assertRejects(() =>
      model.methods.repin.execute(
        model.methods.repin.arguments.parse({ hosts: "all" }),
        h.ctx,
      )
    );
    assert(!h.writes.some((w) => w.specName === "hostKeyPin"));
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("identityContent agent: warns when it overrides a configured identityAgent", async () => {
  const h = harness(
    fleet({ identityContent: PEM_1, identityAgent: "/run/user/agent.sock" }),
  );
  setCommandExecutor(agentExecutor([]));
  try {
    await model.methods.exec.execute(
      model.methods.exec.arguments.parse({ hosts: "all", command: "true" }),
      h.ctx,
    );
    assert(h.warns.some((w) => w.includes("instead of identityAgent")));
  } finally {
    resetCommandExecutor();
  }
});

// The real binaries, when present: proves the agent path works on this
// platform (the pipe-permission check that rules out `ssh-keygen -y -f
// /dev/stdin` on macOS is exactly what a mock cannot catch).
const haveOpenSsh = (() => {
  try {
    return new Deno.Command("ssh-agent", { args: ["-h"] }).outputSync() !==
      undefined;
  } catch {
    return false;
  }
})();

Deno.test({
  name:
    "identityContent agent: real ssh-agent/ssh-add load the key and kill the agent",
  ignore: !haveOpenSsh,
  fn: async () => {
    const keyDir = await Deno.makeTempDir();
    try {
      const gen = await new Deno.Command("ssh-keygen", {
        args: ["-q", "-t", "ed25519", "-N", "", "-f", `${keyDir}/k`],
      }).output();
      assert(gen.success);
      const pem = await Deno.readTextFile(`${keyDir}/k`);
      const pub = (await Deno.readTextFile(`${keyDir}/k.pub`)).split(" ")
        .slice(0, 2).join(" ");

      const h = harness(fleet({ identityContent: pem }, {
        identityContentMode: "agent",
      }));
      let offered: string | undefined;
      let agentSock: string | undefined;
      // Real ssh-agent/ssh-add; only the ssh connection itself is faked.
      setCommandExecutor(async (req) => {
        if (req.command !== "ssh") return await denoExecutor(req);
        agentSock = opt(req, "IdentityAgent");
        offered = await Deno.readTextFile(
          req.args[req.args.indexOf("-i") + 1],
        );
        return await ok();
      });
      await model.methods.exec.execute(
        model.methods.exec.arguments.parse({ hosts: "all", command: "true" }),
        h.ctx,
      );
      assert(offered?.startsWith(pub), `offered ${offered}, expected ${pub}`);
      assert(agentSock !== undefined);
      assert(!(await exists(agentSock)), "agent socket removed");
    } finally {
      resetCommandExecutor();
      await Deno.remove(keyDir, { recursive: true });
    }
  },
});

Deno.test("repin: retires the existing ControlMaster after a successful repin", async () => {
  const pin = await pinFor("10.0.0.1", 22, KEY_A_B64);
  const h = harness(fleet({ hostKeyPolicy: "tofu" }), {
    [pin.name]: pin.data,
  });
  const requests: ExecRequest[] = [];
  setCommandExecutor(acceptNew(KEY_B_B64, requests));
  try {
    await model.methods.repin.execute(
      model.methods.repin.arguments.parse({ hosts: "all" }),
      h.ctx,
    );
    assertEquals(requests.length, 2);
    const exit = requests[1];
    assertEquals(exit.args.slice(0, 2), ["-O", "exit"]);
    // The master addressed is the one normal tofu calls multiplex over.
    const rec = recording();
    setCommandExecutor(rec.executor);
    await model.methods.exec.execute(
      model.methods.exec.arguments.parse({ hosts: "all", command: "true" }),
      h.ctx,
    );
    assertEquals(opt(exit, "ControlPath"), opt(rec.requests[0], "ControlPath"));
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("tofu: a call that rode a master while unpinned warns", async () => {
  const h = harness(fleet({ hostKeyPolicy: "tofu" }));
  setCommandExecutor(() => ok()); // no key exchange → nothing recorded
  try {
    await model.methods.exec.execute(
      model.methods.exec.arguments.parse({ hosts: "all", command: "true" }),
      h.ctx,
    );
    assert(h.warns.some((w) => w.includes("has no pin")));
    assert(!h.writes.some((w) => w.specName === "hostKeyPin"));
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("copy atomic: a failed prepare skips upload and never removes the path", async () => {
  const h = harness(fleet({}));
  const rec = recording((req) =>
    Promise.resolve(
      req.args.at(-1)!.includes("set -C")
        ? {
          code: 1,
          signal: null,
          stdout: "",
          stderr: "cannot overwrite existing file",
        }
        : { code: 0, signal: null, stdout: "", stderr: "" },
    )
  );
  setCommandExecutor(rec.executor);
  try {
    const err = await assertRejects(() =>
      model.methods.copy.execute(
        model.methods.copy.arguments.parse({
          hosts: "all",
          src: "./f",
          dst: "/etc/f",
          direction: "to",
          atomic: true,
        }),
        h.ctx,
      )
    );
    assertStringIncludes((err as Error).message, "prepare failed (exit 1)");
    assertEquals(rec.requests.length, 1, "no upload, no rm");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("copy atomic: rsync upload is kept private with --chmod=go=", async () => {
  const h = harness(fleet({}));
  const rec = recording();
  setCommandExecutor(rec.executor);
  try {
    await model.methods.copy.execute(
      model.methods.copy.arguments.parse({
        hosts: "all",
        src: "./f",
        dst: "/etc/f",
        direction: "to",
        atomic: true,
        useRsync: true,
      }),
      h.ctx,
    );
    const rsync = rec.requests.find((r) => r.command === "rsync")!;
    assert(rsync.args.includes("--chmod=go="));
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("copy: a plain rsync copy keeps its permissions unchanged", async () => {
  const h = harness(fleet({}));
  const rec = recording();
  setCommandExecutor(rec.executor);
  try {
    await model.methods.copy.execute(
      model.methods.copy.arguments.parse({
        hosts: "all",
        src: "./f",
        dst: "/etc/f",
        direction: "to",
        useRsync: true,
      }),
      h.ctx,
    );
    assert(!rec.requests[0].args.includes("--chmod=go="));
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("identityContent agent: IdentitiesOnly is forced even when the host sets false", async () => {
  const h = harness(fleet({ identityContent: PEM_1, identitiesOnly: false }));
  const requests: ExecRequest[] = [];
  setCommandExecutor(agentExecutor(requests));
  try {
    await model.methods.exec.execute(
      model.methods.exec.arguments.parse({ hosts: "all", command: "true" }),
      h.ctx,
    );
    const ssh = requests.find((r) => r.command === "ssh")!;
    assertEquals(opt(ssh, "IdentitiesOnly"), "yes");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("tofu: a schema-shaped pin with an unparseable key fails closed", async () => {
  const name = await hostKeyPinName("10.0.0.1", 22);
  const h = harness(fleet({ hostKeyPolicy: "tofu" }), {
    [name]: {
      fleet: "fleet",
      address: "10.0.0.1",
      port: 22,
      keys: [{
        algorithm: "ssh-ed25519",
        publicKey: "ssh-ed25519",
        fingerprint: "x",
      }],
      firstSeenAt: "2026-01-01T00:00:00.000Z",
      pinnedAt: "2026-01-01T00:00:00.000Z",
    },
  });
  const rec = recording();
  setCommandExecutor(rec.executor);
  try {
    await assertRejects(
      () =>
        model.methods.exec.execute(
          model.methods.exec.arguments.parse({ hosts: "all", command: "true" }),
          h.ctx,
        ),
      Error,
      "repin",
    );
    assertEquals(rec.requests.length, 0, "never connected");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("identityContent agent: the same key with CRLF endings is loaded once", async () => {
  const h = harness({
    ...fleet({}),
    hosts: [
      { name: "a", address: "10.0.0.1", transport: { identityContent: PEM_1 } },
      {
        name: "b",
        address: "10.0.0.2",
        transport: { identityContent: PEM_1.replaceAll("\n", "\r\n") + "\r\n" },
      },
    ],
  });
  const requests: ExecRequest[] = [];
  setCommandExecutor(agentExecutor(requests));
  try {
    await model.methods.exec.execute(
      model.methods.exec.arguments.parse({ hosts: "all", command: "true" }),
      h.ctx,
    );
    const adds = requests.filter((r) =>
      r.command === "ssh-add" && r.args[0] !== "-L"
    );
    assertEquals(adds.length, 1);
    const ssh = requests.filter((r) => r.command === "ssh");
    assertEquals(
      ssh[0].args[ssh[0].args.indexOf("-i") + 1],
      ssh[1].args[ssh[1].args.indexOf("-i") + 1],
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("copy atomic: a prepare killed by timeout still gets its staging file removed", async () => {
  const h = harness(fleet({}));
  const rec = recording((req) =>
    Promise.resolve(
      req.args.at(-1)!.includes("set -C")
        ? { code: null, signal: "SIGTERM", stdout: "", stderr: "" }
        : { code: 0, signal: null, stdout: "", stderr: "" },
    )
  );
  setCommandExecutor(rec.executor);
  try {
    await assertRejects(() =>
      model.methods.copy.execute(
        model.methods.copy.arguments.parse({
          hosts: "all",
          src: "./f",
          dst: "/etc/f",
          direction: "to",
          atomic: true,
        }),
        h.ctx,
      )
    );
    assertEquals(rec.requests.map((r) => r.command), ["ssh", "ssh"]);
    assertStringIncludes(
      rec.requests[1].args.at(-1)!,
      "rm -f -- '/etc/.f.swamp-",
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("pinned: a remote command mentioning host keys is not a key change", async () => {
  const h = harness(fleet({ hostKeys: [KEY_A] }));
  setCommandExecutor(() =>
    Promise.resolve({
      code: 1,
      signal: null,
      stdout: "",
      stderr:
        "Host key verification failed.\nfatal: Could not read from remote repository.",
    })
  );
  try {
    // The nested git/ssh failure exits 1, which the caller allows.
    await model.methods.exec.execute(
      model.methods.exec.arguments.parse({
        hosts: "all",
        command: "git fetch",
        okExitCodes: [0, 1],
      }),
      h.ctx,
    );
    const run = h.writes.find((w) => w.specName === "runResult")!;
    assertEquals(run.data.error, undefined);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("tofu: a rejected first-contact key retires the master it may have opened", async () => {
  const pin = await pinFor("10.0.0.1", 22, KEY_B_B64);
  const h = harness(fleet({ hostKeyPolicy: "tofu" }));
  const requests: ExecRequest[] = [];
  const inner = acceptNew(KEY_A_B64, requests);
  setCommandExecutor(async (req) => {
    const out = await inner(req);
    if (!req.args.includes("-O")) h.resources.set(pin.name, pin.data);
    return out;
  });
  try {
    await assertRejects(() =>
      model.methods.exec.execute(
        model.methods.exec.arguments.parse({ hosts: "all", command: "true" }),
        h.ctx,
      )
    );
    const exit = requests.find((r) =>
      r.args[0] === "-O" && r.args[1] === "exit"
    );
    assert(exit !== undefined, "master retired");
    assertEquals(opt(exit, "ControlPath"), opt(requests[0], "ControlPath"));
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("tofu: a failed pin write retires the first-contact master and rethrows", async () => {
  const h = harness(fleet({ hostKeyPolicy: "tofu" }));
  const write = h.ctx.writeResource;
  h.ctx.writeResource = (spec, name, data, o) =>
    spec === "hostKeyPin"
      ? Promise.reject(new Error("datastore unavailable"))
      : write(spec, name, data, o);
  const requests: ExecRequest[] = [];
  setCommandExecutor(acceptNew(KEY_A_B64, requests));
  try {
    await assertRejects(
      () =>
        model.methods.exec.execute(
          model.methods.exec.arguments.parse({ hosts: "all", command: "true" }),
          h.ctx,
        ),
      Error,
      "datastore unavailable",
    );
    assert(requests.some((r) => r.args[0] === "-O" && r.args[1] === "exit"));
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("repin: a datastore read error is not mistaken for an unreadable pin", async () => {
  const h = harness(fleet({ hostKeyPolicy: "tofu" }));
  h.ctx.readResource = () => Promise.reject(new Error("datastore unavailable"));
  setCommandExecutor(acceptNew(KEY_A_B64));
  try {
    await assertRejects(
      () =>
        model.methods.repin.execute(
          model.methods.repin.arguments.parse({ hosts: "all" }),
          h.ctx,
        ),
      Error,
      "datastore unavailable",
    );
    assert(!h.writes.some((w) => w.specName === "hostKeyPin"));
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("identityContent agent: the shared agent is never forwarded", async () => {
  const h = harness(
    fleet({ identityContent: PEM_1, extraOptions: ["ForwardAgent=yes"] }),
  );
  const requests: ExecRequest[] = [];
  setCommandExecutor(agentExecutor(requests));
  try {
    await model.methods.exec.execute(
      model.methods.exec.arguments.parse({ hosts: "all", command: "true" }),
      h.ctx,
    );
    const ssh = requests.find((r) => r.command === "ssh")!;
    // ssh keeps the first value: ours must precede the user's.
    assertEquals(opt(ssh, "ForwardAgent"), "no");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("identityContent file mode: extraOptions are passed through unchanged", async () => {
  const h = harness(
    fleet({ identityContent: PEM_1, extraOptions: ["ForwardAgent=yes"] }, {
      identityContentMode: "file",
    }),
  );
  const rec = recording();
  setCommandExecutor(rec.executor);
  try {
    await model.methods.exec.execute(
      model.methods.exec.arguments.parse({ hosts: "all", command: "true" }),
      h.ctx,
    );
    assertEquals(opt(rec.requests[0], "ForwardAgent"), "yes");
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("pinned: an scp refusal (exit 1) is typed as host key changed", async () => {
  const h = harness(fleet({ hostKeys: [KEY_A] }));
  const presented = await computeFingerprint(KEY_B_B64);
  setCommandExecutor(() =>
    Promise.resolve({
      code: 1,
      signal: null,
      stdout: "",
      stderr: CHANGED_KEY_STDERR(presented) + "scp: Connection closed\n",
    })
  );
  try {
    const err = await assertRejects(() =>
      model.methods.copy.execute(
        model.methods.copy.arguments.parse({
          hosts: "all",
          src: "./f",
          dst: "/etc/f",
          direction: "to",
        }),
        h.ctx,
      )
    );
    assertStringIncludes((err as Error).message, `presented ${presented}`);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("copy atomic: verifySha256 with an unreadable src fails with a clear error", async () => {
  const h = harness(fleet({}));
  const rec = recording();
  setCommandExecutor(rec.executor);
  try {
    await assertRejects(
      () =>
        model.methods.copy.execute(
          model.methods.copy.arguments.parse({
            hosts: "all",
            src: "./definitely-missing",
            dst: "/etc/f",
            direction: "to",
            atomic: true,
            verifySha256: true,
          }),
          h.ctx,
        ),
      Error,
      "cannot read src './definitely-missing'",
    );
    assertEquals(rec.requests.length, 0);
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// Final review round
// ---------------------------------------------------------------------------

function atomicArgs() {
  return model.methods.copy.arguments.parse({
    hosts: "all",
    src: "./f",
    dst: "/etc/f",
    direction: "to",
    atomic: true,
  });
}

Deno.test("copy atomic: a finalize that never connected gets its staging file removed", async () => {
  const h = harness(fleet({}));
  const rec = recording((req) =>
    Promise.resolve(
      req.args.at(-1)!.includes("mv -f")
        ? {
          code: 255,
          signal: null,
          stdout: "",
          stderr: "ssh: connect to host 10.0.0.1 port 22: Connection timed out",
        }
        : { code: 0, signal: null, stdout: "", stderr: "" },
    )
  );
  setCommandExecutor(rec.executor);
  try {
    await assertRejects(() => model.methods.copy.execute(atomicArgs(), h.ctx));
    assertEquals(rec.requests.length, 4, "prepare, upload, finalize, cleanup");
    assertStringIncludes(
      rec.requests[3].args.at(-1)!,
      "rm -f -- '/etc/.f.swamp-",
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("copy atomic: a finalize whose script failed relies on its own trap", async () => {
  const h = harness(fleet({}));
  const rec = recording((req) =>
    Promise.resolve(
      req.args.at(-1)!.includes("mv -f")
        ? { code: 4, signal: null, stdout: "", stderr: "is a directory" }
        : { code: 0, signal: null, stdout: "", stderr: "" },
    )
  );
  setCommandExecutor(rec.executor);
  try {
    await assertRejects(() => model.methods.copy.execute(atomicArgs(), h.ctx));
    assertEquals(rec.requests.length, 3, "no extra cleanup");
  } finally {
    resetCommandExecutor();
  }
});

function failingPinWrites(h: ReturnType<typeof harness>) {
  const write = h.ctx.writeResource;
  h.ctx.writeResource = (spec, name, data, o) =>
    spec === "hostKeyPin"
      ? Promise.reject(new Error("datastore unavailable"))
      : write(spec, name, data, o);
}

Deno.test("tofu: a failed pin write still records every host's run", async () => {
  const h = harness(fleet({ hostKeyPolicy: "tofu" }));
  failingPinWrites(h);
  setCommandExecutor(acceptNew(KEY_A_B64));
  try {
    await assertRejects(
      () =>
        model.methods.exec.execute(
          model.methods.exec.arguments.parse({ hosts: "all", command: "true" }),
          h.ctx,
        ),
      Error,
      "datastore unavailable",
    );
    assert(h.writes.some((w) => w.specName === "runResult"));
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("repin: a failed pin write still retires the old master", async () => {
  const pin = await pinFor("10.0.0.1", 22, KEY_A_B64);
  const h = harness(fleet({ hostKeyPolicy: "tofu" }), {
    [pin.name]: pin.data,
  });
  failingPinWrites(h);
  const requests: ExecRequest[] = [];
  setCommandExecutor(acceptNew(KEY_B_B64, requests));
  try {
    await assertRejects(
      () =>
        model.methods.repin.execute(
          model.methods.repin.arguments.parse({ hosts: "all" }),
          h.ctx,
        ),
      Error,
      "datastore unavailable",
    );
    assert(requests.some((r) => r.args[0] === "-O" && r.args[1] === "exit"));
    assert(h.writes.some((w) => w.specName === "runResult"));
  } finally {
    resetCommandExecutor();
  }
});

/** Two tofu hosts; only web-1's pin write fails. */
function twoHostsFirstPinFails(
  seed: Record<string, Record<string, unknown>> = {},
) {
  const h = harness(
    fleet({ hostKeyPolicy: "tofu" }, {
      hosts: [
        { name: "web-1", address: "10.0.0.1" },
        { name: "web-2", address: "10.0.0.2" },
      ],
    }),
    seed,
  );
  const write = h.ctx.writeResource;
  h.ctx.writeResource = (spec, name, data, o) =>
    spec === "hostKeyPin" && o?.tags?.host === "web-1"
      ? Promise.reject(new Error("datastore unavailable"))
      : write(spec, name, data, o);
  return h;
}

/** `-O exit` requests aimed at `address`. */
function exitsFor(requests: ExecRequest[], address: string): ExecRequest[] {
  return requests.filter((r) =>
    r.args[0] === "-O" && r.args[1] === "exit" &&
    r.args.some((a) => a.endsWith(`@${address}`))
  );
}

Deno.test("tofu: a failed pin write does not stop later hosts being pinned", async () => {
  const h = twoHostsFirstPinFails();
  const requests: ExecRequest[] = [];
  setCommandExecutor(acceptNew(KEY_A_B64, requests));
  try {
    await assertRejects(
      () =>
        model.methods.exec.execute(
          model.methods.exec.arguments.parse({ hosts: "all", command: "true" }),
          h.ctx,
        ),
      Error,
      "datastore unavailable",
    );
    const pins = h.writes.filter((w) => w.specName === "hostKeyPin");
    assertEquals(pins.map((w) => w.tags?.host), ["web-2"]);
    // Only the unpinned master is retired; web-2's pinned master stays up.
    assertEquals(exitsFor(requests, "10.0.0.1").length, 1);
    assertEquals(exitsFor(requests, "10.0.0.2").length, 0);
    const runs = h.writes.filter((w) => w.specName === "runResult");
    assertEquals(runs.map((w) => w.tags?.host).sort(), ["web-1", "web-2"]);
    const run1 = runs.find((w) => w.tags?.host === "web-1")!;
    assertStringIncludes(String(run1.data.error), "datastore unavailable");
    const run2 = runs.find((w) => w.tags?.host === "web-2")!;
    assertEquals(run2.data.error ?? null, null);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("tofu: a failed pin write does not stop a later host's refusal being typed", async () => {
  const pin = await pinFor("10.0.0.2", 22, KEY_A_B64);
  const h = twoHostsFirstPinFails({ [pin.name]: pin.data });
  const presented = await computeFingerprint(KEY_B_B64);
  const accept = acceptNew(KEY_A_B64);
  setCommandExecutor((req) =>
    req.args.some((a) => a.endsWith("@10.0.0.2")) &&
      !(req.args[0] === "-O")
      ? Promise.resolve({
        code: 255,
        signal: null,
        stdout: "",
        stderr: CHANGED_KEY_STDERR(presented),
      })
      : accept(req)
  );
  try {
    await assertRejects(
      () =>
        model.methods.exec.execute(
          model.methods.exec.arguments.parse({ hosts: "all", command: "true" }),
          h.ctx,
        ),
      Error,
      "datastore unavailable",
    );
    const run2 = h.writes.find((w) =>
      w.specName === "runResult" && w.tags?.host === "web-2"
    )!;
    assertStringIncludes(
      String(run2.data.error),
      "host key changed for 10.0.0.2:22",
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("tofu: an unexpected settle error retires only the masters left unpinned", async () => {
  const h = harness(
    fleet({ hostKeyPolicy: "tofu" }, {
      hosts: [
        { name: "web-1", address: "10.0.0.1" },
        { name: "web-2", address: "10.0.0.2" },
      ],
    }),
  );
  const requests: ExecRequest[] = [];
  // web-2's recorded key is not valid base64, so fingerprinting it throws.
  setCommandExecutor(async (req) => {
    requests.push(req);
    const file = opt(req, "UserKnownHostsFile");
    const alias = opt(req, "HostKeyAlias");
    if (file && alias && opt(req, "StrictHostKeyChecking") === "accept-new") {
      const b64 = req.args.some((a) => a.endsWith("@10.0.0.2"))
        ? "A"
        : KEY_A_B64;
      await Deno.writeTextFile(file, `${alias} ssh-ed25519 ${b64}\n`);
    }
    return await ok();
  });
  try {
    await assertRejects(() =>
      model.methods.exec.execute(
        model.methods.exec.arguments.parse({ hosts: "all", command: "true" }),
        h.ctx,
      )
    );
    const pins = h.writes.filter((w) => w.specName === "hostKeyPin");
    assertEquals(pins.map((w) => w.tags?.host), ["web-1"]);
    assertEquals(exitsFor(requests, "10.0.0.1").length, 0);
    assertEquals(exitsFor(requests, "10.0.0.2").length, 1);
    assertEquals(
      h.writes.filter((w) => w.specName === "runResult").length,
      2,
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("open: a failed pin write audits only that host's master as an error", async () => {
  const h = twoHostsFirstPinFails();
  const requests: ExecRequest[] = [];
  setCommandExecutor(acceptNew(KEY_A_B64, requests));
  try {
    await assertRejects(
      () =>
        model.methods.open.execute(
          model.methods.open.arguments.parse({ hosts: "all" }),
          h.ctx,
        ),
      Error,
      "datastore unavailable",
    );
    const pins = h.writes.filter((w) => w.specName === "hostKeyPin");
    assertEquals(pins.map((w) => w.tags?.host), ["web-2"]);
    const audit = (host: string) =>
      h.writes.find((w) =>
        w.specName === "masterAudit" && w.name === `masterAudit-${host}`
      )!.data.outcome;
    assertEquals(audit("web-1"), "error");
    assertEquals(audit("web-2"), "ok");
    assertEquals(exitsFor(requests, "10.0.0.2").length, 0);
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("tofu: an unsupported key algorithm is refused instead of pinned", async () => {
  const h = harness(fleet({ hostKeyPolicy: "tofu" }));
  setCommandExecutor(async (req) => {
    const file = opt(req, "UserKnownHostsFile");
    const alias = opt(req, "HostKeyAlias");
    if (file && alias) {
      await Deno.writeTextFile(file, `${alias} ssh-future-2030 ${KEY_A_B64}\n`);
    }
    return await ok();
  });
  try {
    await assertRejects(
      () =>
        model.methods.exec.execute(
          model.methods.exec.arguments.parse({ hosts: "all", command: "true" }),
          h.ctx,
        ),
      Error,
      "unsupported host key algorithm 'ssh-future-2030'",
    );
    assert(!h.writes.some((w) => w.specName === "hostKeyPin"));
  } finally {
    resetCommandExecutor();
  }
});
