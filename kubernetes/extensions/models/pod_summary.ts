import { z } from "npm:zod@4.3.6";

const GlobalArgsSchema = z.object({
  sourceName: z.string().default("cluster-pods"),
});

type PodSummaryGlobalArgs = z.infer<typeof GlobalArgsSchema>;

interface DataHandle {
  name: string;
}

interface DataEntry {
  name: string;
  tags?: Record<string, string>;
}

interface ModelType {
  toString(): string;
}

interface DefinitionRepository {
  findByNameGlobal(name: string): Promise<
    {
      type: ModelType;
      definition: { id: string };
    } | null
  >;
}

interface DataRepository {
  findAllForModel(type: ModelType, id: string): Promise<DataEntry[]>;
  getContent(
    type: ModelType,
    id: string,
    name: string,
  ): Promise<Uint8Array | null>;
}

interface PodSummaryContext {
  globalArgs: PodSummaryGlobalArgs;
  logger: {
    info(msg: string, props?: Record<string, unknown>): void;
    warning(msg: string, props?: Record<string, unknown>): void;
    error(msg: string, props?: Record<string, unknown>): void;
  };
  writeResource(
    specName: string,
    instanceName: string,
    data: Record<string, unknown>,
  ): Promise<DataHandle>;
  definitionRepository: DefinitionRepository;
  dataRepository: DataRepository;
}

const SummarySchema = z.object({
  totalPods: z.number(),
  podsByPhase: z.record(z.string(), z.number()),
  podsByNode: z.record(z.string(), z.number()),
  totalRestarts: z.number(),
  highRestartPods: z.array(z.string()),
  healthyPods: z.number(),
  unhealthyPods: z.number(),
  namespaces: z.array(z.string()),
  collectedAt: z.string(),
}).passthrough();

const SummarizeArgsSchema = z.object({});

interface PodData {
  name: string;
  namespace?: string;
  phase?: string;
  nodeName?: string;
  restartCount?: number;
}

/** Kubernetes Pod summary aggregation model. */
export const model = {
  type: "@swamp/kubernetes/pod-summary",
  version: "2026.05.27.2",
  globalArguments: GlobalArgsSchema,
  upgrades: [
    {
      toVersion: "2026.05.27.2",
      description:
        "Version bump for extension-wide security fix in pod exec method",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  resources: {
    summary: {
      description:
        "Aggregated pod counts by phase, node, restart totals, high-restart pods, and healthy/unhealthy breakdown",
      schema: SummarySchema,
      lifetime: "infinite",
      garbageCollection: 5,
    },
  },
  methods: {
    summarize: {
      description:
        "Read pod resources from a pod instance and compute counts by phase, node, restart totals, and healthy/unhealthy breakdown",
      arguments: SummarizeArgsSchema,
      execute: async (
        _args: Record<string, never>,
        context: PodSummaryContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const sourceName = context.globalArgs.sourceName;

        // Use definitionRepository to resolve the source model by name
        const result = await context.definitionRepository.findByNameGlobal(
          sourceName,
        );
        if (!result) {
          throw new Error(
            `Could not find model instance named '${sourceName}'`,
          );
        }

        const sourceType = result.type;
        const sourceId = result.definition.id;

        context.logger.info("Resolved {source} → {type} ({id})", {
          source: sourceName,
          type: sourceType.toString(),
          id: sourceId,
        });

        // Use dataRepository with the real ModelType object
        const allData = await context.dataRepository.findAllForModel(
          sourceType,
          sourceId,
        );

        // Filter to only pod spec resources
        const podEntries = allData.filter((d) =>
          d.tags?.specName === "pod" && d.tags?.type === "resource"
        );

        context.logger.info("Found {count} pod resources from {source}", {
          count: podEntries.length,
          source: sourceName,
        });

        // Read content for each pod entry
        const pods: PodData[] = [];
        for (const entry of podEntries) {
          const content = await context.dataRepository.getContent(
            sourceType,
            sourceId,
            entry.name,
          );
          if (content) {
            try {
              pods.push(
                JSON.parse(new TextDecoder().decode(content)) as PodData,
              );
            } catch {
              context.logger.warning(
                "Skipping malformed pod entry {name}",
                { name: entry.name },
              );
            }
          }
        }

        // Compute aggregated stats
        const podsByPhase: Record<string, number> = {};
        const podsByNode: Record<string, number> = {};
        const namespacesSet = new Set<string>();
        let totalRestarts = 0;
        const highRestartPods: string[] = [];
        let healthyPods = 0;
        let unhealthyPods = 0;

        for (const pod of pods) {
          const phase = pod.phase || "Unknown";
          podsByPhase[phase] = (podsByPhase[phase] || 0) + 1;

          const node = pod.nodeName || "unscheduled";
          podsByNode[node] = (podsByNode[node] || 0) + 1;

          if (pod.namespace) namespacesSet.add(pod.namespace);

          const restarts = pod.restartCount || 0;
          totalRestarts += restarts;
          if (restarts > 5) highRestartPods.push(pod.name);

          if (phase === "Running" || phase === "Succeeded") {
            healthyPods++;
          } else {
            unhealthyPods++;
          }
        }

        const summary = {
          totalPods: pods.length,
          podsByPhase,
          podsByNode,
          totalRestarts,
          highRestartPods,
          healthyPods,
          unhealthyPods,
          namespaces: Array.from(namespacesSet),
          collectedAt: new Date().toISOString(),
        };

        const handle = await context.writeResource(
          "summary",
          "latest",
          summary,
        );
        return { dataHandles: [handle] };
      },
    },
  },
};
