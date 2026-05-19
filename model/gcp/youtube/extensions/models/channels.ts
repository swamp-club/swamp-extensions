// Auto-generated extension model for @swamp/gcp/youtube/channels
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud YouTube Data Channels.
 *
 * A *channel* resource contains information about a YouTube channel.
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
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://youtube.googleapis.com/";

const UPDATE_CONFIG = {
  "id": "youtube.channels.update",
  "path": "youtube/v3/channels",
  "httpMethod": "PUT",
  "parameterOrder": [
    "part",
  ],
  "parameters": {
    "onBehalfOfContentOwner": {
      "location": "query",
    },
    "part": {
      "location": "query",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "youtube.channels.list",
  "path": "youtube/v3/channels",
  "httpMethod": "GET",
  "parameterOrder": [
    "part",
  ],
  "parameters": {
    "categoryId": {
      "location": "query",
    },
    "forHandle": {
      "location": "query",
    },
    "forUsername": {
      "location": "query",
    },
    "hl": {
      "location": "query",
    },
    "id": {
      "location": "query",
    },
    "managedByMe": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "mine": {
      "location": "query",
    },
    "mySubscribers": {
      "location": "query",
    },
    "onBehalfOfContentOwner": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "part": {
      "location": "query",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  auditDetails: z.object({
    communityGuidelinesGoodStanding: z.boolean().describe(
      "Whether or not the channel respects the community guidelines.",
    ).optional(),
    contentIdClaimsGoodStanding: z.boolean().describe(
      "Whether or not the channel has any unresolved claims.",
    ).optional(),
    copyrightStrikesGoodStanding: z.boolean().describe(
      "Whether or not the channel has any copyright strikes.",
    ).optional(),
  }).describe(
    "The auditDetails object encapsulates channel data that is relevant for YouTube Partners during the audit process.",
  ).optional(),
  brandingSettings: z.object({
    channel: z.object({
      country: z.string().describe("The country of the channel.").optional(),
      defaultLanguage: z.string().optional(),
      defaultTab: z.string().describe(
        "Which content tab users should see when viewing the channel.",
      ).optional(),
      description: z.string().describe("Specifies the channel description.")
        .optional(),
      featuredChannelsTitle: z.string().describe(
        "Title for the featured channels tab.",
      ).optional(),
      featuredChannelsUrls: z.array(z.string()).describe(
        "The list of featured channels.",
      ).optional(),
      keywords: z.string().describe(
        "Lists keywords associated with the channel, comma-separated.",
      ).optional(),
      moderateComments: z.boolean().describe(
        "Whether user-submitted comments left on the channel page need to be approved by the channel owner to be publicly visible.",
      ).optional(),
      profileColor: z.string().describe(
        "A prominent color that can be rendered on this channel page.",
      ).optional(),
      showBrowseView: z.boolean().describe(
        "Whether the tab to browse the videos should be displayed.",
      ).optional(),
      showRelatedChannels: z.boolean().describe(
        "Whether related channels should be proposed.",
      ).optional(),
      title: z.string().describe("Specifies the channel title.").optional(),
      trackingAnalyticsAccountId: z.string().describe(
        "The ID for a Google Analytics account to track and measure traffic to the channels.",
      ).optional(),
      unsubscribedTrailer: z.string().describe(
        "The trailer of the channel, for users that are not subscribers.",
      ).optional(),
    }).describe("Branding properties for the channel view.").optional(),
    hints: z.array(z.object({
      property: z.string().describe("A property.").optional(),
      value: z.string().describe("The property's value.").optional(),
    })).describe("Additional experimental branding properties.").optional(),
    image: z.object({
      backgroundImageUrl: z.object({
        default: z.string().optional(),
        defaultLanguage: z.object({
          value: z.string().optional(),
        }).optional(),
        localized: z.array(z.object({
          language: z.unknown().optional(),
          value: z.unknown().optional(),
        })).optional(),
      }).optional(),
      bannerExternalUrl: z.string().describe(
        "This is generated when a ChannelBanner.Insert request has succeeded for the given channel.",
      ).optional(),
      bannerImageUrl: z.string().describe(
        "Banner image. Desktop size (1060x175).",
      ).optional(),
      bannerMobileExtraHdImageUrl: z.string().describe(
        "Banner image. Mobile size high resolution (1440x395).",
      ).optional(),
      bannerMobileHdImageUrl: z.string().describe(
        "Banner image. Mobile size high resolution (1280x360).",
      ).optional(),
      bannerMobileImageUrl: z.string().describe(
        "Banner image. Mobile size (640x175).",
      ).optional(),
      bannerMobileLowImageUrl: z.string().describe(
        "Banner image. Mobile size low resolution (320x88).",
      ).optional(),
      bannerMobileMediumHdImageUrl: z.string().describe(
        "Banner image. Mobile size medium/high resolution (960x263).",
      ).optional(),
      bannerTabletExtraHdImageUrl: z.string().describe(
        "Banner image. Tablet size extra high resolution (2560x424).",
      ).optional(),
      bannerTabletHdImageUrl: z.string().describe(
        "Banner image. Tablet size high resolution (2276x377).",
      ).optional(),
      bannerTabletImageUrl: z.string().describe(
        "Banner image. Tablet size (1707x283).",
      ).optional(),
      bannerTabletLowImageUrl: z.string().describe(
        "Banner image. Tablet size low resolution (1138x188).",
      ).optional(),
      bannerTvHighImageUrl: z.string().describe(
        "Banner image. TV size high resolution (1920x1080).",
      ).optional(),
      bannerTvImageUrl: z.string().describe(
        "Banner image. TV size extra high resolution (2120x1192).",
      ).optional(),
      bannerTvLowImageUrl: z.string().describe(
        "Banner image. TV size low resolution (854x480).",
      ).optional(),
      bannerTvMediumImageUrl: z.string().describe(
        "Banner image. TV size medium resolution (1280x720).",
      ).optional(),
      largeBrandedBannerImageImapScript: z.object({
        default: z.string().optional(),
        defaultLanguage: z.object({
          value: z.string().optional(),
        }).optional(),
        localized: z.array(z.object({
          language: z.unknown().optional(),
          value: z.unknown().optional(),
        })).optional(),
      }).optional(),
      largeBrandedBannerImageUrl: z.object({
        default: z.string().optional(),
        defaultLanguage: z.object({
          value: z.string().optional(),
        }).optional(),
        localized: z.array(z.object({
          language: z.unknown().optional(),
          value: z.unknown().optional(),
        })).optional(),
      }).optional(),
      smallBrandedBannerImageImapScript: z.object({
        default: z.string().optional(),
        defaultLanguage: z.object({
          value: z.string().optional(),
        }).optional(),
        localized: z.array(z.object({
          language: z.unknown().optional(),
          value: z.unknown().optional(),
        })).optional(),
      }).optional(),
      smallBrandedBannerImageUrl: z.object({
        default: z.string().optional(),
        defaultLanguage: z.object({
          value: z.string().optional(),
        }).optional(),
        localized: z.array(z.object({
          language: z.unknown().optional(),
          value: z.unknown().optional(),
        })).optional(),
      }).optional(),
      trackingImageUrl: z.string().describe(
        "The URL for a 1px by 1px tracking pixel that can be used to collect statistics for views of the channel or video pages.",
      ).optional(),
      watchIconImageUrl: z.string().optional(),
    }).describe("Branding properties for images associated with the channel.")
      .optional(),
    watch: z.object({
      backgroundColor: z.string().describe(
        "The text color for the video watch page's branded area.",
      ).optional(),
      featuredPlaylistId: z.string().describe(
        "An ID that uniquely identifies a playlist that displays next to the video player.",
      ).optional(),
      textColor: z.string().describe(
        "The background color for the video watch page's branded area.",
      ).optional(),
    }).describe("Branding properties for the watch. All deprecated.")
      .optional(),
  }).describe("Branding properties of a YouTube channel.").optional(),
  contentDetails: z.object({
    relatedPlaylists: z.object({
      favorites: z.string().describe(
        'The ID of the playlist that contains the channel"s favorite videos. Use the playlistItems.insert and playlistItems.delete to add or remove items from that list.',
      ).optional(),
      likes: z.string().describe(
        'The ID of the playlist that contains the channel"s liked videos. Use the playlistItems.insert and playlistItems.delete to add or remove items from that list.',
      ).optional(),
      uploads: z.string().describe(
        'The ID of the playlist that contains the channel"s uploaded videos. Use the videos.insert method to upload new videos and the videos.delete method to delete previously uploaded videos.',
      ).optional(),
      watchHistory: z.string().describe(
        'The ID of the playlist that contains the channel"s watch history. Use the playlistItems.insert and playlistItems.delete to add or remove items from that list.',
      ).optional(),
      watchLater: z.string().describe(
        'The ID of the playlist that contains the channel"s watch later playlist. Use the playlistItems.insert and playlistItems.delete to add or remove items from that list.',
      ).optional(),
    }).optional(),
  }).describe("Details about the content of a channel.").optional(),
  contentOwnerDetails: z.object({
    contentOwner: z.string().describe(
      "The ID of the content owner linked to the channel.",
    ).optional(),
    timeLinked: z.string().describe(
      "The date and time when the channel was linked to the content owner.",
    ).optional(),
  }).describe(
    "The contentOwnerDetails object encapsulates channel data that is relevant for YouTube Partners linked with the channel.",
  ).optional(),
  conversionPings: z.object({
    pings: z.array(z.object({
      context: z.enum(["subscribe", "unsubscribe", "cview"]).describe(
        "Defines the context of the ping.",
      ).optional(),
      conversionUrl: z.string().describe(
        "The url (without the schema) that the player shall send the ping to. It's at caller's descretion to decide which schema to use (http vs https) Example of a returned url: //googleads.g.doubleclick.net/pagead/ viewthroughconversion/962985656/?data=path%3DtHe_path%3Btype%3D cview%3Butuid%3DGISQtTNGYqaYl4sKxoVvKA&labe=default The caller must append biscotti authentication (ms param in case of mobile, for example) to this ping.",
      ).optional(),
    })).describe(
      "Pings that the app shall fire (authenticated by biscotti cookie). Each ping has a context, in which the app must fire the ping, and a url identifying the ping.",
    ).optional(),
  }).describe(
    "The conversionPings object encapsulates information about conversion pings that need to be respected by the channel.",
  ).optional(),
  etag: z.string().describe("Etag of this resource.").optional(),
  id: z.string().describe(
    "The ID that YouTube uses to uniquely identify the channel.",
  ).optional(),
  kind: z.string().describe(
    'Identifies what kind of resource this is. Value: the fixed string "youtube#channel".',
  ).optional(),
  localizations: z.record(
    z.string(),
    z.object({
      description: z.string().describe(
        "The localized strings for channel's description.",
      ).optional(),
      title: z.string().describe("The localized strings for channel's title.")
        .optional(),
    }),
  ).describe("Localizations for different languages").optional(),
  snippet: z.object({
    country: z.string().describe("The country of the channel.").optional(),
    customUrl: z.string().describe("The custom url of the channel.").optional(),
    defaultLanguage: z.string().describe(
      "The language of the channel's default title and description.",
    ).optional(),
    description: z.string().describe("The description of the channel.")
      .optional(),
    localized: z.object({
      description: z.string().describe(
        "The localized strings for channel's description.",
      ).optional(),
      title: z.string().describe("The localized strings for channel's title.")
        .optional(),
    }).describe("Channel localization setting").optional(),
    publishedAt: z.string().describe(
      "The date and time that the channel was created.",
    ).optional(),
    thumbnails: z.object({
      default: z.object({
        height: z.number().int().describe(
          "(Optional) Height of the thumbnail image.",
        ).optional(),
        url: z.string().describe("The thumbnail image's URL.").optional(),
        width: z.number().int().describe(
          "(Optional) Width of the thumbnail image.",
        ).optional(),
      }).describe("A thumbnail is an image representing a YouTube resource.")
        .optional(),
      high: z.object({
        height: z.number().int().describe(
          "(Optional) Height of the thumbnail image.",
        ).optional(),
        url: z.string().describe("The thumbnail image's URL.").optional(),
        width: z.number().int().describe(
          "(Optional) Width of the thumbnail image.",
        ).optional(),
      }).describe("A thumbnail is an image representing a YouTube resource.")
        .optional(),
      maxres: z.object({
        height: z.number().int().describe(
          "(Optional) Height of the thumbnail image.",
        ).optional(),
        url: z.string().describe("The thumbnail image's URL.").optional(),
        width: z.number().int().describe(
          "(Optional) Width of the thumbnail image.",
        ).optional(),
      }).describe("A thumbnail is an image representing a YouTube resource.")
        .optional(),
      medium: z.object({
        height: z.number().int().describe(
          "(Optional) Height of the thumbnail image.",
        ).optional(),
        url: z.string().describe("The thumbnail image's URL.").optional(),
        width: z.number().int().describe(
          "(Optional) Width of the thumbnail image.",
        ).optional(),
      }).describe("A thumbnail is an image representing a YouTube resource.")
        .optional(),
      standard: z.object({
        height: z.number().int().describe(
          "(Optional) Height of the thumbnail image.",
        ).optional(),
        url: z.string().describe("The thumbnail image's URL.").optional(),
        width: z.number().int().describe(
          "(Optional) Width of the thumbnail image.",
        ).optional(),
      }).describe("A thumbnail is an image representing a YouTube resource.")
        .optional(),
    }).describe("Internal representation of thumbnails for a YouTube resource.")
      .optional(),
    title: z.string().describe("The channel's title.").optional(),
  }).describe(
    "Basic details about a channel, including title, description and thumbnails.",
  ).optional(),
  statistics: z.object({
    commentCount: z.string().describe("The number of comments for the channel.")
      .optional(),
    hiddenSubscriberCount: z.boolean().describe(
      "Whether or not the number of subscribers is shown for this user.",
    ).optional(),
    subscriberCount: z.string().describe(
      "The number of subscribers that the channel has.",
    ).optional(),
    videoCount: z.string().describe(
      "The number of videos uploaded to the channel.",
    ).optional(),
    viewCount: z.string().describe(
      "The number of times the channel has been viewed.",
    ).optional(),
  }).describe(
    "Statistics about a channel: number of subscribers, number of videos in the channel, etc.",
  ).optional(),
  status: z.object({
    isChannelMonetizationEnabled: z.boolean().describe(
      "Whether the channel is considered ypp monetization enabled. See go/yppornot for more details.",
    ).optional(),
    isLinked: z.boolean().describe(
      "If true, then the user is linked to either a YouTube username or G+ account. Otherwise, the user doesn't have a public YouTube identity.",
    ).optional(),
    longUploadsStatus: z.enum([
      "longUploadsUnspecified",
      "allowed",
      "eligible",
      "disallowed",
    ]).describe(
      "The long uploads status of this channel. See https://support.google.com/youtube/answer/71673 for more information.",
    ).optional(),
    madeForKids: z.boolean().optional(),
    privacyStatus: z.enum(["public", "unlisted", "private"]).describe(
      "Privacy status of the channel.",
    ).optional(),
    selfDeclaredMadeForKids: z.boolean().optional(),
  }).describe("JSON template for the status part of a channel.").optional(),
  topicDetails: z.object({
    topicCategories: z.array(z.string()).describe(
      "A list of Wikipedia URLs that describe the channel's content.",
    ).optional(),
    topicIds: z.array(z.string()).describe(
      "A list of Freebase topic IDs associated with the channel. You can retrieve information about each topic using the Freebase Topic API.",
    ).optional(),
  }).describe("Freebase topic information related to the channel.").optional(),
});

const StateSchema = z.object({
  auditDetails: z.object({
    communityGuidelinesGoodStanding: z.boolean(),
    contentIdClaimsGoodStanding: z.boolean(),
    copyrightStrikesGoodStanding: z.boolean(),
  }).optional(),
  brandingSettings: z.object({
    channel: z.object({
      country: z.string(),
      defaultLanguage: z.string(),
      defaultTab: z.string(),
      description: z.string(),
      featuredChannelsTitle: z.string(),
      featuredChannelsUrls: z.array(z.string()),
      keywords: z.string(),
      moderateComments: z.boolean(),
      profileColor: z.string(),
      showBrowseView: z.boolean(),
      showRelatedChannels: z.boolean(),
      title: z.string(),
      trackingAnalyticsAccountId: z.string(),
      unsubscribedTrailer: z.string(),
    }),
    hints: z.array(z.object({
      property: z.string(),
      value: z.string(),
    })),
    image: z.object({
      backgroundImageUrl: z.object({
        default: z.string(),
        defaultLanguage: z.object({
          value: z.string(),
        }),
        localized: z.array(z.object({
          language: z.unknown(),
          value: z.unknown(),
        })),
      }),
      bannerExternalUrl: z.string(),
      bannerImageUrl: z.string(),
      bannerMobileExtraHdImageUrl: z.string(),
      bannerMobileHdImageUrl: z.string(),
      bannerMobileImageUrl: z.string(),
      bannerMobileLowImageUrl: z.string(),
      bannerMobileMediumHdImageUrl: z.string(),
      bannerTabletExtraHdImageUrl: z.string(),
      bannerTabletHdImageUrl: z.string(),
      bannerTabletImageUrl: z.string(),
      bannerTabletLowImageUrl: z.string(),
      bannerTvHighImageUrl: z.string(),
      bannerTvImageUrl: z.string(),
      bannerTvLowImageUrl: z.string(),
      bannerTvMediumImageUrl: z.string(),
      largeBrandedBannerImageImapScript: z.object({
        default: z.string(),
        defaultLanguage: z.object({
          value: z.string(),
        }),
        localized: z.array(z.object({
          language: z.unknown(),
          value: z.unknown(),
        })),
      }),
      largeBrandedBannerImageUrl: z.object({
        default: z.string(),
        defaultLanguage: z.object({
          value: z.string(),
        }),
        localized: z.array(z.object({
          language: z.unknown(),
          value: z.unknown(),
        })),
      }),
      smallBrandedBannerImageImapScript: z.object({
        default: z.string(),
        defaultLanguage: z.object({
          value: z.string(),
        }),
        localized: z.array(z.object({
          language: z.unknown(),
          value: z.unknown(),
        })),
      }),
      smallBrandedBannerImageUrl: z.object({
        default: z.string(),
        defaultLanguage: z.object({
          value: z.string(),
        }),
        localized: z.array(z.object({
          language: z.unknown(),
          value: z.unknown(),
        })),
      }),
      trackingImageUrl: z.string(),
      watchIconImageUrl: z.string(),
    }),
    watch: z.object({
      backgroundColor: z.string(),
      featuredPlaylistId: z.string(),
      textColor: z.string(),
    }),
  }).optional(),
  contentDetails: z.object({
    relatedPlaylists: z.object({
      favorites: z.string(),
      likes: z.string(),
      uploads: z.string(),
      watchHistory: z.string(),
      watchLater: z.string(),
    }),
  }).optional(),
  contentOwnerDetails: z.object({
    contentOwner: z.string(),
    timeLinked: z.string(),
  }).optional(),
  conversionPings: z.object({
    pings: z.array(z.object({
      context: z.string(),
      conversionUrl: z.string(),
    })),
  }).optional(),
  etag: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  localizations: z.record(z.string(), z.unknown()).optional(),
  snippet: z.object({
    country: z.string(),
    customUrl: z.string(),
    defaultLanguage: z.string(),
    description: z.string(),
    localized: z.object({
      description: z.string(),
      title: z.string(),
    }),
    publishedAt: z.string(),
    thumbnails: z.object({
      default: z.object({
        height: z.number(),
        url: z.string(),
        width: z.number(),
      }),
      high: z.object({
        height: z.number(),
        url: z.string(),
        width: z.number(),
      }),
      maxres: z.object({
        height: z.number(),
        url: z.string(),
        width: z.number(),
      }),
      medium: z.object({
        height: z.number(),
        url: z.string(),
        width: z.number(),
      }),
      standard: z.object({
        height: z.number(),
        url: z.string(),
        width: z.number(),
      }),
    }),
    title: z.string(),
  }).optional(),
  statistics: z.object({
    commentCount: z.string(),
    hiddenSubscriberCount: z.boolean(),
    subscriberCount: z.string(),
    videoCount: z.string(),
    viewCount: z.string(),
  }).optional(),
  status: z.object({
    isChannelMonetizationEnabled: z.boolean(),
    isLinked: z.boolean(),
    longUploadsStatus: z.string(),
    madeForKids: z.boolean(),
    privacyStatus: z.string(),
    selfDeclaredMadeForKids: z.boolean(),
  }).optional(),
  topicDetails: z.object({
    topicCategories: z.array(z.string()),
    topicIds: z.array(z.string()),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  auditDetails: z.object({
    communityGuidelinesGoodStanding: z.boolean().describe(
      "Whether or not the channel respects the community guidelines.",
    ).optional(),
    contentIdClaimsGoodStanding: z.boolean().describe(
      "Whether or not the channel has any unresolved claims.",
    ).optional(),
    copyrightStrikesGoodStanding: z.boolean().describe(
      "Whether or not the channel has any copyright strikes.",
    ).optional(),
  }).describe(
    "The auditDetails object encapsulates channel data that is relevant for YouTube Partners during the audit process.",
  ).optional(),
  brandingSettings: z.object({
    channel: z.object({
      country: z.string().describe("The country of the channel.").optional(),
      defaultLanguage: z.string().optional(),
      defaultTab: z.string().describe(
        "Which content tab users should see when viewing the channel.",
      ).optional(),
      description: z.string().describe("Specifies the channel description.")
        .optional(),
      featuredChannelsTitle: z.string().describe(
        "Title for the featured channels tab.",
      ).optional(),
      featuredChannelsUrls: z.array(z.string()).describe(
        "The list of featured channels.",
      ).optional(),
      keywords: z.string().describe(
        "Lists keywords associated with the channel, comma-separated.",
      ).optional(),
      moderateComments: z.boolean().describe(
        "Whether user-submitted comments left on the channel page need to be approved by the channel owner to be publicly visible.",
      ).optional(),
      profileColor: z.string().describe(
        "A prominent color that can be rendered on this channel page.",
      ).optional(),
      showBrowseView: z.boolean().describe(
        "Whether the tab to browse the videos should be displayed.",
      ).optional(),
      showRelatedChannels: z.boolean().describe(
        "Whether related channels should be proposed.",
      ).optional(),
      title: z.string().describe("Specifies the channel title.").optional(),
      trackingAnalyticsAccountId: z.string().describe(
        "The ID for a Google Analytics account to track and measure traffic to the channels.",
      ).optional(),
      unsubscribedTrailer: z.string().describe(
        "The trailer of the channel, for users that are not subscribers.",
      ).optional(),
    }).describe("Branding properties for the channel view.").optional(),
    hints: z.array(z.object({
      property: z.string().describe("A property.").optional(),
      value: z.string().describe("The property's value.").optional(),
    })).describe("Additional experimental branding properties.").optional(),
    image: z.object({
      backgroundImageUrl: z.object({
        default: z.string().optional(),
        defaultLanguage: z.object({
          value: z.string().optional(),
        }).optional(),
        localized: z.array(z.object({
          language: z.unknown().optional(),
          value: z.unknown().optional(),
        })).optional(),
      }).optional(),
      bannerExternalUrl: z.string().describe(
        "This is generated when a ChannelBanner.Insert request has succeeded for the given channel.",
      ).optional(),
      bannerImageUrl: z.string().describe(
        "Banner image. Desktop size (1060x175).",
      ).optional(),
      bannerMobileExtraHdImageUrl: z.string().describe(
        "Banner image. Mobile size high resolution (1440x395).",
      ).optional(),
      bannerMobileHdImageUrl: z.string().describe(
        "Banner image. Mobile size high resolution (1280x360).",
      ).optional(),
      bannerMobileImageUrl: z.string().describe(
        "Banner image. Mobile size (640x175).",
      ).optional(),
      bannerMobileLowImageUrl: z.string().describe(
        "Banner image. Mobile size low resolution (320x88).",
      ).optional(),
      bannerMobileMediumHdImageUrl: z.string().describe(
        "Banner image. Mobile size medium/high resolution (960x263).",
      ).optional(),
      bannerTabletExtraHdImageUrl: z.string().describe(
        "Banner image. Tablet size extra high resolution (2560x424).",
      ).optional(),
      bannerTabletHdImageUrl: z.string().describe(
        "Banner image. Tablet size high resolution (2276x377).",
      ).optional(),
      bannerTabletImageUrl: z.string().describe(
        "Banner image. Tablet size (1707x283).",
      ).optional(),
      bannerTabletLowImageUrl: z.string().describe(
        "Banner image. Tablet size low resolution (1138x188).",
      ).optional(),
      bannerTvHighImageUrl: z.string().describe(
        "Banner image. TV size high resolution (1920x1080).",
      ).optional(),
      bannerTvImageUrl: z.string().describe(
        "Banner image. TV size extra high resolution (2120x1192).",
      ).optional(),
      bannerTvLowImageUrl: z.string().describe(
        "Banner image. TV size low resolution (854x480).",
      ).optional(),
      bannerTvMediumImageUrl: z.string().describe(
        "Banner image. TV size medium resolution (1280x720).",
      ).optional(),
      largeBrandedBannerImageImapScript: z.object({
        default: z.string().optional(),
        defaultLanguage: z.object({
          value: z.string().optional(),
        }).optional(),
        localized: z.array(z.object({
          language: z.unknown().optional(),
          value: z.unknown().optional(),
        })).optional(),
      }).optional(),
      largeBrandedBannerImageUrl: z.object({
        default: z.string().optional(),
        defaultLanguage: z.object({
          value: z.string().optional(),
        }).optional(),
        localized: z.array(z.object({
          language: z.unknown().optional(),
          value: z.unknown().optional(),
        })).optional(),
      }).optional(),
      smallBrandedBannerImageImapScript: z.object({
        default: z.string().optional(),
        defaultLanguage: z.object({
          value: z.string().optional(),
        }).optional(),
        localized: z.array(z.object({
          language: z.unknown().optional(),
          value: z.unknown().optional(),
        })).optional(),
      }).optional(),
      smallBrandedBannerImageUrl: z.object({
        default: z.string().optional(),
        defaultLanguage: z.object({
          value: z.string().optional(),
        }).optional(),
        localized: z.array(z.object({
          language: z.unknown().optional(),
          value: z.unknown().optional(),
        })).optional(),
      }).optional(),
      trackingImageUrl: z.string().describe(
        "The URL for a 1px by 1px tracking pixel that can be used to collect statistics for views of the channel or video pages.",
      ).optional(),
      watchIconImageUrl: z.string().optional(),
    }).describe("Branding properties for images associated with the channel.")
      .optional(),
    watch: z.object({
      backgroundColor: z.string().describe(
        "The text color for the video watch page's branded area.",
      ).optional(),
      featuredPlaylistId: z.string().describe(
        "An ID that uniquely identifies a playlist that displays next to the video player.",
      ).optional(),
      textColor: z.string().describe(
        "The background color for the video watch page's branded area.",
      ).optional(),
    }).describe("Branding properties for the watch. All deprecated.")
      .optional(),
  }).describe("Branding properties of a YouTube channel.").optional(),
  contentDetails: z.object({
    relatedPlaylists: z.object({
      favorites: z.string().describe(
        'The ID of the playlist that contains the channel"s favorite videos. Use the playlistItems.insert and playlistItems.delete to add or remove items from that list.',
      ).optional(),
      likes: z.string().describe(
        'The ID of the playlist that contains the channel"s liked videos. Use the playlistItems.insert and playlistItems.delete to add or remove items from that list.',
      ).optional(),
      uploads: z.string().describe(
        'The ID of the playlist that contains the channel"s uploaded videos. Use the videos.insert method to upload new videos and the videos.delete method to delete previously uploaded videos.',
      ).optional(),
      watchHistory: z.string().describe(
        'The ID of the playlist that contains the channel"s watch history. Use the playlistItems.insert and playlistItems.delete to add or remove items from that list.',
      ).optional(),
      watchLater: z.string().describe(
        'The ID of the playlist that contains the channel"s watch later playlist. Use the playlistItems.insert and playlistItems.delete to add or remove items from that list.',
      ).optional(),
    }).optional(),
  }).describe("Details about the content of a channel.").optional(),
  contentOwnerDetails: z.object({
    contentOwner: z.string().describe(
      "The ID of the content owner linked to the channel.",
    ).optional(),
    timeLinked: z.string().describe(
      "The date and time when the channel was linked to the content owner.",
    ).optional(),
  }).describe(
    "The contentOwnerDetails object encapsulates channel data that is relevant for YouTube Partners linked with the channel.",
  ).optional(),
  conversionPings: z.object({
    pings: z.array(z.object({
      context: z.enum(["subscribe", "unsubscribe", "cview"]).describe(
        "Defines the context of the ping.",
      ).optional(),
      conversionUrl: z.string().describe(
        "The url (without the schema) that the player shall send the ping to. It's at caller's descretion to decide which schema to use (http vs https) Example of a returned url: //googleads.g.doubleclick.net/pagead/ viewthroughconversion/962985656/?data=path%3DtHe_path%3Btype%3D cview%3Butuid%3DGISQtTNGYqaYl4sKxoVvKA&labe=default The caller must append biscotti authentication (ms param in case of mobile, for example) to this ping.",
      ).optional(),
    })).describe(
      "Pings that the app shall fire (authenticated by biscotti cookie). Each ping has a context, in which the app must fire the ping, and a url identifying the ping.",
    ).optional(),
  }).describe(
    "The conversionPings object encapsulates information about conversion pings that need to be respected by the channel.",
  ).optional(),
  etag: z.string().describe("Etag of this resource.").optional(),
  id: z.string().describe(
    "The ID that YouTube uses to uniquely identify the channel.",
  ).optional(),
  kind: z.string().describe(
    'Identifies what kind of resource this is. Value: the fixed string "youtube#channel".',
  ).optional(),
  localizations: z.record(
    z.string(),
    z.object({
      description: z.string().describe(
        "The localized strings for channel's description.",
      ).optional(),
      title: z.string().describe("The localized strings for channel's title.")
        .optional(),
    }),
  ).describe("Localizations for different languages").optional(),
  snippet: z.object({
    country: z.string().describe("The country of the channel.").optional(),
    customUrl: z.string().describe("The custom url of the channel.").optional(),
    defaultLanguage: z.string().describe(
      "The language of the channel's default title and description.",
    ).optional(),
    description: z.string().describe("The description of the channel.")
      .optional(),
    localized: z.object({
      description: z.string().describe(
        "The localized strings for channel's description.",
      ).optional(),
      title: z.string().describe("The localized strings for channel's title.")
        .optional(),
    }).describe("Channel localization setting").optional(),
    publishedAt: z.string().describe(
      "The date and time that the channel was created.",
    ).optional(),
    thumbnails: z.object({
      default: z.object({
        height: z.number().int().describe(
          "(Optional) Height of the thumbnail image.",
        ).optional(),
        url: z.string().describe("The thumbnail image's URL.").optional(),
        width: z.number().int().describe(
          "(Optional) Width of the thumbnail image.",
        ).optional(),
      }).describe("A thumbnail is an image representing a YouTube resource.")
        .optional(),
      high: z.object({
        height: z.number().int().describe(
          "(Optional) Height of the thumbnail image.",
        ).optional(),
        url: z.string().describe("The thumbnail image's URL.").optional(),
        width: z.number().int().describe(
          "(Optional) Width of the thumbnail image.",
        ).optional(),
      }).describe("A thumbnail is an image representing a YouTube resource.")
        .optional(),
      maxres: z.object({
        height: z.number().int().describe(
          "(Optional) Height of the thumbnail image.",
        ).optional(),
        url: z.string().describe("The thumbnail image's URL.").optional(),
        width: z.number().int().describe(
          "(Optional) Width of the thumbnail image.",
        ).optional(),
      }).describe("A thumbnail is an image representing a YouTube resource.")
        .optional(),
      medium: z.object({
        height: z.number().int().describe(
          "(Optional) Height of the thumbnail image.",
        ).optional(),
        url: z.string().describe("The thumbnail image's URL.").optional(),
        width: z.number().int().describe(
          "(Optional) Width of the thumbnail image.",
        ).optional(),
      }).describe("A thumbnail is an image representing a YouTube resource.")
        .optional(),
      standard: z.object({
        height: z.number().int().describe(
          "(Optional) Height of the thumbnail image.",
        ).optional(),
        url: z.string().describe("The thumbnail image's URL.").optional(),
        width: z.number().int().describe(
          "(Optional) Width of the thumbnail image.",
        ).optional(),
      }).describe("A thumbnail is an image representing a YouTube resource.")
        .optional(),
    }).describe("Internal representation of thumbnails for a YouTube resource.")
      .optional(),
    title: z.string().describe("The channel's title.").optional(),
  }).describe(
    "Basic details about a channel, including title, description and thumbnails.",
  ).optional(),
  statistics: z.object({
    commentCount: z.string().describe("The number of comments for the channel.")
      .optional(),
    hiddenSubscriberCount: z.boolean().describe(
      "Whether or not the number of subscribers is shown for this user.",
    ).optional(),
    subscriberCount: z.string().describe(
      "The number of subscribers that the channel has.",
    ).optional(),
    videoCount: z.string().describe(
      "The number of videos uploaded to the channel.",
    ).optional(),
    viewCount: z.string().describe(
      "The number of times the channel has been viewed.",
    ).optional(),
  }).describe(
    "Statistics about a channel: number of subscribers, number of videos in the channel, etc.",
  ).optional(),
  status: z.object({
    isChannelMonetizationEnabled: z.boolean().describe(
      "Whether the channel is considered ypp monetization enabled. See go/yppornot for more details.",
    ).optional(),
    isLinked: z.boolean().describe(
      "If true, then the user is linked to either a YouTube username or G+ account. Otherwise, the user doesn't have a public YouTube identity.",
    ).optional(),
    longUploadsStatus: z.enum([
      "longUploadsUnspecified",
      "allowed",
      "eligible",
      "disallowed",
    ]).describe(
      "The long uploads status of this channel. See https://support.google.com/youtube/answer/71673 for more information.",
    ).optional(),
    madeForKids: z.boolean().optional(),
    privacyStatus: z.enum(["public", "unlisted", "private"]).describe(
      "Privacy status of the channel.",
    ).optional(),
    selfDeclaredMadeForKids: z.boolean().optional(),
  }).describe("JSON template for the status part of a channel.").optional(),
  topicDetails: z.object({
    topicCategories: z.array(z.string()).describe(
      "A list of Wikipedia URLs that describe the channel's content.",
    ).optional(),
    topicIds: z.array(z.string()).describe(
      "A list of Freebase topic IDs associated with the channel. You can retrieve information about each topic using the Freebase Topic API.",
    ).optional(),
  }).describe("Freebase topic information related to the channel.").optional(),
});

/** Swamp extension model for Google Cloud YouTube Data Channels. Registered at `@swamp/gcp/youtube/channels`. */
export const model = {
  type: "@swamp/gcp/youtube/channels",
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
        "A *channel* resource contains information about a YouTube channel.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a channels",
      arguments: z.object({
        identifier: z.string().describe("The name of the channels"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
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
    update: {
      description: "Update channels attributes",
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
        params["part"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["auditDetails"] !== undefined) {
          body["auditDetails"] = g["auditDetails"];
        }
        if (g["brandingSettings"] !== undefined) {
          body["brandingSettings"] = g["brandingSettings"];
        }
        if (g["contentDetails"] !== undefined) {
          body["contentDetails"] = g["contentDetails"];
        }
        if (g["contentOwnerDetails"] !== undefined) {
          body["contentOwnerDetails"] = g["contentOwnerDetails"];
        }
        if (g["conversionPings"] !== undefined) {
          body["conversionPings"] = g["conversionPings"];
        }
        if (g["etag"] !== undefined) body["etag"] = g["etag"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["kind"] !== undefined) body["kind"] = g["kind"];
        if (g["localizations"] !== undefined) {
          body["localizations"] = g["localizations"];
        }
        if (g["snippet"] !== undefined) body["snippet"] = g["snippet"];
        if (g["statistics"] !== undefined) body["statistics"] = g["statistics"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["topicDetails"] !== undefined) {
          body["topicDetails"] = g["topicDetails"];
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
      description: "Sync channels state from GCP",
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
  },
};
