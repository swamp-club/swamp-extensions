import {
  assert,
  assertEquals,
  assertRejects,
  assertStringIncludes,
} from "@std/assert";
import {
  type CustomMethodResourceIO,
  provisionAccessKey,
  verifyAccessKey,
} from "./methods.ts";
import type { AwsCredentials } from "../../../../model/aws/iam/extensions/models/_lib/aws.ts";

const ACCOUNT = "123456789012";
const USER = "observer";
const USER_ARN = `arn:aws:iam::${ACCOUNT}:user/observers/${USER}`;
const OWNED_TAG = "swamp-owned-access-key-id";
const NEW_SECRET = "NEWSECRETwJalrXUtnFEMI/K7MDENGbPxRfiCY";

const TEST_CREDENTIALS: AwsCredentials = {
  accessKeyId: "AKIAIOSFODNN7EXAMPLE",
  secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
  region: "us-east-1",
};

const BASE_ARGS = {
  UserName: USER,
  Path: "/observers/",
  Tags: [{ Key: "owner", Value: "swamp" }],
  expectedAccountId: ACCOUNT,
};

/** In-memory IAM/STS state served by the mock endpoint. */
interface FakeAws {
  account: string;
  path: string;
  tags: Map<string, string>;
  inline: string[];
  managed: string[];
  groups: string[];
  keys: string[];
  inactive: Set<string>;
  calls: string[];
  // Access key id that signed each GetCallerIdentity request.
  stsSigners: string[];
  nextKey: number;
  // Optional per-action overrides; return a Response to short-circuit.
  override?: (action: string, params: URLSearchParams) => Response | undefined;
  // Page size for list calls, to exercise pagination.
  pageSize?: number;
  decisions: Record<string, string>;
}

function fakeAws(patch: Partial<FakeAws> = {}): FakeAws {
  return {
    account: ACCOUNT,
    path: "/observers/",
    tags: new Map([["owner", "swamp"]]),
    inline: [],
    managed: [],
    groups: [],
    keys: [],
    inactive: new Set(),
    calls: [],
    stsSigners: [],
    nextKey: 1,
    decisions: {},
    ...patch,
  };
}

function xml(action: string, result: string, ns = "iam"): Response {
  const xmlns = ns === "sts"
    ? "https://sts.amazonaws.com/doc/2011-06-15/"
    : "https://iam.amazonaws.com/doc/2010-05-08/";
  return new Response(
    `<${action}Response xmlns="${xmlns}"><${action}Result>${result}</${action}Result><ResponseMetadata><RequestId>req-1</RequestId></ResponseMetadata></${action}Response>`,
    { status: 200, headers: { "content-type": "text/xml" } },
  );
}

function xmlNoResult(action: string): Response {
  return new Response(
    `<${action}Response xmlns="https://iam.amazonaws.com/doc/2010-05-08/"><ResponseMetadata><RequestId>req-1</RequestId></ResponseMetadata></${action}Response>`,
    { status: 200, headers: { "content-type": "text/xml" } },
  );
}

function xmlError(code: string, status = 400, message = code): Response {
  return new Response(
    `<ErrorResponse><Error><Type>Sender</Type><Code>${code}</Code><Message>${message}</Message></Error><RequestId>req-1</RequestId></ErrorResponse>`,
    { status, headers: { "content-type": "text/xml" } },
  );
}

function page<T>(
  items: T[],
  params: URLSearchParams,
  size: number | undefined,
): { slice: T[]; tail: string } {
  if (!size) return { slice: items, tail: "<IsTruncated>false</IsTruncated>" };
  const start = Number(params.get("Marker") ?? "0");
  const slice = items.slice(start, start + size);
  const next = start + size;
  return {
    slice,
    tail: next < items.length
      ? `<IsTruncated>true</IsTruncated><Marker>${next}</Marker>`
      : "<IsTruncated>false</IsTruncated>",
  };
}

function members(values: string[], wrap: (v: string) => string): string {
  return values.map((v) => `<member>${wrap(v)}</member>`).join("");
}

function handle(aws: FakeAws, params: URLSearchParams): Response {
  const action = params.get("Action") ?? "";
  aws.calls.push(action);
  const overridden = aws.override?.(action, params);
  if (overridden) return overridden;
  switch (action) {
    case "GetCallerIdentity":
      return xml(
        "GetCallerIdentity",
        `<Arn>${USER_ARN}</Arn><UserId>AIDA</UserId><Account>${aws.account}</Account>`,
        "sts",
      );
    case "GetUser":
      return xml(
        "GetUser",
        `<User><Path>${aws.path}</Path><UserName>${USER}</UserName><UserId>AIDA</UserId><Arn>${USER_ARN}</Arn><CreateDate>2026-01-01T00:00:00Z</CreateDate></User>`,
      );
    case "ListUserTags": {
      const { slice, tail } = page([...aws.tags], params, aws.pageSize);
      return xml(
        "ListUserTags",
        `<Tags>${
          slice.map(([k, v]) =>
            `<member><Key>${k}</Key><Value>${v}</Value></member>`
          )
            .join("")
        }</Tags>${tail}`,
      );
    }
    case "ListUserPolicies": {
      const { slice, tail } = page(aws.inline, params, aws.pageSize);
      return xml(
        "ListUserPolicies",
        `<PolicyNames>${members(slice, (v) => v)}</PolicyNames>${tail}`,
      );
    }
    case "ListAttachedUserPolicies": {
      const { slice, tail } = page(aws.managed, params, aws.pageSize);
      return xml(
        "ListAttachedUserPolicies",
        `<AttachedPolicies>${
          members(slice, (v) =>
            `<PolicyName>p</PolicyName><PolicyArn>${v}</PolicyArn>`)
        }</AttachedPolicies>${tail}`,
      );
    }
    case "ListGroupsForUser": {
      const { slice, tail } = page(aws.groups, params, aws.pageSize);
      return xml(
        "ListGroupsForUser",
        `<Groups>${
          members(
            slice,
            (v) =>
              `<Path>/</Path><GroupName>${v}</GroupName><GroupId>AGPA</GroupId><Arn>arn:aws:iam::${ACCOUNT}:group/${v}</Arn><CreateDate>2026-01-01T00:00:00Z</CreateDate>`,
          )
        }</Groups>${tail}`,
      );
    }
    case "ListAccessKeys": {
      const { slice, tail } = page(aws.keys, params, aws.pageSize);
      return xml(
        "ListAccessKeys",
        `<AccessKeyMetadata>${
          members(
            slice,
            (v) =>
              `<UserName>${USER}</UserName><AccessKeyId>${v}</AccessKeyId><Status>${
                aws.inactive.has(v) ? "Inactive" : "Active"
              }</Status>`,
          )
        }</AccessKeyMetadata>${tail}`,
      );
    }
    case "CreateAccessKey": {
      const id = `AKIANEWKEY${aws.nextKey++}`;
      aws.keys.push(id);
      return xml(
        "CreateAccessKey",
        `<AccessKey><UserName>${USER}</UserName><AccessKeyId>${id}</AccessKeyId><Status>Active</Status><SecretAccessKey>${NEW_SECRET}</SecretAccessKey><CreateDate>2026-10-28T00:00:00Z</CreateDate></AccessKey>`,
      );
    }
    case "DeleteAccessKey": {
      const id = params.get("AccessKeyId");
      aws.keys = aws.keys.filter((k) => k !== id);
      return xmlNoResult("DeleteAccessKey");
    }
    case "TagUser": {
      for (let i = 1; params.has(`Tags.member.${i}.Key`); i++) {
        aws.tags.set(
          params.get(`Tags.member.${i}.Key`)!,
          params.get(`Tags.member.${i}.Value`)!,
        );
      }
      return xmlNoResult("TagUser");
    }
    case "UntagUser": {
      for (let i = 1; params.has(`TagKeys.member.${i}`); i++) {
        aws.tags.delete(params.get(`TagKeys.member.${i}`)!);
      }
      return xmlNoResult("UntagUser");
    }
    case "SimulatePrincipalPolicy": {
      const names: string[] = [];
      for (let i = 1; params.has(`ActionNames.member.${i}`); i++) {
        names.push(params.get(`ActionNames.member.${i}`)!);
      }
      return xml(
        "SimulatePrincipalPolicy",
        `<EvaluationResults>${
          members(
            names,
            (n) =>
              `<EvalActionName>${n}</EvalActionName><EvalResourceName>*</EvalResourceName><EvalDecision>${
                aws.decisions[n] ?? "implicitDeny"
              }</EvalDecision>`,
          )
        }</EvaluationResults><IsTruncated>false</IsTruncated>`,
      );
    }
  }
  return xmlError("InvalidAction", 400, `unhandled ${action}`);
}

/** Runs `fn` with IAM and STS pointed at a port-0 mock serving `aws`. */
async function withAws(aws: FakeAws, fn: () => Promise<void>): Promise<void> {
  const server = Deno.serve(
    { port: 0, onListen: () => {} },
    async (req) => {
      const params = new URLSearchParams(await req.text());
      if (params.get("Action") === "GetCallerIdentity") {
        const signer = (req.headers.get("authorization") ?? "").match(
          /Credential=([^/]+)\//,
        );
        aws.stsSigners.push(signer?.[1] ?? "");
      }
      return handle(aws, params);
    },
  );
  const saved = Deno.env.get("AWS_ENDPOINT_URL");
  // The client factory disables IMDS for the process; put it back after.
  const savedImds = Deno.env.get("AWS_EC2_METADATA_DISABLED");
  try {
    Deno.env.set(
      "AWS_ENDPOINT_URL",
      `http://127.0.0.1:${(server.addr as Deno.NetAddr).port}`,
    );
    await fn();
  } finally {
    if (saved !== undefined) Deno.env.set("AWS_ENDPOINT_URL", saved);
    else Deno.env.delete("AWS_ENDPOINT_URL");
    if (savedImds !== undefined) {
      Deno.env.set("AWS_EC2_METADATA_DISABLED", savedImds);
    } else Deno.env.delete("AWS_EC2_METADATA_DISABLED");
    await server.shutdown();
  }
}

/** In-memory stand-in for the generated io handle, with failure injection. */
function fakeIo(patch: {
  stored?: Record<string, unknown> | null;
  writeFails?: boolean;
  readFails?: boolean;
  // Simulates a vault that does not round-trip the secret.
  corruptOnRead?: boolean;
} = {}): CustomMethodResourceIO & {
  stored: Record<string, unknown> | null;
  writes: Record<string, unknown>[];
} {
  const io = {
    stored: patch.stored ?? null,
    writes: [] as Record<string, unknown>[],
    write(data: Record<string, unknown>): Promise<unknown> {
      if (patch.writeFails) {
        return Promise.reject(new Error("no vault configured"));
      }
      io.writes.push(data);
      io.stored = data;
      return Promise.resolve({ name: "handle" });
    },
    read(): Promise<Record<string, unknown> | null> {
      if (patch.readFails) return Promise.reject(new Error("vault offline"));
      if (patch.corruptOnRead && io.stored) {
        return Promise.resolve({ ...io.stored, secretAccessKey: "" });
      }
      return Promise.resolve(io.stored);
    },
  };
  return io;
}

function assertNoSecret(error: Error): void {
  assert(!error.message.includes(NEW_SECRET), "secret leaked into an error");
}

// @aws-sdk/client-iam and client-sts (NodeHttpHandler) leak connection pool
// resources between requests.
function test(name: string, fn: () => Promise<void>): void {
  Deno.test({ name, sanitizeResources: false, fn });
}

test("provisionAccessKey creates, tags and stores one key", async () => {
  const aws = fakeAws();
  const io = fakeIo();
  await withAws(aws, () => provisionAccessKey(BASE_ARGS, TEST_CREDENTIALS, io));
  assertEquals(aws.keys, ["AKIANEWKEY1"]);
  assertEquals(aws.tags.get(OWNED_TAG), "AKIANEWKEY1");
  assertEquals(io.writes.length, 1);
  assertEquals(io.writes[0].accessKeyId, "AKIANEWKEY1");
  assertEquals(io.writes[0].secretAccessKey, NEW_SECRET);
  assertEquals(io.writes[0].userArn, USER_ARN);
  assertEquals(io.writes[0].accountId, ACCOUNT);
});

test("provisionAccessKey refuses another account", async () => {
  const aws = fakeAws({ account: "999999999999" });
  await withAws(aws, async () => {
    await assertRejects(
      () => provisionAccessKey(BASE_ARGS, TEST_CREDENTIALS, fakeIo()),
      Error,
      "not the expected account",
    );
  });
  assert(!aws.calls.includes("CreateAccessKey"));
});

test("provisionAccessKey refuses a path or tag mismatch", async () => {
  await withAws(fakeAws({ path: "/" }), async () => {
    await assertRejects(
      () => provisionAccessKey(BASE_ARGS, TEST_CREDENTIALS, fakeIo()),
      Error,
      "has path /",
    );
  });
  await withAws(
    fakeAws({ tags: new Map([["owner", "someone-else"]]) }),
    async () => {
      await assertRejects(
        () => provisionAccessKey(BASE_ARGS, TEST_CREDENTIALS, fakeIo()),
        Error,
        `tag owner is "someone-else"`,
      );
    },
  );
  await withAws(fakeAws(), async () => {
    await assertRejects(
      () =>
        provisionAccessKey(
          { ...BASE_ARGS, Tags: [] },
          TEST_CREDENTIALS,
          fakeIo(),
        ),
      Error,
      "declare at least one ownership tag",
    );
  });
});

test("provisionAccessKey refuses undeclared attachments and names them", async () => {
  const aws = fakeAws({
    inline: ["read-only"],
    managed: ["arn:aws:iam::aws:policy/AdministratorAccess"],
    groups: ["admins"],
  });
  await withAws(aws, async () => {
    const error = await assertRejects(
      () => provisionAccessKey(BASE_ARGS, TEST_CREDENTIALS, fakeIo()),
      Error,
    );
    assertStringIncludes(error.message, "inline policy read-only");
    assertStringIncludes(
      error.message,
      "managed policy arn:aws:iam::aws:policy/AdministratorAccess",
    );
    assertStringIncludes(error.message, "group admins");
  });
  assert(!aws.calls.includes("CreateAccessKey"));
});

test("provisionAccessKey accepts declared and explicitly allowed attachments", async () => {
  const aws = fakeAws({
    inline: ["declared", "via-user-policy"],
    groups: ["g"],
  });
  const io = fakeIo();
  await withAws(aws, () =>
    provisionAccessKey(
      {
        ...BASE_ARGS,
        Policies: [{ PolicyName: "declared", PolicyDocument: {} }],
        allowedInlinePolicyNames: ["via-user-policy"],
        allowedGroups: ["g"],
      },
      TEST_CREDENTIALS,
      io,
    ));
  assertEquals(io.writes.length, 1);
});

test("provisionAccessKey reads every page before passing the attachment guard", async () => {
  const aws = fakeAws({
    inline: ["ok-1", "ok-2", "foreign"],
    pageSize: 2,
  });
  await withAws(aws, async () => {
    await assertRejects(
      () =>
        provisionAccessKey(
          { ...BASE_ARGS, allowedInlinePolicyNames: ["ok-1", "ok-2"] },
          TEST_CREDENTIALS,
          fakeIo(),
        ),
      Error,
      "inline policy foreign",
    );
  });
});

test("provisionAccessKey refuses a foreign key and deletes nothing", async () => {
  const aws = fakeAws({ keys: ["AKIAFOREIGN"] });
  await withAws(aws, async () => {
    await assertRejects(
      () => provisionAccessKey(BASE_ARGS, TEST_CREDENTIALS, fakeIo()),
      Error,
      "AKIAFOREIGN",
    );
  });
  assertEquals(aws.keys, ["AKIAFOREIGN"]);
  assert(!aws.calls.includes("DeleteAccessKey"));
  assert(!aws.calls.includes("CreateAccessKey"));
});

test("provisionAccessKey reuses the owned key when its secret reads back", async () => {
  const aws = fakeAws({
    keys: ["AKIAOWNED"],
    tags: new Map([["owner", "swamp"], [OWNED_TAG, "AKIAOWNED"]]),
  });
  const io = fakeIo({
    stored: { accessKeyId: "AKIAOWNED", secretAccessKey: "stored-secret" },
  });
  await withAws(aws, () => provisionAccessKey(BASE_ARGS, TEST_CREDENTIALS, io));
  assertEquals(io.writes.length, 0);
  assert(!aws.calls.includes("CreateAccessKey"));
});

test("provisionAccessKey refuses to reuse an owned key whose secret is not recoverable", async () => {
  const cases: Array<[string, ReturnType<typeof fakeIo>]> = [
    ["missing record", fakeIo()],
    [
      "different key id",
      fakeIo({ stored: { accessKeyId: "AKIAOLD", secretAccessKey: "s" } }),
    ],
    [
      "unresolved reference",
      fakeIo({
        stored: {
          accessKeyId: "AKIAOWNED",
          secretAccessKey: "${{ vault.get(default, x) }}",
        },
      }),
    ],
    ["vault read error", fakeIo({ readFails: true })],
  ];
  for (const [label, io] of cases) {
    const aws = fakeAws({
      keys: ["AKIAOWNED"],
      tags: new Map([["owner", "swamp"], [OWNED_TAG, "AKIAOWNED"]]),
    });
    await withAws(aws, async () => {
      await assertRejects(
        () => provisionAccessKey(BASE_ARGS, TEST_CREDENTIALS, io),
        Error,
        "replaceOwnedKey=true",
        label,
      );
    });
    assertEquals(aws.keys, ["AKIAOWNED"], label);
    assert(!aws.calls.includes("CreateAccessKey"), label);
  }
});

test("provisionAccessKey still owns its key after an update strips the tag", async () => {
  const aws = fakeAws();
  const io = fakeIo();
  await withAws(aws, () => provisionAccessKey(BASE_ARGS, TEST_CREDENTIALS, io));
  // The generated update rewrites Tags to the declared set
  aws.tags.delete(OWNED_TAG);
  aws.calls = [];
  await withAws(aws, () => provisionAccessKey(BASE_ARGS, TEST_CREDENTIALS, io));
  assertEquals(aws.keys, ["AKIANEWKEY1"]);
  assert(!aws.calls.includes("CreateAccessKey"));
  assertEquals(io.writes.length, 1);
  // The tag is restored
  assertEquals(aws.tags.get(OWNED_TAG), "AKIANEWKEY1");
});

test("provisionAccessKey refuses to reuse an inactive owned key", async () => {
  const aws = fakeAws({
    keys: ["AKIAOWNED"],
    inactive: new Set(["AKIAOWNED"]),
    tags: new Map([["owner", "swamp"], [OWNED_TAG, "AKIAOWNED"]]),
  });
  const io = fakeIo({
    stored: { accessKeyId: "AKIAOWNED", secretAccessKey: "stored-secret" },
  });
  await withAws(aws, async () => {
    await assertRejects(
      () => provisionAccessKey(BASE_ARGS, TEST_CREDENTIALS, io),
      Error,
      "is Inactive",
    );
  });
  assert(!aws.calls.includes("CreateAccessKey"));
});

test("provisionAccessKey refuses when tag and record name different live keys", async () => {
  const aws = fakeAws({
    keys: ["AKIATAGGED", "AKIARECORDED"],
    tags: new Map([["owner", "swamp"], [OWNED_TAG, "AKIATAGGED"]]),
  });
  const io = fakeIo({
    stored: { accessKeyId: "AKIARECORDED", secretAccessKey: "s" },
  });
  await withAws(aws, async () => {
    await assertRejects(
      () => provisionAccessKey(BASE_ARGS, TEST_CREDENTIALS, io),
      Error,
      "name different keys",
    );
  });
  assertEquals(aws.keys, ["AKIATAGGED", "AKIARECORDED"]);
});

test("provisionAccessKey replaceOwnedKey replaces only the owned key", async () => {
  const aws = fakeAws({
    keys: ["AKIAOWNED"],
    tags: new Map([["owner", "swamp"], [OWNED_TAG, "AKIAOWNED"]]),
  });
  const io = fakeIo();
  await withAws(aws, () =>
    provisionAccessKey(
      { ...BASE_ARGS, replaceOwnedKey: true },
      TEST_CREDENTIALS,
      io,
    ));
  assertEquals(aws.keys, ["AKIANEWKEY1"]);
  assertEquals(aws.tags.get(OWNED_TAG), "AKIANEWKEY1");
  assertEquals(io.writes.length, 1);
});

test("provisionAccessKey deletes the new key when tagging fails", async () => {
  const aws = fakeAws({
    override: (action) =>
      action === "TagUser" ? xmlError("LimitExceeded", 409) : undefined,
  });
  await withAws(aws, async () => {
    const error = await assertRejects(
      () => provisionAccessKey(BASE_ARGS, TEST_CREDENTIALS, fakeIo()),
      Error,
      "safe to re-run",
    );
    assertNoSecret(error);
  });
  assertEquals(aws.keys, []);
});

test("provisionAccessKey rolls back when the vault write fails", async () => {
  const aws = fakeAws();
  await withAws(aws, async () => {
    const error = await assertRejects(
      () =>
        provisionAccessKey(
          BASE_ARGS,
          TEST_CREDENTIALS,
          fakeIo({ writeFails: true }),
        ),
      Error,
      "storing the secret in the vault failed",
    );
    assertStringIncludes(error.message, "safe to re-run");
    assertNoSecret(error);
  });
  assertEquals(aws.keys, []);
  assertEquals(aws.tags.has(OWNED_TAG), false);
  // A later run with a working vault succeeds without replaceOwnedKey.
  const io = fakeIo();
  await withAws(aws, () => provisionAccessKey(BASE_ARGS, TEST_CREDENTIALS, io));
  assertEquals(aws.keys, ["AKIANEWKEY2"]);
  assertEquals(io.writes.length, 1);
});

test("provisionAccessKey rolls back when the secret does not read back", async () => {
  const aws = fakeAws();
  await withAws(aws, async () => {
    const error = await assertRejects(
      () =>
        provisionAccessKey(
          BASE_ARGS,
          TEST_CREDENTIALS,
          fakeIo({ corruptOnRead: true }),
        ),
      Error,
      "points at a deleted key",
    );
    assertNoSecret(error);
  });
  assertEquals(aws.keys, []);
  assertEquals(aws.tags.has(OWNED_TAG), false);
});

test("provisionAccessKey names a stranded key when rollback fails", async () => {
  const aws = fakeAws({
    override: (action) =>
      action === "DeleteAccessKey"
        ? xmlError("ServiceFailure", 500)
        : undefined,
  });
  await withAws(aws, async () => {
    const error = await assertRejects(
      () =>
        provisionAccessKey(
          BASE_ARGS,
          TEST_CREDENTIALS,
          fakeIo({ writeFails: true }),
        ),
      Error,
      "Access key AKIANEWKEY1 is stranded",
    );
    assertStringIncludes(error.message, "replaceOwnedKey=true");
    assertNoSecret(error);
  });
});

test("provisionAccessKey backs out when a concurrent run adds a key", async () => {
  const aws = fakeAws();
  aws.override = (action) => {
    if (action === "TagUser" && !aws.keys.includes("AKIARACE")) {
      aws.keys.push("AKIARACE");
    }
    return undefined;
  };
  await withAws(aws, async () => {
    await assertRejects(
      () => provisionAccessKey(BASE_ARGS, TEST_CREDENTIALS, fakeIo()),
      Error,
      "concurrent run",
    );
  });
  // Only this run's key was deleted.
  assertEquals(aws.keys, ["AKIARACE"]);
});

test("provisionAccessKey waits out listings that lag the writes", async () => {
  const aws = fakeAws();
  let lagging = 1;
  aws.override = (action) => {
    // The first re-check after TagUser does not see the new key yet
    if (
      action === "ListAccessKeys" && aws.calls.includes("TagUser") &&
      lagging-- > 0
    ) {
      return xml(
        "ListAccessKeys",
        "<AccessKeyMetadata></AccessKeyMetadata><IsTruncated>false</IsTruncated>",
      );
    }
    return undefined;
  };
  const io = fakeIo();
  await withAws(aws, () => provisionAccessKey(BASE_ARGS, TEST_CREDENTIALS, io));
  assertEquals(aws.keys, ["AKIANEWKEY1"]);
  assertEquals(io.writes.length, 1);
});

test("provisionAccessKey replaceOwnedKey waits out listings that still show the old key", async () => {
  const aws = fakeAws({
    keys: ["AKIAOWNED"],
    tags: new Map([["owner", "swamp"], [OWNED_TAG, "AKIAOWNED"]]),
  });
  let lagging = 1;
  aws.override = (action) => {
    // The first re-check after TagUser still sees the deleted key and old tag
    if (aws.calls.includes("TagUser") && lagging > 0) {
      if (action === "ListAccessKeys") {
        return xml(
          "ListAccessKeys",
          `<AccessKeyMetadata><member><UserName>${USER}</UserName><AccessKeyId>AKIAOWNED</AccessKeyId><Status>Active</Status></member></AccessKeyMetadata><IsTruncated>false</IsTruncated>`,
        );
      }
      if (action === "ListUserTags") {
        lagging--;
        return xml(
          "ListUserTags",
          `<Tags><member><Key>owner</Key><Value>swamp</Value></member><member><Key>${OWNED_TAG}</Key><Value>AKIAOWNED</Value></member></Tags><IsTruncated>false</IsTruncated>`,
        );
      }
    }
    return undefined;
  };
  const io = fakeIo();
  await withAws(aws, () =>
    provisionAccessKey(
      { ...BASE_ARGS, replaceOwnedKey: true },
      TEST_CREDENTIALS,
      io,
    ));
  assertEquals(aws.keys, ["AKIANEWKEY1"]);
  assertEquals(aws.tags.get(OWNED_TAG), "AKIANEWKEY1");
  assertEquals(io.writes.length, 1);
});

test("provisionAccessKey rolls back when the new key never appears in listings", async () => {
  const aws = fakeAws();
  aws.override = (action) =>
    action === "ListAccessKeys" && aws.calls.includes("TagUser")
      ? xml(
        "ListAccessKeys",
        "<AccessKeyMetadata></AccessKeyMetadata><IsTruncated>false</IsTruncated>",
      )
      : undefined;
  await withAws(aws, async () => {
    await assertRejects(
      () => provisionAccessKey(BASE_ARGS, TEST_CREDENTIALS, fakeIo()),
      Error,
      "did not appear in IAM listings",
    );
  });
  assertEquals(aws.keys, []);
});

test("provisionAccessKey surfaces a malformed non-XML 403 on the first call", async () => {
  const aws = fakeAws({
    override: (action) =>
      action === "GetCallerIdentity"
        ? new Response("Forbidden", {
          status: 403,
          headers: { "content-type": "text/plain" },
        })
        : undefined,
  });
  await withAws(aws, async () => {
    await assertRejects(
      () => provisionAccessKey(BASE_ARGS, TEST_CREDENTIALS, fakeIo()),
    );
  });
  assert(!aws.calls.includes("CreateAccessKey"));
});

const VERIFY_ARGS = {
  UserName: USER,
  observerAccessKeyId: "AKIANEWKEY1",
  observerSecretAccessKey: NEW_SECRET,
};

test("verifyAccessKey retries a not-yet-active key and records a pass", async () => {
  let rejections = 2;
  const aws = fakeAws({
    decisions: { "ec2:DescribeInstances": "allowed" },
    override: (action) => {
      if (action === "GetCallerIdentity" && rejections > 0) {
        rejections--;
        return xmlError("InvalidClientTokenId", 403);
      }
      return undefined;
    },
  });
  const io = fakeIo();
  await withAws(aws, () =>
    verifyAccessKey(
      {
        ...VERIFY_ARGS,
        permittedActions: ["ec2:DescribeInstances"],
        deniedActions: ["iam:CreateAccessKey"],
      },
      TEST_CREDENTIALS,
      io,
    ));
  assertEquals(io.writes.length, 1);
  const record = io.writes[0];
  assertEquals(record.passed, true);
  assertEquals(record.identityMatches, true);
  assertEquals(record.identityAttempts, 3);
  // Identity was checked with the provisioned key, not the caller's
  assertEquals(aws.stsSigners, ["AKIANEWKEY1", "AKIANEWKEY1", "AKIANEWKEY1"]);
  assertEquals(record.accessKeyId, "AKIANEWKEY1");
  assert(!JSON.stringify(record).includes(NEW_SECRET));
});

test("verifyAccessKey records and fails when a denied action is allowed", async () => {
  const aws = fakeAws({ decisions: { "iam:CreateAccessKey": "allowed" } });
  const io = fakeIo();
  await withAws(aws, async () => {
    await assertRejects(
      () =>
        verifyAccessKey(
          { ...VERIFY_ARGS, deniedActions: ["iam:CreateAccessKey"] },
          TEST_CREDENTIALS,
          io,
        ),
      Error,
      "iam:CreateAccessKey expected denied, got allowed",
    );
  });
  assertEquals(io.writes.length, 1);
  assertEquals(io.writes[0].passed, false);
});

test("verifyAccessKey stops at the deadline without leaking the secret", async () => {
  const aws = fakeAws({
    override: (action) =>
      action === "GetCallerIdentity"
        ? xmlError("InvalidClientTokenId", 403)
        : undefined,
  });
  const io = fakeIo();
  await withAws(aws, async () => {
    const error = await assertRejects(
      () =>
        verifyAccessKey(
          { ...VERIFY_ARGS, timeoutMs: 1000 },
          TEST_CREDENTIALS,
          io,
        ),
      Error,
    );
    assertNoSecret(error);
  });
  assertEquals(io.writes.length, 1);
  assertEquals(io.writes[0].passed, false);
  assertEquals(io.writes[0].identityMatches, false);
  assert(!JSON.stringify(io.writes[0]).includes(NEW_SECRET));
});

test("verifyAccessKey records failing evidence when the simulation fails", async () => {
  const aws = fakeAws({
    override: (action) =>
      action === "SimulatePrincipalPolicy"
        ? xmlError("AccessDenied", 403)
        : undefined,
  });
  const io = fakeIo();
  await withAws(aws, async () => {
    const error = await assertRejects(
      () =>
        verifyAccessKey(
          { ...VERIFY_ARGS, deniedActions: ["iam:CreateAccessKey"] },
          TEST_CREDENTIALS,
          io,
        ),
      Error,
      "AccessDenied",
    );
    assertNoSecret(error);
  });
  assertEquals(io.writes.length, 1);
  assertEquals(io.writes[0].passed, false);
  assertEquals(io.writes[0].identityMatches, true);
  assertStringIncludes(String(io.writes[0].error), "AccessDenied");
});

test("verifyAccessKey records failing evidence when the user lookup fails", async () => {
  const aws = fakeAws({
    override: (action) =>
      action === "GetUser" ? xmlError("NoSuchEntity", 404) : undefined,
  });
  const io = fakeIo();
  await withAws(aws, async () => {
    await assertRejects(
      () => verifyAccessKey(VERIFY_ARGS, TEST_CREDENTIALS, io),
      Error,
      "NoSuchEntity",
    );
  });
  assertEquals(io.writes.length, 1);
  assertEquals(io.writes[0].passed, false);
  assertEquals(io.writes[0].userArn, undefined);
});

test("verifyAccessKey keeps the original error when the evidence write also fails", async () => {
  const aws = fakeAws({
    override: (action) =>
      action === "GetUser" ? xmlError("NoSuchEntity", 404) : undefined,
  });
  await withAws(aws, async () => {
    const error = await assertRejects(
      () =>
        verifyAccessKey(
          VERIFY_ARGS,
          TEST_CREDENTIALS,
          fakeIo({ writeFails: true }),
        ),
      Error,
      "NoSuchEntity",
    );
    assertStringIncludes(error.message, "could not be written either");
    assertNoSecret(error);
  });
});

test("verifyAccessKey records failing evidence when the key is rejected", async () => {
  const aws = fakeAws({
    override: (action) =>
      action === "GetCallerIdentity"
        ? xmlError("SignatureDoesNotMatch", 403)
        : undefined,
  });
  const io = fakeIo();
  await withAws(aws, async () => {
    const error = await assertRejects(
      () => verifyAccessKey(VERIFY_ARGS, TEST_CREDENTIALS, io),
      Error,
      "could not authenticate after 1 attempt(s)",
    );
    assertNoSecret(error);
  });
  assertEquals(io.writes.length, 1);
  assertEquals(io.writes[0].passed, false);
  assertStringIncludes(
    String(io.writes[0].identityError),
    "SignatureDoesNotMatch",
  );
});
