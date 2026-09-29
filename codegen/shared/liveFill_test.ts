import { assert, assertEquals } from "@std/assert";
import {
  describedAsOutputOnly,
  isSecretFieldName,
  liveFillFields,
  sameShape,
} from "./liveFill.ts";

Deno.test("sameShape - matching scalars, arrays and objects", () => {
  assert(sameShape({ type: "string" }, { type: "string" }));
  assert(sameShape({ type: "integer" }, { type: "number" }));
  assert(
    sameShape(
      { type: "array", items: { type: "string" } },
      { type: "array", items: { type: "string" } },
    ),
  );
  assert(
    sameShape(
      {
        type: "object",
        properties: { ports: { type: "string" }, extra: { type: "string" } },
      },
      {
        type: "object",
        properties: { ports: { type: "string" }, id: { type: "integer" } },
      },
    ),
    "properties only one side declares are ignored",
  );
});

Deno.test("sameShape - differing shapes do not match", () => {
  assert(!sameShape({ type: "string" }, { type: "object" }));
  assert(!sameShape({ type: "string" }, {}), "untyped response");
  assert(
    !sameShape(
      { type: "array", items: { type: "string" } },
      { type: "array", items: { type: "object" } },
    ),
  );
  assert(
    !sameShape(
      { type: "array", items: { type: "string" } },
      { type: "array" },
    ),
  );
  assert(
    !sameShape(
      { type: "object", properties: { region: { type: "string" } } },
      { type: "object", properties: { region: { type: "object" } } },
    ),
  );
});

Deno.test("liveFillFields - fills same-shaped and always-filled fields only", () => {
  const request = {
    name: { type: "string" },
    region: { type: "string" },
    tags: { type: "array", items: { type: "string" } },
    secret: { type: "string" },
    size: { type: "string" },
  };
  const response = {
    name: { type: "string" },
    region: { type: "object" },
    tags: { type: "array", items: { type: "string" } },
  };
  assertEquals(
    liveFillFields(
      ["tags", "size", "secret", "region", "name"],
      request,
      response,
      new Set(["size"]),
    ),
    ["name", "size", "tags"],
  );
});

Deno.test("describedAsOutputOnly - output-only and read-only descriptions", () => {
  for (
    const description of [
      "Output only. The creation time.",
      "[Output Only] Server-defined URL.",
      "Link to the event in the UI. Read-only.",
      "The unique ID (read-only).",
    ]
  ) {
    assert(describedAsOutputOnly({ type: "string", description }), description);
  }
  assert(!describedAsOutputOnly({ type: "string", description: "Name." }));
  assert(!describedAsOutputOnly({ type: "string" }));
});

Deno.test("liveFillFields - output-only fields are not filled unless always filled", () => {
  const request = {
    name: { type: "string" },
    created: { type: "string", description: "Creation time. Read-only." },
    etag: { type: "string", description: "Output only. ETag." },
  };
  const response = {
    name: { type: "string" },
    created: { type: "string" },
    etag: { type: "string" },
  };
  assertEquals(
    liveFillFields(
      ["name", "created", "etag"],
      request,
      response,
      new Set(["etag"]),
    ),
    ["etag", "name"],
  );
});

Deno.test("liveFillFields - secret-named fields are never filled", () => {
  for (
    const name of [
      "secret",
      "password",
      "cf_api_key",
      "private_key",
      "privateKey",
      "apiToken",
      "credentials",
    ]
  ) {
    assert(isSecretFieldName(name), name);
  }
  assert(!isSecretFieldName("name"));
  assert(!isSecretFieldName("token_id"));
  assert(!isSecretFieldName("apiKeyId"));
  const props = {
    name: { type: "string" },
    secret: { type: "string" },
    changePasswordAtNextLogin: { type: "boolean" },
  };
  assertEquals(
    liveFillFields(
      ["name", "secret", "changePasswordAtNextLogin"],
      props,
      props,
      new Set(["secret"]),
    ),
    ["changePasswordAtNextLogin", "name"],
  );
});
