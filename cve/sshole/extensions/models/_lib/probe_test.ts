import { assert, assertEquals } from "jsr:@std/assert@1.0.19";
import { PROBE_FUNCTIONS, PROBE_MAIN, PROBE_SCRIPT } from "./probe.ts";

async function sh(args: string[], stdin?: string) {
  const child = new Deno.Command("sh", {
    args,
    stdin: stdin !== undefined ? "piped" : "null",
    stdout: "piped",
    stderr: "piped",
  }).spawn();
  if (stdin !== undefined) {
    const w = child.stdin.getWriter();
    await w.write(new TextEncoder().encode(stdin));
    await w.close();
  }
  const out = await child.output();
  return {
    code: out.code,
    stdout: new TextDecoder().decode(out.stdout).trim(),
    stderr: new TextDecoder().decode(out.stderr).trim(),
  };
}

/** Runs the probe's shell functions with SSHOLE_ROOT at a fixture tree. */
async function call(root: string, command: string): Promise<string> {
  const res = await sh([
    "-c",
    `${PROBE_FUNCTIONS}\nSSHOLE_ROOT='${root}'\n${command}`,
  ]);
  assertEquals(res.code, 0, res.stderr);
  return res.stdout;
}

/** Writes files (path -> content) under a fresh temp root. */
async function tree(files: Record<string, string>): Promise<string> {
  const root = await Deno.makeTempDir({ prefix: "sshole-probe-" });
  for (const [path, content] of Object.entries(files)) {
    const full = `${root}${path}`;
    await Deno.mkdir(full.slice(0, full.lastIndexOf("/")), { recursive: true });
    await Deno.writeTextFile(full, content);
  }
  return root;
}

async function withTree(
  files: Record<string, string>,
  fn: (root: string) => Promise<void>,
) {
  const root = await tree(files);
  try {
    await fn(root);
  } finally {
    await Deno.remove(root, { recursive: true });
  }
}

Deno.test("the probe parses as POSIX sh", async () => {
  const res = await sh(["-n"], PROBE_SCRIPT);
  assertEquals(res.code, 0, res.stderr);
});

Deno.test("PROBE_SCRIPT is the functions then the main probe, which clears SSHOLE_ROOT first", () => {
  assertEquals(PROBE_SCRIPT, PROBE_FUNCTIONS + PROBE_MAIN);
  assert(PROBE_MAIN.startsWith("SSHOLE_ROOT=\n"));
  assert(!/SSHOLE_ROOT=/.test(PROBE_FUNCTIONS));
});

Deno.test("an inherited SSHOLE_ROOT cannot move the probe's paths", async () => {
  // The fixture's config has a Match block and AllowUsers; the probe must
  // report the real host's config, exactly as with SSHOLE_ROOT unset.
  await withTree({
    "/etc/ssh/sshd_config": "AllowUsers fixture\nMatch All\n",
  }, async (root) => {
    const real = await call("", "sshole_has_match; sshole_has_access_rules");
    const res = await sh([
      "-c",
      `export SSHOLE_ROOT='${root}'; ${PROBE_SCRIPT}`,
    ]);
    assert(res.stdout.includes("SSHOLE_DONE=1"), res.stderr);
    const got = ["MATCH_BLOCKS", "ACCESS_RULES"].map((k) =>
      res.stdout.split("\n").find((l) => l.startsWith(`SSHOLE_${k}=`))
        ?.split("=")[1]
    );
    assertEquals(got.join("\n"), real);
  });
});

Deno.test("Include: drop-ins spliced where they appear, first value wins, Keyword=value", async () => {
  await withTree({
    "/etc/ssh/sshd_config":
      "Include /etc/ssh/sshd_config.d/*.conf\nPasswordAuthentication yes\n",
    "/etc/ssh/sshd_config.d/10-a.conf": "PasswordAuthentication=no\n",
    "/etc/ssh/sshd_config.d/20-b.conf": "PasswordAuthentication yes\n",
  }, async (root) => {
    assertEquals(
      await call(root, "sshole_first_value passwordauthentication"),
      "no",
    );
  });
});

Deno.test("Include: relative paths are under /etc/ssh and nest", async () => {
  await withTree({
    "/etc/ssh/sshd_config": "Include extra/*.conf\n",
    "/etc/ssh/extra/a.conf": "  include nested.conf\n",
    "/etc/ssh/nested.conf": "UsePAM yes\n",
  }, async (root) => {
    assertEquals(await call(root, "sshole_first_value usepam"), "yes");
  });
});

Deno.test("Include outside sshd_config.d: its Match block is seen", async () => {
  await withTree({
    "/etc/ssh/sshd_config":
      "PasswordAuthentication no\nInclude /opt/ssh/custom.conf\n",
    "/opt/ssh/custom.conf":
      "Match Address 10.0.0.0/8\n  PasswordAuthentication yes\n",
  }, async (root) => {
    assertEquals(await call(root, "sshole_has_match"), "yes");
    assertEquals(
      await call(root, "sshole_first_value passwordauthentication"),
      "no",
    );
  });
  await withTree({ "/etc/ssh/sshd_config": "UsePAM no\n" }, async (root) => {
    assertEquals(await call(root, "sshole_has_match"), "no");
  });
});

Deno.test("values after the first Match are not global", async () => {
  await withTree({
    "/etc/ssh/sshd_config": "Match Group wheel\n  PasswordAuthentication no\n",
  }, async (root) => {
    assertEquals(
      await call(root, "sshole_first_value passwordauthentication"),
      "",
    );
  });
});

Deno.test("access rules are found in any included file", async () => {
  await withTree({
    "/etc/ssh/sshd_config": "Include /etc/ssh/users.conf\n",
    "/etc/ssh/users.conf": "AllowUsers admin\n",
  }, async (root) => {
    assertEquals(await call(root, "sshole_has_access_rules"), "yes");
  });
  await withTree({ "/etc/ssh/sshd_config": "UsePAM no\n" }, async (root) => {
    assertEquals(await call(root, "sshole_has_access_rules"), "no");
  });
});

Deno.test("an Include loop stops at the depth limit", async () => {
  await withTree({
    "/etc/ssh/sshd_config": "UsePAM yes\nInclude /etc/ssh/sshd_config\n",
  }, async (root) => {
    const out = await call(root, "sshole_config | grep -c UsePAM");
    assertEquals(out, "9");
  });
});

const OPENRC_INIT = [
  "update_command() {",
  "\telif conf_enabled UsePAM && [ -r /usr/sbin/sshd.pam ]; then",
  '\t\tcommand="${SSHD_BINARY:-"/usr/sbin/sshd.pam"}"',
  "}",
].join("\n");

Deno.test("Alpine OpenRC rule: sshd.pam when UsePAM yes, else sshd", async () => {
  const base = {
    "/etc/init.d/sshd": OPENRC_INIT,
    "/usr/sbin/sshd.pam": "",
  };
  await withTree(
    { ...base, "/etc/ssh/sshd_config": "UsePAM yes\n" },
    async (root) => {
      assertEquals(
        await call(root, "sshole_openrc_sshd"),
        "/usr/sbin/sshd.pam",
      );
    },
  );
  await withTree(
    {
      ...base,
      // sshd_config always exists on Alpine (the init script requires it).
      "/etc/ssh/sshd_config": "Port 22\n",
      "/etc/ssh/sshd_config.d/x.conf": "UsePAM yes\n",
    },
    async (root) => {
      assertEquals(
        await call(root, "sshole_openrc_sshd"),
        "/usr/sbin/sshd.pam",
      );
    },
  );
  // Alpine's get_conf matches the keyword at the start of the line, exact case.
  for (const conf of ["UsePAM no\n", "  UsePAM yes\n", "usepam yes\n", ""]) {
    await withTree(
      { ...base, "/etc/ssh/sshd_config": conf },
      async (root) => {
        assertEquals(
          await call(root, "sshole_openrc_sshd"),
          "/usr/sbin/sshd",
          JSON.stringify(conf),
        );
      },
    );
  }
});

Deno.test("Alpine OpenRC rule: SSHD_BINARY wins; no rule without the init script's selection", async () => {
  await withTree({
    "/etc/init.d/sshd": OPENRC_INIT,
    "/etc/conf.d/sshd": 'SSHD_BINARY="/usr/local/sbin/sshd"\n',
    "/etc/ssh/sshd_config": "UsePAM yes\n",
    "/usr/sbin/sshd.pam": "",
  }, async (root) => {
    assertEquals(
      await call(root, "sshole_openrc_sshd"),
      "/usr/local/sbin/sshd",
    );
  });
  await withTree({
    "/etc/init.d/sshd": "#!/sbin/openrc-run\ncommand=/usr/sbin/sshd\n",
    "/etc/ssh/sshd_config": "UsePAM yes\n",
    "/usr/sbin/sshd.pam": "",
  }, async (root) => {
    assertEquals(await call(root, "sshole_openrc_sshd"), "");
  });
});

/** A fake /proc: pid -> [exe, mount namespace]; "self" is the probe. */
async function procTree(
  procs: Record<string, [string, string]>,
): Promise<string> {
  const root = await tree({});
  for (const [pid, [exe, ns]] of Object.entries(procs)) {
    await Deno.mkdir(`${root}/proc/${pid}/ns`, { recursive: true });
    if (exe) await Deno.symlink(exe, `${root}/proc/${pid}/exe`);
    await Deno.symlink(ns, `${root}/proc/${pid}/ns/mnt`);
  }
  return root;
}

Deno.test("the running sshd listener is found, (deleted) kept for the caller", async () => {
  const root = await procTree({
    self: ["", "mnt:[1]"],
    7: ["/usr/lib/ssh/sshd-session", "mnt:[1]"],
    42: ["/usr/sbin/sshd.pam (deleted)", "mnt:[1]"],
  });
  try {
    assertEquals(
      await call(root, "sshole_running_sshd"),
      "/usr/sbin/sshd.pam (deleted)",
    );
  } finally {
    await Deno.remove(root, { recursive: true });
  }
});

Deno.test("a user's own 'sshd' is never picked (a root scan would run it)", async () => {
  const root = await procTree({
    self: ["", "mnt:[1]"],
    10: ["/home/eve/sshd", "mnt:[1]"],
    11: ["/tmp/x/sshd.pam", "mnt:[1]"],
    12: ["/usr/local/sbin/sshd", "mnt:[1]"],
  });
  try {
    assertEquals(await call(root, "sshole_running_sshd"), "");
  } finally {
    await Deno.remove(root, { recursive: true });
  }
});

Deno.test("an sshd in another mount namespace (a container) is skipped", async () => {
  const root = await procTree({
    self: ["", "mnt:[1]"],
    20: ["/usr/sbin/sshd.pam", "mnt:[2]"],
    30: ["/usr/sbin/sshd", "mnt:[1]"],
  });
  try {
    assertEquals(await call(root, "sshole_running_sshd"), "/usr/sbin/sshd");
  } finally {
    await Deno.remove(root, { recursive: true });
  }
});

Deno.test("SSHD_BINARY with a trailing comment, and quoted Include paths", async () => {
  await withTree({
    "/etc/init.d/sshd": OPENRC_INIT,
    "/etc/conf.d/sshd": 'SSHD_BINARY="/usr/sbin/sshd.pam" # pam build\n',
    "/etc/ssh/sshd_config": 'Include "/etc/ssh/q.conf"\n',
    "/etc/ssh/q.conf": "UsePAM yes\n",
  }, async (root) => {
    assertEquals(await call(root, "sshole_openrc_sshd"), "/usr/sbin/sshd.pam");
    assertEquals(await call(root, "sshole_first_value usepam"), "yes");
  });
});
