// Auto-generated extension model for @swamp/aws/kms/key
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for KMS Key (AWS::KMS::Key).
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

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that's 1 to 128 Unicode characters in length and can't be prefixed with aws:. digits, whitespace, _,.,:, /, =, +, @, -, and \". For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html).",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that's 1 to 256 characters in length. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -. For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html).",
  ),
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  Description: z.string().min(0).max(8192).describe(
    "A description of the KMS key. Use a description that helps you to distinguish this KMS key from others in the account, such as its intended use.",
  ).optional(),
  Enabled: z.boolean().describe(
    "Specifies whether the KMS key is enabled. Disabled KMS keys cannot be used in cryptographic operations. When Enabled is true, the *key state* of the KMS key is Enabled. When Enabled is false, the key state of the KMS key is Disabled. The default value is true. The actual key state of the KMS key might be affected by actions taken outside of CloudFormation, such as running the [EnableKey](https://docs.aws.amazon.com/kms/latest/APIReference/API_EnableKey.html), [DisableKey](https://docs.aws.amazon.com/kms/latest/APIReference/API_DisableKey.html), or [ScheduleKeyDeletion](https://docs.aws.amazon.com/kms/latest/APIReference/API_ScheduleKeyDeletion.html) operations. For information about the key states of a KMS key, see [Key state: Effect on your KMS key](https://docs.aws.amazon.com/kms/latest/developerguide/key-state.html) in the *Developer Guide*.",
  ).optional(),
  EnableKeyRotation: z.boolean().describe(
    "Enables automatic rotation of the key material for the specified KMS key. By default, automatic key rotation is not enabled. KMS supports automatic rotation only for symmetric encryption KMS keys ( KeySpec = SYMMETRIC_DEFAULT). For asymmetric KMS keys, HMAC KMS keys, and KMS keys with Origin EXTERNAL, omit the EnableKeyRotation property or set it to false. To enable automatic key rotation of the key material for a multi-Region KMS key, set EnableKeyRotation to true on the primary key (created by using AWS::KMS::Key). KMS copies the rotation status to all replica keys. For details, see [Rotating multi-Region keys](https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-manage.html#multi-region-rotate) in the *Developer Guide*. When you enable automatic rotation, KMS automatically creates new key material for the KMS key one year after the enable date and every year thereafter. KMS retains all key material until you delete the KMS key. For detailed information about automatic key rotation, see [Rotating KMS keys](https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html) in the *Developer Guide*.",
  ).optional(),
  KeyPolicy: z.record(z.string(), z.unknown()).describe(
    "The key policy to attach to the KMS key. If you provide a key policy, it must meet the following criteria: The key policy must allow the caller to make a subsequent [PutKeyPolicy](https://docs.aws.amazon.com/kms/latest/APIReference/API_PutKeyPolicy.html) request on the KMS key. This reduces the risk that the KMS key becomes unmanageable. For more information, see [Default key policy](https://docs.aws.amazon.com/kms/latest/developerguide/key-policies.html#key-policy-default-allow-root-enable-iam) in the *Developer Guide*. (To omit this condition, set BypassPolicyLockoutSafetyCheck to true.) Each statement in the key policy must contain one or more principals. The principals in the key policy must exist and be visible to KMS. When you create a new AWS principal (for example, an IAM user or role), you might need to enforce a delay before including the new principal in a key policy because the new principal might not be immediately visible to KMS. For more information, see [Changes that I make are not always immediately visible](https://docs.aws.amazon.com/IAM/latest/UserGuide/troubleshoot_general.html#troubleshoot_general_eventual-consistency) in the *User Guide*. If you do not provide a key policy, KMS attaches a default key policy to the KMS key. For more information, see [Default key policy](https://docs.aws.amazon.com/kms/latest/developerguide/key-policies.html#key-policy-default) in the *Developer Guide*. A key policy document can include only the following characters: Printable ASCII characters Printable characters in the Basic Latin and Latin-1 Supplement character set The tab ( \\u0009), line feed ( \\u000A), and carriage return ( \\u000D) special characters *Minimum*: 1 *Maximum*: 32768",
  ).optional(),
  KeyUsage: z.enum([
    "ENCRYPT_DECRYPT",
    "SIGN_VERIFY",
    "GENERATE_VERIFY_MAC",
    "KEY_AGREEMENT",
  ]).describe(
    "Determines the [cryptographic operations](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#cryptographic-operations) for which you can use the KMS key. The default value is ENCRYPT_DECRYPT. This property is required for asymmetric KMS keys and HMAC KMS keys. You can't change the KeyUsage value after the KMS key is created. If you change the value of the KeyUsage property on an existing KMS key, the update request fails, regardless of the value of the [UpdateReplacePolicy attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-updatereplacepolicy.html). This prevents you from accidentally deleting a KMS key by changing an immutable property value. Select only one valid value. For symmetric encryption KMS keys, omit the parameter or specify ENCRYPT_DECRYPT. For HMAC KMS keys (symmetric), specify GENERATE_VERIFY_MAC. For asymmetric KMS keys with RSA key pairs, specify ENCRYPT_DECRYPT or SIGN_VERIFY. For asymmetric KMS keys with NIST-recommended elliptic curve key pairs, specify SIGN_VERIFY or KEY_AGREEMENT. For asymmetric KMS keys with ECC_SECG_P256K1 key pairs, specify SIGN_VERIFY. For asymmetric KMS keys with ML-DSA key pairs, specify SIGN_VERIFY. For asymmetric KMS keys with SM2 key pairs (China Regions only), specify ENCRYPT_DECRYPT, SIGN_VERIFY, or KEY_AGREEMENT.",
  ).optional(),
  Origin: z.enum(["AWS_KMS", "EXTERNAL"]).describe(
    "The source of the key material for the KMS key. You cannot change the origin after you create the KMS key. The default is AWS_KMS, which means that KMS creates the key material. To [create a KMS key with no key material](https://docs.aws.amazon.com/kms/latest/developerguide/importing-keys-create-cmk.html) (for imported key material), set this value to EXTERNAL. For more information about importing key material into KMS, see [Importing Key Material](https://docs.aws.amazon.com/kms/latest/developerguide/importing-keys.html) in the *Developer Guide*. You can ignore ENABLED when Origin is EXTERNAL. When a KMS key with Origin EXTERNAL is created, the key state is PENDING_IMPORT and ENABLED is false. After you import the key material, ENABLED updated to true. The KMS key can then be used for Cryptographic Operations. CFN doesn't support creating an Origin parameter of the AWS_CLOUDHSM or EXTERNAL_KEY_STORE values. EXTERNAL is not supported for ML-DSA keys.",
  ).optional(),
  KeySpec: z.enum([
    "SYMMETRIC_DEFAULT",
    "RSA_2048",
    "RSA_3072",
    "RSA_4096",
    "ECC_NIST_P256",
    "ECC_NIST_P384",
    "ECC_NIST_P521",
    "ECC_SECG_P256K1",
    "HMAC_224",
    "HMAC_256",
    "HMAC_384",
    "HMAC_512",
    "SM2",
    "ML_DSA_44",
    "ML_DSA_65",
    "ML_DSA_87",
    "ECC_NIST_EDWARDS25519",
  ]).describe(
    "Specifies the type of KMS key to create. The default value, SYMMETRIC_DEFAULT, creates a KMS key with a 256-bit symmetric key for encryption and decryption. In China Regions, SYMMETRIC_DEFAULT creates a 128-bit symmetric key that uses SM4 encryption. You can't change the KeySpec value after the KMS key is created. For help choosing a key spec for your KMS key, see [Choosing a KMS key type](https://docs.aws.amazon.com/kms/latest/developerguide/symm-asymm-choose.html) in the *Developer Guide*. The KeySpec property determines the type of key material in the KMS key and the algorithms that the KMS key supports. To further restrict the algorithms that can be used with the KMS key, use a condition key in its key policy or IAM policy. For more information, see [condition keys](https://docs.aws.amazon.com/kms/latest/developerguide/policy-conditions.html#conditions-kms) in the *Developer Guide*. If you change the value of the KeySpec property on an existing KMS key, the update request fails, regardless of the value of the [UpdateReplacePolicy attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-updatereplacepolicy.html). This prevents you from accidentally deleting a KMS key by changing an immutable property value. [services that are integrated with](https://docs.aws.amazon.com/kms/features/#AWS_Service_Integration) use symmetric encryption KMS keys to protect your data. These services do not support encryption with asymmetric KMS keys. For help determining whether a KMS key is asymmetric, see [Identifying asymmetric KMS keys](https://docs.aws.amazon.com/kms/latest/developerguide/find-symm-asymm.html) in the *Developer Guide*. KMS supports the following key specs for KMS keys: Symmetric encryption key (default) SYMMETRIC_DEFAULT (AES-256-GCM) HMAC keys (symmetric) HMAC_224 HMAC_256 HMAC_384 HMAC_512 Asymmetric RSA key pairs (encryption and decryption *or* signing and verification) RSA_2048 RSA_3072 RSA_4096 Asymmetric NIST-recommended elliptic curve key pairs (signing and verification *or* deriving shared secrets) ECC_NIST_P256 (secp256r1) ECC_NIST_P384 (secp384r1) ECC_NIST_P521 (secp521r1) ECC_NIST_EDWARDS25519 (ed25519) - signing and verification only *Note:* For ECC_NIST_EDWARDS25519 KMS keys, the ED25519_SHA_512 signing algorithm requires [MessageType:RAW](https://docs.aws.amazon.com/kms/latest/APIReference/API_Sign.html#KMS-Sign-request-MessageType), while ED25519_PH_SHA_512 requires [MessageType:DIGEST](https://docs.aws.amazon.com/kms/latest/APIReference/API_Sign.html#KMS-Sign-request-MessageType). These message types cannot be used interchangeably. Other asymmetric elliptic curve key pairs (signing and verification) ECC_SECG_P256K1 (secp256k1), commonly used for cryptocurrencies. Asymmetric ML-DSA key pairs (signing and verification) ML_DSA_44 ML_DSA_65 ML_DSA_87 SM2 key pairs (encryption and decryption *or* signing and verification *or* deriving shared secrets) SM2 (China Regions only)",
  ).optional(),
  MultiRegion: z.boolean().describe(
    "Creates a multi-Region primary key that you can replicate in other AWS-Regions. You can't change the MultiRegion value after the KMS key is created. For a list of AWS-Regions in which multi-Region keys are supported, see [Multi-Region keys in](https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html) in the **. If you change the value of the MultiRegion property on an existing KMS key, the update request fails, regardless of the value of the [UpdateReplacePolicy attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-updatereplacepolicy.html). This prevents you from accidentally deleting a KMS key by changing an immutable property value. For a multi-Region key, set to this property to true. For a single-Region key, omit this property or set it to false. The default value is false. *Multi-Region keys* are an KMS feature that lets you create multiple interoperable KMS keys in different AWS-Regions. Because these KMS keys have the same key ID, key material, and other metadata, you can use them to encrypt data in one AWS-Region and decrypt it in a different AWS-Region without making a cross-Region call or exposing the plaintext data. For more information, see [Multi-Region keys](https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html) in the *Developer Guide*. You can create a symmetric encryption, HMAC, or asymmetric multi-Region KMS key, and you can create a multi-Region key with imported key material. However, you cannot create a multi-Region key in a custom key store. To create a replica of this primary key in a different AWS-Region, create an [AWS::KMS::ReplicaKey](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-replicakey.html) resource in a CloudFormation stack in the replica Region. Specify the key ARN of this primary key.",
  ).optional(),
  PendingWindowInDays: z.number().int().min(7).max(30).describe(
    "Specifies the number of days in the waiting period before KMS deletes a KMS key that has been removed from a CloudFormation stack. Enter a value between 7 and 30 days. The default value is 30 days. When you remove a KMS key from a CloudFormation stack, KMS schedules the KMS key for deletion and starts the mandatory waiting period. The PendingWindowInDays property determines the length of waiting period. During the waiting period, the key state of KMS key is Pending Deletion or Pending Replica Deletion, which prevents the KMS key from being used in cryptographic operations. When the waiting period expires, KMS permanently deletes the KMS key. KMS will not delete a [multi-Region primary key](https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html) that has replica keys. If you remove a multi-Region primary key from a CloudFormation stack, its key state changes to PendingReplicaDeletion so it cannot be replicated or used in cryptographic operations. This state can persist indefinitely. When the last of its replica keys is deleted, the key state of the primary key changes to PendingDeletion and the waiting period specified by PendingWindowInDays begins. When this waiting period expires, KMS deletes the primary key. For details, see [Deleting multi-Region keys](https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-delete.html) in the *Developer Guide*. You cannot use a CloudFormation template to cancel deletion of the KMS key after you remove it from the stack, regardless of the waiting period. If you specify a KMS key in your template, even one with the same name, CloudFormation creates a new KMS key. To cancel deletion of a KMS key, use the KMS console or the [CancelKeyDeletion](https://docs.aws.amazon.com/kms/latest/APIReference/API_CancelKeyDeletion.html) operation. For information about the Pending Deletion and Pending Replica Deletion key states, see [Key state: Effect on your KMS key](https://docs.aws.amazon.com/kms/latest/developerguide/key-state.html) in the *Developer Guide*. For more information about deleting KMS keys, see the [ScheduleKeyDeletion](https://docs.aws.amazon.com/kms/latest/APIReference/API_ScheduleKeyDeletion.html) operation in the *API Reference* and [Deleting KMS keys](https://docs.aws.amazon.com/kms/latest/developerguide/deleting-keys.html) in the *Developer Guide*.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Assigns one or more tags to the replica key. Tagging or untagging a KMS key can allow or deny permission to the KMS key. For details, see [ABAC for](https://docs.aws.amazon.com/kms/latest/developerguide/abac.html) in the *Developer Guide*. For information about tags in KMS, see [Tagging keys](https://docs.aws.amazon.com/kms/latest/developerguide/tagging-keys.html) in the *Developer Guide*. For information about tags in CloudFormation, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html).",
  ).optional(),
  BypassPolicyLockoutSafetyCheck: z.boolean().describe(
    'Skips ("bypasses") the key policy lockout safety check. The default value is false. Setting this value to true increases the risk that the KMS key becomes unmanageable. Do not set this value to true indiscriminately. For more information, see [Default key policy](https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-default.html#prevent-unmanageable-key) in the *Developer Guide*. Use this parameter only when you intend to prevent the principal that is making the request from making a subsequent [PutKeyPolicy](https://docs.aws.amazon.com/kms/latest/APIReference/API_PutKeyPolicy.html) request on the KMS key.',
  ).optional(),
  RotationPeriodInDays: z.number().int().min(90).max(2560).describe(
    "Specifies a custom period of time between each rotation date. If no value is specified, the default value is 365 days. The rotation period defines the number of days after you enable automatic key rotation that KMS will rotate your key material, and the number of days between each automatic rotation thereafter. You can use the [kms:RotationPeriodInDays](https://docs.aws.amazon.com/kms/latest/developerguide/conditions-kms.html#conditions-kms-rotation-period-in-days) condition key to further constrain the values that principals can specify in the RotationPeriodInDays parameter. For more information about rotating KMS keys and automatic rotation, see [Rotating keys](https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html) in the *Developer Guide*.",
  ).optional(),
});

const StateSchema = z.object({
  Description: z.string().optional(),
  Enabled: z.boolean().optional(),
  EnableKeyRotation: z.boolean().optional(),
  KeyPolicy: z.union([z.string(), z.record(z.string(), z.unknown())])
    .optional(),
  KeyUsage: z.string().optional(),
  Origin: z.string().optional(),
  KeySpec: z.string().optional(),
  MultiRegion: z.boolean().optional(),
  PendingWindowInDays: z.number().optional(),
  Tags: z.array(TagSchema).optional(),
  Arn: z.string().optional(),
  KeyId: z.string(),
  BypassPolicyLockoutSafetyCheck: z.boolean().optional(),
  RotationPeriodInDays: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Description: z.string().min(0).max(8192).describe(
    "A description of the KMS key. Use a description that helps you to distinguish this KMS key from others in the account, such as its intended use.",
  ).optional(),
  Enabled: z.boolean().describe(
    "Specifies whether the KMS key is enabled. Disabled KMS keys cannot be used in cryptographic operations. When Enabled is true, the *key state* of the KMS key is Enabled. When Enabled is false, the key state of the KMS key is Disabled. The default value is true. The actual key state of the KMS key might be affected by actions taken outside of CloudFormation, such as running the [EnableKey](https://docs.aws.amazon.com/kms/latest/APIReference/API_EnableKey.html), [DisableKey](https://docs.aws.amazon.com/kms/latest/APIReference/API_DisableKey.html), or [ScheduleKeyDeletion](https://docs.aws.amazon.com/kms/latest/APIReference/API_ScheduleKeyDeletion.html) operations. For information about the key states of a KMS key, see [Key state: Effect on your KMS key](https://docs.aws.amazon.com/kms/latest/developerguide/key-state.html) in the *Developer Guide*.",
  ).optional(),
  EnableKeyRotation: z.boolean().describe(
    "Enables automatic rotation of the key material for the specified KMS key. By default, automatic key rotation is not enabled. KMS supports automatic rotation only for symmetric encryption KMS keys ( KeySpec = SYMMETRIC_DEFAULT). For asymmetric KMS keys, HMAC KMS keys, and KMS keys with Origin EXTERNAL, omit the EnableKeyRotation property or set it to false. To enable automatic key rotation of the key material for a multi-Region KMS key, set EnableKeyRotation to true on the primary key (created by using AWS::KMS::Key). KMS copies the rotation status to all replica keys. For details, see [Rotating multi-Region keys](https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-manage.html#multi-region-rotate) in the *Developer Guide*. When you enable automatic rotation, KMS automatically creates new key material for the KMS key one year after the enable date and every year thereafter. KMS retains all key material until you delete the KMS key. For detailed information about automatic key rotation, see [Rotating KMS keys](https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html) in the *Developer Guide*.",
  ).optional(),
  KeyPolicy: z.record(z.string(), z.unknown()).describe(
    "The key policy to attach to the KMS key. If you provide a key policy, it must meet the following criteria: The key policy must allow the caller to make a subsequent [PutKeyPolicy](https://docs.aws.amazon.com/kms/latest/APIReference/API_PutKeyPolicy.html) request on the KMS key. This reduces the risk that the KMS key becomes unmanageable. For more information, see [Default key policy](https://docs.aws.amazon.com/kms/latest/developerguide/key-policies.html#key-policy-default-allow-root-enable-iam) in the *Developer Guide*. (To omit this condition, set BypassPolicyLockoutSafetyCheck to true.) Each statement in the key policy must contain one or more principals. The principals in the key policy must exist and be visible to KMS. When you create a new AWS principal (for example, an IAM user or role), you might need to enforce a delay before including the new principal in a key policy because the new principal might not be immediately visible to KMS. For more information, see [Changes that I make are not always immediately visible](https://docs.aws.amazon.com/IAM/latest/UserGuide/troubleshoot_general.html#troubleshoot_general_eventual-consistency) in the *User Guide*. If you do not provide a key policy, KMS attaches a default key policy to the KMS key. For more information, see [Default key policy](https://docs.aws.amazon.com/kms/latest/developerguide/key-policies.html#key-policy-default) in the *Developer Guide*. A key policy document can include only the following characters: Printable ASCII characters Printable characters in the Basic Latin and Latin-1 Supplement character set The tab ( \\u0009), line feed ( \\u000A), and carriage return ( \\u000D) special characters *Minimum*: 1 *Maximum*: 32768",
  ).optional(),
  KeyUsage: z.enum([
    "ENCRYPT_DECRYPT",
    "SIGN_VERIFY",
    "GENERATE_VERIFY_MAC",
    "KEY_AGREEMENT",
  ]).describe(
    "Determines the [cryptographic operations](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#cryptographic-operations) for which you can use the KMS key. The default value is ENCRYPT_DECRYPT. This property is required for asymmetric KMS keys and HMAC KMS keys. You can't change the KeyUsage value after the KMS key is created. If you change the value of the KeyUsage property on an existing KMS key, the update request fails, regardless of the value of the [UpdateReplacePolicy attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-updatereplacepolicy.html). This prevents you from accidentally deleting a KMS key by changing an immutable property value. Select only one valid value. For symmetric encryption KMS keys, omit the parameter or specify ENCRYPT_DECRYPT. For HMAC KMS keys (symmetric), specify GENERATE_VERIFY_MAC. For asymmetric KMS keys with RSA key pairs, specify ENCRYPT_DECRYPT or SIGN_VERIFY. For asymmetric KMS keys with NIST-recommended elliptic curve key pairs, specify SIGN_VERIFY or KEY_AGREEMENT. For asymmetric KMS keys with ECC_SECG_P256K1 key pairs, specify SIGN_VERIFY. For asymmetric KMS keys with ML-DSA key pairs, specify SIGN_VERIFY. For asymmetric KMS keys with SM2 key pairs (China Regions only), specify ENCRYPT_DECRYPT, SIGN_VERIFY, or KEY_AGREEMENT.",
  ).optional(),
  Origin: z.enum(["AWS_KMS", "EXTERNAL"]).describe(
    "The source of the key material for the KMS key. You cannot change the origin after you create the KMS key. The default is AWS_KMS, which means that KMS creates the key material. To [create a KMS key with no key material](https://docs.aws.amazon.com/kms/latest/developerguide/importing-keys-create-cmk.html) (for imported key material), set this value to EXTERNAL. For more information about importing key material into KMS, see [Importing Key Material](https://docs.aws.amazon.com/kms/latest/developerguide/importing-keys.html) in the *Developer Guide*. You can ignore ENABLED when Origin is EXTERNAL. When a KMS key with Origin EXTERNAL is created, the key state is PENDING_IMPORT and ENABLED is false. After you import the key material, ENABLED updated to true. The KMS key can then be used for Cryptographic Operations. CFN doesn't support creating an Origin parameter of the AWS_CLOUDHSM or EXTERNAL_KEY_STORE values. EXTERNAL is not supported for ML-DSA keys.",
  ).optional(),
  KeySpec: z.enum([
    "SYMMETRIC_DEFAULT",
    "RSA_2048",
    "RSA_3072",
    "RSA_4096",
    "ECC_NIST_P256",
    "ECC_NIST_P384",
    "ECC_NIST_P521",
    "ECC_SECG_P256K1",
    "HMAC_224",
    "HMAC_256",
    "HMAC_384",
    "HMAC_512",
    "SM2",
    "ML_DSA_44",
    "ML_DSA_65",
    "ML_DSA_87",
    "ECC_NIST_EDWARDS25519",
  ]).describe(
    "Specifies the type of KMS key to create. The default value, SYMMETRIC_DEFAULT, creates a KMS key with a 256-bit symmetric key for encryption and decryption. In China Regions, SYMMETRIC_DEFAULT creates a 128-bit symmetric key that uses SM4 encryption. You can't change the KeySpec value after the KMS key is created. For help choosing a key spec for your KMS key, see [Choosing a KMS key type](https://docs.aws.amazon.com/kms/latest/developerguide/symm-asymm-choose.html) in the *Developer Guide*. The KeySpec property determines the type of key material in the KMS key and the algorithms that the KMS key supports. To further restrict the algorithms that can be used with the KMS key, use a condition key in its key policy or IAM policy. For more information, see [condition keys](https://docs.aws.amazon.com/kms/latest/developerguide/policy-conditions.html#conditions-kms) in the *Developer Guide*. If you change the value of the KeySpec property on an existing KMS key, the update request fails, regardless of the value of the [UpdateReplacePolicy attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-updatereplacepolicy.html). This prevents you from accidentally deleting a KMS key by changing an immutable property value. [services that are integrated with](https://docs.aws.amazon.com/kms/features/#AWS_Service_Integration) use symmetric encryption KMS keys to protect your data. These services do not support encryption with asymmetric KMS keys. For help determining whether a KMS key is asymmetric, see [Identifying asymmetric KMS keys](https://docs.aws.amazon.com/kms/latest/developerguide/find-symm-asymm.html) in the *Developer Guide*. KMS supports the following key specs for KMS keys: Symmetric encryption key (default) SYMMETRIC_DEFAULT (AES-256-GCM) HMAC keys (symmetric) HMAC_224 HMAC_256 HMAC_384 HMAC_512 Asymmetric RSA key pairs (encryption and decryption *or* signing and verification) RSA_2048 RSA_3072 RSA_4096 Asymmetric NIST-recommended elliptic curve key pairs (signing and verification *or* deriving shared secrets) ECC_NIST_P256 (secp256r1) ECC_NIST_P384 (secp384r1) ECC_NIST_P521 (secp521r1) ECC_NIST_EDWARDS25519 (ed25519) - signing and verification only *Note:* For ECC_NIST_EDWARDS25519 KMS keys, the ED25519_SHA_512 signing algorithm requires [MessageType:RAW](https://docs.aws.amazon.com/kms/latest/APIReference/API_Sign.html#KMS-Sign-request-MessageType), while ED25519_PH_SHA_512 requires [MessageType:DIGEST](https://docs.aws.amazon.com/kms/latest/APIReference/API_Sign.html#KMS-Sign-request-MessageType). These message types cannot be used interchangeably. Other asymmetric elliptic curve key pairs (signing and verification) ECC_SECG_P256K1 (secp256k1), commonly used for cryptocurrencies. Asymmetric ML-DSA key pairs (signing and verification) ML_DSA_44 ML_DSA_65 ML_DSA_87 SM2 key pairs (encryption and decryption *or* signing and verification *or* deriving shared secrets) SM2 (China Regions only)",
  ).optional(),
  MultiRegion: z.boolean().describe(
    "Creates a multi-Region primary key that you can replicate in other AWS-Regions. You can't change the MultiRegion value after the KMS key is created. For a list of AWS-Regions in which multi-Region keys are supported, see [Multi-Region keys in](https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html) in the **. If you change the value of the MultiRegion property on an existing KMS key, the update request fails, regardless of the value of the [UpdateReplacePolicy attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-updatereplacepolicy.html). This prevents you from accidentally deleting a KMS key by changing an immutable property value. For a multi-Region key, set to this property to true. For a single-Region key, omit this property or set it to false. The default value is false. *Multi-Region keys* are an KMS feature that lets you create multiple interoperable KMS keys in different AWS-Regions. Because these KMS keys have the same key ID, key material, and other metadata, you can use them to encrypt data in one AWS-Region and decrypt it in a different AWS-Region without making a cross-Region call or exposing the plaintext data. For more information, see [Multi-Region keys](https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html) in the *Developer Guide*. You can create a symmetric encryption, HMAC, or asymmetric multi-Region KMS key, and you can create a multi-Region key with imported key material. However, you cannot create a multi-Region key in a custom key store. To create a replica of this primary key in a different AWS-Region, create an [AWS::KMS::ReplicaKey](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-replicakey.html) resource in a CloudFormation stack in the replica Region. Specify the key ARN of this primary key.",
  ).optional(),
  PendingWindowInDays: z.number().int().min(7).max(30).describe(
    "Specifies the number of days in the waiting period before KMS deletes a KMS key that has been removed from a CloudFormation stack. Enter a value between 7 and 30 days. The default value is 30 days. When you remove a KMS key from a CloudFormation stack, KMS schedules the KMS key for deletion and starts the mandatory waiting period. The PendingWindowInDays property determines the length of waiting period. During the waiting period, the key state of KMS key is Pending Deletion or Pending Replica Deletion, which prevents the KMS key from being used in cryptographic operations. When the waiting period expires, KMS permanently deletes the KMS key. KMS will not delete a [multi-Region primary key](https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html) that has replica keys. If you remove a multi-Region primary key from a CloudFormation stack, its key state changes to PendingReplicaDeletion so it cannot be replicated or used in cryptographic operations. This state can persist indefinitely. When the last of its replica keys is deleted, the key state of the primary key changes to PendingDeletion and the waiting period specified by PendingWindowInDays begins. When this waiting period expires, KMS deletes the primary key. For details, see [Deleting multi-Region keys](https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-delete.html) in the *Developer Guide*. You cannot use a CloudFormation template to cancel deletion of the KMS key after you remove it from the stack, regardless of the waiting period. If you specify a KMS key in your template, even one with the same name, CloudFormation creates a new KMS key. To cancel deletion of a KMS key, use the KMS console or the [CancelKeyDeletion](https://docs.aws.amazon.com/kms/latest/APIReference/API_CancelKeyDeletion.html) operation. For information about the Pending Deletion and Pending Replica Deletion key states, see [Key state: Effect on your KMS key](https://docs.aws.amazon.com/kms/latest/developerguide/key-state.html) in the *Developer Guide*. For more information about deleting KMS keys, see the [ScheduleKeyDeletion](https://docs.aws.amazon.com/kms/latest/APIReference/API_ScheduleKeyDeletion.html) operation in the *API Reference* and [Deleting KMS keys](https://docs.aws.amazon.com/kms/latest/developerguide/deleting-keys.html) in the *Developer Guide*.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Assigns one or more tags to the replica key. Tagging or untagging a KMS key can allow or deny permission to the KMS key. For details, see [ABAC for](https://docs.aws.amazon.com/kms/latest/developerguide/abac.html) in the *Developer Guide*. For information about tags in KMS, see [Tagging keys](https://docs.aws.amazon.com/kms/latest/developerguide/tagging-keys.html) in the *Developer Guide*. For information about tags in CloudFormation, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html).",
  ).optional(),
  BypassPolicyLockoutSafetyCheck: z.boolean().describe(
    'Skips ("bypasses") the key policy lockout safety check. The default value is false. Setting this value to true increases the risk that the KMS key becomes unmanageable. Do not set this value to true indiscriminately. For more information, see [Default key policy](https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-default.html#prevent-unmanageable-key) in the *Developer Guide*. Use this parameter only when you intend to prevent the principal that is making the request from making a subsequent [PutKeyPolicy](https://docs.aws.amazon.com/kms/latest/APIReference/API_PutKeyPolicy.html) request on the KMS key.',
  ).optional(),
  RotationPeriodInDays: z.number().int().min(90).max(2560).describe(
    "Specifies a custom period of time between each rotation date. If no value is specified, the default value is 365 days. The rotation period defines the number of days after you enable automatic key rotation that KMS will rotate your key material, and the number of days between each automatic rotation thereafter. You can use the [kms:RotationPeriodInDays](https://docs.aws.amazon.com/kms/latest/developerguide/conditions-kms.html#conditions-kms-rotation-period-in-days) condition key to further constrain the values that principals can specify in the RotationPeriodInDays parameter. For more information about rotating KMS keys and automatic rotation, see [Rotating keys](https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html) in the *Developer Guide*.",
  ).optional(),
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

/** Swamp extension model for KMS Key. Registered at `@swamp/aws/kms/key`. */
export const model = {
  type: "@swamp/aws/kms/key",
  version: "2026.06.06.1",
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
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.06.1",
      description: "Added: accessKeyId, secretAccessKey, sessionToken, region",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "KMS Key resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a KMS Key",
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
          "AWS::KMS::Key",
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
      description: "Get a KMS Key",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the KMS Key",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::KMS::Key",
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
      description: "Update a KMS Key",
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
        const identifier = existing.KeyId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::KMS::Key",
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
          "AWS::KMS::Key",
          identifier,
          currentState,
          desiredState,
          undefined,
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
      description: "Delete a KMS Key",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the KMS Key",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::KMS::Key",
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
      description: "Sync KMS Key state from AWS",
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
        const identifier = existing.KeyId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::KMS::Key",
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
