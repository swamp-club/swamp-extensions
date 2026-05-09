// Auto-generated extension model for @swamp/gcp/chat/spaces-spaceevents
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Chat Spaces.SpaceEvents.
 *
 * An event that represents a change or activity in a Google Chat space. To learn more, see [Work with events from Google Chat](https://developers.google.com/workspace/chat/events-overview).
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
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/spaceEvents/${shortName}`;
}

const BASE_URL = "https://chat.googleapis.com/";

const GET_CONFIG = {
  "id": "chat.spaces.spaceEvents.get",
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  eventTime: z.string().optional(),
  eventType: z.string().optional(),
  membershipBatchCreatedEventData: z.object({
    memberships: z.array(z.object({
      membership: z.object({
        createTime: z.string(),
        deleteTime: z.string(),
        groupMember: z.object({
          name: z.unknown(),
        }),
        member: z.object({
          displayName: z.unknown(),
          domainId: z.unknown(),
          isAnonymous: z.unknown(),
          name: z.unknown(),
          type: z.unknown(),
        }),
        name: z.string(),
        role: z.string(),
        state: z.string(),
      }),
    })),
  }).optional(),
  membershipBatchDeletedEventData: z.object({
    memberships: z.array(z.object({
      membership: z.object({
        createTime: z.string(),
        deleteTime: z.string(),
        groupMember: z.object({
          name: z.unknown(),
        }),
        member: z.object({
          displayName: z.unknown(),
          domainId: z.unknown(),
          isAnonymous: z.unknown(),
          name: z.unknown(),
          type: z.unknown(),
        }),
        name: z.string(),
        role: z.string(),
        state: z.string(),
      }),
    })),
  }).optional(),
  membershipBatchUpdatedEventData: z.object({
    memberships: z.array(z.object({
      membership: z.object({
        createTime: z.string(),
        deleteTime: z.string(),
        groupMember: z.object({
          name: z.unknown(),
        }),
        member: z.object({
          displayName: z.unknown(),
          domainId: z.unknown(),
          isAnonymous: z.unknown(),
          name: z.unknown(),
          type: z.unknown(),
        }),
        name: z.string(),
        role: z.string(),
        state: z.string(),
      }),
    })),
  }).optional(),
  membershipCreatedEventData: z.object({
    membership: z.object({
      createTime: z.string(),
      deleteTime: z.string(),
      groupMember: z.object({
        name: z.string(),
      }),
      member: z.object({
        displayName: z.string(),
        domainId: z.string(),
        isAnonymous: z.boolean(),
        name: z.string(),
        type: z.string(),
      }),
      name: z.string(),
      role: z.string(),
      state: z.string(),
    }),
  }).optional(),
  membershipDeletedEventData: z.object({
    membership: z.object({
      createTime: z.string(),
      deleteTime: z.string(),
      groupMember: z.object({
        name: z.string(),
      }),
      member: z.object({
        displayName: z.string(),
        domainId: z.string(),
        isAnonymous: z.boolean(),
        name: z.string(),
        type: z.string(),
      }),
      name: z.string(),
      role: z.string(),
      state: z.string(),
    }),
  }).optional(),
  membershipUpdatedEventData: z.object({
    membership: z.object({
      createTime: z.string(),
      deleteTime: z.string(),
      groupMember: z.object({
        name: z.string(),
      }),
      member: z.object({
        displayName: z.string(),
        domainId: z.string(),
        isAnonymous: z.boolean(),
        name: z.string(),
        type: z.string(),
      }),
      name: z.string(),
      role: z.string(),
      state: z.string(),
    }),
  }).optional(),
  messageBatchCreatedEventData: z.object({
    messages: z.array(z.object({
      message: z.object({
        accessoryWidgets: z.array(z.unknown()),
        actionResponse: z.object({
          dialogAction: z.unknown(),
          type: z.unknown(),
          updatedWidget: z.unknown(),
          url: z.unknown(),
        }),
        annotations: z.array(z.unknown()),
        argumentText: z.string(),
        attachedGifs: z.array(z.unknown()),
        attachment: z.array(z.unknown()),
        cards: z.array(z.unknown()),
        cardsV2: z.array(z.unknown()),
        clientAssignedMessageId: z.string(),
        createTime: z.string(),
        deleteTime: z.string(),
        deletionMetadata: z.object({
          deletionType: z.unknown(),
        }),
        emojiReactionSummaries: z.array(z.unknown()),
        fallbackText: z.string(),
        formattedText: z.string(),
        lastUpdateTime: z.string(),
        matchedUrl: z.object({
          url: z.unknown(),
        }),
        name: z.string(),
        privateMessageViewer: z.object({
          displayName: z.unknown(),
          domainId: z.unknown(),
          isAnonymous: z.unknown(),
          name: z.unknown(),
          type: z.unknown(),
        }),
        quotedMessageMetadata: z.object({
          forwardedMetadata: z.unknown(),
          lastUpdateTime: z.unknown(),
          name: z.unknown(),
          quoteType: z.unknown(),
          quotedMessageSnapshot: z.unknown(),
        }),
        sender: z.object({
          displayName: z.unknown(),
          domainId: z.unknown(),
          isAnonymous: z.unknown(),
          name: z.unknown(),
          type: z.unknown(),
        }),
        silent: z.boolean(),
        slashCommand: z.object({
          commandId: z.unknown(),
        }),
        space: z.object({
          accessSettings: z.unknown(),
          adminInstalled: z.unknown(),
          createTime: z.unknown(),
          customer: z.unknown(),
          displayName: z.unknown(),
          externalUserAllowed: z.unknown(),
          importMode: z.unknown(),
          importModeExpireTime: z.unknown(),
          lastActiveTime: z.unknown(),
          membershipCount: z.unknown(),
          name: z.unknown(),
          permissionSettings: z.unknown(),
          predefinedPermissionSettings: z.unknown(),
          singleUserBotDm: z.unknown(),
          spaceDetails: z.unknown(),
          spaceHistoryState: z.unknown(),
          spaceThreadingState: z.unknown(),
          spaceType: z.unknown(),
          spaceUri: z.unknown(),
          threaded: z.unknown(),
          type: z.unknown(),
        }),
        text: z.string(),
        thread: z.object({
          name: z.unknown(),
          threadKey: z.unknown(),
        }),
        threadReply: z.boolean(),
      }),
    })),
  }).optional(),
  messageBatchDeletedEventData: z.object({
    messages: z.array(z.object({
      message: z.object({
        accessoryWidgets: z.array(z.unknown()),
        actionResponse: z.object({
          dialogAction: z.unknown(),
          type: z.unknown(),
          updatedWidget: z.unknown(),
          url: z.unknown(),
        }),
        annotations: z.array(z.unknown()),
        argumentText: z.string(),
        attachedGifs: z.array(z.unknown()),
        attachment: z.array(z.unknown()),
        cards: z.array(z.unknown()),
        cardsV2: z.array(z.unknown()),
        clientAssignedMessageId: z.string(),
        createTime: z.string(),
        deleteTime: z.string(),
        deletionMetadata: z.object({
          deletionType: z.unknown(),
        }),
        emojiReactionSummaries: z.array(z.unknown()),
        fallbackText: z.string(),
        formattedText: z.string(),
        lastUpdateTime: z.string(),
        matchedUrl: z.object({
          url: z.unknown(),
        }),
        name: z.string(),
        privateMessageViewer: z.object({
          displayName: z.unknown(),
          domainId: z.unknown(),
          isAnonymous: z.unknown(),
          name: z.unknown(),
          type: z.unknown(),
        }),
        quotedMessageMetadata: z.object({
          forwardedMetadata: z.unknown(),
          lastUpdateTime: z.unknown(),
          name: z.unknown(),
          quoteType: z.unknown(),
          quotedMessageSnapshot: z.unknown(),
        }),
        sender: z.object({
          displayName: z.unknown(),
          domainId: z.unknown(),
          isAnonymous: z.unknown(),
          name: z.unknown(),
          type: z.unknown(),
        }),
        silent: z.boolean(),
        slashCommand: z.object({
          commandId: z.unknown(),
        }),
        space: z.object({
          accessSettings: z.unknown(),
          adminInstalled: z.unknown(),
          createTime: z.unknown(),
          customer: z.unknown(),
          displayName: z.unknown(),
          externalUserAllowed: z.unknown(),
          importMode: z.unknown(),
          importModeExpireTime: z.unknown(),
          lastActiveTime: z.unknown(),
          membershipCount: z.unknown(),
          name: z.unknown(),
          permissionSettings: z.unknown(),
          predefinedPermissionSettings: z.unknown(),
          singleUserBotDm: z.unknown(),
          spaceDetails: z.unknown(),
          spaceHistoryState: z.unknown(),
          spaceThreadingState: z.unknown(),
          spaceType: z.unknown(),
          spaceUri: z.unknown(),
          threaded: z.unknown(),
          type: z.unknown(),
        }),
        text: z.string(),
        thread: z.object({
          name: z.unknown(),
          threadKey: z.unknown(),
        }),
        threadReply: z.boolean(),
      }),
    })),
  }).optional(),
  messageBatchUpdatedEventData: z.object({
    messages: z.array(z.object({
      message: z.object({
        accessoryWidgets: z.array(z.unknown()),
        actionResponse: z.object({
          dialogAction: z.unknown(),
          type: z.unknown(),
          updatedWidget: z.unknown(),
          url: z.unknown(),
        }),
        annotations: z.array(z.unknown()),
        argumentText: z.string(),
        attachedGifs: z.array(z.unknown()),
        attachment: z.array(z.unknown()),
        cards: z.array(z.unknown()),
        cardsV2: z.array(z.unknown()),
        clientAssignedMessageId: z.string(),
        createTime: z.string(),
        deleteTime: z.string(),
        deletionMetadata: z.object({
          deletionType: z.unknown(),
        }),
        emojiReactionSummaries: z.array(z.unknown()),
        fallbackText: z.string(),
        formattedText: z.string(),
        lastUpdateTime: z.string(),
        matchedUrl: z.object({
          url: z.unknown(),
        }),
        name: z.string(),
        privateMessageViewer: z.object({
          displayName: z.unknown(),
          domainId: z.unknown(),
          isAnonymous: z.unknown(),
          name: z.unknown(),
          type: z.unknown(),
        }),
        quotedMessageMetadata: z.object({
          forwardedMetadata: z.unknown(),
          lastUpdateTime: z.unknown(),
          name: z.unknown(),
          quoteType: z.unknown(),
          quotedMessageSnapshot: z.unknown(),
        }),
        sender: z.object({
          displayName: z.unknown(),
          domainId: z.unknown(),
          isAnonymous: z.unknown(),
          name: z.unknown(),
          type: z.unknown(),
        }),
        silent: z.boolean(),
        slashCommand: z.object({
          commandId: z.unknown(),
        }),
        space: z.object({
          accessSettings: z.unknown(),
          adminInstalled: z.unknown(),
          createTime: z.unknown(),
          customer: z.unknown(),
          displayName: z.unknown(),
          externalUserAllowed: z.unknown(),
          importMode: z.unknown(),
          importModeExpireTime: z.unknown(),
          lastActiveTime: z.unknown(),
          membershipCount: z.unknown(),
          name: z.unknown(),
          permissionSettings: z.unknown(),
          predefinedPermissionSettings: z.unknown(),
          singleUserBotDm: z.unknown(),
          spaceDetails: z.unknown(),
          spaceHistoryState: z.unknown(),
          spaceThreadingState: z.unknown(),
          spaceType: z.unknown(),
          spaceUri: z.unknown(),
          threaded: z.unknown(),
          type: z.unknown(),
        }),
        text: z.string(),
        thread: z.object({
          name: z.unknown(),
          threadKey: z.unknown(),
        }),
        threadReply: z.boolean(),
      }),
    })),
  }).optional(),
  messageCreatedEventData: z.object({
    message: z.object({
      accessoryWidgets: z.array(z.object({
        buttonList: z.object({
          buttons: z.unknown(),
        }),
      })),
      actionResponse: z.object({
        dialogAction: z.object({
          actionStatus: z.object({
            statusCode: z.unknown(),
            userFacingMessage: z.unknown(),
          }),
          dialog: z.object({
            body: z.unknown(),
          }),
        }),
        type: z.string(),
        updatedWidget: z.object({
          suggestions: z.object({
            items: z.unknown(),
          }),
          widget: z.string(),
        }),
        url: z.string(),
      }),
      annotations: z.array(z.object({
        customEmojiMetadata: z.object({
          customEmoji: z.unknown(),
        }),
        length: z.number(),
        richLinkMetadata: z.object({
          calendarEventLinkData: z.unknown(),
          chatSpaceLinkData: z.unknown(),
          driveLinkData: z.unknown(),
          meetSpaceLinkData: z.unknown(),
          richLinkType: z.unknown(),
          uri: z.unknown(),
        }),
        slashCommand: z.object({
          bot: z.unknown(),
          commandId: z.unknown(),
          commandName: z.unknown(),
          triggersDialog: z.unknown(),
          type: z.unknown(),
        }),
        startIndex: z.number(),
        type: z.string(),
        userMention: z.object({
          type: z.unknown(),
          user: z.unknown(),
        }),
      })),
      argumentText: z.string(),
      attachedGifs: z.array(z.object({
        uri: z.string(),
      })),
      attachment: z.array(z.object({
        attachmentDataRef: z.object({
          attachmentUploadToken: z.unknown(),
          resourceName: z.unknown(),
        }),
        contentName: z.string(),
        contentType: z.string(),
        downloadUri: z.string(),
        driveDataRef: z.object({
          driveFileId: z.unknown(),
        }),
        name: z.string(),
        source: z.string(),
        thumbnailUri: z.string(),
      })),
      cards: z.array(z.object({
        cardActions: z.array(z.unknown()),
        header: z.object({
          imageStyle: z.unknown(),
          imageUrl: z.unknown(),
          subtitle: z.unknown(),
          title: z.unknown(),
        }),
        name: z.string(),
        sections: z.array(z.unknown()),
      })),
      cardsV2: z.array(z.object({
        card: z.object({
          cardActions: z.unknown(),
          displayStyle: z.unknown(),
          expressionData: z.unknown(),
          fixedFooter: z.unknown(),
          header: z.unknown(),
          name: z.unknown(),
          peekCardHeader: z.unknown(),
          sectionDividerStyle: z.unknown(),
          sections: z.unknown(),
        }),
        cardId: z.string(),
      })),
      clientAssignedMessageId: z.string(),
      createTime: z.string(),
      deleteTime: z.string(),
      deletionMetadata: z.object({
        deletionType: z.string(),
      }),
      emojiReactionSummaries: z.array(z.object({
        emoji: z.object({
          customEmoji: z.unknown(),
          unicode: z.unknown(),
        }),
        reactionCount: z.number(),
      })),
      fallbackText: z.string(),
      formattedText: z.string(),
      lastUpdateTime: z.string(),
      matchedUrl: z.object({
        url: z.string(),
      }),
      name: z.string(),
      privateMessageViewer: z.object({
        displayName: z.string(),
        domainId: z.string(),
        isAnonymous: z.boolean(),
        name: z.string(),
        type: z.string(),
      }),
      quotedMessageMetadata: z.object({
        forwardedMetadata: z.object({
          space: z.string(),
          spaceDisplayName: z.string(),
        }),
        lastUpdateTime: z.string(),
        name: z.string(),
        quoteType: z.string(),
        quotedMessageSnapshot: z.object({
          annotations: z.array(z.unknown()),
          attachments: z.array(z.unknown()),
          formattedText: z.string(),
          sender: z.string(),
          text: z.string(),
        }),
      }),
      sender: z.object({
        displayName: z.string(),
        domainId: z.string(),
        isAnonymous: z.boolean(),
        name: z.string(),
        type: z.string(),
      }),
      silent: z.boolean(),
      slashCommand: z.object({
        commandId: z.string(),
      }),
      space: z.object({
        accessSettings: z.object({
          accessState: z.string(),
          audience: z.string(),
        }),
        adminInstalled: z.boolean(),
        createTime: z.string(),
        customer: z.string(),
        displayName: z.string(),
        externalUserAllowed: z.boolean(),
        importMode: z.boolean(),
        importModeExpireTime: z.string(),
        lastActiveTime: z.string(),
        membershipCount: z.object({
          joinedDirectHumanUserCount: z.number(),
          joinedGroupCount: z.number(),
        }),
        name: z.string(),
        permissionSettings: z.object({
          manageApps: z.object({
            assistantManagersAllowed: z.unknown(),
            managersAllowed: z.unknown(),
            membersAllowed: z.unknown(),
          }),
          manageMembersAndGroups: z.object({
            assistantManagersAllowed: z.unknown(),
            managersAllowed: z.unknown(),
            membersAllowed: z.unknown(),
          }),
          manageWebhooks: z.object({
            assistantManagersAllowed: z.unknown(),
            managersAllowed: z.unknown(),
            membersAllowed: z.unknown(),
          }),
          modifySpaceDetails: z.object({
            assistantManagersAllowed: z.unknown(),
            managersAllowed: z.unknown(),
            membersAllowed: z.unknown(),
          }),
          postMessages: z.object({
            assistantManagersAllowed: z.unknown(),
            managersAllowed: z.unknown(),
            membersAllowed: z.unknown(),
          }),
          replyMessages: z.object({
            assistantManagersAllowed: z.unknown(),
            managersAllowed: z.unknown(),
            membersAllowed: z.unknown(),
          }),
          toggleHistory: z.object({
            assistantManagersAllowed: z.unknown(),
            managersAllowed: z.unknown(),
            membersAllowed: z.unknown(),
          }),
          useAtMentionAll: z.object({
            assistantManagersAllowed: z.unknown(),
            managersAllowed: z.unknown(),
            membersAllowed: z.unknown(),
          }),
        }),
        predefinedPermissionSettings: z.string(),
        singleUserBotDm: z.boolean(),
        spaceDetails: z.object({
          description: z.string(),
          guidelines: z.string(),
        }),
        spaceHistoryState: z.string(),
        spaceThreadingState: z.string(),
        spaceType: z.string(),
        spaceUri: z.string(),
        threaded: z.boolean(),
        type: z.string(),
      }),
      text: z.string(),
      thread: z.object({
        name: z.string(),
        threadKey: z.string(),
      }),
      threadReply: z.boolean(),
    }),
  }).optional(),
  messageDeletedEventData: z.object({
    message: z.object({
      accessoryWidgets: z.array(z.object({
        buttonList: z.object({
          buttons: z.unknown(),
        }),
      })),
      actionResponse: z.object({
        dialogAction: z.object({
          actionStatus: z.object({
            statusCode: z.unknown(),
            userFacingMessage: z.unknown(),
          }),
          dialog: z.object({
            body: z.unknown(),
          }),
        }),
        type: z.string(),
        updatedWidget: z.object({
          suggestions: z.object({
            items: z.unknown(),
          }),
          widget: z.string(),
        }),
        url: z.string(),
      }),
      annotations: z.array(z.object({
        customEmojiMetadata: z.object({
          customEmoji: z.unknown(),
        }),
        length: z.number(),
        richLinkMetadata: z.object({
          calendarEventLinkData: z.unknown(),
          chatSpaceLinkData: z.unknown(),
          driveLinkData: z.unknown(),
          meetSpaceLinkData: z.unknown(),
          richLinkType: z.unknown(),
          uri: z.unknown(),
        }),
        slashCommand: z.object({
          bot: z.unknown(),
          commandId: z.unknown(),
          commandName: z.unknown(),
          triggersDialog: z.unknown(),
          type: z.unknown(),
        }),
        startIndex: z.number(),
        type: z.string(),
        userMention: z.object({
          type: z.unknown(),
          user: z.unknown(),
        }),
      })),
      argumentText: z.string(),
      attachedGifs: z.array(z.object({
        uri: z.string(),
      })),
      attachment: z.array(z.object({
        attachmentDataRef: z.object({
          attachmentUploadToken: z.unknown(),
          resourceName: z.unknown(),
        }),
        contentName: z.string(),
        contentType: z.string(),
        downloadUri: z.string(),
        driveDataRef: z.object({
          driveFileId: z.unknown(),
        }),
        name: z.string(),
        source: z.string(),
        thumbnailUri: z.string(),
      })),
      cards: z.array(z.object({
        cardActions: z.array(z.unknown()),
        header: z.object({
          imageStyle: z.unknown(),
          imageUrl: z.unknown(),
          subtitle: z.unknown(),
          title: z.unknown(),
        }),
        name: z.string(),
        sections: z.array(z.unknown()),
      })),
      cardsV2: z.array(z.object({
        card: z.object({
          cardActions: z.unknown(),
          displayStyle: z.unknown(),
          expressionData: z.unknown(),
          fixedFooter: z.unknown(),
          header: z.unknown(),
          name: z.unknown(),
          peekCardHeader: z.unknown(),
          sectionDividerStyle: z.unknown(),
          sections: z.unknown(),
        }),
        cardId: z.string(),
      })),
      clientAssignedMessageId: z.string(),
      createTime: z.string(),
      deleteTime: z.string(),
      deletionMetadata: z.object({
        deletionType: z.string(),
      }),
      emojiReactionSummaries: z.array(z.object({
        emoji: z.object({
          customEmoji: z.unknown(),
          unicode: z.unknown(),
        }),
        reactionCount: z.number(),
      })),
      fallbackText: z.string(),
      formattedText: z.string(),
      lastUpdateTime: z.string(),
      matchedUrl: z.object({
        url: z.string(),
      }),
      name: z.string(),
      privateMessageViewer: z.object({
        displayName: z.string(),
        domainId: z.string(),
        isAnonymous: z.boolean(),
        name: z.string(),
        type: z.string(),
      }),
      quotedMessageMetadata: z.object({
        forwardedMetadata: z.object({
          space: z.string(),
          spaceDisplayName: z.string(),
        }),
        lastUpdateTime: z.string(),
        name: z.string(),
        quoteType: z.string(),
        quotedMessageSnapshot: z.object({
          annotations: z.array(z.unknown()),
          attachments: z.array(z.unknown()),
          formattedText: z.string(),
          sender: z.string(),
          text: z.string(),
        }),
      }),
      sender: z.object({
        displayName: z.string(),
        domainId: z.string(),
        isAnonymous: z.boolean(),
        name: z.string(),
        type: z.string(),
      }),
      silent: z.boolean(),
      slashCommand: z.object({
        commandId: z.string(),
      }),
      space: z.object({
        accessSettings: z.object({
          accessState: z.string(),
          audience: z.string(),
        }),
        adminInstalled: z.boolean(),
        createTime: z.string(),
        customer: z.string(),
        displayName: z.string(),
        externalUserAllowed: z.boolean(),
        importMode: z.boolean(),
        importModeExpireTime: z.string(),
        lastActiveTime: z.string(),
        membershipCount: z.object({
          joinedDirectHumanUserCount: z.number(),
          joinedGroupCount: z.number(),
        }),
        name: z.string(),
        permissionSettings: z.object({
          manageApps: z.object({
            assistantManagersAllowed: z.unknown(),
            managersAllowed: z.unknown(),
            membersAllowed: z.unknown(),
          }),
          manageMembersAndGroups: z.object({
            assistantManagersAllowed: z.unknown(),
            managersAllowed: z.unknown(),
            membersAllowed: z.unknown(),
          }),
          manageWebhooks: z.object({
            assistantManagersAllowed: z.unknown(),
            managersAllowed: z.unknown(),
            membersAllowed: z.unknown(),
          }),
          modifySpaceDetails: z.object({
            assistantManagersAllowed: z.unknown(),
            managersAllowed: z.unknown(),
            membersAllowed: z.unknown(),
          }),
          postMessages: z.object({
            assistantManagersAllowed: z.unknown(),
            managersAllowed: z.unknown(),
            membersAllowed: z.unknown(),
          }),
          replyMessages: z.object({
            assistantManagersAllowed: z.unknown(),
            managersAllowed: z.unknown(),
            membersAllowed: z.unknown(),
          }),
          toggleHistory: z.object({
            assistantManagersAllowed: z.unknown(),
            managersAllowed: z.unknown(),
            membersAllowed: z.unknown(),
          }),
          useAtMentionAll: z.object({
            assistantManagersAllowed: z.unknown(),
            managersAllowed: z.unknown(),
            membersAllowed: z.unknown(),
          }),
        }),
        predefinedPermissionSettings: z.string(),
        singleUserBotDm: z.boolean(),
        spaceDetails: z.object({
          description: z.string(),
          guidelines: z.string(),
        }),
        spaceHistoryState: z.string(),
        spaceThreadingState: z.string(),
        spaceType: z.string(),
        spaceUri: z.string(),
        threaded: z.boolean(),
        type: z.string(),
      }),
      text: z.string(),
      thread: z.object({
        name: z.string(),
        threadKey: z.string(),
      }),
      threadReply: z.boolean(),
    }),
  }).optional(),
  messageUpdatedEventData: z.object({
    message: z.object({
      accessoryWidgets: z.array(z.object({
        buttonList: z.object({
          buttons: z.unknown(),
        }),
      })),
      actionResponse: z.object({
        dialogAction: z.object({
          actionStatus: z.object({
            statusCode: z.unknown(),
            userFacingMessage: z.unknown(),
          }),
          dialog: z.object({
            body: z.unknown(),
          }),
        }),
        type: z.string(),
        updatedWidget: z.object({
          suggestions: z.object({
            items: z.unknown(),
          }),
          widget: z.string(),
        }),
        url: z.string(),
      }),
      annotations: z.array(z.object({
        customEmojiMetadata: z.object({
          customEmoji: z.unknown(),
        }),
        length: z.number(),
        richLinkMetadata: z.object({
          calendarEventLinkData: z.unknown(),
          chatSpaceLinkData: z.unknown(),
          driveLinkData: z.unknown(),
          meetSpaceLinkData: z.unknown(),
          richLinkType: z.unknown(),
          uri: z.unknown(),
        }),
        slashCommand: z.object({
          bot: z.unknown(),
          commandId: z.unknown(),
          commandName: z.unknown(),
          triggersDialog: z.unknown(),
          type: z.unknown(),
        }),
        startIndex: z.number(),
        type: z.string(),
        userMention: z.object({
          type: z.unknown(),
          user: z.unknown(),
        }),
      })),
      argumentText: z.string(),
      attachedGifs: z.array(z.object({
        uri: z.string(),
      })),
      attachment: z.array(z.object({
        attachmentDataRef: z.object({
          attachmentUploadToken: z.unknown(),
          resourceName: z.unknown(),
        }),
        contentName: z.string(),
        contentType: z.string(),
        downloadUri: z.string(),
        driveDataRef: z.object({
          driveFileId: z.unknown(),
        }),
        name: z.string(),
        source: z.string(),
        thumbnailUri: z.string(),
      })),
      cards: z.array(z.object({
        cardActions: z.array(z.unknown()),
        header: z.object({
          imageStyle: z.unknown(),
          imageUrl: z.unknown(),
          subtitle: z.unknown(),
          title: z.unknown(),
        }),
        name: z.string(),
        sections: z.array(z.unknown()),
      })),
      cardsV2: z.array(z.object({
        card: z.object({
          cardActions: z.unknown(),
          displayStyle: z.unknown(),
          expressionData: z.unknown(),
          fixedFooter: z.unknown(),
          header: z.unknown(),
          name: z.unknown(),
          peekCardHeader: z.unknown(),
          sectionDividerStyle: z.unknown(),
          sections: z.unknown(),
        }),
        cardId: z.string(),
      })),
      clientAssignedMessageId: z.string(),
      createTime: z.string(),
      deleteTime: z.string(),
      deletionMetadata: z.object({
        deletionType: z.string(),
      }),
      emojiReactionSummaries: z.array(z.object({
        emoji: z.object({
          customEmoji: z.unknown(),
          unicode: z.unknown(),
        }),
        reactionCount: z.number(),
      })),
      fallbackText: z.string(),
      formattedText: z.string(),
      lastUpdateTime: z.string(),
      matchedUrl: z.object({
        url: z.string(),
      }),
      name: z.string(),
      privateMessageViewer: z.object({
        displayName: z.string(),
        domainId: z.string(),
        isAnonymous: z.boolean(),
        name: z.string(),
        type: z.string(),
      }),
      quotedMessageMetadata: z.object({
        forwardedMetadata: z.object({
          space: z.string(),
          spaceDisplayName: z.string(),
        }),
        lastUpdateTime: z.string(),
        name: z.string(),
        quoteType: z.string(),
        quotedMessageSnapshot: z.object({
          annotations: z.array(z.unknown()),
          attachments: z.array(z.unknown()),
          formattedText: z.string(),
          sender: z.string(),
          text: z.string(),
        }),
      }),
      sender: z.object({
        displayName: z.string(),
        domainId: z.string(),
        isAnonymous: z.boolean(),
        name: z.string(),
        type: z.string(),
      }),
      silent: z.boolean(),
      slashCommand: z.object({
        commandId: z.string(),
      }),
      space: z.object({
        accessSettings: z.object({
          accessState: z.string(),
          audience: z.string(),
        }),
        adminInstalled: z.boolean(),
        createTime: z.string(),
        customer: z.string(),
        displayName: z.string(),
        externalUserAllowed: z.boolean(),
        importMode: z.boolean(),
        importModeExpireTime: z.string(),
        lastActiveTime: z.string(),
        membershipCount: z.object({
          joinedDirectHumanUserCount: z.number(),
          joinedGroupCount: z.number(),
        }),
        name: z.string(),
        permissionSettings: z.object({
          manageApps: z.object({
            assistantManagersAllowed: z.unknown(),
            managersAllowed: z.unknown(),
            membersAllowed: z.unknown(),
          }),
          manageMembersAndGroups: z.object({
            assistantManagersAllowed: z.unknown(),
            managersAllowed: z.unknown(),
            membersAllowed: z.unknown(),
          }),
          manageWebhooks: z.object({
            assistantManagersAllowed: z.unknown(),
            managersAllowed: z.unknown(),
            membersAllowed: z.unknown(),
          }),
          modifySpaceDetails: z.object({
            assistantManagersAllowed: z.unknown(),
            managersAllowed: z.unknown(),
            membersAllowed: z.unknown(),
          }),
          postMessages: z.object({
            assistantManagersAllowed: z.unknown(),
            managersAllowed: z.unknown(),
            membersAllowed: z.unknown(),
          }),
          replyMessages: z.object({
            assistantManagersAllowed: z.unknown(),
            managersAllowed: z.unknown(),
            membersAllowed: z.unknown(),
          }),
          toggleHistory: z.object({
            assistantManagersAllowed: z.unknown(),
            managersAllowed: z.unknown(),
            membersAllowed: z.unknown(),
          }),
          useAtMentionAll: z.object({
            assistantManagersAllowed: z.unknown(),
            managersAllowed: z.unknown(),
            membersAllowed: z.unknown(),
          }),
        }),
        predefinedPermissionSettings: z.string(),
        singleUserBotDm: z.boolean(),
        spaceDetails: z.object({
          description: z.string(),
          guidelines: z.string(),
        }),
        spaceHistoryState: z.string(),
        spaceThreadingState: z.string(),
        spaceType: z.string(),
        spaceUri: z.string(),
        threaded: z.boolean(),
        type: z.string(),
      }),
      text: z.string(),
      thread: z.object({
        name: z.string(),
        threadKey: z.string(),
      }),
      threadReply: z.boolean(),
    }),
  }).optional(),
  name: z.string(),
  reactionBatchCreatedEventData: z.object({
    reactions: z.array(z.object({
      reaction: z.object({
        emoji: z.object({
          customEmoji: z.unknown(),
          unicode: z.unknown(),
        }),
        name: z.string(),
        user: z.object({
          displayName: z.unknown(),
          domainId: z.unknown(),
          isAnonymous: z.unknown(),
          name: z.unknown(),
          type: z.unknown(),
        }),
      }),
    })),
  }).optional(),
  reactionBatchDeletedEventData: z.object({
    reactions: z.array(z.object({
      reaction: z.object({
        emoji: z.object({
          customEmoji: z.unknown(),
          unicode: z.unknown(),
        }),
        name: z.string(),
        user: z.object({
          displayName: z.unknown(),
          domainId: z.unknown(),
          isAnonymous: z.unknown(),
          name: z.unknown(),
          type: z.unknown(),
        }),
      }),
    })),
  }).optional(),
  reactionCreatedEventData: z.object({
    reaction: z.object({
      emoji: z.object({
        customEmoji: z.object({
          emojiName: z.string(),
          name: z.string(),
          payload: z.object({
            fileContent: z.unknown(),
            filename: z.unknown(),
          }),
          temporaryImageUri: z.string(),
          uid: z.string(),
        }),
        unicode: z.string(),
      }),
      name: z.string(),
      user: z.object({
        displayName: z.string(),
        domainId: z.string(),
        isAnonymous: z.boolean(),
        name: z.string(),
        type: z.string(),
      }),
    }),
  }).optional(),
  reactionDeletedEventData: z.object({
    reaction: z.object({
      emoji: z.object({
        customEmoji: z.object({
          emojiName: z.string(),
          name: z.string(),
          payload: z.object({
            fileContent: z.unknown(),
            filename: z.unknown(),
          }),
          temporaryImageUri: z.string(),
          uid: z.string(),
        }),
        unicode: z.string(),
      }),
      name: z.string(),
      user: z.object({
        displayName: z.string(),
        domainId: z.string(),
        isAnonymous: z.boolean(),
        name: z.string(),
        type: z.string(),
      }),
    }),
  }).optional(),
  spaceBatchUpdatedEventData: z.object({
    spaces: z.array(z.object({
      space: z.object({
        accessSettings: z.object({
          accessState: z.unknown(),
          audience: z.unknown(),
        }),
        adminInstalled: z.boolean(),
        createTime: z.string(),
        customer: z.string(),
        displayName: z.string(),
        externalUserAllowed: z.boolean(),
        importMode: z.boolean(),
        importModeExpireTime: z.string(),
        lastActiveTime: z.string(),
        membershipCount: z.object({
          joinedDirectHumanUserCount: z.unknown(),
          joinedGroupCount: z.unknown(),
        }),
        name: z.string(),
        permissionSettings: z.object({
          manageApps: z.unknown(),
          manageMembersAndGroups: z.unknown(),
          manageWebhooks: z.unknown(),
          modifySpaceDetails: z.unknown(),
          postMessages: z.unknown(),
          replyMessages: z.unknown(),
          toggleHistory: z.unknown(),
          useAtMentionAll: z.unknown(),
        }),
        predefinedPermissionSettings: z.string(),
        singleUserBotDm: z.boolean(),
        spaceDetails: z.object({
          description: z.unknown(),
          guidelines: z.unknown(),
        }),
        spaceHistoryState: z.string(),
        spaceThreadingState: z.string(),
        spaceType: z.string(),
        spaceUri: z.string(),
        threaded: z.boolean(),
        type: z.string(),
      }),
    })),
  }).optional(),
  spaceUpdatedEventData: z.object({
    space: z.object({
      accessSettings: z.object({
        accessState: z.string(),
        audience: z.string(),
      }),
      adminInstalled: z.boolean(),
      createTime: z.string(),
      customer: z.string(),
      displayName: z.string(),
      externalUserAllowed: z.boolean(),
      importMode: z.boolean(),
      importModeExpireTime: z.string(),
      lastActiveTime: z.string(),
      membershipCount: z.object({
        joinedDirectHumanUserCount: z.number(),
        joinedGroupCount: z.number(),
      }),
      name: z.string(),
      permissionSettings: z.object({
        manageApps: z.object({
          assistantManagersAllowed: z.boolean(),
          managersAllowed: z.boolean(),
          membersAllowed: z.boolean(),
        }),
        manageMembersAndGroups: z.object({
          assistantManagersAllowed: z.boolean(),
          managersAllowed: z.boolean(),
          membersAllowed: z.boolean(),
        }),
        manageWebhooks: z.object({
          assistantManagersAllowed: z.boolean(),
          managersAllowed: z.boolean(),
          membersAllowed: z.boolean(),
        }),
        modifySpaceDetails: z.object({
          assistantManagersAllowed: z.boolean(),
          managersAllowed: z.boolean(),
          membersAllowed: z.boolean(),
        }),
        postMessages: z.object({
          assistantManagersAllowed: z.boolean(),
          managersAllowed: z.boolean(),
          membersAllowed: z.boolean(),
        }),
        replyMessages: z.object({
          assistantManagersAllowed: z.boolean(),
          managersAllowed: z.boolean(),
          membersAllowed: z.boolean(),
        }),
        toggleHistory: z.object({
          assistantManagersAllowed: z.boolean(),
          managersAllowed: z.boolean(),
          membersAllowed: z.boolean(),
        }),
        useAtMentionAll: z.object({
          assistantManagersAllowed: z.boolean(),
          managersAllowed: z.boolean(),
          membersAllowed: z.boolean(),
        }),
      }),
      predefinedPermissionSettings: z.string(),
      singleUserBotDm: z.boolean(),
      spaceDetails: z.object({
        description: z.string(),
        guidelines: z.string(),
      }),
      spaceHistoryState: z.string(),
      spaceThreadingState: z.string(),
      spaceType: z.string(),
      spaceUri: z.string(),
      threaded: z.boolean(),
      type: z.string(),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Chat Spaces.SpaceEvents. Registered at `@swamp/gcp/chat/spaces-spaceevents`. */
export const model = {
  type: "@swamp/gcp/chat/spaces-spaceevents",
  version: "2026.05.09.1",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
      toVersion: "2026.05.09.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An event that represents a change or activity in a Google Chat space. To lear...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a spaceEvents",
      arguments: z.object({
        identifier: z.string().describe("The name of the spaceEvents"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
    sync: {
      description: "Sync spaceEvents state from GCP",
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
            String(g["parent"] ?? ""),
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
