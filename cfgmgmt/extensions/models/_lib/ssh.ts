// Copyright (C) 2026 Adam Jacob
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

// ControlMaster sockets live in a per-user directory under /tmp (a short
// path: unix socket paths are capped near 104 bytes). Whoever holds a socket
// can run commands on the remote host, so the directory must be ours and
// closed to everyone else before we put a socket in it.
let socketDirPromise: Promise<string> | undefined;

function socketDir(): Promise<string> {
  socketDirPromise ??= prepareSocketDir().catch((err) => {
    socketDirPromise = undefined;
    throw err;
  });
  return socketDirPromise;
}

async function currentUid(): Promise<number | null> {
  const probe = await Deno.makeTempFile({ prefix: "cfgmgmt-uid-" });
  try {
    return (await Deno.stat(probe)).uid;
  } finally {
    await Deno.remove(probe).catch(() => {});
  }
}

/**
 * Creates (or checks) this user's private control-socket directory under
 * `base` and returns its path.
 */
export async function prepareSocketDir(base = "/tmp"): Promise<string> {
  const uid = await currentUid();
  const dir = `${base}/cfgmgmt-ssh-${uid ?? "user"}`;
  try {
    await Deno.mkdir(dir, { mode: 0o700 });
  } catch (err) {
    if (!(err instanceof Deno.errors.AlreadyExists)) throw err;
  }
  const info = await Deno.lstat(dir);
  if (!info.isDirectory || info.isSymlink) {
    throw new Error(`SSH socket directory ${dir} is not a directory`);
  }
  if (uid !== null && info.uid !== uid) {
    throw new Error(`SSH socket directory ${dir} is owned by another user`);
  }
  if (info.mode !== null && (info.mode & 0o077) !== 0) {
    throw new Error(
      `SSH socket directory ${dir} is accessible to other users (mode ${
        (info.mode & 0o777).toString(8)
      })`,
    );
  }
  return dir;
}

/** A multiplexed connection to one host: where its control socket lives and how to address it. */
export interface SshConn {
  host: string;
  port: number;
  username: string;
  identityFile?: string;
  socketPath: string;
  strictHostKeyChecking: string;
}

const POOL_KEY = "__cfgmgmt_ssh_pool";
(globalThis as Record<string, unknown>)[POOL_KEY] =
  (globalThis as Record<string, unknown>)[POOL_KEY] ||
  new Map<string, SshConn>();

const INFLIGHT_KEY = "__cfgmgmt_ssh_inflight";
(globalThis as Record<string, unknown>)[INFLIGHT_KEY] =
  (globalThis as Record<string, unknown>)[INFLIGHT_KEY] ||
  new Map<string, Promise<SshConn>>();

function pool(): Map<string, SshConn> {
  return (globalThis as Record<string, unknown>)[POOL_KEY] as Map<
    string,
    SshConn
  >;
}

function inflight(): Map<string, Promise<SshConn>> {
  return (globalThis as Record<string, unknown>)[INFLIGHT_KEY] as Map<
    string,
    Promise<SshConn>
  >;
}

/** Where and how to connect: host, port, user, identity file and host-key policy. */
export interface ConnectOpts {
  host: string;
  port?: number;
  username: string;
  privateKeyPath?: string;
  strictHostKeyChecking?: string;
}

async function checkMaster(
  socketPath: string,
  target: string,
): Promise<boolean> {
  try {
    // swamp-quality-ignore deno-command
    const cmd = new Deno.Command("ssh", {
      args: ["-o", `ControlPath=${socketPath}`, "-O", "check", target],
      stdout: "null",
      stderr: "null",
    });
    return (await cmd.output()).code === 0;
  } catch {
    return false;
  }
}

// FNV-1a: a short, stable tag that keeps connections with different identity
// files or host-key policies on separate control sockets.
function connectionTag(identityFile: string | undefined, policy: string) {
  let h = 0x811c9dc5;
  for (const ch of `${identityFile ?? ""}\0${policy}`) {
    h ^= ch.codePointAt(0)!;
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, "0");
}

const HOST_PATTERN = /^[A-Za-z0-9_.:[\]][A-Za-z0-9_.:[\]-]*$/;
const USER_PATTERN = /^[A-Za-z0-9_][A-Za-z0-9_.-]*$/;

/**
 * Rejects connection settings ssh could read as something else. The target
 * goes to ssh as one `user@host` argument, so a host or user starting with
 * `-` would be parsed as an option (`-oProxyCommand=...` runs a local
 * command); host and user also name the control socket file.
 */
export function validateConnectOpts(opts: ConnectOpts): void {
  if (!HOST_PATTERN.test(opts.host)) {
    throw new Error(
      `Invalid SSH host ${
        JSON.stringify(opts.host)
      }: use a hostname or IP address (letters, digits, '.', '-', ':', '_')`,
    );
  }
  if (!USER_PATTERN.test(opts.username)) {
    throw new Error(
      `Invalid SSH user ${
        JSON.stringify(opts.username)
      }: use letters, digits, '_', '.', '-', not starting with '-' or '.'`,
    );
  }
  const port = opts.port ?? 22;
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid SSH port ${port}: use an integer from 1 to 65535`);
  }
}

/**
 * Returns a multiplexed connection to `user@host:port`, reusing a live
 * ControlMaster socket when there is one and starting one when there is not.
 */
export function getConnection(opts: ConnectOpts): Promise<SshConn> {
  try {
    validateConnectOpts(opts);
  } catch (err) {
    return Promise.reject(err);
  }
  const port = opts.port ?? 22;
  const tag = connectionTag(
    opts.privateKeyPath,
    opts.strictHostKeyChecking ?? "accept-new",
  );
  const key = `${opts.host}:${port}:${opts.username}:${tag}`;

  // If another in-process caller is already establishing this connection, wait
  const pending = inflight().get(key);
  if (pending) return pending;

  const promise = _establishConnection(opts, key, port);
  inflight().set(key, promise);
  // Clean up on either outcome without forking a second promise: a bare
  // `.finally()` copy would reject unhandled when the connection fails, and
  // an unhandled rejection takes the whole process down.
  const forget = () => {
    inflight().delete(key);
  };
  promise.then(forget, forget);
  return promise;
}

/** A short, stable, fixed-length socket file name for a connection key. */
async function socketName(key: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(key),
  );
  return Array.from(new Uint8Array(digest).slice(0, 10))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// ssh failures that waiting will not fix: retrying them only delays the
// error by minutes. Anything else (refused, timed out, reset) is retried.
const PERMANENT_SSH_ERROR =
  /Permission denied|Host key verification failed|REMOTE HOST IDENTIFICATION HAS CHANGED|Could not resolve hostname|Too many authentication failures|no such identity|Bad configuration option|Bad port|too long for Unix domain socket/i;

async function _establishConnection(
  opts: ConnectOpts,
  key: string,
  port: number,
): Promise<SshConn> {
  const target = `${opts.username}@${opts.host}`;
  const hostKeyCheck = opts.strictHostKeyChecking ?? "accept-new";
  const existing = pool().get(key);
  if (existing && await checkMaster(existing.socketPath, target)) {
    return existing;
  }
  pool().delete(key);

  // A fixed-length name: unix socket paths are capped near 104 bytes, and a
  // long hostname plus ssh's temporary suffix would otherwise exceed it.
  const socketPath = `${await socketDir()}/${await socketName(key)}`;
  const conn: SshConn = {
    host: opts.host,
    port,
    username: opts.username,
    identityFile: opts.privateKeyPath,
    socketPath,
    strictHostKeyChecking: hostKeyCheck,
  };

  if (await checkMaster(socketPath, target)) {
    pool().set(key, conn);
    return conn;
  }

  const sshArgs: string[] = [
    "-M",
    "-N",
    "-f",
    "-o",
    `ControlPath=${socketPath}`,
    "-o",
    "ControlPersist=600",
    "-p",
    String(port),
    "-o",
    `StrictHostKeyChecking=${hostKeyCheck}`,
    "-o",
    "BatchMode=yes",
    "-o",
    "ConnectTimeout=10",
  ];
  if (opts.privateKeyPath) sshArgs.push("-i", opts.privateKeyPath);
  sshArgs.push(target);

  const maxRetries = 9;
  const baseDelay = 15000;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    // Clean up stale socket (checkMaster already failed above)
    try {
      await Deno.remove(socketPath);
    } catch { /* ok if missing */ }
    // swamp-quality-ignore deno-command
    const cmd = new Deno.Command("ssh", {
      args: sshArgs,
      stdout: "piped",
      stderr: "piped",
    });
    const output = await cmd.output();
    if (output.code === 0) break;
    // Another process may have won the race and created the master
    if (await checkMaster(socketPath, target)) break;
    const stderr = new TextDecoder().decode(output.stderr);
    if (PERMANENT_SSH_ERROR.test(stderr)) {
      throw new Error(`SSH connection to ${target} failed: ${stderr.trim()}`);
    }
    if (attempt === maxRetries) {
      throw new Error(
        `SSH ControlMaster failed for ${key} after ${
          maxRetries + 1
        } attempts: ${stderr}`,
      );
    }
    await new Promise((r) =>
      setTimeout(r, baseDelay + Math.floor(Math.random() * 5000))
    );
  }

  pool().set(key, conn);
  return conn;
}

/** A remote command's captured output and exit code. */
export interface ExecResult {
  stdout: string;
  stderr: string;
  exitCode: number;
}

/** Runs `command` on the host through its control socket, optionally writing `stdinData` to the remote command's stdin. */
export async function exec(
  conn: SshConn,
  command: string,
  opts?: { stdinData?: string },
): Promise<ExecResult> {
  const args = [
    "-o",
    `ControlPath=${conn.socketPath}`,
    "-p",
    String(conn.port),
    "-o",
    `StrictHostKeyChecking=${conn.strictHostKeyChecking}`,
    "-o",
    "BatchMode=yes",
  ];
  if (conn.identityFile) args.push("-i", conn.identityFile);
  args.push(`${conn.username}@${conn.host}`, command);

  if (opts?.stdinData) {
    // swamp-quality-ignore deno-command
    const proc = new Deno.Command("ssh", {
      args,
      stdin: "piped",
      stdout: "piped",
      stderr: "piped",
    }).spawn();
    const writer = proc.stdin.getWriter();
    try {
      await writer.write(new TextEncoder().encode(opts.stdinData));
      await writer.close();
    } catch {
      // ssh exited before reading stdin; its own status and stderr, read
      // below, say why (and reading them drains the pipes).
    }
    const output = await proc.output();
    return sshResult(conn, output);
  }

  // swamp-quality-ignore deno-command
  const cmd = new Deno.Command("ssh", {
    args,
    // Never hand the remote command swamp's own stdin.
    stdin: "null",
    stdout: "piped",
    stderr: "piped",
  });
  const output = await cmd.output();
  return sshResult(conn, output);
}

/**
 * ssh exits 255 for its own failures (connection lost, master gone, host
 * unreachable) and passes the remote command's status through otherwise.
 * A 255 is therefore never a probe answer: reading its empty output as
 * "absent" would make a dropped connection look like a compliant host.
 */
function sshResult(conn: SshConn, output: Deno.CommandOutput): ExecResult {
  const stderr = new TextDecoder().decode(output.stderr);
  if (output.code === 255) {
    throw new Error(
      `ssh to ${conn.username}@${conn.host} failed: ${
        stderr.trim() || "connection error"
      }`,
    );
  }
  return {
    stdout: new TextDecoder().decode(output.stdout),
    stderr,
    exitCode: output.code,
  };
}

/** Uploads `content` to `remotePath` with scp, as the SSH user. */
export async function writeFile(
  conn: SshConn,
  remotePath: string,
  content: string,
): Promise<void> {
  const tmpFile = await Deno.makeTempFile();
  try {
    await Deno.writeTextFile(tmpFile, content);
    const args = [
      "-o",
      `ControlPath=${conn.socketPath}`,
      "-P",
      String(conn.port),
      "-o",
      `StrictHostKeyChecking=${conn.strictHostKeyChecking}`,
      "-o",
      "BatchMode=yes",
    ];
    if (conn.identityFile) args.push("-i", conn.identityFile);
    args.push(tmpFile, `${conn.username}@${conn.host}:${remotePath}`);

    // swamp-quality-ignore deno-command
    const cmd = new Deno.Command("scp", {
      args,
      stdout: "piped",
      stderr: "piped",
    });
    const output = await cmd.output();
    if (output.code !== 0) {
      const stderr = new TextDecoder().decode(output.stderr);
      throw new Error(`scp to ${remotePath} failed: ${stderr}`);
    }
  } finally {
    await Deno.remove(tmpFile).catch(() => {});
  }
}

/** Privilege escalation for a command: whether to use sudo, as whom, and the sudo password (sent on stdin). */
export interface BecomeOpts {
  become?: boolean;
  becomeUser?: string;
  becomePassword?: string;
}

/** Single-quotes `s` for a POSIX shell, so it reaches the remote command as one literal word. */
export function shellEscape(s: string): string {
  return "'" + s.replace(/'/g, "'\\''") + "'";
}

/**
 * Printed by the shell sudo starts, before the command runs. Its absence
 * means sudo itself failed (wrong password, no sudo rights), which must not
 * pass for the command's own empty output or non-zero status.
 */
export const SUDO_OK = "__swamp_sudo_ok__";

/** Runs `command` on the host, through `sudo -u <becomeUser> -- sh -c` when `become` is set. */
export async function execSudo(
  conn: SshConn,
  command: string,
  opts?: BecomeOpts,
): Promise<ExecResult> {
  if (!opts?.become) return exec(conn, command);
  const user = opts.becomeUser || "root";
  // stdin goes to /dev/null before the command: when sudo does not prompt
  // (NOPASSWD, a cached timestamp) the password line is still unread on it,
  // and a command reading stdin must never see it.
  const escaped = shellEscape(
    `printf '%s\\n' ${SUDO_OK}; exec </dev/null; ${command}`,
  );
  const result = opts.becomePassword
    ? await exec(
      conn,
      `sudo -S -p '' -u ${shellEscape(user)} -- sh -c ${escaped}`,
      { stdinData: opts.becomePassword + "\n" },
    )
    : await exec(
      conn,
      `sudo -n -u ${shellEscape(user)} -- sh -c ${escaped}`,
    );
  const marker = `${SUDO_OK}\n`;
  if (!result.stdout.startsWith(marker)) {
    throw new Error(
      `sudo as ${user} failed (exit ${result.exitCode}): ${
        result.stderr.trim() || "no output"
      }`,
    );
  }
  return { ...result, stdout: result.stdout.slice(marker.length) };
}

/**
 * Moves a file staged in /tmp into place as `owner` (the become user, or the
 * SSH user without become).
 *
 * The content is copied next to the destination and renamed over it, so
 * readers never see a partial file. An existing destination keeps its owner
 * and mode; when its owner cannot be kept (the SSH user writing a file it
 * does not own) or the rename is refused (a bind-mounted file such as a
 * container's /etc/hosts), the content is written in place instead. A new
 * file is owned by `owner`.
 */
export function installStagedScript(
  staged: string,
  remotePath: string,
  owner: string,
): string {
  return [
    "set -e",
    `tmp=${shellEscape(staged)}`,
    `dest=${shellEscape(remotePath)}`,
    // A symlink is written through: the file it points at gets the content
    // and keeps its owner and mode, and the link stays (a distro's
    // /etc/resolv.conf). Reading the link's own mode instead would give 0777.
    // Only a link root or the installing user owns is followed: anyone else's
    // link could point a root write at a file of their choosing.
    'if [ -L "$dest" ]; then',
    '  lu=$(stat -c %u "$dest" 2>/dev/null || stat -f %u "$dest")',
    '  if [ "$lu" != 0 ] && [ "$lu" != "$(id -u)" ]; then',
    '    echo "refusing to write through $dest: a symlink owned by uid $lu" >&2',
    "    exit 1",
    "  fi",
    '  dest=$(readlink -f -- "$dest")',
    "fi",
    'new=""',
    // The staged file may sit in the SSH user's private staging dir, which
    // the become user can read from but not delete in; the caller removes it.
    'trap \'rm -f "$tmp" 2>/dev/null || true; if [ -n "$new" ]; then rm -f "$new" 2>/dev/null || true; fi\' EXIT',
    // An unpredictable name: a planted symlink at a guessable one would make
    // the copy below write wherever it points.
    'new=$(mktemp "$dest.swamp-new.XXXXXX")',
    'cp "$tmp" "$new"',
    'if [ -e "$dest" ]; then',
    '  own=$(stat -L -c %u:%g "$dest" 2>/dev/null || stat -L -f %u:%g "$dest")',
    '  mode=$(stat -L -c %a "$dest" 2>/dev/null || stat -L -f %Lp "$dest")',
    '  if ! chown "$own" "$new" 2>/dev/null; then cat "$tmp" > "$dest"; exit 0; fi',
    '  chmod "$mode" "$new"',
    "else",
    `  chown ${shellEscape(owner)} "$new"`,
    `  chgrp "$(id -gn ${shellEscape(owner)})" "$new"`,
    '  chmod 0644 "$new"',
    "fi",
    'if ! mv -f "$new" "$dest" 2>/dev/null; then cat "$new" > "$dest"; fi',
  ].join("\n");
}

async function installStaged(
  conn: SshConn,
  staged: string,
  remotePath: string,
  opts: BecomeOpts | undefined,
  label: string,
): Promise<void> {
  const owner = opts?.become ? opts.becomeUser || "root" : conn.username;
  const result = await execSudo(
    conn,
    installStagedScript(staged, remotePath, owner),
    opts,
  );
  // The staged file is removed by withStagedUpload, on success or failure.
  if (result.exitCode !== 0) {
    throw new Error(
      `${label} to ${remotePath} failed (exit ${result.exitCode})${
        result.stderr.trim() ? `: ${result.stderr.trim()}` : ""
      }`,
    );
  }
}

/**
 * Uploads through a staging file in /tmp (a plain name scp never has to
 * quote), runs `install` with its path, and removes it afterwards.
 *
 * The SSH user owns the staged file and it is mode 0600, which root and the
 * SSH user itself can read. A non-root become user cannot, so for one the
 * file goes in a fresh 0711 directory with an unguessable name and is made
 * 0644: reachable by path, not listable, and gone when the install is done.
 */
async function withStagedUpload(
  conn: SshConn,
  opts: BecomeOpts | undefined,
  upload: (staged: string) => Promise<void>,
  install: (staged: string) => Promise<void>,
): Promise<void> {
  const id = crypto.randomUUID();
  const becomeUser = opts?.become ? opts.becomeUser || "root" : null;
  if (becomeUser === null || becomeUser === "root") {
    const staged = `/tmp/.swamp-upload-${id}`;
    try {
      await upload(staged);
      await install(staged);
    } finally {
      await exec(conn, `rm -f ${shellEscape(staged)}`).catch(() => {});
    }
    return;
  }
  const dir = `/tmp/.swamp-stage-${id}`;
  const staged = `${dir}/upload`;
  const made = await exec(conn, `mkdir -m 0711 ${shellEscape(dir)}`);
  if (made.exitCode !== 0) {
    throw new Error(`creating staging dir ${dir} failed: ${made.stderr}`);
  }
  try {
    await upload(staged);
    const shared = await exec(conn, `chmod 0644 ${shellEscape(staged)}`);
    if (shared.exitCode !== 0) {
      throw new Error(`chmod of staged upload failed: ${shared.stderr}`);
    }
    await install(staged);
  } finally {
    await exec(conn, `rm -rf ${shellEscape(dir)}`).catch(() => {});
  }
}

/**
 * Stages `content` in a file the become user (or the SSH user) can read, runs
 * `use` with its path, and removes it afterwards, whether `use` succeeds or
 * throws. For commands that take a file argument, such as `crontab`.
 */
export function withStagedContent(
  conn: SshConn,
  content: string,
  opts: BecomeOpts | undefined,
  use: (staged: string) => Promise<void>,
): Promise<void> {
  return withStagedUpload(
    conn,
    opts,
    (staged) => writeFile(conn, staged, content),
    use,
  );
}

/**
 * Writes `content` to `remotePath`: staged in /tmp, then renamed into place as
 * the become user when `become` is set, or as the SSH user otherwise.
 */
export async function writeFileAs(
  conn: SshConn,
  remotePath: string,
  content: string,
  opts?: BecomeOpts,
): Promise<void> {
  await withStagedUpload(
    conn,
    opts,
    (staged) => writeFile(conn, staged, content),
    (staged) => installStaged(conn, staged, remotePath, opts, "writeFileAs"),
  );
}

/** Copies a local file to `remotePath` with scp, as the SSH user. */
export async function scpFile(
  conn: SshConn,
  localPath: string,
  remotePath: string,
): Promise<void> {
  const args = [
    "-o",
    `ControlPath=${conn.socketPath}`,
    "-P",
    String(conn.port),
    "-o",
    `StrictHostKeyChecking=${conn.strictHostKeyChecking}`,
    "-o",
    "BatchMode=yes",
  ];
  if (conn.identityFile) args.push("-i", conn.identityFile);
  args.push(localPath, `${conn.username}@${conn.host}:${remotePath}`);

  // swamp-quality-ignore deno-command
  const cmd = new Deno.Command("scp", {
    args,
    stdout: "piped",
    stderr: "piped",
  });
  const output = await cmd.output();
  if (output.code !== 0) {
    const stderr = new TextDecoder().decode(output.stderr);
    throw new Error(`scp ${localPath} to ${remotePath} failed: ${stderr}`);
  }
}

/**
 * Copies a local file to `remotePath`: staged in /tmp, then renamed into place
 * as the become user when `become` is set, or as the SSH user otherwise.
 */
export async function scpFileAs(
  conn: SshConn,
  localPath: string,
  remotePath: string,
  opts?: BecomeOpts,
): Promise<void> {
  await withStagedUpload(
    conn,
    opts,
    (staged) => scpFile(conn, localPath, staged),
    (staged) => installStaged(conn, staged, remotePath, opts, "scpFileAs"),
  );
}

/** Closes every control-master connection this process opened. */
export function closeAll(): void {
  for (const conn of pool().values()) {
    try {
      // swamp-quality-ignore deno-command
      new Deno.Command("ssh", {
        args: [
          "-o",
          `ControlPath=${conn.socketPath}`,
          "-O",
          "exit",
          `${conn.username}@${conn.host}`,
        ],
        stdout: "null",
        stderr: "null",
      }).outputSync();
    } catch {
      // ignore close errors
    }
  }
  pool().clear();
}
