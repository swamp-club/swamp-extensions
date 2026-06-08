// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/containeranalysis/notes
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Container Analysis Notes.
 *
 * A type of analysis that can be done for a resource.
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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/notes/${shortName}`;
}

const BASE_URL = "https://containeranalysis.googleapis.com/";

const GET_CONFIG = {
  "id": "containeranalysis.projects.locations.notes.get",
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
  "id": "containeranalysis.projects.locations.notes.create",
  "path": "v1/{+parent}/notes",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "noteId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "containeranalysis.projects.locations.notes.patch",
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
  "id": "containeranalysis.projects.locations.notes.delete",
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
  "id": "containeranalysis.projects.locations.notes.list",
  "path": "v1/{+parent}/notes",
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  aiSkillAnalysis: z.object({}).describe(
    "AISkillAnalysisNote provides the metadata of an AI-based skill analysis.",
  ).optional(),
  attestation: z.object({
    hint: z.object({
      humanReadableName: z.string().describe(
        'Required. The human readable name of this attestation authority, for example "qa".',
      ).optional(),
    }).describe(
      'This submessage provides human-readable hints about the purpose of the authority. Because the name of a note acts as its resource reference, it is important to disambiguate the canonical name of the Note (which might be a UUID for security purposes) from "readable" names more suitable for debug output. Note that these hints should not be used to look up authorities in security sensitive contexts, such as when looking up attestations to verify.',
    ).optional(),
  }).describe(
    'Note kind that represents a logical attestation "role" or "authority". For example, an organization might have one `Authority` for "QA" and one for "build". This note is intended to act strictly as a grouping mechanism for the attached occurrences (Attestations). This grouping mechanism also provides a security boundary, since IAM ACLs gate the ability for a principle to attach an occurrence to a given note. It also provides a single point of lookup to find all attached attestation occurrences, even if they don\'t all live in the same project.',
  ).optional(),
  build: z.object({
    builderVersion: z.string().describe(
      "Required. Immutable. Version of the builder which produced this build.",
    ).optional(),
  }).describe(
    "Note holding the version of the provider's builder and the signature of the provenance message in the build details occurrence.",
  ).optional(),
  compliance: z.object({
    cisBenchmark: z.object({
      profileLevel: z.number().int().optional(),
      severity: z.enum([
        "SEVERITY_UNSPECIFIED",
        "MINIMAL",
        "LOW",
        "MEDIUM",
        "HIGH",
        "CRITICAL",
      ]).optional(),
    }).describe("A compliance check that is a CIS benchmark.").optional(),
    description: z.string().describe(
      "A description about this compliance check.",
    ).optional(),
    impact: z.string().optional(),
    rationale: z.string().describe(
      "A rationale for the existence of this compliance check.",
    ).optional(),
    remediation: z.string().describe(
      "A description of remediation steps if the compliance check fails.",
    ).optional(),
    scanInstructions: z.string().describe(
      "Serialized scan instructions with a predefined format.",
    ).optional(),
    title: z.string().describe(
      "The title that identifies this compliance check.",
    ).optional(),
    version: z.array(z.object({
      benchmarkDocument: z.string().describe(
        'The name of the document that defines this benchmark, e.g. "CIS Container-Optimized OS".',
      ).optional(),
      cpeUri: z.string().describe(
        "The CPE URI (https://cpe.mitre.org/specification/) this benchmark is applicable to.",
      ).optional(),
      version: z.string().describe(
        "The version of the benchmark. This is set to the version of the OS-specific CIS document the benchmark is defined in.",
      ).optional(),
    })).describe("The OS and config versions the benchmark applies to.")
      .optional(),
  }).optional(),
  deployment: z.object({
    resourceUri: z.array(z.string()).describe(
      "Required. Resource URI for the artifact being deployed.",
    ).optional(),
  }).describe("An artifact that can be deployed in some runtime.").optional(),
  discovery: z.object({
    analysisKind: z.enum([
      "NOTE_KIND_UNSPECIFIED",
      "VULNERABILITY",
      "BUILD",
      "IMAGE",
      "PACKAGE",
      "DEPLOYMENT",
      "DISCOVERY",
      "ATTESTATION",
      "UPGRADE",
      "COMPLIANCE",
      "DSSE_ATTESTATION",
      "VULNERABILITY_ASSESSMENT",
      "SBOM_REFERENCE",
      "SECRET",
      "AI_SKILL_ANALYSIS",
    ]).describe(
      "Required. Immutable. The kind of analysis that is handled by this discovery.",
    ).optional(),
  }).describe(
    "A note that indicates a type of analysis a provider would perform. This note exists in a provider's project. A `Discovery` occurrence is created in a consumer's project at the start of analysis.",
  ).optional(),
  dsseAttestation: z.object({
    hint: z.object({
      humanReadableName: z.string().describe(
        'Required. The human readable name of this attestation authority, for example "cloudbuild-prod".',
      ).optional(),
    }).describe(
      'This submessage provides human-readable hints about the purpose of the authority. Because the name of a note acts as its resource reference, it is important to disambiguate the canonical name of the Note (which might be a UUID for security purposes) from "readable" names more suitable for debug output. Note that these hints should not be used to look up authorities in security sensitive contexts, such as when looking up attestations to verify.',
    ).optional(),
  }).optional(),
  expirationTime: z.string().describe(
    "Time of expiration for this note. Empty if note does not expire.",
  ).optional(),
  image: z.object({
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
    resourceUrl: z.string().describe(
      "Required. Immutable. The resource_url for the resource representing the basis of associated occurrence images.",
    ).optional(),
  }).describe(
    "Basis describes the base image portion (Note) of the DockerImage relationship. Linked occurrences are derived from this or an equivalent image via: FROM Or an equivalent reference, e.g., a tag of the resource_url.",
  ).optional(),
  longDescription: z.string().describe("A detailed description of this note.")
    .optional(),
  package: z.object({
    architecture: z.enum(["ARCHITECTURE_UNSPECIFIED", "X86", "X64"]).describe(
      "The CPU architecture for which packages in this distribution channel were built. Architecture will be blank for language packages.",
    ).optional(),
    cpeUri: z.string().describe(
      "The cpe_uri in [CPE format](https://cpe.mitre.org/specification/) denoting the package manager version distributing a package. The cpe_uri will be blank for language packages.",
    ).optional(),
    description: z.string().describe("The description of this package.")
      .optional(),
    digest: z.array(z.object({
      algo: z.string().describe("`SHA1`, `SHA512` etc.").optional(),
      digestBytes: z.string().describe("Value of the digest.").optional(),
    })).describe(
      "Hash value, typically a file digest, that allows unique identification a specific package.",
    ).optional(),
    distribution: z.array(z.object({
      architecture: z.enum(["ARCHITECTURE_UNSPECIFIED", "X86", "X64"]).describe(
        "The CPU architecture for which packages in this distribution channel were built.",
      ).optional(),
      cpeUri: z.string().describe(
        "Required. The cpe_uri in [CPE format](https://cpe.mitre.org/specification/) denoting the package manager version distributing a package.",
      ).optional(),
      description: z.string().describe(
        "The distribution channel-specific description of this package.",
      ).optional(),
      latestVersion: z.object({
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
      maintainer: z.string().describe(
        "A freeform string denoting the maintainer of this package.",
      ).optional(),
      url: z.string().describe(
        "The distribution channel-specific homepage for this package.",
      ).optional(),
    })).describe(
      "Deprecated. The various channels by which a package is distributed.",
    ).optional(),
    license: z.object({
      comments: z.string().describe("Comments").optional(),
      expression: z.string().describe(
        'Often a single license can be used to represent the licensing terms. Sometimes it is necessary to include a choice of one or more licenses or some combination of license identifiers. Examples: "LGPL-2.1-only OR MIT", "LGPL-2.1-only AND MIT", "GPL-2.0-or-later WITH Bison-exception-2.2".',
      ).optional(),
    }).describe("License information.").optional(),
    maintainer: z.string().describe(
      "A freeform text denoting the maintainer of this package.",
    ).optional(),
    name: z.string().describe("Required. Immutable. The name of the package.")
      .optional(),
    packageType: z.string().describe(
      "The type of package; whether native or non native (e.g., ruby gems, node.js packages, etc.).",
    ).optional(),
    url: z.string().describe("The homepage for this package.").optional(),
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
  }).describe("PackageNote represents a particular package version.")
    .optional(),
  relatedNoteNames: z.array(z.string()).describe(
    "Other notes related to this note.",
  ).optional(),
  relatedUrl: z.array(z.object({
    label: z.string().describe("Label to describe usage of the URL.")
      .optional(),
    url: z.string().describe("Specific URL associated with the resource.")
      .optional(),
  })).describe("URLs associated with this note.").optional(),
  sbomReference: z.object({
    format: z.string().describe(
      "The format that SBOM takes. E.g. may be spdx, cyclonedx, etc...",
    ).optional(),
    version: z.string().describe(
      "The version of the format that the SBOM takes. E.g. if the format is spdx, the version may be 2.3.",
    ).optional(),
  }).describe("The note representing an SBOM reference.").optional(),
  secret: z.object({}).describe("The note representing a secret.").optional(),
  shortDescription: z.string().describe(
    "A one sentence description of this note.",
  ).optional(),
  upgrade: z.object({
    distributions: z.array(z.object({
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
    })).describe(
      "Metadata about the upgrade for each specific operating system.",
    ).optional(),
    package: z.string().describe(
      "Required for non-Windows OS. The package this Upgrade is for.",
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
    "An Upgrade Note represents a potential upgrade of a package to a given version. For each package version combination (i.e. bash 4.0, bash 4.1, bash 4.1.2), there will be an Upgrade Note. For Windows, windows_update field represents the information related to the update.",
  ).optional(),
  vulnerability: z.object({
    advisoryPublishTime: z.string().describe(
      "The time this advisory was published by the source.",
    ).optional(),
    cvssScore: z.number().describe(
      "The CVSS score of this vulnerability. CVSS score is on a scale of 0 - 10 where 0 indicates low severity and 10 indicates high severity.",
    ).optional(),
    cvssV2: z.object({
      attackComplexity: z.enum([
        "ATTACK_COMPLEXITY_UNSPECIFIED",
        "ATTACK_COMPLEXITY_LOW",
        "ATTACK_COMPLEXITY_HIGH",
        "ATTACK_COMPLEXITY_MEDIUM",
      ]).describe("Attack Complexity (AC). Defined in CVSS v2, v3, v4.")
        .optional(),
      attackRequirements: z.enum([
        "ATTACK_REQUIREMENTS_UNSPECIFIED",
        "ATTACK_REQUIREMENTS_NONE",
        "ATTACK_REQUIREMENTS_PRESENT",
      ]).describe("Attack Requirements (AT). Defined in CVSS v4.").optional(),
      attackVector: z.enum([
        "ATTACK_VECTOR_UNSPECIFIED",
        "ATTACK_VECTOR_NETWORK",
        "ATTACK_VECTOR_ADJACENT",
        "ATTACK_VECTOR_LOCAL",
        "ATTACK_VECTOR_PHYSICAL",
      ]).describe("Attack Vector (AV). Defined in CVSS v2, v3, v4.").optional(),
      authentication: z.enum([
        "AUTHENTICATION_UNSPECIFIED",
        "AUTHENTICATION_MULTIPLE",
        "AUTHENTICATION_SINGLE",
        "AUTHENTICATION_NONE",
      ]).describe("Authentication (Au). Defined in CVSS v2.").optional(),
      availabilityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
        "IMPACT_PARTIAL",
        "IMPACT_COMPLETE",
      ]).describe("Availability Impact (A). Defined in CVSS v2, v3.")
        .optional(),
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
      ]).describe("Confidentiality Impact (C). Defined in CVSS v2, v3.")
        .optional(),
      exploitabilityScore: z.number().optional(),
      impactScore: z.number().optional(),
      integrityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
        "IMPACT_PARTIAL",
        "IMPACT_COMPLETE",
      ]).describe("Integrity Impact (I). Defined in CVSS v2, v3.").optional(),
      privilegesRequired: z.enum([
        "PRIVILEGES_REQUIRED_UNSPECIFIED",
        "PRIVILEGES_REQUIRED_NONE",
        "PRIVILEGES_REQUIRED_LOW",
        "PRIVILEGES_REQUIRED_HIGH",
      ]).describe("Privileges Required (PR). Defined in CVSS v3, v4.")
        .optional(),
      scope: z.enum(["SCOPE_UNSPECIFIED", "SCOPE_UNCHANGED", "SCOPE_CHANGED"])
        .describe("Scope (S). Defined in CVSS v3.").optional(),
      subsequentSystemAvailabilityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
        "IMPACT_PARTIAL",
        "IMPACT_COMPLETE",
      ]).describe(
        "Subsequent System Availability Impact (SA). Defined in CVSS v4.",
      ).optional(),
      subsequentSystemConfidentialityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
        "IMPACT_PARTIAL",
        "IMPACT_COMPLETE",
      ]).describe(
        "Subsequent System Confidentiality Impact (SC). Defined in CVSS v4.",
      ).optional(),
      subsequentSystemIntegrityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
        "IMPACT_PARTIAL",
        "IMPACT_COMPLETE",
      ]).describe(
        "Subsequent System Integrity Impact (SI). Defined in CVSS v4.",
      ).optional(),
      userInteraction: z.enum([
        "USER_INTERACTION_UNSPECIFIED",
        "USER_INTERACTION_NONE",
        "USER_INTERACTION_REQUIRED",
        "USER_INTERACTION_PASSIVE",
        "USER_INTERACTION_ACTIVE",
      ]).describe("User Interaction (UI). Defined in CVSS v3, v4.").optional(),
      vulnerableSystemAvailabilityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
        "IMPACT_PARTIAL",
        "IMPACT_COMPLETE",
      ]).describe(
        "Vulnerable System Availability Impact (VA). Defined in CVSS v4.",
      ).optional(),
      vulnerableSystemConfidentialityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
        "IMPACT_PARTIAL",
        "IMPACT_COMPLETE",
      ]).describe(
        "Vulnerable System Confidentiality Impact (VC). Defined in CVSS v4.",
      ).optional(),
      vulnerableSystemIntegrityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
        "IMPACT_PARTIAL",
        "IMPACT_COMPLETE",
      ]).describe(
        "Vulnerable System Integrity Impact (VI). Defined in CVSS v4.",
      ).optional(),
    }).describe(
      "Common Vulnerability Scoring System. For details, see https://www.first.org/cvss/specification-document This is a message we will try to use for storing various versions of CVSS rather than making a separate proto for storing a specific version.",
    ).optional(),
    cvssV3: z.object({
      attackComplexity: z.enum([
        "ATTACK_COMPLEXITY_UNSPECIFIED",
        "ATTACK_COMPLEXITY_LOW",
        "ATTACK_COMPLEXITY_HIGH",
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
      availabilityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
      ]).optional(),
      baseScore: z.number().describe(
        "The base score is a function of the base metric scores.",
      ).optional(),
      confidentialityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
      ]).optional(),
      exploitabilityScore: z.number().optional(),
      impactScore: z.number().optional(),
      integrityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
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
      "Common Vulnerability Scoring System version 3. For details, see https://www.first.org/cvss/specification-document",
    ).optional(),
    cvssVersion: z.enum([
      "CVSS_VERSION_UNSPECIFIED",
      "CVSS_VERSION_2",
      "CVSS_VERSION_3",
      "CVSS_VERSION_4",
    ]).describe("CVSS version used to populate cvss_score and severity.")
      .optional(),
    details: z.array(z.object({
      affectedCpeUri: z.string().describe(
        "Required. The [CPE URI](https://cpe.mitre.org/specification/) this vulnerability affects.",
      ).optional(),
      affectedPackage: z.string().describe(
        "Required. The package this vulnerability affects.",
      ).optional(),
      affectedVersionEnd: z.object({
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
      affectedVersionStart: z.object({
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
      description: z.string().describe(
        "A vendor-specific description of this vulnerability.",
      ).optional(),
      fixedCpeUri: z.string().describe(
        "The distro recommended [CPE URI](https://cpe.mitre.org/specification/) to update to that contains a fix for this vulnerability. It is possible for this to be different from the affected_cpe_uri.",
      ).optional(),
      fixedPackage: z.string().describe(
        "The distro recommended package to update to that contains a fix for this vulnerability. It is possible for this to be different from the affected_package.",
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
      isObsolete: z.boolean().describe(
        "Whether this detail is obsolete. Occurrences are expected not to point to obsolete details.",
      ).optional(),
      packageType: z.string().describe(
        "The type of package; whether native or non native (e.g., ruby gems, node.js packages, etc.).",
      ).optional(),
      severityName: z.string().describe(
        "The distro assigned severity of this vulnerability.",
      ).optional(),
      source: z.string().describe(
        "The source from which the information in this Detail was obtained.",
      ).optional(),
      sourceUpdateTime: z.string().describe(
        "The time this information was last changed at the source. This is an upstream timestamp from the underlying information source - e.g. Ubuntu security tracker.",
      ).optional(),
      vendor: z.string().describe("The name of the vendor of the product.")
        .optional(),
    })).describe(
      "Details of all known distros and packages affected by this vulnerability.",
    ).optional(),
    severity: z.enum([
      "SEVERITY_UNSPECIFIED",
      "MINIMAL",
      "LOW",
      "MEDIUM",
      "HIGH",
      "CRITICAL",
    ]).describe("The note provider assigned severity of this vulnerability.")
      .optional(),
    sourceUpdateTime: z.string().describe(
      "The time this information was last changed at the source. This is an upstream timestamp from the underlying information source - e.g. Ubuntu security tracker.",
    ).optional(),
    windowsDetails: z.array(z.object({
      cpeUri: z.string().describe(
        "Required. The [CPE URI](https://cpe.mitre.org/specification/) this vulnerability affects.",
      ).optional(),
      description: z.string().describe("The description of this vulnerability.")
        .optional(),
      fixingKbs: z.array(z.object({
        name: z.unknown().describe(
          "The KB name (generally of the form KB[0-9]+ (e.g., KB123456)).",
        ).optional(),
        url: z.unknown().describe(
          "A link to the KB in the [Windows update catalog] (https://www.catalog.update.microsoft.com/).",
        ).optional(),
      })).describe(
        "Required. The names of the KBs which have hotfixes to mitigate this vulnerability. Note that there may be multiple hotfixes (and thus multiple KBs) that mitigate a given vulnerability. Currently any listed KBs presence is considered a fix.",
      ).optional(),
      name: z.string().describe("Required. The name of this vulnerability.")
        .optional(),
    })).describe(
      "Windows details get their own format because the information format and model don't match a normal detail. Specifically Windows updates are done as patches, thus Windows vulnerabilities really are a missing package, rather than a package being at an incorrect version.",
    ).optional(),
  }).describe("A security vulnerability that can be found in resources.")
    .optional(),
  vulnerabilityAssessment: z.object({
    assessment: z.object({
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
      longDescription: z.string().describe(
        "A detailed description of this Vex.",
      ).optional(),
      relatedUris: z.array(z.object({
        label: z.string().describe("Label to describe usage of the URL.")
          .optional(),
        url: z.string().describe("Specific URL associated with the resource.")
          .optional(),
      })).describe(
        "Holds a list of references associated with this vulnerability item and assessment. These uris have additional information about the vulnerability and the assessment itself. E.g. Link to a document which details how this assessment concluded the state of this vulnerability.",
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
      shortDescription: z.string().describe(
        "A one sentence description of this Vex.",
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
      "Assessment provides all information that is related to a single vulnerability for this product.",
    ).optional(),
    languageCode: z.string().describe(
      "Identifies the language used by this document, corresponding to IETF BCP 47 / RFC 5646.",
    ).optional(),
    longDescription: z.string().describe("A detailed description of this Vex.")
      .optional(),
    product: z.object({
      genericUri: z.string().describe(
        "Contains a URI which is vendor-specific. Example: The artifact repository URL of an image.",
      ).optional(),
      id: z.string().describe(
        "Token that identifies a product so that it can be referred to from other parts in the document. There is no predefined format as long as it uniquely identifies a group in the context of the current document.",
      ).optional(),
      name: z.string().describe("Name of the product.").optional(),
    }).describe(
      "Product contains information about a product and how to uniquely identify it.",
    ).optional(),
    publisher: z.object({
      issuingAuthority: z.string().describe(
        "Provides information about the authority of the issuing party to release the document, in particular, the party's constituency and responsibilities or other obligations.",
      ).optional(),
      name: z.string().describe(
        "Name of the publisher. Examples: 'Google', 'Google Cloud Platform'.",
      ).optional(),
      publisherNamespace: z.string().describe(
        "The context or namespace. Contains a URL which is under control of the issuing party and can be used as a globally unique identifier for that issuing party. Example: https://csaf.io",
      ).optional(),
    }).describe(
      "Publisher contains information about the publisher of this Note.",
    ).optional(),
    shortDescription: z.string().describe(
      "A one sentence description of this Vex.",
    ).optional(),
    title: z.string().describe("The title of the note. E.g. `Vex-Debian-11.4`")
      .optional(),
  }).describe(
    "A single VulnerabilityAssessmentNote represents one particular product's vulnerability assessment for one CVE.",
  ).optional(),
  noteId: z.string().describe("Required. The ID to use for this note.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  aiSkillAnalysis: z.object({}).optional(),
  attestation: z.object({
    hint: z.object({
      humanReadableName: z.string(),
    }),
  }).optional(),
  build: z.object({
    builderVersion: z.string(),
  }).optional(),
  compliance: z.object({
    cisBenchmark: z.object({
      profileLevel: z.number(),
      severity: z.string(),
    }),
    description: z.string(),
    impact: z.string(),
    rationale: z.string(),
    remediation: z.string(),
    scanInstructions: z.string(),
    title: z.string(),
    version: z.array(z.object({
      benchmarkDocument: z.string(),
      cpeUri: z.string(),
      version: z.string(),
    })),
  }).optional(),
  createTime: z.string().optional(),
  deployment: z.object({
    resourceUri: z.array(z.string()),
  }).optional(),
  discovery: z.object({
    analysisKind: z.string(),
  }).optional(),
  dsseAttestation: z.object({
    hint: z.object({
      humanReadableName: z.string(),
    }),
  }).optional(),
  expirationTime: z.string().optional(),
  image: z.object({
    fingerprint: z.object({
      v1Name: z.string(),
      v2Blob: z.array(z.string()),
      v2Name: z.string(),
    }),
    resourceUrl: z.string(),
  }).optional(),
  kind: z.string().optional(),
  longDescription: z.string().optional(),
  name: z.string(),
  package: z.object({
    architecture: z.string(),
    cpeUri: z.string(),
    description: z.string(),
    digest: z.array(z.object({
      algo: z.string(),
      digestBytes: z.string(),
    })),
    distribution: z.array(z.object({
      architecture: z.string(),
      cpeUri: z.string(),
      description: z.string(),
      latestVersion: z.object({
        epoch: z.number(),
        fullName: z.string(),
        inclusive: z.boolean(),
        kind: z.string(),
        name: z.string(),
        revision: z.string(),
      }),
      maintainer: z.string(),
      url: z.string(),
    })),
    license: z.object({
      comments: z.string(),
      expression: z.string(),
    }),
    maintainer: z.string(),
    name: z.string(),
    packageType: z.string(),
    url: z.string(),
    version: z.object({
      epoch: z.number(),
      fullName: z.string(),
      inclusive: z.boolean(),
      kind: z.string(),
      name: z.string(),
      revision: z.string(),
    }),
  }).optional(),
  relatedNoteNames: z.array(z.string()).optional(),
  relatedUrl: z.array(z.object({
    label: z.string(),
    url: z.string(),
  })).optional(),
  sbomReference: z.object({
    format: z.string(),
    version: z.string(),
  }).optional(),
  secret: z.object({}).optional(),
  shortDescription: z.string().optional(),
  updateTime: z.string().optional(),
  upgrade: z.object({
    distributions: z.array(z.object({
      classification: z.string(),
      cpeUri: z.string(),
      cve: z.array(z.string()),
      severity: z.string(),
    })),
    package: z.string(),
    version: z.object({
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
    advisoryPublishTime: z.string(),
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
    cvssV3: z.object({
      attackComplexity: z.string(),
      attackVector: z.string(),
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
    details: z.array(z.object({
      affectedCpeUri: z.string(),
      affectedPackage: z.string(),
      affectedVersionEnd: z.object({
        epoch: z.number(),
        fullName: z.string(),
        inclusive: z.boolean(),
        kind: z.string(),
        name: z.string(),
        revision: z.string(),
      }),
      affectedVersionStart: z.object({
        epoch: z.number(),
        fullName: z.string(),
        inclusive: z.boolean(),
        kind: z.string(),
        name: z.string(),
        revision: z.string(),
      }),
      description: z.string(),
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
      isObsolete: z.boolean(),
      packageType: z.string(),
      severityName: z.string(),
      source: z.string(),
      sourceUpdateTime: z.string(),
      vendor: z.string(),
    })),
    severity: z.string(),
    sourceUpdateTime: z.string(),
    windowsDetails: z.array(z.object({
      cpeUri: z.string(),
      description: z.string(),
      fixingKbs: z.array(z.object({
        name: z.unknown(),
        url: z.unknown(),
      })),
      name: z.string(),
    })),
  }).optional(),
  vulnerabilityAssessment: z.object({
    assessment: z.object({
      cve: z.string(),
      impacts: z.array(z.string()),
      justification: z.object({
        details: z.string(),
        justificationType: z.string(),
      }),
      longDescription: z.string(),
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
      shortDescription: z.string(),
      state: z.string(),
      vulnerabilityId: z.string(),
    }),
    languageCode: z.string(),
    longDescription: z.string(),
    product: z.object({
      genericUri: z.string(),
      id: z.string(),
      name: z.string(),
    }),
    publisher: z.object({
      issuingAuthority: z.string(),
      name: z.string(),
      publisherNamespace: z.string(),
    }),
    shortDescription: z.string(),
    title: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  aiSkillAnalysis: z.object({}).describe(
    "AISkillAnalysisNote provides the metadata of an AI-based skill analysis.",
  ).optional(),
  attestation: z.object({
    hint: z.object({
      humanReadableName: z.string().describe(
        'Required. The human readable name of this attestation authority, for example "qa".',
      ).optional(),
    }).describe(
      'This submessage provides human-readable hints about the purpose of the authority. Because the name of a note acts as its resource reference, it is important to disambiguate the canonical name of the Note (which might be a UUID for security purposes) from "readable" names more suitable for debug output. Note that these hints should not be used to look up authorities in security sensitive contexts, such as when looking up attestations to verify.',
    ).optional(),
  }).describe(
    'Note kind that represents a logical attestation "role" or "authority". For example, an organization might have one `Authority` for "QA" and one for "build". This note is intended to act strictly as a grouping mechanism for the attached occurrences (Attestations). This grouping mechanism also provides a security boundary, since IAM ACLs gate the ability for a principle to attach an occurrence to a given note. It also provides a single point of lookup to find all attached attestation occurrences, even if they don\'t all live in the same project.',
  ).optional(),
  build: z.object({
    builderVersion: z.string().describe(
      "Required. Immutable. Version of the builder which produced this build.",
    ).optional(),
  }).describe(
    "Note holding the version of the provider's builder and the signature of the provenance message in the build details occurrence.",
  ).optional(),
  compliance: z.object({
    cisBenchmark: z.object({
      profileLevel: z.number().int().optional(),
      severity: z.enum([
        "SEVERITY_UNSPECIFIED",
        "MINIMAL",
        "LOW",
        "MEDIUM",
        "HIGH",
        "CRITICAL",
      ]).optional(),
    }).describe("A compliance check that is a CIS benchmark.").optional(),
    description: z.string().describe(
      "A description about this compliance check.",
    ).optional(),
    impact: z.string().optional(),
    rationale: z.string().describe(
      "A rationale for the existence of this compliance check.",
    ).optional(),
    remediation: z.string().describe(
      "A description of remediation steps if the compliance check fails.",
    ).optional(),
    scanInstructions: z.string().describe(
      "Serialized scan instructions with a predefined format.",
    ).optional(),
    title: z.string().describe(
      "The title that identifies this compliance check.",
    ).optional(),
    version: z.array(z.object({
      benchmarkDocument: z.string().describe(
        'The name of the document that defines this benchmark, e.g. "CIS Container-Optimized OS".',
      ).optional(),
      cpeUri: z.string().describe(
        "The CPE URI (https://cpe.mitre.org/specification/) this benchmark is applicable to.",
      ).optional(),
      version: z.string().describe(
        "The version of the benchmark. This is set to the version of the OS-specific CIS document the benchmark is defined in.",
      ).optional(),
    })).describe("The OS and config versions the benchmark applies to.")
      .optional(),
  }).optional(),
  deployment: z.object({
    resourceUri: z.array(z.string()).describe(
      "Required. Resource URI for the artifact being deployed.",
    ).optional(),
  }).describe("An artifact that can be deployed in some runtime.").optional(),
  discovery: z.object({
    analysisKind: z.enum([
      "NOTE_KIND_UNSPECIFIED",
      "VULNERABILITY",
      "BUILD",
      "IMAGE",
      "PACKAGE",
      "DEPLOYMENT",
      "DISCOVERY",
      "ATTESTATION",
      "UPGRADE",
      "COMPLIANCE",
      "DSSE_ATTESTATION",
      "VULNERABILITY_ASSESSMENT",
      "SBOM_REFERENCE",
      "SECRET",
      "AI_SKILL_ANALYSIS",
    ]).describe(
      "Required. Immutable. The kind of analysis that is handled by this discovery.",
    ).optional(),
  }).describe(
    "A note that indicates a type of analysis a provider would perform. This note exists in a provider's project. A `Discovery` occurrence is created in a consumer's project at the start of analysis.",
  ).optional(),
  dsseAttestation: z.object({
    hint: z.object({
      humanReadableName: z.string().describe(
        'Required. The human readable name of this attestation authority, for example "cloudbuild-prod".',
      ).optional(),
    }).describe(
      'This submessage provides human-readable hints about the purpose of the authority. Because the name of a note acts as its resource reference, it is important to disambiguate the canonical name of the Note (which might be a UUID for security purposes) from "readable" names more suitable for debug output. Note that these hints should not be used to look up authorities in security sensitive contexts, such as when looking up attestations to verify.',
    ).optional(),
  }).optional(),
  expirationTime: z.string().describe(
    "Time of expiration for this note. Empty if note does not expire.",
  ).optional(),
  image: z.object({
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
    resourceUrl: z.string().describe(
      "Required. Immutable. The resource_url for the resource representing the basis of associated occurrence images.",
    ).optional(),
  }).describe(
    "Basis describes the base image portion (Note) of the DockerImage relationship. Linked occurrences are derived from this or an equivalent image via: FROM Or an equivalent reference, e.g., a tag of the resource_url.",
  ).optional(),
  longDescription: z.string().describe("A detailed description of this note.")
    .optional(),
  package: z.object({
    architecture: z.enum(["ARCHITECTURE_UNSPECIFIED", "X86", "X64"]).describe(
      "The CPU architecture for which packages in this distribution channel were built. Architecture will be blank for language packages.",
    ).optional(),
    cpeUri: z.string().describe(
      "The cpe_uri in [CPE format](https://cpe.mitre.org/specification/) denoting the package manager version distributing a package. The cpe_uri will be blank for language packages.",
    ).optional(),
    description: z.string().describe("The description of this package.")
      .optional(),
    digest: z.array(z.object({
      algo: z.string().describe("`SHA1`, `SHA512` etc.").optional(),
      digestBytes: z.string().describe("Value of the digest.").optional(),
    })).describe(
      "Hash value, typically a file digest, that allows unique identification a specific package.",
    ).optional(),
    distribution: z.array(z.object({
      architecture: z.enum(["ARCHITECTURE_UNSPECIFIED", "X86", "X64"]).describe(
        "The CPU architecture for which packages in this distribution channel were built.",
      ).optional(),
      cpeUri: z.string().describe(
        "Required. The cpe_uri in [CPE format](https://cpe.mitre.org/specification/) denoting the package manager version distributing a package.",
      ).optional(),
      description: z.string().describe(
        "The distribution channel-specific description of this package.",
      ).optional(),
      latestVersion: z.object({
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
      maintainer: z.string().describe(
        "A freeform string denoting the maintainer of this package.",
      ).optional(),
      url: z.string().describe(
        "The distribution channel-specific homepage for this package.",
      ).optional(),
    })).describe(
      "Deprecated. The various channels by which a package is distributed.",
    ).optional(),
    license: z.object({
      comments: z.string().describe("Comments").optional(),
      expression: z.string().describe(
        'Often a single license can be used to represent the licensing terms. Sometimes it is necessary to include a choice of one or more licenses or some combination of license identifiers. Examples: "LGPL-2.1-only OR MIT", "LGPL-2.1-only AND MIT", "GPL-2.0-or-later WITH Bison-exception-2.2".',
      ).optional(),
    }).describe("License information.").optional(),
    maintainer: z.string().describe(
      "A freeform text denoting the maintainer of this package.",
    ).optional(),
    name: z.string().describe("Required. Immutable. The name of the package.")
      .optional(),
    packageType: z.string().describe(
      "The type of package; whether native or non native (e.g., ruby gems, node.js packages, etc.).",
    ).optional(),
    url: z.string().describe("The homepage for this package.").optional(),
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
  }).describe("PackageNote represents a particular package version.")
    .optional(),
  relatedNoteNames: z.array(z.string()).describe(
    "Other notes related to this note.",
  ).optional(),
  relatedUrl: z.array(z.object({
    label: z.string().describe("Label to describe usage of the URL.")
      .optional(),
    url: z.string().describe("Specific URL associated with the resource.")
      .optional(),
  })).describe("URLs associated with this note.").optional(),
  sbomReference: z.object({
    format: z.string().describe(
      "The format that SBOM takes. E.g. may be spdx, cyclonedx, etc...",
    ).optional(),
    version: z.string().describe(
      "The version of the format that the SBOM takes. E.g. if the format is spdx, the version may be 2.3.",
    ).optional(),
  }).describe("The note representing an SBOM reference.").optional(),
  secret: z.object({}).describe("The note representing a secret.").optional(),
  shortDescription: z.string().describe(
    "A one sentence description of this note.",
  ).optional(),
  upgrade: z.object({
    distributions: z.array(z.object({
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
    })).describe(
      "Metadata about the upgrade for each specific operating system.",
    ).optional(),
    package: z.string().describe(
      "Required for non-Windows OS. The package this Upgrade is for.",
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
    "An Upgrade Note represents a potential upgrade of a package to a given version. For each package version combination (i.e. bash 4.0, bash 4.1, bash 4.1.2), there will be an Upgrade Note. For Windows, windows_update field represents the information related to the update.",
  ).optional(),
  vulnerability: z.object({
    advisoryPublishTime: z.string().describe(
      "The time this advisory was published by the source.",
    ).optional(),
    cvssScore: z.number().describe(
      "The CVSS score of this vulnerability. CVSS score is on a scale of 0 - 10 where 0 indicates low severity and 10 indicates high severity.",
    ).optional(),
    cvssV2: z.object({
      attackComplexity: z.enum([
        "ATTACK_COMPLEXITY_UNSPECIFIED",
        "ATTACK_COMPLEXITY_LOW",
        "ATTACK_COMPLEXITY_HIGH",
        "ATTACK_COMPLEXITY_MEDIUM",
      ]).describe("Attack Complexity (AC). Defined in CVSS v2, v3, v4.")
        .optional(),
      attackRequirements: z.enum([
        "ATTACK_REQUIREMENTS_UNSPECIFIED",
        "ATTACK_REQUIREMENTS_NONE",
        "ATTACK_REQUIREMENTS_PRESENT",
      ]).describe("Attack Requirements (AT). Defined in CVSS v4.").optional(),
      attackVector: z.enum([
        "ATTACK_VECTOR_UNSPECIFIED",
        "ATTACK_VECTOR_NETWORK",
        "ATTACK_VECTOR_ADJACENT",
        "ATTACK_VECTOR_LOCAL",
        "ATTACK_VECTOR_PHYSICAL",
      ]).describe("Attack Vector (AV). Defined in CVSS v2, v3, v4.").optional(),
      authentication: z.enum([
        "AUTHENTICATION_UNSPECIFIED",
        "AUTHENTICATION_MULTIPLE",
        "AUTHENTICATION_SINGLE",
        "AUTHENTICATION_NONE",
      ]).describe("Authentication (Au). Defined in CVSS v2.").optional(),
      availabilityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
        "IMPACT_PARTIAL",
        "IMPACT_COMPLETE",
      ]).describe("Availability Impact (A). Defined in CVSS v2, v3.")
        .optional(),
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
      ]).describe("Confidentiality Impact (C). Defined in CVSS v2, v3.")
        .optional(),
      exploitabilityScore: z.number().optional(),
      impactScore: z.number().optional(),
      integrityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
        "IMPACT_PARTIAL",
        "IMPACT_COMPLETE",
      ]).describe("Integrity Impact (I). Defined in CVSS v2, v3.").optional(),
      privilegesRequired: z.enum([
        "PRIVILEGES_REQUIRED_UNSPECIFIED",
        "PRIVILEGES_REQUIRED_NONE",
        "PRIVILEGES_REQUIRED_LOW",
        "PRIVILEGES_REQUIRED_HIGH",
      ]).describe("Privileges Required (PR). Defined in CVSS v3, v4.")
        .optional(),
      scope: z.enum(["SCOPE_UNSPECIFIED", "SCOPE_UNCHANGED", "SCOPE_CHANGED"])
        .describe("Scope (S). Defined in CVSS v3.").optional(),
      subsequentSystemAvailabilityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
        "IMPACT_PARTIAL",
        "IMPACT_COMPLETE",
      ]).describe(
        "Subsequent System Availability Impact (SA). Defined in CVSS v4.",
      ).optional(),
      subsequentSystemConfidentialityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
        "IMPACT_PARTIAL",
        "IMPACT_COMPLETE",
      ]).describe(
        "Subsequent System Confidentiality Impact (SC). Defined in CVSS v4.",
      ).optional(),
      subsequentSystemIntegrityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
        "IMPACT_PARTIAL",
        "IMPACT_COMPLETE",
      ]).describe(
        "Subsequent System Integrity Impact (SI). Defined in CVSS v4.",
      ).optional(),
      userInteraction: z.enum([
        "USER_INTERACTION_UNSPECIFIED",
        "USER_INTERACTION_NONE",
        "USER_INTERACTION_REQUIRED",
        "USER_INTERACTION_PASSIVE",
        "USER_INTERACTION_ACTIVE",
      ]).describe("User Interaction (UI). Defined in CVSS v3, v4.").optional(),
      vulnerableSystemAvailabilityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
        "IMPACT_PARTIAL",
        "IMPACT_COMPLETE",
      ]).describe(
        "Vulnerable System Availability Impact (VA). Defined in CVSS v4.",
      ).optional(),
      vulnerableSystemConfidentialityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
        "IMPACT_PARTIAL",
        "IMPACT_COMPLETE",
      ]).describe(
        "Vulnerable System Confidentiality Impact (VC). Defined in CVSS v4.",
      ).optional(),
      vulnerableSystemIntegrityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
        "IMPACT_PARTIAL",
        "IMPACT_COMPLETE",
      ]).describe(
        "Vulnerable System Integrity Impact (VI). Defined in CVSS v4.",
      ).optional(),
    }).describe(
      "Common Vulnerability Scoring System. For details, see https://www.first.org/cvss/specification-document This is a message we will try to use for storing various versions of CVSS rather than making a separate proto for storing a specific version.",
    ).optional(),
    cvssV3: z.object({
      attackComplexity: z.enum([
        "ATTACK_COMPLEXITY_UNSPECIFIED",
        "ATTACK_COMPLEXITY_LOW",
        "ATTACK_COMPLEXITY_HIGH",
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
      availabilityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
      ]).optional(),
      baseScore: z.number().describe(
        "The base score is a function of the base metric scores.",
      ).optional(),
      confidentialityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
      ]).optional(),
      exploitabilityScore: z.number().optional(),
      impactScore: z.number().optional(),
      integrityImpact: z.enum([
        "IMPACT_UNSPECIFIED",
        "IMPACT_HIGH",
        "IMPACT_LOW",
        "IMPACT_NONE",
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
      "Common Vulnerability Scoring System version 3. For details, see https://www.first.org/cvss/specification-document",
    ).optional(),
    cvssVersion: z.enum([
      "CVSS_VERSION_UNSPECIFIED",
      "CVSS_VERSION_2",
      "CVSS_VERSION_3",
      "CVSS_VERSION_4",
    ]).describe("CVSS version used to populate cvss_score and severity.")
      .optional(),
    details: z.array(z.object({
      affectedCpeUri: z.string().describe(
        "Required. The [CPE URI](https://cpe.mitre.org/specification/) this vulnerability affects.",
      ).optional(),
      affectedPackage: z.string().describe(
        "Required. The package this vulnerability affects.",
      ).optional(),
      affectedVersionEnd: z.object({
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
      affectedVersionStart: z.object({
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
      description: z.string().describe(
        "A vendor-specific description of this vulnerability.",
      ).optional(),
      fixedCpeUri: z.string().describe(
        "The distro recommended [CPE URI](https://cpe.mitre.org/specification/) to update to that contains a fix for this vulnerability. It is possible for this to be different from the affected_cpe_uri.",
      ).optional(),
      fixedPackage: z.string().describe(
        "The distro recommended package to update to that contains a fix for this vulnerability. It is possible for this to be different from the affected_package.",
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
      isObsolete: z.boolean().describe(
        "Whether this detail is obsolete. Occurrences are expected not to point to obsolete details.",
      ).optional(),
      packageType: z.string().describe(
        "The type of package; whether native or non native (e.g., ruby gems, node.js packages, etc.).",
      ).optional(),
      severityName: z.string().describe(
        "The distro assigned severity of this vulnerability.",
      ).optional(),
      source: z.string().describe(
        "The source from which the information in this Detail was obtained.",
      ).optional(),
      sourceUpdateTime: z.string().describe(
        "The time this information was last changed at the source. This is an upstream timestamp from the underlying information source - e.g. Ubuntu security tracker.",
      ).optional(),
      vendor: z.string().describe("The name of the vendor of the product.")
        .optional(),
    })).describe(
      "Details of all known distros and packages affected by this vulnerability.",
    ).optional(),
    severity: z.enum([
      "SEVERITY_UNSPECIFIED",
      "MINIMAL",
      "LOW",
      "MEDIUM",
      "HIGH",
      "CRITICAL",
    ]).describe("The note provider assigned severity of this vulnerability.")
      .optional(),
    sourceUpdateTime: z.string().describe(
      "The time this information was last changed at the source. This is an upstream timestamp from the underlying information source - e.g. Ubuntu security tracker.",
    ).optional(),
    windowsDetails: z.array(z.object({
      cpeUri: z.string().describe(
        "Required. The [CPE URI](https://cpe.mitre.org/specification/) this vulnerability affects.",
      ).optional(),
      description: z.string().describe("The description of this vulnerability.")
        .optional(),
      fixingKbs: z.array(z.object({
        name: z.unknown().describe(
          "The KB name (generally of the form KB[0-9]+ (e.g., KB123456)).",
        ).optional(),
        url: z.unknown().describe(
          "A link to the KB in the [Windows update catalog] (https://www.catalog.update.microsoft.com/).",
        ).optional(),
      })).describe(
        "Required. The names of the KBs which have hotfixes to mitigate this vulnerability. Note that there may be multiple hotfixes (and thus multiple KBs) that mitigate a given vulnerability. Currently any listed KBs presence is considered a fix.",
      ).optional(),
      name: z.string().describe("Required. The name of this vulnerability.")
        .optional(),
    })).describe(
      "Windows details get their own format because the information format and model don't match a normal detail. Specifically Windows updates are done as patches, thus Windows vulnerabilities really are a missing package, rather than a package being at an incorrect version.",
    ).optional(),
  }).describe("A security vulnerability that can be found in resources.")
    .optional(),
  vulnerabilityAssessment: z.object({
    assessment: z.object({
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
      longDescription: z.string().describe(
        "A detailed description of this Vex.",
      ).optional(),
      relatedUris: z.array(z.object({
        label: z.string().describe("Label to describe usage of the URL.")
          .optional(),
        url: z.string().describe("Specific URL associated with the resource.")
          .optional(),
      })).describe(
        "Holds a list of references associated with this vulnerability item and assessment. These uris have additional information about the vulnerability and the assessment itself. E.g. Link to a document which details how this assessment concluded the state of this vulnerability.",
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
      shortDescription: z.string().describe(
        "A one sentence description of this Vex.",
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
      "Assessment provides all information that is related to a single vulnerability for this product.",
    ).optional(),
    languageCode: z.string().describe(
      "Identifies the language used by this document, corresponding to IETF BCP 47 / RFC 5646.",
    ).optional(),
    longDescription: z.string().describe("A detailed description of this Vex.")
      .optional(),
    product: z.object({
      genericUri: z.string().describe(
        "Contains a URI which is vendor-specific. Example: The artifact repository URL of an image.",
      ).optional(),
      id: z.string().describe(
        "Token that identifies a product so that it can be referred to from other parts in the document. There is no predefined format as long as it uniquely identifies a group in the context of the current document.",
      ).optional(),
      name: z.string().describe("Name of the product.").optional(),
    }).describe(
      "Product contains information about a product and how to uniquely identify it.",
    ).optional(),
    publisher: z.object({
      issuingAuthority: z.string().describe(
        "Provides information about the authority of the issuing party to release the document, in particular, the party's constituency and responsibilities or other obligations.",
      ).optional(),
      name: z.string().describe(
        "Name of the publisher. Examples: 'Google', 'Google Cloud Platform'.",
      ).optional(),
      publisherNamespace: z.string().describe(
        "The context or namespace. Contains a URL which is under control of the issuing party and can be used as a globally unique identifier for that issuing party. Example: https://csaf.io",
      ).optional(),
    }).describe(
      "Publisher contains information about the publisher of this Note.",
    ).optional(),
    shortDescription: z.string().describe(
      "A one sentence description of this Vex.",
    ).optional(),
    title: z.string().describe("The title of the note. E.g. `Vex-Debian-11.4`")
      .optional(),
  }).describe(
    "A single VulnerabilityAssessmentNote represents one particular product's vulnerability assessment for one CVE.",
  ).optional(),
  noteId: z.string().describe("Required. The ID to use for this note.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Container Analysis Notes. Registered at `@swamp/gcp/containeranalysis/notes`. */
export const model = {
  type: "@swamp/gcp/containeranalysis/notes",
  version: "2026.06.08.2",
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
    {
      toVersion: "2026.05.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.05.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.06.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A type of analysis that can be done for a resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a notes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
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
        if (g["expirationTime"] !== undefined) {
          body["expirationTime"] = g["expirationTime"];
        }
        if (g["image"] !== undefined) body["image"] = g["image"];
        if (g["longDescription"] !== undefined) {
          body["longDescription"] = g["longDescription"];
        }
        if (g["package"] !== undefined) body["package"] = g["package"];
        if (g["relatedNoteNames"] !== undefined) {
          body["relatedNoteNames"] = g["relatedNoteNames"];
        }
        if (g["relatedUrl"] !== undefined) body["relatedUrl"] = g["relatedUrl"];
        if (g["sbomReference"] !== undefined) {
          body["sbomReference"] = g["sbomReference"];
        }
        if (g["secret"] !== undefined) body["secret"] = g["secret"];
        if (g["shortDescription"] !== undefined) {
          body["shortDescription"] = g["shortDescription"];
        }
        if (g["upgrade"] !== undefined) body["upgrade"] = g["upgrade"];
        if (g["vulnerability"] !== undefined) {
          body["vulnerability"] = g["vulnerability"];
        }
        if (g["vulnerabilityAssessment"] !== undefined) {
          body["vulnerabilityAssessment"] = g["vulnerabilityAssessment"];
        }
        if (g["noteId"] !== undefined) body["noteId"] = g["noteId"];
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
          credentials,
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
      description: "Get a notes",
      arguments: z.object({
        identifier: z.string().describe("The name of the notes"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
      description: "Update notes attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (g["expirationTime"] !== undefined) {
          body["expirationTime"] = g["expirationTime"];
        }
        if (g["image"] !== undefined) body["image"] = g["image"];
        if (g["longDescription"] !== undefined) {
          body["longDescription"] = g["longDescription"];
        }
        if (g["package"] !== undefined) body["package"] = g["package"];
        if (g["relatedNoteNames"] !== undefined) {
          body["relatedNoteNames"] = g["relatedNoteNames"];
        }
        if (g["relatedUrl"] !== undefined) body["relatedUrl"] = g["relatedUrl"];
        if (g["sbomReference"] !== undefined) {
          body["sbomReference"] = g["sbomReference"];
        }
        if (g["secret"] !== undefined) body["secret"] = g["secret"];
        if (g["shortDescription"] !== undefined) {
          body["shortDescription"] = g["shortDescription"];
        }
        if (g["upgrade"] !== undefined) body["upgrade"] = g["upgrade"];
        if (g["vulnerability"] !== undefined) {
          body["vulnerability"] = g["vulnerability"];
        }
        if (g["vulnerabilityAssessment"] !== undefined) {
          body["vulnerabilityAssessment"] = g["vulnerabilityAssessment"];
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
          undefined,
          credentials,
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
      description: "Delete the notes",
      arguments: z.object({
        identifier: z.string().describe("The name of the notes"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
          credentials,
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
      description: "Sync notes state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            credentials,
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
      description: "List notes resources",
      arguments: z.object({
        filter: z.string().describe("The filter expression.").optional(),
        pageSize: z.number().describe(
          "Number of notes to return in the list. Must be positive. Max allowed page size is 1000. If not specified, page size defaults to 20.",
        ).optional(),
        returnPartialSuccess: z.boolean().describe(
          "If set, the request will return all reachable Notes and report all unreachable regions in the `unreachable` field in the response. Only applicable for requests in the global region.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          "notes",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
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
        notes: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["notes"] !== undefined) body["notes"] = args["notes"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "containeranalysis.projects.locations.notes.batchCreate",
            "path": "v1/{+parent}/notes:batchCreate",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            "id": "containeranalysis.projects.locations.notes.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            "id": "containeranalysis.projects.locations.notes.setIamPolicy",
            "path": "v1/{+resource}:setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
              "containeranalysis.projects.locations.notes.testIamPermissions",
            "path": "v1/{+resource}:testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
