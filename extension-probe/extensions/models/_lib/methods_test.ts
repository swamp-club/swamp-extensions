import { assertEquals } from "jsr:@std/assert@1.0.19";
import { withStub } from "./methods.ts";

Deno.test("record's inputs get the stub at any depth, declared or not", () => {
  const schema = {
    type: "object",
    properties: {
      config: {
        type: "object",
        properties: {
          claudePath: { type: "string" },
          model: { type: "string" },
        },
      },
      text: { type: "string" },
    },
  };
  const r = withStub("/box/bin/probe-stub")(schema, {
    config: { claudePath: "/usr/bin/claude", model: "m" },
    text: "t",
    docker_bin: "/usr/bin/docker",
  });
  assertEquals(r.inputs, {
    config: { claudePath: "/box/bin/probe-stub", model: "m" },
    text: "t",
    docker_bin: "/box/bin/probe-stub",
  });
  assertEquals(r.stubbed.sort(), ["config.claudePath", "docker_bin"]);
});

Deno.test("record stubs tool paths inside arrays and undeclared objects", () => {
  const r = withStub("/stub")({ type: "object", properties: {} }, {
    tools: [{ command: "/usr/bin/claude" }, { name: "x" }],
    opts: { nested: { claudePath: "/usr/bin/claude" } },
  });
  assertEquals(r.inputs, {
    tools: [{ command: "/stub" }, { name: "x" }],
    opts: { nested: { claudePath: "/stub" } },
  });
  assertEquals(r.stubbed.sort(), ["opts.nested.claudePath", "tools.0.command"]);
});
