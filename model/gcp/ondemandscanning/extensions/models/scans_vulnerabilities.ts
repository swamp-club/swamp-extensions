// Auto-generated extension model for @swamp/gcp/ondemandscanning/scans-vulnerabilities
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud On-Demand Scanning Scans.Vulnerabilities.
 *
 * An instance of an analysis type that has been found on a resource.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  getProjectId,
  isResourceNotFoundError,
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://ondemandscanning.googleapis.com/";

const LIST_CONFIG = {
  "id": "ondemandscanning.projects.locations.scans.vulnerabilities.list",
  "path": "v1/{+parent}/vulnerabilities",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  advisoryPublishTime: z.string().optional(),
  aiSkillAnalysis: z.object({
    findings: z.array(z.object({
      category: z.string(),
      location: z.object({
        filePath: z.string(),
        lineNumber: z.string(),
      }),
      scanner: z.string(),
      severity: z.string(),
    })),
    maxSeverity: z.string(),
    skillName: z.string(),
  }).optional(),
  attestation: z.object({
    jwts: z.array(z.object({
      compactJwt: z.string(),
    })),
    serializedPayload: z.string(),
    signatures: z.array(z.object({
      publicKeyId: z.string(),
      signature: z.string(),
    })),
  }).optional(),
  build: z.object({
    inTotoSlsaProvenanceV1: z.object({
      _type: z.string(),
      predicate: z.object({
        buildDefinition: z.object({
          buildType: z.string(),
          externalParameters: z.record(z.string(), z.unknown()),
          internalParameters: z.record(z.string(), z.unknown()),
          resolvedDependencies: z.array(z.unknown()),
        }),
        runDetails: z.object({
          builder: z.object({
            builderDependencies: z.unknown(),
            id: z.unknown(),
            version: z.unknown(),
          }),
          byproducts: z.array(z.unknown()),
          metadata: z.object({
            finishedOn: z.unknown(),
            invocationId: z.unknown(),
            startedOn: z.unknown(),
          }),
        }),
      }),
      predicateType: z.string(),
      subject: z.array(z.object({
        digest: z.record(z.string(), z.unknown()),
        name: z.string(),
      })),
    }),
    intotoProvenance: z.object({
      builderConfig: z.object({
        id: z.string(),
      }),
      materials: z.array(z.string()),
      metadata: z.object({
        buildFinishedOn: z.string(),
        buildInvocationId: z.string(),
        buildStartedOn: z.string(),
        completeness: z.object({
          arguments: z.boolean(),
          environment: z.boolean(),
          materials: z.boolean(),
        }),
        reproducible: z.boolean(),
      }),
      recipe: z.object({
        arguments: z.array(z.record(z.string(), z.unknown())),
        definedInMaterial: z.string(),
        entryPoint: z.string(),
        environment: z.array(z.record(z.string(), z.unknown())),
        type: z.string(),
      }),
    }),
    intotoStatement: z.object({
      _type: z.string(),
      predicateType: z.string(),
      provenance: z.object({
        builderConfig: z.object({
          id: z.string(),
        }),
        materials: z.array(z.string()),
        metadata: z.object({
          buildFinishedOn: z.string(),
          buildInvocationId: z.string(),
          buildStartedOn: z.string(),
          completeness: z.object({
            arguments: z.unknown(),
            environment: z.unknown(),
            materials: z.unknown(),
          }),
          reproducible: z.boolean(),
        }),
        recipe: z.object({
          arguments: z.array(z.unknown()),
          definedInMaterial: z.string(),
          entryPoint: z.string(),
          environment: z.array(z.unknown()),
          type: z.string(),
        }),
      }),
      slsaProvenance: z.object({
        builder: z.object({
          id: z.string(),
        }),
        materials: z.array(z.object({
          digest: z.unknown(),
          uri: z.unknown(),
        })),
        metadata: z.object({
          buildFinishedOn: z.string(),
          buildInvocationId: z.string(),
          buildStartedOn: z.string(),
          completeness: z.object({
            arguments: z.unknown(),
            environment: z.unknown(),
            materials: z.unknown(),
          }),
          reproducible: z.boolean(),
        }),
        recipe: z.object({
          arguments: z.record(z.string(), z.unknown()),
          definedInMaterial: z.string(),
          entryPoint: z.string(),
          environment: z.record(z.string(), z.unknown()),
          type: z.string(),
        }),
      }),
      slsaProvenanceZeroTwo: z.object({
        buildConfig: z.record(z.string(), z.unknown()),
        buildType: z.string(),
        builder: z.object({
          id: z.string(),
        }),
        invocation: z.object({
          configSource: z.object({
            digest: z.unknown(),
            entryPoint: z.unknown(),
            uri: z.unknown(),
          }),
          environment: z.record(z.string(), z.unknown()),
          parameters: z.record(z.string(), z.unknown()),
        }),
        materials: z.array(z.object({
          digest: z.unknown(),
          uri: z.unknown(),
        })),
        metadata: z.object({
          buildFinishedOn: z.string(),
          buildInvocationId: z.string(),
          buildStartedOn: z.string(),
          completeness: z.object({
            environment: z.unknown(),
            materials: z.unknown(),
            parameters: z.unknown(),
          }),
          reproducible: z.boolean(),
        }),
      }),
      subject: z.array(z.object({
        digest: z.record(z.string(), z.unknown()),
        name: z.string(),
      })),
    }),
    provenance: z.object({
      buildOptions: z.record(z.string(), z.unknown()),
      builderVersion: z.string(),
      builtArtifacts: z.array(z.object({
        checksum: z.string(),
        id: z.string(),
        names: z.array(z.unknown()),
      })),
      commands: z.array(z.object({
        args: z.array(z.unknown()),
        dir: z.string(),
        env: z.array(z.unknown()),
        id: z.string(),
        name: z.string(),
        waitFor: z.array(z.unknown()),
      })),
      createTime: z.string(),
      creator: z.string(),
      endTime: z.string(),
      id: z.string(),
      logsUri: z.string(),
      projectId: z.string(),
      sourceProvenance: z.object({
        additionalContexts: z.array(z.object({
          cloudRepo: z.unknown(),
          gerrit: z.unknown(),
          git: z.unknown(),
          labels: z.unknown(),
        })),
        artifactStorageSourceUri: z.string(),
        context: z.object({
          cloudRepo: z.object({
            aliasContext: z.unknown(),
            repoId: z.unknown(),
            revisionId: z.unknown(),
          }),
          gerrit: z.object({
            aliasContext: z.unknown(),
            gerritProject: z.unknown(),
            hostUri: z.unknown(),
            revisionId: z.unknown(),
          }),
          git: z.object({
            revisionId: z.unknown(),
            url: z.unknown(),
          }),
          labels: z.record(z.string(), z.unknown()),
        }),
        fileHashes: z.record(z.string(), z.unknown()),
      }),
      startTime: z.string(),
      triggerId: z.string(),
    }),
    provenanceBytes: z.string(),
  }).optional(),
  compliance: z.object({
    nonComplianceReason: z.string(),
    nonCompliantFiles: z.array(z.object({
      displayCommand: z.string(),
      path: z.string(),
      reason: z.string(),
    })),
    version: z.object({
      benchmarkDocument: z.string(),
      cpeUri: z.string(),
      version: z.string(),
    }),
  }).optional(),
  createTime: z.string().optional(),
  deployment: z.object({
    address: z.string(),
    config: z.string(),
    deployTime: z.string(),
    platform: z.string(),
    resourceUri: z.array(z.string()),
    undeployTime: z.string(),
    userEmail: z.string(),
  }).optional(),
  discovery: z.object({
    analysisCompleted: z.object({
      analysisType: z.array(z.string()),
    }),
    analysisError: z.array(z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    })),
    analysisStatus: z.string(),
    analysisStatusError: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    archiveTime: z.string(),
    continuousAnalysis: z.string(),
    cpe: z.string(),
    files: z.array(z.object({
      digest: z.record(z.string(), z.unknown()),
      name: z.string(),
    })),
    lastScanTime: z.string(),
    lastVulnerabilityUpdateTime: z.string(),
    sbomStatus: z.object({
      error: z.string(),
      sbomState: z.string(),
    }),
  }).optional(),
  dsseAttestation: z.object({
    envelope: z.object({
      payload: z.string(),
      payloadType: z.string(),
      signatures: z.array(z.object({
        keyid: z.string(),
        sig: z.string(),
      })),
    }),
    statement: z.object({
      _type: z.string(),
      predicateType: z.string(),
      provenance: z.object({
        builderConfig: z.object({
          id: z.string(),
        }),
        materials: z.array(z.string()),
        metadata: z.object({
          buildFinishedOn: z.string(),
          buildInvocationId: z.string(),
          buildStartedOn: z.string(),
          completeness: z.object({
            arguments: z.unknown(),
            environment: z.unknown(),
            materials: z.unknown(),
          }),
          reproducible: z.boolean(),
        }),
        recipe: z.object({
          arguments: z.array(z.unknown()),
          definedInMaterial: z.string(),
          entryPoint: z.string(),
          environment: z.array(z.unknown()),
          type: z.string(),
        }),
      }),
      slsaProvenance: z.object({
        builder: z.object({
          id: z.string(),
        }),
        materials: z.array(z.object({
          digest: z.unknown(),
          uri: z.unknown(),
        })),
        metadata: z.object({
          buildFinishedOn: z.string(),
          buildInvocationId: z.string(),
          buildStartedOn: z.string(),
          completeness: z.object({
            arguments: z.unknown(),
            environment: z.unknown(),
            materials: z.unknown(),
          }),
          reproducible: z.boolean(),
        }),
        recipe: z.object({
          arguments: z.record(z.string(), z.unknown()),
          definedInMaterial: z.string(),
          entryPoint: z.string(),
          environment: z.record(z.string(), z.unknown()),
          type: z.string(),
        }),
      }),
      slsaProvenanceZeroTwo: z.object({
        buildConfig: z.record(z.string(), z.unknown()),
        buildType: z.string(),
        builder: z.object({
          id: z.string(),
        }),
        invocation: z.object({
          configSource: z.object({
            digest: z.unknown(),
            entryPoint: z.unknown(),
            uri: z.unknown(),
          }),
          environment: z.record(z.string(), z.unknown()),
          parameters: z.record(z.string(), z.unknown()),
        }),
        materials: z.array(z.object({
          digest: z.unknown(),
          uri: z.unknown(),
        })),
        metadata: z.object({
          buildFinishedOn: z.string(),
          buildInvocationId: z.string(),
          buildStartedOn: z.string(),
          completeness: z.object({
            environment: z.unknown(),
            materials: z.unknown(),
            parameters: z.unknown(),
          }),
          reproducible: z.boolean(),
        }),
      }),
      subject: z.array(z.object({
        digest: z.record(z.string(), z.unknown()),
        name: z.string(),
      })),
    }),
  }).optional(),
  envelope: z.object({
    payload: z.string(),
    payloadType: z.string(),
    signatures: z.array(z.object({
      keyid: z.string(),
      sig: z.string(),
    })),
  }).optional(),
  image: z.object({
    baseResourceUrl: z.string(),
    distance: z.number(),
    fingerprint: z.object({
      v1Name: z.string(),
      v2Blob: z.array(z.string()),
      v2Name: z.string(),
    }),
    layerInfo: z.array(z.object({
      arguments: z.string(),
      directive: z.string(),
    })),
  }).optional(),
  kind: z.string().optional(),
  name: z.string(),
  noteName: z.string().optional(),
  package: z.object({
    architecture: z.string(),
    cpeUri: z.string(),
    license: z.object({
      comments: z.string(),
      expression: z.string(),
    }),
    location: z.array(z.object({
      cpeUri: z.string(),
      path: z.string(),
      version: z.object({
        epoch: z.number(),
        fullName: z.string(),
        inclusive: z.boolean(),
        kind: z.string(),
        name: z.string(),
        revision: z.string(),
      }),
    })),
    name: z.string(),
    packageType: z.string(),
    version: z.object({
      epoch: z.number(),
      fullName: z.string(),
      inclusive: z.boolean(),
      kind: z.string(),
      name: z.string(),
      revision: z.string(),
    }),
  }).optional(),
  remediation: z.string().optional(),
  resourceUri: z.string().optional(),
  sbomReference: z.object({
    payload: z.object({
      _type: z.string(),
      predicate: z.object({
        digest: z.record(z.string(), z.unknown()),
        location: z.string(),
        mimeType: z.string(),
        referrerId: z.string(),
      }),
      predicateType: z.string(),
      subject: z.array(z.object({
        digest: z.record(z.string(), z.unknown()),
        name: z.string(),
      })),
    }),
    payloadType: z.string(),
    signatures: z.array(z.object({
      keyid: z.string(),
      sig: z.string(),
    })),
  }).optional(),
  secret: z.object({
    kind: z.string(),
    locations: z.array(z.object({
      fileLocation: z.object({
        filePath: z.string(),
        layerDetails: z.object({
          baseImages: z.unknown(),
          chainId: z.unknown(),
          command: z.unknown(),
          diffId: z.unknown(),
          index: z.unknown(),
        }),
        lineNumber: z.number(),
      }),
    })),
    statuses: z.array(z.object({
      message: z.string(),
      status: z.string(),
      updateTime: z.string(),
    })),
  }).optional(),
  updateTime: z.string().optional(),
  upgrade: z.object({
    distribution: z.object({
      classification: z.string(),
      cpeUri: z.string(),
      cve: z.array(z.string()),
      severity: z.string(),
    }),
    package: z.string(),
    parsedVersion: z.object({
      epoch: z.number(),
      fullName: z.string(),
      inclusive: z.boolean(),
      kind: z.string(),
      name: z.string(),
      revision: z.string(),
    }),
    windowsUpdate: z.object({
      categories: z.array(z.object({
        categoryId: z.string(),
        name: z.string(),
      })),
      description: z.string(),
      identity: z.object({
        revision: z.number(),
        updateId: z.string(),
      }),
      kbArticleIds: z.array(z.string()),
      lastPublishedTimestamp: z.string(),
      supportUrl: z.string(),
      title: z.string(),
    }),
  }).optional(),
  vulnerability: z.object({
    cvssScore: z.number(),
    cvssV2: z.object({
      attackComplexity: z.string(),
      attackRequirements: z.string(),
      attackVector: z.string(),
      authentication: z.string(),
      availabilityImpact: z.string(),
      baseScore: z.number(),
      confidentialityImpact: z.string(),
      exploitabilityScore: z.number(),
      impactScore: z.number(),
      integrityImpact: z.string(),
      privilegesRequired: z.string(),
      scope: z.string(),
      subsequentSystemAvailabilityImpact: z.string(),
      subsequentSystemConfidentialityImpact: z.string(),
      subsequentSystemIntegrityImpact: z.string(),
      userInteraction: z.string(),
      vulnerableSystemAvailabilityImpact: z.string(),
      vulnerableSystemConfidentialityImpact: z.string(),
      vulnerableSystemIntegrityImpact: z.string(),
    }),
    cvssVersion: z.string(),
    cvssv3: z.object({
      attackComplexity: z.string(),
      attackRequirements: z.string(),
      attackVector: z.string(),
      authentication: z.string(),
      availabilityImpact: z.string(),
      baseScore: z.number(),
      confidentialityImpact: z.string(),
      exploitabilityScore: z.number(),
      impactScore: z.number(),
      integrityImpact: z.string(),
      privilegesRequired: z.string(),
      scope: z.string(),
      subsequentSystemAvailabilityImpact: z.string(),
      subsequentSystemConfidentialityImpact: z.string(),
      subsequentSystemIntegrityImpact: z.string(),
      userInteraction: z.string(),
      vulnerableSystemAvailabilityImpact: z.string(),
      vulnerableSystemConfidentialityImpact: z.string(),
      vulnerableSystemIntegrityImpact: z.string(),
    }),
    effectiveSeverity: z.string(),
    extraDetails: z.string(),
    fixAvailable: z.boolean(),
    longDescription: z.string(),
    packageIssue: z.array(z.object({
      affectedCpeUri: z.string(),
      affectedPackage: z.string(),
      affectedVersion: z.object({
        epoch: z.number(),
        fullName: z.string(),
        inclusive: z.boolean(),
        kind: z.string(),
        name: z.string(),
        revision: z.string(),
      }),
      effectiveSeverity: z.string(),
      fileLocation: z.array(z.object({
        filePath: z.unknown(),
        layerDetails: z.unknown(),
        lineNumber: z.unknown(),
      })),
      fixAvailable: z.boolean(),
      fixedCpeUri: z.string(),
      fixedPackage: z.string(),
      fixedVersion: z.object({
        epoch: z.number(),
        fullName: z.string(),
        inclusive: z.boolean(),
        kind: z.string(),
        name: z.string(),
        revision: z.string(),
      }),
      packageType: z.string(),
    })),
    relatedUrls: z.array(z.object({
      label: z.string(),
      url: z.string(),
    })),
    risk: z.object({
      cisaKev: z.object({
        knownRansomwareCampaignUse: z.string(),
      }),
      epss: z.object({
        percentile: z.number(),
        score: z.number(),
      }),
    }),
    severity: z.string(),
    shortDescription: z.string(),
    type: z.string(),
    vexAssessment: z.object({
      cve: z.string(),
      impacts: z.array(z.string()),
      justification: z.object({
        details: z.string(),
        justificationType: z.string(),
      }),
      noteName: z.string(),
      relatedUris: z.array(z.object({
        label: z.string(),
        url: z.string(),
      })),
      remediations: z.array(z.object({
        details: z.string(),
        remediationType: z.string(),
        remediationUri: z.object({
          label: z.unknown(),
          url: z.unknown(),
        }),
      })),
      state: z.string(),
      vulnerabilityId: z.string(),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud On-Demand Scanning Scans.Vulnerabilities. Registered at `@swamp/gcp/ondemandscanning/scans-vulnerabilities`. */
export const model = {
  type: "@swamp/gcp/ondemandscanning/scans-vulnerabilities",
  version: "2026.05.24.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.09.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.22.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.05.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An instance of an analysis type that has been found on a resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a vulnerabilities",
      arguments: z.object({
        identifier: z.string().describe("The name of the vulnerabilities"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync vulnerabilities state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
          else if (existing["parent"]) {
            params["parent"] = String(existing["parent"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          const result = await readViaList(
            BASE_URL,
            LIST_CONFIG,
            params,
            "name",
            identifier,
          ) as StateData;
          const handle = await context.writeResource(
            "state",
            instanceName,
            result,
          );
          return { dataHandles: [handle] };
        } catch (error: unknown) {
          if (isResourceNotFoundError(error)) {
            const handle = await context.writeResource("state", instanceName, {
              status: "not_found",
              syncedAt: new Date().toISOString(),
            });
            return { dataHandles: [handle] };
          }
          throw error;
        }
      },
    },
  },
};
