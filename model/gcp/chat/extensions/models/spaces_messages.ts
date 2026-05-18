// Auto-generated extension model for @swamp/gcp/chat/spaces-messages
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Chat Spaces.Messages.
 *
 * A message in a Google Chat space.
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
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/messages/${shortName}`;
}

const BASE_URL = "https://chat.googleapis.com/";

const GET_CONFIG = {
  "id": "chat.spaces.messages.get",
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
  "id": "chat.spaces.messages.create",
  "path": "v1/{+parent}/messages",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "messageId": {
      "location": "query",
    },
    "messageReplyOption": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "threadKey": {
      "location": "query",
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "chat.spaces.messages.update",
  "path": "v1/{+name}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
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
  "id": "chat.spaces.messages.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "force": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  accessoryWidgets: z.array(z.object({
    buttonList: z.object({
      buttons: z.array(z.object({
        altText: z.unknown().describe(
          'The alternative text that\'s used for accessibility. Set descriptive text that lets users know what the button does. For example, if a button opens a hyperlink, you might write: "Opens a new browser tab and navigates to the Google Chat developer documentation at https://developers.google.com/workspace/chat".',
        ).optional(),
        color: z.unknown().describe(
          "Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to and from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of `java.awt.Color` in Java; it can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha` method in iOS; and, with just a little work, it can be easily formatted into a CSS `rgba()` string in JavaScript. This reference page doesn't have information about the absolute color space that should be used to interpret the RGB value—for example, sRGB, Adobe RGB, DCI-P3, and BT.2020. By default, applications should assume the sRGB color space. When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most `1e-5`. Example (Java): import com.google.type.Color; //... public static java.awt.Color fromProto(Color protocolor) { float alpha = protocolor.hasAlpha()? protocolor.getAlpha().getValue(): 1.0; return new java.awt.Color( protocolor.getRed(), protocolor.getGreen(), protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color color) { float red = (float) color.getRed(); float green = (float) color.getGreen(); float blue = (float) color.getBlue(); float denominator = 255.0; Color.Builder resultBuilder = Color.newBuilder().setRed(red / denominator).setGreen(green / denominator).setBlue(blue / denominator); int alpha = color.getAlpha(); if (alpha!= 255) { result.setAlpha( FloatValue.newBuilder().setValue(((float) alpha) / denominator).build()); } return resultBuilder.build(); } //... Example (iOS / Obj-C): //... static UIColor* fromProto(Color* protocolor) { float red = [protocolor red]; float green = [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper!= nil) { alpha = [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <= 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result autorelease]; return result; } //... Example (JavaScript): //... var protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0; var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0; var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255); var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value || 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(', rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor = function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 - hexString.length; var resultBuilder = ['#']; for (var i = 0; i < missingZeros; i++) { resultBuilder.push('0'); } resultBuilder.push(hexString); return resultBuilder.join(''); }; //...",
        ).optional(),
        disabled: z.unknown().describe(
          "If `true`, the button is displayed in an inactive state and doesn't respond to user actions.",
        ).optional(),
        icon: z.unknown().describe(
          "An icon displayed in a widget on a card. For an example in Google Chat apps, see [Add an icon](https://developers.google.com/workspace/chat/add-text-image-card-dialog#add_an_icon). Supports [built-in](https://developers.google.com/workspace/chat/format-messages#builtinicons) and [custom](https://developers.google.com/workspace/chat/format-messages#customicons) icons. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
        ).optional(),
        onClick: z.unknown().describe(
          "Represents how to respond when users click an interactive element on a card, such as a button. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
        ).optional(),
        text: z.unknown().describe("The text displayed inside the button.")
          .optional(),
        type: z.unknown().describe(
          "Optional. The type of a button. If unset, button type defaults to `OUTLINED`. If the `color` field is set, the button type is forced to `FILLED` and any value set for this field is ignored.",
        ).optional(),
      })).describe("An array of buttons.").optional(),
    }).describe(
      "A list of buttons layed out horizontally. For an example in Google Chat apps, see [Add a button](https://developers.google.com/workspace/chat/design-interactive-card-dialog#add_a_button). [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
    ).optional(),
  })).describe(
    "Optional. One or more interactive widgets that appear at the bottom of a message. You can add accessory widgets to messages that contain text, cards, or both text and cards. Not supported for messages that contain dialogs. For details, see [Add interactive widgets at the bottom of a message](https://developers.google.com/workspace/chat/create-messages#add-accessory-widgets). Creating a message with accessory widgets requires [app authentication] (https://developers.google.com/workspace/chat/authenticate-authorize-chat-app).",
  ).optional(),
  actionResponse: z.object({
    dialogAction: z.object({
      actionStatus: z.object({
        statusCode: z.enum([
          "OK",
          "CANCELLED",
          "UNKNOWN",
          "INVALID_ARGUMENT",
          "DEADLINE_EXCEEDED",
          "NOT_FOUND",
          "ALREADY_EXISTS",
          "PERMISSION_DENIED",
          "UNAUTHENTICATED",
          "RESOURCE_EXHAUSTED",
          "FAILED_PRECONDITION",
          "ABORTED",
          "OUT_OF_RANGE",
          "UNIMPLEMENTED",
          "INTERNAL",
          "UNAVAILABLE",
          "DATA_LOSS",
        ]).describe("The status code.").optional(),
        userFacingMessage: z.string().describe(
          "The message to send users about the status of their request. If unset, a generic message based on the `status_code` is sent.",
        ).optional(),
      }).describe(
        "Represents the status for a request to either invoke or submit a [dialog](https://developers.google.com/workspace/chat/dialogs).",
      ).optional(),
      dialog: z.object({
        body: z.object({
          cardActions: z.array(z.unknown()).describe(
            'The card\'s actions. Actions are added to the card\'s toolbar menu. [Google Workspace add-ons](https://developers.google.com/workspace/add-ons): For example, the following JSON constructs a card action menu with `Settings` and `Send Feedback` options: ` "card_actions": [ { "actionLabel": "Settings", "onClick": { "action": { "functionName": "goToView", "parameters": [ { "key": "viewType", "value": "SETTING" } ], "loadIndicator": "LoadIndicator.SPINNER" } } }, { "actionLabel": "Send Feedback", "onClick": { "openLink": { "url": "https://example.com/feedback" } } } ] `',
          ).optional(),
          displayStyle: z.enum(["DISPLAY_STYLE_UNSPECIFIED", "PEEK", "REPLACE"])
            .describe(
              "In Google Workspace add-ons, sets the display properties of the `peekCardHeader`. [Google Workspace add-ons](https://developers.google.com/workspace/add-ons):",
            ).optional(),
          expressionData: z.array(z.unknown()).describe(
            "The expression data for the card. Available for Google Workspace add-ons that extend Google Workspace Studio. Unavailable for Google Chat apps.",
          ).optional(),
          fixedFooter: z.object({
            primaryButton: z.unknown().describe(
              "A text, icon, or text and icon button that users can click. For an example in Google Chat apps, see [Add a button](https://developers.google.com/workspace/chat/design-interactive-card-dialog#add_a_button). To make an image a clickable button, specify an `Image` (not an `ImageComponent`) and set an `onClick` action. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
            ).optional(),
            secondaryButton: z.unknown().describe(
              "A text, icon, or text and icon button that users can click. For an example in Google Chat apps, see [Add a button](https://developers.google.com/workspace/chat/design-interactive-card-dialog#add_a_button). To make an image a clickable button, specify an `Image` (not an `ImageComponent`) and set an `onClick` action. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
            ).optional(),
          }).describe(
            "A persistent (sticky) footer that that appears at the bottom of the card. Setting `fixedFooter` without specifying a `primaryButton` or a `secondaryButton` causes an error. For Chat apps, you can use fixed footers in [dialogs](https://developers.google.com/workspace/chat/dialogs), but not [card messages](https://developers.google.com/workspace/chat/create-messages#create). For an example in Google Chat apps, see [Add a persistent footer](https://developers.google.com/workspace/chat/design-components-card-dialog#add_a_persistent_footer). [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
          ).optional(),
          header: z.object({
            imageAltText: z.unknown().describe(
              "The alternative text of this image that's used for accessibility.",
            ).optional(),
            imageType: z.unknown().describe(
              "The shape used to crop the image. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
            ).optional(),
            imageUrl: z.unknown().describe(
              "The HTTPS URL of the image in the card header.",
            ).optional(),
            subtitle: z.unknown().describe(
              "The subtitle of the card header. If specified, appears on its own line below the `title`.",
            ).optional(),
            title: z.unknown().describe(
              "Required. The title of the card header. The header has a fixed height: if both a title and subtitle are specified, each takes up one line. If only the title is specified, it takes up both lines.",
            ).optional(),
          }).describe(
            "Represents a card header. For an example in Google Chat apps, see [Add a header](https://developers.google.com/workspace/chat/design-components-card-dialog#add_a_header). [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
          ).optional(),
          name: z.string().describe(
            "Name of the card. Used as a card identifier in card navigation. [Google Workspace add-ons](https://developers.google.com/workspace/add-ons):",
          ).optional(),
          peekCardHeader: z.object({
            imageAltText: z.unknown().describe(
              "The alternative text of this image that's used for accessibility.",
            ).optional(),
            imageType: z.unknown().describe(
              "The shape used to crop the image. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
            ).optional(),
            imageUrl: z.unknown().describe(
              "The HTTPS URL of the image in the card header.",
            ).optional(),
            subtitle: z.unknown().describe(
              "The subtitle of the card header. If specified, appears on its own line below the `title`.",
            ).optional(),
            title: z.unknown().describe(
              "Required. The title of the card header. The header has a fixed height: if both a title and subtitle are specified, each takes up one line. If only the title is specified, it takes up both lines.",
            ).optional(),
          }).describe(
            "Represents a card header. For an example in Google Chat apps, see [Add a header](https://developers.google.com/workspace/chat/design-components-card-dialog#add_a_header). [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
          ).optional(),
          sectionDividerStyle: z.enum([
            "DIVIDER_STYLE_UNSPECIFIED",
            "SOLID_DIVIDER",
            "NO_DIVIDER",
          ]).describe(
            "The divider style between the header, sections and footer.",
          ).optional(),
          sections: z.array(z.unknown()).describe(
            "Contains a collection of widgets. Each section has its own, optional header. Sections are visually separated by a line divider. For an example in Google Chat apps, see [Define a section of a card](https://developers.google.com/workspace/chat/design-components-card-dialog#define_a_section_of_a_card).",
          ).optional(),
        }).describe(
          'A card interface displayed in a Google Chat message or Google Workspace add-on. Cards support a defined layout, interactive UI elements like buttons, and rich media like images. Use cards to present detailed information, gather information from users, and guide users to take a next step. [Card builder](https://addons.gsuite.google.com/uikit/builder) To learn how to build cards, see the following documentation: * For Google Chat apps, see [Design the components of a card or dialog](https://developers.google.com/workspace/chat/design-components-card-dialog). * For Google Workspace add-ons, see [Card-based interfaces](https://developers.google.com/apps-script/add-ons/concepts/cards). Note: You can add up to 100 widgets per card. If a section\'s widgets push the total count above 100, that entire section and all following sections are ignored. This limit applies to both card messages and dialogs in Google Chat apps, and to cards in Google Workspace add-ons. **Example: Card message for a Google Chat app**![Example contact card](https://developers.google.com/workspace/chat/images/card_api_reference.png) To create the sample card message in Google Chat, use the following JSON: ` { "cardsV2": [ { "cardId": "unique-card-id", "card": { "header": { "title": "Sasha", "subtitle": "Software Engineer", "imageUrl": "https://developers.google.com/workspace/chat/images/quickstart-app-avatar.png", "imageType": "CIRCLE", "imageAltText": "Avatar for Sasha" }, "sections": [ { "header": "Contact Info", "collapsible": true, "uncollapsibleWidgetsCount": 1, "widgets": [ { "decoratedText": { "startIcon": { "knownIcon": "EMAIL" }, "text": "sasha@example.com" } }, { "decoratedText": { "startIcon": { "knownIcon": "PERSON" }, "text": "Online" } }, { "decoratedText": { "startIcon": { "knownIcon": "PHONE" }, "text": "+1 (555) 555-1234" } }, { "buttonList": { "buttons": [ { "text": "Share", "onClick": { "openLink": { "url": "https://example.com/share" } } }, { "text": "Edit", "onClick": { "action": { "function": "goToView", "parameters": [ { "key": "viewType", "value": "EDIT" } ] } } } ] } } ] } ] } } ] } `',
        ).optional(),
      }).describe("Wrapper around the card body of the dialog.").optional(),
    }).describe(
      "Contains a [dialog](https://developers.google.com/workspace/chat/dialogs) and request status code.",
    ).optional(),
    type: z.enum([
      "TYPE_UNSPECIFIED",
      "NEW_MESSAGE",
      "UPDATE_MESSAGE",
      "UPDATE_USER_MESSAGE_CARDS",
      "REQUEST_CONFIG",
      "DIALOG",
      "UPDATE_WIDGET",
    ]).describe("Input only. The type of Chat app response.").optional(),
    updatedWidget: z.object({
      suggestions: z.object({
        items: z.array(z.object({
          bottomText: z.unknown().describe(
            "For multiselect menus, a text description or label that's displayed below the item's `text` field.",
          ).optional(),
          selected: z.unknown().describe(
            "Whether the item is selected by default. If the selection input only accepts one value (such as for radio buttons or a dropdown menu), only set this field for one item.",
          ).optional(),
          startIconUri: z.unknown().optional(),
          text: z.unknown().describe(
            "The text that identifies or describes the item to users.",
          ).optional(),
          value: z.unknown().describe(
            "The value associated with this item. The client should use this as a form input value. For details about working with form inputs, see [Receive form data](https://developers.google.com/workspace/chat/read-form-data).",
          ).optional(),
        })).describe("An array of the SelectionItem objects.").optional(),
      }).describe("List of widget autocomplete results.").optional(),
      widget: z.string().describe(
        "The ID of the updated widget. The ID must match the one for the widget that triggered the update request.",
      ).optional(),
    }).describe(
      "For `selectionInput` widgets, returns autocomplete suggestions for a multiselect menu.",
    ).optional(),
    url: z.string().describe(
      "Input only. URL for users to authenticate or configure. (Only for `REQUEST_CONFIG` response types.)",
    ).optional(),
  }).describe(
    "Parameters that a Chat app can use to configure how its response is posted.",
  ).optional(),
  attachment: z.array(z.object({
    attachmentDataRef: z.object({
      attachmentUploadToken: z.string().describe(
        "Optional. Opaque token containing a reference to an uploaded attachment. Treated by clients as an opaque string and used to create or update Chat messages with attachments.",
      ).optional(),
      resourceName: z.string().describe(
        "Optional. The resource name of the attachment data. This field is used with the media API to download the attachment data.",
      ).optional(),
    }).describe("A reference to the attachment data.").optional(),
    contentName: z.string().describe(
      "Output only. The original file name for the content, not the full path.",
    ).optional(),
    contentType: z.string().describe(
      "Output only. The content type (MIME type) of the file.",
    ).optional(),
    downloadUri: z.string().describe(
      "Output only. The download URL which should be used to allow a human user to download the attachment. Chat apps shouldn't use this URL to download attachment content.",
    ).optional(),
    driveDataRef: z.object({
      driveFileId: z.string().describe(
        "The ID for the drive file. Use with the Drive API.",
      ).optional(),
    }).describe("A reference to the data of a drive attachment.").optional(),
    name: z.string().describe(
      "Identifier. Resource name of the attachment. Format: `spaces/{space}/messages/{message}/attachments/{attachment}`.",
    ).optional(),
    source: z.enum(["SOURCE_UNSPECIFIED", "DRIVE_FILE", "UPLOADED_CONTENT"])
      .describe("Output only. The source of the attachment.").optional(),
    thumbnailUri: z.string().describe(
      "Output only. The thumbnail URL which should be used to preview the attachment to a human user. Chat apps shouldn't use this URL to download attachment content.",
    ).optional(),
  })).describe("Optional. User-uploaded attachment.").optional(),
  cardsV2: z.array(z.object({
    card: z.object({
      cardActions: z.array(z.object({
        actionLabel: z.unknown().describe(
          "The label that displays as the action menu item.",
        ).optional(),
        onClick: z.unknown().describe(
          "Represents how to respond when users click an interactive element on a card, such as a button. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
        ).optional(),
      })).describe(
        'The card\'s actions. Actions are added to the card\'s toolbar menu. [Google Workspace add-ons](https://developers.google.com/workspace/add-ons): For example, the following JSON constructs a card action menu with `Settings` and `Send Feedback` options: ` "card_actions": [ { "actionLabel": "Settings", "onClick": { "action": { "functionName": "goToView", "parameters": [ { "key": "viewType", "value": "SETTING" } ], "loadIndicator": "LoadIndicator.SPINNER" } } }, { "actionLabel": "Send Feedback", "onClick": { "openLink": { "url": "https://example.com/feedback" } } } ] `',
      ).optional(),
      displayStyle: z.enum(["DISPLAY_STYLE_UNSPECIFIED", "PEEK", "REPLACE"])
        .describe(
          "In Google Workspace add-ons, sets the display properties of the `peekCardHeader`. [Google Workspace add-ons](https://developers.google.com/workspace/add-ons):",
        ).optional(),
      expressionData: z.array(z.object({
        conditions: z.unknown().describe(
          "The list of conditions that are determined by the expression evaluation result.",
        ).optional(),
        eventActions: z.unknown().describe(
          "The list of actions that the ExpressionData can be used.",
        ).optional(),
        expression: z.unknown().describe("The uncompiled expression.")
          .optional(),
        id: z.unknown().describe("The unique identifier of the ExpressionData.")
          .optional(),
      })).describe(
        "The expression data for the card. Available for Google Workspace add-ons that extend Google Workspace Studio. Unavailable for Google Chat apps.",
      ).optional(),
      fixedFooter: z.object({
        primaryButton: z.object({
          altText: z.unknown().describe(
            'The alternative text that\'s used for accessibility. Set descriptive text that lets users know what the button does. For example, if a button opens a hyperlink, you might write: "Opens a new browser tab and navigates to the Google Chat developer documentation at https://developers.google.com/workspace/chat".',
          ).optional(),
          color: z.unknown().describe(
            "Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to and from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of `java.awt.Color` in Java; it can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha` method in iOS; and, with just a little work, it can be easily formatted into a CSS `rgba()` string in JavaScript. This reference page doesn't have information about the absolute color space that should be used to interpret the RGB value—for example, sRGB, Adobe RGB, DCI-P3, and BT.2020. By default, applications should assume the sRGB color space. When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most `1e-5`. Example (Java): import com.google.type.Color; //... public static java.awt.Color fromProto(Color protocolor) { float alpha = protocolor.hasAlpha()? protocolor.getAlpha().getValue(): 1.0; return new java.awt.Color( protocolor.getRed(), protocolor.getGreen(), protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color color) { float red = (float) color.getRed(); float green = (float) color.getGreen(); float blue = (float) color.getBlue(); float denominator = 255.0; Color.Builder resultBuilder = Color.newBuilder().setRed(red / denominator).setGreen(green / denominator).setBlue(blue / denominator); int alpha = color.getAlpha(); if (alpha!= 255) { result.setAlpha( FloatValue.newBuilder().setValue(((float) alpha) / denominator).build()); } return resultBuilder.build(); } //... Example (iOS / Obj-C): //... static UIColor* fromProto(Color* protocolor) { float red = [protocolor red]; float green = [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper!= nil) { alpha = [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <= 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result autorelease]; return result; } //... Example (JavaScript): //... var protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0; var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0; var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255); var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value || 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(', rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor = function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 - hexString.length; var resultBuilder = ['#']; for (var i = 0; i < missingZeros; i++) { resultBuilder.push('0'); } resultBuilder.push(hexString); return resultBuilder.join(''); }; //...",
          ).optional(),
          disabled: z.unknown().describe(
            "If `true`, the button is displayed in an inactive state and doesn't respond to user actions.",
          ).optional(),
          icon: z.unknown().describe(
            "An icon displayed in a widget on a card. For an example in Google Chat apps, see [Add an icon](https://developers.google.com/workspace/chat/add-text-image-card-dialog#add_an_icon). Supports [built-in](https://developers.google.com/workspace/chat/format-messages#builtinicons) and [custom](https://developers.google.com/workspace/chat/format-messages#customicons) icons. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
          ).optional(),
          onClick: z.unknown().describe(
            "Represents how to respond when users click an interactive element on a card, such as a button. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
          ).optional(),
          text: z.unknown().describe("The text displayed inside the button.")
            .optional(),
          type: z.unknown().describe(
            "Optional. The type of a button. If unset, button type defaults to `OUTLINED`. If the `color` field is set, the button type is forced to `FILLED` and any value set for this field is ignored.",
          ).optional(),
        }).describe(
          "A text, icon, or text and icon button that users can click. For an example in Google Chat apps, see [Add a button](https://developers.google.com/workspace/chat/design-interactive-card-dialog#add_a_button). To make an image a clickable button, specify an `Image` (not an `ImageComponent`) and set an `onClick` action. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
        ).optional(),
        secondaryButton: z.object({
          altText: z.unknown().describe(
            'The alternative text that\'s used for accessibility. Set descriptive text that lets users know what the button does. For example, if a button opens a hyperlink, you might write: "Opens a new browser tab and navigates to the Google Chat developer documentation at https://developers.google.com/workspace/chat".',
          ).optional(),
          color: z.unknown().describe(
            "Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to and from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of `java.awt.Color` in Java; it can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha` method in iOS; and, with just a little work, it can be easily formatted into a CSS `rgba()` string in JavaScript. This reference page doesn't have information about the absolute color space that should be used to interpret the RGB value—for example, sRGB, Adobe RGB, DCI-P3, and BT.2020. By default, applications should assume the sRGB color space. When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most `1e-5`. Example (Java): import com.google.type.Color; //... public static java.awt.Color fromProto(Color protocolor) { float alpha = protocolor.hasAlpha()? protocolor.getAlpha().getValue(): 1.0; return new java.awt.Color( protocolor.getRed(), protocolor.getGreen(), protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color color) { float red = (float) color.getRed(); float green = (float) color.getGreen(); float blue = (float) color.getBlue(); float denominator = 255.0; Color.Builder resultBuilder = Color.newBuilder().setRed(red / denominator).setGreen(green / denominator).setBlue(blue / denominator); int alpha = color.getAlpha(); if (alpha!= 255) { result.setAlpha( FloatValue.newBuilder().setValue(((float) alpha) / denominator).build()); } return resultBuilder.build(); } //... Example (iOS / Obj-C): //... static UIColor* fromProto(Color* protocolor) { float red = [protocolor red]; float green = [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper!= nil) { alpha = [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <= 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result autorelease]; return result; } //... Example (JavaScript): //... var protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0; var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0; var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255); var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value || 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(', rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor = function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 - hexString.length; var resultBuilder = ['#']; for (var i = 0; i < missingZeros; i++) { resultBuilder.push('0'); } resultBuilder.push(hexString); return resultBuilder.join(''); }; //...",
          ).optional(),
          disabled: z.unknown().describe(
            "If `true`, the button is displayed in an inactive state and doesn't respond to user actions.",
          ).optional(),
          icon: z.unknown().describe(
            "An icon displayed in a widget on a card. For an example in Google Chat apps, see [Add an icon](https://developers.google.com/workspace/chat/add-text-image-card-dialog#add_an_icon). Supports [built-in](https://developers.google.com/workspace/chat/format-messages#builtinicons) and [custom](https://developers.google.com/workspace/chat/format-messages#customicons) icons. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
          ).optional(),
          onClick: z.unknown().describe(
            "Represents how to respond when users click an interactive element on a card, such as a button. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
          ).optional(),
          text: z.unknown().describe("The text displayed inside the button.")
            .optional(),
          type: z.unknown().describe(
            "Optional. The type of a button. If unset, button type defaults to `OUTLINED`. If the `color` field is set, the button type is forced to `FILLED` and any value set for this field is ignored.",
          ).optional(),
        }).describe(
          "A text, icon, or text and icon button that users can click. For an example in Google Chat apps, see [Add a button](https://developers.google.com/workspace/chat/design-interactive-card-dialog#add_a_button). To make an image a clickable button, specify an `Image` (not an `ImageComponent`) and set an `onClick` action. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
        ).optional(),
      }).describe(
        "A persistent (sticky) footer that that appears at the bottom of the card. Setting `fixedFooter` without specifying a `primaryButton` or a `secondaryButton` causes an error. For Chat apps, you can use fixed footers in [dialogs](https://developers.google.com/workspace/chat/dialogs), but not [card messages](https://developers.google.com/workspace/chat/create-messages#create). For an example in Google Chat apps, see [Add a persistent footer](https://developers.google.com/workspace/chat/design-components-card-dialog#add_a_persistent_footer). [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
      ).optional(),
      header: z.object({
        imageAltText: z.string().describe(
          "The alternative text of this image that's used for accessibility.",
        ).optional(),
        imageType: z.enum(["SQUARE", "CIRCLE"]).describe(
          "The shape used to crop the image. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
        ).optional(),
        imageUrl: z.string().describe(
          "The HTTPS URL of the image in the card header.",
        ).optional(),
        subtitle: z.string().describe(
          "The subtitle of the card header. If specified, appears on its own line below the `title`.",
        ).optional(),
        title: z.string().describe(
          "Required. The title of the card header. The header has a fixed height: if both a title and subtitle are specified, each takes up one line. If only the title is specified, it takes up both lines.",
        ).optional(),
      }).describe(
        "Represents a card header. For an example in Google Chat apps, see [Add a header](https://developers.google.com/workspace/chat/design-components-card-dialog#add_a_header). [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
      ).optional(),
      name: z.string().describe(
        "Name of the card. Used as a card identifier in card navigation. [Google Workspace add-ons](https://developers.google.com/workspace/add-ons):",
      ).optional(),
      peekCardHeader: z.object({
        imageAltText: z.string().describe(
          "The alternative text of this image that's used for accessibility.",
        ).optional(),
        imageType: z.enum(["SQUARE", "CIRCLE"]).describe(
          "The shape used to crop the image. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
        ).optional(),
        imageUrl: z.string().describe(
          "The HTTPS URL of the image in the card header.",
        ).optional(),
        subtitle: z.string().describe(
          "The subtitle of the card header. If specified, appears on its own line below the `title`.",
        ).optional(),
        title: z.string().describe(
          "Required. The title of the card header. The header has a fixed height: if both a title and subtitle are specified, each takes up one line. If only the title is specified, it takes up both lines.",
        ).optional(),
      }).describe(
        "Represents a card header. For an example in Google Chat apps, see [Add a header](https://developers.google.com/workspace/chat/design-components-card-dialog#add_a_header). [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
      ).optional(),
      sectionDividerStyle: z.enum([
        "DIVIDER_STYLE_UNSPECIFIED",
        "SOLID_DIVIDER",
        "NO_DIVIDER",
      ]).describe("The divider style between the header, sections and footer.")
        .optional(),
      sections: z.array(z.object({
        collapseControl: z.unknown().describe(
          "Represent an expand and collapse control. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
        ).optional(),
        collapsible: z.unknown().describe(
          "Indicates whether this section is collapsible. Collapsible sections hide some or all widgets, but users can expand the section to reveal the hidden widgets by clicking **Show more**. Users can hide the widgets again by clicking **Show less**. To determine which widgets are hidden, specify `uncollapsibleWidgetsCount`.",
        ).optional(),
        header: z.unknown().describe(
          "Text that appears at the top of a section. Supports simple HTML formatted text. For more information about formatting text, see [Formatting text in Google Chat apps](https://developers.google.com/workspace/chat/format-messages#card-formatting) and [Formatting text in Google Workspace add-ons](https://developers.google.com/apps-script/add-ons/concepts/widgets#text_formatting).",
        ).optional(),
        id: z.unknown().describe(
          "A unique ID assigned to the section that's used to identify the section to be mutated. The ID has a character limit of 64 characters and should be in the format of `[a-zA-Z0-9-]+`. Available for Google Workspace add-ons that extend Google Workspace Studio. Unavailable for Google Chat apps.",
        ).optional(),
        uncollapsibleWidgetsCount: z.unknown().describe(
          "The number of uncollapsible widgets which remain visible even when a section is collapsed. For example, when a section contains five widgets and the `uncollapsibleWidgetsCount` is set to `2`, the first two widgets are always shown and the last three are collapsed by default. The `uncollapsibleWidgetsCount` is taken into account only when `collapsible` is `true`.",
        ).optional(),
        widgets: z.unknown().describe(
          "All the widgets in the section. Must contain at least one widget.",
        ).optional(),
      })).describe(
        "Contains a collection of widgets. Each section has its own, optional header. Sections are visually separated by a line divider. For an example in Google Chat apps, see [Define a section of a card](https://developers.google.com/workspace/chat/design-components-card-dialog#define_a_section_of_a_card).",
      ).optional(),
    }).describe(
      'A card interface displayed in a Google Chat message or Google Workspace add-on. Cards support a defined layout, interactive UI elements like buttons, and rich media like images. Use cards to present detailed information, gather information from users, and guide users to take a next step. [Card builder](https://addons.gsuite.google.com/uikit/builder) To learn how to build cards, see the following documentation: * For Google Chat apps, see [Design the components of a card or dialog](https://developers.google.com/workspace/chat/design-components-card-dialog). * For Google Workspace add-ons, see [Card-based interfaces](https://developers.google.com/apps-script/add-ons/concepts/cards). Note: You can add up to 100 widgets per card. If a section\'s widgets push the total count above 100, that entire section and all following sections are ignored. This limit applies to both card messages and dialogs in Google Chat apps, and to cards in Google Workspace add-ons. **Example: Card message for a Google Chat app**![Example contact card](https://developers.google.com/workspace/chat/images/card_api_reference.png) To create the sample card message in Google Chat, use the following JSON: ` { "cardsV2": [ { "cardId": "unique-card-id", "card": { "header": { "title": "Sasha", "subtitle": "Software Engineer", "imageUrl": "https://developers.google.com/workspace/chat/images/quickstart-app-avatar.png", "imageType": "CIRCLE", "imageAltText": "Avatar for Sasha" }, "sections": [ { "header": "Contact Info", "collapsible": true, "uncollapsibleWidgetsCount": 1, "widgets": [ { "decoratedText": { "startIcon": { "knownIcon": "EMAIL" }, "text": "sasha@example.com" } }, { "decoratedText": { "startIcon": { "knownIcon": "PERSON" }, "text": "Online" } }, { "decoratedText": { "startIcon": { "knownIcon": "PHONE" }, "text": "+1 (555) 555-1234" } }, { "buttonList": { "buttons": [ { "text": "Share", "onClick": { "openLink": { "url": "https://example.com/share" } } }, { "text": "Edit", "onClick": { "action": { "function": "goToView", "parameters": [ { "key": "viewType", "value": "EDIT" } ] } } } ] } } ] } ] } } ] } `',
    ).optional(),
    cardId: z.string().describe(
      "Required if the message contains multiple cards. A unique identifier for a card in a message.",
    ).optional(),
  })).describe(
    "Optional. An array of [cards](https://developers.google.com/workspace/chat/api/reference/rest/v1/cards). Chat apps can create cards with [app authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app). As part of the [Developer Preview Program](https://developers.google.com/workspace/preview), if your Chat app [authenticates as a user](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user), it can create card messages. If your Chat app is not part of Developer Preview Program, it can't create cards with user authentication. To learn how to create a message that contains cards, see [Send a message](https://developers.google.com/workspace/chat/create-messages). [Card builder](https://addons.gsuite.google.com/uikit/builder)",
  ).optional(),
  clientAssignedMessageId: z.string().describe(
    "Optional. A custom ID for the message. You can use field to identify a message, or to get, delete, or update a message. To set a custom ID, specify the [`messageId`](https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces.messages/create#body.QUERY_PARAMETERS.message_id) field when you create the message. For details, see [Name a message](https://developers.google.com/workspace/chat/create-messages#name_a_created_message).",
  ).optional(),
  deletionMetadata: z.object({
    deletionType: z.enum([
      "DELETION_TYPE_UNSPECIFIED",
      "CREATOR",
      "SPACE_OWNER",
      "ADMIN",
      "APP_MESSAGE_EXPIRY",
      "CREATOR_VIA_APP",
      "SPACE_OWNER_VIA_APP",
      "SPACE_MEMBER",
    ]).describe("Indicates who deleted the message.").optional(),
  }).describe(
    "Information about a deleted message. A message is deleted when `delete_time` is set.",
  ).optional(),
  fallbackText: z.string().describe(
    "Optional. A plain-text description of the message's cards, used when the actual cards can't be displayed—for example, mobile notifications.",
  ).optional(),
  matchedUrl: z.object({
    url: z.string().describe("Output only. The URL that was matched.")
      .optional(),
  }).describe(
    "A matched URL in a Chat message. Chat apps can preview matched URLs. For more information, see [Preview links](https://developers.google.com/chat/how-tos/preview-links).",
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name of the message. Format: `spaces/{space}/messages/{message}` Where `{space}` is the ID of the space where the message is posted and `{message}` is a system-assigned ID for the message. For example, `spaces/AAAAAAAAAAA/messages/BBBBBBBBBBB.BBBBBBBBBBB`. If you set a custom ID when you create a message, you can use this ID to specify the message in a request by replacing `{message}` with the value from the `clientAssignedMessageId` field. For example, `spaces/AAAAAAAAAAA/messages/client-custom-name`. For details, see [Name a message](https://developers.google.com/workspace/chat/create-messages#name_a_created_message).",
  ).optional(),
  privateMessageViewer: z.object({
    displayName: z.string().describe("Output only. The user's display name.")
      .optional(),
    domainId: z.string().describe(
      "Unique identifier of the user's Google Workspace domain.",
    ).optional(),
    isAnonymous: z.boolean().describe(
      "Output only. When `true`, the user is deleted or their profile is not visible.",
    ).optional(),
    name: z.string().describe(
      "Resource name for a Google Chat user. Format: `users/{user}`. `users/app` can be used as an alias for the calling app bot user. For human users, `{user}` is the same user identifier as: - the `id` for the [Person](https://developers.google.com/people/api/rest/v1/people) in the People API. For example, `users/123456789` in Chat API represents the same person as the `123456789` Person profile ID in People API. - the `id` for a [user](https://developers.google.com/admin-sdk/directory/reference/rest/v1/users) in the Admin SDK Directory API. - the user's email address can be used as an alias for `{user}` in API requests. For example, if the People API Person profile ID for `user@example.com` is `123456789`, you can use `users/user@example.com` as an alias to reference `users/123456789`. Only the canonical resource name (for example `users/123456789`) will be returned from the API.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "HUMAN", "BOT"]).describe("User type.")
      .optional(),
  }).describe(
    "A user in Google Chat. When returned as an output from a request, if your Chat app [authenticates as a user](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user), the output for a `User` resource only populates the user's `name` and `type`.",
  ).optional(),
  quotedMessageMetadata: z.object({
    forwardedMetadata: z.object({
      space: z.string().describe(
        "Output only. The resource name of the source space. Format: spaces/{space}",
      ).optional(),
      spaceDisplayName: z.string().describe(
        'Output only. The display name of the source space or DM at the time of forwarding. For `SPACE`, this is the space name. For `DIRECT_MESSAGE`, this is the other participant\'s name (e.g., "User A"). For `GROUP_CHAT`, this is a generated name based on members\' first names, limited to 5 including the creator (e.g., "User A, User B").',
      ).optional(),
    }).describe(
      "Metadata about the source space from which a message was forwarded.",
    ).optional(),
    lastUpdateTime: z.string().describe(
      "Required. The timestamp when the quoted message was created or when the quoted message was last updated. If the message was edited, use this field, `last_update_time`. If the message was never edited, use `create_time`. If `last_update_time` doesn't match the latest version of the quoted message, the request fails.",
    ).optional(),
    name: z.string().describe(
      "Required. Resource name of the message that is quoted. Format: `spaces/{space}/messages/{message}`",
    ).optional(),
    quoteType: z.enum(["QUOTE_TYPE_UNSPECIFIED", "REPLY"]).describe(
      "Optional. Specifies the quote type. If not set, defaults to REPLY in the message read/write path for backward compatibility.",
    ).optional(),
    quotedMessageSnapshot: z.object({
      annotations: z.array(z.object({
        customEmojiMetadata: z.object({
          customEmoji: z.unknown().describe(
            "Represents a [custom emoji](https://support.google.com/chat/answer/12800149).",
          ).optional(),
        }).describe("Annotation metadata for custom emoji.").optional(),
        length: z.number().int().describe(
          "Length of the substring in the plain-text message body this annotation corresponds to. If not present, indicates a length of 0.",
        ).optional(),
        richLinkMetadata: z.object({
          calendarEventLinkData: z.unknown().describe(
            "Data for Calendar event links.",
          ).optional(),
          chatSpaceLinkData: z.unknown().describe("Data for Chat space links.")
            .optional(),
          driveLinkData: z.unknown().describe("Data for Google Drive links.")
            .optional(),
          meetSpaceLinkData: z.unknown().describe("Data for Meet space links.")
            .optional(),
          richLinkType: z.unknown().describe("The rich link type.").optional(),
          uri: z.unknown().describe("The URI of this link.").optional(),
        }).describe(
          "A rich link to a resource. Rich links can be associated with the plain-text body of the message or represent chips that link to Google Workspace resources like Google Docs or Sheets with `start_index` and `length` of 0.",
        ).optional(),
        slashCommand: z.object({
          bot: z.unknown().describe(
            "A user in Google Chat. When returned as an output from a request, if your Chat app [authenticates as a user](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user), the output for a `User` resource only populates the user's `name` and `type`.",
          ).optional(),
          commandId: z.unknown().describe(
            "The command ID of the invoked slash command.",
          ).optional(),
          commandName: z.unknown().describe(
            "The name of the invoked slash command.",
          ).optional(),
          triggersDialog: z.unknown().describe(
            "Indicates whether the slash command is for a dialog.",
          ).optional(),
          type: z.unknown().describe("The type of slash command.").optional(),
        }).describe("Annotation metadata for slash commands (/).").optional(),
        startIndex: z.number().int().describe(
          "Start index (0-based, inclusive) in the plain-text message body this annotation corresponds to.",
        ).optional(),
        type: z.enum([
          "ANNOTATION_TYPE_UNSPECIFIED",
          "USER_MENTION",
          "SLASH_COMMAND",
          "RICH_LINK",
          "CUSTOM_EMOJI",
        ]).describe("The type of this annotation.").optional(),
        userMention: z.object({
          type: z.unknown().describe("The type of user mention.").optional(),
          user: z.unknown().describe(
            "A user in Google Chat. When returned as an output from a request, if your Chat app [authenticates as a user](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user), the output for a `User` resource only populates the user's `name` and `type`.",
          ).optional(),
        }).describe("Annotation metadata for user mentions (@).").optional(),
      })).describe(
        "Output only. Annotations parsed from the text body of the quoted message. Populated only for FORWARD quote type.",
      ).optional(),
      attachments: z.array(z.object({
        attachmentDataRef: z.object({
          attachmentUploadToken: z.unknown().describe(
            "Optional. Opaque token containing a reference to an uploaded attachment. Treated by clients as an opaque string and used to create or update Chat messages with attachments.",
          ).optional(),
          resourceName: z.unknown().describe(
            "Optional. The resource name of the attachment data. This field is used with the media API to download the attachment data.",
          ).optional(),
        }).describe("A reference to the attachment data.").optional(),
        contentName: z.string().describe(
          "Output only. The original file name for the content, not the full path.",
        ).optional(),
        contentType: z.string().describe(
          "Output only. The content type (MIME type) of the file.",
        ).optional(),
        downloadUri: z.string().describe(
          "Output only. The download URL which should be used to allow a human user to download the attachment. Chat apps shouldn't use this URL to download attachment content.",
        ).optional(),
        driveDataRef: z.object({
          driveFileId: z.unknown().describe(
            "The ID for the drive file. Use with the Drive API.",
          ).optional(),
        }).describe("A reference to the data of a drive attachment.")
          .optional(),
        name: z.string().describe(
          "Identifier. Resource name of the attachment. Format: `spaces/{space}/messages/{message}/attachments/{attachment}`.",
        ).optional(),
        source: z.enum(["SOURCE_UNSPECIFIED", "DRIVE_FILE", "UPLOADED_CONTENT"])
          .describe("Output only. The source of the attachment.").optional(),
        thumbnailUri: z.string().describe(
          "Output only. The thumbnail URL which should be used to preview the attachment to a human user. Chat apps shouldn't use this URL to download attachment content.",
        ).optional(),
      })).describe(
        "Output only. Attachments that were part of the quoted message. These are copies of the quoted message's attachment metadata. Populated only for FORWARD quote type.",
      ).optional(),
      formattedText: z.string().describe(
        "Output only. Contains the quoted message `text` with markups added to support rich formatting like hyperlinks,custom emojis, markup, etc. Populated only for FORWARD quote type.",
      ).optional(),
      sender: z.string().describe(
        "Output only. The quoted message's author name. Populated for both REPLY & FORWARD quote types.",
      ).optional(),
      text: z.string().describe(
        "Output only. Snapshot of the quoted message's text content.",
      ).optional(),
    }).describe(
      "Provides a snapshot of the content of the quoted message at the time of quoting or forwarding",
    ).optional(),
  }).describe(
    "Information about a message that another message quotes. When you create a message, you can quote messages within the same thread, or quote a root message to create a new root message. However, you can't quote a message reply from a different thread. When you update a message, you can't add or replace the `quotedMessageMetadata` field, but you can remove it. For example usage, see [Quote another message](https://developers.google.com/workspace/chat/create-messages#quote-a-message).",
  ).optional(),
  sender: z.object({
    displayName: z.string().describe("Output only. The user's display name.")
      .optional(),
    domainId: z.string().describe(
      "Unique identifier of the user's Google Workspace domain.",
    ).optional(),
    isAnonymous: z.boolean().describe(
      "Output only. When `true`, the user is deleted or their profile is not visible.",
    ).optional(),
    name: z.string().describe(
      "Resource name for a Google Chat user. Format: `users/{user}`. `users/app` can be used as an alias for the calling app bot user. For human users, `{user}` is the same user identifier as: - the `id` for the [Person](https://developers.google.com/people/api/rest/v1/people) in the People API. For example, `users/123456789` in Chat API represents the same person as the `123456789` Person profile ID in People API. - the `id` for a [user](https://developers.google.com/admin-sdk/directory/reference/rest/v1/users) in the Admin SDK Directory API. - the user's email address can be used as an alias for `{user}` in API requests. For example, if the People API Person profile ID for `user@example.com` is `123456789`, you can use `users/user@example.com` as an alias to reference `users/123456789`. Only the canonical resource name (for example `users/123456789`) will be returned from the API.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "HUMAN", "BOT"]).describe("User type.")
      .optional(),
  }).describe(
    "A user in Google Chat. When returned as an output from a request, if your Chat app [authenticates as a user](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user), the output for a `User` resource only populates the user's `name` and `type`.",
  ).optional(),
  slashCommand: z.object({
    commandId: z.string().describe("The ID of the slash command.").optional(),
  }).describe(
    "Metadata about a [slash command](https://developers.google.com/workspace/chat/commands) in Google Chat.",
  ).optional(),
  space: z.object({
    accessSettings: z.object({
      accessState: z.enum([
        "ACCESS_STATE_UNSPECIFIED",
        "PRIVATE",
        "DISCOVERABLE",
      ]).describe("Output only. Indicates the access state of the space.")
        .optional(),
      audience: z.string().describe(
        "Optional. The resource name of the [target audience](https://support.google.com/a/answer/9934697) who can discover the space, join the space, and preview the messages in the space. If unset, only users or Google Groups who have been individually invited or added to the space can access it. For details, see [Make a space discoverable to a target audience](https://developers.google.com/workspace/chat/space-target-audience). Format: `audiences/{audience}` To use the default target audience for the Google Workspace organization, set to `audiences/default`. Reading the target audience supports: - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with [administrator approval](https://support.google.com/a?p=chat-app-auth) with the `chat.app.spaces` scope. This field is not populated when using the `chat.bot` scope with [app authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app). Setting the target audience requires [user authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user).",
      ).optional(),
    }).describe(
      "Represents the [access setting](https://support.google.com/chat/answer/11971020) of the space.",
    ).optional(),
    adminInstalled: z.boolean().describe(
      "Output only. For direct message (DM) spaces with a Chat app, whether the space was created by a Google Workspace administrator. Administrators can install and set up a direct message with a Chat app on behalf of users in their organization. To support admin install, your Chat app must feature direct messaging.",
    ).optional(),
    createTime: z.string().describe(
      "Optional. Immutable. For spaces created in Chat, the time the space was created. This field is output only, except when used in import mode spaces. For import mode spaces, set this field to the historical timestamp at which the space was created in the source in order to preserve the original creation time. Only populated in the output when `spaceType` is `GROUP_CHAT` or `SPACE`.",
    ).optional(),
    customer: z.string().describe(
      "Optional. Immutable. The customer id of the domain of the space. Required only when creating a space with [app authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) and `SpaceType` is `SPACE`, otherwise should not be set. In the format `customers/{customer}`, where `customer` is the `id` from the [Admin SDK customer resource](https://developers.google.com/admin-sdk/directory/reference/rest/v1/customers). Private apps can also use the `customers/my_customer` alias to create the space in the same Google Workspace organization as the app. This field isn't populated for direct messages (DMs) or when the space is created by non-Google Workspace users.",
    ).optional(),
    displayName: z.string().describe(
      "Optional. The space's display name. Required when [creating a space](https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces/create) with a `spaceType` of `SPACE`. If you receive the error message `ALREADY_EXISTS` when creating a space or updating the `displayName`, try a different `displayName`. An existing space within the Google Workspace organization might already use this display name. For direct messages, this field might be empty. Supports up to 128 characters.",
    ).optional(),
    externalUserAllowed: z.boolean().describe(
      "Optional. Immutable. Whether this space permits any Google Chat user as a member. Input when creating a space in a Google Workspace organization. Omit this field when creating spaces in the following conditions: * The authenticated user uses a consumer account (unmanaged user account). By default, a space created by a consumer account permits any Google Chat user. For existing spaces, this field is output only.",
    ).optional(),
    importMode: z.boolean().describe(
      "Optional. Whether this space is created in `Import Mode` as part of a data migration into Google Workspace. While spaces are being imported, they aren't visible to users until the import is complete. Creating a space in `Import Mode`requires [user authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user).",
    ).optional(),
    importModeExpireTime: z.string().describe(
      "Output only. The time when the space will be automatically deleted by the system if it remains in import mode. Each space created in import mode must exit this mode before this expire time using `spaces.completeImport`. This field is only populated for spaces that were created with import mode.",
    ).optional(),
    lastActiveTime: z.string().describe(
      "Output only. Timestamp of the last message in the space.",
    ).optional(),
    membershipCount: z.object({
      joinedDirectHumanUserCount: z.number().int().describe(
        "Output only. Count of human users that have directly joined the space, not counting users joined by having membership in a joined group.",
      ).optional(),
      joinedGroupCount: z.number().int().describe(
        "Output only. Count of all groups that have directly joined the space.",
      ).optional(),
    }).describe(
      "Represents the count of memberships of a space, grouped into categories.",
    ).optional(),
    name: z.string().describe(
      "Identifier. Resource name of the space. Format: `spaces/{space}` Where `{space}` represents the system-assigned ID for the space. You can obtain the space ID by calling the [`spaces.list()`](https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces/list) method or from the space URL. For example, if the space URL is `https://mail.google.com/mail/u/0/#chat/space/AAAAAAAAA`, the space ID is `AAAAAAAAA`.",
    ).optional(),
    permissionSettings: z.object({
      manageApps: z.object({
        assistantManagersAllowed: z.boolean().describe(
          "Optional. Whether space managers `ROLE_ASSISTANT_MANAGER`) have this permission.",
        ).optional(),
        managersAllowed: z.boolean().describe(
          "Optional. Whether space owners (`ROLE_MANAGER`) have this permission.",
        ).optional(),
        membersAllowed: z.boolean().describe(
          "Optional. Whether basic space members (`ROLE_MEMBER`) have this permission.",
        ).optional(),
      }).describe("Represents a space permission setting.").optional(),
      manageMembersAndGroups: z.object({
        assistantManagersAllowed: z.boolean().describe(
          "Optional. Whether space managers `ROLE_ASSISTANT_MANAGER`) have this permission.",
        ).optional(),
        managersAllowed: z.boolean().describe(
          "Optional. Whether space owners (`ROLE_MANAGER`) have this permission.",
        ).optional(),
        membersAllowed: z.boolean().describe(
          "Optional. Whether basic space members (`ROLE_MEMBER`) have this permission.",
        ).optional(),
      }).describe("Represents a space permission setting.").optional(),
      manageWebhooks: z.object({
        assistantManagersAllowed: z.boolean().describe(
          "Optional. Whether space managers `ROLE_ASSISTANT_MANAGER`) have this permission.",
        ).optional(),
        managersAllowed: z.boolean().describe(
          "Optional. Whether space owners (`ROLE_MANAGER`) have this permission.",
        ).optional(),
        membersAllowed: z.boolean().describe(
          "Optional. Whether basic space members (`ROLE_MEMBER`) have this permission.",
        ).optional(),
      }).describe("Represents a space permission setting.").optional(),
      modifySpaceDetails: z.object({
        assistantManagersAllowed: z.boolean().describe(
          "Optional. Whether space managers `ROLE_ASSISTANT_MANAGER`) have this permission.",
        ).optional(),
        managersAllowed: z.boolean().describe(
          "Optional. Whether space owners (`ROLE_MANAGER`) have this permission.",
        ).optional(),
        membersAllowed: z.boolean().describe(
          "Optional. Whether basic space members (`ROLE_MEMBER`) have this permission.",
        ).optional(),
      }).describe("Represents a space permission setting.").optional(),
      postMessages: z.object({
        assistantManagersAllowed: z.boolean().describe(
          "Optional. Whether space managers `ROLE_ASSISTANT_MANAGER`) have this permission.",
        ).optional(),
        managersAllowed: z.boolean().describe(
          "Optional. Whether space owners (`ROLE_MANAGER`) have this permission.",
        ).optional(),
        membersAllowed: z.boolean().describe(
          "Optional. Whether basic space members (`ROLE_MEMBER`) have this permission.",
        ).optional(),
      }).describe("Represents a space permission setting.").optional(),
      replyMessages: z.object({
        assistantManagersAllowed: z.boolean().describe(
          "Optional. Whether space managers `ROLE_ASSISTANT_MANAGER`) have this permission.",
        ).optional(),
        managersAllowed: z.boolean().describe(
          "Optional. Whether space owners (`ROLE_MANAGER`) have this permission.",
        ).optional(),
        membersAllowed: z.boolean().describe(
          "Optional. Whether basic space members (`ROLE_MEMBER`) have this permission.",
        ).optional(),
      }).describe("Represents a space permission setting.").optional(),
      toggleHistory: z.object({
        assistantManagersAllowed: z.boolean().describe(
          "Optional. Whether space managers `ROLE_ASSISTANT_MANAGER`) have this permission.",
        ).optional(),
        managersAllowed: z.boolean().describe(
          "Optional. Whether space owners (`ROLE_MANAGER`) have this permission.",
        ).optional(),
        membersAllowed: z.boolean().describe(
          "Optional. Whether basic space members (`ROLE_MEMBER`) have this permission.",
        ).optional(),
      }).describe("Represents a space permission setting.").optional(),
      useAtMentionAll: z.object({
        assistantManagersAllowed: z.boolean().describe(
          "Optional. Whether space managers `ROLE_ASSISTANT_MANAGER`) have this permission.",
        ).optional(),
        managersAllowed: z.boolean().describe(
          "Optional. Whether space owners (`ROLE_MANAGER`) have this permission.",
        ).optional(),
        membersAllowed: z.boolean().describe(
          "Optional. Whether basic space members (`ROLE_MEMBER`) have this permission.",
        ).optional(),
      }).describe("Represents a space permission setting.").optional(),
    }).describe(
      "[Permission settings](https://support.google.com/chat/answer/13340792) that you can specify when updating an existing named space. To set permission settings when creating a space, specify the `PredefinedPermissionSettings` field in your request.",
    ).optional(),
    predefinedPermissionSettings: z.enum([
      "PREDEFINED_PERMISSION_SETTINGS_UNSPECIFIED",
      "COLLABORATION_SPACE",
      "ANNOUNCEMENT_SPACE",
    ]).describe(
      "Optional. Input only. Predefined space permission settings, input only when creating a space. If the field is not set, a collaboration space is created. After you create the space, settings are populated in the `PermissionSettings` field. Setting predefined permission settings supports: - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with [administrator approval](https://support.google.com/a?p=chat-app-auth) with the `chat.app.spaces` or `chat.app.spaces.create` scopes. - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user)",
    ).optional(),
    singleUserBotDm: z.boolean().describe(
      "Optional. Whether the space is a DM between a Chat app and a single human.",
    ).optional(),
    spaceDetails: z.object({
      description: z.string().describe(
        "Optional. A description of the space. For example, describe the space's discussion topic, functional purpose, or participants. Supports up to 150 characters.",
      ).optional(),
      guidelines: z.string().describe(
        "Optional. The space's rules, expectations, and etiquette. Supports up to 5,000 characters.",
      ).optional(),
    }).describe("Details about the space including description and rules.")
      .optional(),
    spaceHistoryState: z.enum([
      "HISTORY_STATE_UNSPECIFIED",
      "HISTORY_OFF",
      "HISTORY_ON",
    ]).describe(
      "Optional. The message history state for messages and threads in this space.",
    ).optional(),
    spaceThreadingState: z.enum([
      "SPACE_THREADING_STATE_UNSPECIFIED",
      "THREADED_MESSAGES",
      "GROUPED_MESSAGES",
      "UNTHREADED_MESSAGES",
    ]).describe("Output only. The threading state in the Chat space.")
      .optional(),
    spaceType: z.enum([
      "SPACE_TYPE_UNSPECIFIED",
      "SPACE",
      "GROUP_CHAT",
      "DIRECT_MESSAGE",
    ]).describe(
      "Optional. The type of space. Required when creating a space or updating the space type of a space. Output only for other usage.",
    ).optional(),
    spaceUri: z.string().describe(
      "Output only. The URI for a user to access the space.",
    ).optional(),
    threaded: z.boolean().describe(
      "Output only. Deprecated: Use `spaceThreadingState` instead. Whether messages are threaded in this space.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "ROOM", "DM"]).describe(
      "Output only. Deprecated: Use `space_type` instead. The type of a space.",
    ).optional(),
  }).describe(
    "A space in Google Chat. Spaces are conversations between two or more users or 1:1 messages between a user and a Chat app.",
  ).optional(),
  text: z.string().describe(
    "Optional. Plain-text body of the message. The first link to an image, video, or web page generates a [preview chip](https://developers.google.com/workspace/chat/preview-links). You can also [@mention a Google Chat user](https://developers.google.com/workspace/chat/format-messages#messages-@mention), or everyone in the space. To learn about creating text messages, see [Send a message](https://developers.google.com/workspace/chat/create-messages).",
  ).optional(),
  thread: z.object({
    name: z.string().describe(
      "Identifier. Resource name of the thread. Example: `spaces/{space}/threads/{thread}`",
    ).optional(),
    threadKey: z.string().describe(
      "Optional. Input for creating or updating a thread. Otherwise, output only. ID for the thread. Supports up to 4000 characters. This ID is unique to the Chat app that sets it. For example, if multiple Chat apps create a message using the same thread key, the messages are posted in different threads. To reply in a thread created by a person or another Chat app, specify the thread `name` field instead.",
    ).optional(),
  }).describe(
    "A thread in a Google Chat space. For example usage, see [Start or reply to a message thread](https://developers.google.com/workspace/chat/create-messages#create-message-thread). If you specify a thread when creating a message, you can set the [`messageReplyOption`](https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces.messages/create#messagereplyoption) field to determine what happens if no matching thread is found.",
  ).optional(),
  messageId: z.string().describe(
    "Optional. A custom ID for a message. Lets Chat apps get, update, or delete a message without needing to store the system-assigned ID in the message's resource name (represented in the message `name` field). The value for this field must meet the following requirements: * Begins with `client-`. For example, `client-custom-name` is a valid custom ID, but `custom-name` is not. * Contains up to 63 characters and only lowercase letters, numbers, and hyphens. * Is unique within a space. A Chat app can't use the same custom ID for different messages. For details, see [Name a message](https://developers.google.com/workspace/chat/create-messages#name_a_created_message).",
  ).optional(),
  messageReplyOption: z.string().describe(
    "Optional. Specifies whether a message starts a thread or replies to one. Only supported in named spaces. When [responding to user interactions](https://developers.google.com/workspace/chat/receive-respond-interactions), this field is ignored. For interactions within a thread, the reply is created in the same thread. Otherwise, the reply is created as a new thread.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A unique request ID for this message. Specifying an existing request ID returns the message created with that ID instead of creating a new message.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  accessoryWidgets: z.array(z.object({
    buttonList: z.object({
      buttons: z.array(z.object({
        altText: z.unknown(),
        color: z.unknown(),
        disabled: z.unknown(),
        icon: z.unknown(),
        onClick: z.unknown(),
        text: z.unknown(),
        type: z.unknown(),
      })),
    }),
  })).optional(),
  actionResponse: z.object({
    dialogAction: z.object({
      actionStatus: z.object({
        statusCode: z.string(),
        userFacingMessage: z.string(),
      }),
      dialog: z.object({
        body: z.object({
          cardActions: z.array(z.unknown()),
          displayStyle: z.string(),
          expressionData: z.array(z.unknown()),
          fixedFooter: z.object({
            primaryButton: z.unknown(),
            secondaryButton: z.unknown(),
          }),
          header: z.object({
            imageAltText: z.unknown(),
            imageType: z.unknown(),
            imageUrl: z.unknown(),
            subtitle: z.unknown(),
            title: z.unknown(),
          }),
          name: z.string(),
          peekCardHeader: z.object({
            imageAltText: z.unknown(),
            imageType: z.unknown(),
            imageUrl: z.unknown(),
            subtitle: z.unknown(),
            title: z.unknown(),
          }),
          sectionDividerStyle: z.string(),
          sections: z.array(z.unknown()),
        }),
      }),
    }),
    type: z.string(),
    updatedWidget: z.object({
      suggestions: z.object({
        items: z.array(z.object({
          bottomText: z.unknown(),
          selected: z.unknown(),
          startIconUri: z.unknown(),
          text: z.unknown(),
          value: z.unknown(),
        })),
      }),
      widget: z.string(),
    }),
    url: z.string(),
  }).optional(),
  annotations: z.array(z.object({
    customEmojiMetadata: z.object({
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
    }),
    length: z.number(),
    richLinkMetadata: z.object({
      calendarEventLinkData: z.object({
        calendarId: z.string(),
        eventId: z.string(),
      }),
      chatSpaceLinkData: z.object({
        message: z.string(),
        space: z.string(),
        thread: z.string(),
      }),
      driveLinkData: z.object({
        driveDataRef: z.object({
          driveFileId: z.unknown(),
        }),
        mimeType: z.string(),
      }),
      meetSpaceLinkData: z.object({
        huddleStatus: z.string(),
        meetingCode: z.string(),
        type: z.string(),
      }),
      richLinkType: z.string(),
      uri: z.string(),
    }),
    slashCommand: z.object({
      bot: z.object({
        displayName: z.string(),
        domainId: z.string(),
        isAnonymous: z.boolean(),
        name: z.string(),
        type: z.string(),
      }),
      commandId: z.string(),
      commandName: z.string(),
      triggersDialog: z.boolean(),
      type: z.string(),
    }),
    startIndex: z.number(),
    type: z.string(),
    userMention: z.object({
      type: z.string(),
      user: z.object({
        displayName: z.string(),
        domainId: z.string(),
        isAnonymous: z.boolean(),
        name: z.string(),
        type: z.string(),
      }),
    }),
  })).optional(),
  argumentText: z.string().optional(),
  attachedGifs: z.array(z.object({
    uri: z.string(),
  })).optional(),
  attachment: z.array(z.object({
    attachmentDataRef: z.object({
      attachmentUploadToken: z.string(),
      resourceName: z.string(),
    }),
    contentName: z.string(),
    contentType: z.string(),
    downloadUri: z.string(),
    driveDataRef: z.object({
      driveFileId: z.string(),
    }),
    name: z.string(),
    source: z.string(),
    thumbnailUri: z.string(),
  })).optional(),
  cards: z.array(z.object({
    cardActions: z.array(z.object({
      actionLabel: z.string(),
      onClick: z.object({
        action: z.unknown(),
        openLink: z.unknown(),
      }),
    })),
    header: z.object({
      imageStyle: z.string(),
      imageUrl: z.string(),
      subtitle: z.string(),
      title: z.string(),
    }),
    name: z.string(),
    sections: z.array(z.object({
      header: z.string(),
      widgets: z.array(z.unknown()),
    })),
  })).optional(),
  cardsV2: z.array(z.object({
    card: z.object({
      cardActions: z.array(z.object({
        actionLabel: z.unknown(),
        onClick: z.unknown(),
      })),
      displayStyle: z.string(),
      expressionData: z.array(z.object({
        conditions: z.unknown(),
        eventActions: z.unknown(),
        expression: z.unknown(),
        id: z.unknown(),
      })),
      fixedFooter: z.object({
        primaryButton: z.object({
          altText: z.unknown(),
          color: z.unknown(),
          disabled: z.unknown(),
          icon: z.unknown(),
          onClick: z.unknown(),
          text: z.unknown(),
          type: z.unknown(),
        }),
        secondaryButton: z.object({
          altText: z.unknown(),
          color: z.unknown(),
          disabled: z.unknown(),
          icon: z.unknown(),
          onClick: z.unknown(),
          text: z.unknown(),
          type: z.unknown(),
        }),
      }),
      header: z.object({
        imageAltText: z.string(),
        imageType: z.string(),
        imageUrl: z.string(),
        subtitle: z.string(),
        title: z.string(),
      }),
      name: z.string(),
      peekCardHeader: z.object({
        imageAltText: z.string(),
        imageType: z.string(),
        imageUrl: z.string(),
        subtitle: z.string(),
        title: z.string(),
      }),
      sectionDividerStyle: z.string(),
      sections: z.array(z.object({
        collapseControl: z.unknown(),
        collapsible: z.unknown(),
        header: z.unknown(),
        id: z.unknown(),
        uncollapsibleWidgetsCount: z.unknown(),
        widgets: z.unknown(),
      })),
    }),
    cardId: z.string(),
  })).optional(),
  clientAssignedMessageId: z.string().optional(),
  createTime: z.string().optional(),
  deleteTime: z.string().optional(),
  deletionMetadata: z.object({
    deletionType: z.string(),
  }).optional(),
  emojiReactionSummaries: z.array(z.object({
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
    reactionCount: z.number(),
  })).optional(),
  fallbackText: z.string().optional(),
  formattedText: z.string().optional(),
  lastUpdateTime: z.string().optional(),
  matchedUrl: z.object({
    url: z.string(),
  }).optional(),
  name: z.string(),
  privateMessageViewer: z.object({
    displayName: z.string(),
    domainId: z.string(),
    isAnonymous: z.boolean(),
    name: z.string(),
    type: z.string(),
  }).optional(),
  quotedMessageMetadata: z.object({
    forwardedMetadata: z.object({
      space: z.string(),
      spaceDisplayName: z.string(),
    }),
    lastUpdateTime: z.string(),
    name: z.string(),
    quoteType: z.string(),
    quotedMessageSnapshot: z.object({
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
      attachments: z.array(z.object({
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
      formattedText: z.string(),
      sender: z.string(),
      text: z.string(),
    }),
  }).optional(),
  sender: z.object({
    displayName: z.string(),
    domainId: z.string(),
    isAnonymous: z.boolean(),
    name: z.string(),
    type: z.string(),
  }).optional(),
  slashCommand: z.object({
    commandId: z.string(),
  }).optional(),
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
  }).optional(),
  text: z.string().optional(),
  thread: z.object({
    name: z.string(),
    threadKey: z.string(),
  }).optional(),
  threadReply: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessoryWidgets: z.array(z.object({
    buttonList: z.object({
      buttons: z.array(z.object({
        altText: z.unknown().describe(
          'The alternative text that\'s used for accessibility. Set descriptive text that lets users know what the button does. For example, if a button opens a hyperlink, you might write: "Opens a new browser tab and navigates to the Google Chat developer documentation at https://developers.google.com/workspace/chat".',
        ).optional(),
        color: z.unknown().describe(
          "Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to and from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of `java.awt.Color` in Java; it can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha` method in iOS; and, with just a little work, it can be easily formatted into a CSS `rgba()` string in JavaScript. This reference page doesn't have information about the absolute color space that should be used to interpret the RGB value—for example, sRGB, Adobe RGB, DCI-P3, and BT.2020. By default, applications should assume the sRGB color space. When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most `1e-5`. Example (Java): import com.google.type.Color; //... public static java.awt.Color fromProto(Color protocolor) { float alpha = protocolor.hasAlpha()? protocolor.getAlpha().getValue(): 1.0; return new java.awt.Color( protocolor.getRed(), protocolor.getGreen(), protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color color) { float red = (float) color.getRed(); float green = (float) color.getGreen(); float blue = (float) color.getBlue(); float denominator = 255.0; Color.Builder resultBuilder = Color.newBuilder().setRed(red / denominator).setGreen(green / denominator).setBlue(blue / denominator); int alpha = color.getAlpha(); if (alpha!= 255) { result.setAlpha( FloatValue.newBuilder().setValue(((float) alpha) / denominator).build()); } return resultBuilder.build(); } //... Example (iOS / Obj-C): //... static UIColor* fromProto(Color* protocolor) { float red = [protocolor red]; float green = [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper!= nil) { alpha = [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <= 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result autorelease]; return result; } //... Example (JavaScript): //... var protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0; var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0; var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255); var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value || 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(', rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor = function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 - hexString.length; var resultBuilder = ['#']; for (var i = 0; i < missingZeros; i++) { resultBuilder.push('0'); } resultBuilder.push(hexString); return resultBuilder.join(''); }; //...",
        ).optional(),
        disabled: z.unknown().describe(
          "If `true`, the button is displayed in an inactive state and doesn't respond to user actions.",
        ).optional(),
        icon: z.unknown().describe(
          "An icon displayed in a widget on a card. For an example in Google Chat apps, see [Add an icon](https://developers.google.com/workspace/chat/add-text-image-card-dialog#add_an_icon). Supports [built-in](https://developers.google.com/workspace/chat/format-messages#builtinicons) and [custom](https://developers.google.com/workspace/chat/format-messages#customicons) icons. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
        ).optional(),
        onClick: z.unknown().describe(
          "Represents how to respond when users click an interactive element on a card, such as a button. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
        ).optional(),
        text: z.unknown().describe("The text displayed inside the button.")
          .optional(),
        type: z.unknown().describe(
          "Optional. The type of a button. If unset, button type defaults to `OUTLINED`. If the `color` field is set, the button type is forced to `FILLED` and any value set for this field is ignored.",
        ).optional(),
      })).describe("An array of buttons.").optional(),
    }).describe(
      "A list of buttons layed out horizontally. For an example in Google Chat apps, see [Add a button](https://developers.google.com/workspace/chat/design-interactive-card-dialog#add_a_button). [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
    ).optional(),
  })).describe(
    "Optional. One or more interactive widgets that appear at the bottom of a message. You can add accessory widgets to messages that contain text, cards, or both text and cards. Not supported for messages that contain dialogs. For details, see [Add interactive widgets at the bottom of a message](https://developers.google.com/workspace/chat/create-messages#add-accessory-widgets). Creating a message with accessory widgets requires [app authentication] (https://developers.google.com/workspace/chat/authenticate-authorize-chat-app).",
  ).optional(),
  actionResponse: z.object({
    dialogAction: z.object({
      actionStatus: z.object({
        statusCode: z.enum([
          "OK",
          "CANCELLED",
          "UNKNOWN",
          "INVALID_ARGUMENT",
          "DEADLINE_EXCEEDED",
          "NOT_FOUND",
          "ALREADY_EXISTS",
          "PERMISSION_DENIED",
          "UNAUTHENTICATED",
          "RESOURCE_EXHAUSTED",
          "FAILED_PRECONDITION",
          "ABORTED",
          "OUT_OF_RANGE",
          "UNIMPLEMENTED",
          "INTERNAL",
          "UNAVAILABLE",
          "DATA_LOSS",
        ]).describe("The status code.").optional(),
        userFacingMessage: z.string().describe(
          "The message to send users about the status of their request. If unset, a generic message based on the `status_code` is sent.",
        ).optional(),
      }).describe(
        "Represents the status for a request to either invoke or submit a [dialog](https://developers.google.com/workspace/chat/dialogs).",
      ).optional(),
      dialog: z.object({
        body: z.object({
          cardActions: z.array(z.unknown()).describe(
            'The card\'s actions. Actions are added to the card\'s toolbar menu. [Google Workspace add-ons](https://developers.google.com/workspace/add-ons): For example, the following JSON constructs a card action menu with `Settings` and `Send Feedback` options: ` "card_actions": [ { "actionLabel": "Settings", "onClick": { "action": { "functionName": "goToView", "parameters": [ { "key": "viewType", "value": "SETTING" } ], "loadIndicator": "LoadIndicator.SPINNER" } } }, { "actionLabel": "Send Feedback", "onClick": { "openLink": { "url": "https://example.com/feedback" } } } ] `',
          ).optional(),
          displayStyle: z.enum(["DISPLAY_STYLE_UNSPECIFIED", "PEEK", "REPLACE"])
            .describe(
              "In Google Workspace add-ons, sets the display properties of the `peekCardHeader`. [Google Workspace add-ons](https://developers.google.com/workspace/add-ons):",
            ).optional(),
          expressionData: z.array(z.unknown()).describe(
            "The expression data for the card. Available for Google Workspace add-ons that extend Google Workspace Studio. Unavailable for Google Chat apps.",
          ).optional(),
          fixedFooter: z.object({
            primaryButton: z.unknown().describe(
              "A text, icon, or text and icon button that users can click. For an example in Google Chat apps, see [Add a button](https://developers.google.com/workspace/chat/design-interactive-card-dialog#add_a_button). To make an image a clickable button, specify an `Image` (not an `ImageComponent`) and set an `onClick` action. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
            ).optional(),
            secondaryButton: z.unknown().describe(
              "A text, icon, or text and icon button that users can click. For an example in Google Chat apps, see [Add a button](https://developers.google.com/workspace/chat/design-interactive-card-dialog#add_a_button). To make an image a clickable button, specify an `Image` (not an `ImageComponent`) and set an `onClick` action. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
            ).optional(),
          }).describe(
            "A persistent (sticky) footer that that appears at the bottom of the card. Setting `fixedFooter` without specifying a `primaryButton` or a `secondaryButton` causes an error. For Chat apps, you can use fixed footers in [dialogs](https://developers.google.com/workspace/chat/dialogs), but not [card messages](https://developers.google.com/workspace/chat/create-messages#create). For an example in Google Chat apps, see [Add a persistent footer](https://developers.google.com/workspace/chat/design-components-card-dialog#add_a_persistent_footer). [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
          ).optional(),
          header: z.object({
            imageAltText: z.unknown().describe(
              "The alternative text of this image that's used for accessibility.",
            ).optional(),
            imageType: z.unknown().describe(
              "The shape used to crop the image. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
            ).optional(),
            imageUrl: z.unknown().describe(
              "The HTTPS URL of the image in the card header.",
            ).optional(),
            subtitle: z.unknown().describe(
              "The subtitle of the card header. If specified, appears on its own line below the `title`.",
            ).optional(),
            title: z.unknown().describe(
              "Required. The title of the card header. The header has a fixed height: if both a title and subtitle are specified, each takes up one line. If only the title is specified, it takes up both lines.",
            ).optional(),
          }).describe(
            "Represents a card header. For an example in Google Chat apps, see [Add a header](https://developers.google.com/workspace/chat/design-components-card-dialog#add_a_header). [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
          ).optional(),
          name: z.string().describe(
            "Name of the card. Used as a card identifier in card navigation. [Google Workspace add-ons](https://developers.google.com/workspace/add-ons):",
          ).optional(),
          peekCardHeader: z.object({
            imageAltText: z.unknown().describe(
              "The alternative text of this image that's used for accessibility.",
            ).optional(),
            imageType: z.unknown().describe(
              "The shape used to crop the image. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
            ).optional(),
            imageUrl: z.unknown().describe(
              "The HTTPS URL of the image in the card header.",
            ).optional(),
            subtitle: z.unknown().describe(
              "The subtitle of the card header. If specified, appears on its own line below the `title`.",
            ).optional(),
            title: z.unknown().describe(
              "Required. The title of the card header. The header has a fixed height: if both a title and subtitle are specified, each takes up one line. If only the title is specified, it takes up both lines.",
            ).optional(),
          }).describe(
            "Represents a card header. For an example in Google Chat apps, see [Add a header](https://developers.google.com/workspace/chat/design-components-card-dialog#add_a_header). [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
          ).optional(),
          sectionDividerStyle: z.enum([
            "DIVIDER_STYLE_UNSPECIFIED",
            "SOLID_DIVIDER",
            "NO_DIVIDER",
          ]).describe(
            "The divider style between the header, sections and footer.",
          ).optional(),
          sections: z.array(z.unknown()).describe(
            "Contains a collection of widgets. Each section has its own, optional header. Sections are visually separated by a line divider. For an example in Google Chat apps, see [Define a section of a card](https://developers.google.com/workspace/chat/design-components-card-dialog#define_a_section_of_a_card).",
          ).optional(),
        }).describe(
          'A card interface displayed in a Google Chat message or Google Workspace add-on. Cards support a defined layout, interactive UI elements like buttons, and rich media like images. Use cards to present detailed information, gather information from users, and guide users to take a next step. [Card builder](https://addons.gsuite.google.com/uikit/builder) To learn how to build cards, see the following documentation: * For Google Chat apps, see [Design the components of a card or dialog](https://developers.google.com/workspace/chat/design-components-card-dialog). * For Google Workspace add-ons, see [Card-based interfaces](https://developers.google.com/apps-script/add-ons/concepts/cards). Note: You can add up to 100 widgets per card. If a section\'s widgets push the total count above 100, that entire section and all following sections are ignored. This limit applies to both card messages and dialogs in Google Chat apps, and to cards in Google Workspace add-ons. **Example: Card message for a Google Chat app**![Example contact card](https://developers.google.com/workspace/chat/images/card_api_reference.png) To create the sample card message in Google Chat, use the following JSON: ` { "cardsV2": [ { "cardId": "unique-card-id", "card": { "header": { "title": "Sasha", "subtitle": "Software Engineer", "imageUrl": "https://developers.google.com/workspace/chat/images/quickstart-app-avatar.png", "imageType": "CIRCLE", "imageAltText": "Avatar for Sasha" }, "sections": [ { "header": "Contact Info", "collapsible": true, "uncollapsibleWidgetsCount": 1, "widgets": [ { "decoratedText": { "startIcon": { "knownIcon": "EMAIL" }, "text": "sasha@example.com" } }, { "decoratedText": { "startIcon": { "knownIcon": "PERSON" }, "text": "Online" } }, { "decoratedText": { "startIcon": { "knownIcon": "PHONE" }, "text": "+1 (555) 555-1234" } }, { "buttonList": { "buttons": [ { "text": "Share", "onClick": { "openLink": { "url": "https://example.com/share" } } }, { "text": "Edit", "onClick": { "action": { "function": "goToView", "parameters": [ { "key": "viewType", "value": "EDIT" } ] } } } ] } } ] } ] } } ] } `',
        ).optional(),
      }).describe("Wrapper around the card body of the dialog.").optional(),
    }).describe(
      "Contains a [dialog](https://developers.google.com/workspace/chat/dialogs) and request status code.",
    ).optional(),
    type: z.enum([
      "TYPE_UNSPECIFIED",
      "NEW_MESSAGE",
      "UPDATE_MESSAGE",
      "UPDATE_USER_MESSAGE_CARDS",
      "REQUEST_CONFIG",
      "DIALOG",
      "UPDATE_WIDGET",
    ]).describe("Input only. The type of Chat app response.").optional(),
    updatedWidget: z.object({
      suggestions: z.object({
        items: z.array(z.object({
          bottomText: z.unknown().describe(
            "For multiselect menus, a text description or label that's displayed below the item's `text` field.",
          ).optional(),
          selected: z.unknown().describe(
            "Whether the item is selected by default. If the selection input only accepts one value (such as for radio buttons or a dropdown menu), only set this field for one item.",
          ).optional(),
          startIconUri: z.unknown().optional(),
          text: z.unknown().describe(
            "The text that identifies or describes the item to users.",
          ).optional(),
          value: z.unknown().describe(
            "The value associated with this item. The client should use this as a form input value. For details about working with form inputs, see [Receive form data](https://developers.google.com/workspace/chat/read-form-data).",
          ).optional(),
        })).describe("An array of the SelectionItem objects.").optional(),
      }).describe("List of widget autocomplete results.").optional(),
      widget: z.string().describe(
        "The ID of the updated widget. The ID must match the one for the widget that triggered the update request.",
      ).optional(),
    }).describe(
      "For `selectionInput` widgets, returns autocomplete suggestions for a multiselect menu.",
    ).optional(),
    url: z.string().describe(
      "Input only. URL for users to authenticate or configure. (Only for `REQUEST_CONFIG` response types.)",
    ).optional(),
  }).describe(
    "Parameters that a Chat app can use to configure how its response is posted.",
  ).optional(),
  attachment: z.array(z.object({
    attachmentDataRef: z.object({
      attachmentUploadToken: z.string().describe(
        "Optional. Opaque token containing a reference to an uploaded attachment. Treated by clients as an opaque string and used to create or update Chat messages with attachments.",
      ).optional(),
      resourceName: z.string().describe(
        "Optional. The resource name of the attachment data. This field is used with the media API to download the attachment data.",
      ).optional(),
    }).describe("A reference to the attachment data.").optional(),
    contentName: z.string().describe(
      "Output only. The original file name for the content, not the full path.",
    ).optional(),
    contentType: z.string().describe(
      "Output only. The content type (MIME type) of the file.",
    ).optional(),
    downloadUri: z.string().describe(
      "Output only. The download URL which should be used to allow a human user to download the attachment. Chat apps shouldn't use this URL to download attachment content.",
    ).optional(),
    driveDataRef: z.object({
      driveFileId: z.string().describe(
        "The ID for the drive file. Use with the Drive API.",
      ).optional(),
    }).describe("A reference to the data of a drive attachment.").optional(),
    name: z.string().describe(
      "Identifier. Resource name of the attachment. Format: `spaces/{space}/messages/{message}/attachments/{attachment}`.",
    ).optional(),
    source: z.enum(["SOURCE_UNSPECIFIED", "DRIVE_FILE", "UPLOADED_CONTENT"])
      .describe("Output only. The source of the attachment.").optional(),
    thumbnailUri: z.string().describe(
      "Output only. The thumbnail URL which should be used to preview the attachment to a human user. Chat apps shouldn't use this URL to download attachment content.",
    ).optional(),
  })).describe("Optional. User-uploaded attachment.").optional(),
  cardsV2: z.array(z.object({
    card: z.object({
      cardActions: z.array(z.object({
        actionLabel: z.unknown().describe(
          "The label that displays as the action menu item.",
        ).optional(),
        onClick: z.unknown().describe(
          "Represents how to respond when users click an interactive element on a card, such as a button. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
        ).optional(),
      })).describe(
        'The card\'s actions. Actions are added to the card\'s toolbar menu. [Google Workspace add-ons](https://developers.google.com/workspace/add-ons): For example, the following JSON constructs a card action menu with `Settings` and `Send Feedback` options: ` "card_actions": [ { "actionLabel": "Settings", "onClick": { "action": { "functionName": "goToView", "parameters": [ { "key": "viewType", "value": "SETTING" } ], "loadIndicator": "LoadIndicator.SPINNER" } } }, { "actionLabel": "Send Feedback", "onClick": { "openLink": { "url": "https://example.com/feedback" } } } ] `',
      ).optional(),
      displayStyle: z.enum(["DISPLAY_STYLE_UNSPECIFIED", "PEEK", "REPLACE"])
        .describe(
          "In Google Workspace add-ons, sets the display properties of the `peekCardHeader`. [Google Workspace add-ons](https://developers.google.com/workspace/add-ons):",
        ).optional(),
      expressionData: z.array(z.object({
        conditions: z.unknown().describe(
          "The list of conditions that are determined by the expression evaluation result.",
        ).optional(),
        eventActions: z.unknown().describe(
          "The list of actions that the ExpressionData can be used.",
        ).optional(),
        expression: z.unknown().describe("The uncompiled expression.")
          .optional(),
        id: z.unknown().describe("The unique identifier of the ExpressionData.")
          .optional(),
      })).describe(
        "The expression data for the card. Available for Google Workspace add-ons that extend Google Workspace Studio. Unavailable for Google Chat apps.",
      ).optional(),
      fixedFooter: z.object({
        primaryButton: z.object({
          altText: z.unknown().describe(
            'The alternative text that\'s used for accessibility. Set descriptive text that lets users know what the button does. For example, if a button opens a hyperlink, you might write: "Opens a new browser tab and navigates to the Google Chat developer documentation at https://developers.google.com/workspace/chat".',
          ).optional(),
          color: z.unknown().describe(
            "Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to and from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of `java.awt.Color` in Java; it can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha` method in iOS; and, with just a little work, it can be easily formatted into a CSS `rgba()` string in JavaScript. This reference page doesn't have information about the absolute color space that should be used to interpret the RGB value—for example, sRGB, Adobe RGB, DCI-P3, and BT.2020. By default, applications should assume the sRGB color space. When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most `1e-5`. Example (Java): import com.google.type.Color; //... public static java.awt.Color fromProto(Color protocolor) { float alpha = protocolor.hasAlpha()? protocolor.getAlpha().getValue(): 1.0; return new java.awt.Color( protocolor.getRed(), protocolor.getGreen(), protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color color) { float red = (float) color.getRed(); float green = (float) color.getGreen(); float blue = (float) color.getBlue(); float denominator = 255.0; Color.Builder resultBuilder = Color.newBuilder().setRed(red / denominator).setGreen(green / denominator).setBlue(blue / denominator); int alpha = color.getAlpha(); if (alpha!= 255) { result.setAlpha( FloatValue.newBuilder().setValue(((float) alpha) / denominator).build()); } return resultBuilder.build(); } //... Example (iOS / Obj-C): //... static UIColor* fromProto(Color* protocolor) { float red = [protocolor red]; float green = [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper!= nil) { alpha = [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <= 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result autorelease]; return result; } //... Example (JavaScript): //... var protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0; var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0; var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255); var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value || 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(', rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor = function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 - hexString.length; var resultBuilder = ['#']; for (var i = 0; i < missingZeros; i++) { resultBuilder.push('0'); } resultBuilder.push(hexString); return resultBuilder.join(''); }; //...",
          ).optional(),
          disabled: z.unknown().describe(
            "If `true`, the button is displayed in an inactive state and doesn't respond to user actions.",
          ).optional(),
          icon: z.unknown().describe(
            "An icon displayed in a widget on a card. For an example in Google Chat apps, see [Add an icon](https://developers.google.com/workspace/chat/add-text-image-card-dialog#add_an_icon). Supports [built-in](https://developers.google.com/workspace/chat/format-messages#builtinicons) and [custom](https://developers.google.com/workspace/chat/format-messages#customicons) icons. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
          ).optional(),
          onClick: z.unknown().describe(
            "Represents how to respond when users click an interactive element on a card, such as a button. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
          ).optional(),
          text: z.unknown().describe("The text displayed inside the button.")
            .optional(),
          type: z.unknown().describe(
            "Optional. The type of a button. If unset, button type defaults to `OUTLINED`. If the `color` field is set, the button type is forced to `FILLED` and any value set for this field is ignored.",
          ).optional(),
        }).describe(
          "A text, icon, or text and icon button that users can click. For an example in Google Chat apps, see [Add a button](https://developers.google.com/workspace/chat/design-interactive-card-dialog#add_a_button). To make an image a clickable button, specify an `Image` (not an `ImageComponent`) and set an `onClick` action. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
        ).optional(),
        secondaryButton: z.object({
          altText: z.unknown().describe(
            'The alternative text that\'s used for accessibility. Set descriptive text that lets users know what the button does. For example, if a button opens a hyperlink, you might write: "Opens a new browser tab and navigates to the Google Chat developer documentation at https://developers.google.com/workspace/chat".',
          ).optional(),
          color: z.unknown().describe(
            "Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to and from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of `java.awt.Color` in Java; it can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha` method in iOS; and, with just a little work, it can be easily formatted into a CSS `rgba()` string in JavaScript. This reference page doesn't have information about the absolute color space that should be used to interpret the RGB value—for example, sRGB, Adobe RGB, DCI-P3, and BT.2020. By default, applications should assume the sRGB color space. When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most `1e-5`. Example (Java): import com.google.type.Color; //... public static java.awt.Color fromProto(Color protocolor) { float alpha = protocolor.hasAlpha()? protocolor.getAlpha().getValue(): 1.0; return new java.awt.Color( protocolor.getRed(), protocolor.getGreen(), protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color color) { float red = (float) color.getRed(); float green = (float) color.getGreen(); float blue = (float) color.getBlue(); float denominator = 255.0; Color.Builder resultBuilder = Color.newBuilder().setRed(red / denominator).setGreen(green / denominator).setBlue(blue / denominator); int alpha = color.getAlpha(); if (alpha!= 255) { result.setAlpha( FloatValue.newBuilder().setValue(((float) alpha) / denominator).build()); } return resultBuilder.build(); } //... Example (iOS / Obj-C): //... static UIColor* fromProto(Color* protocolor) { float red = [protocolor red]; float green = [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper!= nil) { alpha = [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <= 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result autorelease]; return result; } //... Example (JavaScript): //... var protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0; var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0; var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255); var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value || 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(', rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor = function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 - hexString.length; var resultBuilder = ['#']; for (var i = 0; i < missingZeros; i++) { resultBuilder.push('0'); } resultBuilder.push(hexString); return resultBuilder.join(''); }; //...",
          ).optional(),
          disabled: z.unknown().describe(
            "If `true`, the button is displayed in an inactive state and doesn't respond to user actions.",
          ).optional(),
          icon: z.unknown().describe(
            "An icon displayed in a widget on a card. For an example in Google Chat apps, see [Add an icon](https://developers.google.com/workspace/chat/add-text-image-card-dialog#add_an_icon). Supports [built-in](https://developers.google.com/workspace/chat/format-messages#builtinicons) and [custom](https://developers.google.com/workspace/chat/format-messages#customicons) icons. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
          ).optional(),
          onClick: z.unknown().describe(
            "Represents how to respond when users click an interactive element on a card, such as a button. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
          ).optional(),
          text: z.unknown().describe("The text displayed inside the button.")
            .optional(),
          type: z.unknown().describe(
            "Optional. The type of a button. If unset, button type defaults to `OUTLINED`. If the `color` field is set, the button type is forced to `FILLED` and any value set for this field is ignored.",
          ).optional(),
        }).describe(
          "A text, icon, or text and icon button that users can click. For an example in Google Chat apps, see [Add a button](https://developers.google.com/workspace/chat/design-interactive-card-dialog#add_a_button). To make an image a clickable button, specify an `Image` (not an `ImageComponent`) and set an `onClick` action. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
        ).optional(),
      }).describe(
        "A persistent (sticky) footer that that appears at the bottom of the card. Setting `fixedFooter` without specifying a `primaryButton` or a `secondaryButton` causes an error. For Chat apps, you can use fixed footers in [dialogs](https://developers.google.com/workspace/chat/dialogs), but not [card messages](https://developers.google.com/workspace/chat/create-messages#create). For an example in Google Chat apps, see [Add a persistent footer](https://developers.google.com/workspace/chat/design-components-card-dialog#add_a_persistent_footer). [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
      ).optional(),
      header: z.object({
        imageAltText: z.string().describe(
          "The alternative text of this image that's used for accessibility.",
        ).optional(),
        imageType: z.enum(["SQUARE", "CIRCLE"]).describe(
          "The shape used to crop the image. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
        ).optional(),
        imageUrl: z.string().describe(
          "The HTTPS URL of the image in the card header.",
        ).optional(),
        subtitle: z.string().describe(
          "The subtitle of the card header. If specified, appears on its own line below the `title`.",
        ).optional(),
        title: z.string().describe(
          "Required. The title of the card header. The header has a fixed height: if both a title and subtitle are specified, each takes up one line. If only the title is specified, it takes up both lines.",
        ).optional(),
      }).describe(
        "Represents a card header. For an example in Google Chat apps, see [Add a header](https://developers.google.com/workspace/chat/design-components-card-dialog#add_a_header). [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
      ).optional(),
      name: z.string().describe(
        "Name of the card. Used as a card identifier in card navigation. [Google Workspace add-ons](https://developers.google.com/workspace/add-ons):",
      ).optional(),
      peekCardHeader: z.object({
        imageAltText: z.string().describe(
          "The alternative text of this image that's used for accessibility.",
        ).optional(),
        imageType: z.enum(["SQUARE", "CIRCLE"]).describe(
          "The shape used to crop the image. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
        ).optional(),
        imageUrl: z.string().describe(
          "The HTTPS URL of the image in the card header.",
        ).optional(),
        subtitle: z.string().describe(
          "The subtitle of the card header. If specified, appears on its own line below the `title`.",
        ).optional(),
        title: z.string().describe(
          "Required. The title of the card header. The header has a fixed height: if both a title and subtitle are specified, each takes up one line. If only the title is specified, it takes up both lines.",
        ).optional(),
      }).describe(
        "Represents a card header. For an example in Google Chat apps, see [Add a header](https://developers.google.com/workspace/chat/design-components-card-dialog#add_a_header). [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
      ).optional(),
      sectionDividerStyle: z.enum([
        "DIVIDER_STYLE_UNSPECIFIED",
        "SOLID_DIVIDER",
        "NO_DIVIDER",
      ]).describe("The divider style between the header, sections and footer.")
        .optional(),
      sections: z.array(z.object({
        collapseControl: z.unknown().describe(
          "Represent an expand and collapse control. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend):",
        ).optional(),
        collapsible: z.unknown().describe(
          "Indicates whether this section is collapsible. Collapsible sections hide some or all widgets, but users can expand the section to reveal the hidden widgets by clicking **Show more**. Users can hide the widgets again by clicking **Show less**. To determine which widgets are hidden, specify `uncollapsibleWidgetsCount`.",
        ).optional(),
        header: z.unknown().describe(
          "Text that appears at the top of a section. Supports simple HTML formatted text. For more information about formatting text, see [Formatting text in Google Chat apps](https://developers.google.com/workspace/chat/format-messages#card-formatting) and [Formatting text in Google Workspace add-ons](https://developers.google.com/apps-script/add-ons/concepts/widgets#text_formatting).",
        ).optional(),
        id: z.unknown().describe(
          "A unique ID assigned to the section that's used to identify the section to be mutated. The ID has a character limit of 64 characters and should be in the format of `[a-zA-Z0-9-]+`. Available for Google Workspace add-ons that extend Google Workspace Studio. Unavailable for Google Chat apps.",
        ).optional(),
        uncollapsibleWidgetsCount: z.unknown().describe(
          "The number of uncollapsible widgets which remain visible even when a section is collapsed. For example, when a section contains five widgets and the `uncollapsibleWidgetsCount` is set to `2`, the first two widgets are always shown and the last three are collapsed by default. The `uncollapsibleWidgetsCount` is taken into account only when `collapsible` is `true`.",
        ).optional(),
        widgets: z.unknown().describe(
          "All the widgets in the section. Must contain at least one widget.",
        ).optional(),
      })).describe(
        "Contains a collection of widgets. Each section has its own, optional header. Sections are visually separated by a line divider. For an example in Google Chat apps, see [Define a section of a card](https://developers.google.com/workspace/chat/design-components-card-dialog#define_a_section_of_a_card).",
      ).optional(),
    }).describe(
      'A card interface displayed in a Google Chat message or Google Workspace add-on. Cards support a defined layout, interactive UI elements like buttons, and rich media like images. Use cards to present detailed information, gather information from users, and guide users to take a next step. [Card builder](https://addons.gsuite.google.com/uikit/builder) To learn how to build cards, see the following documentation: * For Google Chat apps, see [Design the components of a card or dialog](https://developers.google.com/workspace/chat/design-components-card-dialog). * For Google Workspace add-ons, see [Card-based interfaces](https://developers.google.com/apps-script/add-ons/concepts/cards). Note: You can add up to 100 widgets per card. If a section\'s widgets push the total count above 100, that entire section and all following sections are ignored. This limit applies to both card messages and dialogs in Google Chat apps, and to cards in Google Workspace add-ons. **Example: Card message for a Google Chat app**![Example contact card](https://developers.google.com/workspace/chat/images/card_api_reference.png) To create the sample card message in Google Chat, use the following JSON: ` { "cardsV2": [ { "cardId": "unique-card-id", "card": { "header": { "title": "Sasha", "subtitle": "Software Engineer", "imageUrl": "https://developers.google.com/workspace/chat/images/quickstart-app-avatar.png", "imageType": "CIRCLE", "imageAltText": "Avatar for Sasha" }, "sections": [ { "header": "Contact Info", "collapsible": true, "uncollapsibleWidgetsCount": 1, "widgets": [ { "decoratedText": { "startIcon": { "knownIcon": "EMAIL" }, "text": "sasha@example.com" } }, { "decoratedText": { "startIcon": { "knownIcon": "PERSON" }, "text": "Online" } }, { "decoratedText": { "startIcon": { "knownIcon": "PHONE" }, "text": "+1 (555) 555-1234" } }, { "buttonList": { "buttons": [ { "text": "Share", "onClick": { "openLink": { "url": "https://example.com/share" } } }, { "text": "Edit", "onClick": { "action": { "function": "goToView", "parameters": [ { "key": "viewType", "value": "EDIT" } ] } } } ] } } ] } ] } } ] } `',
    ).optional(),
    cardId: z.string().describe(
      "Required if the message contains multiple cards. A unique identifier for a card in a message.",
    ).optional(),
  })).describe(
    "Optional. An array of [cards](https://developers.google.com/workspace/chat/api/reference/rest/v1/cards). Chat apps can create cards with [app authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app). As part of the [Developer Preview Program](https://developers.google.com/workspace/preview), if your Chat app [authenticates as a user](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user), it can create card messages. If your Chat app is not part of Developer Preview Program, it can't create cards with user authentication. To learn how to create a message that contains cards, see [Send a message](https://developers.google.com/workspace/chat/create-messages). [Card builder](https://addons.gsuite.google.com/uikit/builder)",
  ).optional(),
  clientAssignedMessageId: z.string().describe(
    "Optional. A custom ID for the message. You can use field to identify a message, or to get, delete, or update a message. To set a custom ID, specify the [`messageId`](https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces.messages/create#body.QUERY_PARAMETERS.message_id) field when you create the message. For details, see [Name a message](https://developers.google.com/workspace/chat/create-messages#name_a_created_message).",
  ).optional(),
  deletionMetadata: z.object({
    deletionType: z.enum([
      "DELETION_TYPE_UNSPECIFIED",
      "CREATOR",
      "SPACE_OWNER",
      "ADMIN",
      "APP_MESSAGE_EXPIRY",
      "CREATOR_VIA_APP",
      "SPACE_OWNER_VIA_APP",
      "SPACE_MEMBER",
    ]).describe("Indicates who deleted the message.").optional(),
  }).describe(
    "Information about a deleted message. A message is deleted when `delete_time` is set.",
  ).optional(),
  fallbackText: z.string().describe(
    "Optional. A plain-text description of the message's cards, used when the actual cards can't be displayed—for example, mobile notifications.",
  ).optional(),
  matchedUrl: z.object({
    url: z.string().describe("Output only. The URL that was matched.")
      .optional(),
  }).describe(
    "A matched URL in a Chat message. Chat apps can preview matched URLs. For more information, see [Preview links](https://developers.google.com/chat/how-tos/preview-links).",
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name of the message. Format: `spaces/{space}/messages/{message}` Where `{space}` is the ID of the space where the message is posted and `{message}` is a system-assigned ID for the message. For example, `spaces/AAAAAAAAAAA/messages/BBBBBBBBBBB.BBBBBBBBBBB`. If you set a custom ID when you create a message, you can use this ID to specify the message in a request by replacing `{message}` with the value from the `clientAssignedMessageId` field. For example, `spaces/AAAAAAAAAAA/messages/client-custom-name`. For details, see [Name a message](https://developers.google.com/workspace/chat/create-messages#name_a_created_message).",
  ).optional(),
  privateMessageViewer: z.object({
    displayName: z.string().describe("Output only. The user's display name.")
      .optional(),
    domainId: z.string().describe(
      "Unique identifier of the user's Google Workspace domain.",
    ).optional(),
    isAnonymous: z.boolean().describe(
      "Output only. When `true`, the user is deleted or their profile is not visible.",
    ).optional(),
    name: z.string().describe(
      "Resource name for a Google Chat user. Format: `users/{user}`. `users/app` can be used as an alias for the calling app bot user. For human users, `{user}` is the same user identifier as: - the `id` for the [Person](https://developers.google.com/people/api/rest/v1/people) in the People API. For example, `users/123456789` in Chat API represents the same person as the `123456789` Person profile ID in People API. - the `id` for a [user](https://developers.google.com/admin-sdk/directory/reference/rest/v1/users) in the Admin SDK Directory API. - the user's email address can be used as an alias for `{user}` in API requests. For example, if the People API Person profile ID for `user@example.com` is `123456789`, you can use `users/user@example.com` as an alias to reference `users/123456789`. Only the canonical resource name (for example `users/123456789`) will be returned from the API.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "HUMAN", "BOT"]).describe("User type.")
      .optional(),
  }).describe(
    "A user in Google Chat. When returned as an output from a request, if your Chat app [authenticates as a user](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user), the output for a `User` resource only populates the user's `name` and `type`.",
  ).optional(),
  quotedMessageMetadata: z.object({
    forwardedMetadata: z.object({
      space: z.string().describe(
        "Output only. The resource name of the source space. Format: spaces/{space}",
      ).optional(),
      spaceDisplayName: z.string().describe(
        'Output only. The display name of the source space or DM at the time of forwarding. For `SPACE`, this is the space name. For `DIRECT_MESSAGE`, this is the other participant\'s name (e.g., "User A"). For `GROUP_CHAT`, this is a generated name based on members\' first names, limited to 5 including the creator (e.g., "User A, User B").',
      ).optional(),
    }).describe(
      "Metadata about the source space from which a message was forwarded.",
    ).optional(),
    lastUpdateTime: z.string().describe(
      "Required. The timestamp when the quoted message was created or when the quoted message was last updated. If the message was edited, use this field, `last_update_time`. If the message was never edited, use `create_time`. If `last_update_time` doesn't match the latest version of the quoted message, the request fails.",
    ).optional(),
    name: z.string().describe(
      "Required. Resource name of the message that is quoted. Format: `spaces/{space}/messages/{message}`",
    ).optional(),
    quoteType: z.enum(["QUOTE_TYPE_UNSPECIFIED", "REPLY"]).describe(
      "Optional. Specifies the quote type. If not set, defaults to REPLY in the message read/write path for backward compatibility.",
    ).optional(),
    quotedMessageSnapshot: z.object({
      annotations: z.array(z.object({
        customEmojiMetadata: z.object({
          customEmoji: z.unknown().describe(
            "Represents a [custom emoji](https://support.google.com/chat/answer/12800149).",
          ).optional(),
        }).describe("Annotation metadata for custom emoji.").optional(),
        length: z.number().int().describe(
          "Length of the substring in the plain-text message body this annotation corresponds to. If not present, indicates a length of 0.",
        ).optional(),
        richLinkMetadata: z.object({
          calendarEventLinkData: z.unknown().describe(
            "Data for Calendar event links.",
          ).optional(),
          chatSpaceLinkData: z.unknown().describe("Data for Chat space links.")
            .optional(),
          driveLinkData: z.unknown().describe("Data for Google Drive links.")
            .optional(),
          meetSpaceLinkData: z.unknown().describe("Data for Meet space links.")
            .optional(),
          richLinkType: z.unknown().describe("The rich link type.").optional(),
          uri: z.unknown().describe("The URI of this link.").optional(),
        }).describe(
          "A rich link to a resource. Rich links can be associated with the plain-text body of the message or represent chips that link to Google Workspace resources like Google Docs or Sheets with `start_index` and `length` of 0.",
        ).optional(),
        slashCommand: z.object({
          bot: z.unknown().describe(
            "A user in Google Chat. When returned as an output from a request, if your Chat app [authenticates as a user](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user), the output for a `User` resource only populates the user's `name` and `type`.",
          ).optional(),
          commandId: z.unknown().describe(
            "The command ID of the invoked slash command.",
          ).optional(),
          commandName: z.unknown().describe(
            "The name of the invoked slash command.",
          ).optional(),
          triggersDialog: z.unknown().describe(
            "Indicates whether the slash command is for a dialog.",
          ).optional(),
          type: z.unknown().describe("The type of slash command.").optional(),
        }).describe("Annotation metadata for slash commands (/).").optional(),
        startIndex: z.number().int().describe(
          "Start index (0-based, inclusive) in the plain-text message body this annotation corresponds to.",
        ).optional(),
        type: z.enum([
          "ANNOTATION_TYPE_UNSPECIFIED",
          "USER_MENTION",
          "SLASH_COMMAND",
          "RICH_LINK",
          "CUSTOM_EMOJI",
        ]).describe("The type of this annotation.").optional(),
        userMention: z.object({
          type: z.unknown().describe("The type of user mention.").optional(),
          user: z.unknown().describe(
            "A user in Google Chat. When returned as an output from a request, if your Chat app [authenticates as a user](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user), the output for a `User` resource only populates the user's `name` and `type`.",
          ).optional(),
        }).describe("Annotation metadata for user mentions (@).").optional(),
      })).describe(
        "Output only. Annotations parsed from the text body of the quoted message. Populated only for FORWARD quote type.",
      ).optional(),
      attachments: z.array(z.object({
        attachmentDataRef: z.object({
          attachmentUploadToken: z.unknown().describe(
            "Optional. Opaque token containing a reference to an uploaded attachment. Treated by clients as an opaque string and used to create or update Chat messages with attachments.",
          ).optional(),
          resourceName: z.unknown().describe(
            "Optional. The resource name of the attachment data. This field is used with the media API to download the attachment data.",
          ).optional(),
        }).describe("A reference to the attachment data.").optional(),
        contentName: z.string().describe(
          "Output only. The original file name for the content, not the full path.",
        ).optional(),
        contentType: z.string().describe(
          "Output only. The content type (MIME type) of the file.",
        ).optional(),
        downloadUri: z.string().describe(
          "Output only. The download URL which should be used to allow a human user to download the attachment. Chat apps shouldn't use this URL to download attachment content.",
        ).optional(),
        driveDataRef: z.object({
          driveFileId: z.unknown().describe(
            "The ID for the drive file. Use with the Drive API.",
          ).optional(),
        }).describe("A reference to the data of a drive attachment.")
          .optional(),
        name: z.string().describe(
          "Identifier. Resource name of the attachment. Format: `spaces/{space}/messages/{message}/attachments/{attachment}`.",
        ).optional(),
        source: z.enum(["SOURCE_UNSPECIFIED", "DRIVE_FILE", "UPLOADED_CONTENT"])
          .describe("Output only. The source of the attachment.").optional(),
        thumbnailUri: z.string().describe(
          "Output only. The thumbnail URL which should be used to preview the attachment to a human user. Chat apps shouldn't use this URL to download attachment content.",
        ).optional(),
      })).describe(
        "Output only. Attachments that were part of the quoted message. These are copies of the quoted message's attachment metadata. Populated only for FORWARD quote type.",
      ).optional(),
      formattedText: z.string().describe(
        "Output only. Contains the quoted message `text` with markups added to support rich formatting like hyperlinks,custom emojis, markup, etc. Populated only for FORWARD quote type.",
      ).optional(),
      sender: z.string().describe(
        "Output only. The quoted message's author name. Populated for both REPLY & FORWARD quote types.",
      ).optional(),
      text: z.string().describe(
        "Output only. Snapshot of the quoted message's text content.",
      ).optional(),
    }).describe(
      "Provides a snapshot of the content of the quoted message at the time of quoting or forwarding",
    ).optional(),
  }).describe(
    "Information about a message that another message quotes. When you create a message, you can quote messages within the same thread, or quote a root message to create a new root message. However, you can't quote a message reply from a different thread. When you update a message, you can't add or replace the `quotedMessageMetadata` field, but you can remove it. For example usage, see [Quote another message](https://developers.google.com/workspace/chat/create-messages#quote-a-message).",
  ).optional(),
  sender: z.object({
    displayName: z.string().describe("Output only. The user's display name.")
      .optional(),
    domainId: z.string().describe(
      "Unique identifier of the user's Google Workspace domain.",
    ).optional(),
    isAnonymous: z.boolean().describe(
      "Output only. When `true`, the user is deleted or their profile is not visible.",
    ).optional(),
    name: z.string().describe(
      "Resource name for a Google Chat user. Format: `users/{user}`. `users/app` can be used as an alias for the calling app bot user. For human users, `{user}` is the same user identifier as: - the `id` for the [Person](https://developers.google.com/people/api/rest/v1/people) in the People API. For example, `users/123456789` in Chat API represents the same person as the `123456789` Person profile ID in People API. - the `id` for a [user](https://developers.google.com/admin-sdk/directory/reference/rest/v1/users) in the Admin SDK Directory API. - the user's email address can be used as an alias for `{user}` in API requests. For example, if the People API Person profile ID for `user@example.com` is `123456789`, you can use `users/user@example.com` as an alias to reference `users/123456789`. Only the canonical resource name (for example `users/123456789`) will be returned from the API.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "HUMAN", "BOT"]).describe("User type.")
      .optional(),
  }).describe(
    "A user in Google Chat. When returned as an output from a request, if your Chat app [authenticates as a user](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user), the output for a `User` resource only populates the user's `name` and `type`.",
  ).optional(),
  slashCommand: z.object({
    commandId: z.string().describe("The ID of the slash command.").optional(),
  }).describe(
    "Metadata about a [slash command](https://developers.google.com/workspace/chat/commands) in Google Chat.",
  ).optional(),
  space: z.object({
    accessSettings: z.object({
      accessState: z.enum([
        "ACCESS_STATE_UNSPECIFIED",
        "PRIVATE",
        "DISCOVERABLE",
      ]).describe("Output only. Indicates the access state of the space.")
        .optional(),
      audience: z.string().describe(
        "Optional. The resource name of the [target audience](https://support.google.com/a/answer/9934697) who can discover the space, join the space, and preview the messages in the space. If unset, only users or Google Groups who have been individually invited or added to the space can access it. For details, see [Make a space discoverable to a target audience](https://developers.google.com/workspace/chat/space-target-audience). Format: `audiences/{audience}` To use the default target audience for the Google Workspace organization, set to `audiences/default`. Reading the target audience supports: - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with [administrator approval](https://support.google.com/a?p=chat-app-auth) with the `chat.app.spaces` scope. This field is not populated when using the `chat.bot` scope with [app authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app). Setting the target audience requires [user authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user).",
      ).optional(),
    }).describe(
      "Represents the [access setting](https://support.google.com/chat/answer/11971020) of the space.",
    ).optional(),
    adminInstalled: z.boolean().describe(
      "Output only. For direct message (DM) spaces with a Chat app, whether the space was created by a Google Workspace administrator. Administrators can install and set up a direct message with a Chat app on behalf of users in their organization. To support admin install, your Chat app must feature direct messaging.",
    ).optional(),
    createTime: z.string().describe(
      "Optional. Immutable. For spaces created in Chat, the time the space was created. This field is output only, except when used in import mode spaces. For import mode spaces, set this field to the historical timestamp at which the space was created in the source in order to preserve the original creation time. Only populated in the output when `spaceType` is `GROUP_CHAT` or `SPACE`.",
    ).optional(),
    customer: z.string().describe(
      "Optional. Immutable. The customer id of the domain of the space. Required only when creating a space with [app authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) and `SpaceType` is `SPACE`, otherwise should not be set. In the format `customers/{customer}`, where `customer` is the `id` from the [Admin SDK customer resource](https://developers.google.com/admin-sdk/directory/reference/rest/v1/customers). Private apps can also use the `customers/my_customer` alias to create the space in the same Google Workspace organization as the app. This field isn't populated for direct messages (DMs) or when the space is created by non-Google Workspace users.",
    ).optional(),
    displayName: z.string().describe(
      "Optional. The space's display name. Required when [creating a space](https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces/create) with a `spaceType` of `SPACE`. If you receive the error message `ALREADY_EXISTS` when creating a space or updating the `displayName`, try a different `displayName`. An existing space within the Google Workspace organization might already use this display name. For direct messages, this field might be empty. Supports up to 128 characters.",
    ).optional(),
    externalUserAllowed: z.boolean().describe(
      "Optional. Immutable. Whether this space permits any Google Chat user as a member. Input when creating a space in a Google Workspace organization. Omit this field when creating spaces in the following conditions: * The authenticated user uses a consumer account (unmanaged user account). By default, a space created by a consumer account permits any Google Chat user. For existing spaces, this field is output only.",
    ).optional(),
    importMode: z.boolean().describe(
      "Optional. Whether this space is created in `Import Mode` as part of a data migration into Google Workspace. While spaces are being imported, they aren't visible to users until the import is complete. Creating a space in `Import Mode`requires [user authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user).",
    ).optional(),
    importModeExpireTime: z.string().describe(
      "Output only. The time when the space will be automatically deleted by the system if it remains in import mode. Each space created in import mode must exit this mode before this expire time using `spaces.completeImport`. This field is only populated for spaces that were created with import mode.",
    ).optional(),
    lastActiveTime: z.string().describe(
      "Output only. Timestamp of the last message in the space.",
    ).optional(),
    membershipCount: z.object({
      joinedDirectHumanUserCount: z.number().int().describe(
        "Output only. Count of human users that have directly joined the space, not counting users joined by having membership in a joined group.",
      ).optional(),
      joinedGroupCount: z.number().int().describe(
        "Output only. Count of all groups that have directly joined the space.",
      ).optional(),
    }).describe(
      "Represents the count of memberships of a space, grouped into categories.",
    ).optional(),
    name: z.string().describe(
      "Identifier. Resource name of the space. Format: `spaces/{space}` Where `{space}` represents the system-assigned ID for the space. You can obtain the space ID by calling the [`spaces.list()`](https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces/list) method or from the space URL. For example, if the space URL is `https://mail.google.com/mail/u/0/#chat/space/AAAAAAAAA`, the space ID is `AAAAAAAAA`.",
    ).optional(),
    permissionSettings: z.object({
      manageApps: z.object({
        assistantManagersAllowed: z.boolean().describe(
          "Optional. Whether space managers `ROLE_ASSISTANT_MANAGER`) have this permission.",
        ).optional(),
        managersAllowed: z.boolean().describe(
          "Optional. Whether space owners (`ROLE_MANAGER`) have this permission.",
        ).optional(),
        membersAllowed: z.boolean().describe(
          "Optional. Whether basic space members (`ROLE_MEMBER`) have this permission.",
        ).optional(),
      }).describe("Represents a space permission setting.").optional(),
      manageMembersAndGroups: z.object({
        assistantManagersAllowed: z.boolean().describe(
          "Optional. Whether space managers `ROLE_ASSISTANT_MANAGER`) have this permission.",
        ).optional(),
        managersAllowed: z.boolean().describe(
          "Optional. Whether space owners (`ROLE_MANAGER`) have this permission.",
        ).optional(),
        membersAllowed: z.boolean().describe(
          "Optional. Whether basic space members (`ROLE_MEMBER`) have this permission.",
        ).optional(),
      }).describe("Represents a space permission setting.").optional(),
      manageWebhooks: z.object({
        assistantManagersAllowed: z.boolean().describe(
          "Optional. Whether space managers `ROLE_ASSISTANT_MANAGER`) have this permission.",
        ).optional(),
        managersAllowed: z.boolean().describe(
          "Optional. Whether space owners (`ROLE_MANAGER`) have this permission.",
        ).optional(),
        membersAllowed: z.boolean().describe(
          "Optional. Whether basic space members (`ROLE_MEMBER`) have this permission.",
        ).optional(),
      }).describe("Represents a space permission setting.").optional(),
      modifySpaceDetails: z.object({
        assistantManagersAllowed: z.boolean().describe(
          "Optional. Whether space managers `ROLE_ASSISTANT_MANAGER`) have this permission.",
        ).optional(),
        managersAllowed: z.boolean().describe(
          "Optional. Whether space owners (`ROLE_MANAGER`) have this permission.",
        ).optional(),
        membersAllowed: z.boolean().describe(
          "Optional. Whether basic space members (`ROLE_MEMBER`) have this permission.",
        ).optional(),
      }).describe("Represents a space permission setting.").optional(),
      postMessages: z.object({
        assistantManagersAllowed: z.boolean().describe(
          "Optional. Whether space managers `ROLE_ASSISTANT_MANAGER`) have this permission.",
        ).optional(),
        managersAllowed: z.boolean().describe(
          "Optional. Whether space owners (`ROLE_MANAGER`) have this permission.",
        ).optional(),
        membersAllowed: z.boolean().describe(
          "Optional. Whether basic space members (`ROLE_MEMBER`) have this permission.",
        ).optional(),
      }).describe("Represents a space permission setting.").optional(),
      replyMessages: z.object({
        assistantManagersAllowed: z.boolean().describe(
          "Optional. Whether space managers `ROLE_ASSISTANT_MANAGER`) have this permission.",
        ).optional(),
        managersAllowed: z.boolean().describe(
          "Optional. Whether space owners (`ROLE_MANAGER`) have this permission.",
        ).optional(),
        membersAllowed: z.boolean().describe(
          "Optional. Whether basic space members (`ROLE_MEMBER`) have this permission.",
        ).optional(),
      }).describe("Represents a space permission setting.").optional(),
      toggleHistory: z.object({
        assistantManagersAllowed: z.boolean().describe(
          "Optional. Whether space managers `ROLE_ASSISTANT_MANAGER`) have this permission.",
        ).optional(),
        managersAllowed: z.boolean().describe(
          "Optional. Whether space owners (`ROLE_MANAGER`) have this permission.",
        ).optional(),
        membersAllowed: z.boolean().describe(
          "Optional. Whether basic space members (`ROLE_MEMBER`) have this permission.",
        ).optional(),
      }).describe("Represents a space permission setting.").optional(),
      useAtMentionAll: z.object({
        assistantManagersAllowed: z.boolean().describe(
          "Optional. Whether space managers `ROLE_ASSISTANT_MANAGER`) have this permission.",
        ).optional(),
        managersAllowed: z.boolean().describe(
          "Optional. Whether space owners (`ROLE_MANAGER`) have this permission.",
        ).optional(),
        membersAllowed: z.boolean().describe(
          "Optional. Whether basic space members (`ROLE_MEMBER`) have this permission.",
        ).optional(),
      }).describe("Represents a space permission setting.").optional(),
    }).describe(
      "[Permission settings](https://support.google.com/chat/answer/13340792) that you can specify when updating an existing named space. To set permission settings when creating a space, specify the `PredefinedPermissionSettings` field in your request.",
    ).optional(),
    predefinedPermissionSettings: z.enum([
      "PREDEFINED_PERMISSION_SETTINGS_UNSPECIFIED",
      "COLLABORATION_SPACE",
      "ANNOUNCEMENT_SPACE",
    ]).describe(
      "Optional. Input only. Predefined space permission settings, input only when creating a space. If the field is not set, a collaboration space is created. After you create the space, settings are populated in the `PermissionSettings` field. Setting predefined permission settings supports: - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with [administrator approval](https://support.google.com/a?p=chat-app-auth) with the `chat.app.spaces` or `chat.app.spaces.create` scopes. - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user)",
    ).optional(),
    singleUserBotDm: z.boolean().describe(
      "Optional. Whether the space is a DM between a Chat app and a single human.",
    ).optional(),
    spaceDetails: z.object({
      description: z.string().describe(
        "Optional. A description of the space. For example, describe the space's discussion topic, functional purpose, or participants. Supports up to 150 characters.",
      ).optional(),
      guidelines: z.string().describe(
        "Optional. The space's rules, expectations, and etiquette. Supports up to 5,000 characters.",
      ).optional(),
    }).describe("Details about the space including description and rules.")
      .optional(),
    spaceHistoryState: z.enum([
      "HISTORY_STATE_UNSPECIFIED",
      "HISTORY_OFF",
      "HISTORY_ON",
    ]).describe(
      "Optional. The message history state for messages and threads in this space.",
    ).optional(),
    spaceThreadingState: z.enum([
      "SPACE_THREADING_STATE_UNSPECIFIED",
      "THREADED_MESSAGES",
      "GROUPED_MESSAGES",
      "UNTHREADED_MESSAGES",
    ]).describe("Output only. The threading state in the Chat space.")
      .optional(),
    spaceType: z.enum([
      "SPACE_TYPE_UNSPECIFIED",
      "SPACE",
      "GROUP_CHAT",
      "DIRECT_MESSAGE",
    ]).describe(
      "Optional. The type of space. Required when creating a space or updating the space type of a space. Output only for other usage.",
    ).optional(),
    spaceUri: z.string().describe(
      "Output only. The URI for a user to access the space.",
    ).optional(),
    threaded: z.boolean().describe(
      "Output only. Deprecated: Use `spaceThreadingState` instead. Whether messages are threaded in this space.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "ROOM", "DM"]).describe(
      "Output only. Deprecated: Use `space_type` instead. The type of a space.",
    ).optional(),
  }).describe(
    "A space in Google Chat. Spaces are conversations between two or more users or 1:1 messages between a user and a Chat app.",
  ).optional(),
  text: z.string().describe(
    "Optional. Plain-text body of the message. The first link to an image, video, or web page generates a [preview chip](https://developers.google.com/workspace/chat/preview-links). You can also [@mention a Google Chat user](https://developers.google.com/workspace/chat/format-messages#messages-@mention), or everyone in the space. To learn about creating text messages, see [Send a message](https://developers.google.com/workspace/chat/create-messages).",
  ).optional(),
  thread: z.object({
    name: z.string().describe(
      "Identifier. Resource name of the thread. Example: `spaces/{space}/threads/{thread}`",
    ).optional(),
    threadKey: z.string().describe(
      "Optional. Input for creating or updating a thread. Otherwise, output only. ID for the thread. Supports up to 4000 characters. This ID is unique to the Chat app that sets it. For example, if multiple Chat apps create a message using the same thread key, the messages are posted in different threads. To reply in a thread created by a person or another Chat app, specify the thread `name` field instead.",
    ).optional(),
  }).describe(
    "A thread in a Google Chat space. For example usage, see [Start or reply to a message thread](https://developers.google.com/workspace/chat/create-messages#create-message-thread). If you specify a thread when creating a message, you can set the [`messageReplyOption`](https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces.messages/create#messagereplyoption) field to determine what happens if no matching thread is found.",
  ).optional(),
  messageId: z.string().describe(
    "Optional. A custom ID for a message. Lets Chat apps get, update, or delete a message without needing to store the system-assigned ID in the message's resource name (represented in the message `name` field). The value for this field must meet the following requirements: * Begins with `client-`. For example, `client-custom-name` is a valid custom ID, but `custom-name` is not. * Contains up to 63 characters and only lowercase letters, numbers, and hyphens. * Is unique within a space. A Chat app can't use the same custom ID for different messages. For details, see [Name a message](https://developers.google.com/workspace/chat/create-messages#name_a_created_message).",
  ).optional(),
  messageReplyOption: z.string().describe(
    "Optional. Specifies whether a message starts a thread or replies to one. Only supported in named spaces. When [responding to user interactions](https://developers.google.com/workspace/chat/receive-respond-interactions), this field is ignored. For interactions within a thread, the reply is created in the same thread. Otherwise, the reply is created as a new thread.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A unique request ID for this message. Specifying an existing request ID returns the message created with that ID instead of creating a new message.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Chat Spaces.Messages. Registered at `@swamp/gcp/chat/spaces-messages`. */
export const model = {
  type: "@swamp/gcp/chat/spaces-messages",
  version: "2026.05.18.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.1",
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
      description: "Added: createMessageNotificationOptions_notificationType",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "Removed: createMessageNotificationOptions_notificationType",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          createMessageNotificationOptions_notificationType:
            _createMessageNotificationOptions_notificationType,
          ...rest
        } = old;
        return rest;
      },
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A message in a Google Chat space.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a messages",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["accessoryWidgets"] !== undefined) {
          body["accessoryWidgets"] = g["accessoryWidgets"];
        }
        if (g["actionResponse"] !== undefined) {
          body["actionResponse"] = g["actionResponse"];
        }
        if (g["attachment"] !== undefined) body["attachment"] = g["attachment"];
        if (g["cardsV2"] !== undefined) body["cardsV2"] = g["cardsV2"];
        if (g["clientAssignedMessageId"] !== undefined) {
          body["clientAssignedMessageId"] = g["clientAssignedMessageId"];
        }
        if (g["deletionMetadata"] !== undefined) {
          body["deletionMetadata"] = g["deletionMetadata"];
        }
        if (g["fallbackText"] !== undefined) {
          body["fallbackText"] = g["fallbackText"];
        }
        if (g["matchedUrl"] !== undefined) body["matchedUrl"] = g["matchedUrl"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["privateMessageViewer"] !== undefined) {
          body["privateMessageViewer"] = g["privateMessageViewer"];
        }
        if (g["quotedMessageMetadata"] !== undefined) {
          body["quotedMessageMetadata"] = g["quotedMessageMetadata"];
        }
        if (g["sender"] !== undefined) body["sender"] = g["sender"];
        if (g["slashCommand"] !== undefined) {
          body["slashCommand"] = g["slashCommand"];
        }
        if (g["space"] !== undefined) body["space"] = g["space"];
        if (g["text"] !== undefined) body["text"] = g["text"];
        if (g["thread"] !== undefined) body["thread"] = g["thread"];
        if (g["messageId"] !== undefined) body["messageId"] = g["messageId"];
        if (g["messageReplyOption"] !== undefined) {
          body["messageReplyOption"] = g["messageReplyOption"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
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
        const instanceName = ((result.name ?? g.name)?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a messages",
      arguments: z.object({
        identifier: z.string().describe("The name of the messages"),
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
      description: "Update messages attributes",
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
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["accessoryWidgets"] !== undefined) {
          body["accessoryWidgets"] = g["accessoryWidgets"];
        }
        if (g["actionResponse"] !== undefined) {
          body["actionResponse"] = g["actionResponse"];
        }
        if (g["attachment"] !== undefined) body["attachment"] = g["attachment"];
        if (g["cardsV2"] !== undefined) body["cardsV2"] = g["cardsV2"];
        if (g["clientAssignedMessageId"] !== undefined) {
          body["clientAssignedMessageId"] = g["clientAssignedMessageId"];
        }
        if (g["deletionMetadata"] !== undefined) {
          body["deletionMetadata"] = g["deletionMetadata"];
        }
        if (g["fallbackText"] !== undefined) {
          body["fallbackText"] = g["fallbackText"];
        }
        if (g["matchedUrl"] !== undefined) body["matchedUrl"] = g["matchedUrl"];
        if (g["privateMessageViewer"] !== undefined) {
          body["privateMessageViewer"] = g["privateMessageViewer"];
        }
        if (g["quotedMessageMetadata"] !== undefined) {
          body["quotedMessageMetadata"] = g["quotedMessageMetadata"];
        }
        if (g["sender"] !== undefined) body["sender"] = g["sender"];
        if (g["slashCommand"] !== undefined) {
          body["slashCommand"] = g["slashCommand"];
        }
        if (g["space"] !== undefined) body["space"] = g["space"];
        if (g["text"] !== undefined) body["text"] = g["text"];
        if (g["thread"] !== undefined) body["thread"] = g["thread"];
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
    delete: {
      description: "Delete the messages",
      arguments: z.object({
        identifier: z.string().describe("The name of the messages"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Sync messages state from GCP",
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
