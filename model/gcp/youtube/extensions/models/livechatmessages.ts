// Auto-generated extension model for @swamp/gcp/youtube/livechatmessages
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud YouTube Data LiveChatMessages.
 *
 * A *liveChatMessage* resource represents a chat message in a YouTube Live Chat.
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
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://youtube.googleapis.com/";

const INSERT_CONFIG = {
  "id": "youtube.liveChatMessages.insert",
  "path": "youtube/v3/liveChat/messages",
  "httpMethod": "POST",
  "parameterOrder": [
    "part",
  ],
  "parameters": {
    "part": {
      "location": "query",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "youtube.liveChatMessages.delete",
  "path": "youtube/v3/liveChat/messages",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "id",
  ],
  "parameters": {
    "id": {
      "location": "query",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "youtube.liveChatMessages.list",
  "path": "youtube/v3/liveChat/messages",
  "httpMethod": "GET",
  "parameterOrder": [
    "liveChatId",
    "part",
  ],
  "parameters": {
    "hl": {
      "location": "query",
    },
    "liveChatId": {
      "location": "query",
      "required": true,
    },
    "maxResults": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "part": {
      "location": "query",
      "required": true,
    },
    "profileImageSize": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  authorDetails: z.object({
    channelId: z.string().describe("The YouTube channel ID.").optional(),
    channelUrl: z.string().describe("The channel's URL.").optional(),
    displayName: z.string().describe("The channel's display name.").optional(),
    isChatModerator: z.boolean().describe(
      "Whether the author is a moderator of the live chat.",
    ).optional(),
    isChatOwner: z.boolean().describe(
      "Whether the author is the owner of the live chat.",
    ).optional(),
    isChatSponsor: z.boolean().describe(
      "Whether the author is a sponsor of the live chat.",
    ).optional(),
    isVerified: z.boolean().describe(
      "Whether the author's identity has been verified by YouTube.",
    ).optional(),
    profileImageUrl: z.string().describe("The channels's avatar URL.")
      .optional(),
  }).optional(),
  id: z.string().describe(
    "The ID that YouTube assigns to uniquely identify the message.",
  ).optional(),
  snippet: z.object({
    authorChannelId: z.string().describe(
      "The ID of the user that authored this message, this field is not always filled. textMessageEvent - the user that wrote the message fanFundingEvent - the user that funded the broadcast newSponsorEvent - the user that just became a sponsor memberMilestoneChatEvent - the member that sent the message membershipGiftingEvent - the user that made the purchase giftMembershipReceivedEvent - the user that received the gift membership messageDeletedEvent - the moderator that took the action messageRetractedEvent - the author that retracted their message userBannedEvent - the moderator that took the action superChatEvent - the user that made the purchase superStickerEvent - the user that made the purchase pollEvent - the user that created the poll",
    ).optional(),
    displayMessage: z.string().describe(
      "Contains a string that can be displayed to the user. If this field is not present the message is silent, at the moment only messages of type TOMBSTONE and CHAT_ENDED_EVENT are silent.",
    ).optional(),
    fanFundingEventDetails: z.object({
      amountDisplayString: z.string().describe(
        "A rendered string that displays the fund amount and currency to the user.",
      ).optional(),
      amountMicros: z.string().describe("The amount of the fund.").optional(),
      currency: z.string().describe("The currency in which the fund was made.")
        .optional(),
      userComment: z.string().describe(
        "The comment added by the user to this fan funding event.",
      ).optional(),
    }).optional(),
    giftDetails: z.object({
      altText: z.string().describe(
        "The alternative text to be used for accessibility.",
      ).optional(),
      comboCount: z.number().int().describe(
        "The number of times the gift has been sent in a row.",
      ).optional(),
      giftDuration: z.string().describe("The duration of the gift.").optional(),
      giftName: z.string().describe("The name of the gift.").optional(),
      giftUrl: z.string().describe("The URL of the gift image.").optional(),
      hasVisualEffect: z.boolean().describe(
        "Whether the gift involves a visual effect.",
      ).optional(),
      jewelsAmount: z.number().int().describe(
        "The value of the gift in jewels.",
      ).optional(),
      language: z.string().describe("The BCP-47 language code of the gift.")
        .optional(),
    }).describe(
      "Details about the gift event, this is only set if the type is 'giftEvent'.",
    ).optional(),
    giftMembershipReceivedDetails: z.object({
      associatedMembershipGiftingMessageId: z.string().describe(
        "The ID of the membership gifting message that is related to this gift membership. This ID will always refer to a message whose type is 'membershipGiftingEvent'.",
      ).optional(),
      gifterChannelId: z.string().describe(
        "The ID of the user that made the membership gifting purchase. This matches the `snippet.authorChannelId` of the associated membership gifting message.",
      ).optional(),
      memberLevelName: z.string().describe(
        "The name of the Level at which the viewer is a member. This matches the `snippet.membershipGiftingDetails.giftMembershipsLevelName` of the associated membership gifting message. The Level names are defined by the YouTube channel offering the Membership. In some situations this field isn't filled.",
      ).optional(),
    }).optional(),
    hasDisplayContent: z.boolean().describe(
      "Whether the message has display content that should be displayed to users.",
    ).optional(),
    liveChatId: z.string().optional(),
    memberMilestoneChatDetails: z.object({
      memberLevelName: z.string().describe(
        "The name of the Level at which the viever is a member. The Level names are defined by the YouTube channel offering the Membership. In some situations this field isn't filled.",
      ).optional(),
      memberMonth: z.number().int().describe(
        "The total amount of months (rounded up) the viewer has been a member that granted them this Member Milestone Chat. This is the same number of months as is being displayed to YouTube users.",
      ).optional(),
      userComment: z.string().describe(
        "The comment added by the member to this Member Milestone Chat. This field is empty for messages without a comment from the member.",
      ).optional(),
    }).optional(),
    membershipGiftingDetails: z.object({
      giftMembershipsCount: z.number().int().describe(
        "The number of gift memberships purchased by the user.",
      ).optional(),
      giftMembershipsLevelName: z.string().describe(
        "The name of the level of the gift memberships purchased by the user. The Level names are defined by the YouTube channel offering the Membership. In some situations this field isn't filled.",
      ).optional(),
    }).optional(),
    messageDeletedDetails: z.object({
      deletedMessageId: z.string().optional(),
    }).optional(),
    messageRetractedDetails: z.object({
      retractedMessageId: z.string().optional(),
    }).optional(),
    newSponsorDetails: z.object({
      isUpgrade: z.boolean().describe(
        "If the viewer just had upgraded from a lower level. For viewers that were not members at the time of purchase, this field is false.",
      ).optional(),
      memberLevelName: z.string().describe(
        "The name of the Level that the viewer just had joined. The Level names are defined by the YouTube channel offering the Membership. In some situations this field isn't filled.",
      ).optional(),
    }).optional(),
    pollDetails: z.object({
      metadata: z.object({
        options: z.array(z.object({
          optionText: z.unknown().optional(),
          tally: z.unknown().optional(),
        })).describe(
          "The options will be returned in the order that is displayed in 1P",
        ).optional(),
        questionText: z.string().optional(),
      }).optional(),
      status: z.enum(["unknown", "active", "closed"]).optional(),
    }).optional(),
    publishedAt: z.string().describe(
      "The date and time when the message was orignally published.",
    ).optional(),
    superChatDetails: z.object({
      amountDisplayString: z.string().describe(
        "A rendered string that displays the fund amount and currency to the user.",
      ).optional(),
      amountMicros: z.string().describe(
        "The amount purchased by the user, in micros (1,750,000 micros = 1.75).",
      ).optional(),
      currency: z.string().describe(
        "The currency in which the purchase was made.",
      ).optional(),
      tier: z.number().int().describe(
        "The tier in which the amount belongs. Lower amounts belong to lower tiers. The lowest tier is 1.",
      ).optional(),
      userComment: z.string().describe(
        "The comment added by the user to this Super Chat event.",
      ).optional(),
    }).optional(),
    superStickerDetails: z.object({
      amountDisplayString: z.string().describe(
        "A rendered string that displays the fund amount and currency to the user.",
      ).optional(),
      amountMicros: z.string().describe(
        "The amount purchased by the user, in micros (1,750,000 micros = 1.75).",
      ).optional(),
      currency: z.string().describe(
        "The currency in which the purchase was made.",
      ).optional(),
      superStickerMetadata: z.object({
        altText: z.string().describe(
          "Internationalized alt text that describes the sticker image and any animation associated with it.",
        ).optional(),
        altTextLanguage: z.string().describe(
          "Specifies the localization language in which the alt text is returned.",
        ).optional(),
        stickerId: z.string().describe(
          "Unique identifier of the Super Sticker. This is a shorter form of the alt_text that includes pack name and a recognizable characteristic of the sticker.",
        ).optional(),
      }).optional(),
      tier: z.number().int().describe(
        "The tier in which the amount belongs. Lower amounts belong to lower tiers. The lowest tier is 1.",
      ).optional(),
    }).optional(),
    textMessageDetails: z.object({
      messageText: z.string().describe("The user's message.").optional(),
    }).optional(),
    type: z.enum([
      "invalidType",
      "textMessageEvent",
      "tombstone",
      "fanFundingEvent",
      "chatEndedEvent",
      "sponsorOnlyModeStartedEvent",
      "sponsorOnlyModeEndedEvent",
      "newSponsorEvent",
      "memberMilestoneChatEvent",
      "membershipGiftingEvent",
      "giftMembershipReceivedEvent",
      "messageDeletedEvent",
      "messageRetractedEvent",
      "userBannedEvent",
      "superChatEvent",
      "superStickerEvent",
      "pollEvent",
      "giftEvent",
    ]).describe(
      "The type of message, this will always be present, it determines the contents of the message as well as which fields will be present.",
    ).optional(),
    userBannedDetails: z.object({
      banDurationSeconds: z.string().describe(
        "The duration of the ban. This property is only present if the banType is temporary.",
      ).optional(),
      banType: z.enum(["permanent", "temporary"]).describe("The type of ban.")
        .optional(),
      bannedUserDetails: z.object({
        channelId: z.string().describe("The YouTube channel ID.").optional(),
        channelUrl: z.string().describe("The channel's URL.").optional(),
        displayName: z.string().describe("The channel's display name.")
          .optional(),
        profileImageUrl: z.string().describe("The channels's avatar URL.")
          .optional(),
      }).optional(),
    }).optional(),
  }).describe("Next ID: 35").optional(),
  part: z.string().describe(
    "The *part* parameter serves two purposes. It identifies the properties that the write operation will set as well as the properties that the API response will include. Set the parameter value to snippet.",
  ),
});

const StateSchema = z.object({
  authorDetails: z.object({
    channelId: z.string(),
    channelUrl: z.string(),
    displayName: z.string(),
    isChatModerator: z.boolean(),
    isChatOwner: z.boolean(),
    isChatSponsor: z.boolean(),
    isVerified: z.boolean(),
    profileImageUrl: z.string(),
  }).optional(),
  etag: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  snippet: z.object({
    authorChannelId: z.string(),
    displayMessage: z.string(),
    fanFundingEventDetails: z.object({
      amountDisplayString: z.string(),
      amountMicros: z.string(),
      currency: z.string(),
      userComment: z.string(),
    }),
    giftDetails: z.object({
      altText: z.string(),
      comboCount: z.number(),
      giftDuration: z.string(),
      giftName: z.string(),
      giftUrl: z.string(),
      hasVisualEffect: z.boolean(),
      jewelsAmount: z.number(),
      language: z.string(),
    }),
    giftMembershipReceivedDetails: z.object({
      associatedMembershipGiftingMessageId: z.string(),
      gifterChannelId: z.string(),
      memberLevelName: z.string(),
    }),
    hasDisplayContent: z.boolean(),
    liveChatId: z.string(),
    memberMilestoneChatDetails: z.object({
      memberLevelName: z.string(),
      memberMonth: z.number(),
      userComment: z.string(),
    }),
    membershipGiftingDetails: z.object({
      giftMembershipsCount: z.number(),
      giftMembershipsLevelName: z.string(),
    }),
    messageDeletedDetails: z.object({
      deletedMessageId: z.string(),
    }),
    messageRetractedDetails: z.object({
      retractedMessageId: z.string(),
    }),
    newSponsorDetails: z.object({
      isUpgrade: z.boolean(),
      memberLevelName: z.string(),
    }),
    pollDetails: z.object({
      metadata: z.object({
        options: z.array(z.object({
          optionText: z.unknown(),
          tally: z.unknown(),
        })),
        questionText: z.string(),
      }),
      status: z.string(),
    }),
    publishedAt: z.string(),
    superChatDetails: z.object({
      amountDisplayString: z.string(),
      amountMicros: z.string(),
      currency: z.string(),
      tier: z.number(),
      userComment: z.string(),
    }),
    superStickerDetails: z.object({
      amountDisplayString: z.string(),
      amountMicros: z.string(),
      currency: z.string(),
      superStickerMetadata: z.object({
        altText: z.string(),
        altTextLanguage: z.string(),
        stickerId: z.string(),
      }),
      tier: z.number(),
    }),
    textMessageDetails: z.object({
      messageText: z.string(),
    }),
    type: z.string(),
    userBannedDetails: z.object({
      banDurationSeconds: z.string(),
      banType: z.string(),
      bannedUserDetails: z.object({
        channelId: z.string(),
        channelUrl: z.string(),
        displayName: z.string(),
        profileImageUrl: z.string(),
      }),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  authorDetails: z.object({
    channelId: z.string().describe("The YouTube channel ID.").optional(),
    channelUrl: z.string().describe("The channel's URL.").optional(),
    displayName: z.string().describe("The channel's display name.").optional(),
    isChatModerator: z.boolean().describe(
      "Whether the author is a moderator of the live chat.",
    ).optional(),
    isChatOwner: z.boolean().describe(
      "Whether the author is the owner of the live chat.",
    ).optional(),
    isChatSponsor: z.boolean().describe(
      "Whether the author is a sponsor of the live chat.",
    ).optional(),
    isVerified: z.boolean().describe(
      "Whether the author's identity has been verified by YouTube.",
    ).optional(),
    profileImageUrl: z.string().describe("The channels's avatar URL.")
      .optional(),
  }).optional(),
  id: z.string().describe(
    "The ID that YouTube assigns to uniquely identify the message.",
  ).optional(),
  snippet: z.object({
    authorChannelId: z.string().describe(
      "The ID of the user that authored this message, this field is not always filled. textMessageEvent - the user that wrote the message fanFundingEvent - the user that funded the broadcast newSponsorEvent - the user that just became a sponsor memberMilestoneChatEvent - the member that sent the message membershipGiftingEvent - the user that made the purchase giftMembershipReceivedEvent - the user that received the gift membership messageDeletedEvent - the moderator that took the action messageRetractedEvent - the author that retracted their message userBannedEvent - the moderator that took the action superChatEvent - the user that made the purchase superStickerEvent - the user that made the purchase pollEvent - the user that created the poll",
    ).optional(),
    displayMessage: z.string().describe(
      "Contains a string that can be displayed to the user. If this field is not present the message is silent, at the moment only messages of type TOMBSTONE and CHAT_ENDED_EVENT are silent.",
    ).optional(),
    fanFundingEventDetails: z.object({
      amountDisplayString: z.string().describe(
        "A rendered string that displays the fund amount and currency to the user.",
      ).optional(),
      amountMicros: z.string().describe("The amount of the fund.").optional(),
      currency: z.string().describe("The currency in which the fund was made.")
        .optional(),
      userComment: z.string().describe(
        "The comment added by the user to this fan funding event.",
      ).optional(),
    }).optional(),
    giftDetails: z.object({
      altText: z.string().describe(
        "The alternative text to be used for accessibility.",
      ).optional(),
      comboCount: z.number().int().describe(
        "The number of times the gift has been sent in a row.",
      ).optional(),
      giftDuration: z.string().describe("The duration of the gift.").optional(),
      giftName: z.string().describe("The name of the gift.").optional(),
      giftUrl: z.string().describe("The URL of the gift image.").optional(),
      hasVisualEffect: z.boolean().describe(
        "Whether the gift involves a visual effect.",
      ).optional(),
      jewelsAmount: z.number().int().describe(
        "The value of the gift in jewels.",
      ).optional(),
      language: z.string().describe("The BCP-47 language code of the gift.")
        .optional(),
    }).describe(
      "Details about the gift event, this is only set if the type is 'giftEvent'.",
    ).optional(),
    giftMembershipReceivedDetails: z.object({
      associatedMembershipGiftingMessageId: z.string().describe(
        "The ID of the membership gifting message that is related to this gift membership. This ID will always refer to a message whose type is 'membershipGiftingEvent'.",
      ).optional(),
      gifterChannelId: z.string().describe(
        "The ID of the user that made the membership gifting purchase. This matches the `snippet.authorChannelId` of the associated membership gifting message.",
      ).optional(),
      memberLevelName: z.string().describe(
        "The name of the Level at which the viewer is a member. This matches the `snippet.membershipGiftingDetails.giftMembershipsLevelName` of the associated membership gifting message. The Level names are defined by the YouTube channel offering the Membership. In some situations this field isn't filled.",
      ).optional(),
    }).optional(),
    hasDisplayContent: z.boolean().describe(
      "Whether the message has display content that should be displayed to users.",
    ).optional(),
    liveChatId: z.string().optional(),
    memberMilestoneChatDetails: z.object({
      memberLevelName: z.string().describe(
        "The name of the Level at which the viever is a member. The Level names are defined by the YouTube channel offering the Membership. In some situations this field isn't filled.",
      ).optional(),
      memberMonth: z.number().int().describe(
        "The total amount of months (rounded up) the viewer has been a member that granted them this Member Milestone Chat. This is the same number of months as is being displayed to YouTube users.",
      ).optional(),
      userComment: z.string().describe(
        "The comment added by the member to this Member Milestone Chat. This field is empty for messages without a comment from the member.",
      ).optional(),
    }).optional(),
    membershipGiftingDetails: z.object({
      giftMembershipsCount: z.number().int().describe(
        "The number of gift memberships purchased by the user.",
      ).optional(),
      giftMembershipsLevelName: z.string().describe(
        "The name of the level of the gift memberships purchased by the user. The Level names are defined by the YouTube channel offering the Membership. In some situations this field isn't filled.",
      ).optional(),
    }).optional(),
    messageDeletedDetails: z.object({
      deletedMessageId: z.string().optional(),
    }).optional(),
    messageRetractedDetails: z.object({
      retractedMessageId: z.string().optional(),
    }).optional(),
    newSponsorDetails: z.object({
      isUpgrade: z.boolean().describe(
        "If the viewer just had upgraded from a lower level. For viewers that were not members at the time of purchase, this field is false.",
      ).optional(),
      memberLevelName: z.string().describe(
        "The name of the Level that the viewer just had joined. The Level names are defined by the YouTube channel offering the Membership. In some situations this field isn't filled.",
      ).optional(),
    }).optional(),
    pollDetails: z.object({
      metadata: z.object({
        options: z.array(z.object({
          optionText: z.unknown().optional(),
          tally: z.unknown().optional(),
        })).describe(
          "The options will be returned in the order that is displayed in 1P",
        ).optional(),
        questionText: z.string().optional(),
      }).optional(),
      status: z.enum(["unknown", "active", "closed"]).optional(),
    }).optional(),
    publishedAt: z.string().describe(
      "The date and time when the message was orignally published.",
    ).optional(),
    superChatDetails: z.object({
      amountDisplayString: z.string().describe(
        "A rendered string that displays the fund amount and currency to the user.",
      ).optional(),
      amountMicros: z.string().describe(
        "The amount purchased by the user, in micros (1,750,000 micros = 1.75).",
      ).optional(),
      currency: z.string().describe(
        "The currency in which the purchase was made.",
      ).optional(),
      tier: z.number().int().describe(
        "The tier in which the amount belongs. Lower amounts belong to lower tiers. The lowest tier is 1.",
      ).optional(),
      userComment: z.string().describe(
        "The comment added by the user to this Super Chat event.",
      ).optional(),
    }).optional(),
    superStickerDetails: z.object({
      amountDisplayString: z.string().describe(
        "A rendered string that displays the fund amount and currency to the user.",
      ).optional(),
      amountMicros: z.string().describe(
        "The amount purchased by the user, in micros (1,750,000 micros = 1.75).",
      ).optional(),
      currency: z.string().describe(
        "The currency in which the purchase was made.",
      ).optional(),
      superStickerMetadata: z.object({
        altText: z.string().describe(
          "Internationalized alt text that describes the sticker image and any animation associated with it.",
        ).optional(),
        altTextLanguage: z.string().describe(
          "Specifies the localization language in which the alt text is returned.",
        ).optional(),
        stickerId: z.string().describe(
          "Unique identifier of the Super Sticker. This is a shorter form of the alt_text that includes pack name and a recognizable characteristic of the sticker.",
        ).optional(),
      }).optional(),
      tier: z.number().int().describe(
        "The tier in which the amount belongs. Lower amounts belong to lower tiers. The lowest tier is 1.",
      ).optional(),
    }).optional(),
    textMessageDetails: z.object({
      messageText: z.string().describe("The user's message.").optional(),
    }).optional(),
    type: z.enum([
      "invalidType",
      "textMessageEvent",
      "tombstone",
      "fanFundingEvent",
      "chatEndedEvent",
      "sponsorOnlyModeStartedEvent",
      "sponsorOnlyModeEndedEvent",
      "newSponsorEvent",
      "memberMilestoneChatEvent",
      "membershipGiftingEvent",
      "giftMembershipReceivedEvent",
      "messageDeletedEvent",
      "messageRetractedEvent",
      "userBannedEvent",
      "superChatEvent",
      "superStickerEvent",
      "pollEvent",
      "giftEvent",
    ]).describe(
      "The type of message, this will always be present, it determines the contents of the message as well as which fields will be present.",
    ).optional(),
    userBannedDetails: z.object({
      banDurationSeconds: z.string().describe(
        "The duration of the ban. This property is only present if the banType is temporary.",
      ).optional(),
      banType: z.enum(["permanent", "temporary"]).describe("The type of ban.")
        .optional(),
      bannedUserDetails: z.object({
        channelId: z.string().describe("The YouTube channel ID.").optional(),
        channelUrl: z.string().describe("The channel's URL.").optional(),
        displayName: z.string().describe("The channel's display name.")
          .optional(),
        profileImageUrl: z.string().describe("The channels's avatar URL.")
          .optional(),
      }).optional(),
    }).optional(),
  }).describe("Next ID: 35").optional(),
  part: z.string().describe(
    "The *part* parameter serves two purposes. It identifies the properties that the write operation will set as well as the properties that the API response will include. Set the parameter value to snippet.",
  ).optional(),
});

/** Swamp extension model for Google Cloud YouTube Data LiveChatMessages. Registered at `@swamp/gcp/youtube/livechatmessages`. */
export const model = {
  type: "@swamp/gcp/youtube/livechatmessages",
  version: "2026.05.21.1",
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
      toVersion: "2026.05.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A *liveChatMessage* resource represents a chat message in a YouTube Live Chat.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a liveChatMessages",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["part"] !== undefined) params["part"] = String(g["part"]);
        const body: Record<string, unknown> = {};
        if (g["authorDetails"] !== undefined) {
          body["authorDetails"] = g["authorDetails"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["snippet"] !== undefined) body["snippet"] = g["snippet"];
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          undefined,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "liveChatId": String(g["liveChatId"] ?? ""),
              "part": String(g["part"] ?? ""),
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
      description: "Get a liveChatMessages",
      arguments: z.object({
        identifier: z.string().describe("The name of the liveChatMessages"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["liveChatId"] !== undefined) {
          params["liveChatId"] = String(g["liveChatId"]);
        }
        if (g["part"] !== undefined) params["part"] = String(g["part"]);
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
    delete: {
      description: "Delete the liveChatMessages",
      arguments: z.object({
        identifier: z.string().describe("The name of the liveChatMessages"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["id"] = args.identifier;
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
      description: "Sync liveChatMessages state from GCP",
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
          if (g["liveChatId"] !== undefined) {
            params["liveChatId"] = String(g["liveChatId"]);
          } else if (existing["liveChatId"]) {
            params["liveChatId"] = String(existing["liveChatId"]);
          }
          if (g["part"] !== undefined) params["part"] = String(g["part"]);
          else if (existing["part"]) params["part"] = String(existing["part"]);
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
    transition: {
      description: "transition",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const result = await createResource(
          BASE_URL,
          {
            "id": "youtube.liveChatMessages.transition",
            "path": "youtube/v3/liveChat/messages/transition",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": {
              "id": { "location": "query" },
              "status": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
