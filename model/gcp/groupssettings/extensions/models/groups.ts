// Auto-generated extension model for @swamp/gcp/groupssettings/groups
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Groups Settings Groups.
 *
 * JSON template for Group resource
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
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://www.googleapis.com/groups/v1/groups/";

const GET_CONFIG = {
  "id": "groupsSettings.groups.get",
  "path": "{groupUniqueId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "groupUniqueId",
  ],
  "parameters": {
    "groupUniqueId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "groupsSettings.groups.update",
  "path": "{groupUniqueId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "groupUniqueId",
  ],
  "parameters": {
    "groupUniqueId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  allowExternalMembers: z.string().describe(
    "Identifies whether members external to your organization can join the group. Possible values are: - true: G Suite users external to your organization can become members of this group. - false: Users not belonging to the organization are not allowed to become members of this group.",
  ).optional(),
  allowGoogleCommunication: z.string().describe(
    "Deprecated. Allows Google to contact administrator of the group. - true: Allow Google to contact managers of this group. Occasionally Google may send updates on the latest features, ask for input on new features, or ask for permission to highlight your group. - false: Google can not contact managers of this group.",
  ).optional(),
  allowWebPosting: z.string().describe(
    "Allows posting from web. Possible values are: - true: Allows any member to post to the group forum. - false: Members only use Gmail to communicate with the group.",
  ).optional(),
  archiveOnly: z.string().describe(
    "Allows the group to be archived only. Possible values are: - true: Group is archived and the group is inactive. New messages to this group are rejected. The older archived messages are browseable and searchable. - If true, the whoCanPostMessage property is set to NONE_CAN_POST. - If reverted from true to false, whoCanPostMessages is set to ALL_MANAGERS_CAN_POST. - false: The group is active and can receive messages. - When false, updating whoCanPostMessage to NONE_CAN_POST, results in an error.",
  ).optional(),
  customFooterText: z.string().describe(
    "Set the content of custom footer text. The maximum number of characters is 1,000.",
  ).optional(),
  customReplyTo: z.string().describe(
    "An email address used when replying to a message if the replyTo property is set to REPLY_TO_CUSTOM. This address is defined by an account administrator. - When the group's ReplyTo property is set to REPLY_TO_CUSTOM, the customReplyTo property holds a custom email address used when replying to a message. - If the group's ReplyTo property is set to REPLY_TO_CUSTOM, the customReplyTo property must have a text value or an error is returned.",
  ).optional(),
  customRolesEnabledForSettingsToBeMerged: z.string().describe(
    "Specifies whether the group has a custom role that's included in one of the settings being merged. This field is read-only and update/patch requests to it are ignored. Possible values are: - true - false",
  ).optional(),
  defaultMessageDenyNotificationText: z.string().describe(
    "When a message is rejected, this is text for the rejection notification sent to the message's author. By default, this property is empty and has no value in the API's response body. The maximum notification text size is 10,000 characters. Note: Requires sendMessageDenyNotification property to be true.",
  ).optional(),
  default_sender: z.string().describe(
    "Default sender for members who can post messages as the group. Possible values are: - `DEFAULT_SELF`: By default messages will be sent from the user - `GROUP`: By default messages will be sent from the group",
  ).optional(),
  description: z.string().describe(
    "Description of the group. This property value may be an empty string if no group description has been entered. If entered, the maximum group description is no more than 300 characters.",
  ).optional(),
  email: z.string().describe(
    "The group's email address. This property can be updated using the Directory API. Note: Only a group owner can change a group's email address. A group manager can't do this. When you change your group's address using the Directory API or the control panel, you are changing the address your subscribers use to send email and the web address people use to access your group. People can't reach your group by visiting the old address.",
  ).optional(),
  enableCollaborativeInbox: z.string().describe(
    "Specifies whether a collaborative inbox will remain turned on for the group. Possible values are: - true - false",
  ).optional(),
  favoriteRepliesOnTop: z.string().describe(
    "Indicates if favorite replies should be displayed above other replies. - true: Favorite replies will be displayed above other replies. - false: Favorite replies will not be displayed above other replies.",
  ).optional(),
  includeCustomFooter: z.string().describe(
    "Whether to include custom footer. Possible values are: - true - false",
  ).optional(),
  includeInGlobalAddressList: z.string().describe(
    "Enables the group to be included in the Global Address List. For more information, see the help center. Possible values are: - true: Group is included in the Global Address List. - false: Group is not included in the Global Address List.",
  ).optional(),
  isArchived: z.string().describe(
    "Allows the Group contents to be archived. Possible values are: - true: Archive messages sent to the group. - false: Do not keep an archive of messages sent to this group. If false, previously archived messages remain in the archive.",
  ).optional(),
  kind: z.string().describe(
    "The type of the resource. It is always groupsSettings#groups.",
  ).optional(),
  maxMessageBytes: z.number().int().describe(
    "Deprecated. The maximum size of a message is 25Mb.",
  ).optional(),
  membersCanPostAsTheGroup: z.string().describe(
    "Enables members to post messages as the group. Possible values are: - true: Group member can post messages using the group's email address instead of their own email address. Message appear to originate from the group itself. Note: When true, any message moderation settings on individual users or new members do not apply to posts made on behalf of the group. - false: Members can not post in behalf of the group's email address.",
  ).optional(),
  messageDisplayFont: z.string().describe(
    'Deprecated. The default message display font always has a value of "DEFAULT_FONT".',
  ).optional(),
  messageModerationLevel: z.string().describe(
    "Moderation level of incoming messages. Possible values are: - MODERATE_ALL_MESSAGES: All messages are sent to the group owner's email address for approval. If approved, the message is sent to the group. - MODERATE_NON_MEMBERS: All messages from non group members are sent to the group owner's email address for approval. If approved, the message is sent to the group. - MODERATE_NEW_MEMBERS: All messages from new members are sent to the group owner's email address for approval. If approved, the message is sent to the group. - MODERATE_NONE: No moderator approval is required. Messages are delivered directly to the group. Note: When the whoCanPostMessage is set to ANYONE_CAN_POST, we recommend the messageModerationLevel be set to MODERATE_NON_MEMBERS to protect the group from possible spam. When memberCanPostAsTheGroup is true, any message moderation settings on individual users or new members will not apply to posts made on behalf of the group.",
  ).optional(),
  name: z.string().describe(
    "Name of the group, which has a maximum size of 75 characters.",
  ).optional(),
  primaryLanguage: z.string().describe(
    "The primary language for group. For a group's primary language use the language tags from the G Suite languages found at G Suite Email Settings API Email Language Tags.",
  ).optional(),
  replyTo: z.string().describe(
    "Specifies who receives the default reply. Possible values are: - REPLY_TO_CUSTOM: For replies to messages, use the group's custom email address. When the group's ReplyTo property is set to REPLY_TO_CUSTOM, the customReplyTo property holds the custom email address used when replying to a message. If the group's ReplyTo property is set to REPLY_TO_CUSTOM, the customReplyTo property must have a value. Otherwise an error is returned. - REPLY_TO_SENDER: The reply sent to author of message. - REPLY_TO_LIST: This reply message is sent to the group. - REPLY_TO_OWNER: The reply is sent to the owner(s) of the group. This does not include the group's managers. - REPLY_TO_IGNORE: Group users individually decide where the message reply is sent. - REPLY_TO_MANAGERS: This reply message is sent to the group's managers, which includes all managers and the group owner.",
  ).optional(),
  sendMessageDenyNotification: z.string().describe(
    "Allows a member to be notified if the member's message to the group is denied by the group owner. Possible values are: - true: When a message is rejected, send the deny message notification to the message author. The defaultMessageDenyNotificationText property is dependent on the sendMessageDenyNotification property being true. - false: When a message is rejected, no notification is sent.",
  ).optional(),
  showInGroupDirectory: z.string().describe(
    "Deprecated. This is merged into the new whoCanDiscoverGroup setting. Allows the group to be visible in the Groups Directory. Possible values are: - true: All groups in the account are listed in the Groups directory. - false: All groups in the account are not listed in the directory.",
  ).optional(),
  spamModerationLevel: z.string().describe(
    "Specifies moderation levels for messages detected as spam. Possible values are: - ALLOW: Post the message to the group. - MODERATE: Send the message to the moderation queue. This is the default. - SILENTLY_MODERATE: Send the message to the moderation queue, but do not send notification to moderators. - REJECT: Immediately reject the message.",
  ).optional(),
  whoCanAdd: z.string().describe(
    "Deprecated. This is merged into the new whoCanModerateMembers setting. Permissions to add members. Possible values are: - ALL_MEMBERS_CAN_ADD: Managers and members can directly add new members. - ALL_MANAGERS_CAN_ADD: Only managers can directly add new members. this includes the group's owner. - ALL_OWNERS_CAN_ADD: Only owners can directly add new members. - NONE_CAN_ADD: No one can directly add new members.",
  ).optional(),
  whoCanAddExternalMembers: z.string().describe(
    "Specifies who can add external members. UPDATE and PATCH requests ignore this field if allowExternalMembers is false. Possible values are: - ONLY_ADMINS_CAN_ADD_EXTERNAL_MEMBERS - END_USERS_CAN_ADD_EXTERNAL_MEMBERS",
  ).optional(),
  whoCanAddReferences: z.string().describe(
    'Deprecated. This functionality is no longer supported in the Google Groups UI. The value is always "NONE".',
  ).optional(),
  whoCanApproveMembers: z.string().describe(
    "Specifies who can approve members who ask to join groups. This permission will be deprecated once it is merged into the new whoCanModerateMembers setting. Possible values are: - ALL_MEMBERS_CAN_APPROVE - ALL_MANAGERS_CAN_APPROVE - ALL_OWNERS_CAN_APPROVE - NONE_CAN_APPROVE",
  ).optional(),
  whoCanApproveMessages: z.string().describe(
    "Deprecated. This is merged into the new whoCanModerateContent setting. Specifies who can approve pending messages in the moderation queue. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanAssignTopics: z.string().describe(
    "Deprecated. This is merged into the new whoCanAssistContent setting. Permission to assign topics in a forum to another user. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - MANAGERS_ONLY - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanAssistContent: z.string().describe(
    "Specifies who can moderate metadata. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - MANAGERS_ONLY - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanBanUsers: z.string().describe(
    "Specifies who can deny membership to users. This permission will be deprecated once it is merged into the new whoCanModerateMembers setting. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanContactOwner: z.string().describe(
    "Permission to contact owner of the group via web UI. Possible values are: - ALL_IN_DOMAIN_CAN_CONTACT - ALL_MANAGERS_CAN_CONTACT - ALL_MEMBERS_CAN_CONTACT - ANYONE_CAN_CONTACT - ALL_OWNERS_CAN_CONTACT",
  ).optional(),
  whoCanDeleteAnyPost: z.string().describe(
    "Deprecated. This is merged into the new whoCanModerateContent setting. Specifies who can delete replies to topics. (Authors can always delete their own posts). Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanDeleteTopics: z.string().describe(
    "Deprecated. This is merged into the new whoCanModerateContent setting. Specifies who can delete topics. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanDiscoverGroup: z.string().describe(
    "Specifies the set of users for whom this group is discoverable. Possible values are: - ANYONE_CAN_DISCOVER - ALL_IN_DOMAIN_CAN_DISCOVER - ALL_MEMBERS_CAN_DISCOVER",
  ).optional(),
  whoCanEnterFreeFormTags: z.string().describe(
    "Deprecated. This is merged into the new whoCanAssistContent setting. Permission to enter free form tags for topics in a forum. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - MANAGERS_ONLY - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanHideAbuse: z.string().describe(
    "Deprecated. This is merged into the new whoCanModerateContent setting. Specifies who can hide posts by reporting them as abuse. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanInvite: z.string().describe(
    "Deprecated. This is merged into the new whoCanModerateMembers setting. Permissions to invite new members. Possible values are: - ALL_MEMBERS_CAN_INVITE: Managers and members can invite a new member candidate. - ALL_MANAGERS_CAN_INVITE: Only managers can invite a new member. This includes the group's owner. - ALL_OWNERS_CAN_INVITE: Only owners can invite a new member. - NONE_CAN_INVITE: No one can invite a new member candidate.",
  ).optional(),
  whoCanJoin: z.string().describe(
    "Permission to join group. Possible values are: - ANYONE_CAN_JOIN: Any Internet user who is outside your domain can access your Google Groups service and view the list of groups in your Groups directory. Warning: Group owners can add external addresses, outside of the domain to their groups. They can also allow people outside your domain to join their groups. If you later disable this option, any external addresses already added to users' groups remain in those groups. - ALL_IN_DOMAIN_CAN_JOIN: Anyone in the account domain can join. This includes accounts with multiple domains. - INVITED_CAN_JOIN: Candidates for membership can be invited to join. - CAN_REQUEST_TO_JOIN: Non members can request an invitation to join.",
  ).optional(),
  whoCanLeaveGroup: z.string().describe(
    "Permission to leave the group. Possible values are: - ALL_MANAGERS_CAN_LEAVE - ALL_MEMBERS_CAN_LEAVE - NONE_CAN_LEAVE",
  ).optional(),
  whoCanLockTopics: z.string().describe(
    "Deprecated. This is merged into the new whoCanModerateContent setting. Specifies who can prevent users from posting replies to topics. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanMakeTopicsSticky: z.string().describe(
    "Deprecated. This is merged into the new whoCanModerateContent setting. Specifies who can make topics appear at the top of the topic list. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanMarkDuplicate: z.string().describe(
    "Deprecated. This is merged into the new whoCanAssistContent setting. Permission to mark a topic as a duplicate of another topic. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - MANAGERS_ONLY - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanMarkFavoriteReplyOnAnyTopic: z.string().describe(
    "Deprecated. This is merged into the new whoCanAssistContent setting. Permission to mark any other user's post as a favorite reply. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - MANAGERS_ONLY - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanMarkFavoriteReplyOnOwnTopic: z.string().describe(
    "Deprecated. This is merged into the new whoCanAssistContent setting. Permission to mark a post for a topic they started as a favorite reply. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - MANAGERS_ONLY - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanMarkNoResponseNeeded: z.string().describe(
    "Deprecated. This is merged into the new whoCanAssistContent setting. Permission to mark a topic as not needing a response. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - MANAGERS_ONLY - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanModerateContent: z.string().describe(
    "Specifies who can moderate content. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanModerateMembers: z.string().describe(
    "Specifies who can manage members. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanModifyMembers: z.string().describe(
    "Deprecated. This is merged into the new whoCanModerateMembers setting. Specifies who can change group members' roles. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanModifyTagsAndCategories: z.string().describe(
    "Deprecated. This is merged into the new whoCanAssistContent setting. Permission to change tags and categories. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - MANAGERS_ONLY - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanMoveTopicsIn: z.string().describe(
    "Deprecated. This is merged into the new whoCanModerateContent setting. Specifies who can move topics into the group or forum. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanMoveTopicsOut: z.string().describe(
    "Deprecated. This is merged into the new whoCanModerateContent setting. Specifies who can move topics out of the group or forum. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanPostAnnouncements: z.string().describe(
    "Deprecated. This is merged into the new whoCanModerateContent setting. Specifies who can post announcements, a special topic type. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanPostMessage: z.string().describe(
    "Permissions to post messages. Possible values are: - NONE_CAN_POST: The group is disabled and archived. No one can post a message to this group. - When archiveOnly is false, updating whoCanPostMessage to NONE_CAN_POST, results in an error. - If archiveOnly is reverted from true to false, whoCanPostMessages is set to ALL_MANAGERS_CAN_POST. - ALL_MANAGERS_CAN_POST: Managers, including group owners, can post messages. - ALL_MEMBERS_CAN_POST: Any group member can post a message. - ALL_OWNERS_CAN_POST: Only group owners can post a message. - ALL_IN_DOMAIN_CAN_POST: Anyone in the account can post a message. - ANYONE_CAN_POST: Any Internet user who outside your account can access your Google Groups service and post a message. Note: When whoCanPostMessage is set to ANYONE_CAN_POST, we recommend the messageModerationLevel be set to MODERATE_NON_MEMBERS to protect the group from possible spam.",
  ).optional(),
  whoCanTakeTopics: z.string().describe(
    "Deprecated. This is merged into the new whoCanAssistContent setting. Permission to take topics in a forum. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - MANAGERS_ONLY - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanUnassignTopic: z.string().describe(
    "Deprecated. This is merged into the new whoCanAssistContent setting. Permission to unassign any topic in a forum. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - MANAGERS_ONLY - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanUnmarkFavoriteReplyOnAnyTopic: z.string().describe(
    "Deprecated. This is merged into the new whoCanAssistContent setting. Permission to unmark any post from a favorite reply. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - MANAGERS_ONLY - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanViewGroup: z.string().describe(
    "Permissions to view group messages. Possible values are: - ANYONE_CAN_VIEW: Any Internet user can view the group's messages. - ALL_IN_DOMAIN_CAN_VIEW: Anyone in your account can view this group's messages. - ALL_MEMBERS_CAN_VIEW: All group members can view the group's messages. - ALL_MANAGERS_CAN_VIEW: Any group manager can view this group's messages.",
  ).optional(),
  whoCanViewMembership: z.string().describe(
    "Permissions to view membership. Possible values are: - ALL_IN_DOMAIN_CAN_VIEW: Anyone in the account can view the group members list. If a group already has external members, those members can still send email to this group. - ALL_MEMBERS_CAN_VIEW: The group members can view the group members list. - ALL_MANAGERS_CAN_VIEW: The group managers can view group members list.",
  ).optional(),
});

const StateSchema = z.object({
  allowExternalMembers: z.string().optional(),
  allowGoogleCommunication: z.string().optional(),
  allowWebPosting: z.string().optional(),
  archiveOnly: z.string().optional(),
  customFooterText: z.string().optional(),
  customReplyTo: z.string().optional(),
  customRolesEnabledForSettingsToBeMerged: z.string().optional(),
  defaultMessageDenyNotificationText: z.string().optional(),
  default_sender: z.string().optional(),
  description: z.string().optional(),
  email: z.string().optional(),
  enableCollaborativeInbox: z.string().optional(),
  favoriteRepliesOnTop: z.string().optional(),
  includeCustomFooter: z.string().optional(),
  includeInGlobalAddressList: z.string().optional(),
  isArchived: z.string().optional(),
  kind: z.string().optional(),
  maxMessageBytes: z.number().optional(),
  membersCanPostAsTheGroup: z.string().optional(),
  messageDisplayFont: z.string().optional(),
  messageModerationLevel: z.string().optional(),
  name: z.string(),
  primaryLanguage: z.string().optional(),
  replyTo: z.string().optional(),
  sendMessageDenyNotification: z.string().optional(),
  showInGroupDirectory: z.string().optional(),
  spamModerationLevel: z.string().optional(),
  whoCanAdd: z.string().optional(),
  whoCanAddExternalMembers: z.string().optional(),
  whoCanAddReferences: z.string().optional(),
  whoCanApproveMembers: z.string().optional(),
  whoCanApproveMessages: z.string().optional(),
  whoCanAssignTopics: z.string().optional(),
  whoCanAssistContent: z.string().optional(),
  whoCanBanUsers: z.string().optional(),
  whoCanContactOwner: z.string().optional(),
  whoCanDeleteAnyPost: z.string().optional(),
  whoCanDeleteTopics: z.string().optional(),
  whoCanDiscoverGroup: z.string().optional(),
  whoCanEnterFreeFormTags: z.string().optional(),
  whoCanHideAbuse: z.string().optional(),
  whoCanInvite: z.string().optional(),
  whoCanJoin: z.string().optional(),
  whoCanLeaveGroup: z.string().optional(),
  whoCanLockTopics: z.string().optional(),
  whoCanMakeTopicsSticky: z.string().optional(),
  whoCanMarkDuplicate: z.string().optional(),
  whoCanMarkFavoriteReplyOnAnyTopic: z.string().optional(),
  whoCanMarkFavoriteReplyOnOwnTopic: z.string().optional(),
  whoCanMarkNoResponseNeeded: z.string().optional(),
  whoCanModerateContent: z.string().optional(),
  whoCanModerateMembers: z.string().optional(),
  whoCanModifyMembers: z.string().optional(),
  whoCanModifyTagsAndCategories: z.string().optional(),
  whoCanMoveTopicsIn: z.string().optional(),
  whoCanMoveTopicsOut: z.string().optional(),
  whoCanPostAnnouncements: z.string().optional(),
  whoCanPostMessage: z.string().optional(),
  whoCanTakeTopics: z.string().optional(),
  whoCanUnassignTopic: z.string().optional(),
  whoCanUnmarkFavoriteReplyOnAnyTopic: z.string().optional(),
  whoCanViewGroup: z.string().optional(),
  whoCanViewMembership: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  allowExternalMembers: z.string().describe(
    "Identifies whether members external to your organization can join the group. Possible values are: - true: G Suite users external to your organization can become members of this group. - false: Users not belonging to the organization are not allowed to become members of this group.",
  ).optional(),
  allowGoogleCommunication: z.string().describe(
    "Deprecated. Allows Google to contact administrator of the group. - true: Allow Google to contact managers of this group. Occasionally Google may send updates on the latest features, ask for input on new features, or ask for permission to highlight your group. - false: Google can not contact managers of this group.",
  ).optional(),
  allowWebPosting: z.string().describe(
    "Allows posting from web. Possible values are: - true: Allows any member to post to the group forum. - false: Members only use Gmail to communicate with the group.",
  ).optional(),
  archiveOnly: z.string().describe(
    "Allows the group to be archived only. Possible values are: - true: Group is archived and the group is inactive. New messages to this group are rejected. The older archived messages are browseable and searchable. - If true, the whoCanPostMessage property is set to NONE_CAN_POST. - If reverted from true to false, whoCanPostMessages is set to ALL_MANAGERS_CAN_POST. - false: The group is active and can receive messages. - When false, updating whoCanPostMessage to NONE_CAN_POST, results in an error.",
  ).optional(),
  customFooterText: z.string().describe(
    "Set the content of custom footer text. The maximum number of characters is 1,000.",
  ).optional(),
  customReplyTo: z.string().describe(
    "An email address used when replying to a message if the replyTo property is set to REPLY_TO_CUSTOM. This address is defined by an account administrator. - When the group's ReplyTo property is set to REPLY_TO_CUSTOM, the customReplyTo property holds a custom email address used when replying to a message. - If the group's ReplyTo property is set to REPLY_TO_CUSTOM, the customReplyTo property must have a text value or an error is returned.",
  ).optional(),
  customRolesEnabledForSettingsToBeMerged: z.string().describe(
    "Specifies whether the group has a custom role that's included in one of the settings being merged. This field is read-only and update/patch requests to it are ignored. Possible values are: - true - false",
  ).optional(),
  defaultMessageDenyNotificationText: z.string().describe(
    "When a message is rejected, this is text for the rejection notification sent to the message's author. By default, this property is empty and has no value in the API's response body. The maximum notification text size is 10,000 characters. Note: Requires sendMessageDenyNotification property to be true.",
  ).optional(),
  default_sender: z.string().describe(
    "Default sender for members who can post messages as the group. Possible values are: - `DEFAULT_SELF`: By default messages will be sent from the user - `GROUP`: By default messages will be sent from the group",
  ).optional(),
  description: z.string().describe(
    "Description of the group. This property value may be an empty string if no group description has been entered. If entered, the maximum group description is no more than 300 characters.",
  ).optional(),
  email: z.string().describe(
    "The group's email address. This property can be updated using the Directory API. Note: Only a group owner can change a group's email address. A group manager can't do this. When you change your group's address using the Directory API or the control panel, you are changing the address your subscribers use to send email and the web address people use to access your group. People can't reach your group by visiting the old address.",
  ).optional(),
  enableCollaborativeInbox: z.string().describe(
    "Specifies whether a collaborative inbox will remain turned on for the group. Possible values are: - true - false",
  ).optional(),
  favoriteRepliesOnTop: z.string().describe(
    "Indicates if favorite replies should be displayed above other replies. - true: Favorite replies will be displayed above other replies. - false: Favorite replies will not be displayed above other replies.",
  ).optional(),
  includeCustomFooter: z.string().describe(
    "Whether to include custom footer. Possible values are: - true - false",
  ).optional(),
  includeInGlobalAddressList: z.string().describe(
    "Enables the group to be included in the Global Address List. For more information, see the help center. Possible values are: - true: Group is included in the Global Address List. - false: Group is not included in the Global Address List.",
  ).optional(),
  isArchived: z.string().describe(
    "Allows the Group contents to be archived. Possible values are: - true: Archive messages sent to the group. - false: Do not keep an archive of messages sent to this group. If false, previously archived messages remain in the archive.",
  ).optional(),
  kind: z.string().describe(
    "The type of the resource. It is always groupsSettings#groups.",
  ).optional(),
  maxMessageBytes: z.number().int().describe(
    "Deprecated. The maximum size of a message is 25Mb.",
  ).optional(),
  membersCanPostAsTheGroup: z.string().describe(
    "Enables members to post messages as the group. Possible values are: - true: Group member can post messages using the group's email address instead of their own email address. Message appear to originate from the group itself. Note: When true, any message moderation settings on individual users or new members do not apply to posts made on behalf of the group. - false: Members can not post in behalf of the group's email address.",
  ).optional(),
  messageDisplayFont: z.string().describe(
    'Deprecated. The default message display font always has a value of "DEFAULT_FONT".',
  ).optional(),
  messageModerationLevel: z.string().describe(
    "Moderation level of incoming messages. Possible values are: - MODERATE_ALL_MESSAGES: All messages are sent to the group owner's email address for approval. If approved, the message is sent to the group. - MODERATE_NON_MEMBERS: All messages from non group members are sent to the group owner's email address for approval. If approved, the message is sent to the group. - MODERATE_NEW_MEMBERS: All messages from new members are sent to the group owner's email address for approval. If approved, the message is sent to the group. - MODERATE_NONE: No moderator approval is required. Messages are delivered directly to the group. Note: When the whoCanPostMessage is set to ANYONE_CAN_POST, we recommend the messageModerationLevel be set to MODERATE_NON_MEMBERS to protect the group from possible spam. When memberCanPostAsTheGroup is true, any message moderation settings on individual users or new members will not apply to posts made on behalf of the group.",
  ).optional(),
  name: z.string().describe(
    "Name of the group, which has a maximum size of 75 characters.",
  ).optional(),
  primaryLanguage: z.string().describe(
    "The primary language for group. For a group's primary language use the language tags from the G Suite languages found at G Suite Email Settings API Email Language Tags.",
  ).optional(),
  replyTo: z.string().describe(
    "Specifies who receives the default reply. Possible values are: - REPLY_TO_CUSTOM: For replies to messages, use the group's custom email address. When the group's ReplyTo property is set to REPLY_TO_CUSTOM, the customReplyTo property holds the custom email address used when replying to a message. If the group's ReplyTo property is set to REPLY_TO_CUSTOM, the customReplyTo property must have a value. Otherwise an error is returned. - REPLY_TO_SENDER: The reply sent to author of message. - REPLY_TO_LIST: This reply message is sent to the group. - REPLY_TO_OWNER: The reply is sent to the owner(s) of the group. This does not include the group's managers. - REPLY_TO_IGNORE: Group users individually decide where the message reply is sent. - REPLY_TO_MANAGERS: This reply message is sent to the group's managers, which includes all managers and the group owner.",
  ).optional(),
  sendMessageDenyNotification: z.string().describe(
    "Allows a member to be notified if the member's message to the group is denied by the group owner. Possible values are: - true: When a message is rejected, send the deny message notification to the message author. The defaultMessageDenyNotificationText property is dependent on the sendMessageDenyNotification property being true. - false: When a message is rejected, no notification is sent.",
  ).optional(),
  showInGroupDirectory: z.string().describe(
    "Deprecated. This is merged into the new whoCanDiscoverGroup setting. Allows the group to be visible in the Groups Directory. Possible values are: - true: All groups in the account are listed in the Groups directory. - false: All groups in the account are not listed in the directory.",
  ).optional(),
  spamModerationLevel: z.string().describe(
    "Specifies moderation levels for messages detected as spam. Possible values are: - ALLOW: Post the message to the group. - MODERATE: Send the message to the moderation queue. This is the default. - SILENTLY_MODERATE: Send the message to the moderation queue, but do not send notification to moderators. - REJECT: Immediately reject the message.",
  ).optional(),
  whoCanAdd: z.string().describe(
    "Deprecated. This is merged into the new whoCanModerateMembers setting. Permissions to add members. Possible values are: - ALL_MEMBERS_CAN_ADD: Managers and members can directly add new members. - ALL_MANAGERS_CAN_ADD: Only managers can directly add new members. this includes the group's owner. - ALL_OWNERS_CAN_ADD: Only owners can directly add new members. - NONE_CAN_ADD: No one can directly add new members.",
  ).optional(),
  whoCanAddExternalMembers: z.string().describe(
    "Specifies who can add external members. UPDATE and PATCH requests ignore this field if allowExternalMembers is false. Possible values are: - ONLY_ADMINS_CAN_ADD_EXTERNAL_MEMBERS - END_USERS_CAN_ADD_EXTERNAL_MEMBERS",
  ).optional(),
  whoCanAddReferences: z.string().describe(
    'Deprecated. This functionality is no longer supported in the Google Groups UI. The value is always "NONE".',
  ).optional(),
  whoCanApproveMembers: z.string().describe(
    "Specifies who can approve members who ask to join groups. This permission will be deprecated once it is merged into the new whoCanModerateMembers setting. Possible values are: - ALL_MEMBERS_CAN_APPROVE - ALL_MANAGERS_CAN_APPROVE - ALL_OWNERS_CAN_APPROVE - NONE_CAN_APPROVE",
  ).optional(),
  whoCanApproveMessages: z.string().describe(
    "Deprecated. This is merged into the new whoCanModerateContent setting. Specifies who can approve pending messages in the moderation queue. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanAssignTopics: z.string().describe(
    "Deprecated. This is merged into the new whoCanAssistContent setting. Permission to assign topics in a forum to another user. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - MANAGERS_ONLY - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanAssistContent: z.string().describe(
    "Specifies who can moderate metadata. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - MANAGERS_ONLY - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanBanUsers: z.string().describe(
    "Specifies who can deny membership to users. This permission will be deprecated once it is merged into the new whoCanModerateMembers setting. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanContactOwner: z.string().describe(
    "Permission to contact owner of the group via web UI. Possible values are: - ALL_IN_DOMAIN_CAN_CONTACT - ALL_MANAGERS_CAN_CONTACT - ALL_MEMBERS_CAN_CONTACT - ANYONE_CAN_CONTACT - ALL_OWNERS_CAN_CONTACT",
  ).optional(),
  whoCanDeleteAnyPost: z.string().describe(
    "Deprecated. This is merged into the new whoCanModerateContent setting. Specifies who can delete replies to topics. (Authors can always delete their own posts). Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanDeleteTopics: z.string().describe(
    "Deprecated. This is merged into the new whoCanModerateContent setting. Specifies who can delete topics. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanDiscoverGroup: z.string().describe(
    "Specifies the set of users for whom this group is discoverable. Possible values are: - ANYONE_CAN_DISCOVER - ALL_IN_DOMAIN_CAN_DISCOVER - ALL_MEMBERS_CAN_DISCOVER",
  ).optional(),
  whoCanEnterFreeFormTags: z.string().describe(
    "Deprecated. This is merged into the new whoCanAssistContent setting. Permission to enter free form tags for topics in a forum. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - MANAGERS_ONLY - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanHideAbuse: z.string().describe(
    "Deprecated. This is merged into the new whoCanModerateContent setting. Specifies who can hide posts by reporting them as abuse. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanInvite: z.string().describe(
    "Deprecated. This is merged into the new whoCanModerateMembers setting. Permissions to invite new members. Possible values are: - ALL_MEMBERS_CAN_INVITE: Managers and members can invite a new member candidate. - ALL_MANAGERS_CAN_INVITE: Only managers can invite a new member. This includes the group's owner. - ALL_OWNERS_CAN_INVITE: Only owners can invite a new member. - NONE_CAN_INVITE: No one can invite a new member candidate.",
  ).optional(),
  whoCanJoin: z.string().describe(
    "Permission to join group. Possible values are: - ANYONE_CAN_JOIN: Any Internet user who is outside your domain can access your Google Groups service and view the list of groups in your Groups directory. Warning: Group owners can add external addresses, outside of the domain to their groups. They can also allow people outside your domain to join their groups. If you later disable this option, any external addresses already added to users' groups remain in those groups. - ALL_IN_DOMAIN_CAN_JOIN: Anyone in the account domain can join. This includes accounts with multiple domains. - INVITED_CAN_JOIN: Candidates for membership can be invited to join. - CAN_REQUEST_TO_JOIN: Non members can request an invitation to join.",
  ).optional(),
  whoCanLeaveGroup: z.string().describe(
    "Permission to leave the group. Possible values are: - ALL_MANAGERS_CAN_LEAVE - ALL_MEMBERS_CAN_LEAVE - NONE_CAN_LEAVE",
  ).optional(),
  whoCanLockTopics: z.string().describe(
    "Deprecated. This is merged into the new whoCanModerateContent setting. Specifies who can prevent users from posting replies to topics. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanMakeTopicsSticky: z.string().describe(
    "Deprecated. This is merged into the new whoCanModerateContent setting. Specifies who can make topics appear at the top of the topic list. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanMarkDuplicate: z.string().describe(
    "Deprecated. This is merged into the new whoCanAssistContent setting. Permission to mark a topic as a duplicate of another topic. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - MANAGERS_ONLY - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanMarkFavoriteReplyOnAnyTopic: z.string().describe(
    "Deprecated. This is merged into the new whoCanAssistContent setting. Permission to mark any other user's post as a favorite reply. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - MANAGERS_ONLY - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanMarkFavoriteReplyOnOwnTopic: z.string().describe(
    "Deprecated. This is merged into the new whoCanAssistContent setting. Permission to mark a post for a topic they started as a favorite reply. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - MANAGERS_ONLY - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanMarkNoResponseNeeded: z.string().describe(
    "Deprecated. This is merged into the new whoCanAssistContent setting. Permission to mark a topic as not needing a response. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - MANAGERS_ONLY - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanModerateContent: z.string().describe(
    "Specifies who can moderate content. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanModerateMembers: z.string().describe(
    "Specifies who can manage members. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanModifyMembers: z.string().describe(
    "Deprecated. This is merged into the new whoCanModerateMembers setting. Specifies who can change group members' roles. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanModifyTagsAndCategories: z.string().describe(
    "Deprecated. This is merged into the new whoCanAssistContent setting. Permission to change tags and categories. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - MANAGERS_ONLY - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanMoveTopicsIn: z.string().describe(
    "Deprecated. This is merged into the new whoCanModerateContent setting. Specifies who can move topics into the group or forum. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanMoveTopicsOut: z.string().describe(
    "Deprecated. This is merged into the new whoCanModerateContent setting. Specifies who can move topics out of the group or forum. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanPostAnnouncements: z.string().describe(
    "Deprecated. This is merged into the new whoCanModerateContent setting. Specifies who can post announcements, a special topic type. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanPostMessage: z.string().describe(
    "Permissions to post messages. Possible values are: - NONE_CAN_POST: The group is disabled and archived. No one can post a message to this group. - When archiveOnly is false, updating whoCanPostMessage to NONE_CAN_POST, results in an error. - If archiveOnly is reverted from true to false, whoCanPostMessages is set to ALL_MANAGERS_CAN_POST. - ALL_MANAGERS_CAN_POST: Managers, including group owners, can post messages. - ALL_MEMBERS_CAN_POST: Any group member can post a message. - ALL_OWNERS_CAN_POST: Only group owners can post a message. - ALL_IN_DOMAIN_CAN_POST: Anyone in the account can post a message. - ANYONE_CAN_POST: Any Internet user who outside your account can access your Google Groups service and post a message. Note: When whoCanPostMessage is set to ANYONE_CAN_POST, we recommend the messageModerationLevel be set to MODERATE_NON_MEMBERS to protect the group from possible spam.",
  ).optional(),
  whoCanTakeTopics: z.string().describe(
    "Deprecated. This is merged into the new whoCanAssistContent setting. Permission to take topics in a forum. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - MANAGERS_ONLY - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanUnassignTopic: z.string().describe(
    "Deprecated. This is merged into the new whoCanAssistContent setting. Permission to unassign any topic in a forum. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - MANAGERS_ONLY - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanUnmarkFavoriteReplyOnAnyTopic: z.string().describe(
    "Deprecated. This is merged into the new whoCanAssistContent setting. Permission to unmark any post from a favorite reply. Possible values are: - ALL_MEMBERS - OWNERS_AND_MANAGERS - MANAGERS_ONLY - OWNERS_ONLY - NONE",
  ).optional(),
  whoCanViewGroup: z.string().describe(
    "Permissions to view group messages. Possible values are: - ANYONE_CAN_VIEW: Any Internet user can view the group's messages. - ALL_IN_DOMAIN_CAN_VIEW: Anyone in your account can view this group's messages. - ALL_MEMBERS_CAN_VIEW: All group members can view the group's messages. - ALL_MANAGERS_CAN_VIEW: Any group manager can view this group's messages.",
  ).optional(),
  whoCanViewMembership: z.string().describe(
    "Permissions to view membership. Possible values are: - ALL_IN_DOMAIN_CAN_VIEW: Anyone in the account can view the group members list. If a group already has external members, those members can still send email to this group. - ALL_MEMBERS_CAN_VIEW: The group members can view the group members list. - ALL_MANAGERS_CAN_VIEW: The group managers can view group members list.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Groups Settings Groups. Registered at `@swamp/gcp/groupssettings/groups`. */
export const model = {
  type: "@swamp/gcp/groupssettings/groups",
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
      toVersion: "2026.04.15.1",
      description: "Added: whoCanAddExternalMembers",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "Removed: whoCanAddExternalMembers",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { whoCanAddExternalMembers: _whoCanAddExternalMembers, ...rest } =
          old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.18.2",
      description: "Added: whoCanAddExternalMembers",
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
      description: "JSON template for Group resource",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a groups",
      arguments: z.object({
        identifier: z.string().describe("The name of the groups"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["groupUniqueId"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName =
          ((result.name ?? g.name)?.toString() ?? args.identifier).replace(
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
      description: "Update groups attributes",
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
        params["groupUniqueId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["allowExternalMembers"] !== undefined) {
          body["allowExternalMembers"] = g["allowExternalMembers"];
        }
        if (g["allowGoogleCommunication"] !== undefined) {
          body["allowGoogleCommunication"] = g["allowGoogleCommunication"];
        }
        if (g["allowWebPosting"] !== undefined) {
          body["allowWebPosting"] = g["allowWebPosting"];
        }
        if (g["archiveOnly"] !== undefined) {
          body["archiveOnly"] = g["archiveOnly"];
        }
        if (g["customFooterText"] !== undefined) {
          body["customFooterText"] = g["customFooterText"];
        }
        if (g["customReplyTo"] !== undefined) {
          body["customReplyTo"] = g["customReplyTo"];
        }
        if (g["customRolesEnabledForSettingsToBeMerged"] !== undefined) {
          body["customRolesEnabledForSettingsToBeMerged"] =
            g["customRolesEnabledForSettingsToBeMerged"];
        }
        if (g["defaultMessageDenyNotificationText"] !== undefined) {
          body["defaultMessageDenyNotificationText"] =
            g["defaultMessageDenyNotificationText"];
        }
        if (g["default_sender"] !== undefined) {
          body["default_sender"] = g["default_sender"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["email"] !== undefined) body["email"] = g["email"];
        if (g["enableCollaborativeInbox"] !== undefined) {
          body["enableCollaborativeInbox"] = g["enableCollaborativeInbox"];
        }
        if (g["favoriteRepliesOnTop"] !== undefined) {
          body["favoriteRepliesOnTop"] = g["favoriteRepliesOnTop"];
        }
        if (g["includeCustomFooter"] !== undefined) {
          body["includeCustomFooter"] = g["includeCustomFooter"];
        }
        if (g["includeInGlobalAddressList"] !== undefined) {
          body["includeInGlobalAddressList"] = g["includeInGlobalAddressList"];
        }
        if (g["isArchived"] !== undefined) body["isArchived"] = g["isArchived"];
        if (g["kind"] !== undefined) body["kind"] = g["kind"];
        if (g["maxMessageBytes"] !== undefined) {
          body["maxMessageBytes"] = g["maxMessageBytes"];
        }
        if (g["membersCanPostAsTheGroup"] !== undefined) {
          body["membersCanPostAsTheGroup"] = g["membersCanPostAsTheGroup"];
        }
        if (g["messageDisplayFont"] !== undefined) {
          body["messageDisplayFont"] = g["messageDisplayFont"];
        }
        if (g["messageModerationLevel"] !== undefined) {
          body["messageModerationLevel"] = g["messageModerationLevel"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["primaryLanguage"] !== undefined) {
          body["primaryLanguage"] = g["primaryLanguage"];
        }
        if (g["replyTo"] !== undefined) body["replyTo"] = g["replyTo"];
        if (g["sendMessageDenyNotification"] !== undefined) {
          body["sendMessageDenyNotification"] =
            g["sendMessageDenyNotification"];
        }
        if (g["showInGroupDirectory"] !== undefined) {
          body["showInGroupDirectory"] = g["showInGroupDirectory"];
        }
        if (g["spamModerationLevel"] !== undefined) {
          body["spamModerationLevel"] = g["spamModerationLevel"];
        }
        if (g["whoCanAdd"] !== undefined) body["whoCanAdd"] = g["whoCanAdd"];
        if (g["whoCanAddExternalMembers"] !== undefined) {
          body["whoCanAddExternalMembers"] = g["whoCanAddExternalMembers"];
        }
        if (g["whoCanAddReferences"] !== undefined) {
          body["whoCanAddReferences"] = g["whoCanAddReferences"];
        }
        if (g["whoCanApproveMembers"] !== undefined) {
          body["whoCanApproveMembers"] = g["whoCanApproveMembers"];
        }
        if (g["whoCanApproveMessages"] !== undefined) {
          body["whoCanApproveMessages"] = g["whoCanApproveMessages"];
        }
        if (g["whoCanAssignTopics"] !== undefined) {
          body["whoCanAssignTopics"] = g["whoCanAssignTopics"];
        }
        if (g["whoCanAssistContent"] !== undefined) {
          body["whoCanAssistContent"] = g["whoCanAssistContent"];
        }
        if (g["whoCanBanUsers"] !== undefined) {
          body["whoCanBanUsers"] = g["whoCanBanUsers"];
        }
        if (g["whoCanContactOwner"] !== undefined) {
          body["whoCanContactOwner"] = g["whoCanContactOwner"];
        }
        if (g["whoCanDeleteAnyPost"] !== undefined) {
          body["whoCanDeleteAnyPost"] = g["whoCanDeleteAnyPost"];
        }
        if (g["whoCanDeleteTopics"] !== undefined) {
          body["whoCanDeleteTopics"] = g["whoCanDeleteTopics"];
        }
        if (g["whoCanDiscoverGroup"] !== undefined) {
          body["whoCanDiscoverGroup"] = g["whoCanDiscoverGroup"];
        }
        if (g["whoCanEnterFreeFormTags"] !== undefined) {
          body["whoCanEnterFreeFormTags"] = g["whoCanEnterFreeFormTags"];
        }
        if (g["whoCanHideAbuse"] !== undefined) {
          body["whoCanHideAbuse"] = g["whoCanHideAbuse"];
        }
        if (g["whoCanInvite"] !== undefined) {
          body["whoCanInvite"] = g["whoCanInvite"];
        }
        if (g["whoCanJoin"] !== undefined) body["whoCanJoin"] = g["whoCanJoin"];
        if (g["whoCanLeaveGroup"] !== undefined) {
          body["whoCanLeaveGroup"] = g["whoCanLeaveGroup"];
        }
        if (g["whoCanLockTopics"] !== undefined) {
          body["whoCanLockTopics"] = g["whoCanLockTopics"];
        }
        if (g["whoCanMakeTopicsSticky"] !== undefined) {
          body["whoCanMakeTopicsSticky"] = g["whoCanMakeTopicsSticky"];
        }
        if (g["whoCanMarkDuplicate"] !== undefined) {
          body["whoCanMarkDuplicate"] = g["whoCanMarkDuplicate"];
        }
        if (g["whoCanMarkFavoriteReplyOnAnyTopic"] !== undefined) {
          body["whoCanMarkFavoriteReplyOnAnyTopic"] =
            g["whoCanMarkFavoriteReplyOnAnyTopic"];
        }
        if (g["whoCanMarkFavoriteReplyOnOwnTopic"] !== undefined) {
          body["whoCanMarkFavoriteReplyOnOwnTopic"] =
            g["whoCanMarkFavoriteReplyOnOwnTopic"];
        }
        if (g["whoCanMarkNoResponseNeeded"] !== undefined) {
          body["whoCanMarkNoResponseNeeded"] = g["whoCanMarkNoResponseNeeded"];
        }
        if (g["whoCanModerateContent"] !== undefined) {
          body["whoCanModerateContent"] = g["whoCanModerateContent"];
        }
        if (g["whoCanModerateMembers"] !== undefined) {
          body["whoCanModerateMembers"] = g["whoCanModerateMembers"];
        }
        if (g["whoCanModifyMembers"] !== undefined) {
          body["whoCanModifyMembers"] = g["whoCanModifyMembers"];
        }
        if (g["whoCanModifyTagsAndCategories"] !== undefined) {
          body["whoCanModifyTagsAndCategories"] =
            g["whoCanModifyTagsAndCategories"];
        }
        if (g["whoCanMoveTopicsIn"] !== undefined) {
          body["whoCanMoveTopicsIn"] = g["whoCanMoveTopicsIn"];
        }
        if (g["whoCanMoveTopicsOut"] !== undefined) {
          body["whoCanMoveTopicsOut"] = g["whoCanMoveTopicsOut"];
        }
        if (g["whoCanPostAnnouncements"] !== undefined) {
          body["whoCanPostAnnouncements"] = g["whoCanPostAnnouncements"];
        }
        if (g["whoCanPostMessage"] !== undefined) {
          body["whoCanPostMessage"] = g["whoCanPostMessage"];
        }
        if (g["whoCanTakeTopics"] !== undefined) {
          body["whoCanTakeTopics"] = g["whoCanTakeTopics"];
        }
        if (g["whoCanUnassignTopic"] !== undefined) {
          body["whoCanUnassignTopic"] = g["whoCanUnassignTopic"];
        }
        if (g["whoCanUnmarkFavoriteReplyOnAnyTopic"] !== undefined) {
          body["whoCanUnmarkFavoriteReplyOnAnyTopic"] =
            g["whoCanUnmarkFavoriteReplyOnAnyTopic"];
        }
        if (g["whoCanViewGroup"] !== undefined) {
          body["whoCanViewGroup"] = g["whoCanViewGroup"];
        }
        if (g["whoCanViewMembership"] !== undefined) {
          body["whoCanViewMembership"] = g["whoCanViewMembership"];
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
          UPDATE_CONFIG,
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
    sync: {
      description: "Sync groups state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["groupUniqueId"] = identifier;
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
