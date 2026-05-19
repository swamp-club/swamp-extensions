// Auto-generated extension model for @swamp/gcp/vmmigration/imageimports
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud VM Migration ImageImports.
 *
 * ImageImport describes the configuration of the image import to run.
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
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/imageImports/${shortName}`;
}

const BASE_URL = "https://vmmigration.googleapis.com/";

const GET_CONFIG = {
  "id": "vmmigration.projects.locations.imageImports.get",
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
  "id": "vmmigration.projects.locations.imageImports.create",
  "path": "v1/{+parent}/imageImports",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "imageImportId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "vmmigration.projects.locations.imageImports.delete",
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
    "requestId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  cloudStorageUri: z.string().describe(
    "Immutable. The path to the Cloud Storage file from which the image should be imported.",
  ).optional(),
  diskImageTargetDefaults: z.object({
    additionalLicenses: z.array(z.string()).describe(
      "Optional. Additional licenses to assign to the image. Format: https://www.googleapis.com/compute/v1/projects/PROJECT_ID/global/licenses/LICENSE_NAME Or https://www.googleapis.com/compute/beta/projects/PROJECT_ID/global/licenses/LICENSE_NAME",
    ).optional(),
    dataDiskImageImport: z.object({
      guestOsFeatures: z.array(z.string()).describe(
        "Optional. A list of guest OS features to apply to the imported image. These features are flags that are used by Compute Engine to enable certain capabilities for virtual machine instances that are created from the image. This field does not change the OS of the image; it only marks the image with the specified features. The user must ensure that the OS is compatible with the features. For a list of available features, see https://cloud.google.com/compute/docs/images/create-custom#guest-os-features.",
      ).optional(),
    }).describe(
      "Used when the image import is not using OS adaptation process.",
    ).optional(),
    description: z.string().describe(
      "Optional. An optional description of the image.",
    ).optional(),
    encryption: z.object({
      kmsKey: z.string().describe(
        "Required. The name of the encryption key that is stored in Google Cloud KMS.",
      ).optional(),
    }).describe(
      "Encryption message describes the details of the applied encryption.",
    ).optional(),
    familyName: z.string().describe(
      "Optional. The name of the image family to which the new image belongs.",
    ).optional(),
    imageName: z.string().describe(
      "Required. The name of the image to be created.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "Optional. A map of labels to associate with the image.",
    ).optional(),
    osAdaptationParameters: z.object({
      adaptationModifiers: z.array(z.object({
        modifier: z.string().describe("Optional. The modifier name.")
          .optional(),
        value: z.string().describe(
          "Optional. The value of the modifier. The actual value depends on the modifier and can also be empty.",
        ).optional(),
      })).describe(
        "Optional. Modifiers to be used as configuration of the OS adaptation process.",
      ).optional(),
      bootConversion: z.enum([
        "BOOT_CONVERSION_UNSPECIFIED",
        "NONE",
        "BIOS_TO_EFI",
      ]).describe(
        "Optional. By default the image will keep its existing boot option. Setting this property will trigger an internal process which will convert the image from using the existing boot option to another. The size of the boot disk might be increased to allow the conversion",
      ).optional(),
      generalize: z.boolean().describe(
        "Optional. Set to true in order to generalize the imported image. The generalization process enables co-existence of multiple VMs created from the same image. For Windows, generalizing the image removes computer-specific information such as installed drivers and the computer security identifier (SID).",
      ).optional(),
      licenseType: z.enum([
        "COMPUTE_ENGINE_LICENSE_TYPE_DEFAULT",
        "COMPUTE_ENGINE_LICENSE_TYPE_PAYG",
        "COMPUTE_ENGINE_LICENSE_TYPE_BYOL",
      ]).describe(
        "Optional. Choose which type of license to apply to the imported image.",
      ).optional(),
    }).describe("Parameters affecting the OS adaptation process.").optional(),
    singleRegionStorage: z.boolean().describe(
      "Optional. Set to true to set the image storageLocations to the single region of the import job. When false, the closest multi-region is selected.",
    ).optional(),
    targetProject: z.string().describe(
      "Required. Reference to the TargetProject resource that represents the target project in which the imported image will be created.",
    ).optional(),
  }).describe(
    "The target details of the image resource that will be created by the import job.",
  ).optional(),
  encryption: z.object({
    kmsKey: z.string().describe(
      "Required. The name of the encryption key that is stored in Google Cloud KMS.",
    ).optional(),
  }).describe(
    "Encryption message describes the details of the applied encryption.",
  ).optional(),
  machineImageTargetDefaults: z.object({
    additionalLicenses: z.array(z.string()).describe(
      "Optional. Additional licenses to assign to the instance created by the machine image. Format: https://www.googleapis.com/compute/v1/projects/PROJECT_ID/global/licenses/LICENSE_NAME Or https://www.googleapis.com/compute/beta/projects/PROJECT_ID/global/licenses/LICENSE_NAME",
    ).optional(),
    description: z.string().describe(
      "Optional. An optional description of the machine image.",
    ).optional(),
    encryption: z.object({
      kmsKey: z.string().describe(
        "Required. The name of the encryption key that is stored in Google Cloud KMS.",
      ).optional(),
    }).describe(
      "Encryption message describes the details of the applied encryption.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "Optional. The labels to apply to the instance created by the machine image.",
    ).optional(),
    machineImageName: z.string().describe(
      "Required. The name of the machine image to be created.",
    ).optional(),
    machineImageParametersOverrides: z.object({
      machineType: z.string().describe(
        "Optional. The machine type to create the MachineImage with. If empty, the service will choose a relevant machine type based on the information from the source image. For more information about machine types, please refer to https://cloud.google.com/compute/docs/machine-resource.",
      ).optional(),
    }).describe(
      "Parameters overriding decisions based on the source machine image configurations.",
    ).optional(),
    networkInterfaces: z.array(z.object({
      externalIp: z.string().describe(
        "Optional. The external IP to define in the NIC.",
      ).optional(),
      internalIp: z.string().describe(
        "Optional. The internal IP to define in the NIC. The formats accepted are: `ephemeral` \\ ipv4 address \\ a named address resource full path.",
      ).optional(),
      network: z.string().describe(
        "Optional. The network to connect the NIC to.",
      ).optional(),
      networkTier: z.enum([
        "COMPUTE_ENGINE_NETWORK_TIER_UNSPECIFIED",
        "NETWORK_TIER_STANDARD",
        "NETWORK_TIER_PREMIUM",
      ]).describe(
        "Optional. The networking tier used for optimizing connectivity between instances and systems on the internet. Applies only for external ephemeral IP addresses. If left empty, will default to PREMIUM.",
      ).optional(),
      subnetwork: z.string().describe(
        "Optional. The subnetwork to connect the NIC to.",
      ).optional(),
    })).describe(
      "Optional. The network interfaces to create with the instance created by the machine image. Internal and external IP addresses, and network tiers are ignored for machine image import.",
    ).optional(),
    osAdaptationParameters: z.object({
      adaptationModifiers: z.array(z.object({
        modifier: z.string().describe("Optional. The modifier name.")
          .optional(),
        value: z.string().describe(
          "Optional. The value of the modifier. The actual value depends on the modifier and can also be empty.",
        ).optional(),
      })).describe(
        "Optional. Modifiers to be used as configuration of the OS adaptation process.",
      ).optional(),
      bootConversion: z.enum([
        "BOOT_CONVERSION_UNSPECIFIED",
        "NONE",
        "BIOS_TO_EFI",
      ]).describe(
        "Optional. By default the image will keep its existing boot option. Setting this property will trigger an internal process which will convert the image from using the existing boot option to another. The size of the boot disk might be increased to allow the conversion",
      ).optional(),
      generalize: z.boolean().describe(
        "Optional. Set to true in order to generalize the imported image. The generalization process enables co-existence of multiple VMs created from the same image. For Windows, generalizing the image removes computer-specific information such as installed drivers and the computer security identifier (SID).",
      ).optional(),
      licenseType: z.enum([
        "COMPUTE_ENGINE_LICENSE_TYPE_DEFAULT",
        "COMPUTE_ENGINE_LICENSE_TYPE_PAYG",
        "COMPUTE_ENGINE_LICENSE_TYPE_BYOL",
      ]).describe(
        "Optional. Choose which type of license to apply to the imported image.",
      ).optional(),
    }).describe("Parameters affecting the OS adaptation process.").optional(),
    serviceAccount: z.object({
      email: z.string().describe(
        "Required. The email address of the service account.",
      ).optional(),
      scopes: z.array(z.string()).describe(
        "Optional. The list of scopes to be made available for this service account.",
      ).optional(),
    }).describe(
      "Service account to assign to the instance created by the machine image.",
    ).optional(),
    shieldedInstanceConfig: z.object({
      enableIntegrityMonitoring: z.boolean().describe(
        "Optional. Defines whether the instance created by the machine image has integrity monitoring enabled. This can be set to true only if the image boot option is EFI, and vTPM is enabled.",
      ).optional(),
      enableVtpm: z.boolean().describe(
        "Optional. Defines whether the instance created by the machine image has vTPM enabled. This can be set to true only if the image boot option is EFI.",
      ).optional(),
      secureBoot: z.enum(["SECURE_BOOT_UNSPECIFIED", "TRUE", "FALSE"]).describe(
        "Optional. Defines whether the instance created by the machine image has Secure Boot enabled. This can be set to true only if the image boot option is EFI.",
      ).optional(),
    }).describe("Shielded instance configuration.").optional(),
    singleRegionStorage: z.boolean().describe(
      "Optional. Set to true to set the machine image storageLocations to the single region of the import job. When false, the closest multi-region is selected.",
    ).optional(),
    skipOsAdaptation: z.object({}).describe(
      "Mentions that the machine image import is not using OS adaptation process.",
    ).optional(),
    tags: z.array(z.string()).describe(
      "Optional. The tags to apply to the instance created by the machine image.",
    ).optional(),
    targetProject: z.string().describe(
      "Required. Reference to the TargetProject resource that represents the target project in which the imported machine image will be created.",
    ).optional(),
  }).describe(
    "The target details of the machine image resource that will be created by the image import job.",
  ).optional(),
  imageImportId: z.string().describe(
    "Required. The image import identifier. This value maximum length is 63 characters, and valid characters are /a-z-/. It must start with an english letter and must not end with a hyphen.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  cloudStorageUri: z.string().optional(),
  createTime: z.string().optional(),
  diskImageTargetDefaults: z.object({
    additionalLicenses: z.array(z.string()),
    dataDiskImageImport: z.object({
      guestOsFeatures: z.array(z.string()),
    }),
    description: z.string(),
    encryption: z.object({
      kmsKey: z.string(),
    }),
    familyName: z.string(),
    imageName: z.string(),
    labels: z.record(z.string(), z.unknown()),
    osAdaptationParameters: z.object({
      adaptationModifiers: z.array(z.object({
        modifier: z.string(),
        value: z.string(),
      })),
      bootConversion: z.string(),
      generalize: z.boolean(),
      licenseType: z.string(),
    }),
    singleRegionStorage: z.boolean(),
    targetProject: z.string(),
  }).optional(),
  encryption: z.object({
    kmsKey: z.string(),
  }).optional(),
  machineImageTargetDefaults: z.object({
    additionalLicenses: z.array(z.string()),
    description: z.string(),
    encryption: z.object({
      kmsKey: z.string(),
    }),
    labels: z.record(z.string(), z.unknown()),
    machineImageName: z.string(),
    machineImageParametersOverrides: z.object({
      machineType: z.string(),
    }),
    networkInterfaces: z.array(z.object({
      externalIp: z.string(),
      internalIp: z.string(),
      network: z.string(),
      networkTier: z.string(),
      subnetwork: z.string(),
    })),
    osAdaptationParameters: z.object({
      adaptationModifiers: z.array(z.object({
        modifier: z.string(),
        value: z.string(),
      })),
      bootConversion: z.string(),
      generalize: z.boolean(),
      licenseType: z.string(),
    }),
    serviceAccount: z.object({
      email: z.string(),
      scopes: z.array(z.string()),
    }),
    shieldedInstanceConfig: z.object({
      enableIntegrityMonitoring: z.boolean(),
      enableVtpm: z.boolean(),
      secureBoot: z.string(),
    }),
    singleRegionStorage: z.boolean(),
    skipOsAdaptation: z.object({}),
    tags: z.array(z.string()),
    targetProject: z.string(),
  }).optional(),
  name: z.string(),
  recentImageImportJobs: z.array(z.object({
    cloudStorageUri: z.string(),
    createTime: z.string(),
    createdResources: z.array(z.string()),
    diskImageTargetDetails: z.object({
      additionalLicenses: z.array(z.string()),
      dataDiskImageImport: z.object({
        guestOsFeatures: z.array(z.unknown()),
      }),
      description: z.string(),
      encryption: z.object({
        kmsKey: z.string(),
      }),
      familyName: z.string(),
      imageName: z.string(),
      labels: z.record(z.string(), z.unknown()),
      osAdaptationParameters: z.object({
        adaptationModifiers: z.array(z.unknown()),
        bootConversion: z.string(),
        generalize: z.boolean(),
        licenseType: z.string(),
      }),
      singleRegionStorage: z.boolean(),
      targetProject: z.string(),
    }),
    endTime: z.string(),
    errors: z.array(z.object({
      code: z.number(),
      details: z.array(z.unknown()),
      message: z.string(),
    })),
    machineImageTargetDetails: z.object({
      additionalLicenses: z.array(z.string()),
      description: z.string(),
      encryption: z.object({
        kmsKey: z.string(),
      }),
      labels: z.record(z.string(), z.unknown()),
      machineImageName: z.string(),
      machineImageParametersOverrides: z.object({
        machineType: z.string(),
      }),
      networkInterfaces: z.array(z.object({
        externalIp: z.unknown(),
        internalIp: z.unknown(),
        network: z.unknown(),
        networkTier: z.unknown(),
        subnetwork: z.unknown(),
      })),
      osAdaptationParameters: z.object({
        adaptationModifiers: z.array(z.unknown()),
        bootConversion: z.string(),
        generalize: z.boolean(),
        licenseType: z.string(),
      }),
      serviceAccount: z.object({
        email: z.string(),
        scopes: z.array(z.unknown()),
      }),
      shieldedInstanceConfig: z.object({
        enableIntegrityMonitoring: z.boolean(),
        enableVtpm: z.boolean(),
        secureBoot: z.string(),
      }),
      singleRegionStorage: z.boolean(),
      skipOsAdaptation: z.object({}),
      tags: z.array(z.string()),
      targetProject: z.string(),
    }),
    name: z.string(),
    state: z.string(),
    steps: z.array(z.object({
      adaptingOs: z.object({}),
      creatingImage: z.object({}),
      endTime: z.string(),
      initializing: z.object({}),
      loadingSourceFiles: z.object({}),
      startTime: z.string(),
    })),
    warnings: z.array(z.object({
      actionItem: z.object({
        locale: z.unknown(),
        message: z.unknown(),
      }),
      code: z.string(),
      helpLinks: z.array(z.unknown()),
      warningMessage: z.object({
        locale: z.unknown(),
        message: z.unknown(),
      }),
      warningTime: z.string(),
    })),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  cloudStorageUri: z.string().describe(
    "Immutable. The path to the Cloud Storage file from which the image should be imported.",
  ).optional(),
  diskImageTargetDefaults: z.object({
    additionalLicenses: z.array(z.string()).describe(
      "Optional. Additional licenses to assign to the image. Format: https://www.googleapis.com/compute/v1/projects/PROJECT_ID/global/licenses/LICENSE_NAME Or https://www.googleapis.com/compute/beta/projects/PROJECT_ID/global/licenses/LICENSE_NAME",
    ).optional(),
    dataDiskImageImport: z.object({
      guestOsFeatures: z.array(z.string()).describe(
        "Optional. A list of guest OS features to apply to the imported image. These features are flags that are used by Compute Engine to enable certain capabilities for virtual machine instances that are created from the image. This field does not change the OS of the image; it only marks the image with the specified features. The user must ensure that the OS is compatible with the features. For a list of available features, see https://cloud.google.com/compute/docs/images/create-custom#guest-os-features.",
      ).optional(),
    }).describe(
      "Used when the image import is not using OS adaptation process.",
    ).optional(),
    description: z.string().describe(
      "Optional. An optional description of the image.",
    ).optional(),
    encryption: z.object({
      kmsKey: z.string().describe(
        "Required. The name of the encryption key that is stored in Google Cloud KMS.",
      ).optional(),
    }).describe(
      "Encryption message describes the details of the applied encryption.",
    ).optional(),
    familyName: z.string().describe(
      "Optional. The name of the image family to which the new image belongs.",
    ).optional(),
    imageName: z.string().describe(
      "Required. The name of the image to be created.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "Optional. A map of labels to associate with the image.",
    ).optional(),
    osAdaptationParameters: z.object({
      adaptationModifiers: z.array(z.object({
        modifier: z.string().describe("Optional. The modifier name.")
          .optional(),
        value: z.string().describe(
          "Optional. The value of the modifier. The actual value depends on the modifier and can also be empty.",
        ).optional(),
      })).describe(
        "Optional. Modifiers to be used as configuration of the OS adaptation process.",
      ).optional(),
      bootConversion: z.enum([
        "BOOT_CONVERSION_UNSPECIFIED",
        "NONE",
        "BIOS_TO_EFI",
      ]).describe(
        "Optional. By default the image will keep its existing boot option. Setting this property will trigger an internal process which will convert the image from using the existing boot option to another. The size of the boot disk might be increased to allow the conversion",
      ).optional(),
      generalize: z.boolean().describe(
        "Optional. Set to true in order to generalize the imported image. The generalization process enables co-existence of multiple VMs created from the same image. For Windows, generalizing the image removes computer-specific information such as installed drivers and the computer security identifier (SID).",
      ).optional(),
      licenseType: z.enum([
        "COMPUTE_ENGINE_LICENSE_TYPE_DEFAULT",
        "COMPUTE_ENGINE_LICENSE_TYPE_PAYG",
        "COMPUTE_ENGINE_LICENSE_TYPE_BYOL",
      ]).describe(
        "Optional. Choose which type of license to apply to the imported image.",
      ).optional(),
    }).describe("Parameters affecting the OS adaptation process.").optional(),
    singleRegionStorage: z.boolean().describe(
      "Optional. Set to true to set the image storageLocations to the single region of the import job. When false, the closest multi-region is selected.",
    ).optional(),
    targetProject: z.string().describe(
      "Required. Reference to the TargetProject resource that represents the target project in which the imported image will be created.",
    ).optional(),
  }).describe(
    "The target details of the image resource that will be created by the import job.",
  ).optional(),
  encryption: z.object({
    kmsKey: z.string().describe(
      "Required. The name of the encryption key that is stored in Google Cloud KMS.",
    ).optional(),
  }).describe(
    "Encryption message describes the details of the applied encryption.",
  ).optional(),
  machineImageTargetDefaults: z.object({
    additionalLicenses: z.array(z.string()).describe(
      "Optional. Additional licenses to assign to the instance created by the machine image. Format: https://www.googleapis.com/compute/v1/projects/PROJECT_ID/global/licenses/LICENSE_NAME Or https://www.googleapis.com/compute/beta/projects/PROJECT_ID/global/licenses/LICENSE_NAME",
    ).optional(),
    description: z.string().describe(
      "Optional. An optional description of the machine image.",
    ).optional(),
    encryption: z.object({
      kmsKey: z.string().describe(
        "Required. The name of the encryption key that is stored in Google Cloud KMS.",
      ).optional(),
    }).describe(
      "Encryption message describes the details of the applied encryption.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "Optional. The labels to apply to the instance created by the machine image.",
    ).optional(),
    machineImageName: z.string().describe(
      "Required. The name of the machine image to be created.",
    ).optional(),
    machineImageParametersOverrides: z.object({
      machineType: z.string().describe(
        "Optional. The machine type to create the MachineImage with. If empty, the service will choose a relevant machine type based on the information from the source image. For more information about machine types, please refer to https://cloud.google.com/compute/docs/machine-resource.",
      ).optional(),
    }).describe(
      "Parameters overriding decisions based on the source machine image configurations.",
    ).optional(),
    networkInterfaces: z.array(z.object({
      externalIp: z.string().describe(
        "Optional. The external IP to define in the NIC.",
      ).optional(),
      internalIp: z.string().describe(
        "Optional. The internal IP to define in the NIC. The formats accepted are: `ephemeral` \\ ipv4 address \\ a named address resource full path.",
      ).optional(),
      network: z.string().describe(
        "Optional. The network to connect the NIC to.",
      ).optional(),
      networkTier: z.enum([
        "COMPUTE_ENGINE_NETWORK_TIER_UNSPECIFIED",
        "NETWORK_TIER_STANDARD",
        "NETWORK_TIER_PREMIUM",
      ]).describe(
        "Optional. The networking tier used for optimizing connectivity between instances and systems on the internet. Applies only for external ephemeral IP addresses. If left empty, will default to PREMIUM.",
      ).optional(),
      subnetwork: z.string().describe(
        "Optional. The subnetwork to connect the NIC to.",
      ).optional(),
    })).describe(
      "Optional. The network interfaces to create with the instance created by the machine image. Internal and external IP addresses, and network tiers are ignored for machine image import.",
    ).optional(),
    osAdaptationParameters: z.object({
      adaptationModifiers: z.array(z.object({
        modifier: z.string().describe("Optional. The modifier name.")
          .optional(),
        value: z.string().describe(
          "Optional. The value of the modifier. The actual value depends on the modifier and can also be empty.",
        ).optional(),
      })).describe(
        "Optional. Modifiers to be used as configuration of the OS adaptation process.",
      ).optional(),
      bootConversion: z.enum([
        "BOOT_CONVERSION_UNSPECIFIED",
        "NONE",
        "BIOS_TO_EFI",
      ]).describe(
        "Optional. By default the image will keep its existing boot option. Setting this property will trigger an internal process which will convert the image from using the existing boot option to another. The size of the boot disk might be increased to allow the conversion",
      ).optional(),
      generalize: z.boolean().describe(
        "Optional. Set to true in order to generalize the imported image. The generalization process enables co-existence of multiple VMs created from the same image. For Windows, generalizing the image removes computer-specific information such as installed drivers and the computer security identifier (SID).",
      ).optional(),
      licenseType: z.enum([
        "COMPUTE_ENGINE_LICENSE_TYPE_DEFAULT",
        "COMPUTE_ENGINE_LICENSE_TYPE_PAYG",
        "COMPUTE_ENGINE_LICENSE_TYPE_BYOL",
      ]).describe(
        "Optional. Choose which type of license to apply to the imported image.",
      ).optional(),
    }).describe("Parameters affecting the OS adaptation process.").optional(),
    serviceAccount: z.object({
      email: z.string().describe(
        "Required. The email address of the service account.",
      ).optional(),
      scopes: z.array(z.string()).describe(
        "Optional. The list of scopes to be made available for this service account.",
      ).optional(),
    }).describe(
      "Service account to assign to the instance created by the machine image.",
    ).optional(),
    shieldedInstanceConfig: z.object({
      enableIntegrityMonitoring: z.boolean().describe(
        "Optional. Defines whether the instance created by the machine image has integrity monitoring enabled. This can be set to true only if the image boot option is EFI, and vTPM is enabled.",
      ).optional(),
      enableVtpm: z.boolean().describe(
        "Optional. Defines whether the instance created by the machine image has vTPM enabled. This can be set to true only if the image boot option is EFI.",
      ).optional(),
      secureBoot: z.enum(["SECURE_BOOT_UNSPECIFIED", "TRUE", "FALSE"]).describe(
        "Optional. Defines whether the instance created by the machine image has Secure Boot enabled. This can be set to true only if the image boot option is EFI.",
      ).optional(),
    }).describe("Shielded instance configuration.").optional(),
    singleRegionStorage: z.boolean().describe(
      "Optional. Set to true to set the machine image storageLocations to the single region of the import job. When false, the closest multi-region is selected.",
    ).optional(),
    skipOsAdaptation: z.object({}).describe(
      "Mentions that the machine image import is not using OS adaptation process.",
    ).optional(),
    tags: z.array(z.string()).describe(
      "Optional. The tags to apply to the instance created by the machine image.",
    ).optional(),
    targetProject: z.string().describe(
      "Required. Reference to the TargetProject resource that represents the target project in which the imported machine image will be created.",
    ).optional(),
  }).describe(
    "The target details of the machine image resource that will be created by the image import job.",
  ).optional(),
  imageImportId: z.string().describe(
    "Required. The image import identifier. This value maximum length is 63 characters, and valid characters are /a-z-/. It must start with an english letter and must not end with a hyphen.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud VM Migration ImageImports. Registered at `@swamp/gcp/vmmigration/imageimports`. */
export const model = {
  type: "@swamp/gcp/vmmigration/imageimports",
  version: "2026.05.19.1",
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
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "ImageImport describes the configuration of the image import to run.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a imageImports",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["cloudStorageUri"] !== undefined) {
          body["cloudStorageUri"] = g["cloudStorageUri"];
        }
        if (g["diskImageTargetDefaults"] !== undefined) {
          body["diskImageTargetDefaults"] = g["diskImageTargetDefaults"];
        }
        if (g["encryption"] !== undefined) body["encryption"] = g["encryption"];
        if (g["machineImageTargetDefaults"] !== undefined) {
          body["machineImageTargetDefaults"] = g["machineImageTargetDefaults"];
        }
        if (g["imageImportId"] !== undefined) {
          body["imageImportId"] = g["imageImportId"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
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
      description: "Get a imageImports",
      arguments: z.object({
        identifier: z.string().describe("The name of the imageImports"),
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
    delete: {
      description: "Delete the imageImports",
      arguments: z.object({
        identifier: z.string().describe("The name of the imageImports"),
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
      description: "Sync imageImports state from GCP",
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
  },
};
