// Auto-generated extension model for @swamp/gcp/containeranalysis/occurrences
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Container Analysis Occurrences.
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
  createResource,
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/occurrences/${shortName}`;
}

const BASE_URL = "https://containeranalysis.googleapis.com/";

const GET_CONFIG = {
  "id": "containeranalysis.projects.locations.occurrences.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "containeranalysis.projects.locations.occurrences.create",
  "path": "v1/{+parent}/occurrences",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "containeranalysis.projects.locations.occurrences.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "containeranalysis.projects.locations.occurrences.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "containeranalysis.projects.locations.occurrences.list",
  "path": "v1/{+parent}/occurrences",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
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
    "returnPartialSuccess": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  advisoryPublishTime: z.string().describe(
    "The time this advisory was published by the source.",
  ).optional(),
  aiSkillAnalysis: z.object({
    findings: z.array(z.object({
      category: z.string().describe("Category of the finding.").optional(),
      location: z.object({
        filePath: z.string().describe(
          "Relative path of the file containing the finding.",
        ).optional(),
        lineNumber: z.string().describe(
          "Line number (1-based), or 0 if whole File / unknown.",
        ).optional(),
      }).describe("Location details with file path and line number.")
        .optional(),
      scanner: z.string().describe(
        "Scanner determines which engine (e.g. static, llm) emitted the finding.",
      ).optional(),
      severity: z.string().describe("Severity of the finding.").optional(),
    })).describe("Findings produced by the analysis.").optional(),
    maxSeverity: z.string().describe("Maximum severity found among findings.")
      .optional(),
    skillName: z.string().describe(
      "Name of the skill that produced this analysis.",
    ).optional(),
  }).describe(
    "AISkillAnalysisOccurrence provides the results of an AI-based skill analysis.",
  ).optional(),
  attestation: z.object({
    jwts: z.array(z.object({
      compactJwt: z.string().describe(
        "The compact encoding of a JWS, which is always three base64 encoded strings joined by periods. For details, see: https://tools.ietf.org/html/rfc7515.html#section-3.1",
      ).optional(),
    })).describe(
      "One or more JWTs encoding a self-contained attestation. Each JWT encodes the payload that it verifies within the JWT itself. Verifier implementation SHOULD ignore the `serialized_payload` field when verifying these JWTs. If only JWTs are present on this AttestationOccurrence, then the `serialized_payload` SHOULD be left empty. Each JWT SHOULD encode a claim specific to the `resource_uri` of this Occurrence, but this is not validated by Grafeas metadata API implementations. The JWT itself is opaque to Grafeas.",
    ).optional(),
    serializedPayload: z.string().describe(
      "Required. The serialized payload that is verified by one or more `signatures`.",
    ).optional(),
    signatures: z.array(z.object({
      publicKeyId: z.string().describe(
        'The identifier for the public key that verifies this signature. * The `public_key_id` is required. * The `public_key_id` SHOULD be an RFC3986 conformant URI. * When possible, the `public_key_id` SHOULD be an immutable reference, such as a cryptographic digest. Examples of valid `public_key_id`s: OpenPGP V4 public key fingerprint: * "openpgp4fpr:74FAF3B861BDA0870C7B6DEF607E48D2A663AEEA" See https://www.iana.org/assignments/uri-schemes/prov/openpgp4fpr for more details on this scheme. RFC6920 digest-named SubjectPublicKeyInfo (digest of the DER serialization): * "ni:///sha-256;cD9o9Cq6LG3jD0iKXqEi_vdjJGecm_iXkbqVoScViaU" * "nih:///sha-256;703f68f42aba2c6de30f488a5ea122fef76324679c9bf89791ba95a1271589a5"',
      ).optional(),
      signature: z.string().describe(
        "The content of the signature, an opaque bytestring. The payload that this signature verifies MUST be unambiguously provided with the Signature during verification. A wrapper message might provide the payload explicitly. Alternatively, a message might have a canonical serialization that can always be unambiguously computed to derive the payload.",
      ).optional(),
    })).describe(
      "One or more signatures over `serialized_payload`. Verifier implementations should consider this attestation message verified if at least one `signature` verifies `serialized_payload`. See `Signature` in common.proto for more details on signature structure and verification.",
    ).optional(),
  }).describe(
    'Occurrence that represents a single "attestation". The authenticity of an attestation can be verified using the attached signature. If the verifier trusts the public key of the signer, then verifying the signature is sufficient to establish trust. In this circumstance, the authority to which this attestation is attached is primarily useful for lookup (how to find this attestation if you already know the authority and artifact to be verified) and intent (for which authority this attestation was intended to sign.',
  ).optional(),
  build: z.object({
    inTotoSlsaProvenanceV1: z.object({
      _type: z.string().describe(
        "InToto spec defined at https://github.com/in-toto/attestation/tree/main/spec#statement",
      ).optional(),
      predicate: z.object({
        buildDefinition: z.object({
          buildType: z.string().optional(),
          externalParameters: z.record(z.string(), z.unknown()).optional(),
          internalParameters: z.record(z.string(), z.unknown()).optional(),
          resolvedDependencies: z.array(z.unknown()).optional(),
        }).optional(),
        runDetails: z.object({
          builder: z.object({
            builderDependencies: z.unknown().optional(),
            id: z.unknown().optional(),
            version: z.unknown().optional(),
          }).optional(),
          byproducts: z.array(z.unknown()).optional(),
          metadata: z.object({
            finishedOn: z.unknown().optional(),
            invocationId: z.unknown().optional(),
            startedOn: z.unknown().optional(),
          }).optional(),
        }).optional(),
      }).describe(
        "Keep in sync with schema at https://github.com/slsa-framework/slsa/blob/main/docs/provenance/schema/v1/provenance.proto Builder renamed to ProvenanceBuilder because of Java conflicts.",
      ).optional(),
      predicateType: z.string().optional(),
      subject: z.array(z.object({
        digest: z.record(z.string(), z.unknown()).describe(
          '`"": ""` Algorithms can be e.g. sha256, sha512 See https://github.com/in-toto/attestation/blob/main/spec/field_types.md#DigestSet',
        ).optional(),
        name: z.string().optional(),
      })).optional(),
    }).optional(),
    intotoProvenance: z.object({
      builderConfig: z.object({
        id: z.string().optional(),
      }).optional(),
      materials: z.array(z.string()).describe(
        "The collection of artifacts that influenced the build including sources, dependencies, build tools, base images, and so on. This is considered to be incomplete unless metadata.completeness.materials is true. Unset or null is equivalent to empty.",
      ).optional(),
      metadata: z.object({
        buildFinishedOn: z.string().describe(
          "The timestamp of when the build completed.",
        ).optional(),
        buildInvocationId: z.string().describe(
          "Identifies the particular build invocation, which can be useful for finding associated logs or other ad-hoc analysis. The value SHOULD be globally unique, per in-toto Provenance spec.",
        ).optional(),
        buildStartedOn: z.string().describe(
          "The timestamp of when the build started.",
        ).optional(),
        completeness: z.object({
          arguments: z.boolean().describe(
            "If true, the builder claims that recipe.arguments is complete, meaning that all external inputs are properly captured in the recipe.",
          ).optional(),
          environment: z.boolean().describe(
            "If true, the builder claims that recipe.environment is claimed to be complete.",
          ).optional(),
          materials: z.boolean().describe(
            'If true, the builder claims that materials are complete, usually through some controls to prevent network access. Sometimes called "hermetic".',
          ).optional(),
        }).describe(
          "Indicates that the builder claims certain fields in this message to be complete.",
        ).optional(),
        reproducible: z.boolean().describe(
          "If true, the builder claims that running the recipe on materials will produce bit-for-bit identical output.",
        ).optional(),
      }).describe("Other properties of the build.").optional(),
      recipe: z.object({
        arguments: z.array(z.record(z.string(), z.unknown())).describe(
          'Collection of all external inputs that influenced the build on top of recipe.definedInMaterial and recipe.entryPoint. For example, if the recipe type were "make", then this might be the flags passed to make aside from the target, which is captured in recipe.entryPoint. Since the arguments field can greatly vary in structure, depending on the builder and recipe type, this is of form "Any".',
        ).optional(),
        definedInMaterial: z.string().describe(
          'Index in materials containing the recipe steps that are not implied by recipe.type. For example, if the recipe type were "make", then this would point to the source containing the Makefile, not the make program itself. Set to -1 if the recipe doesn\'t come from a material, as zero is default unset value for int64.',
        ).optional(),
        entryPoint: z.string().describe(
          'String identifying the entry point into the build. This is often a path to a configuration file and/or a target label within that file. The syntax and meaning are defined by recipe.type. For example, if the recipe type were "make", then this would reference the directory in which to run make as well as which target to use.',
        ).optional(),
        environment: z.array(z.record(z.string(), z.unknown())).describe(
          'Any other builder-controlled inputs necessary for correctly evaluating the recipe. Usually only needed for reproducing the build but not evaluated as part of policy. Since the environment field can greatly vary in structure, depending on the builder and recipe type, this is of form "Any".',
        ).optional(),
        type: z.string().describe(
          "URI indicating what type of recipe was performed. It determines the meaning of recipe.entryPoint, recipe.arguments, recipe.environment, and materials.",
        ).optional(),
      }).describe(
        "Steps taken to build the artifact. For a TaskRun, typically each container corresponds to one step in the recipe.",
      ).optional(),
    }).optional(),
    intotoStatement: z.object({
      _type: z.string().describe("Always `https://in-toto.io/Statement/v0.1`.")
        .optional(),
      predicateType: z.string().describe(
        "`https://slsa.dev/provenance/v0.1` for SlsaProvenance.",
      ).optional(),
      provenance: z.object({
        builderConfig: z.object({
          id: z.string().optional(),
        }).optional(),
        materials: z.array(z.string()).describe(
          "The collection of artifacts that influenced the build including sources, dependencies, build tools, base images, and so on. This is considered to be incomplete unless metadata.completeness.materials is true. Unset or null is equivalent to empty.",
        ).optional(),
        metadata: z.object({
          buildFinishedOn: z.string().describe(
            "The timestamp of when the build completed.",
          ).optional(),
          buildInvocationId: z.string().describe(
            "Identifies the particular build invocation, which can be useful for finding associated logs or other ad-hoc analysis. The value SHOULD be globally unique, per in-toto Provenance spec.",
          ).optional(),
          buildStartedOn: z.string().describe(
            "The timestamp of when the build started.",
          ).optional(),
          completeness: z.object({
            arguments: z.unknown().describe(
              "If true, the builder claims that recipe.arguments is complete, meaning that all external inputs are properly captured in the recipe.",
            ).optional(),
            environment: z.unknown().describe(
              "If true, the builder claims that recipe.environment is claimed to be complete.",
            ).optional(),
            materials: z.unknown().describe(
              'If true, the builder claims that materials are complete, usually through some controls to prevent network access. Sometimes called "hermetic".',
            ).optional(),
          }).describe(
            "Indicates that the builder claims certain fields in this message to be complete.",
          ).optional(),
          reproducible: z.boolean().describe(
            "If true, the builder claims that running the recipe on materials will produce bit-for-bit identical output.",
          ).optional(),
        }).describe("Other properties of the build.").optional(),
        recipe: z.object({
          arguments: z.array(z.unknown()).describe(
            'Collection of all external inputs that influenced the build on top of recipe.definedInMaterial and recipe.entryPoint. For example, if the recipe type were "make", then this might be the flags passed to make aside from the target, which is captured in recipe.entryPoint. Since the arguments field can greatly vary in structure, depending on the builder and recipe type, this is of form "Any".',
          ).optional(),
          definedInMaterial: z.string().describe(
            'Index in materials containing the recipe steps that are not implied by recipe.type. For example, if the recipe type were "make", then this would point to the source containing the Makefile, not the make program itself. Set to -1 if the recipe doesn\'t come from a material, as zero is default unset value for int64.',
          ).optional(),
          entryPoint: z.string().describe(
            'String identifying the entry point into the build. This is often a path to a configuration file and/or a target label within that file. The syntax and meaning are defined by recipe.type. For example, if the recipe type were "make", then this would reference the directory in which to run make as well as which target to use.',
          ).optional(),
          environment: z.array(z.unknown()).describe(
            'Any other builder-controlled inputs necessary for correctly evaluating the recipe. Usually only needed for reproducing the build but not evaluated as part of policy. Since the environment field can greatly vary in structure, depending on the builder and recipe type, this is of form "Any".',
          ).optional(),
          type: z.string().describe(
            "URI indicating what type of recipe was performed. It determines the meaning of recipe.entryPoint, recipe.arguments, recipe.environment, and materials.",
          ).optional(),
        }).describe(
          "Steps taken to build the artifact. For a TaskRun, typically each container corresponds to one step in the recipe.",
        ).optional(),
      }).optional(),
      slsaProvenance: z.object({
        builder: z.object({
          id: z.string().optional(),
        }).optional(),
        materials: z.array(z.object({
          digest: z.unknown().optional(),
          uri: z.unknown().optional(),
        })).describe(
          "The collection of artifacts that influenced the build including sources, dependencies, build tools, base images, and so on. This is considered to be incomplete unless metadata.completeness.materials is true. Unset or null is equivalent to empty.",
        ).optional(),
        metadata: z.object({
          buildFinishedOn: z.string().describe(
            "The timestamp of when the build completed.",
          ).optional(),
          buildInvocationId: z.string().describe(
            "Identifies the particular build invocation, which can be useful for finding associated logs or other ad-hoc analysis. The value SHOULD be globally unique, per in-toto Provenance spec.",
          ).optional(),
          buildStartedOn: z.string().describe(
            "The timestamp of when the build started.",
          ).optional(),
          completeness: z.object({
            arguments: z.unknown().describe(
              "If true, the builder claims that recipe.arguments is complete, meaning that all external inputs are properly captured in the recipe.",
            ).optional(),
            environment: z.unknown().describe(
              "If true, the builder claims that recipe.environment is claimed to be complete.",
            ).optional(),
            materials: z.unknown().describe(
              'If true, the builder claims that materials are complete, usually through some controls to prevent network access. Sometimes called "hermetic".',
            ).optional(),
          }).describe(
            "Indicates that the builder claims certain fields in this message to be complete.",
          ).optional(),
          reproducible: z.boolean().describe(
            "If true, the builder claims that running the recipe on materials will produce bit-for-bit identical output.",
          ).optional(),
        }).describe("Other properties of the build.").optional(),
        recipe: z.object({
          arguments: z.record(z.string(), z.unknown()).describe(
            'Collection of all external inputs that influenced the build on top of recipe.definedInMaterial and recipe.entryPoint. For example, if the recipe type were "make", then this might be the flags passed to make aside from the target, which is captured in recipe.entryPoint. Depending on the recipe Type, the structure may be different.',
          ).optional(),
          definedInMaterial: z.string().describe(
            'Index in materials containing the recipe steps that are not implied by recipe.type. For example, if the recipe type were "make", then this would point to the source containing the Makefile, not the make program itself. Set to -1 if the recipe doesn\'t come from a material, as zero is default unset value for int64.',
          ).optional(),
          entryPoint: z.string().describe(
            'String identifying the entry point into the build. This is often a path to a configuration file and/or a target label within that file. The syntax and meaning are defined by recipe.type. For example, if the recipe type were "make", then this would reference the directory in which to run make as well as which target to use.',
          ).optional(),
          environment: z.record(z.string(), z.unknown()).describe(
            "Any other builder-controlled inputs necessary for correctly evaluating the recipe. Usually only needed for reproducing the build but not evaluated as part of policy. Depending on the recipe Type, the structure may be different.",
          ).optional(),
          type: z.string().describe(
            "URI indicating what type of recipe was performed. It determines the meaning of recipe.entryPoint, recipe.arguments, recipe.environment, and materials.",
          ).optional(),
        }).describe(
          "Steps taken to build the artifact. For a TaskRun, typically each container corresponds to one step in the recipe.",
        ).optional(),
      }).optional(),
      slsaProvenanceZeroTwo: z.object({
        buildConfig: z.record(z.string(), z.string()).optional(),
        buildType: z.string().optional(),
        builder: z.object({
          id: z.string().optional(),
        }).describe(
          "Identifies the entity that executed the recipe, which is trusted to have correctly performed the operation and populated this provenance.",
        ).optional(),
        invocation: z.object({
          configSource: z.object({
            digest: z.unknown().optional(),
            entryPoint: z.unknown().optional(),
            uri: z.unknown().optional(),
          }).describe(
            "Describes where the config file that kicked off the build came from. This is effectively a pointer to the source where buildConfig came from.",
          ).optional(),
          environment: z.record(z.string(), z.unknown()).optional(),
          parameters: z.record(z.string(), z.unknown()).optional(),
        }).describe("Identifies the event that kicked off the build.")
          .optional(),
        materials: z.array(z.object({
          digest: z.unknown().optional(),
          uri: z.unknown().optional(),
        })).optional(),
        metadata: z.object({
          buildFinishedOn: z.string().optional(),
          buildInvocationId: z.string().optional(),
          buildStartedOn: z.string().optional(),
          completeness: z.object({
            environment: z.unknown().optional(),
            materials: z.unknown().optional(),
            parameters: z.unknown().optional(),
          }).describe(
            "Indicates that the builder claims certain fields in this message to be complete.",
          ).optional(),
          reproducible: z.boolean().optional(),
        }).describe("Other properties of the build.").optional(),
      }).describe("See full explanation of fields at slsa.dev/provenance/v0.2.")
        .optional(),
      subject: z.array(z.object({
        digest: z.record(z.string(), z.unknown()).describe(
          '`"": ""` Algorithms can be e.g. sha256, sha512 See https://github.com/in-toto/attestation/blob/main/spec/field_types.md#DigestSet',
        ).optional(),
        name: z.string().optional(),
      })).optional(),
    }).describe(
      'Spec defined at https://github.com/in-toto/attestation/tree/main/spec#statement The serialized InTotoStatement will be stored as Envelope.payload. Envelope.payloadType is always "application/vnd.in-toto+json".',
    ).optional(),
    provenance: z.object({
      buildOptions: z.record(z.string(), z.string()).describe(
        "Special options applied to this build. This is a catch-all field where build providers can enter any desired additional details.",
      ).optional(),
      builderVersion: z.string().describe(
        "Version string of the builder at the time this build was executed.",
      ).optional(),
      builtArtifacts: z.array(z.object({
        checksum: z.string().describe(
          "Hash or checksum value of a binary, or Docker Registry 2.0 digest of a container.",
        ).optional(),
        id: z.string().describe(
          "Artifact ID, if any; for container images, this will be a URL by digest like `gcr.io/projectID/imagename@sha256:123456`.",
        ).optional(),
        names: z.array(z.unknown()).describe(
          "Related artifact names. This may be the path to a binary or jar file, or in the case of a container build, the name used to push the container image to Google Container Registry, as presented to `docker push`. Note that a single Artifact ID can have multiple names, for example if two tags are applied to one image.",
        ).optional(),
      })).describe("Output of the build.").optional(),
      commands: z.array(z.object({
        args: z.array(z.unknown()).describe(
          "Command-line arguments used when executing this command.",
        ).optional(),
        dir: z.string().describe(
          "Working directory (relative to project source root) used when running this command.",
        ).optional(),
        env: z.array(z.unknown()).describe(
          "Environment variables set before running this command.",
        ).optional(),
        id: z.string().describe(
          "Optional unique identifier for this command, used in wait_for to reference this command as a dependency.",
        ).optional(),
        name: z.string().describe(
          "Required. Name of the command, as presented on the command line, or if the command is packaged as a Docker container, as presented to `docker pull`.",
        ).optional(),
        waitFor: z.array(z.unknown()).describe(
          "The ID(s) of the command(s) that this command depends on.",
        ).optional(),
      })).describe("Commands requested by the build.").optional(),
      createTime: z.string().describe("Time at which the build was created.")
        .optional(),
      creator: z.string().describe(
        "E-mail address of the user who initiated this build. Note that this was the user's e-mail address at the time the build was initiated; this address may not represent the same end-user for all time.",
      ).optional(),
      endTime: z.string().describe(
        "Time at which execution of the build was finished.",
      ).optional(),
      id: z.string().describe("Required. Unique identifier of the build.")
        .optional(),
      logsUri: z.string().describe(
        "URI where any logs for this provenance were written.",
      ).optional(),
      projectId: z.string().describe("ID of the project.").optional(),
      sourceProvenance: z.object({
        additionalContexts: z.array(z.object({
          cloudRepo: z.unknown().describe(
            "A CloudRepoSourceContext denotes a particular revision in a Google Cloud Source Repo.",
          ).optional(),
          gerrit: z.unknown().describe(
            "A SourceContext referring to a Gerrit project.",
          ).optional(),
          git: z.unknown().describe(
            "A GitSourceContext denotes a particular revision in a third party Git repository (e.g., GitHub).",
          ).optional(),
          labels: z.unknown().describe("Labels with user defined metadata.")
            .optional(),
        })).describe(
          "If provided, some of the source code used for the build may be found in these locations, in the case where the source repository had multiple remotes or submodules. This list will not include the context specified in the context field.",
        ).optional(),
        artifactStorageSourceUri: z.string().describe(
          "If provided, the input binary artifacts for the build came from this location.",
        ).optional(),
        context: z.object({
          cloudRepo: z.object({
            aliasContext: z.unknown().describe("An alias to a repo revision.")
              .optional(),
            repoId: z.unknown().describe(
              "A unique identifier for a Cloud Repo.",
            ).optional(),
            revisionId: z.unknown().describe("A revision ID.").optional(),
          }).describe(
            "A CloudRepoSourceContext denotes a particular revision in a Google Cloud Source Repo.",
          ).optional(),
          gerrit: z.object({
            aliasContext: z.unknown().describe("An alias to a repo revision.")
              .optional(),
            gerritProject: z.unknown().describe(
              'The full project name within the host. Projects may be nested, so "project/subproject" is a valid project name. The "repo name" is the hostURI/project.',
            ).optional(),
            hostUri: z.unknown().describe(
              "The URI of a running Gerrit instance.",
            ).optional(),
            revisionId: z.unknown().describe("A revision (commit) ID.")
              .optional(),
          }).describe("A SourceContext referring to a Gerrit project.")
            .optional(),
          git: z.object({
            revisionId: z.unknown().describe("Git commit hash.").optional(),
            url: z.unknown().describe("Git repository URL.").optional(),
          }).describe(
            "A GitSourceContext denotes a particular revision in a third party Git repository (e.g., GitHub).",
          ).optional(),
          labels: z.record(z.string(), z.unknown()).describe(
            "Labels with user defined metadata.",
          ).optional(),
        }).describe(
          "A SourceContext is a reference to a tree of files. A SourceContext together with a path point to a unique revision of a single file or directory.",
        ).optional(),
        fileHashes: z.record(
          z.string(),
          z.object({
            fileHash: z.unknown().describe(
              "Required. Collection of file hashes.",
            ).optional(),
          }),
        ).describe(
          "Hash(es) of the build source, which can be used to verify that the original source integrity was maintained in the build. The keys to this map are file paths used as build source and the values contain the hash values for those files. If the build source came in a single package such as a gzipped tarfile (.tar.gz), the FileHash will be for the single path to that file.",
        ).optional(),
      }).describe(
        "Source describes the location of the source used for the build.",
      ).optional(),
      startTime: z.string().describe(
        "Time at which execution of the build was started.",
      ).optional(),
      triggerId: z.string().describe(
        "Trigger identifier if the build was triggered automatically; empty if not.",
      ).optional(),
    }).describe(
      "Provenance of a build. Contains all information needed to verify the full details about the build from source to completion.",
    ).optional(),
    provenanceBytes: z.string().describe(
      "Serialized JSON representation of the provenance, used in generating the build signature in the corresponding build note. After verifying the signature, `provenance_bytes` can be unmarshalled and compared to the provenance to confirm that it is unchanged. A base64-encoded string representation of the provenance bytes is used for the signature in order to interoperate with openssl which expects this format for signature verification. The serialized form is captured both to avoid ambiguity in how the provenance is marshalled to json as well to prevent incompatibilities with future changes.",
    ).optional(),
  }).describe("Details of a build occurrence.").optional(),
  compliance: z.object({
    nonComplianceReason: z.string().optional(),
    nonCompliantFiles: z.array(z.object({
      displayCommand: z.string().describe(
        "Command to display the non-compliant files.",
      ).optional(),
      path: z.string().describe("Empty if `display_command` is set.")
        .optional(),
      reason: z.string().describe(
        "Explains why a file is non compliant for a CIS check.",
      ).optional(),
    })).optional(),
    version: z.object({
      benchmarkDocument: z.string().describe(
        'The name of the document that defines this benchmark, e.g. "CIS Container-Optimized OS".',
      ).optional(),
      cpeUri: z.string().describe(
        "The CPE URI (https://cpe.mitre.org/specification/) this benchmark is applicable to.",
      ).optional(),
      version: z.string().describe(
        "The version of the benchmark. This is set to the version of the OS-specific CIS document the benchmark is defined in.",
      ).optional(),
    }).describe(
      "Describes the CIS benchmark version that is applicable to a given OS and os version.",
    ).optional(),
  }).describe(
    "An indication that the compliance checks in the associated ComplianceNote were not satisfied for particular resources or a specified reason.",
  ).optional(),
  deployment: z.object({
    address: z.string().describe(
      "Address of the runtime element hosting this deployment.",
    ).optional(),
    config: z.string().describe("Configuration used to create this deployment.")
      .optional(),
    deployTime: z.string().describe(
      "Required. Beginning of the lifetime of this deployment.",
    ).optional(),
    platform: z.enum(["PLATFORM_UNSPECIFIED", "GKE", "FLEX", "CUSTOM"])
      .describe("Platform hosting this deployment.").optional(),
    resourceUri: z.array(z.string()).describe(
      "Output only. Resource URI for the artifact being deployed taken from the deployable field with the same name.",
    ).optional(),
    undeployTime: z.string().describe("End of the lifetime of this deployment.")
      .optional(),
    userEmail: z.string().describe(
      "Identity of the user that triggered this deployment.",
    ).optional(),
  }).describe(
    "The period during which some deployable was active in a runtime.",
  ).optional(),
  discovery: z.object({
    analysisCompleted: z.object({
      analysisType: z.array(z.string()).optional(),
    }).describe(
      "Indicates which analysis completed successfully. Multiple types of analysis can be performed on a single resource.",
    ).optional(),
    analysisError: z.array(z.object({
      code: z.number().int().describe(
        "The status code, which should be an enum value of google.rpc.Code.",
      ).optional(),
      details: z.array(z.record(z.string(), z.unknown())).describe(
        "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
      ).optional(),
      message: z.string().describe(
        "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
      ).optional(),
    })).describe(
      "Indicates any errors encountered during analysis of a resource. There could be 0 or more of these errors.",
    ).optional(),
    analysisStatus: z.enum([
      "ANALYSIS_STATUS_UNSPECIFIED",
      "PENDING",
      "SCANNING",
      "FINISHED_SUCCESS",
      "COMPLETE",
      "FINISHED_FAILED",
      "FINISHED_UNSUPPORTED",
    ]).describe("The status of discovery for the resource.").optional(),
    analysisStatusError: z.object({
      code: z.number().int().describe(
        "The status code, which should be an enum value of google.rpc.Code.",
      ).optional(),
      details: z.array(z.record(z.string(), z.string())).describe(
        "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
      ).optional(),
      message: z.string().describe(
        "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
      ).optional(),
    }).describe(
      "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
    ).optional(),
    archiveTime: z.string().describe(
      "Output only. The time occurrences related to this discovery occurrence were archived.",
    ).optional(),
    continuousAnalysis: z.enum([
      "CONTINUOUS_ANALYSIS_UNSPECIFIED",
      "ACTIVE",
      "INACTIVE",
    ]).describe("Whether the resource is continuously analyzed.").optional(),
    cpe: z.string().describe("The CPE of the resource being scanned.")
      .optional(),
    files: z.array(z.object({
      digest: z.record(z.string(), z.string()).optional(),
      name: z.string().optional(),
    })).describe("Files that make up the resource described by the occurrence.")
      .optional(),
    lastScanTime: z.string().describe(
      "The last time this resource was scanned.",
    ).optional(),
    lastVulnerabilityUpdateTime: z.string().describe(
      "The last time vulnerability scan results changed.",
    ).optional(),
    sbomStatus: z.object({
      error: z.string().describe(
        "If there was an error generating an SBOM, this will indicate what that error was.",
      ).optional(),
      sbomState: z.enum(["SBOM_STATE_UNSPECIFIED", "PENDING", "COMPLETE"])
        .describe("The progress of the SBOM generation.").optional(),
    }).describe("The status of an SBOM generation.").optional(),
  }).describe(
    "Provides information about the analysis status of a discovered resource.",
  ).optional(),
  dsseAttestation: z.object({
    envelope: z.object({
      payload: z.string().optional(),
      payloadType: z.string().optional(),
      signatures: z.array(z.object({
        keyid: z.string().optional(),
        sig: z.string().optional(),
      })).optional(),
    }).describe(
      "MUST match https://github.com/secure-systems-lab/dsse/blob/master/envelope.proto. An authenticated message of arbitrary type.",
    ).optional(),
    statement: z.object({
      _type: z.string().describe("Always `https://in-toto.io/Statement/v0.1`.")
        .optional(),
      predicateType: z.string().describe(
        "`https://slsa.dev/provenance/v0.1` for SlsaProvenance.",
      ).optional(),
      provenance: z.object({
        builderConfig: z.object({
          id: z.string().optional(),
        }).optional(),
        materials: z.array(z.string()).describe(
          "The collection of artifacts that influenced the build including sources, dependencies, build tools, base images, and so on. This is considered to be incomplete unless metadata.completeness.materials is true. Unset or null is equivalent to empty.",
        ).optional(),
        metadata: z.object({
          buildFinishedOn: z.string().describe(
            "The timestamp of when the build completed.",
          ).optional(),
          buildInvocationId: z.string().describe(
            "Identifies the particular build invocation, which can be useful for finding associated logs or other ad-hoc analysis. The value SHOULD be globally unique, per in-toto Provenance spec.",
          ).optional(),
          buildStartedOn: z.string().describe(
            "The timestamp of when the build started.",
          ).optional(),
          completeness: z.object({
            arguments: z.unknown().describe(
              "If true, the builder claims that recipe.arguments is complete, meaning that all external inputs are properly captured in the recipe.",
            ).optional(),
            environment: z.unknown().describe(
              "If true, the builder claims that recipe.environment is claimed to be complete.",
            ).optional(),
            materials: z.unknown().describe(
              'If true, the builder claims that materials are complete, usually through some controls to prevent network access. Sometimes called "hermetic".',
            ).optional(),
          }).describe(
            "Indicates that the builder claims certain fields in this message to be complete.",
          ).optional(),
          reproducible: z.boolean().describe(
            "If true, the builder claims that running the recipe on materials will produce bit-for-bit identical output.",
          ).optional(),
        }).describe("Other properties of the build.").optional(),
        recipe: z.object({
          arguments: z.array(z.unknown()).describe(
            'Collection of all external inputs that influenced the build on top of recipe.definedInMaterial and recipe.entryPoint. For example, if the recipe type were "make", then this might be the flags passed to make aside from the target, which is captured in recipe.entryPoint. Since the arguments field can greatly vary in structure, depending on the builder and recipe type, this is of form "Any".',
          ).optional(),
          definedInMaterial: z.string().describe(
            'Index in materials containing the recipe steps that are not implied by recipe.type. For example, if the recipe type were "make", then this would point to the source containing the Makefile, not the make program itself. Set to -1 if the recipe doesn\'t come from a material, as zero is default unset value for int64.',
          ).optional(),
          entryPoint: z.string().describe(
            'String identifying the entry point into the build. This is often a path to a configuration file and/or a target label within that file. The syntax and meaning are defined by recipe.type. For example, if the recipe type were "make", then this would reference the directory in which to run make as well as which target to use.',
          ).optional(),
          environment: z.array(z.unknown()).describe(
            'Any other builder-controlled inputs necessary for correctly evaluating the recipe. Usually only needed for reproducing the build but not evaluated as part of policy. Since the environment field can greatly vary in structure, depending on the builder and recipe type, this is of form "Any".',
          ).optional(),
          type: z.string().describe(
            "URI indicating what type of recipe was performed. It determines the meaning of recipe.entryPoint, recipe.arguments, recipe.environment, and materials.",
          ).optional(),
        }).describe(
          "Steps taken to build the artifact. For a TaskRun, typically each container corresponds to one step in the recipe.",
        ).optional(),
      }).optional(),
      slsaProvenance: z.object({
        builder: z.object({
          id: z.string().optional(),
        }).optional(),
        materials: z.array(z.object({
          digest: z.unknown().optional(),
          uri: z.unknown().optional(),
        })).describe(
          "The collection of artifacts that influenced the build including sources, dependencies, build tools, base images, and so on. This is considered to be incomplete unless metadata.completeness.materials is true. Unset or null is equivalent to empty.",
        ).optional(),
        metadata: z.object({
          buildFinishedOn: z.string().describe(
            "The timestamp of when the build completed.",
          ).optional(),
          buildInvocationId: z.string().describe(
            "Identifies the particular build invocation, which can be useful for finding associated logs or other ad-hoc analysis. The value SHOULD be globally unique, per in-toto Provenance spec.",
          ).optional(),
          buildStartedOn: z.string().describe(
            "The timestamp of when the build started.",
          ).optional(),
          completeness: z.object({
            arguments: z.unknown().describe(
              "If true, the builder claims that recipe.arguments is complete, meaning that all external inputs are properly captured in the recipe.",
            ).optional(),
            environment: z.unknown().describe(
              "If true, the builder claims that recipe.environment is claimed to be complete.",
            ).optional(),
            materials: z.unknown().describe(
              'If true, the builder claims that materials are complete, usually through some controls to prevent network access. Sometimes called "hermetic".',
            ).optional(),
          }).describe(
            "Indicates that the builder claims certain fields in this message to be complete.",
          ).optional(),
          reproducible: z.boolean().describe(
            "If true, the builder claims that running the recipe on materials will produce bit-for-bit identical output.",
          ).optional(),
        }).describe("Other properties of the build.").optional(),
        recipe: z.object({
          arguments: z.record(z.string(), z.unknown()).describe(
            'Collection of all external inputs that influenced the build on top of recipe.definedInMaterial and recipe.entryPoint. For example, if the recipe type were "make", then this might be the flags passed to make aside from the target, which is captured in recipe.entryPoint. Depending on the recipe Type, the structure may be different.',
          ).optional(),
          definedInMaterial: z.string().describe(
            'Index in materials containing the recipe steps that are not implied by recipe.type. For example, if the recipe type were "make", then this would point to the source containing the Makefile, not the make program itself. Set to -1 if the recipe doesn\'t come from a material, as zero is default unset value for int64.',
          ).optional(),
          entryPoint: z.string().describe(
            'String identifying the entry point into the build. This is often a path to a configuration file and/or a target label within that file. The syntax and meaning are defined by recipe.type. For example, if the recipe type were "make", then this would reference the directory in which to run make as well as which target to use.',
          ).optional(),
          environment: z.record(z.string(), z.unknown()).describe(
            "Any other builder-controlled inputs necessary for correctly evaluating the recipe. Usually only needed for reproducing the build but not evaluated as part of policy. Depending on the recipe Type, the structure may be different.",
          ).optional(),
          type: z.string().describe(
            "URI indicating what type of recipe was performed. It determines the meaning of recipe.entryPoint, recipe.arguments, recipe.environment, and materials.",
          ).optional(),
        }).describe(
          "Steps taken to build the artifact. For a TaskRun, typically each container corresponds to one step in the recipe.",
        ).optional(),
      }).optional(),
      slsaProvenanceZeroTwo: z.object({
        buildConfig: z.record(z.string(), z.string()).optional(),
        buildType: z.string().optional(),
        builder: z.object({
          id: z.string().optional(),
        }).describe(
          "Identifies the entity that executed the recipe, which is trusted to have correctly performed the operation and populated this provenance.",
        ).optional(),
        invocation: z.object({
          configSource: z.object({
            digest: z.unknown().optional(),
            entryPoint: z.unknown().optional(),
            uri: z.unknown().optional(),
          }).describe(
            "Describes where the config file that kicked off the build came from. This is effectively a pointer to the source where buildConfig came from.",
          ).optional(),
          environment: z.record(z.string(), z.unknown()).optional(),
          parameters: z.record(z.string(), z.unknown()).optional(),
        }).describe("Identifies the event that kicked off the build.")
          .optional(),
        materials: z.array(z.object({
          digest: z.unknown().optional(),
          uri: z.unknown().optional(),
        })).optional(),
        metadata: z.object({
          buildFinishedOn: z.string().optional(),
          buildInvocationId: z.string().optional(),
          buildStartedOn: z.string().optional(),
          completeness: z.object({
            environment: z.unknown().optional(),
            materials: z.unknown().optional(),
            parameters: z.unknown().optional(),
          }).describe(
            "Indicates that the builder claims certain fields in this message to be complete.",
          ).optional(),
          reproducible: z.boolean().optional(),
        }).describe("Other properties of the build.").optional(),
      }).describe("See full explanation of fields at slsa.dev/provenance/v0.2.")
        .optional(),
      subject: z.array(z.object({
        digest: z.record(z.string(), z.unknown()).describe(
          '`"": ""` Algorithms can be e.g. sha256, sha512 See https://github.com/in-toto/attestation/blob/main/spec/field_types.md#DigestSet',
        ).optional(),
        name: z.string().optional(),
      })).optional(),
    }).describe(
      'Spec defined at https://github.com/in-toto/attestation/tree/main/spec#statement The serialized InTotoStatement will be stored as Envelope.payload. Envelope.payloadType is always "application/vnd.in-toto+json".',
    ).optional(),
  }).describe(
    "Deprecated. Prefer to use a regular Occurrence, and populate the Envelope at the top level of the Occurrence.",
  ).optional(),
  envelope: z.object({
    payload: z.string().optional(),
    payloadType: z.string().optional(),
    signatures: z.array(z.object({
      keyid: z.string().optional(),
      sig: z.string().optional(),
    })).optional(),
  }).describe(
    "MUST match https://github.com/secure-systems-lab/dsse/blob/master/envelope.proto. An authenticated message of arbitrary type.",
  ).optional(),
  image: z.object({
    baseResourceUrl: z.string().describe(
      "Output only. This contains the base image URL for the derived image occurrence.",
    ).optional(),
    distance: z.number().int().describe(
      "Output only. The number of layers by which this image differs from the associated image basis.",
    ).optional(),
    fingerprint: z.object({
      v1Name: z.string().describe(
        "Required. The layer ID of the final layer in the Docker image's v1 representation.",
      ).optional(),
      v2Blob: z.array(z.string()).describe(
        "Required. The ordered list of v2 blobs that represent a given image.",
      ).optional(),
      v2Name: z.string().describe(
        'Output only. The name of the image\'s v2 blobs computed via: [bottom]:= v2_blobbottom:= sha256(v2_blob[N] + " " + v2_name[N+1]) Only the name of the final blob is kept.',
      ).optional(),
    }).describe(
      "A set of properties that uniquely identify a given Docker image.",
    ).optional(),
    layerInfo: z.array(z.object({
      arguments: z.string().describe(
        "The recovered arguments to the Dockerfile directive.",
      ).optional(),
      directive: z.string().describe(
        "Required. The recovered Dockerfile directive used to construct this layer. See https://docs.docker.com/engine/reference/builder/ for more information.",
      ).optional(),
    })).describe(
      'This contains layer-specific metadata, if populated it has length "distance" and is ordered with [distance] being the layer immediately following the base image and [1] being the final layer.',
    ).optional(),
  }).describe(
    "Details of the derived image portion of the DockerImage relationship. This image would be produced from a Dockerfile with FROM.",
  ).optional(),
  noteName: z.string().describe(
    "Required. Immutable. The analysis note associated with this occurrence, in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. This field can be used as a filter in list requests.",
  ).optional(),
  package: z.object({
    architecture: z.enum(["ARCHITECTURE_UNSPECIFIED", "X86", "X64"]).describe(
      "Output only. The CPU architecture for which packages in this distribution channel were built. Architecture will be blank for language packages.",
    ).optional(),
    cpeUri: z.string().describe(
      "Output only. The cpe_uri in [CPE format](https://cpe.mitre.org/specification/) denoting the package manager version distributing a package. The cpe_uri will be blank for language packages.",
    ).optional(),
    license: z.object({
      comments: z.string().describe("Comments").optional(),
      expression: z.string().describe(
        'Often a single license can be used to represent the licensing terms. Sometimes it is necessary to include a choice of one or more licenses or some combination of license identifiers. Examples: "LGPL-2.1-only OR MIT", "LGPL-2.1-only AND MIT", "GPL-2.0-or-later WITH Bison-exception-2.2".',
      ).optional(),
    }).describe("License information.").optional(),
    location: z.array(z.object({
      cpeUri: z.string().describe(
        "Deprecated. The CPE URI in [CPE format](https://cpe.mitre.org/specification/)",
      ).optional(),
      path: z.string().describe(
        "The path from which we gathered that this package/version is installed.",
      ).optional(),
      version: z.object({
        epoch: z.number().int().describe(
          "Used to correct mistakes in the version numbering scheme.",
        ).optional(),
        fullName: z.string().describe(
          "Human readable version string. This string is of the form:- and is only set when kind is NORMAL.",
        ).optional(),
        inclusive: z.boolean().describe(
          "Whether this version is specifying part of an inclusive range. Grafeas does not have the capability to specify version ranges; instead we have fields that specify start version and end versions. At times this is insufficient - we also need to specify whether the version is included in the range or is excluded from the range. This boolean is expected to be set to true when the version is included in a range.",
        ).optional(),
        kind: z.enum([
          "VERSION_KIND_UNSPECIFIED",
          "NORMAL",
          "MINIMUM",
          "MAXIMUM",
        ]).describe(
          "Required. Distinguishes between sentinel MIN/MAX versions and normal versions.",
        ).optional(),
        name: z.string().describe(
          "Required only when version kind is NORMAL. The main part of the version name.",
        ).optional(),
        revision: z.string().describe(
          "The iteration of the package build from the above version.",
        ).optional(),
      }).describe(
        "Version contains structured information about the version of a package.",
      ).optional(),
    })).describe(
      "All of the places within the filesystem versions of this package have been found.",
    ).optional(),
    name: z.string().describe(
      "Required. Output only. The name of the installed package.",
    ).optional(),
    packageType: z.string().describe(
      "Output only. The type of package; whether native or non native (e.g., ruby gems, node.js packages, etc.).",
    ).optional(),
    version: z.object({
      epoch: z.number().int().describe(
        "Used to correct mistakes in the version numbering scheme.",
      ).optional(),
      fullName: z.string().describe(
        "Human readable version string. This string is of the form:- and is only set when kind is NORMAL.",
      ).optional(),
      inclusive: z.boolean().describe(
        "Whether this version is specifying part of an inclusive range. Grafeas does not have the capability to specify version ranges; instead we have fields that specify start version and end versions. At times this is insufficient - we also need to specify whether the version is included in the range or is excluded from the range. This boolean is expected to be set to true when the version is included in a range.",
      ).optional(),
      kind: z.enum(["VERSION_KIND_UNSPECIFIED", "NORMAL", "MINIMUM", "MAXIMUM"])
        .describe(
          "Required. Distinguishes between sentinel MIN/MAX versions and normal versions.",
        ).optional(),
      name: z.string().describe(
        "Required only when version kind is NORMAL. The main part of the version name.",
      ).optional(),
      revision: z.string().describe(
        "The iteration of the package build from the above version.",
      ).optional(),
    }).describe(
      "Version contains structured information about the version of a package.",
    ).optional(),
  }).describe(
    "Details on how a particular software package was installed on a system.",
  ).optional(),
  remediation: z.string().describe(
    "A description of actions that can be taken to remedy the note.",
  ).optional(),
  resourceUri: z.string().describe(
    "Required. Immutable. A URI that represents the resource for which the occurrence applies. For example, `https://gcr.io/project/image@sha256:123abc` for a Docker image.",
  ).optional(),
  sbomReference: z.object({
    payload: z.object({
      _type: z.string().describe("Identifier for the schema of the Statement.")
        .optional(),
      predicate: z.object({
        digest: z.record(z.string(), z.string()).describe(
          "A map of algorithm to digest of the contents of the SBOM.",
        ).optional(),
        location: z.string().describe("The location of the SBOM.").optional(),
        mimeType: z.string().describe("The mime type of the SBOM.").optional(),
        referrerId: z.string().describe(
          "The person or system referring this predicate to the consumer.",
        ).optional(),
      }).describe("A predicate which describes the SBOM being referenced.")
        .optional(),
      predicateType: z.string().describe(
        "URI identifying the type of the Predicate.",
      ).optional(),
      subject: z.array(z.object({
        digest: z.record(z.string(), z.unknown()).describe(
          '`"": ""` Algorithms can be e.g. sha256, sha512 See https://github.com/in-toto/attestation/blob/main/spec/field_types.md#DigestSet',
        ).optional(),
        name: z.string().optional(),
      })).describe(
        "Set of software artifacts that the attestation applies to. Each element represents a single software artifact.",
      ).optional(),
    }).describe(
      "The actual payload that contains the SBOM Reference data. The payload follows the intoto statement specification. See https://github.com/in-toto/attestation/blob/main/spec/v1.0/statement.md for more details.",
    ).optional(),
    payloadType: z.string().describe(
      "The kind of payload that SbomReferenceIntotoPayload takes. Since it's in the intoto format, this value is expected to be 'application/vnd.in-toto+json'.",
    ).optional(),
    signatures: z.array(z.object({
      keyid: z.string().optional(),
      sig: z.string().optional(),
    })).describe("The signatures over the payload.").optional(),
  }).describe(
    "The occurrence representing an SBOM reference as applied to a specific resource. The occurrence follows the DSSE specification. See https://github.com/secure-systems-lab/dsse/blob/master/envelope.md for more details.",
  ).optional(),
  secret: z.object({
    kind: z.enum([
      "SECRET_KIND_UNSPECIFIED",
      "SECRET_KIND_UNKNOWN",
      "SECRET_KIND_GCP_SERVICE_ACCOUNT_KEY",
      "SECRET_KIND_GCP_API_KEY",
      "SECRET_KIND_GCP_OAUTH2_CLIENT_CREDENTIALS",
      "SECRET_KIND_GCP_OAUTH2_ACCESS_TOKEN",
      "SECRET_KIND_ANTHROPIC_ADMIN_API_KEY",
      "SECRET_KIND_ANTHROPIC_API_KEY",
      "SECRET_KIND_AZURE_ACCESS_TOKEN",
      "SECRET_KIND_AZURE_IDENTITY_TOKEN",
      "SECRET_KIND_DOCKER_HUB_PERSONAL_ACCESS_TOKEN",
      "SECRET_KIND_GITHUB_APP_REFRESH_TOKEN",
      "SECRET_KIND_GITHUB_APP_SERVER_TO_SERVER_TOKEN",
      "SECRET_KIND_GITHUB_APP_USER_TO_SERVER_TOKEN",
      "SECRET_KIND_GITHUB_CLASSIC_PERSONAL_ACCESS_TOKEN",
      "SECRET_KIND_GITHUB_FINE_GRAINED_PERSONAL_ACCESS_TOKEN",
      "SECRET_KIND_GITHUB_OAUTH_TOKEN",
      "SECRET_KIND_HUGGINGFACE_API_KEY",
      "SECRET_KIND_OPENAI_API_KEY",
      "SECRET_KIND_PERPLEXITY_API_KEY",
      "SECRET_KIND_STRIPE_SECRET_KEY",
      "SECRET_KIND_STRIPE_RESTRICTED_KEY",
      "SECRET_KIND_STRIPE_WEBHOOK_SECRET",
    ]).describe("Required. Type of secret.").optional(),
    locations: z.array(z.object({
      fileLocation: z.object({
        filePath: z.string().describe(
          "For jars that are contained inside.war files, this filepath can indicate the path to war file combined with the path to jar file.",
        ).optional(),
        layerDetails: z.object({
          baseImages: z.unknown().describe(
            "The base images the layer is found within.",
          ).optional(),
          chainId: z.unknown().describe(
            "The layer chain ID (sha256 hash) of the layer in the container image. https://github.com/opencontainers/image-spec/blob/main/config.md#layer-chainid",
          ).optional(),
          command: z.unknown().describe(
            "The layer build command that was used to build the layer. This may not be found in all layers depending on how the container image is built.",
          ).optional(),
          diffId: z.unknown().describe(
            "The diff ID (typically a sha256 hash) of the layer in the container image.",
          ).optional(),
          index: z.unknown().describe(
            "The index of the layer in the container image.",
          ).optional(),
        }).describe("Details about the layer a package was found in.")
          .optional(),
        lineNumber: z.number().int().describe(
          "Line number in the file where the package was found. Optional field that only applies to source repository scanning.",
        ).optional(),
      }).describe("Indicates the location at which a package was found.")
        .optional(),
    })).describe("Optional. Locations where the secret is detected.")
      .optional(),
    statuses: z.array(z.object({
      message: z.string().describe(
        "Optional. Optional message about the status code.",
      ).optional(),
      status: z.enum(["STATUS_UNSPECIFIED", "UNKNOWN", "VALID", "INVALID"])
        .describe("Optional. The status of the secret.").optional(),
      updateTime: z.string().describe(
        "Optional. The time the secret status was last updated.",
      ).optional(),
    })).describe("Optional. Status of the secret.").optional(),
  }).describe("The occurrence provides details of a secret.").optional(),
  upgrade: z.object({
    distribution: z.object({
      classification: z.string().describe(
        "The operating system classification of this Upgrade, as specified by the upstream operating system upgrade feed. For Windows the classification is one of the category_ids listed at https://docs.microsoft.com/en-us/previous-versions/windows/desktop/ff357803(v=vs.85)",
      ).optional(),
      cpeUri: z.string().describe(
        "Required - The specific operating system this metadata applies to. See https://cpe.mitre.org/specification/.",
      ).optional(),
      cve: z.array(z.string()).describe("The cve tied to this Upgrade.")
        .optional(),
      severity: z.string().describe(
        "The severity as specified by the upstream operating system.",
      ).optional(),
    }).describe(
      "The Upgrade Distribution represents metadata about the Upgrade for each operating system (CPE). Some distributions have additional metadata around updates, classifying them into various categories and severities.",
    ).optional(),
    package: z.string().describe(
      "Required for non-Windows OS. The package this Upgrade is for.",
    ).optional(),
    parsedVersion: z.object({
      epoch: z.number().int().describe(
        "Used to correct mistakes in the version numbering scheme.",
      ).optional(),
      fullName: z.string().describe(
        "Human readable version string. This string is of the form:- and is only set when kind is NORMAL.",
      ).optional(),
      inclusive: z.boolean().describe(
        "Whether this version is specifying part of an inclusive range. Grafeas does not have the capability to specify version ranges; instead we have fields that specify start version and end versions. At times this is insufficient - we also need to specify whether the version is included in the range or is excluded from the range. This boolean is expected to be set to true when the version is included in a range.",
      ).optional(),
      kind: z.enum(["VERSION_KIND_UNSPECIFIED", "NORMAL", "MINIMUM", "MAXIMUM"])
        .describe(
          "Required. Distinguishes between sentinel MIN/MAX versions and normal versions.",
        ).optional(),
      name: z.string().describe(
        "Required only when version kind is NORMAL. The main part of the version name.",
      ).optional(),
      revision: z.string().describe(
        "The iteration of the package build from the above version.",
      ).optional(),
    }).describe(
      "Version contains structured information about the version of a package.",
    ).optional(),
    windowsUpdate: z.object({
      categories: z.array(z.object({
        categoryId: z.string().describe("The identifier of the category.")
          .optional(),
        name: z.string().describe("The localized name of the category.")
          .optional(),
      })).describe("The list of categories to which the update belongs.")
        .optional(),
      description: z.string().describe(
        "The localized description of the update.",
      ).optional(),
      identity: z.object({
        revision: z.number().int().describe(
          "The revision number of the update.",
        ).optional(),
        updateId: z.string().describe(
          "The revision independent identifier of the update.",
        ).optional(),
      }).describe("The unique identifier of the update.").optional(),
      kbArticleIds: z.array(z.string()).describe(
        "The Microsoft Knowledge Base article IDs that are associated with the update.",
      ).optional(),
      lastPublishedTimestamp: z.string().describe(
        "The last published timestamp of the update.",
      ).optional(),
      supportUrl: z.string().describe(
        "The hyperlink to the support information for the update.",
      ).optional(),
      title: z.string().describe("The localized title of the update.")
        .optional(),
    }).describe(
      "Windows Update represents the metadata about the update for the Windows operating system. The fields in this message come from the Windows Update API documented at https://docs.microsoft.com/en-us/windows/win32/api/wuapi/nn-wuapi-iupdate.",
    ).optional(),
  }).describe(
    "An Upgrade Occurrence represents that a specific resource_url could install a specific upgrade. This presence is supplied via local sources (i.e. it is present in the mirror and the running system has noticed its availability). For Windows, both distribution and windows_update contain information for the Windows update.",
  ).optional(),
  vulnerability: z.object({
    cvssScore: z.number().describe(
      "Output only. The CVSS score of this vulnerability. CVSS score is on a scale of 0 - 10 where 0 indicates low severity and 10 indicates high severity.",
    ).optional(),
    cvssV2: z.object({
      attackComplexity: z.enum([
        "ATTACK_COMPLEXITY_UNSPECIFIED",
        "ATTACK_COMPLEXITY_LOW",
        "ATTACK_COMPLEXITY_HIGH",
        "ATTACK_COMPLEXITY_MEDIUM",
      ]).optional(),
      attackVector: z.enum([
        "ATTACK_VECTOR_UNSPECIFIED",
        "ATTACK_VECTOR_NETWORK",
        "ATTACK_VECTOR_ADJACENT",
        "ATTACK_VECTOR_LOCAL",
        "ATTACK_VECTOR_PHYSICAL",
      ]).describe(
        "Base Metrics Represents the intrinsic characteristics of a vulnerability that are constant over time and across user environments.",
      ).optional(),
      authentication: z.enum([
        "AUTHENTICATION_UNSPECIFIED",
        "AUTHENTICATION_MULTIPLE",
        "AUTHENTICATION_SINGLE",
        "AUTHENTICATION_NONE",
      ]).optional(),
      availabilityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
        "IMPACT_PARTIAL",
        "IMPACT_COMPLETE",
      ]).optional(),
      baseScore: z.number().describe(
        "The base score is a function of the base metric scores.",
      ).optional(),
      confidentialityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
        "IMPACT_PARTIAL",
        "IMPACT_COMPLETE",
      ]).optional(),
      exploitabilityScore: z.number().optional(),
      impactScore: z.number().optional(),
      integrityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
        "IMPACT_PARTIAL",
        "IMPACT_COMPLETE",
      ]).optional(),
      privilegesRequired: z.enum([
        "PRIVILEGES_REQUIRED_UNSPECIFIED",
        "PRIVILEGES_REQUIRED_NONE",
        "PRIVILEGES_REQUIRED_LOW",
        "PRIVILEGES_REQUIRED_HIGH",
      ]).optional(),
      scope: z.enum(["SCOPE_UNSPECIFIED", "SCOPE_UNCHANGED", "SCOPE_CHANGED"])
        .optional(),
      userInteraction: z.enum([
        "USER_INTERACTION_UNSPECIFIED",
        "USER_INTERACTION_NONE",
        "USER_INTERACTION_REQUIRED",
      ]).optional(),
    }).describe(
      "Common Vulnerability Scoring System. For details, see https://www.first.org/cvss/specification-document This is a message we will try to use for storing various versions of CVSS rather than making a separate proto for storing a specific version.",
    ).optional(),
    cvssVersion: z.enum([
      "CVSS_VERSION_UNSPECIFIED",
      "CVSS_VERSION_2",
      "CVSS_VERSION_3",
    ]).describe(
      "Output only. CVSS version used to populate cvss_score and severity.",
    ).optional(),
    cvssv3: z.object({
      attackComplexity: z.enum([
        "ATTACK_COMPLEXITY_UNSPECIFIED",
        "ATTACK_COMPLEXITY_LOW",
        "ATTACK_COMPLEXITY_HIGH",
        "ATTACK_COMPLEXITY_MEDIUM",
      ]).optional(),
      attackVector: z.enum([
        "ATTACK_VECTOR_UNSPECIFIED",
        "ATTACK_VECTOR_NETWORK",
        "ATTACK_VECTOR_ADJACENT",
        "ATTACK_VECTOR_LOCAL",
        "ATTACK_VECTOR_PHYSICAL",
      ]).describe(
        "Base Metrics Represents the intrinsic characteristics of a vulnerability that are constant over time and across user environments.",
      ).optional(),
      authentication: z.enum([
        "AUTHENTICATION_UNSPECIFIED",
        "AUTHENTICATION_MULTIPLE",
        "AUTHENTICATION_SINGLE",
        "AUTHENTICATION_NONE",
      ]).optional(),
      availabilityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
        "IMPACT_PARTIAL",
        "IMPACT_COMPLETE",
      ]).optional(),
      baseScore: z.number().describe(
        "The base score is a function of the base metric scores.",
      ).optional(),
      confidentialityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
        "IMPACT_PARTIAL",
        "IMPACT_COMPLETE",
      ]).optional(),
      exploitabilityScore: z.number().optional(),
      impactScore: z.number().optional(),
      integrityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
        "IMPACT_PARTIAL",
        "IMPACT_COMPLETE",
      ]).optional(),
      privilegesRequired: z.enum([
        "PRIVILEGES_REQUIRED_UNSPECIFIED",
        "PRIVILEGES_REQUIRED_NONE",
        "PRIVILEGES_REQUIRED_LOW",
        "PRIVILEGES_REQUIRED_HIGH",
      ]).optional(),
      scope: z.enum(["SCOPE_UNSPECIFIED", "SCOPE_UNCHANGED", "SCOPE_CHANGED"])
        .optional(),
      userInteraction: z.enum([
        "USER_INTERACTION_UNSPECIFIED",
        "USER_INTERACTION_NONE",
        "USER_INTERACTION_REQUIRED",
      ]).optional(),
    }).describe(
      "Common Vulnerability Scoring System. For details, see https://www.first.org/cvss/specification-document This is a message we will try to use for storing various versions of CVSS rather than making a separate proto for storing a specific version.",
    ).optional(),
    effectiveSeverity: z.enum([
      "SEVERITY_UNSPECIFIED",
      "MINIMAL",
      "LOW",
      "MEDIUM",
      "HIGH",
      "CRITICAL",
    ]).describe(
      "The distro assigned severity for this vulnerability when it is available, otherwise this is the note provider assigned severity. When there are multiple PackageIssues for this vulnerability, they can have different effective severities because some might be provided by the distro while others are provided by the language ecosystem for a language pack. For this reason, it is advised to use the effective severity on the PackageIssue level. In the case where multiple PackageIssues have differing effective severities, this field should be the highest severity for any of the PackageIssues.",
    ).optional(),
    extraDetails: z.string().describe(
      "Occurrence-specific extra details about the vulnerability.",
    ).optional(),
    fixAvailable: z.boolean().describe(
      "Output only. Whether at least one of the affected packages has a fix available.",
    ).optional(),
    longDescription: z.string().describe(
      "Output only. A detailed description of this vulnerability.",
    ).optional(),
    packageIssue: z.array(z.object({
      affectedCpeUri: z.string().describe(
        "Required. The [CPE URI](https://cpe.mitre.org/specification/) this vulnerability was found in.",
      ).optional(),
      affectedPackage: z.string().describe(
        "Required. The package this vulnerability was found in.",
      ).optional(),
      affectedVersion: z.object({
        epoch: z.number().int().describe(
          "Used to correct mistakes in the version numbering scheme.",
        ).optional(),
        fullName: z.string().describe(
          "Human readable version string. This string is of the form:- and is only set when kind is NORMAL.",
        ).optional(),
        inclusive: z.boolean().describe(
          "Whether this version is specifying part of an inclusive range. Grafeas does not have the capability to specify version ranges; instead we have fields that specify start version and end versions. At times this is insufficient - we also need to specify whether the version is included in the range or is excluded from the range. This boolean is expected to be set to true when the version is included in a range.",
        ).optional(),
        kind: z.enum([
          "VERSION_KIND_UNSPECIFIED",
          "NORMAL",
          "MINIMUM",
          "MAXIMUM",
        ]).describe(
          "Required. Distinguishes between sentinel MIN/MAX versions and normal versions.",
        ).optional(),
        name: z.string().describe(
          "Required only when version kind is NORMAL. The main part of the version name.",
        ).optional(),
        revision: z.string().describe(
          "The iteration of the package build from the above version.",
        ).optional(),
      }).describe(
        "Version contains structured information about the version of a package.",
      ).optional(),
      effectiveSeverity: z.enum([
        "SEVERITY_UNSPECIFIED",
        "MINIMAL",
        "LOW",
        "MEDIUM",
        "HIGH",
        "CRITICAL",
      ]).describe(
        "Output only. The distro or language system assigned severity for this vulnerability when that is available and note provider assigned severity when it is not available.",
      ).optional(),
      fileLocation: z.array(z.object({
        filePath: z.unknown().describe(
          "For jars that are contained inside.war files, this filepath can indicate the path to war file combined with the path to jar file.",
        ).optional(),
        layerDetails: z.unknown().describe(
          "Details about the layer a package was found in.",
        ).optional(),
        lineNumber: z.unknown().describe(
          "Line number in the file where the package was found. Optional field that only applies to source repository scanning.",
        ).optional(),
      })).describe("The location at which this package was found.").optional(),
      fixAvailable: z.boolean().describe(
        "Output only. Whether a fix is available for this package.",
      ).optional(),
      fixedCpeUri: z.string().describe(
        "The [CPE URI](https://cpe.mitre.org/specification/) this vulnerability was fixed in. It is possible for this to be different from the affected_cpe_uri.",
      ).optional(),
      fixedPackage: z.string().describe(
        "The package this vulnerability was fixed in. It is possible for this to be different from the affected_package.",
      ).optional(),
      fixedVersion: z.object({
        epoch: z.number().int().describe(
          "Used to correct mistakes in the version numbering scheme.",
        ).optional(),
        fullName: z.string().describe(
          "Human readable version string. This string is of the form:- and is only set when kind is NORMAL.",
        ).optional(),
        inclusive: z.boolean().describe(
          "Whether this version is specifying part of an inclusive range. Grafeas does not have the capability to specify version ranges; instead we have fields that specify start version and end versions. At times this is insufficient - we also need to specify whether the version is included in the range or is excluded from the range. This boolean is expected to be set to true when the version is included in a range.",
        ).optional(),
        kind: z.enum([
          "VERSION_KIND_UNSPECIFIED",
          "NORMAL",
          "MINIMUM",
          "MAXIMUM",
        ]).describe(
          "Required. Distinguishes between sentinel MIN/MAX versions and normal versions.",
        ).optional(),
        name: z.string().describe(
          "Required only when version kind is NORMAL. The main part of the version name.",
        ).optional(),
        revision: z.string().describe(
          "The iteration of the package build from the above version.",
        ).optional(),
      }).describe(
        "Version contains structured information about the version of a package.",
      ).optional(),
      packageType: z.string().describe(
        "The type of package (e.g. OS, MAVEN, GO).",
      ).optional(),
    })).describe(
      "Required. The set of affected locations and their fixes (if available) within the associated resource.",
    ).optional(),
    relatedUrls: z.array(z.object({
      label: z.string().describe("Label to describe usage of the URL.")
        .optional(),
      url: z.string().describe("Specific URL associated with the resource.")
        .optional(),
    })).describe("Output only. URLs related to this vulnerability.").optional(),
    risk: z.object({
      cisaKev: z.object({
        knownRansomwareCampaignUse: z.string().describe(
          "Whether the vulnerability is known to have been leveraged as part of a ransomware campaign.",
        ).optional(),
      }).optional(),
      epss: z.object({
        percentile: z.number().describe(
          "The percentile of the current score, the proportion of all scored vulnerabilities with the same or a lower EPSS score",
        ).optional(),
        score: z.number().describe(
          "The EPSS score representing the probability [0-1] of exploitation in the wild in the next 30 days",
        ).optional(),
      }).optional(),
    }).optional(),
    severity: z.enum([
      "SEVERITY_UNSPECIFIED",
      "MINIMAL",
      "LOW",
      "MEDIUM",
      "HIGH",
      "CRITICAL",
    ]).describe(
      "Output only. The note provider assigned severity of this vulnerability.",
    ).optional(),
    shortDescription: z.string().describe(
      "Output only. A one sentence description of this vulnerability.",
    ).optional(),
    type: z.string().describe(
      "The type of package; whether native or non native (e.g., ruby gems, node.js packages, etc.).",
    ).optional(),
    vexAssessment: z.object({
      cve: z.string().describe(
        "Holds the MITRE standard Common Vulnerabilities and Exposures (CVE) tracking number for the vulnerability. Deprecated: Use vulnerability_id instead to denote CVEs.",
      ).optional(),
      impacts: z.array(z.string()).describe(
        "Contains information about the impact of this vulnerability, this will change with time.",
      ).optional(),
      justification: z.object({
        details: z.string().describe(
          "Additional details on why this justification was chosen.",
        ).optional(),
        justificationType: z.enum([
          "JUSTIFICATION_TYPE_UNSPECIFIED",
          "COMPONENT_NOT_PRESENT",
          "VULNERABLE_CODE_NOT_PRESENT",
          "VULNERABLE_CODE_NOT_IN_EXECUTE_PATH",
          "VULNERABLE_CODE_CANNOT_BE_CONTROLLED_BY_ADVERSARY",
          "INLINE_MITIGATIONS_ALREADY_EXIST",
        ]).describe("The justification type for this vulnerability.")
          .optional(),
      }).describe(
        "Justification provides the justification when the state of the assessment if NOT_AFFECTED.",
      ).optional(),
      noteName: z.string().describe(
        "The VulnerabilityAssessment note from which this VexAssessment was generated. This will be of the form: `projects/[PROJECT_ID]/notes/[NOTE_ID]`.",
      ).optional(),
      relatedUris: z.array(z.object({
        label: z.string().describe("Label to describe usage of the URL.")
          .optional(),
        url: z.string().describe("Specific URL associated with the resource.")
          .optional(),
      })).describe(
        "Holds a list of references associated with this vulnerability item and assessment.",
      ).optional(),
      remediations: z.array(z.object({
        details: z.string().describe(
          "Contains a comprehensive human-readable discussion of the remediation.",
        ).optional(),
        remediationType: z.enum([
          "REMEDIATION_TYPE_UNSPECIFIED",
          "MITIGATION",
          "NO_FIX_PLANNED",
          "NONE_AVAILABLE",
          "VENDOR_FIX",
          "WORKAROUND",
        ]).describe("The type of remediation that can be applied.").optional(),
        remediationUri: z.object({
          label: z.unknown().describe("Label to describe usage of the URL.")
            .optional(),
          url: z.unknown().describe(
            "Specific URL associated with the resource.",
          ).optional(),
        }).describe("Metadata for any related URL information.").optional(),
      })).describe(
        "Specifies details on how to handle (and presumably, fix) a vulnerability.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "AFFECTED",
        "NOT_AFFECTED",
        "FIXED",
        "UNDER_INVESTIGATION",
      ]).describe("Provides the state of this Vulnerability assessment.")
        .optional(),
      vulnerabilityId: z.string().describe(
        "The vulnerability identifier for this Assessment. Will hold one of common identifiers e.g. CVE, GHSA etc.",
      ).optional(),
    }).describe(
      "VexAssessment provides all publisher provided Vex information that is related to this vulnerability.",
    ).optional(),
  }).describe("An occurrence of a severity vulnerability on a resource.")
    .optional(),
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
      userInteraction: z.string(),
    }),
    cvssVersion: z.string(),
    cvssv3: z.object({
      attackComplexity: z.string(),
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
      userInteraction: z.string(),
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
  advisoryPublishTime: z.string().describe(
    "The time this advisory was published by the source.",
  ).optional(),
  aiSkillAnalysis: z.object({
    findings: z.array(z.object({
      category: z.string().describe("Category of the finding.").optional(),
      location: z.object({
        filePath: z.string().describe(
          "Relative path of the file containing the finding.",
        ).optional(),
        lineNumber: z.string().describe(
          "Line number (1-based), or 0 if whole File / unknown.",
        ).optional(),
      }).describe("Location details with file path and line number.")
        .optional(),
      scanner: z.string().describe(
        "Scanner determines which engine (e.g. static, llm) emitted the finding.",
      ).optional(),
      severity: z.string().describe("Severity of the finding.").optional(),
    })).describe("Findings produced by the analysis.").optional(),
    maxSeverity: z.string().describe("Maximum severity found among findings.")
      .optional(),
    skillName: z.string().describe(
      "Name of the skill that produced this analysis.",
    ).optional(),
  }).describe(
    "AISkillAnalysisOccurrence provides the results of an AI-based skill analysis.",
  ).optional(),
  attestation: z.object({
    jwts: z.array(z.object({
      compactJwt: z.string().describe(
        "The compact encoding of a JWS, which is always three base64 encoded strings joined by periods. For details, see: https://tools.ietf.org/html/rfc7515.html#section-3.1",
      ).optional(),
    })).describe(
      "One or more JWTs encoding a self-contained attestation. Each JWT encodes the payload that it verifies within the JWT itself. Verifier implementation SHOULD ignore the `serialized_payload` field when verifying these JWTs. If only JWTs are present on this AttestationOccurrence, then the `serialized_payload` SHOULD be left empty. Each JWT SHOULD encode a claim specific to the `resource_uri` of this Occurrence, but this is not validated by Grafeas metadata API implementations. The JWT itself is opaque to Grafeas.",
    ).optional(),
    serializedPayload: z.string().describe(
      "Required. The serialized payload that is verified by one or more `signatures`.",
    ).optional(),
    signatures: z.array(z.object({
      publicKeyId: z.string().describe(
        'The identifier for the public key that verifies this signature. * The `public_key_id` is required. * The `public_key_id` SHOULD be an RFC3986 conformant URI. * When possible, the `public_key_id` SHOULD be an immutable reference, such as a cryptographic digest. Examples of valid `public_key_id`s: OpenPGP V4 public key fingerprint: * "openpgp4fpr:74FAF3B861BDA0870C7B6DEF607E48D2A663AEEA" See https://www.iana.org/assignments/uri-schemes/prov/openpgp4fpr for more details on this scheme. RFC6920 digest-named SubjectPublicKeyInfo (digest of the DER serialization): * "ni:///sha-256;cD9o9Cq6LG3jD0iKXqEi_vdjJGecm_iXkbqVoScViaU" * "nih:///sha-256;703f68f42aba2c6de30f488a5ea122fef76324679c9bf89791ba95a1271589a5"',
      ).optional(),
      signature: z.string().describe(
        "The content of the signature, an opaque bytestring. The payload that this signature verifies MUST be unambiguously provided with the Signature during verification. A wrapper message might provide the payload explicitly. Alternatively, a message might have a canonical serialization that can always be unambiguously computed to derive the payload.",
      ).optional(),
    })).describe(
      "One or more signatures over `serialized_payload`. Verifier implementations should consider this attestation message verified if at least one `signature` verifies `serialized_payload`. See `Signature` in common.proto for more details on signature structure and verification.",
    ).optional(),
  }).describe(
    'Occurrence that represents a single "attestation". The authenticity of an attestation can be verified using the attached signature. If the verifier trusts the public key of the signer, then verifying the signature is sufficient to establish trust. In this circumstance, the authority to which this attestation is attached is primarily useful for lookup (how to find this attestation if you already know the authority and artifact to be verified) and intent (for which authority this attestation was intended to sign.',
  ).optional(),
  build: z.object({
    inTotoSlsaProvenanceV1: z.object({
      _type: z.string().describe(
        "InToto spec defined at https://github.com/in-toto/attestation/tree/main/spec#statement",
      ).optional(),
      predicate: z.object({
        buildDefinition: z.object({
          buildType: z.string().optional(),
          externalParameters: z.record(z.string(), z.unknown()).optional(),
          internalParameters: z.record(z.string(), z.unknown()).optional(),
          resolvedDependencies: z.array(z.unknown()).optional(),
        }).optional(),
        runDetails: z.object({
          builder: z.object({
            builderDependencies: z.unknown().optional(),
            id: z.unknown().optional(),
            version: z.unknown().optional(),
          }).optional(),
          byproducts: z.array(z.unknown()).optional(),
          metadata: z.object({
            finishedOn: z.unknown().optional(),
            invocationId: z.unknown().optional(),
            startedOn: z.unknown().optional(),
          }).optional(),
        }).optional(),
      }).describe(
        "Keep in sync with schema at https://github.com/slsa-framework/slsa/blob/main/docs/provenance/schema/v1/provenance.proto Builder renamed to ProvenanceBuilder because of Java conflicts.",
      ).optional(),
      predicateType: z.string().optional(),
      subject: z.array(z.object({
        digest: z.record(z.string(), z.unknown()).describe(
          '`"": ""` Algorithms can be e.g. sha256, sha512 See https://github.com/in-toto/attestation/blob/main/spec/field_types.md#DigestSet',
        ).optional(),
        name: z.string().optional(),
      })).optional(),
    }).optional(),
    intotoProvenance: z.object({
      builderConfig: z.object({
        id: z.string().optional(),
      }).optional(),
      materials: z.array(z.string()).describe(
        "The collection of artifacts that influenced the build including sources, dependencies, build tools, base images, and so on. This is considered to be incomplete unless metadata.completeness.materials is true. Unset or null is equivalent to empty.",
      ).optional(),
      metadata: z.object({
        buildFinishedOn: z.string().describe(
          "The timestamp of when the build completed.",
        ).optional(),
        buildInvocationId: z.string().describe(
          "Identifies the particular build invocation, which can be useful for finding associated logs or other ad-hoc analysis. The value SHOULD be globally unique, per in-toto Provenance spec.",
        ).optional(),
        buildStartedOn: z.string().describe(
          "The timestamp of when the build started.",
        ).optional(),
        completeness: z.object({
          arguments: z.boolean().describe(
            "If true, the builder claims that recipe.arguments is complete, meaning that all external inputs are properly captured in the recipe.",
          ).optional(),
          environment: z.boolean().describe(
            "If true, the builder claims that recipe.environment is claimed to be complete.",
          ).optional(),
          materials: z.boolean().describe(
            'If true, the builder claims that materials are complete, usually through some controls to prevent network access. Sometimes called "hermetic".',
          ).optional(),
        }).describe(
          "Indicates that the builder claims certain fields in this message to be complete.",
        ).optional(),
        reproducible: z.boolean().describe(
          "If true, the builder claims that running the recipe on materials will produce bit-for-bit identical output.",
        ).optional(),
      }).describe("Other properties of the build.").optional(),
      recipe: z.object({
        arguments: z.array(z.record(z.string(), z.unknown())).describe(
          'Collection of all external inputs that influenced the build on top of recipe.definedInMaterial and recipe.entryPoint. For example, if the recipe type were "make", then this might be the flags passed to make aside from the target, which is captured in recipe.entryPoint. Since the arguments field can greatly vary in structure, depending on the builder and recipe type, this is of form "Any".',
        ).optional(),
        definedInMaterial: z.string().describe(
          'Index in materials containing the recipe steps that are not implied by recipe.type. For example, if the recipe type were "make", then this would point to the source containing the Makefile, not the make program itself. Set to -1 if the recipe doesn\'t come from a material, as zero is default unset value for int64.',
        ).optional(),
        entryPoint: z.string().describe(
          'String identifying the entry point into the build. This is often a path to a configuration file and/or a target label within that file. The syntax and meaning are defined by recipe.type. For example, if the recipe type were "make", then this would reference the directory in which to run make as well as which target to use.',
        ).optional(),
        environment: z.array(z.record(z.string(), z.unknown())).describe(
          'Any other builder-controlled inputs necessary for correctly evaluating the recipe. Usually only needed for reproducing the build but not evaluated as part of policy. Since the environment field can greatly vary in structure, depending on the builder and recipe type, this is of form "Any".',
        ).optional(),
        type: z.string().describe(
          "URI indicating what type of recipe was performed. It determines the meaning of recipe.entryPoint, recipe.arguments, recipe.environment, and materials.",
        ).optional(),
      }).describe(
        "Steps taken to build the artifact. For a TaskRun, typically each container corresponds to one step in the recipe.",
      ).optional(),
    }).optional(),
    intotoStatement: z.object({
      _type: z.string().describe("Always `https://in-toto.io/Statement/v0.1`.")
        .optional(),
      predicateType: z.string().describe(
        "`https://slsa.dev/provenance/v0.1` for SlsaProvenance.",
      ).optional(),
      provenance: z.object({
        builderConfig: z.object({
          id: z.string().optional(),
        }).optional(),
        materials: z.array(z.string()).describe(
          "The collection of artifacts that influenced the build including sources, dependencies, build tools, base images, and so on. This is considered to be incomplete unless metadata.completeness.materials is true. Unset or null is equivalent to empty.",
        ).optional(),
        metadata: z.object({
          buildFinishedOn: z.string().describe(
            "The timestamp of when the build completed.",
          ).optional(),
          buildInvocationId: z.string().describe(
            "Identifies the particular build invocation, which can be useful for finding associated logs or other ad-hoc analysis. The value SHOULD be globally unique, per in-toto Provenance spec.",
          ).optional(),
          buildStartedOn: z.string().describe(
            "The timestamp of when the build started.",
          ).optional(),
          completeness: z.object({
            arguments: z.unknown().describe(
              "If true, the builder claims that recipe.arguments is complete, meaning that all external inputs are properly captured in the recipe.",
            ).optional(),
            environment: z.unknown().describe(
              "If true, the builder claims that recipe.environment is claimed to be complete.",
            ).optional(),
            materials: z.unknown().describe(
              'If true, the builder claims that materials are complete, usually through some controls to prevent network access. Sometimes called "hermetic".',
            ).optional(),
          }).describe(
            "Indicates that the builder claims certain fields in this message to be complete.",
          ).optional(),
          reproducible: z.boolean().describe(
            "If true, the builder claims that running the recipe on materials will produce bit-for-bit identical output.",
          ).optional(),
        }).describe("Other properties of the build.").optional(),
        recipe: z.object({
          arguments: z.array(z.unknown()).describe(
            'Collection of all external inputs that influenced the build on top of recipe.definedInMaterial and recipe.entryPoint. For example, if the recipe type were "make", then this might be the flags passed to make aside from the target, which is captured in recipe.entryPoint. Since the arguments field can greatly vary in structure, depending on the builder and recipe type, this is of form "Any".',
          ).optional(),
          definedInMaterial: z.string().describe(
            'Index in materials containing the recipe steps that are not implied by recipe.type. For example, if the recipe type were "make", then this would point to the source containing the Makefile, not the make program itself. Set to -1 if the recipe doesn\'t come from a material, as zero is default unset value for int64.',
          ).optional(),
          entryPoint: z.string().describe(
            'String identifying the entry point into the build. This is often a path to a configuration file and/or a target label within that file. The syntax and meaning are defined by recipe.type. For example, if the recipe type were "make", then this would reference the directory in which to run make as well as which target to use.',
          ).optional(),
          environment: z.array(z.unknown()).describe(
            'Any other builder-controlled inputs necessary for correctly evaluating the recipe. Usually only needed for reproducing the build but not evaluated as part of policy. Since the environment field can greatly vary in structure, depending on the builder and recipe type, this is of form "Any".',
          ).optional(),
          type: z.string().describe(
            "URI indicating what type of recipe was performed. It determines the meaning of recipe.entryPoint, recipe.arguments, recipe.environment, and materials.",
          ).optional(),
        }).describe(
          "Steps taken to build the artifact. For a TaskRun, typically each container corresponds to one step in the recipe.",
        ).optional(),
      }).optional(),
      slsaProvenance: z.object({
        builder: z.object({
          id: z.string().optional(),
        }).optional(),
        materials: z.array(z.object({
          digest: z.unknown().optional(),
          uri: z.unknown().optional(),
        })).describe(
          "The collection of artifacts that influenced the build including sources, dependencies, build tools, base images, and so on. This is considered to be incomplete unless metadata.completeness.materials is true. Unset or null is equivalent to empty.",
        ).optional(),
        metadata: z.object({
          buildFinishedOn: z.string().describe(
            "The timestamp of when the build completed.",
          ).optional(),
          buildInvocationId: z.string().describe(
            "Identifies the particular build invocation, which can be useful for finding associated logs or other ad-hoc analysis. The value SHOULD be globally unique, per in-toto Provenance spec.",
          ).optional(),
          buildStartedOn: z.string().describe(
            "The timestamp of when the build started.",
          ).optional(),
          completeness: z.object({
            arguments: z.unknown().describe(
              "If true, the builder claims that recipe.arguments is complete, meaning that all external inputs are properly captured in the recipe.",
            ).optional(),
            environment: z.unknown().describe(
              "If true, the builder claims that recipe.environment is claimed to be complete.",
            ).optional(),
            materials: z.unknown().describe(
              'If true, the builder claims that materials are complete, usually through some controls to prevent network access. Sometimes called "hermetic".',
            ).optional(),
          }).describe(
            "Indicates that the builder claims certain fields in this message to be complete.",
          ).optional(),
          reproducible: z.boolean().describe(
            "If true, the builder claims that running the recipe on materials will produce bit-for-bit identical output.",
          ).optional(),
        }).describe("Other properties of the build.").optional(),
        recipe: z.object({
          arguments: z.record(z.string(), z.unknown()).describe(
            'Collection of all external inputs that influenced the build on top of recipe.definedInMaterial and recipe.entryPoint. For example, if the recipe type were "make", then this might be the flags passed to make aside from the target, which is captured in recipe.entryPoint. Depending on the recipe Type, the structure may be different.',
          ).optional(),
          definedInMaterial: z.string().describe(
            'Index in materials containing the recipe steps that are not implied by recipe.type. For example, if the recipe type were "make", then this would point to the source containing the Makefile, not the make program itself. Set to -1 if the recipe doesn\'t come from a material, as zero is default unset value for int64.',
          ).optional(),
          entryPoint: z.string().describe(
            'String identifying the entry point into the build. This is often a path to a configuration file and/or a target label within that file. The syntax and meaning are defined by recipe.type. For example, if the recipe type were "make", then this would reference the directory in which to run make as well as which target to use.',
          ).optional(),
          environment: z.record(z.string(), z.unknown()).describe(
            "Any other builder-controlled inputs necessary for correctly evaluating the recipe. Usually only needed for reproducing the build but not evaluated as part of policy. Depending on the recipe Type, the structure may be different.",
          ).optional(),
          type: z.string().describe(
            "URI indicating what type of recipe was performed. It determines the meaning of recipe.entryPoint, recipe.arguments, recipe.environment, and materials.",
          ).optional(),
        }).describe(
          "Steps taken to build the artifact. For a TaskRun, typically each container corresponds to one step in the recipe.",
        ).optional(),
      }).optional(),
      slsaProvenanceZeroTwo: z.object({
        buildConfig: z.record(z.string(), z.string()).optional(),
        buildType: z.string().optional(),
        builder: z.object({
          id: z.string().optional(),
        }).describe(
          "Identifies the entity that executed the recipe, which is trusted to have correctly performed the operation and populated this provenance.",
        ).optional(),
        invocation: z.object({
          configSource: z.object({
            digest: z.unknown().optional(),
            entryPoint: z.unknown().optional(),
            uri: z.unknown().optional(),
          }).describe(
            "Describes where the config file that kicked off the build came from. This is effectively a pointer to the source where buildConfig came from.",
          ).optional(),
          environment: z.record(z.string(), z.unknown()).optional(),
          parameters: z.record(z.string(), z.unknown()).optional(),
        }).describe("Identifies the event that kicked off the build.")
          .optional(),
        materials: z.array(z.object({
          digest: z.unknown().optional(),
          uri: z.unknown().optional(),
        })).optional(),
        metadata: z.object({
          buildFinishedOn: z.string().optional(),
          buildInvocationId: z.string().optional(),
          buildStartedOn: z.string().optional(),
          completeness: z.object({
            environment: z.unknown().optional(),
            materials: z.unknown().optional(),
            parameters: z.unknown().optional(),
          }).describe(
            "Indicates that the builder claims certain fields in this message to be complete.",
          ).optional(),
          reproducible: z.boolean().optional(),
        }).describe("Other properties of the build.").optional(),
      }).describe("See full explanation of fields at slsa.dev/provenance/v0.2.")
        .optional(),
      subject: z.array(z.object({
        digest: z.record(z.string(), z.unknown()).describe(
          '`"": ""` Algorithms can be e.g. sha256, sha512 See https://github.com/in-toto/attestation/blob/main/spec/field_types.md#DigestSet',
        ).optional(),
        name: z.string().optional(),
      })).optional(),
    }).describe(
      'Spec defined at https://github.com/in-toto/attestation/tree/main/spec#statement The serialized InTotoStatement will be stored as Envelope.payload. Envelope.payloadType is always "application/vnd.in-toto+json".',
    ).optional(),
    provenance: z.object({
      buildOptions: z.record(z.string(), z.string()).describe(
        "Special options applied to this build. This is a catch-all field where build providers can enter any desired additional details.",
      ).optional(),
      builderVersion: z.string().describe(
        "Version string of the builder at the time this build was executed.",
      ).optional(),
      builtArtifacts: z.array(z.object({
        checksum: z.string().describe(
          "Hash or checksum value of a binary, or Docker Registry 2.0 digest of a container.",
        ).optional(),
        id: z.string().describe(
          "Artifact ID, if any; for container images, this will be a URL by digest like `gcr.io/projectID/imagename@sha256:123456`.",
        ).optional(),
        names: z.array(z.unknown()).describe(
          "Related artifact names. This may be the path to a binary or jar file, or in the case of a container build, the name used to push the container image to Google Container Registry, as presented to `docker push`. Note that a single Artifact ID can have multiple names, for example if two tags are applied to one image.",
        ).optional(),
      })).describe("Output of the build.").optional(),
      commands: z.array(z.object({
        args: z.array(z.unknown()).describe(
          "Command-line arguments used when executing this command.",
        ).optional(),
        dir: z.string().describe(
          "Working directory (relative to project source root) used when running this command.",
        ).optional(),
        env: z.array(z.unknown()).describe(
          "Environment variables set before running this command.",
        ).optional(),
        id: z.string().describe(
          "Optional unique identifier for this command, used in wait_for to reference this command as a dependency.",
        ).optional(),
        name: z.string().describe(
          "Required. Name of the command, as presented on the command line, or if the command is packaged as a Docker container, as presented to `docker pull`.",
        ).optional(),
        waitFor: z.array(z.unknown()).describe(
          "The ID(s) of the command(s) that this command depends on.",
        ).optional(),
      })).describe("Commands requested by the build.").optional(),
      createTime: z.string().describe("Time at which the build was created.")
        .optional(),
      creator: z.string().describe(
        "E-mail address of the user who initiated this build. Note that this was the user's e-mail address at the time the build was initiated; this address may not represent the same end-user for all time.",
      ).optional(),
      endTime: z.string().describe(
        "Time at which execution of the build was finished.",
      ).optional(),
      id: z.string().describe("Required. Unique identifier of the build.")
        .optional(),
      logsUri: z.string().describe(
        "URI where any logs for this provenance were written.",
      ).optional(),
      projectId: z.string().describe("ID of the project.").optional(),
      sourceProvenance: z.object({
        additionalContexts: z.array(z.object({
          cloudRepo: z.unknown().describe(
            "A CloudRepoSourceContext denotes a particular revision in a Google Cloud Source Repo.",
          ).optional(),
          gerrit: z.unknown().describe(
            "A SourceContext referring to a Gerrit project.",
          ).optional(),
          git: z.unknown().describe(
            "A GitSourceContext denotes a particular revision in a third party Git repository (e.g., GitHub).",
          ).optional(),
          labels: z.unknown().describe("Labels with user defined metadata.")
            .optional(),
        })).describe(
          "If provided, some of the source code used for the build may be found in these locations, in the case where the source repository had multiple remotes or submodules. This list will not include the context specified in the context field.",
        ).optional(),
        artifactStorageSourceUri: z.string().describe(
          "If provided, the input binary artifacts for the build came from this location.",
        ).optional(),
        context: z.object({
          cloudRepo: z.object({
            aliasContext: z.unknown().describe("An alias to a repo revision.")
              .optional(),
            repoId: z.unknown().describe(
              "A unique identifier for a Cloud Repo.",
            ).optional(),
            revisionId: z.unknown().describe("A revision ID.").optional(),
          }).describe(
            "A CloudRepoSourceContext denotes a particular revision in a Google Cloud Source Repo.",
          ).optional(),
          gerrit: z.object({
            aliasContext: z.unknown().describe("An alias to a repo revision.")
              .optional(),
            gerritProject: z.unknown().describe(
              'The full project name within the host. Projects may be nested, so "project/subproject" is a valid project name. The "repo name" is the hostURI/project.',
            ).optional(),
            hostUri: z.unknown().describe(
              "The URI of a running Gerrit instance.",
            ).optional(),
            revisionId: z.unknown().describe("A revision (commit) ID.")
              .optional(),
          }).describe("A SourceContext referring to a Gerrit project.")
            .optional(),
          git: z.object({
            revisionId: z.unknown().describe("Git commit hash.").optional(),
            url: z.unknown().describe("Git repository URL.").optional(),
          }).describe(
            "A GitSourceContext denotes a particular revision in a third party Git repository (e.g., GitHub).",
          ).optional(),
          labels: z.record(z.string(), z.unknown()).describe(
            "Labels with user defined metadata.",
          ).optional(),
        }).describe(
          "A SourceContext is a reference to a tree of files. A SourceContext together with a path point to a unique revision of a single file or directory.",
        ).optional(),
        fileHashes: z.record(
          z.string(),
          z.object({
            fileHash: z.unknown().describe(
              "Required. Collection of file hashes.",
            ).optional(),
          }),
        ).describe(
          "Hash(es) of the build source, which can be used to verify that the original source integrity was maintained in the build. The keys to this map are file paths used as build source and the values contain the hash values for those files. If the build source came in a single package such as a gzipped tarfile (.tar.gz), the FileHash will be for the single path to that file.",
        ).optional(),
      }).describe(
        "Source describes the location of the source used for the build.",
      ).optional(),
      startTime: z.string().describe(
        "Time at which execution of the build was started.",
      ).optional(),
      triggerId: z.string().describe(
        "Trigger identifier if the build was triggered automatically; empty if not.",
      ).optional(),
    }).describe(
      "Provenance of a build. Contains all information needed to verify the full details about the build from source to completion.",
    ).optional(),
    provenanceBytes: z.string().describe(
      "Serialized JSON representation of the provenance, used in generating the build signature in the corresponding build note. After verifying the signature, `provenance_bytes` can be unmarshalled and compared to the provenance to confirm that it is unchanged. A base64-encoded string representation of the provenance bytes is used for the signature in order to interoperate with openssl which expects this format for signature verification. The serialized form is captured both to avoid ambiguity in how the provenance is marshalled to json as well to prevent incompatibilities with future changes.",
    ).optional(),
  }).describe("Details of a build occurrence.").optional(),
  compliance: z.object({
    nonComplianceReason: z.string().optional(),
    nonCompliantFiles: z.array(z.object({
      displayCommand: z.string().describe(
        "Command to display the non-compliant files.",
      ).optional(),
      path: z.string().describe("Empty if `display_command` is set.")
        .optional(),
      reason: z.string().describe(
        "Explains why a file is non compliant for a CIS check.",
      ).optional(),
    })).optional(),
    version: z.object({
      benchmarkDocument: z.string().describe(
        'The name of the document that defines this benchmark, e.g. "CIS Container-Optimized OS".',
      ).optional(),
      cpeUri: z.string().describe(
        "The CPE URI (https://cpe.mitre.org/specification/) this benchmark is applicable to.",
      ).optional(),
      version: z.string().describe(
        "The version of the benchmark. This is set to the version of the OS-specific CIS document the benchmark is defined in.",
      ).optional(),
    }).describe(
      "Describes the CIS benchmark version that is applicable to a given OS and os version.",
    ).optional(),
  }).describe(
    "An indication that the compliance checks in the associated ComplianceNote were not satisfied for particular resources or a specified reason.",
  ).optional(),
  deployment: z.object({
    address: z.string().describe(
      "Address of the runtime element hosting this deployment.",
    ).optional(),
    config: z.string().describe("Configuration used to create this deployment.")
      .optional(),
    deployTime: z.string().describe(
      "Required. Beginning of the lifetime of this deployment.",
    ).optional(),
    platform: z.enum(["PLATFORM_UNSPECIFIED", "GKE", "FLEX", "CUSTOM"])
      .describe("Platform hosting this deployment.").optional(),
    resourceUri: z.array(z.string()).describe(
      "Output only. Resource URI for the artifact being deployed taken from the deployable field with the same name.",
    ).optional(),
    undeployTime: z.string().describe("End of the lifetime of this deployment.")
      .optional(),
    userEmail: z.string().describe(
      "Identity of the user that triggered this deployment.",
    ).optional(),
  }).describe(
    "The period during which some deployable was active in a runtime.",
  ).optional(),
  discovery: z.object({
    analysisCompleted: z.object({
      analysisType: z.array(z.string()).optional(),
    }).describe(
      "Indicates which analysis completed successfully. Multiple types of analysis can be performed on a single resource.",
    ).optional(),
    analysisError: z.array(z.object({
      code: z.number().int().describe(
        "The status code, which should be an enum value of google.rpc.Code.",
      ).optional(),
      details: z.array(z.record(z.string(), z.unknown())).describe(
        "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
      ).optional(),
      message: z.string().describe(
        "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
      ).optional(),
    })).describe(
      "Indicates any errors encountered during analysis of a resource. There could be 0 or more of these errors.",
    ).optional(),
    analysisStatus: z.enum([
      "ANALYSIS_STATUS_UNSPECIFIED",
      "PENDING",
      "SCANNING",
      "FINISHED_SUCCESS",
      "COMPLETE",
      "FINISHED_FAILED",
      "FINISHED_UNSUPPORTED",
    ]).describe("The status of discovery for the resource.").optional(),
    analysisStatusError: z.object({
      code: z.number().int().describe(
        "The status code, which should be an enum value of google.rpc.Code.",
      ).optional(),
      details: z.array(z.record(z.string(), z.string())).describe(
        "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
      ).optional(),
      message: z.string().describe(
        "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
      ).optional(),
    }).describe(
      "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
    ).optional(),
    archiveTime: z.string().describe(
      "Output only. The time occurrences related to this discovery occurrence were archived.",
    ).optional(),
    continuousAnalysis: z.enum([
      "CONTINUOUS_ANALYSIS_UNSPECIFIED",
      "ACTIVE",
      "INACTIVE",
    ]).describe("Whether the resource is continuously analyzed.").optional(),
    cpe: z.string().describe("The CPE of the resource being scanned.")
      .optional(),
    files: z.array(z.object({
      digest: z.record(z.string(), z.string()).optional(),
      name: z.string().optional(),
    })).describe("Files that make up the resource described by the occurrence.")
      .optional(),
    lastScanTime: z.string().describe(
      "The last time this resource was scanned.",
    ).optional(),
    lastVulnerabilityUpdateTime: z.string().describe(
      "The last time vulnerability scan results changed.",
    ).optional(),
    sbomStatus: z.object({
      error: z.string().describe(
        "If there was an error generating an SBOM, this will indicate what that error was.",
      ).optional(),
      sbomState: z.enum(["SBOM_STATE_UNSPECIFIED", "PENDING", "COMPLETE"])
        .describe("The progress of the SBOM generation.").optional(),
    }).describe("The status of an SBOM generation.").optional(),
  }).describe(
    "Provides information about the analysis status of a discovered resource.",
  ).optional(),
  dsseAttestation: z.object({
    envelope: z.object({
      payload: z.string().optional(),
      payloadType: z.string().optional(),
      signatures: z.array(z.object({
        keyid: z.string().optional(),
        sig: z.string().optional(),
      })).optional(),
    }).describe(
      "MUST match https://github.com/secure-systems-lab/dsse/blob/master/envelope.proto. An authenticated message of arbitrary type.",
    ).optional(),
    statement: z.object({
      _type: z.string().describe("Always `https://in-toto.io/Statement/v0.1`.")
        .optional(),
      predicateType: z.string().describe(
        "`https://slsa.dev/provenance/v0.1` for SlsaProvenance.",
      ).optional(),
      provenance: z.object({
        builderConfig: z.object({
          id: z.string().optional(),
        }).optional(),
        materials: z.array(z.string()).describe(
          "The collection of artifacts that influenced the build including sources, dependencies, build tools, base images, and so on. This is considered to be incomplete unless metadata.completeness.materials is true. Unset or null is equivalent to empty.",
        ).optional(),
        metadata: z.object({
          buildFinishedOn: z.string().describe(
            "The timestamp of when the build completed.",
          ).optional(),
          buildInvocationId: z.string().describe(
            "Identifies the particular build invocation, which can be useful for finding associated logs or other ad-hoc analysis. The value SHOULD be globally unique, per in-toto Provenance spec.",
          ).optional(),
          buildStartedOn: z.string().describe(
            "The timestamp of when the build started.",
          ).optional(),
          completeness: z.object({
            arguments: z.unknown().describe(
              "If true, the builder claims that recipe.arguments is complete, meaning that all external inputs are properly captured in the recipe.",
            ).optional(),
            environment: z.unknown().describe(
              "If true, the builder claims that recipe.environment is claimed to be complete.",
            ).optional(),
            materials: z.unknown().describe(
              'If true, the builder claims that materials are complete, usually through some controls to prevent network access. Sometimes called "hermetic".',
            ).optional(),
          }).describe(
            "Indicates that the builder claims certain fields in this message to be complete.",
          ).optional(),
          reproducible: z.boolean().describe(
            "If true, the builder claims that running the recipe on materials will produce bit-for-bit identical output.",
          ).optional(),
        }).describe("Other properties of the build.").optional(),
        recipe: z.object({
          arguments: z.array(z.unknown()).describe(
            'Collection of all external inputs that influenced the build on top of recipe.definedInMaterial and recipe.entryPoint. For example, if the recipe type were "make", then this might be the flags passed to make aside from the target, which is captured in recipe.entryPoint. Since the arguments field can greatly vary in structure, depending on the builder and recipe type, this is of form "Any".',
          ).optional(),
          definedInMaterial: z.string().describe(
            'Index in materials containing the recipe steps that are not implied by recipe.type. For example, if the recipe type were "make", then this would point to the source containing the Makefile, not the make program itself. Set to -1 if the recipe doesn\'t come from a material, as zero is default unset value for int64.',
          ).optional(),
          entryPoint: z.string().describe(
            'String identifying the entry point into the build. This is often a path to a configuration file and/or a target label within that file. The syntax and meaning are defined by recipe.type. For example, if the recipe type were "make", then this would reference the directory in which to run make as well as which target to use.',
          ).optional(),
          environment: z.array(z.unknown()).describe(
            'Any other builder-controlled inputs necessary for correctly evaluating the recipe. Usually only needed for reproducing the build but not evaluated as part of policy. Since the environment field can greatly vary in structure, depending on the builder and recipe type, this is of form "Any".',
          ).optional(),
          type: z.string().describe(
            "URI indicating what type of recipe was performed. It determines the meaning of recipe.entryPoint, recipe.arguments, recipe.environment, and materials.",
          ).optional(),
        }).describe(
          "Steps taken to build the artifact. For a TaskRun, typically each container corresponds to one step in the recipe.",
        ).optional(),
      }).optional(),
      slsaProvenance: z.object({
        builder: z.object({
          id: z.string().optional(),
        }).optional(),
        materials: z.array(z.object({
          digest: z.unknown().optional(),
          uri: z.unknown().optional(),
        })).describe(
          "The collection of artifacts that influenced the build including sources, dependencies, build tools, base images, and so on. This is considered to be incomplete unless metadata.completeness.materials is true. Unset or null is equivalent to empty.",
        ).optional(),
        metadata: z.object({
          buildFinishedOn: z.string().describe(
            "The timestamp of when the build completed.",
          ).optional(),
          buildInvocationId: z.string().describe(
            "Identifies the particular build invocation, which can be useful for finding associated logs or other ad-hoc analysis. The value SHOULD be globally unique, per in-toto Provenance spec.",
          ).optional(),
          buildStartedOn: z.string().describe(
            "The timestamp of when the build started.",
          ).optional(),
          completeness: z.object({
            arguments: z.unknown().describe(
              "If true, the builder claims that recipe.arguments is complete, meaning that all external inputs are properly captured in the recipe.",
            ).optional(),
            environment: z.unknown().describe(
              "If true, the builder claims that recipe.environment is claimed to be complete.",
            ).optional(),
            materials: z.unknown().describe(
              'If true, the builder claims that materials are complete, usually through some controls to prevent network access. Sometimes called "hermetic".',
            ).optional(),
          }).describe(
            "Indicates that the builder claims certain fields in this message to be complete.",
          ).optional(),
          reproducible: z.boolean().describe(
            "If true, the builder claims that running the recipe on materials will produce bit-for-bit identical output.",
          ).optional(),
        }).describe("Other properties of the build.").optional(),
        recipe: z.object({
          arguments: z.record(z.string(), z.unknown()).describe(
            'Collection of all external inputs that influenced the build on top of recipe.definedInMaterial and recipe.entryPoint. For example, if the recipe type were "make", then this might be the flags passed to make aside from the target, which is captured in recipe.entryPoint. Depending on the recipe Type, the structure may be different.',
          ).optional(),
          definedInMaterial: z.string().describe(
            'Index in materials containing the recipe steps that are not implied by recipe.type. For example, if the recipe type were "make", then this would point to the source containing the Makefile, not the make program itself. Set to -1 if the recipe doesn\'t come from a material, as zero is default unset value for int64.',
          ).optional(),
          entryPoint: z.string().describe(
            'String identifying the entry point into the build. This is often a path to a configuration file and/or a target label within that file. The syntax and meaning are defined by recipe.type. For example, if the recipe type were "make", then this would reference the directory in which to run make as well as which target to use.',
          ).optional(),
          environment: z.record(z.string(), z.unknown()).describe(
            "Any other builder-controlled inputs necessary for correctly evaluating the recipe. Usually only needed for reproducing the build but not evaluated as part of policy. Depending on the recipe Type, the structure may be different.",
          ).optional(),
          type: z.string().describe(
            "URI indicating what type of recipe was performed. It determines the meaning of recipe.entryPoint, recipe.arguments, recipe.environment, and materials.",
          ).optional(),
        }).describe(
          "Steps taken to build the artifact. For a TaskRun, typically each container corresponds to one step in the recipe.",
        ).optional(),
      }).optional(),
      slsaProvenanceZeroTwo: z.object({
        buildConfig: z.record(z.string(), z.string()).optional(),
        buildType: z.string().optional(),
        builder: z.object({
          id: z.string().optional(),
        }).describe(
          "Identifies the entity that executed the recipe, which is trusted to have correctly performed the operation and populated this provenance.",
        ).optional(),
        invocation: z.object({
          configSource: z.object({
            digest: z.unknown().optional(),
            entryPoint: z.unknown().optional(),
            uri: z.unknown().optional(),
          }).describe(
            "Describes where the config file that kicked off the build came from. This is effectively a pointer to the source where buildConfig came from.",
          ).optional(),
          environment: z.record(z.string(), z.unknown()).optional(),
          parameters: z.record(z.string(), z.unknown()).optional(),
        }).describe("Identifies the event that kicked off the build.")
          .optional(),
        materials: z.array(z.object({
          digest: z.unknown().optional(),
          uri: z.unknown().optional(),
        })).optional(),
        metadata: z.object({
          buildFinishedOn: z.string().optional(),
          buildInvocationId: z.string().optional(),
          buildStartedOn: z.string().optional(),
          completeness: z.object({
            environment: z.unknown().optional(),
            materials: z.unknown().optional(),
            parameters: z.unknown().optional(),
          }).describe(
            "Indicates that the builder claims certain fields in this message to be complete.",
          ).optional(),
          reproducible: z.boolean().optional(),
        }).describe("Other properties of the build.").optional(),
      }).describe("See full explanation of fields at slsa.dev/provenance/v0.2.")
        .optional(),
      subject: z.array(z.object({
        digest: z.record(z.string(), z.unknown()).describe(
          '`"": ""` Algorithms can be e.g. sha256, sha512 See https://github.com/in-toto/attestation/blob/main/spec/field_types.md#DigestSet',
        ).optional(),
        name: z.string().optional(),
      })).optional(),
    }).describe(
      'Spec defined at https://github.com/in-toto/attestation/tree/main/spec#statement The serialized InTotoStatement will be stored as Envelope.payload. Envelope.payloadType is always "application/vnd.in-toto+json".',
    ).optional(),
  }).describe(
    "Deprecated. Prefer to use a regular Occurrence, and populate the Envelope at the top level of the Occurrence.",
  ).optional(),
  envelope: z.object({
    payload: z.string().optional(),
    payloadType: z.string().optional(),
    signatures: z.array(z.object({
      keyid: z.string().optional(),
      sig: z.string().optional(),
    })).optional(),
  }).describe(
    "MUST match https://github.com/secure-systems-lab/dsse/blob/master/envelope.proto. An authenticated message of arbitrary type.",
  ).optional(),
  image: z.object({
    baseResourceUrl: z.string().describe(
      "Output only. This contains the base image URL for the derived image occurrence.",
    ).optional(),
    distance: z.number().int().describe(
      "Output only. The number of layers by which this image differs from the associated image basis.",
    ).optional(),
    fingerprint: z.object({
      v1Name: z.string().describe(
        "Required. The layer ID of the final layer in the Docker image's v1 representation.",
      ).optional(),
      v2Blob: z.array(z.string()).describe(
        "Required. The ordered list of v2 blobs that represent a given image.",
      ).optional(),
      v2Name: z.string().describe(
        'Output only. The name of the image\'s v2 blobs computed via: [bottom]:= v2_blobbottom:= sha256(v2_blob[N] + " " + v2_name[N+1]) Only the name of the final blob is kept.',
      ).optional(),
    }).describe(
      "A set of properties that uniquely identify a given Docker image.",
    ).optional(),
    layerInfo: z.array(z.object({
      arguments: z.string().describe(
        "The recovered arguments to the Dockerfile directive.",
      ).optional(),
      directive: z.string().describe(
        "Required. The recovered Dockerfile directive used to construct this layer. See https://docs.docker.com/engine/reference/builder/ for more information.",
      ).optional(),
    })).describe(
      'This contains layer-specific metadata, if populated it has length "distance" and is ordered with [distance] being the layer immediately following the base image and [1] being the final layer.',
    ).optional(),
  }).describe(
    "Details of the derived image portion of the DockerImage relationship. This image would be produced from a Dockerfile with FROM.",
  ).optional(),
  noteName: z.string().describe(
    "Required. Immutable. The analysis note associated with this occurrence, in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. This field can be used as a filter in list requests.",
  ).optional(),
  package: z.object({
    architecture: z.enum(["ARCHITECTURE_UNSPECIFIED", "X86", "X64"]).describe(
      "Output only. The CPU architecture for which packages in this distribution channel were built. Architecture will be blank for language packages.",
    ).optional(),
    cpeUri: z.string().describe(
      "Output only. The cpe_uri in [CPE format](https://cpe.mitre.org/specification/) denoting the package manager version distributing a package. The cpe_uri will be blank for language packages.",
    ).optional(),
    license: z.object({
      comments: z.string().describe("Comments").optional(),
      expression: z.string().describe(
        'Often a single license can be used to represent the licensing terms. Sometimes it is necessary to include a choice of one or more licenses or some combination of license identifiers. Examples: "LGPL-2.1-only OR MIT", "LGPL-2.1-only AND MIT", "GPL-2.0-or-later WITH Bison-exception-2.2".',
      ).optional(),
    }).describe("License information.").optional(),
    location: z.array(z.object({
      cpeUri: z.string().describe(
        "Deprecated. The CPE URI in [CPE format](https://cpe.mitre.org/specification/)",
      ).optional(),
      path: z.string().describe(
        "The path from which we gathered that this package/version is installed.",
      ).optional(),
      version: z.object({
        epoch: z.number().int().describe(
          "Used to correct mistakes in the version numbering scheme.",
        ).optional(),
        fullName: z.string().describe(
          "Human readable version string. This string is of the form:- and is only set when kind is NORMAL.",
        ).optional(),
        inclusive: z.boolean().describe(
          "Whether this version is specifying part of an inclusive range. Grafeas does not have the capability to specify version ranges; instead we have fields that specify start version and end versions. At times this is insufficient - we also need to specify whether the version is included in the range or is excluded from the range. This boolean is expected to be set to true when the version is included in a range.",
        ).optional(),
        kind: z.enum([
          "VERSION_KIND_UNSPECIFIED",
          "NORMAL",
          "MINIMUM",
          "MAXIMUM",
        ]).describe(
          "Required. Distinguishes between sentinel MIN/MAX versions and normal versions.",
        ).optional(),
        name: z.string().describe(
          "Required only when version kind is NORMAL. The main part of the version name.",
        ).optional(),
        revision: z.string().describe(
          "The iteration of the package build from the above version.",
        ).optional(),
      }).describe(
        "Version contains structured information about the version of a package.",
      ).optional(),
    })).describe(
      "All of the places within the filesystem versions of this package have been found.",
    ).optional(),
    name: z.string().describe(
      "Required. Output only. The name of the installed package.",
    ).optional(),
    packageType: z.string().describe(
      "Output only. The type of package; whether native or non native (e.g., ruby gems, node.js packages, etc.).",
    ).optional(),
    version: z.object({
      epoch: z.number().int().describe(
        "Used to correct mistakes in the version numbering scheme.",
      ).optional(),
      fullName: z.string().describe(
        "Human readable version string. This string is of the form:- and is only set when kind is NORMAL.",
      ).optional(),
      inclusive: z.boolean().describe(
        "Whether this version is specifying part of an inclusive range. Grafeas does not have the capability to specify version ranges; instead we have fields that specify start version and end versions. At times this is insufficient - we also need to specify whether the version is included in the range or is excluded from the range. This boolean is expected to be set to true when the version is included in a range.",
      ).optional(),
      kind: z.enum(["VERSION_KIND_UNSPECIFIED", "NORMAL", "MINIMUM", "MAXIMUM"])
        .describe(
          "Required. Distinguishes between sentinel MIN/MAX versions and normal versions.",
        ).optional(),
      name: z.string().describe(
        "Required only when version kind is NORMAL. The main part of the version name.",
      ).optional(),
      revision: z.string().describe(
        "The iteration of the package build from the above version.",
      ).optional(),
    }).describe(
      "Version contains structured information about the version of a package.",
    ).optional(),
  }).describe(
    "Details on how a particular software package was installed on a system.",
  ).optional(),
  remediation: z.string().describe(
    "A description of actions that can be taken to remedy the note.",
  ).optional(),
  resourceUri: z.string().describe(
    "Required. Immutable. A URI that represents the resource for which the occurrence applies. For example, `https://gcr.io/project/image@sha256:123abc` for a Docker image.",
  ).optional(),
  sbomReference: z.object({
    payload: z.object({
      _type: z.string().describe("Identifier for the schema of the Statement.")
        .optional(),
      predicate: z.object({
        digest: z.record(z.string(), z.string()).describe(
          "A map of algorithm to digest of the contents of the SBOM.",
        ).optional(),
        location: z.string().describe("The location of the SBOM.").optional(),
        mimeType: z.string().describe("The mime type of the SBOM.").optional(),
        referrerId: z.string().describe(
          "The person or system referring this predicate to the consumer.",
        ).optional(),
      }).describe("A predicate which describes the SBOM being referenced.")
        .optional(),
      predicateType: z.string().describe(
        "URI identifying the type of the Predicate.",
      ).optional(),
      subject: z.array(z.object({
        digest: z.record(z.string(), z.unknown()).describe(
          '`"": ""` Algorithms can be e.g. sha256, sha512 See https://github.com/in-toto/attestation/blob/main/spec/field_types.md#DigestSet',
        ).optional(),
        name: z.string().optional(),
      })).describe(
        "Set of software artifacts that the attestation applies to. Each element represents a single software artifact.",
      ).optional(),
    }).describe(
      "The actual payload that contains the SBOM Reference data. The payload follows the intoto statement specification. See https://github.com/in-toto/attestation/blob/main/spec/v1.0/statement.md for more details.",
    ).optional(),
    payloadType: z.string().describe(
      "The kind of payload that SbomReferenceIntotoPayload takes. Since it's in the intoto format, this value is expected to be 'application/vnd.in-toto+json'.",
    ).optional(),
    signatures: z.array(z.object({
      keyid: z.string().optional(),
      sig: z.string().optional(),
    })).describe("The signatures over the payload.").optional(),
  }).describe(
    "The occurrence representing an SBOM reference as applied to a specific resource. The occurrence follows the DSSE specification. See https://github.com/secure-systems-lab/dsse/blob/master/envelope.md for more details.",
  ).optional(),
  secret: z.object({
    kind: z.enum([
      "SECRET_KIND_UNSPECIFIED",
      "SECRET_KIND_UNKNOWN",
      "SECRET_KIND_GCP_SERVICE_ACCOUNT_KEY",
      "SECRET_KIND_GCP_API_KEY",
      "SECRET_KIND_GCP_OAUTH2_CLIENT_CREDENTIALS",
      "SECRET_KIND_GCP_OAUTH2_ACCESS_TOKEN",
      "SECRET_KIND_ANTHROPIC_ADMIN_API_KEY",
      "SECRET_KIND_ANTHROPIC_API_KEY",
      "SECRET_KIND_AZURE_ACCESS_TOKEN",
      "SECRET_KIND_AZURE_IDENTITY_TOKEN",
      "SECRET_KIND_DOCKER_HUB_PERSONAL_ACCESS_TOKEN",
      "SECRET_KIND_GITHUB_APP_REFRESH_TOKEN",
      "SECRET_KIND_GITHUB_APP_SERVER_TO_SERVER_TOKEN",
      "SECRET_KIND_GITHUB_APP_USER_TO_SERVER_TOKEN",
      "SECRET_KIND_GITHUB_CLASSIC_PERSONAL_ACCESS_TOKEN",
      "SECRET_KIND_GITHUB_FINE_GRAINED_PERSONAL_ACCESS_TOKEN",
      "SECRET_KIND_GITHUB_OAUTH_TOKEN",
      "SECRET_KIND_HUGGINGFACE_API_KEY",
      "SECRET_KIND_OPENAI_API_KEY",
      "SECRET_KIND_PERPLEXITY_API_KEY",
      "SECRET_KIND_STRIPE_SECRET_KEY",
      "SECRET_KIND_STRIPE_RESTRICTED_KEY",
      "SECRET_KIND_STRIPE_WEBHOOK_SECRET",
    ]).describe("Required. Type of secret.").optional(),
    locations: z.array(z.object({
      fileLocation: z.object({
        filePath: z.string().describe(
          "For jars that are contained inside.war files, this filepath can indicate the path to war file combined with the path to jar file.",
        ).optional(),
        layerDetails: z.object({
          baseImages: z.unknown().describe(
            "The base images the layer is found within.",
          ).optional(),
          chainId: z.unknown().describe(
            "The layer chain ID (sha256 hash) of the layer in the container image. https://github.com/opencontainers/image-spec/blob/main/config.md#layer-chainid",
          ).optional(),
          command: z.unknown().describe(
            "The layer build command that was used to build the layer. This may not be found in all layers depending on how the container image is built.",
          ).optional(),
          diffId: z.unknown().describe(
            "The diff ID (typically a sha256 hash) of the layer in the container image.",
          ).optional(),
          index: z.unknown().describe(
            "The index of the layer in the container image.",
          ).optional(),
        }).describe("Details about the layer a package was found in.")
          .optional(),
        lineNumber: z.number().int().describe(
          "Line number in the file where the package was found. Optional field that only applies to source repository scanning.",
        ).optional(),
      }).describe("Indicates the location at which a package was found.")
        .optional(),
    })).describe("Optional. Locations where the secret is detected.")
      .optional(),
    statuses: z.array(z.object({
      message: z.string().describe(
        "Optional. Optional message about the status code.",
      ).optional(),
      status: z.enum(["STATUS_UNSPECIFIED", "UNKNOWN", "VALID", "INVALID"])
        .describe("Optional. The status of the secret.").optional(),
      updateTime: z.string().describe(
        "Optional. The time the secret status was last updated.",
      ).optional(),
    })).describe("Optional. Status of the secret.").optional(),
  }).describe("The occurrence provides details of a secret.").optional(),
  upgrade: z.object({
    distribution: z.object({
      classification: z.string().describe(
        "The operating system classification of this Upgrade, as specified by the upstream operating system upgrade feed. For Windows the classification is one of the category_ids listed at https://docs.microsoft.com/en-us/previous-versions/windows/desktop/ff357803(v=vs.85)",
      ).optional(),
      cpeUri: z.string().describe(
        "Required - The specific operating system this metadata applies to. See https://cpe.mitre.org/specification/.",
      ).optional(),
      cve: z.array(z.string()).describe("The cve tied to this Upgrade.")
        .optional(),
      severity: z.string().describe(
        "The severity as specified by the upstream operating system.",
      ).optional(),
    }).describe(
      "The Upgrade Distribution represents metadata about the Upgrade for each operating system (CPE). Some distributions have additional metadata around updates, classifying them into various categories and severities.",
    ).optional(),
    package: z.string().describe(
      "Required for non-Windows OS. The package this Upgrade is for.",
    ).optional(),
    parsedVersion: z.object({
      epoch: z.number().int().describe(
        "Used to correct mistakes in the version numbering scheme.",
      ).optional(),
      fullName: z.string().describe(
        "Human readable version string. This string is of the form:- and is only set when kind is NORMAL.",
      ).optional(),
      inclusive: z.boolean().describe(
        "Whether this version is specifying part of an inclusive range. Grafeas does not have the capability to specify version ranges; instead we have fields that specify start version and end versions. At times this is insufficient - we also need to specify whether the version is included in the range or is excluded from the range. This boolean is expected to be set to true when the version is included in a range.",
      ).optional(),
      kind: z.enum(["VERSION_KIND_UNSPECIFIED", "NORMAL", "MINIMUM", "MAXIMUM"])
        .describe(
          "Required. Distinguishes between sentinel MIN/MAX versions and normal versions.",
        ).optional(),
      name: z.string().describe(
        "Required only when version kind is NORMAL. The main part of the version name.",
      ).optional(),
      revision: z.string().describe(
        "The iteration of the package build from the above version.",
      ).optional(),
    }).describe(
      "Version contains structured information about the version of a package.",
    ).optional(),
    windowsUpdate: z.object({
      categories: z.array(z.object({
        categoryId: z.string().describe("The identifier of the category.")
          .optional(),
        name: z.string().describe("The localized name of the category.")
          .optional(),
      })).describe("The list of categories to which the update belongs.")
        .optional(),
      description: z.string().describe(
        "The localized description of the update.",
      ).optional(),
      identity: z.object({
        revision: z.number().int().describe(
          "The revision number of the update.",
        ).optional(),
        updateId: z.string().describe(
          "The revision independent identifier of the update.",
        ).optional(),
      }).describe("The unique identifier of the update.").optional(),
      kbArticleIds: z.array(z.string()).describe(
        "The Microsoft Knowledge Base article IDs that are associated with the update.",
      ).optional(),
      lastPublishedTimestamp: z.string().describe(
        "The last published timestamp of the update.",
      ).optional(),
      supportUrl: z.string().describe(
        "The hyperlink to the support information for the update.",
      ).optional(),
      title: z.string().describe("The localized title of the update.")
        .optional(),
    }).describe(
      "Windows Update represents the metadata about the update for the Windows operating system. The fields in this message come from the Windows Update API documented at https://docs.microsoft.com/en-us/windows/win32/api/wuapi/nn-wuapi-iupdate.",
    ).optional(),
  }).describe(
    "An Upgrade Occurrence represents that a specific resource_url could install a specific upgrade. This presence is supplied via local sources (i.e. it is present in the mirror and the running system has noticed its availability). For Windows, both distribution and windows_update contain information for the Windows update.",
  ).optional(),
  vulnerability: z.object({
    cvssScore: z.number().describe(
      "Output only. The CVSS score of this vulnerability. CVSS score is on a scale of 0 - 10 where 0 indicates low severity and 10 indicates high severity.",
    ).optional(),
    cvssV2: z.object({
      attackComplexity: z.enum([
        "ATTACK_COMPLEXITY_UNSPECIFIED",
        "ATTACK_COMPLEXITY_LOW",
        "ATTACK_COMPLEXITY_HIGH",
        "ATTACK_COMPLEXITY_MEDIUM",
      ]).optional(),
      attackVector: z.enum([
        "ATTACK_VECTOR_UNSPECIFIED",
        "ATTACK_VECTOR_NETWORK",
        "ATTACK_VECTOR_ADJACENT",
        "ATTACK_VECTOR_LOCAL",
        "ATTACK_VECTOR_PHYSICAL",
      ]).describe(
        "Base Metrics Represents the intrinsic characteristics of a vulnerability that are constant over time and across user environments.",
      ).optional(),
      authentication: z.enum([
        "AUTHENTICATION_UNSPECIFIED",
        "AUTHENTICATION_MULTIPLE",
        "AUTHENTICATION_SINGLE",
        "AUTHENTICATION_NONE",
      ]).optional(),
      availabilityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
        "IMPACT_PARTIAL",
        "IMPACT_COMPLETE",
      ]).optional(),
      baseScore: z.number().describe(
        "The base score is a function of the base metric scores.",
      ).optional(),
      confidentialityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
        "IMPACT_PARTIAL",
        "IMPACT_COMPLETE",
      ]).optional(),
      exploitabilityScore: z.number().optional(),
      impactScore: z.number().optional(),
      integrityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
        "IMPACT_PARTIAL",
        "IMPACT_COMPLETE",
      ]).optional(),
      privilegesRequired: z.enum([
        "PRIVILEGES_REQUIRED_UNSPECIFIED",
        "PRIVILEGES_REQUIRED_NONE",
        "PRIVILEGES_REQUIRED_LOW",
        "PRIVILEGES_REQUIRED_HIGH",
      ]).optional(),
      scope: z.enum(["SCOPE_UNSPECIFIED", "SCOPE_UNCHANGED", "SCOPE_CHANGED"])
        .optional(),
      userInteraction: z.enum([
        "USER_INTERACTION_UNSPECIFIED",
        "USER_INTERACTION_NONE",
        "USER_INTERACTION_REQUIRED",
      ]).optional(),
    }).describe(
      "Common Vulnerability Scoring System. For details, see https://www.first.org/cvss/specification-document This is a message we will try to use for storing various versions of CVSS rather than making a separate proto for storing a specific version.",
    ).optional(),
    cvssVersion: z.enum([
      "CVSS_VERSION_UNSPECIFIED",
      "CVSS_VERSION_2",
      "CVSS_VERSION_3",
    ]).describe(
      "Output only. CVSS version used to populate cvss_score and severity.",
    ).optional(),
    cvssv3: z.object({
      attackComplexity: z.enum([
        "ATTACK_COMPLEXITY_UNSPECIFIED",
        "ATTACK_COMPLEXITY_LOW",
        "ATTACK_COMPLEXITY_HIGH",
        "ATTACK_COMPLEXITY_MEDIUM",
      ]).optional(),
      attackVector: z.enum([
        "ATTACK_VECTOR_UNSPECIFIED",
        "ATTACK_VECTOR_NETWORK",
        "ATTACK_VECTOR_ADJACENT",
        "ATTACK_VECTOR_LOCAL",
        "ATTACK_VECTOR_PHYSICAL",
      ]).describe(
        "Base Metrics Represents the intrinsic characteristics of a vulnerability that are constant over time and across user environments.",
      ).optional(),
      authentication: z.enum([
        "AUTHENTICATION_UNSPECIFIED",
        "AUTHENTICATION_MULTIPLE",
        "AUTHENTICATION_SINGLE",
        "AUTHENTICATION_NONE",
      ]).optional(),
      availabilityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
        "IMPACT_PARTIAL",
        "IMPACT_COMPLETE",
      ]).optional(),
      baseScore: z.number().describe(
        "The base score is a function of the base metric scores.",
      ).optional(),
      confidentialityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
        "IMPACT_PARTIAL",
        "IMPACT_COMPLETE",
      ]).optional(),
      exploitabilityScore: z.number().optional(),
      impactScore: z.number().optional(),
      integrityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
        "IMPACT_PARTIAL",
        "IMPACT_COMPLETE",
      ]).optional(),
      privilegesRequired: z.enum([
        "PRIVILEGES_REQUIRED_UNSPECIFIED",
        "PRIVILEGES_REQUIRED_NONE",
        "PRIVILEGES_REQUIRED_LOW",
        "PRIVILEGES_REQUIRED_HIGH",
      ]).optional(),
      scope: z.enum(["SCOPE_UNSPECIFIED", "SCOPE_UNCHANGED", "SCOPE_CHANGED"])
        .optional(),
      userInteraction: z.enum([
        "USER_INTERACTION_UNSPECIFIED",
        "USER_INTERACTION_NONE",
        "USER_INTERACTION_REQUIRED",
      ]).optional(),
    }).describe(
      "Common Vulnerability Scoring System. For details, see https://www.first.org/cvss/specification-document This is a message we will try to use for storing various versions of CVSS rather than making a separate proto for storing a specific version.",
    ).optional(),
    effectiveSeverity: z.enum([
      "SEVERITY_UNSPECIFIED",
      "MINIMAL",
      "LOW",
      "MEDIUM",
      "HIGH",
      "CRITICAL",
    ]).describe(
      "The distro assigned severity for this vulnerability when it is available, otherwise this is the note provider assigned severity. When there are multiple PackageIssues for this vulnerability, they can have different effective severities because some might be provided by the distro while others are provided by the language ecosystem for a language pack. For this reason, it is advised to use the effective severity on the PackageIssue level. In the case where multiple PackageIssues have differing effective severities, this field should be the highest severity for any of the PackageIssues.",
    ).optional(),
    extraDetails: z.string().describe(
      "Occurrence-specific extra details about the vulnerability.",
    ).optional(),
    fixAvailable: z.boolean().describe(
      "Output only. Whether at least one of the affected packages has a fix available.",
    ).optional(),
    longDescription: z.string().describe(
      "Output only. A detailed description of this vulnerability.",
    ).optional(),
    packageIssue: z.array(z.object({
      affectedCpeUri: z.string().describe(
        "Required. The [CPE URI](https://cpe.mitre.org/specification/) this vulnerability was found in.",
      ).optional(),
      affectedPackage: z.string().describe(
        "Required. The package this vulnerability was found in.",
      ).optional(),
      affectedVersion: z.object({
        epoch: z.number().int().describe(
          "Used to correct mistakes in the version numbering scheme.",
        ).optional(),
        fullName: z.string().describe(
          "Human readable version string. This string is of the form:- and is only set when kind is NORMAL.",
        ).optional(),
        inclusive: z.boolean().describe(
          "Whether this version is specifying part of an inclusive range. Grafeas does not have the capability to specify version ranges; instead we have fields that specify start version and end versions. At times this is insufficient - we also need to specify whether the version is included in the range or is excluded from the range. This boolean is expected to be set to true when the version is included in a range.",
        ).optional(),
        kind: z.enum([
          "VERSION_KIND_UNSPECIFIED",
          "NORMAL",
          "MINIMUM",
          "MAXIMUM",
        ]).describe(
          "Required. Distinguishes between sentinel MIN/MAX versions and normal versions.",
        ).optional(),
        name: z.string().describe(
          "Required only when version kind is NORMAL. The main part of the version name.",
        ).optional(),
        revision: z.string().describe(
          "The iteration of the package build from the above version.",
        ).optional(),
      }).describe(
        "Version contains structured information about the version of a package.",
      ).optional(),
      effectiveSeverity: z.enum([
        "SEVERITY_UNSPECIFIED",
        "MINIMAL",
        "LOW",
        "MEDIUM",
        "HIGH",
        "CRITICAL",
      ]).describe(
        "Output only. The distro or language system assigned severity for this vulnerability when that is available and note provider assigned severity when it is not available.",
      ).optional(),
      fileLocation: z.array(z.object({
        filePath: z.unknown().describe(
          "For jars that are contained inside.war files, this filepath can indicate the path to war file combined with the path to jar file.",
        ).optional(),
        layerDetails: z.unknown().describe(
          "Details about the layer a package was found in.",
        ).optional(),
        lineNumber: z.unknown().describe(
          "Line number in the file where the package was found. Optional field that only applies to source repository scanning.",
        ).optional(),
      })).describe("The location at which this package was found.").optional(),
      fixAvailable: z.boolean().describe(
        "Output only. Whether a fix is available for this package.",
      ).optional(),
      fixedCpeUri: z.string().describe(
        "The [CPE URI](https://cpe.mitre.org/specification/) this vulnerability was fixed in. It is possible for this to be different from the affected_cpe_uri.",
      ).optional(),
      fixedPackage: z.string().describe(
        "The package this vulnerability was fixed in. It is possible for this to be different from the affected_package.",
      ).optional(),
      fixedVersion: z.object({
        epoch: z.number().int().describe(
          "Used to correct mistakes in the version numbering scheme.",
        ).optional(),
        fullName: z.string().describe(
          "Human readable version string. This string is of the form:- and is only set when kind is NORMAL.",
        ).optional(),
        inclusive: z.boolean().describe(
          "Whether this version is specifying part of an inclusive range. Grafeas does not have the capability to specify version ranges; instead we have fields that specify start version and end versions. At times this is insufficient - we also need to specify whether the version is included in the range or is excluded from the range. This boolean is expected to be set to true when the version is included in a range.",
        ).optional(),
        kind: z.enum([
          "VERSION_KIND_UNSPECIFIED",
          "NORMAL",
          "MINIMUM",
          "MAXIMUM",
        ]).describe(
          "Required. Distinguishes between sentinel MIN/MAX versions and normal versions.",
        ).optional(),
        name: z.string().describe(
          "Required only when version kind is NORMAL. The main part of the version name.",
        ).optional(),
        revision: z.string().describe(
          "The iteration of the package build from the above version.",
        ).optional(),
      }).describe(
        "Version contains structured information about the version of a package.",
      ).optional(),
      packageType: z.string().describe(
        "The type of package (e.g. OS, MAVEN, GO).",
      ).optional(),
    })).describe(
      "Required. The set of affected locations and their fixes (if available) within the associated resource.",
    ).optional(),
    relatedUrls: z.array(z.object({
      label: z.string().describe("Label to describe usage of the URL.")
        .optional(),
      url: z.string().describe("Specific URL associated with the resource.")
        .optional(),
    })).describe("Output only. URLs related to this vulnerability.").optional(),
    risk: z.object({
      cisaKev: z.object({
        knownRansomwareCampaignUse: z.string().describe(
          "Whether the vulnerability is known to have been leveraged as part of a ransomware campaign.",
        ).optional(),
      }).optional(),
      epss: z.object({
        percentile: z.number().describe(
          "The percentile of the current score, the proportion of all scored vulnerabilities with the same or a lower EPSS score",
        ).optional(),
        score: z.number().describe(
          "The EPSS score representing the probability [0-1] of exploitation in the wild in the next 30 days",
        ).optional(),
      }).optional(),
    }).optional(),
    severity: z.enum([
      "SEVERITY_UNSPECIFIED",
      "MINIMAL",
      "LOW",
      "MEDIUM",
      "HIGH",
      "CRITICAL",
    ]).describe(
      "Output only. The note provider assigned severity of this vulnerability.",
    ).optional(),
    shortDescription: z.string().describe(
      "Output only. A one sentence description of this vulnerability.",
    ).optional(),
    type: z.string().describe(
      "The type of package; whether native or non native (e.g., ruby gems, node.js packages, etc.).",
    ).optional(),
    vexAssessment: z.object({
      cve: z.string().describe(
        "Holds the MITRE standard Common Vulnerabilities and Exposures (CVE) tracking number for the vulnerability. Deprecated: Use vulnerability_id instead to denote CVEs.",
      ).optional(),
      impacts: z.array(z.string()).describe(
        "Contains information about the impact of this vulnerability, this will change with time.",
      ).optional(),
      justification: z.object({
        details: z.string().describe(
          "Additional details on why this justification was chosen.",
        ).optional(),
        justificationType: z.enum([
          "JUSTIFICATION_TYPE_UNSPECIFIED",
          "COMPONENT_NOT_PRESENT",
          "VULNERABLE_CODE_NOT_PRESENT",
          "VULNERABLE_CODE_NOT_IN_EXECUTE_PATH",
          "VULNERABLE_CODE_CANNOT_BE_CONTROLLED_BY_ADVERSARY",
          "INLINE_MITIGATIONS_ALREADY_EXIST",
        ]).describe("The justification type for this vulnerability.")
          .optional(),
      }).describe(
        "Justification provides the justification when the state of the assessment if NOT_AFFECTED.",
      ).optional(),
      noteName: z.string().describe(
        "The VulnerabilityAssessment note from which this VexAssessment was generated. This will be of the form: `projects/[PROJECT_ID]/notes/[NOTE_ID]`.",
      ).optional(),
      relatedUris: z.array(z.object({
        label: z.string().describe("Label to describe usage of the URL.")
          .optional(),
        url: z.string().describe("Specific URL associated with the resource.")
          .optional(),
      })).describe(
        "Holds a list of references associated with this vulnerability item and assessment.",
      ).optional(),
      remediations: z.array(z.object({
        details: z.string().describe(
          "Contains a comprehensive human-readable discussion of the remediation.",
        ).optional(),
        remediationType: z.enum([
          "REMEDIATION_TYPE_UNSPECIFIED",
          "MITIGATION",
          "NO_FIX_PLANNED",
          "NONE_AVAILABLE",
          "VENDOR_FIX",
          "WORKAROUND",
        ]).describe("The type of remediation that can be applied.").optional(),
        remediationUri: z.object({
          label: z.unknown().describe("Label to describe usage of the URL.")
            .optional(),
          url: z.unknown().describe(
            "Specific URL associated with the resource.",
          ).optional(),
        }).describe("Metadata for any related URL information.").optional(),
      })).describe(
        "Specifies details on how to handle (and presumably, fix) a vulnerability.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "AFFECTED",
        "NOT_AFFECTED",
        "FIXED",
        "UNDER_INVESTIGATION",
      ]).describe("Provides the state of this Vulnerability assessment.")
        .optional(),
      vulnerabilityId: z.string().describe(
        "The vulnerability identifier for this Assessment. Will hold one of common identifiers e.g. CVE, GHSA etc.",
      ).optional(),
    }).describe(
      "VexAssessment provides all publisher provided Vex information that is related to this vulnerability.",
    ).optional(),
  }).describe("An occurrence of a severity vulnerability on a resource.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Container Analysis Occurrences. Registered at `@swamp/gcp/containeranalysis/occurrences`. */
export const model = {
  type: "@swamp/gcp/containeranalysis/occurrences",
  version: "2026.05.27.2",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
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
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.02.1",
      description: "Added: aiSkillAnalysis",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.09.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "Removed: aiSkillAnalysis",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { aiSkillAnalysis: _aiSkillAnalysis, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.18.2",
      description: "Added: aiSkillAnalysis",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "Removed: aiSkillAnalysis",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { aiSkillAnalysis: _aiSkillAnalysis, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.20.1",
      description: "Added: aiSkillAnalysis",
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
    {
      toVersion: "2026.05.25.1",
      description: "Removed: aiSkillAnalysis",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { aiSkillAnalysis: _aiSkillAnalysis, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.26.1",
      description: "Added: aiSkillAnalysis",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.27.2",
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
    create: {
      description: "Create a occurrences",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["advisoryPublishTime"] !== undefined) {
          body["advisoryPublishTime"] = g["advisoryPublishTime"];
        }
        if (g["aiSkillAnalysis"] !== undefined) {
          body["aiSkillAnalysis"] = g["aiSkillAnalysis"];
        }
        if (g["attestation"] !== undefined) {
          body["attestation"] = g["attestation"];
        }
        if (g["build"] !== undefined) body["build"] = g["build"];
        if (g["compliance"] !== undefined) body["compliance"] = g["compliance"];
        if (g["deployment"] !== undefined) body["deployment"] = g["deployment"];
        if (g["discovery"] !== undefined) body["discovery"] = g["discovery"];
        if (g["dsseAttestation"] !== undefined) {
          body["dsseAttestation"] = g["dsseAttestation"];
        }
        if (g["envelope"] !== undefined) body["envelope"] = g["envelope"];
        if (g["image"] !== undefined) body["image"] = g["image"];
        if (g["noteName"] !== undefined) body["noteName"] = g["noteName"];
        if (g["package"] !== undefined) body["package"] = g["package"];
        if (g["remediation"] !== undefined) {
          body["remediation"] = g["remediation"];
        }
        if (g["resourceUri"] !== undefined) {
          body["resourceUri"] = g["resourceUri"];
        }
        if (g["sbomReference"] !== undefined) {
          body["sbomReference"] = g["sbomReference"];
        }
        if (g["secret"] !== undefined) body["secret"] = g["secret"];
        if (g["upgrade"] !== undefined) body["upgrade"] = g["upgrade"];
        if (g["vulnerability"] !== undefined) {
          body["vulnerability"] = g["vulnerability"];
        }
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
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
    get: {
      description: "Get a occurrences",
      arguments: z.object({
        identifier: z.string().describe("The name of the occurrences"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
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
    update: {
      description: "Update occurrences attributes",
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["advisoryPublishTime"] !== undefined) {
          body["advisoryPublishTime"] = g["advisoryPublishTime"];
        }
        if (g["aiSkillAnalysis"] !== undefined) {
          body["aiSkillAnalysis"] = g["aiSkillAnalysis"];
        }
        if (g["attestation"] !== undefined) {
          body["attestation"] = g["attestation"];
        }
        if (g["build"] !== undefined) body["build"] = g["build"];
        if (g["compliance"] !== undefined) body["compliance"] = g["compliance"];
        if (g["deployment"] !== undefined) body["deployment"] = g["deployment"];
        if (g["discovery"] !== undefined) body["discovery"] = g["discovery"];
        if (g["dsseAttestation"] !== undefined) {
          body["dsseAttestation"] = g["dsseAttestation"];
        }
        if (g["envelope"] !== undefined) body["envelope"] = g["envelope"];
        if (g["image"] !== undefined) body["image"] = g["image"];
        if (g["package"] !== undefined) body["package"] = g["package"];
        if (g["remediation"] !== undefined) {
          body["remediation"] = g["remediation"];
        }
        if (g["sbomReference"] !== undefined) {
          body["sbomReference"] = g["sbomReference"];
        }
        if (g["secret"] !== undefined) body["secret"] = g["secret"];
        if (g["upgrade"] !== undefined) body["upgrade"] = g["upgrade"];
        if (g["vulnerability"] !== undefined) {
          body["vulnerability"] = g["vulnerability"];
        }
        for (const key of Object.keys(existing)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = existing[key];
          }
        }
        const result = await updateResource(
          BASE_URL,
          PATCH_CONFIG,
          params,
          body,
          GET_CONFIG,
        ) as StateData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the occurrences",
      arguments: z.object({
        identifier: z.string().describe("The name of the occurrences"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
        );
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource("state", instanceName, {
          identifier: args.identifier,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync occurrences state from GCP",
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
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            shortName,
          );
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
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
    list: {
      description: "List occurrences resources",
      arguments: z.object({
        filter: z.string().describe("The filter expression.").optional(),
        pageSize: z.number().describe(
          "Number of occurrences to return in the list. Must be positive. Max allowed page size is 1000. If not specified, page size defaults to 20.",
        ).optional(),
        returnPartialSuccess: z.boolean().describe(
          "If set, the request will return all reachable Occurrences and report all unreachable regions in the `unreachable` field in the response. Only applicable for requests in the global region.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["returnPartialSuccess"] !== undefined) {
          params["returnPartialSuccess"] = String(args["returnPartialSuccess"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "occurrences",
          (args.maxPages as number | undefined) ?? 10,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.name?.toString() ?? String(i)).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource(
            "state",
            instanceName,
            item,
          );
          dataHandles.push(handle);
        }
        return { dataHandles, result: { count: items.length, nextPageToken } };
      },
    },
    batch_create: {
      description: "batch create",
      arguments: z.object({
        occurrences: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["occurrences"] !== undefined) {
          body["occurrences"] = args["occurrences"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "containeranalysis.projects.locations.occurrences.batchCreate",
            "path": "v1/{+parent}/occurrences:batchCreate",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({
        options: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["options"] !== undefined) body["options"] = args["options"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "containeranalysis.projects.locations.occurrences.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    get_notes: {
      description: "get notes",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "containeranalysis.projects.locations.occurrences.getNotes",
            "path": "v1/{+name}/notes",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    get_vulnerability_summary: {
      description: "get vulnerability summary",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "containeranalysis.projects.locations.occurrences.getVulnerabilitySummary",
            "path": "v1/{+parent}/occurrences:vulnerabilitySummary",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "filter": { "location": "query" },
              "parent": { "location": "path", "required": true },
              "returnPartialSuccess": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        policy: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["policy"] !== undefined) body["policy"] = args["policy"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "containeranalysis.projects.locations.occurrences.setIamPolicy",
            "path": "v1/{+resource}:setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    test_iam_permissions: {
      description: "test iam permissions",
      arguments: z.object({
        permissions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["permissions"] !== undefined) {
          body["permissions"] = args["permissions"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "containeranalysis.projects.locations.occurrences.testIamPermissions",
            "path": "v1/{+resource}:testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
