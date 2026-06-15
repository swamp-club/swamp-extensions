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

// Auto-generated extension model for @swamp/aws/b2bi/capability
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for B2BI Capability (AWS::B2BI::Capability).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const X12DetailsSchema = z.object({
  TransactionSet: z.enum([
    "X12_100",
    "X12_101",
    "X12_102",
    "X12_103",
    "X12_104",
    "X12_105",
    "X12_106",
    "X12_107",
    "X12_108",
    "X12_109",
    "X12_110",
    "X12_111",
    "X12_112",
    "X12_113",
    "X12_120",
    "X12_121",
    "X12_124",
    "X12_125",
    "X12_126",
    "X12_127",
    "X12_128",
    "X12_129",
    "X12_130",
    "X12_131",
    "X12_132",
    "X12_133",
    "X12_135",
    "X12_138",
    "X12_139",
    "X12_140",
    "X12_141",
    "X12_142",
    "X12_143",
    "X12_144",
    "X12_146",
    "X12_147",
    "X12_148",
    "X12_149",
    "X12_150",
    "X12_151",
    "X12_152",
    "X12_153",
    "X12_154",
    "X12_155",
    "X12_157",
    "X12_158",
    "X12_159",
    "X12_160",
    "X12_161",
    "X12_163",
    "X12_170",
    "X12_175",
    "X12_176",
    "X12_179",
    "X12_180",
    "X12_185",
    "X12_186",
    "X12_187",
    "X12_188",
    "X12_189",
    "X12_190",
    "X12_191",
    "X12_194",
    "X12_195",
    "X12_196",
    "X12_197",
    "X12_198",
    "X12_199",
    "X12_200",
    "X12_201",
    "X12_202",
    "X12_203",
    "X12_204",
    "X12_205",
    "X12_206",
    "X12_210",
    "X12_211",
    "X12_212",
    "X12_213",
    "X12_214",
    "X12_215",
    "X12_216",
    "X12_217",
    "X12_218",
    "X12_219",
    "X12_220",
    "X12_222",
    "X12_223",
    "X12_224",
    "X12_225",
    "X12_227",
    "X12_228",
    "X12_240",
    "X12_242",
    "X12_244",
    "X12_245",
    "X12_248",
    "X12_249",
    "X12_250",
    "X12_251",
    "X12_252",
    "X12_255",
    "X12_256",
    "X12_259",
    "X12_260",
    "X12_261",
    "X12_262",
    "X12_263",
    "X12_264",
    "X12_265",
    "X12_266",
    "X12_267",
    "X12_268",
    "X12_269",
    "X12_270",
    "X12_271",
    "X12_272",
    "X12_273",
    "X12_274",
    "X12_275",
    "X12_276",
    "X12_277",
    "X12_278",
    "X12_280",
    "X12_283",
    "X12_284",
    "X12_285",
    "X12_286",
    "X12_288",
    "X12_290",
    "X12_300",
    "X12_301",
    "X12_303",
    "X12_304",
    "X12_309",
    "X12_310",
    "X12_311",
    "X12_312",
    "X12_313",
    "X12_315",
    "X12_317",
    "X12_319",
    "X12_322",
    "X12_323",
    "X12_324",
    "X12_325",
    "X12_326",
    "X12_350",
    "X12_352",
    "X12_353",
    "X12_354",
    "X12_355",
    "X12_356",
    "X12_357",
    "X12_358",
    "X12_361",
    "X12_362",
    "X12_404",
    "X12_410",
    "X12_412",
    "X12_414",
    "X12_417",
    "X12_418",
    "X12_419",
    "X12_420",
    "X12_421",
    "X12_422",
    "X12_423",
    "X12_424",
    "X12_425",
    "X12_426",
    "X12_429",
    "X12_431",
    "X12_432",
    "X12_433",
    "X12_434",
    "X12_435",
    "X12_436",
    "X12_437",
    "X12_440",
    "X12_451",
    "X12_452",
    "X12_453",
    "X12_455",
    "X12_456",
    "X12_460",
    "X12_463",
    "X12_466",
    "X12_468",
    "X12_470",
    "X12_475",
    "X12_485",
    "X12_486",
    "X12_490",
    "X12_492",
    "X12_494",
    "X12_500",
    "X12_501",
    "X12_503",
    "X12_504",
    "X12_511",
    "X12_517",
    "X12_521",
    "X12_527",
    "X12_536",
    "X12_540",
    "X12_561",
    "X12_567",
    "X12_568",
    "X12_601",
    "X12_602",
    "X12_620",
    "X12_625",
    "X12_650",
    "X12_715",
    "X12_753",
    "X12_754",
    "X12_805",
    "X12_806",
    "X12_810",
    "X12_811",
    "X12_812",
    "X12_813",
    "X12_814",
    "X12_815",
    "X12_816",
    "X12_818",
    "X12_819",
    "X12_820",
    "X12_821",
    "X12_822",
    "X12_823",
    "X12_824",
    "X12_826",
    "X12_827",
    "X12_828",
    "X12_829",
    "X12_830",
    "X12_831",
    "X12_832",
    "X12_833",
    "X12_834",
    "X12_835",
    "X12_836",
    "X12_837",
    "X12_838",
    "X12_839",
    "X12_840",
    "X12_841",
    "X12_842",
    "X12_843",
    "X12_844",
    "X12_845",
    "X12_846",
    "X12_847",
    "X12_848",
    "X12_849",
    "X12_850",
    "X12_851",
    "X12_852",
    "X12_853",
    "X12_854",
    "X12_855",
    "X12_856",
    "X12_857",
    "X12_858",
    "X12_859",
    "X12_860",
    "X12_861",
    "X12_862",
    "X12_863",
    "X12_864",
    "X12_865",
    "X12_866",
    "X12_867",
    "X12_868",
    "X12_869",
    "X12_870",
    "X12_871",
    "X12_872",
    "X12_873",
    "X12_874",
    "X12_875",
    "X12_876",
    "X12_877",
    "X12_878",
    "X12_879",
    "X12_880",
    "X12_881",
    "X12_882",
    "X12_883",
    "X12_884",
    "X12_885",
    "X12_886",
    "X12_887",
    "X12_888",
    "X12_889",
    "X12_891",
    "X12_893",
    "X12_894",
    "X12_895",
    "X12_896",
    "X12_920",
    "X12_924",
    "X12_925",
    "X12_926",
    "X12_928",
    "X12_940",
    "X12_943",
    "X12_944",
    "X12_945",
    "X12_947",
    "X12_980",
    "X12_990",
    "X12_993",
    "X12_996",
    "X12_997",
    "X12_998",
    "X12_999",
    "X12_270_X279",
    "X12_271_X279",
    "X12_275_X210",
    "X12_275_X211",
    "X12_276_X212",
    "X12_277_X212",
    "X12_277_X214",
    "X12_277_X364",
    "X12_278_X217",
    "X12_820_X218",
    "X12_820_X306",
    "X12_824_X186",
    "X12_834_X220",
    "X12_834_X307",
    "X12_834_X318",
    "X12_835_X221",
    "X12_837_X222",
    "X12_837_X223",
    "X12_837_X224",
    "X12_837_X291",
    "X12_837_X292",
    "X12_837_X298",
    "X12_999_X231",
  ]).optional(),
  Version: z.enum([
    "VERSION_4010",
    "VERSION_4030",
    "VERSION_4050",
    "VERSION_4060",
    "VERSION_5010",
    "VERSION_5010_HIPAA",
  ]).optional(),
});

const S3LocationSchema = z.object({
  BucketName: z.string().min(3).max(63).optional(),
  Key: z.string().min(0).max(1024).optional(),
});

const EdiConfigurationSchema = z.object({
  CapabilityDirection: z.enum(["INBOUND", "OUTBOUND"]).optional(),
  Type: z.object({
    X12Details: X12DetailsSchema.optional(),
  }),
  InputLocation: S3LocationSchema,
  OutputLocation: S3LocationSchema,
  TransformerId: z.string().min(1).max(64).regex(
    new RegExp("^[a-zA-Z0-9_-]+$"),
  ),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(256),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accessKeyId: z.string().meta({ sensitive: true }).describe(
    "AWS access key ID; overrides AWS_ACCESS_KEY_ID environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).describe(
    "AWS secret access key; overrides AWS_SECRET_ACCESS_KEY environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  sessionToken: z.string().meta({ sensitive: true }).describe(
    "AWS session token for temporary credentials; overrides AWS_SESSION_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  region: z.string().describe(
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  Configuration: z.object({
    Edi: EdiConfigurationSchema.optional(),
  }),
  InstructionsDocuments: z.array(S3LocationSchema).optional(),
  Name: z.string().min(1).max(254),
  Tags: z.array(TagSchema).optional(),
  Type: z.enum(["edi"]),
});

const StateSchema = z.object({
  CapabilityArn: z.string().optional(),
  CapabilityId: z.string(),
  Configuration: z.object({
    Edi: EdiConfigurationSchema,
  }).optional(),
  CreatedAt: z.string().optional(),
  InstructionsDocuments: z.array(S3LocationSchema).optional(),
  ModifiedAt: z.string().optional(),
  Name: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  Type: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Configuration: z.object({
    Edi: EdiConfigurationSchema.optional(),
  }).optional(),
  InstructionsDocuments: z.array(S3LocationSchema).optional(),
  Name: z.string().min(1).max(254).optional(),
  Tags: z.array(TagSchema).optional(),
  Type: z.enum(["edi"]).optional(),
});

const _credentialKeys = new Set([
  "accessKeyId",
  "secretAccessKey",
  "sessionToken",
  "region",
]);

function _buildCredentials(g: Record<string, unknown>): AwsCredentials {
  return {
    accessKeyId: g.accessKeyId as string | undefined,
    secretAccessKey: g.secretAccessKey as string | undefined,
    sessionToken: g.sessionToken as string | undefined,
    region: g.region as string | undefined,
  };
}

/** Swamp extension model for B2BI Capability. Registered at `@swamp/aws/b2bi/capability`. */
export const model = {
  type: "@swamp/aws/b2bi/capability",
  version: "2026.06.15.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
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
      toVersion: "2026.06.06.1",
      description: "Added: accessKeyId, secretAccessKey, sessionToken, region",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "B2BI Capability resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a B2BI Capability",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::B2BI::Capability",
          desiredState,
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
      description: "Get a B2BI Capability",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the B2BI Capability",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::B2BI::Capability",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
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
      description: "Update a B2BI Capability",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
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
        const identifier = existing.CapabilityId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::B2BI::Capability",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::B2BI::Capability",
          identifier,
          currentState,
          desiredState,
          ["Type"],
          credentials,
        );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete a B2BI Capability",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the B2BI Capability",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::B2BI::Capability",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
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
      description: "Sync B2BI Capability state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
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
        const identifier = existing.CapabilityId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::B2BI::Capability",
            identifier,
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
              identifier,
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
