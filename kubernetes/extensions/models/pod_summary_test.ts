import { assertEquals, assertNotEquals } from "jsr:@std/assert@1";
import { model } from "./pod_summary.ts";

type Execute = typeof model.methods.summarize.execute;
type SummaryContext = Parameters<Execute>[1];

const SOURCE_TYPE = { toString: () => "@swamp/kubernetes/pod" };

function makeContext(pods: Record<string, unknown>[]) {
  const written: { specName: string; name: string; data: unknown }[] = [];
  const quiet = () => {};
  const context: SummaryContext = {
    globalArgs: { sourceName: "cluster-pods" },
    logger: { info: quiet, warning: quiet, error: quiet },
    writeResource: (specName, name, data) => {
      written.push({ specName, name, data });
      return Promise.resolve({ name });
    },
    definitionRepository: {
      findByNameGlobal: (name) =>
        Promise.resolve(
          name === "cluster-pods"
            ? { type: SOURCE_TYPE, definition: { id: "src-1" } }
            : null,
        ),
    },
    dataRepository: {
      findAllForModel: () =>
        Promise.resolve(pods.map((p) => ({
          name: String(p.name),
          tags: { specName: "pod", type: "resource" },
        }))),
      getContent: (_type, _id, name) => {
        const pod = pods.find((p) => p.name === name);
        return Promise.resolve(
          pod ? new TextEncoder().encode(JSON.stringify(pod)) : null,
        );
      },
    },
  };
  return { context, written };
}

Deno.test("summarize saves its summary under a name swamp allows", async () => {
  const { context, written } = makeContext([
    { name: "a", namespace: "default", phase: "Running", restartCount: 0 },
    { name: "b", namespace: "default", phase: "Pending", restartCount: 7 },
  ]);
  await model.methods.summarize.execute({}, context);

  assertEquals(written.length, 1);
  assertEquals(written[0].specName, "summary");
  // swamp reserves "latest", which broke the cluster-summary workflow.
  assertNotEquals(written[0].name, "latest");
  assertEquals(written[0].name, "summary");
  const summary = written[0].data as { totalPods: number };
  assertEquals(summary.totalPods, 2);
});
