// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/aws/dlm/lifecycle-policy
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for DLM LifecyclePolicy (AWS::DLM::LifecyclePolicy).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const TagSchema = z.object({
  Value: z.string().describe("The tag value."),
  Key: z.string().describe("The tag key."),
});

const CrossRegionCopyTargetSchema = z.object({
  TargetRegion: z.string().describe(
    "The target Region, for example `us-east-1`.",
  ).optional(),
});

const ShareRuleSchema = z.object({
  TargetAccounts: z.array(z.string()).describe(
    "The IDs of the AWS accounts with which to share the snapshots.",
  ).optional(),
  UnshareIntervalUnit: z.string().describe(
    "The unit of time for the automatic unsharing interval.",
  ).optional(),
  UnshareInterval: z.number().int().describe(
    "The period after which snapshots that are shared with other AWS accounts are automatically unshared.",
  ).optional(),
});

const DeprecateRuleSchema = z.object({
  IntervalUnit: z.string().describe(
    "The unit of time in which to measure the **Interval**.",
  ).optional(),
  Count: z.number().int().describe(
    "If the schedule has a count-based retention rule, this parameter specifies the number of oldest AMIs to deprecate. The count must be less than or equal to the schedule's retention count, and it can't be greater than 1000.",
  ).optional(),
  Interval: z.number().int().describe(
    "If the schedule has an age-based retention rule, this parameter specifies the period after which to deprecate AMIs created by the schedule. The period must be less than or equal to the schedule's retention period, and it can't be greater than 10 years. This is equivalent to 120 months, 520 weeks, or 3650 days.",
  ).optional(),
});

const ScriptSchema = z.object({
  ExecutionHandlerService: z.string().describe(
    "Indicates the service used to execute the pre and/or post scripts. Default: `AWS_SYSTEMS_MANAGER`",
  ).optional(),
  ExecutionTimeout: z.number().int().describe(
    "Specifies a timeout period, in seconds, after which Amazon Data Lifecycle Manager fails the script run attempt if it has not completed. If a script does not complete within its timeout period, Amazon Data Lifecycle Manager fails the attempt. The timeout period applies to the pre and post scripts individually. Default: 10",
  ).optional(),
  Stages: z.array(z.string()).describe(
    "Indicate which scripts Amazon Data Lifecycle Manager should run on target instances. Pre scripts run before Amazon Data Lifecycle Manager initiates snapshot creation. Post scripts run after Amazon Data Lifecycle Manager initiates snapshot creation. - To run a pre script only, specify `PRE`. - To run a post script only, specify `POST`. - To run both pre and post scripts, specify both `PRE` and `POST`. Default: PRE and POST",
  ).optional(),
  ExecutionHandler: z.string().describe(
    "The SSM document that includes the pre and/or post scripts to run. If you are automating VSS backups, specify `AWS_VSS_BACKUP`. In this case, Amazon Data Lifecycle Manager automatically uses the `AWSEC2-CreateVssSnapshot` SSM document. If you are using a custom SSM document that you own, specify either the name or ARN of the SSM document. If you are using a custom SSM document that is shared with you, specify the ARN of the SSM document.",
  ).optional(),
  MaximumRetryCount: z.number().int().describe(
    "Specifies the number of times Amazon Data Lifecycle Manager should retry scripts that fail. If the pre script fails, Amazon Data Lifecycle Manager retries the entire snapshot creation process, including running the pre and post scripts. If the post script fails, Amazon Data Lifecycle Manager retries the post script only; in this case, the pre script will have completed and the snapshot might have been created. If you do not want Amazon Data Lifecycle Manager to retry failed scripts, specify `0`. Default: 0",
  ).optional(),
  ExecuteOperationOnScriptFailure: z.boolean().describe(
    "Indicates whether Amazon Data Lifecycle Manager should default to crash-consistent snapshots if the pre script fails. - To default to crash consistent snapshot if the pre script fails, specify `true`. - To skip the instance for snapshot creation if the pre script fails, specify `false`. This parameter is supported only if you run a pre script. If you run a post script only, omit this parameter. Default: `true`",
  ).optional(),
});

const CreateRuleSchema = z.object({
  IntervalUnit: z.string().describe("The interval unit.").optional(),
  Scripts: z.array(ScriptSchema).describe(
    "**[Custom snapshot policies that target instances only]** Specifies pre and/or post scripts for a snapshot lifecycle policy that targets instances. This is useful for creating application-consistent snapshots, or for performing specific administrative tasks before or after Amazon Data Lifecycle Manager initiates snapshot creation.",
  ).optional(),
  Times: z.array(z.string()).describe(
    "The time, in UTC, to start the operation. The supported format is hh:mm. The operation occurs within a one-hour window following the specified time. If you do not specify a time, Amazon Data Lifecycle Manager selects a time within the next 24 hours.",
  ).optional(),
  CronExpression: z.string().describe(
    "The schedule, as a Cron expression. The schedule interval must be between 1 hour and 1 year.",
  ).optional(),
  Interval: z.number().int().describe(
    "The interval between snapshots. The supported values are 1, 2, 3, 4, 6, 8, 12, and 24.",
  ).optional(),
  Location: z.string().describe(
    "**[Custom snapshot policies only]** Specifies the destination for snapshots created by the policy. The allowed destinations depend on the location of the targeted resources. - If the policy targets resources in a Region, then you must create snapshots in the same Region as the source resource. - If the policy targets resources in a Local Zone, you can create snapshots in the same Local Zone or in its parent Region. - If the policy targets resources on an Outpost, then you can create snapshots on the same Outpost or in its parent Region. Default: `CLOUD`",
  ).optional(),
});

const FastRestoreRuleSchema = z.object({
  IntervalUnit: z.string().describe(
    "The unit of time for enabling fast snapshot restore.",
  ).optional(),
  Count: z.number().int().describe(
    "The number of snapshots to be enabled with fast snapshot restore.",
  ).optional(),
  AvailabilityZones: z.array(z.string()).describe(
    "The Availability Zones in which to enable fast snapshot restore.",
  ).optional(),
  AvailabilityZoneIds: z.array(z.string()).describe(
    "The Availability Zone IDs in which to enable fast snapshot restore.",
  ).optional(),
  Interval: z.number().int().describe(
    "The amount of time to enable fast snapshot restore. The maximum is 100 years. This is equivalent to 1200 months, 5200 weeks, or 36500 days.",
  ).optional(),
});

const RetentionArchiveTierSchema = z.object({
  IntervalUnit: z.string().describe(
    "The unit of time in which to measure the **Interval**. For example, to retain snapshots in the archive tier for 6 months, specify `Interval=6` and `IntervalUnit=MONTHS`.",
  ).optional(),
  Count: z.number().int().describe(
    "The maximum number of snapshots to retain in the archive storage tier for each volume. The count must ensure that each snapshot remains in the archive tier for at least 90 days.",
  ).optional(),
  Interval: z.number().int().describe(
    "Specifies the period of time to retain snapshots in the archive tier. After this period expires, the snapshot is permanently deleted.",
  ).optional(),
});

const ArchiveRetainRuleSchema = z.object({
  RetentionArchiveTier: RetentionArchiveTierSchema.describe(
    "Information about retention period in the Amazon EBS Snapshots Archive.",
  ),
});

const ArchiveRuleSchema = z.object({
  RetainRule: ArchiveRetainRuleSchema.describe(
    "Information about the retention period for the snapshot archiving rule.",
  ),
});

const RetainRuleSchema = z.object({
  IntervalUnit: z.string().describe(
    "The unit of time for time-based retention. For example, to retain snapshots for 3 months, specify `Interval=3` and `IntervalUnit=MONTHS`. Once the snapshot has been retained for 3 months, it is deleted, or it is moved to the archive tier if you have specified an `ArchiveRule`.",
  ).optional(),
  Count: z.number().int().describe(
    "The number of snapshots to retain for each volume, up to a maximum of 1000. For example if you want to retain a maximum of three snapshots, specify `3`. When the fourth snapshot is created, the oldest retained snapshot is deleted, or it is moved to the archive tier if you have specified an `ArchiveRule`.",
  ).optional(),
  Interval: z.number().int().describe(
    "The amount of time to retain each snapshot. The maximum is 100 years. This is equivalent to 1200 months, 5200 weeks, or 36500 days.",
  ).optional(),
});

const CrossRegionCopyDeprecateRuleSchema = z.object({
  IntervalUnit: z.string().describe(
    "The unit of time in which to measure the **Interval**. For example, to deprecate a cross-Region AMI copy after 3 months, specify `Interval=3` and `IntervalUnit=MONTHS`.",
  ),
  Interval: z.number().int().describe(
    "The period after which to deprecate the cross-Region AMI copies. The period must be less than or equal to the cross-Region AMI copy retention period, and it can't be greater than 10 years. This is equivalent to 120 months, 520 weeks, or 3650 days.",
  ),
});

const CrossRegionCopyRetainRuleSchema = z.object({
  IntervalUnit: z.string().describe(
    "The unit of time for time-based retention. For example, to retain a cross-Region copy for 3 months, specify `Interval=3` and `IntervalUnit=MONTHS`.",
  ),
  Interval: z.number().int().describe(
    "The amount of time to retain a cross-Region snapshot or AMI copy. The maximum is 100 years. This is equivalent to 1200 months, 5200 weeks, or 36500 days.",
  ),
});

const CrossRegionCopyRuleSchema = z.object({
  TargetRegion: z.string().describe(
    "**[Custom AMI policies only]** The target Region or the Amazon Resource Name (ARN) of the target Outpost for the AMI copies.",
  ).optional(),
  Target: z.string().describe(
    "**[Custom snapshot policies only]** The target Region or the Amazon Resource Name (ARN) of the target Outpost for the snapshot copies.",
  ).optional(),
  DeprecateRule: CrossRegionCopyDeprecateRuleSchema.describe(
    "**[Custom AMI policies only]** The AMI deprecation rule for cross-Region AMI copies created by the rule.",
  ).optional(),
  Encrypted: z.boolean().describe(
    "To encrypt a copy of an unencrypted snapshot if encryption by default is not enabled, enable encryption using this parameter. Copies of encrypted snapshots are encrypted, even if this parameter is `false` or if encryption by default is not enabled.",
  ),
  CmkArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the AWS KMS key to use for EBS encryption. If this parameter is not specified, the default KMS key for the account is used.",
  ).optional(),
  RetainRule: CrossRegionCopyRetainRuleSchema.describe(
    "The retention rule that indicates how long the cross-Region snapshot or AMI copies are to be retained in the destination Region.",
  ).optional(),
  CopyTags: z.boolean().describe(
    "Indicates whether to copy all user-defined tags from the source snapshot or AMI to the cross-Region copy.",
  ).optional(),
});

const ScheduleSchema = z.object({
  ShareRules: z.array(ShareRuleSchema).describe(
    "**[Custom snapshot policies only]** The rule for sharing snapshots with other AWS accounts.",
  ).optional(),
  DeprecateRule: DeprecateRuleSchema.describe(
    "**[Custom AMI policies only]** The AMI deprecation rule for the schedule.",
  ).optional(),
  TagsToAdd: z.array(TagSchema).describe(
    "The tags to apply to policy-created resources. These user-defined tags are in addition to the AWS-added lifecycle tags.",
  ).optional(),
  CreateRule: CreateRuleSchema.describe("The creation rule.").optional(),
  VariableTags: z.array(TagSchema).describe(
    "**[AMI policies and snapshot policies that target instances only]** A collection of key/value pairs with values determined dynamically when the policy is executed. Keys may be any valid Amazon EC2 tag key. Values must be in one of the two following formats: `$(instance-id)` or `$(timestamp)`. Variable tags are only valid for EBS Snapshot Management -- Instance policies.",
  ).optional(),
  FastRestoreRule: FastRestoreRuleSchema.describe(
    "**[Custom snapshot policies only]** The rule for enabling fast snapshot restore.",
  ).optional(),
  ArchiveRule: ArchiveRuleSchema.describe(
    "**[Custom snapshot policies that target volumes only]** The snapshot archiving rule for the schedule. When you specify an archiving rule, snapshots are automatically moved from the standard tier to the archive tier once the schedule's retention threshold is met. Snapshots are then retained in the archive tier for the archive retention period that you specify.",
  ).optional(),
  RetainRule: RetainRuleSchema.describe(
    "The retention rule for snapshots or AMIs created by the policy.",
  ).optional(),
  CrossRegionCopyRules: z.array(CrossRegionCopyRuleSchema).describe(
    "Specifies a rule for copying snapshots or AMIs across Regions.",
  ).optional(),
  Name: z.string().describe("The name of the schedule.").optional(),
  CopyTags: z.boolean().describe(
    "Copy all user-defined tags on a source volume to snapshots of the volume created by this policy.",
  ).optional(),
});

const ParametersSchema = z.object({
  ExcludeBootVolume: z.boolean().describe(
    "**[Custom snapshot policies that target instances only]** Indicates whether to exclude the root volume from multi-volume snapshot sets. The default is `false`. If you specify `true`, then the root volumes attached to targeted instances will be excluded from the multi-volume snapshot sets created by the policy.",
  ).optional(),
  NoReboot: z.boolean().describe(
    "**[Custom AMI policies only]** Indicates whether targeted instances are rebooted when the lifecycle policy runs. `true` indicates that targeted instances are not rebooted when the policy runs. `false` indicates that target instances are rebooted when the policy runs. The default is `true` (instances are not rebooted).",
  ).optional(),
  ExcludeDataVolumeTags: z.array(TagSchema).describe(
    "**[Custom snapshot policies that target instances only]** The tags used to identify data (non-root) volumes to exclude from multi-volume snapshot sets. If you create a snapshot lifecycle policy that targets instances and you specify tags for this parameter, then data volumes with the specified tags that are attached to targeted instances will be excluded from the multi-volume snapshot sets created by the policy.",
  ).optional(),
});

const ExclusionsSchema = z.object({
  ExcludeTags: z.array(TagSchema).describe(
    "**[Default policies for EBS-backed AMIs only]** Specifies whether to exclude volumes that have specific tags.",
  ).optional(),
  ExcludeVolumeTypes: z.array(z.string()).describe(
    "**[Default policies for EBS snapshots only]** Specifies the volume types to exclude. Volumes of the specified types will not be targeted by the policy.",
  ).optional(),
  ExcludeBootVolumes: z.boolean().describe(
    "**[Default policies for EBS snapshots only]** Indicates whether to exclude volumes that are attached to instances as the boot volume. If you exclude boot volumes, only volumes attached as data (non-boot) volumes will be backed up by the policy. To exclude boot volumes, specify `true`.",
  ).optional(),
});

const EncryptionConfigurationSchema = z.object({
  Encrypted: z.boolean().describe(
    "To encrypt a copy of an unencrypted snapshot when encryption by default is not enabled, enable encryption using this parameter. Copies of encrypted snapshots are encrypted, even if this parameter is `false` or when encryption by default is not enabled.",
  ),
  CmkArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the AWS KMS key to use for EBS encryption. If this parameter is not specified, the default KMS key for the account is used.",
  ).optional(),
});

const CrossRegionCopyActionSchema = z.object({
  Target: z.string().describe("The target Region."),
  EncryptionConfiguration: EncryptionConfigurationSchema.describe(
    "The encryption settings for the copied snapshot.",
  ),
  RetainRule: CrossRegionCopyRetainRuleSchema.describe(
    "The retention rule that indicates how long the cross-Region snapshot or AMI copies are to be retained in the destination Region.",
  ).optional(),
});

const ActionSchema = z.object({
  CrossRegionCopy: z.array(CrossRegionCopyActionSchema).describe(
    "The rule for copying shared snapshots across Regions.",
  ),
  Name: z.string().describe("A descriptive name for the action."),
});

const EventParametersSchema = z.object({
  DescriptionRegex: z.string().describe(
    "The snapshot description that can trigger the policy. The description pattern is specified using a regular expression. The policy runs only if a snapshot with a description that matches the specified pattern is shared with your account.",
  ).optional(),
  EventType: z.string().describe(
    "The type of event. Currently, only snapshot sharing events are supported.",
  ),
  SnapshotOwner: z.array(z.string()).describe(
    "The IDs of the AWS accounts that can trigger policy by sharing snapshots with your account. The policy only runs if one of the specified AWS accounts shares a snapshot with your account.",
  ),
});

const EventSourceSchema = z.object({
  Type: z.string().describe(
    "The source of the event. Currently only managed Amazon EventBridge events are supported.",
  ),
  Parameters: EventParametersSchema.describe("Information about the event.")
    .optional(),
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
  CreateInterval: z.number().int().describe(
    "**[Default policies only]** Specifies how often the policy should run and create snapshots or AMIs. The creation frequency can range from 1 to 7 days.",
  ).optional(),
  Description: z.string().describe(
    "A description of the lifecycle policy. The characters ^[0-9A-Za-z _-]+$ are supported.",
  ).optional(),
  ExtendDeletion: z.boolean().describe(
    "**[Default policies only]** Defines the snapshot or AMI retention behavior for the policy if the source volume or instance is deleted, or if the policy enters the error, disabled, or deleted state.",
  ).optional(),
  Exclusions: z.object({
    ExcludeTags: z.array(TagSchema).describe(
      "**[Default policies for EBS-backed AMIs only]** Specifies whether to exclude volumes that have specific tags.",
    ).optional(),
    ExcludeVolumeTypes: z.array(z.string()).describe(
      "**[Default policies for EBS snapshots only]** Specifies the volume types to exclude. Volumes of the specified types will not be targeted by the policy.",
    ).optional(),
    ExcludeBootVolumes: z.boolean().describe(
      "**[Default policies for EBS snapshots only]** Indicates whether to exclude volumes that are attached to instances as the boot volume. If you exclude boot volumes, only volumes attached as data (non-boot) volumes will be backed up by the policy. To exclude boot volumes, specify `true`.",
    ).optional(),
  }).describe(
    "**[Default policies only]** Specifies exclusion parameters for volumes or instances for which you do not want to create snapshots or AMIs. The policy will not create snapshots or AMIs for target resources that match any of the specified exclusion parameters.",
  ).optional(),
  RetainInterval: z.number().int().describe(
    "**[Default policies only]** Specifies how long the policy should retain snapshots or AMIs before deleting them. The retention period can range from 2 to 14 days, but it must be greater than the creation frequency to ensure that the policy retains at least 1 snapshot or AMI at any given time.",
  ).optional(),
  ExecutionRoleArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the IAM role used to run the operations specified by the lifecycle policy.",
  ).optional(),
  DefaultPolicy: z.string().describe(
    "**[Default policies only]** Specify the type of default policy to create.",
  ).optional(),
  State: z.string().describe("The activation state of the lifecycle policy.")
    .optional(),
  CrossRegionCopyTargets: z.array(CrossRegionCopyTargetSchema).describe(
    "**[Default policies only]** Specifies destination Regions for snapshot or AMI copies. You can specify up to 3 destination Regions. If you do not want to create cross-Region copies, omit this parameter.",
  ).optional(),
  PolicyDetails: z.object({
    PolicyLanguage: z.string().describe(
      "The type of policy to create. Specify one of the following: - `SIMPLIFIED` -- To create a default policy. - `STANDARD` -- To create a custom policy.",
    ).optional(),
    ResourceTypes: z.array(z.string()).describe(
      "**[Custom snapshot policies only]** The target resource type for snapshot and AMI lifecycle policies. Use `VOLUME` to create snapshots of individual volumes or use `INSTANCE` to create multi-volume snapshots from the volumes for an instance.",
    ).optional(),
    Schedules: z.array(ScheduleSchema).describe(
      "**[Custom snapshot and AMI policies only]** The schedules of policy-defined actions for snapshot and AMI lifecycle policies. A policy can have up to four schedules -- one mandatory schedule and up to three optional schedules.",
    ).optional(),
    PolicyType: z.string().describe(
      "The type of policy. Specify `EBS_SNAPSHOT_MANAGEMENT` to create a lifecycle policy that manages the lifecycle of Amazon EBS snapshots. Specify `IMAGE_MANAGEMENT` to create a lifecycle policy that manages the lifecycle of EBS-backed AMIs. Specify `EVENT_BASED_POLICY` to create an event-based policy that performs specific actions when a defined event occurs in your AWS account. The default is `EBS_SNAPSHOT_MANAGEMENT`.",
    ).optional(),
    CreateInterval: z.number().int().describe(
      "**[Default policies only]** Specifies how often the policy should run and create snapshots or AMIs. The creation frequency can range from 1 to 7 days. If you do not specify a value, the default is 1. Default: 1",
    ).optional(),
    Parameters: ParametersSchema.describe(
      "**[Custom snapshot and AMI policies only]** A set of optional parameters for snapshot and AMI lifecycle policies.",
    ).optional(),
    ExtendDeletion: z.boolean().describe(
      "**[Default policies only]** Defines the snapshot or AMI retention behavior for the policy if the source volume or instance is deleted, or if the policy enters the error, disabled, or deleted state. Default: `false`",
    ).optional(),
    Exclusions: ExclusionsSchema.describe(
      "**[Default policies only]** Specifies exclusion parameters for volumes or instances for which you do not want to create snapshots or AMIs. The policy will not create snapshots or AMIs for target resources that match any of the specified exclusion parameters.",
    ).optional(),
    Actions: z.array(ActionSchema).describe(
      "**[Event-based policies only]** The actions to be performed when the event-based policy is activated. You can specify only one action per policy.",
    ).optional(),
    ResourceType: z.string().describe(
      "**[Default policies only]** Specify the type of default policy to create. - To create a default policy for EBS snapshots, that creates snapshots of all volumes in the Region that do not have recent backups, specify `VOLUME`. - To create a default policy for EBS-backed AMIs, that creates EBS-backed AMIs from all instances in the Region that do not have recent backups, specify `INSTANCE`.",
    ).optional(),
    RetainInterval: z.number().int().describe(
      "**[Default policies only]** Specifies how long the policy should retain snapshots or AMIs before deleting them. The retention period can range from 2 to 14 days, but it must be greater than the creation frequency to ensure that the policy retains at least 1 snapshot or AMI at any given time. If you do not specify a value, the default is 7. Default: 7",
    ).optional(),
    EventSource: EventSourceSchema.describe(
      "**[Event-based policies only]** The event that activates the event-based policy.",
    ).optional(),
    CrossRegionCopyTargets: z.array(CrossRegionCopyTargetSchema).describe(
      "**[Default policies only]** Specifies destination Regions for snapshot or AMI copies. You can specify up to 3 destination Regions. If you do not want to create cross-Region copies, omit this parameter.",
    ).optional(),
    TargetTags: z.array(TagSchema).describe(
      "**[Custom snapshot and AMI policies only]** The single tag that identifies targeted resources for this policy.",
    ).optional(),
    ResourceLocations: z.array(z.string()).describe(
      "**[Custom snapshot and AMI policies only]** The location of the resources to backup. If the source resources are located in a Region, specify `CLOUD`.",
    ).optional(),
    CopyTags: z.boolean().describe(
      "**[Default policies only]** Indicates whether the policy should copy tags from the source resource to the snapshot or AMI. If you do not specify a value, the default is `false`. Default: `false`",
    ).optional(),
  }).describe("The configuration details of the lifecycle policy.").optional(),
  Tags: z.array(TagSchema).describe(
    "The tags to apply to the lifecycle policy during creation.",
  ).optional(),
  CopyTags: z.boolean().describe(
    "**[Default policies only]** Indicates whether the policy should copy tags from the source resource to the snapshot or AMI. If you do not specify a value, the default is false.",
  ).optional(),
});

const StateSchema = z.object({
  CreateInterval: z.number().optional(),
  Description: z.string().optional(),
  ExtendDeletion: z.boolean().optional(),
  Exclusions: ExclusionsSchema.optional(),
  RetainInterval: z.number().optional(),
  ExecutionRoleArn: z.string().optional(),
  DefaultPolicy: z.string().optional(),
  State: z.string().optional(),
  CrossRegionCopyTargets: z.array(CrossRegionCopyTargetSchema).optional(),
  PolicyDetails: z.object({
    PolicyLanguage: z.string(),
    ResourceTypes: z.array(z.string()),
    Schedules: z.array(ScheduleSchema),
    PolicyType: z.string(),
    CreateInterval: z.number(),
    Parameters: ParametersSchema,
    ExtendDeletion: z.boolean(),
    Exclusions: ExclusionsSchema,
    Actions: z.array(ActionSchema),
    ResourceType: z.string(),
    RetainInterval: z.number(),
    EventSource: EventSourceSchema,
    CrossRegionCopyTargets: z.array(CrossRegionCopyTargetSchema),
    TargetTags: z.array(TagSchema),
    ResourceLocations: z.array(z.string()),
    CopyTags: z.boolean(),
  }).optional(),
  PolicyId: z.string(),
  Arn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  CopyTags: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  CreateInterval: z.number().int().describe(
    "**[Default policies only]** Specifies how often the policy should run and create snapshots or AMIs. The creation frequency can range from 1 to 7 days.",
  ).optional(),
  Description: z.string().describe(
    "A description of the lifecycle policy. The characters ^[0-9A-Za-z _-]+$ are supported.",
  ).optional(),
  ExtendDeletion: z.boolean().describe(
    "**[Default policies only]** Defines the snapshot or AMI retention behavior for the policy if the source volume or instance is deleted, or if the policy enters the error, disabled, or deleted state.",
  ).optional(),
  Exclusions: z.object({
    ExcludeTags: z.array(TagSchema).describe(
      "**[Default policies for EBS-backed AMIs only]** Specifies whether to exclude volumes that have specific tags.",
    ).optional(),
    ExcludeVolumeTypes: z.array(z.string()).describe(
      "**[Default policies for EBS snapshots only]** Specifies the volume types to exclude. Volumes of the specified types will not be targeted by the policy.",
    ).optional(),
    ExcludeBootVolumes: z.boolean().describe(
      "**[Default policies for EBS snapshots only]** Indicates whether to exclude volumes that are attached to instances as the boot volume. If you exclude boot volumes, only volumes attached as data (non-boot) volumes will be backed up by the policy. To exclude boot volumes, specify `true`.",
    ).optional(),
  }).describe(
    "**[Default policies only]** Specifies exclusion parameters for volumes or instances for which you do not want to create snapshots or AMIs. The policy will not create snapshots or AMIs for target resources that match any of the specified exclusion parameters.",
  ).optional(),
  RetainInterval: z.number().int().describe(
    "**[Default policies only]** Specifies how long the policy should retain snapshots or AMIs before deleting them. The retention period can range from 2 to 14 days, but it must be greater than the creation frequency to ensure that the policy retains at least 1 snapshot or AMI at any given time.",
  ).optional(),
  ExecutionRoleArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the IAM role used to run the operations specified by the lifecycle policy.",
  ).optional(),
  DefaultPolicy: z.string().describe(
    "**[Default policies only]** Specify the type of default policy to create.",
  ).optional(),
  State: z.string().describe("The activation state of the lifecycle policy.")
    .optional(),
  CrossRegionCopyTargets: z.array(CrossRegionCopyTargetSchema).describe(
    "**[Default policies only]** Specifies destination Regions for snapshot or AMI copies. You can specify up to 3 destination Regions. If you do not want to create cross-Region copies, omit this parameter.",
  ).optional(),
  PolicyDetails: z.object({
    PolicyLanguage: z.string().describe(
      "The type of policy to create. Specify one of the following: - `SIMPLIFIED` -- To create a default policy. - `STANDARD` -- To create a custom policy.",
    ).optional(),
    ResourceTypes: z.array(z.string()).describe(
      "**[Custom snapshot policies only]** The target resource type for snapshot and AMI lifecycle policies. Use `VOLUME` to create snapshots of individual volumes or use `INSTANCE` to create multi-volume snapshots from the volumes for an instance.",
    ).optional(),
    Schedules: z.array(ScheduleSchema).describe(
      "**[Custom snapshot and AMI policies only]** The schedules of policy-defined actions for snapshot and AMI lifecycle policies. A policy can have up to four schedules -- one mandatory schedule and up to three optional schedules.",
    ).optional(),
    PolicyType: z.string().describe(
      "The type of policy. Specify `EBS_SNAPSHOT_MANAGEMENT` to create a lifecycle policy that manages the lifecycle of Amazon EBS snapshots. Specify `IMAGE_MANAGEMENT` to create a lifecycle policy that manages the lifecycle of EBS-backed AMIs. Specify `EVENT_BASED_POLICY` to create an event-based policy that performs specific actions when a defined event occurs in your AWS account. The default is `EBS_SNAPSHOT_MANAGEMENT`.",
    ).optional(),
    CreateInterval: z.number().int().describe(
      "**[Default policies only]** Specifies how often the policy should run and create snapshots or AMIs. The creation frequency can range from 1 to 7 days. If you do not specify a value, the default is 1. Default: 1",
    ).optional(),
    Parameters: ParametersSchema.describe(
      "**[Custom snapshot and AMI policies only]** A set of optional parameters for snapshot and AMI lifecycle policies.",
    ).optional(),
    ExtendDeletion: z.boolean().describe(
      "**[Default policies only]** Defines the snapshot or AMI retention behavior for the policy if the source volume or instance is deleted, or if the policy enters the error, disabled, or deleted state. Default: `false`",
    ).optional(),
    Exclusions: ExclusionsSchema.describe(
      "**[Default policies only]** Specifies exclusion parameters for volumes or instances for which you do not want to create snapshots or AMIs. The policy will not create snapshots or AMIs for target resources that match any of the specified exclusion parameters.",
    ).optional(),
    Actions: z.array(ActionSchema).describe(
      "**[Event-based policies only]** The actions to be performed when the event-based policy is activated. You can specify only one action per policy.",
    ).optional(),
    ResourceType: z.string().describe(
      "**[Default policies only]** Specify the type of default policy to create. - To create a default policy for EBS snapshots, that creates snapshots of all volumes in the Region that do not have recent backups, specify `VOLUME`. - To create a default policy for EBS-backed AMIs, that creates EBS-backed AMIs from all instances in the Region that do not have recent backups, specify `INSTANCE`.",
    ).optional(),
    RetainInterval: z.number().int().describe(
      "**[Default policies only]** Specifies how long the policy should retain snapshots or AMIs before deleting them. The retention period can range from 2 to 14 days, but it must be greater than the creation frequency to ensure that the policy retains at least 1 snapshot or AMI at any given time. If you do not specify a value, the default is 7. Default: 7",
    ).optional(),
    EventSource: EventSourceSchema.describe(
      "**[Event-based policies only]** The event that activates the event-based policy.",
    ).optional(),
    CrossRegionCopyTargets: z.array(CrossRegionCopyTargetSchema).describe(
      "**[Default policies only]** Specifies destination Regions for snapshot or AMI copies. You can specify up to 3 destination Regions. If you do not want to create cross-Region copies, omit this parameter.",
    ).optional(),
    TargetTags: z.array(TagSchema).describe(
      "**[Custom snapshot and AMI policies only]** The single tag that identifies targeted resources for this policy.",
    ).optional(),
    ResourceLocations: z.array(z.string()).describe(
      "**[Custom snapshot and AMI policies only]** The location of the resources to backup. If the source resources are located in a Region, specify `CLOUD`.",
    ).optional(),
    CopyTags: z.boolean().describe(
      "**[Default policies only]** Indicates whether the policy should copy tags from the source resource to the snapshot or AMI. If you do not specify a value, the default is `false`. Default: `false`",
    ).optional(),
  }).describe("The configuration details of the lifecycle policy.").optional(),
  Tags: z.array(TagSchema).describe(
    "The tags to apply to the lifecycle policy during creation.",
  ).optional(),
  CopyTags: z.boolean().describe(
    "**[Default policies only]** Indicates whether the policy should copy tags from the source resource to the snapshot or AMI. If you do not specify a value, the default is false.",
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

/** Swamp extension model for DLM LifecyclePolicy. Registered at `@swamp/aws/dlm/lifecycle-policy`. */
export const model = {
  type: "@swamp/aws/dlm/lifecycle-policy",
  version: "2026.10.23.1",
  upgrades: [
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "DLM LifecyclePolicy resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a DLM LifecyclePolicy",
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
          "AWS::DLM::LifecyclePolicy",
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
      description: "Get a DLM LifecyclePolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DLM LifecyclePolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::DLM::LifecyclePolicy",
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
      description: "Update a DLM LifecyclePolicy",
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
        const identifier = existing.PolicyId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::DLM::LifecyclePolicy",
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
          "AWS::DLM::LifecyclePolicy",
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
      description: "Delete a DLM LifecyclePolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DLM LifecyclePolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::DLM::LifecyclePolicy",
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
      description: "Sync DLM LifecyclePolicy state from AWS",
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
        const identifier = existing.PolicyId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::DLM::LifecyclePolicy",
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
    list: {
      description: "List DLM LifecyclePolicy resources",
      arguments: z.object({
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
        resourceModel: z.string().describe(
          "JSON resource model for parent-scoped listing (e.g. parent identifier)",
        ).optional(),
      }),
      execute: async (
        args: { maxPages?: number; resourceModel?: string },
        context: any,
      ) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { items, nextToken } = await listResources(
          "AWS::DLM::LifecyclePolicy",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName =
            (item.properties?.PolicyId?.toString() ?? item.identifier).replace(
              /[\/\\]/g,
              "_",
            ).replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource("state", instanceName, {
            ...item.properties,
            _identifier: item.identifier,
          });
          dataHandles.push(handle);
        }
        return {
          dataHandles,
          result: { count: items.length, nextPageToken: nextToken },
        };
      },
    },
  },
};
