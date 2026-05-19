// Auto-generated extension model for @swamp/gcp/youtube/videos
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud YouTube Data Videos.
 *
 * A *video* resource represents a YouTube video.
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
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://youtube.googleapis.com/";

const INSERT_CONFIG = {
  "id": "youtube.videos.insert",
  "path": "youtube/v3/videos",
  "httpMethod": "POST",
  "parameterOrder": [
    "part",
  ],
  "parameters": {
    "autoLevels": {
      "location": "query",
    },
    "notifySubscribers": {
      "location": "query",
    },
    "onBehalfOfContentOwner": {
      "location": "query",
    },
    "onBehalfOfContentOwnerChannel": {
      "location": "query",
    },
    "part": {
      "location": "query",
      "required": true,
    },
    "stabilize": {
      "location": "query",
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "youtube.videos.update",
  "path": "youtube/v3/videos",
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

const DELETE_CONFIG = {
  "id": "youtube.videos.delete",
  "path": "youtube/v3/videos",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "id",
  ],
  "parameters": {
    "id": {
      "location": "query",
      "required": true,
    },
    "onBehalfOfContentOwner": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "youtube.videos.list",
  "path": "youtube/v3/videos",
  "httpMethod": "GET",
  "parameterOrder": [
    "part",
  ],
  "parameters": {
    "chart": {
      "location": "query",
    },
    "hl": {
      "location": "query",
    },
    "id": {
      "location": "query",
    },
    "locale": {
      "location": "query",
    },
    "maxHeight": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "maxWidth": {
      "location": "query",
    },
    "myRating": {
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
    "regionCode": {
      "location": "query",
    },
    "videoCategoryId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  ageGating: z.object({
    alcoholContent: z.boolean().describe(
      "Indicates whether or not the video has alcoholic beverage content. Only users of legal purchasing age in a particular country, as identified by ICAP, can view the content.",
    ).optional(),
    restricted: z.boolean().describe(
      "Age-restricted trailers. For redband trailers and adult-rated video-games. Only users aged 18+ can view the content. The the field is true the content is restricted to viewers aged 18+. Otherwise The field won't be present.",
    ).optional(),
    videoGameRating: z.enum(["anyone", "m15Plus", "m16Plus", "m17Plus"])
      .describe("Video game rating, if any.").optional(),
  }).optional(),
  contentDetails: z.object({
    caption: z.enum(["true", "false"]).describe(
      "The value of captions indicates whether the video has captions or not.",
    ).optional(),
    contentRating: z.object({
      acbRating: z.enum([
        "acbUnspecified",
        "acbE",
        "acbP",
        "acbC",
        "acbG",
        "acbPg",
        "acbM",
        "acbMa15plus",
        "acbR18plus",
        "acbUnrated",
      ]).describe(
        "The video's Australian Classification Board (ACB) or Australian Communications and Media Authority (ACMA) rating. ACMA ratings are used to classify children's television programming.",
      ).optional(),
      agcomRating: z.enum([
        "agcomUnspecified",
        "agcomT",
        "agcomVm14",
        "agcomVm18",
        "agcomUnrated",
      ]).describe(
        "The video's rating from Italy's Autorità per le Garanzie nelle Comunicazioni (AGCOM).",
      ).optional(),
      anatelRating: z.enum([
        "anatelUnspecified",
        "anatelF",
        "anatelI",
        "anatelI7",
        "anatelI10",
        "anatelI12",
        "anatelR",
        "anatelA",
        "anatelUnrated",
      ]).describe(
        "The video's Anatel (Asociación Nacional de Televisión) rating for Chilean television.",
      ).optional(),
      bbfcRating: z.enum([
        "bbfcUnspecified",
        "bbfcU",
        "bbfcPg",
        "bbfc12a",
        "bbfc12",
        "bbfc15",
        "bbfc18",
        "bbfcR18",
        "bbfcUnrated",
      ]).describe(
        "The video's British Board of Film Classification (BBFC) rating.",
      ).optional(),
      bfvcRating: z.enum([
        "bfvcUnspecified",
        "bfvcG",
        "bfvcE",
        "bfvc13",
        "bfvc15",
        "bfvc18",
        "bfvc20",
        "bfvcB",
        "bfvcUnrated",
      ]).describe(
        "The video's rating from Thailand's Board of Film and Video Censors.",
      ).optional(),
      bmukkRating: z.enum([
        "bmukkUnspecified",
        "bmukkAa",
        "bmukk6",
        "bmukk8",
        "bmukk10",
        "bmukk12",
        "bmukk14",
        "bmukk16",
        "bmukkUnrated",
      ]).describe(
        "The video's rating from the Austrian Board of Media Classification (Bundesministerium für Unterricht, Kunst und Kultur).",
      ).optional(),
      catvRating: z.enum([
        "catvUnspecified",
        "catvC",
        "catvC8",
        "catvG",
        "catvPg",
        "catv14plus",
        "catv18plus",
        "catvUnrated",
        "catvE",
      ]).describe(
        "Rating system for Canadian TV - Canadian TV Classification System The video's rating from the Canadian Radio-Television and Telecommunications Commission (CRTC) for Canadian English-language broadcasts. For more information, see the Canadian Broadcast Standards Council website.",
      ).optional(),
      catvfrRating: z.enum([
        "catvfrUnspecified",
        "catvfrG",
        "catvfr8plus",
        "catvfr13plus",
        "catvfr16plus",
        "catvfr18plus",
        "catvfrUnrated",
        "catvfrE",
      ]).describe(
        "The video's rating from the Canadian Radio-Television and Telecommunications Commission (CRTC) for Canadian French-language broadcasts. For more information, see the Canadian Broadcast Standards Council website.",
      ).optional(),
      cbfcRating: z.enum([
        "cbfcUnspecified",
        "cbfcU",
        "cbfcUA",
        "cbfcUA7plus",
        "cbfcUA13plus",
        "cbfcUA16plus",
        "cbfcA",
        "cbfcS",
        "cbfcUnrated",
      ]).describe(
        "The video's Central Board of Film Certification (CBFC - India) rating.",
      ).optional(),
      cccRating: z.enum([
        "cccUnspecified",
        "cccTe",
        "ccc6",
        "ccc14",
        "ccc18",
        "ccc18v",
        "ccc18s",
        "cccUnrated",
      ]).describe(
        "The video's Consejo de Calificación Cinematográfica (Chile) rating.",
      ).optional(),
      cceRating: z.enum([
        "cceUnspecified",
        "cceM4",
        "cceM6",
        "cceM12",
        "cceM16",
        "cceM18",
        "cceUnrated",
        "cceM14",
      ]).describe(
        "The video's rating from Portugal's Comissão de Classificação de Espect´culos.",
      ).optional(),
      chfilmRating: z.enum([
        "chfilmUnspecified",
        "chfilm0",
        "chfilm6",
        "chfilm12",
        "chfilm16",
        "chfilm18",
        "chfilmUnrated",
      ]).describe("The video's rating in Switzerland.").optional(),
      chvrsRating: z.enum([
        "chvrsUnspecified",
        "chvrsG",
        "chvrsPg",
        "chvrs14a",
        "chvrs18a",
        "chvrsR",
        "chvrsE",
        "chvrsUnrated",
      ]).describe(
        "The video's Canadian Home Video Rating System (CHVRS) rating.",
      ).optional(),
      cicfRating: z.enum([
        "cicfUnspecified",
        "cicfE",
        "cicfKtEa",
        "cicfKntEna",
        "cicfUnrated",
      ]).describe(
        "The video's rating from the Commission de Contrôle des Films (Belgium).",
      ).optional(),
      cnaRating: z.enum([
        "cnaUnspecified",
        "cnaAp",
        "cna12",
        "cna15",
        "cna18",
        "cna18plus",
        "cnaUnrated",
      ]).describe(
        "The video's rating from Romania's CONSILIUL NATIONAL AL AUDIOVIZUALULUI (CNA).",
      ).optional(),
      cncRating: z.enum([
        "cncUnspecified",
        "cncT",
        "cnc10",
        "cnc12",
        "cnc16",
        "cnc18",
        "cncE",
        "cncInterdiction",
        "cncUnrated",
      ]).describe(
        "Rating system in France - Commission de classification cinematographique",
      ).optional(),
      csaRating: z.enum([
        "csaUnspecified",
        "csaT",
        "csa10",
        "csa12",
        "csa16",
        "csa18",
        "csaInterdiction",
        "csaUnrated",
      ]).describe(
        "The video's rating from France's Conseil supérieur de l’audiovisuel, which rates broadcast content.",
      ).optional(),
      cscfRating: z.enum([
        "cscfUnspecified",
        "cscfAl",
        "cscfA",
        "cscf6",
        "cscf9",
        "cscf12",
        "cscf16",
        "cscf18",
        "cscfUnrated",
      ]).describe(
        "The video's rating from Luxembourg's Commission de surveillance de la classification des films (CSCF).",
      ).optional(),
      czfilmRating: z.enum([
        "czfilmUnspecified",
        "czfilmU",
        "czfilm12",
        "czfilm14",
        "czfilm18",
        "czfilmUnrated",
      ]).describe("The video's rating in the Czech Republic.").optional(),
      djctqRating: z.enum([
        "djctqUnspecified",
        "djctqL",
        "djctq10",
        "djctq12",
        "djctq14",
        "djctq16",
        "djctq18",
        "djctqEr",
        "djctqL10",
        "djctqL12",
        "djctqL14",
        "djctqL16",
        "djctqL18",
        "djctq1012",
        "djctq1014",
        "djctq1016",
        "djctq1018",
        "djctq1214",
        "djctq1216",
        "djctq1218",
        "djctq1416",
        "djctq1418",
        "djctq1618",
        "djctqUnrated",
      ]).describe(
        "The video's Departamento de Justiça, Classificação, Qualificação e Títulos (DJCQT - Brazil) rating.",
      ).optional(),
      djctqRatingReasons: z.array(
        z.enum([
          "djctqRatingReasonUnspecified",
          "djctqViolence",
          "djctqExtremeViolence",
          "djctqSexualContent",
          "djctqNudity",
          "djctqSex",
          "djctqExplicitSex",
          "djctqDrugs",
          "djctqLegalDrugs",
          "djctqIllegalDrugs",
          "djctqInappropriateLanguage",
          "djctqCriminalActs",
          "djctqImpactingContent",
          "djctqFear",
          "djctqMedicalProcedures",
          "djctqSensitiveTopics",
          "djctqFantasyViolence",
        ]),
      ).describe(
        "Reasons that explain why the video received its DJCQT (Brazil) rating.",
      ).optional(),
      ecbmctRating: z.enum([
        "ecbmctUnspecified",
        "ecbmctG",
        "ecbmct7a",
        "ecbmct7plus",
        "ecbmct13a",
        "ecbmct13plus",
        "ecbmct15a",
        "ecbmct15plus",
        "ecbmct18plus",
        "ecbmctUnrated",
      ]).describe(
        "Rating system in Turkey - Evaluation and Classification Board of the Ministry of Culture and Tourism",
      ).optional(),
      eefilmRating: z.enum([
        "eefilmUnspecified",
        "eefilmPere",
        "eefilmL",
        "eefilmMs6",
        "eefilmK6",
        "eefilmMs12",
        "eefilmK12",
        "eefilmK14",
        "eefilmK16",
        "eefilmUnrated",
      ]).describe("The video's rating in Estonia.").optional(),
      egfilmRating: z.enum([
        "egfilmUnspecified",
        "egfilmGn",
        "egfilm18",
        "egfilmBn",
        "egfilmUnrated",
      ]).describe("The video's rating in Egypt.").optional(),
      eirinRating: z.enum([
        "eirinUnspecified",
        "eirinG",
        "eirinPg12",
        "eirinR15plus",
        "eirinR18plus",
        "eirinUnrated",
      ]).describe(
        "The video's Eirin (映倫) rating. Eirin is the Japanese rating system.",
      ).optional(),
      fcbmRating: z.enum([
        "fcbmUnspecified",
        "fcbmU",
        "fcbmPg13",
        "fcbmP13",
        "fcbm18",
        "fcbm18sx",
        "fcbm18pa",
        "fcbm18sg",
        "fcbm18pl",
        "fcbmUnrated",
      ]).describe("The video's rating from Malaysia's Film Censorship Board.")
        .optional(),
      fcoRating: z.enum([
        "fcoUnspecified",
        "fcoI",
        "fcoIia",
        "fcoIib",
        "fcoIi",
        "fcoIii",
        "fcoUnrated",
      ]).describe(
        "The video's rating from Hong Kong's Office for Film, Newspaper and Article Administration.",
      ).optional(),
      fmocRating: z.enum([
        "fmocUnspecified",
        "fmocU",
        "fmoc10",
        "fmoc12",
        "fmoc16",
        "fmoc18",
        "fmocE",
        "fmocUnrated",
      ]).describe(
        "This property has been deprecated. Use the contentDetails.contentRating.cncRating instead.",
      ).optional(),
      fpbRating: z.enum([
        "fpbUnspecified",
        "fpbA",
        "fpbPg",
        "fpb79Pg",
        "fpb1012Pg",
        "fpb13",
        "fpb16",
        "fpb18",
        "fpbX18",
        "fpbXx",
        "fpbUnrated",
        "fpb10",
      ]).describe(
        "The video's rating from South Africa's Film and Publication Board.",
      ).optional(),
      fpbRatingReasons: z.array(
        z.enum([
          "fpbRatingReasonUnspecified",
          "fpbBlasphemy",
          "fpbLanguage",
          "fpbNudity",
          "fpbPrejudice",
          "fpbSex",
          "fpbViolence",
          "fpbDrugs",
          "fpbSexualViolence",
          "fpbHorror",
          "fpbCriminalTechniques",
          "fpbImitativeActsTechniques",
        ]),
      ).describe(
        "Reasons that explain why the video received its FPB (South Africa) rating.",
      ).optional(),
      fskRating: z.enum([
        "fskUnspecified",
        "fsk0",
        "fsk6",
        "fsk12",
        "fsk16",
        "fsk18",
        "fskUnrated",
      ]).describe(
        "The video's Freiwillige Selbstkontrolle der Filmwirtschaft (FSK - Germany) rating.",
      ).optional(),
      grfilmRating: z.enum([
        "grfilmUnspecified",
        "grfilmK",
        "grfilmE",
        "grfilmK12",
        "grfilmK13",
        "grfilmK15",
        "grfilmK17",
        "grfilmK18",
        "grfilmUnrated",
      ]).describe("The video's rating in Greece.").optional(),
      icaaRating: z.enum([
        "icaaUnspecified",
        "icaaApta",
        "icaa7",
        "icaa12",
        "icaa13",
        "icaa16",
        "icaa18",
        "icaaX",
        "icaaUnrated",
      ]).describe(
        "The video's Instituto de la Cinematografía y de las Artes Audiovisuales (ICAA - Spain) rating.",
      ).optional(),
      ifcoRating: z.enum([
        "ifcoUnspecified",
        "ifcoG",
        "ifcoPg",
        "ifco12",
        "ifco12a",
        "ifco15",
        "ifco15a",
        "ifco16",
        "ifco18",
        "ifcoUnrated",
      ]).describe(
        "The video's Irish Film Classification Office (IFCO - Ireland) rating. See the IFCO website for more information.",
      ).optional(),
      ilfilmRating: z.enum([
        "ilfilmUnspecified",
        "ilfilmAa",
        "ilfilm12",
        "ilfilm14",
        "ilfilm16",
        "ilfilm18",
        "ilfilmUnrated",
      ]).describe("The video's rating in Israel.").optional(),
      incaaRating: z.enum([
        "incaaUnspecified",
        "incaaAtp",
        "incaaSam13",
        "incaaSam16",
        "incaaSam18",
        "incaaC",
        "incaaUnrated",
      ]).describe(
        "The video's INCAA (Instituto Nacional de Cine y Artes Audiovisuales - Argentina) rating.",
      ).optional(),
      kfcbRating: z.enum([
        "kfcbUnspecified",
        "kfcbG",
        "kfcbPg",
        "kfcb16plus",
        "kfcbR",
        "kfcbUnrated",
      ]).describe(
        "The video's rating from the Kenya Film Classification Board.",
      ).optional(),
      kijkwijzerRating: z.enum([
        "kijkwijzerUnspecified",
        "kijkwijzerAl",
        "kijkwijzer6",
        "kijkwijzer9",
        "kijkwijzer12",
        "kijkwijzer16",
        "kijkwijzer18",
        "kijkwijzerUnrated",
      ]).describe(
        "The video's NICAM/Kijkwijzer rating from the Nederlands Instituut voor de Classificatie van Audiovisuele Media (Netherlands).",
      ).optional(),
      kmrbRating: z.enum([
        "kmrbUnspecified",
        "kmrbAll",
        "kmrb12plus",
        "kmrb15plus",
        "kmrbTeenr",
        "kmrbR",
        "kmrbUnrated",
      ]).describe(
        "The video's Korea Media Rating Board (영상물등급위원회) rating. The KMRB rates videos in South Korea.",
      ).optional(),
      lsfRating: z.enum([
        "lsfUnspecified",
        "lsfSu",
        "lsfA",
        "lsfBo",
        "lsf13",
        "lsfR",
        "lsf17",
        "lsfD",
        "lsf21",
        "lsfUnrated",
      ]).describe("The video's rating from Indonesia's Lembaga Sensor Film.")
        .optional(),
      mccaaRating: z.enum([
        "mccaaUnspecified",
        "mccaaU",
        "mccaaPg",
        "mccaa12a",
        "mccaa12",
        "mccaa14",
        "mccaa15",
        "mccaa16",
        "mccaa18",
        "mccaaUnrated",
      ]).describe(
        "The video's rating from Malta's Film Age-Classification Board.",
      ).optional(),
      mccypRating: z.enum([
        "mccypUnspecified",
        "mccypA",
        "mccyp7",
        "mccyp11",
        "mccyp15",
        "mccypUnrated",
      ]).describe(
        "The video's rating from the Danish Film Institute's (Det Danske Filminstitut) Media Council for Children and Young People.",
      ).optional(),
      mcstRating: z.enum([
        "mcstUnspecified",
        "mcstP",
        "mcst0",
        "mcstC13",
        "mcstC16",
        "mcst16plus",
        "mcstC18",
        "mcstGPg",
        "mcstUnrated",
      ]).describe("The video's rating system for Vietnam - MCST").optional(),
      mdaRating: z.enum([
        "mdaUnspecified",
        "mdaG",
        "mdaPg",
        "mdaPg13",
        "mdaNc16",
        "mdaM18",
        "mdaR21",
        "mdaUnrated",
      ]).describe(
        "The video's rating from Singapore's Media Development Authority (MDA) and, specifically, it's Board of Film Censors (BFC).",
      ).optional(),
      medietilsynetRating: z.enum([
        "medietilsynetUnspecified",
        "medietilsynetA",
        "medietilsynet6",
        "medietilsynet7",
        "medietilsynet9",
        "medietilsynet11",
        "medietilsynet12",
        "medietilsynet15",
        "medietilsynet18",
        "medietilsynetUnrated",
      ]).describe(
        "The video's rating from Medietilsynet, the Norwegian Media Authority.",
      ).optional(),
      mekuRating: z.enum([
        "mekuUnspecified",
        "mekuS",
        "meku7",
        "meku12",
        "meku16",
        "meku18",
        "mekuUnrated",
      ]).describe(
        "The video's rating from Finland's Kansallinen Audiovisuaalinen Instituutti (National Audiovisual Institute).",
      ).optional(),
      menaMpaaRating: z.enum([
        "menaMpaaUnspecified",
        "menaMpaaG",
        "menaMpaaPg",
        "menaMpaaPg13",
        "menaMpaaR",
        "menaMpaaUnrated",
      ]).describe(
        "The rating system for MENA countries, a clone of MPAA. It is needed to prevent titles go live w/o additional QC check, since some of them can be inappropriate for the countries at all. See b/33408548 for more details.",
      ).optional(),
      mibacRating: z.enum([
        "mibacUnspecified",
        "mibacT",
        "mibacVap",
        "mibacVm6",
        "mibacVm12",
        "mibacVm14",
        "mibacVm16",
        "mibacVm18",
        "mibacUnrated",
      ]).describe(
        "The video's rating from the Ministero dei Beni e delle Attività Culturali e del Turismo (Italy).",
      ).optional(),
      mocRating: z.enum([
        "mocUnspecified",
        "mocE",
        "mocT",
        "moc7",
        "moc12",
        "moc15",
        "moc18",
        "mocX",
        "mocBanned",
        "mocUnrated",
      ]).describe("The video's Ministerio de Cultura (Colombia) rating.")
        .optional(),
      moctwRating: z.enum([
        "moctwUnspecified",
        "moctwG",
        "moctwP",
        "moctwPg",
        "moctwR",
        "moctwUnrated",
        "moctwR12",
        "moctwR15",
      ]).describe(
        "The video's rating from Taiwan's Ministry of Culture (文化部).",
      ).optional(),
      mpaaRating: z.enum([
        "mpaaUnspecified",
        "mpaaG",
        "mpaaPg",
        "mpaaPg13",
        "mpaaR",
        "mpaaNc17",
        "mpaaX",
        "mpaaUnrated",
      ]).describe(
        "The video's Motion Picture Association of America (MPAA) rating.",
      ).optional(),
      mpaatRating: z.enum(["mpaatUnspecified", "mpaatGb", "mpaatRb"]).describe(
        "The rating system for trailer, DVD, and Ad in the US. See http://movielabs.com/md/ratings/v2.3/html/US_MPAAT_Ratings.html.",
      ).optional(),
      mtrcbRating: z.enum([
        "mtrcbUnspecified",
        "mtrcbG",
        "mtrcbPg",
        "mtrcbR13",
        "mtrcbR16",
        "mtrcbR18",
        "mtrcbX",
        "mtrcbUnrated",
      ]).describe(
        "The video's rating from the Movie and Television Review and Classification Board (Philippines).",
      ).optional(),
      nbcRating: z.enum([
        "nbcUnspecified",
        "nbcG",
        "nbcPg",
        "nbc12plus",
        "nbc15plus",
        "nbc18plus",
        "nbc18plusr",
        "nbcPu",
        "nbcUnrated",
      ]).describe(
        "The video's rating from the Maldives National Bureau of Classification.",
      ).optional(),
      nbcplRating: z.enum([
        "nbcplUnspecified",
        "nbcplI",
        "nbcplIi",
        "nbcplIii",
        "nbcplIv",
        "nbcpl18plus",
        "nbcplUnrated",
      ]).describe("The video's rating in Poland.").optional(),
      nfrcRating: z.enum([
        "nfrcUnspecified",
        "nfrcA",
        "nfrcB",
        "nfrcC",
        "nfrcD",
        "nfrcX",
        "nfrcUnrated",
      ]).describe("The video's rating from the Bulgarian National Film Center.")
        .optional(),
      nfvcbRating: z.enum([
        "nfvcbUnspecified",
        "nfvcbG",
        "nfvcbPg",
        "nfvcb12",
        "nfvcb12a",
        "nfvcb15",
        "nfvcb18",
        "nfvcbRe",
        "nfvcbUnrated",
      ]).describe(
        "The video's rating from Nigeria's National Film and Video Censors Board.",
      ).optional(),
      nkclvRating: z.enum([
        "nkclvUnspecified",
        "nkclvU",
        "nkclv7plus",
        "nkclv12plus",
        "nkclv16plus",
        "nkclv18plus",
        "nkclvUnrated",
      ]).describe(
        "The video's rating from the Nacionãlais Kino centrs (National Film Centre of Latvia).",
      ).optional(),
      nmcRating: z.enum([
        "nmcUnspecified",
        "nmcG",
        "nmcPg",
        "nmcPg13",
        "nmcPg15",
        "nmc15plus",
        "nmc18plus",
        "nmc18tc",
        "nmcUnrated",
      ]).describe(
        "The National Media Council ratings system for United Arab Emirates.",
      ).optional(),
      oflcRating: z.enum([
        "oflcUnspecified",
        "oflcG",
        "oflcPg",
        "oflcM",
        "oflcR13",
        "oflcR15",
        "oflcR16",
        "oflcR18",
        "oflcUnrated",
        "oflcRp13",
        "oflcRp16",
        "oflcRp18",
      ]).describe(
        "The video's Office of Film and Literature Classification (OFLC - New Zealand) rating.",
      ).optional(),
      pefilmRating: z.enum([
        "pefilmUnspecified",
        "pefilmPt",
        "pefilmPg",
        "pefilm14",
        "pefilm18",
        "pefilmUnrated",
      ]).describe("The video's rating in Peru.").optional(),
      rcnofRating: z.enum([
        "rcnofUnspecified",
        "rcnofI",
        "rcnofIi",
        "rcnofIii",
        "rcnofIv",
        "rcnofV",
        "rcnofVi",
        "rcnofUnrated",
      ]).describe(
        "The video's rating from the Hungarian Nemzeti Filmiroda, the Rating Committee of the National Office of Film.",
      ).optional(),
      resorteviolenciaRating: z.enum([
        "resorteviolenciaUnspecified",
        "resorteviolenciaA",
        "resorteviolenciaB",
        "resorteviolenciaC",
        "resorteviolenciaD",
        "resorteviolenciaE",
        "resorteviolenciaUnrated",
      ]).describe("The video's rating in Venezuela.").optional(),
      rtcRating: z.enum([
        "rtcUnspecified",
        "rtcAa",
        "rtcA",
        "rtcB",
        "rtcB15",
        "rtcC",
        "rtcD",
        "rtcUnrated",
      ]).describe(
        "The video's General Directorate of Radio, Television and Cinematography (Mexico) rating.",
      ).optional(),
      rteRating: z.enum([
        "rteUnspecified",
        "rteGa",
        "rteCh",
        "rtePs",
        "rteMa",
        "rteUnrated",
      ]).describe("The video's rating from Ireland's Raidió Teilifís Éireann.")
        .optional(),
      russiaRating: z.enum([
        "russiaUnspecified",
        "russia0",
        "russia6",
        "russia12",
        "russia16",
        "russia18",
        "russiaUnrated",
      ]).describe(
        "The video's National Film Registry of the Russian Federation (MKRF - Russia) rating.",
      ).optional(),
      skfilmRating: z.enum([
        "skfilmUnspecified",
        "skfilmG",
        "skfilmP2",
        "skfilmP5",
        "skfilmP8",
        "skfilmUnrated",
      ]).describe("The video's rating in Slovakia.").optional(),
      smaisRating: z.enum([
        "smaisUnspecified",
        "smaisL",
        "smais7",
        "smais12",
        "smais14",
        "smais16",
        "smais18",
        "smaisUnrated",
      ]).describe("The video's rating in Iceland.").optional(),
      smsaRating: z.enum([
        "smsaUnspecified",
        "smsaA",
        "smsa7",
        "smsa11",
        "smsa15",
        "smsaUnrated",
      ]).describe(
        "The video's rating from Statens medieråd (Sweden's National Media Council).",
      ).optional(),
      tvpgRating: z.enum([
        "tvpgUnspecified",
        "tvpgY",
        "tvpgY7",
        "tvpgY7Fv",
        "tvpgG",
        "tvpgPg",
        "pg14",
        "tvpgMa",
        "tvpgUnrated",
      ]).describe("The video's TV Parental Guidelines (TVPG) rating.")
        .optional(),
      ytRating: z.enum(["ytUnspecified", "ytAgeRestricted"]).describe(
        "A rating that YouTube uses to identify age-restricted content.",
      ).optional(),
    }).describe(
      "Ratings schemes. The country-specific ratings are mostly for movies and shows. LINT.IfChange",
    ).optional(),
    countryRestriction: z.object({
      allowed: z.boolean().describe(
        "The value of allowed indicates whether the access to the policy is allowed or denied by default.",
      ).optional(),
      exception: z.array(z.string()).describe(
        "A list of region codes that identify countries where the default policy do not apply.",
      ).optional(),
    }).describe("Rights management policy for YouTube resources.").optional(),
    definition: z.enum(["sd", "hd"]).describe(
      "The value of definition indicates whether the video is available in high definition or only in standard definition.",
    ).optional(),
    dimension: z.string().describe(
      "The value of dimension indicates whether the video is available in 3D or in 2D.",
    ).optional(),
    duration: z.string().describe(
      "The length of the video. The tag value is an ISO 8601 duration in the format PT#M#S, in which the letters PT indicate that the value specifies a period of time, and the letters M and S refer to length in minutes and seconds, respectively. The # characters preceding the M and S letters are both integers that specify the number of minutes (or seconds) of the video. For example, a value of PT15M51S indicates that the video is 15 minutes and 51 seconds long.",
    ).optional(),
    hasCustomThumbnail: z.boolean().describe(
      "Indicates whether the video uploader has provided a custom thumbnail image for the video. This property is only visible to the video uploader.",
    ).optional(),
    licensedContent: z.boolean().describe(
      "The value of is_license_content indicates whether the video is licensed content.",
    ).optional(),
    projection: z.enum(["rectangular", "360"]).describe(
      "Specifies the projection format of the video.",
    ).optional(),
    regionRestriction: z.object({
      allowed: z.array(z.string()).describe(
        "A list of region codes that identify countries where the video is viewable. If this property is present and a country is not listed in its value, then the video is blocked from appearing in that country. If this property is present and contains an empty list, the video is blocked in all countries.",
      ).optional(),
      blocked: z.array(z.string()).describe(
        "A list of region codes that identify countries where the video is blocked. If this property is present and a country is not listed in its value, then the video is viewable in that country. If this property is present and contains an empty list, the video is viewable in all countries.",
      ).optional(),
    }).describe("DEPRECATED Region restriction of the video.").optional(),
  }).describe("Details about the content of a YouTube Video.").optional(),
  fileDetails: z.object({
    audioStreams: z.array(z.object({
      bitrateBps: z.string().describe(
        "The audio stream's bitrate, in bits per second.",
      ).optional(),
      channelCount: z.number().int().describe(
        "The number of audio channels that the stream contains.",
      ).optional(),
      codec: z.string().describe("The audio codec that the stream uses.")
        .optional(),
      vendor: z.string().describe(
        "A value that uniquely identifies a video vendor. Typically, the value is a four-letter vendor code.",
      ).optional(),
    })).describe(
      "A list of audio streams contained in the uploaded video file. Each item in the list contains detailed metadata about an audio stream.",
    ).optional(),
    bitrateBps: z.string().describe(
      "The uploaded video file's combined (video and audio) bitrate in bits per second.",
    ).optional(),
    container: z.string().describe(
      "The uploaded video file's container format.",
    ).optional(),
    creationTime: z.string().describe(
      "The date and time when the uploaded video file was created. The value is specified in ISO 8601 format. Currently, the following ISO 8601 formats are supported: - Date only: YYYY-MM-DD - Naive time: YYYY-MM-DDTHH:MM:SS - Time with timezone: YYYY-MM-DDTHH:MM:SS+HH:MM",
    ).optional(),
    durationMs: z.string().describe(
      "The length of the uploaded video in milliseconds.",
    ).optional(),
    fileName: z.string().describe(
      "The uploaded file's name. This field is present whether a video file or another type of file was uploaded.",
    ).optional(),
    fileSize: z.string().describe(
      "The uploaded file's size in bytes. This field is present whether a video file or another type of file was uploaded.",
    ).optional(),
    fileType: z.enum([
      "video",
      "audio",
      "image",
      "archive",
      "document",
      "project",
      "other",
    ]).describe(
      "The uploaded file's type as detected by YouTube's video processing engine. Currently, YouTube only processes video files, but this field is present whether a video file or another type of file was uploaded.",
    ).optional(),
    videoStreams: z.array(z.object({
      aspectRatio: z.number().describe(
        "The video content's display aspect ratio, which specifies the aspect ratio in which the video should be displayed.",
      ).optional(),
      bitrateBps: z.string().describe(
        "The video stream's bitrate, in bits per second.",
      ).optional(),
      codec: z.string().describe("The video codec that the stream uses.")
        .optional(),
      frameRateFps: z.number().describe(
        "The video stream's frame rate, in frames per second.",
      ).optional(),
      heightPixels: z.number().int().describe(
        "The encoded video content's height in pixels.",
      ).optional(),
      rotation: z.enum([
        "none",
        "clockwise",
        "upsideDown",
        "counterClockwise",
        "other",
      ]).describe(
        "The amount that YouTube needs to rotate the original source content to properly display the video.",
      ).optional(),
      vendor: z.string().describe(
        "A value that uniquely identifies a video vendor. Typically, the value is a four-letter vendor code.",
      ).optional(),
      widthPixels: z.number().int().describe(
        "The encoded video content's width in pixels. You can calculate the video's encoding aspect ratio as width_pixels / height_pixels.",
      ).optional(),
    })).describe(
      "A list of video streams contained in the uploaded video file. Each item in the list contains detailed metadata about a video stream.",
    ).optional(),
  }).describe(
    "Describes original video file properties, including technical details about audio and video streams, but also metadata information like content length, digitization time, or geotagging information.",
  ).optional(),
  id: z.string().describe(
    "The ID that YouTube uses to uniquely identify the video.",
  ).optional(),
  liveStreamingDetails: z.object({
    activeLiveChatId: z.string().describe(
      "The ID of the currently active live chat attached to this video. This field is filled only if the video is a currently live broadcast that has live chat. Once the broadcast transitions to complete this field will be removed and the live chat closed down. For persistent broadcasts that live chat id will no longer be tied to this video but rather to the new video being displayed at the persistent page.",
    ).optional(),
    actualEndTime: z.string().describe(
      "The time that the broadcast actually ended. This value will not be available until the broadcast is over.",
    ).optional(),
    actualStartTime: z.string().describe(
      "The time that the broadcast actually started. This value will not be available until the broadcast begins.",
    ).optional(),
    concurrentViewers: z.string().describe(
      "The number of viewers currently watching the broadcast. The property and its value will be present if the broadcast has current viewers and the broadcast owner has not hidden the viewcount for the video. Note that YouTube stops tracking the number of concurrent viewers for a broadcast when the broadcast ends. So, this property would not identify the number of viewers watching an archived video of a live broadcast that already ended.",
    ).optional(),
    scheduledEndTime: z.string().describe(
      "The time that the broadcast is scheduled to end. If the value is empty or the property is not present, then the broadcast is scheduled to continue indefinitely.",
    ).optional(),
    scheduledStartTime: z.string().describe(
      "The time that the broadcast is scheduled to begin.",
    ).optional(),
  }).describe("Details about the live streaming metadata.").optional(),
  localizations: z.record(
    z.string(),
    z.object({
      description: z.string().describe(
        "Localized version of the video's description.",
      ).optional(),
      title: z.string().describe("Localized version of the video's title.")
        .optional(),
    }),
  ).describe(
    "The localizations object contains localized versions of the basic details about the video, such as its title and description.",
  ).optional(),
  monetizationDetails: z.object({
    access: z.object({
      allowed: z.boolean().describe(
        "The value of allowed indicates whether the access to the policy is allowed or denied by default.",
      ).optional(),
      exception: z.array(z.string()).describe(
        "A list of region codes that identify countries where the default policy do not apply.",
      ).optional(),
    }).describe("Rights management policy for YouTube resources.").optional(),
  }).describe("Details about monetization of a YouTube Video.").optional(),
  paidProductPlacementDetails: z.object({
    hasPaidProductPlacement: z.boolean().describe(
      "This boolean represents whether the video contains Paid Product Placement, Studio equivalent: https://screenshot.googleplex.com/4Me79DE6AfT2ktp.png",
    ).optional(),
  }).describe(
    "Details about paid content, such as paid product placement, sponsorships or endorsement, contained in a YouTube video and a method to inform viewers of paid promotion. This data can only be retrieved by the video owner.",
  ).optional(),
  player: z.object({
    embedHeight: z.string().optional(),
    embedHtml: z.string().describe(
      "An  tag that embeds a player that will play the video.",
    ).optional(),
    embedWidth: z.string().describe("The embed width").optional(),
  }).describe("Player to be used for a video playback.").optional(),
  processingDetails: z.object({
    editorSuggestionsAvailability: z.string().describe(
      "This value indicates whether video editing suggestions, which might improve video quality or the playback experience, are available for the video. You can retrieve these suggestions by requesting the suggestions part in your videos.list() request.",
    ).optional(),
    fileDetailsAvailability: z.string().describe(
      "This value indicates whether file details are available for the uploaded video. You can retrieve a video's file details by requesting the fileDetails part in your videos.list() request.",
    ).optional(),
    processingFailureReason: z.enum([
      "uploadFailed",
      "transcodeFailed",
      "streamingFailed",
      "other",
    ]).describe(
      "The reason that YouTube failed to process the video. This property will only have a value if the processingStatus property's value is failed.",
    ).optional(),
    processingIssuesAvailability: z.string().describe(
      "This value indicates whether the video processing engine has generated suggestions that might improve YouTube's ability to process the the video, warnings that explain video processing problems, or errors that cause video processing problems. You can retrieve these suggestions by requesting the suggestions part in your videos.list() request.",
    ).optional(),
    processingProgress: z.object({
      partsProcessed: z.string().describe(
        "The number of parts of the video that YouTube has already processed. You can estimate the percentage of the video that YouTube has already processed by calculating: 100 * parts_processed / parts_total Note that since the estimated number of parts could increase without a corresponding increase in the number of parts that have already been processed, it is possible that the calculated progress could periodically decrease while YouTube processes a video.",
      ).optional(),
      partsTotal: z.string().describe(
        "An estimate of the total number of parts that need to be processed for the video. The number may be updated with more precise estimates while YouTube processes the video.",
      ).optional(),
      timeLeftMs: z.string().describe(
        "An estimate of the amount of time, in millseconds, that YouTube needs to finish processing the video.",
      ).optional(),
    }).describe("Video processing progress and completion time estimate.")
      .optional(),
    processingStatus: z.enum([
      "processing",
      "succeeded",
      "failed",
      "terminated",
    ]).describe(
      "The video's processing status. This value indicates whether YouTube was able to process the video or if the video is still being processed.",
    ).optional(),
    tagSuggestionsAvailability: z.string().describe(
      "This value indicates whether keyword (tag) suggestions are available for the video. Tags can be added to a video's metadata to make it easier for other users to find the video. You can retrieve these suggestions by requesting the suggestions part in your videos.list() request.",
    ).optional(),
    thumbnailsAvailability: z.string().describe(
      "This value indicates whether thumbnail images have been generated for the video.",
    ).optional(),
  }).describe(
    "Describes processing status and progress and availability of some other Video resource parts.",
  ).optional(),
  projectDetails: z.object({}).describe(
    "DEPRECATED. b/157517979: This part was never populated after it was added. However, it sees non-zero traffic because there is generated client code in the wild that refers to it [1]. We keep this field and do NOT remove it because otherwise V3 would return an error when this part gets requested [2]. [1] https://developers.google.com/resources/api-libraries/documentation/youtube/v3/csharp/latest/classGoogle_1_1Apis_1_1YouTube_1_1v3_1_1Data_1_1VideoProjectDetails.html [2] http://google3/video/youtube/src/python/servers/data_api/common.py?l=1565-1569&rcl=344141677",
  ).optional(),
  recordingDetails: z.object({
    location: z.object({
      altitude: z.number().describe(
        "Altitude above the reference ellipsoid, in meters.",
      ).optional(),
      latitude: z.number().describe("Latitude in degrees.").optional(),
      longitude: z.number().describe("Longitude in degrees.").optional(),
    }).describe("Geographical coordinates of a point, in WGS84.").optional(),
    locationDescription: z.string().describe(
      "The text description of the location where the video was recorded.",
    ).optional(),
    recordingDate: z.string().describe(
      "The date and time when the video was recorded.",
    ).optional(),
  }).describe("Recording information associated with the video.").optional(),
  snippet: z.object({
    categoryId: z.string().describe(
      "The YouTube video category associated with the video.",
    ).optional(),
    channelId: z.string().describe(
      "The ID that YouTube uses to uniquely identify the channel that the video was uploaded to.",
    ).optional(),
    channelTitle: z.string().describe(
      "Channel title for the channel that the video belongs to.",
    ).optional(),
    defaultAudioLanguage: z.string().describe(
      "The default_audio_language property specifies the language spoken in the video's default audio track.",
    ).optional(),
    defaultLanguage: z.string().describe(
      "The language of the videos's default snippet.",
    ).optional(),
    description: z.string().describe(
      "The video's description. @mutable youtube.videos.insert youtube.videos.update",
    ).optional(),
    liveBroadcastContent: z.enum(["none", "upcoming", "live", "completed"])
      .describe(
        'Indicates if the video is an upcoming/active live broadcast. Or it\'s "none" if the video is not an upcoming/active live broadcast.',
      ).optional(),
    localized: z.object({
      description: z.string().describe(
        "Localized version of the video's description.",
      ).optional(),
      title: z.string().describe("Localized version of the video's title.")
        .optional(),
    }).describe("Localized versions of certain video properties (e.g. title).")
      .optional(),
    publishedAt: z.string().describe(
      "The date and time when the video was uploaded.",
    ).optional(),
    tags: z.array(z.string()).describe(
      "A list of keyword tags associated with the video. Tags may contain spaces.",
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
    title: z.string().describe(
      "The video's title. @mutable youtube.videos.insert youtube.videos.update",
    ).optional(),
  }).describe(
    "Basic details about a video, including title, description, uploader, thumbnails and category.",
  ).optional(),
  statistics: z.object({
    commentCount: z.string().describe("The number of comments for the video.")
      .optional(),
    dislikeCount: z.string().describe(
      "The number of users who have indicated that they disliked the video by giving it a negative rating.",
    ).optional(),
    favoriteCount: z.string().describe(
      "The number of users who currently have the video marked as a favorite video.",
    ).optional(),
    likeCount: z.string().describe(
      "The number of users who have indicated that they liked the video by giving it a positive rating.",
    ).optional(),
    viewCount: z.string().describe(
      "The number of times the video has been viewed.",
    ).optional(),
  }).describe(
    "Statistics about the video, such as the number of times the video was viewed or liked.",
  ).optional(),
  status: z.object({
    containsSyntheticMedia: z.boolean().describe(
      "Indicates if the video contains altered or synthetic media.",
    ).optional(),
    embeddable: z.boolean().describe(
      "This value indicates if the video can be embedded on another website. @mutable youtube.videos.insert youtube.videos.update",
    ).optional(),
    failureReason: z.enum([
      "conversion",
      "invalidFile",
      "emptyFile",
      "tooSmall",
      "codec",
      "uploadAborted",
    ]).describe(
      "This value explains why a video failed to upload. This property is only present if the uploadStatus property indicates that the upload failed.",
    ).optional(),
    license: z.enum(["youtube", "creativeCommon"]).describe(
      "The video's license. @mutable youtube.videos.insert youtube.videos.update",
    ).optional(),
    madeForKids: z.boolean().optional(),
    privacyStatus: z.enum(["public", "unlisted", "private"]).describe(
      "The video's privacy status.",
    ).optional(),
    publicStatsViewable: z.boolean().describe(
      "This value indicates if the extended video statistics on the watch page can be viewed by everyone. Note that the view count, likes, etc will still be visible if this is disabled. @mutable youtube.videos.insert youtube.videos.update",
    ).optional(),
    publishAt: z.string().describe(
      "The date and time when the video is scheduled to publish. It can be set only if the privacy status of the video is private..",
    ).optional(),
    rejectionReason: z.enum([
      "copyright",
      "inappropriate",
      "duplicate",
      "termsOfUse",
      "uploaderAccountSuspended",
      "length",
      "claim",
      "uploaderAccountClosed",
      "trademark",
      "legal",
    ]).describe(
      "This value explains why YouTube rejected an uploaded video. This property is only present if the uploadStatus property indicates that the upload was rejected.",
    ).optional(),
    selfDeclaredMadeForKids: z.boolean().optional(),
    uploadStatus: z.enum([
      "uploaded",
      "processed",
      "failed",
      "rejected",
      "deleted",
    ]).describe("The status of the uploaded video.").optional(),
  }).describe(
    "Basic details about a video category, such as its localized title. Next Id: 19",
  ).optional(),
  suggestions: z.object({
    editorSuggestions: z.array(
      z.enum([
        "videoAutoLevels",
        "videoStabilize",
        "videoCrop",
        "audioQuietAudioSwap",
      ]),
    ).describe(
      "A list of video editing operations that might improve the video quality or playback experience of the uploaded video.",
    ).optional(),
    processingErrors: z.array(
      z.enum([
        "audioFile",
        "imageFile",
        "projectFile",
        "notAVideoFile",
        "docFile",
        "archiveFile",
        "unsupportedSpatialAudioLayout",
      ]),
    ).describe(
      "A list of errors that will prevent YouTube from successfully processing the uploaded video video. These errors indicate that, regardless of the video's current processing status, eventually, that status will almost certainly be failed.",
    ).optional(),
    processingHints: z.array(
      z.enum([
        "nonStreamableMov",
        "sendBestQualityVideo",
        "sphericalVideo",
        "spatialAudio",
        "vrVideo",
        "hdrVideo",
      ]),
    ).describe(
      "A list of suggestions that may improve YouTube's ability to process the video.",
    ).optional(),
    processingWarnings: z.array(
      z.enum([
        "unknownContainer",
        "unknownVideoCodec",
        "unknownAudioCodec",
        "inconsistentResolution",
        "hasEditlist",
        "problematicVideoCodec",
        "problematicAudioCodec",
        "unsupportedVrStereoMode",
        "unsupportedSphericalProjectionType",
        "unsupportedHdrPixelFormat",
        "unsupportedHdrColorMetadata",
        "problematicHdrLookupTable",
      ]),
    ).describe(
      "A list of reasons why YouTube may have difficulty transcoding the uploaded video or that might result in an erroneous transcoding. These warnings are generated before YouTube actually processes the uploaded video file. In addition, they identify issues that are unlikely to cause the video processing to fail but that might cause problems such as sync issues, video artifacts, or a missing audio track.",
    ).optional(),
    tagSuggestions: z.array(z.object({
      categoryRestricts: z.array(z.string()).describe(
        "A set of video categories for which the tag is relevant. You can use this information to display appropriate tag suggestions based on the video category that the video uploader associates with the video. By default, tag suggestions are relevant for all categories if there are no restricts defined for the keyword.",
      ).optional(),
      tag: z.string().describe("The keyword tag suggested for the video.")
        .optional(),
    })).describe(
      "A list of keyword tags that could be added to the video's metadata to increase the likelihood that users will locate your video when searching or browsing on YouTube.",
    ).optional(),
  }).describe(
    "Specifies suggestions on how to improve video content, including encoding hints, tag suggestions, and editor suggestions.",
  ).optional(),
  topicDetails: z.object({
    relevantTopicIds: z.array(z.string()).describe(
      "Similar to topic_id, except that these topics are merely relevant to the video. These are topics that may be mentioned in, or appear in the video. You can retrieve information about each topic using Freebase Topic API.",
    ).optional(),
    topicCategories: z.array(z.string()).describe(
      "A list of Wikipedia URLs that provide a high-level description of the video's content.",
    ).optional(),
    topicIds: z.array(z.string()).describe(
      "A list of Freebase topic IDs that are centrally associated with the video. These are topics that are centrally featured in the video, and it can be said that the video is mainly about each of these. You can retrieve information about each topic using the Freebase Topic API.",
    ).optional(),
  }).describe("Freebase topic information related to the video.").optional(),
  part: z.string().describe(
    "The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. Note that not all parts contain properties that can be set when inserting or updating a video. For example, the statistics object encapsulates statistics that YouTube calculates for a video and does not contain values that you can set or modify. If the parameter value specifies a part that does not contain mutable values, that part will still be included in the API response.",
  ),
  autoLevels: z.string().describe(
    "Should auto-levels be applied to the upload.",
  ).optional(),
  notifySubscribers: z.string().describe(
    "Notify the channel subscribers about the new video. As default, the notification is enabled.",
  ).optional(),
  onBehalfOfContentOwner: z.string().describe(
    "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
  ).optional(),
  onBehalfOfContentOwnerChannel: z.string().describe(
    "This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel.",
  ).optional(),
  stabilize: z.string().describe("Should stabilize be applied to the upload.")
    .optional(),
});

const StateSchema = z.object({
  ageGating: z.object({
    alcoholContent: z.boolean(),
    restricted: z.boolean(),
    videoGameRating: z.string(),
  }).optional(),
  contentDetails: z.object({
    caption: z.string(),
    contentRating: z.object({
      acbRating: z.string(),
      agcomRating: z.string(),
      anatelRating: z.string(),
      bbfcRating: z.string(),
      bfvcRating: z.string(),
      bmukkRating: z.string(),
      catvRating: z.string(),
      catvfrRating: z.string(),
      cbfcRating: z.string(),
      cccRating: z.string(),
      cceRating: z.string(),
      chfilmRating: z.string(),
      chvrsRating: z.string(),
      cicfRating: z.string(),
      cnaRating: z.string(),
      cncRating: z.string(),
      csaRating: z.string(),
      cscfRating: z.string(),
      czfilmRating: z.string(),
      djctqRating: z.string(),
      djctqRatingReasons: z.array(z.string()),
      ecbmctRating: z.string(),
      eefilmRating: z.string(),
      egfilmRating: z.string(),
      eirinRating: z.string(),
      fcbmRating: z.string(),
      fcoRating: z.string(),
      fmocRating: z.string(),
      fpbRating: z.string(),
      fpbRatingReasons: z.array(z.string()),
      fskRating: z.string(),
      grfilmRating: z.string(),
      icaaRating: z.string(),
      ifcoRating: z.string(),
      ilfilmRating: z.string(),
      incaaRating: z.string(),
      kfcbRating: z.string(),
      kijkwijzerRating: z.string(),
      kmrbRating: z.string(),
      lsfRating: z.string(),
      mccaaRating: z.string(),
      mccypRating: z.string(),
      mcstRating: z.string(),
      mdaRating: z.string(),
      medietilsynetRating: z.string(),
      mekuRating: z.string(),
      menaMpaaRating: z.string(),
      mibacRating: z.string(),
      mocRating: z.string(),
      moctwRating: z.string(),
      mpaaRating: z.string(),
      mpaatRating: z.string(),
      mtrcbRating: z.string(),
      nbcRating: z.string(),
      nbcplRating: z.string(),
      nfrcRating: z.string(),
      nfvcbRating: z.string(),
      nkclvRating: z.string(),
      nmcRating: z.string(),
      oflcRating: z.string(),
      pefilmRating: z.string(),
      rcnofRating: z.string(),
      resorteviolenciaRating: z.string(),
      rtcRating: z.string(),
      rteRating: z.string(),
      russiaRating: z.string(),
      skfilmRating: z.string(),
      smaisRating: z.string(),
      smsaRating: z.string(),
      tvpgRating: z.string(),
      ytRating: z.string(),
    }),
    countryRestriction: z.object({
      allowed: z.boolean(),
      exception: z.array(z.string()),
    }),
    definition: z.string(),
    dimension: z.string(),
    duration: z.string(),
    hasCustomThumbnail: z.boolean(),
    licensedContent: z.boolean(),
    projection: z.string(),
    regionRestriction: z.object({
      allowed: z.array(z.string()),
      blocked: z.array(z.string()),
    }),
  }).optional(),
  etag: z.string().optional(),
  fileDetails: z.object({
    audioStreams: z.array(z.object({
      bitrateBps: z.string(),
      channelCount: z.number(),
      codec: z.string(),
      vendor: z.string(),
    })),
    bitrateBps: z.string(),
    container: z.string(),
    creationTime: z.string(),
    durationMs: z.string(),
    fileName: z.string(),
    fileSize: z.string(),
    fileType: z.string(),
    videoStreams: z.array(z.object({
      aspectRatio: z.number(),
      bitrateBps: z.string(),
      codec: z.string(),
      frameRateFps: z.number(),
      heightPixels: z.number(),
      rotation: z.string(),
      vendor: z.string(),
      widthPixels: z.number(),
    })),
  }).optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  liveStreamingDetails: z.object({
    activeLiveChatId: z.string(),
    actualEndTime: z.string(),
    actualStartTime: z.string(),
    concurrentViewers: z.string(),
    scheduledEndTime: z.string(),
    scheduledStartTime: z.string(),
  }).optional(),
  localizations: z.record(z.string(), z.unknown()).optional(),
  monetizationDetails: z.object({
    access: z.object({
      allowed: z.boolean(),
      exception: z.array(z.string()),
    }),
  }).optional(),
  paidProductPlacementDetails: z.object({
    hasPaidProductPlacement: z.boolean(),
  }).optional(),
  player: z.object({
    embedHeight: z.string(),
    embedHtml: z.string(),
    embedWidth: z.string(),
  }).optional(),
  processingDetails: z.object({
    editorSuggestionsAvailability: z.string(),
    fileDetailsAvailability: z.string(),
    processingFailureReason: z.string(),
    processingIssuesAvailability: z.string(),
    processingProgress: z.object({
      partsProcessed: z.string(),
      partsTotal: z.string(),
      timeLeftMs: z.string(),
    }),
    processingStatus: z.string(),
    tagSuggestionsAvailability: z.string(),
    thumbnailsAvailability: z.string(),
  }).optional(),
  projectDetails: z.object({}).optional(),
  recordingDetails: z.object({
    location: z.object({
      altitude: z.number(),
      latitude: z.number(),
      longitude: z.number(),
    }),
    locationDescription: z.string(),
    recordingDate: z.string(),
  }).optional(),
  snippet: z.object({
    categoryId: z.string(),
    channelId: z.string(),
    channelTitle: z.string(),
    defaultAudioLanguage: z.string(),
    defaultLanguage: z.string(),
    description: z.string(),
    liveBroadcastContent: z.string(),
    localized: z.object({
      description: z.string(),
      title: z.string(),
    }),
    publishedAt: z.string(),
    tags: z.array(z.string()),
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
    dislikeCount: z.string(),
    favoriteCount: z.string(),
    likeCount: z.string(),
    viewCount: z.string(),
  }).optional(),
  status: z.object({
    containsSyntheticMedia: z.boolean(),
    embeddable: z.boolean(),
    failureReason: z.string(),
    license: z.string(),
    madeForKids: z.boolean(),
    privacyStatus: z.string(),
    publicStatsViewable: z.boolean(),
    publishAt: z.string(),
    rejectionReason: z.string(),
    selfDeclaredMadeForKids: z.boolean(),
    uploadStatus: z.string(),
  }).optional(),
  suggestions: z.object({
    editorSuggestions: z.array(z.string()),
    processingErrors: z.array(z.string()),
    processingHints: z.array(z.string()),
    processingWarnings: z.array(z.string()),
    tagSuggestions: z.array(z.object({
      categoryRestricts: z.array(z.string()),
      tag: z.string(),
    })),
  }).optional(),
  topicDetails: z.object({
    relevantTopicIds: z.array(z.string()),
    topicCategories: z.array(z.string()),
    topicIds: z.array(z.string()),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  ageGating: z.object({
    alcoholContent: z.boolean().describe(
      "Indicates whether or not the video has alcoholic beverage content. Only users of legal purchasing age in a particular country, as identified by ICAP, can view the content.",
    ).optional(),
    restricted: z.boolean().describe(
      "Age-restricted trailers. For redband trailers and adult-rated video-games. Only users aged 18+ can view the content. The the field is true the content is restricted to viewers aged 18+. Otherwise The field won't be present.",
    ).optional(),
    videoGameRating: z.enum(["anyone", "m15Plus", "m16Plus", "m17Plus"])
      .describe("Video game rating, if any.").optional(),
  }).optional(),
  contentDetails: z.object({
    caption: z.enum(["true", "false"]).describe(
      "The value of captions indicates whether the video has captions or not.",
    ).optional(),
    contentRating: z.object({
      acbRating: z.enum([
        "acbUnspecified",
        "acbE",
        "acbP",
        "acbC",
        "acbG",
        "acbPg",
        "acbM",
        "acbMa15plus",
        "acbR18plus",
        "acbUnrated",
      ]).describe(
        "The video's Australian Classification Board (ACB) or Australian Communications and Media Authority (ACMA) rating. ACMA ratings are used to classify children's television programming.",
      ).optional(),
      agcomRating: z.enum([
        "agcomUnspecified",
        "agcomT",
        "agcomVm14",
        "agcomVm18",
        "agcomUnrated",
      ]).describe(
        "The video's rating from Italy's Autorità per le Garanzie nelle Comunicazioni (AGCOM).",
      ).optional(),
      anatelRating: z.enum([
        "anatelUnspecified",
        "anatelF",
        "anatelI",
        "anatelI7",
        "anatelI10",
        "anatelI12",
        "anatelR",
        "anatelA",
        "anatelUnrated",
      ]).describe(
        "The video's Anatel (Asociación Nacional de Televisión) rating for Chilean television.",
      ).optional(),
      bbfcRating: z.enum([
        "bbfcUnspecified",
        "bbfcU",
        "bbfcPg",
        "bbfc12a",
        "bbfc12",
        "bbfc15",
        "bbfc18",
        "bbfcR18",
        "bbfcUnrated",
      ]).describe(
        "The video's British Board of Film Classification (BBFC) rating.",
      ).optional(),
      bfvcRating: z.enum([
        "bfvcUnspecified",
        "bfvcG",
        "bfvcE",
        "bfvc13",
        "bfvc15",
        "bfvc18",
        "bfvc20",
        "bfvcB",
        "bfvcUnrated",
      ]).describe(
        "The video's rating from Thailand's Board of Film and Video Censors.",
      ).optional(),
      bmukkRating: z.enum([
        "bmukkUnspecified",
        "bmukkAa",
        "bmukk6",
        "bmukk8",
        "bmukk10",
        "bmukk12",
        "bmukk14",
        "bmukk16",
        "bmukkUnrated",
      ]).describe(
        "The video's rating from the Austrian Board of Media Classification (Bundesministerium für Unterricht, Kunst und Kultur).",
      ).optional(),
      catvRating: z.enum([
        "catvUnspecified",
        "catvC",
        "catvC8",
        "catvG",
        "catvPg",
        "catv14plus",
        "catv18plus",
        "catvUnrated",
        "catvE",
      ]).describe(
        "Rating system for Canadian TV - Canadian TV Classification System The video's rating from the Canadian Radio-Television and Telecommunications Commission (CRTC) for Canadian English-language broadcasts. For more information, see the Canadian Broadcast Standards Council website.",
      ).optional(),
      catvfrRating: z.enum([
        "catvfrUnspecified",
        "catvfrG",
        "catvfr8plus",
        "catvfr13plus",
        "catvfr16plus",
        "catvfr18plus",
        "catvfrUnrated",
        "catvfrE",
      ]).describe(
        "The video's rating from the Canadian Radio-Television and Telecommunications Commission (CRTC) for Canadian French-language broadcasts. For more information, see the Canadian Broadcast Standards Council website.",
      ).optional(),
      cbfcRating: z.enum([
        "cbfcUnspecified",
        "cbfcU",
        "cbfcUA",
        "cbfcUA7plus",
        "cbfcUA13plus",
        "cbfcUA16plus",
        "cbfcA",
        "cbfcS",
        "cbfcUnrated",
      ]).describe(
        "The video's Central Board of Film Certification (CBFC - India) rating.",
      ).optional(),
      cccRating: z.enum([
        "cccUnspecified",
        "cccTe",
        "ccc6",
        "ccc14",
        "ccc18",
        "ccc18v",
        "ccc18s",
        "cccUnrated",
      ]).describe(
        "The video's Consejo de Calificación Cinematográfica (Chile) rating.",
      ).optional(),
      cceRating: z.enum([
        "cceUnspecified",
        "cceM4",
        "cceM6",
        "cceM12",
        "cceM16",
        "cceM18",
        "cceUnrated",
        "cceM14",
      ]).describe(
        "The video's rating from Portugal's Comissão de Classificação de Espect´culos.",
      ).optional(),
      chfilmRating: z.enum([
        "chfilmUnspecified",
        "chfilm0",
        "chfilm6",
        "chfilm12",
        "chfilm16",
        "chfilm18",
        "chfilmUnrated",
      ]).describe("The video's rating in Switzerland.").optional(),
      chvrsRating: z.enum([
        "chvrsUnspecified",
        "chvrsG",
        "chvrsPg",
        "chvrs14a",
        "chvrs18a",
        "chvrsR",
        "chvrsE",
        "chvrsUnrated",
      ]).describe(
        "The video's Canadian Home Video Rating System (CHVRS) rating.",
      ).optional(),
      cicfRating: z.enum([
        "cicfUnspecified",
        "cicfE",
        "cicfKtEa",
        "cicfKntEna",
        "cicfUnrated",
      ]).describe(
        "The video's rating from the Commission de Contrôle des Films (Belgium).",
      ).optional(),
      cnaRating: z.enum([
        "cnaUnspecified",
        "cnaAp",
        "cna12",
        "cna15",
        "cna18",
        "cna18plus",
        "cnaUnrated",
      ]).describe(
        "The video's rating from Romania's CONSILIUL NATIONAL AL AUDIOVIZUALULUI (CNA).",
      ).optional(),
      cncRating: z.enum([
        "cncUnspecified",
        "cncT",
        "cnc10",
        "cnc12",
        "cnc16",
        "cnc18",
        "cncE",
        "cncInterdiction",
        "cncUnrated",
      ]).describe(
        "Rating system in France - Commission de classification cinematographique",
      ).optional(),
      csaRating: z.enum([
        "csaUnspecified",
        "csaT",
        "csa10",
        "csa12",
        "csa16",
        "csa18",
        "csaInterdiction",
        "csaUnrated",
      ]).describe(
        "The video's rating from France's Conseil supérieur de l’audiovisuel, which rates broadcast content.",
      ).optional(),
      cscfRating: z.enum([
        "cscfUnspecified",
        "cscfAl",
        "cscfA",
        "cscf6",
        "cscf9",
        "cscf12",
        "cscf16",
        "cscf18",
        "cscfUnrated",
      ]).describe(
        "The video's rating from Luxembourg's Commission de surveillance de la classification des films (CSCF).",
      ).optional(),
      czfilmRating: z.enum([
        "czfilmUnspecified",
        "czfilmU",
        "czfilm12",
        "czfilm14",
        "czfilm18",
        "czfilmUnrated",
      ]).describe("The video's rating in the Czech Republic.").optional(),
      djctqRating: z.enum([
        "djctqUnspecified",
        "djctqL",
        "djctq10",
        "djctq12",
        "djctq14",
        "djctq16",
        "djctq18",
        "djctqEr",
        "djctqL10",
        "djctqL12",
        "djctqL14",
        "djctqL16",
        "djctqL18",
        "djctq1012",
        "djctq1014",
        "djctq1016",
        "djctq1018",
        "djctq1214",
        "djctq1216",
        "djctq1218",
        "djctq1416",
        "djctq1418",
        "djctq1618",
        "djctqUnrated",
      ]).describe(
        "The video's Departamento de Justiça, Classificação, Qualificação e Títulos (DJCQT - Brazil) rating.",
      ).optional(),
      djctqRatingReasons: z.array(
        z.enum([
          "djctqRatingReasonUnspecified",
          "djctqViolence",
          "djctqExtremeViolence",
          "djctqSexualContent",
          "djctqNudity",
          "djctqSex",
          "djctqExplicitSex",
          "djctqDrugs",
          "djctqLegalDrugs",
          "djctqIllegalDrugs",
          "djctqInappropriateLanguage",
          "djctqCriminalActs",
          "djctqImpactingContent",
          "djctqFear",
          "djctqMedicalProcedures",
          "djctqSensitiveTopics",
          "djctqFantasyViolence",
        ]),
      ).describe(
        "Reasons that explain why the video received its DJCQT (Brazil) rating.",
      ).optional(),
      ecbmctRating: z.enum([
        "ecbmctUnspecified",
        "ecbmctG",
        "ecbmct7a",
        "ecbmct7plus",
        "ecbmct13a",
        "ecbmct13plus",
        "ecbmct15a",
        "ecbmct15plus",
        "ecbmct18plus",
        "ecbmctUnrated",
      ]).describe(
        "Rating system in Turkey - Evaluation and Classification Board of the Ministry of Culture and Tourism",
      ).optional(),
      eefilmRating: z.enum([
        "eefilmUnspecified",
        "eefilmPere",
        "eefilmL",
        "eefilmMs6",
        "eefilmK6",
        "eefilmMs12",
        "eefilmK12",
        "eefilmK14",
        "eefilmK16",
        "eefilmUnrated",
      ]).describe("The video's rating in Estonia.").optional(),
      egfilmRating: z.enum([
        "egfilmUnspecified",
        "egfilmGn",
        "egfilm18",
        "egfilmBn",
        "egfilmUnrated",
      ]).describe("The video's rating in Egypt.").optional(),
      eirinRating: z.enum([
        "eirinUnspecified",
        "eirinG",
        "eirinPg12",
        "eirinR15plus",
        "eirinR18plus",
        "eirinUnrated",
      ]).describe(
        "The video's Eirin (映倫) rating. Eirin is the Japanese rating system.",
      ).optional(),
      fcbmRating: z.enum([
        "fcbmUnspecified",
        "fcbmU",
        "fcbmPg13",
        "fcbmP13",
        "fcbm18",
        "fcbm18sx",
        "fcbm18pa",
        "fcbm18sg",
        "fcbm18pl",
        "fcbmUnrated",
      ]).describe("The video's rating from Malaysia's Film Censorship Board.")
        .optional(),
      fcoRating: z.enum([
        "fcoUnspecified",
        "fcoI",
        "fcoIia",
        "fcoIib",
        "fcoIi",
        "fcoIii",
        "fcoUnrated",
      ]).describe(
        "The video's rating from Hong Kong's Office for Film, Newspaper and Article Administration.",
      ).optional(),
      fmocRating: z.enum([
        "fmocUnspecified",
        "fmocU",
        "fmoc10",
        "fmoc12",
        "fmoc16",
        "fmoc18",
        "fmocE",
        "fmocUnrated",
      ]).describe(
        "This property has been deprecated. Use the contentDetails.contentRating.cncRating instead.",
      ).optional(),
      fpbRating: z.enum([
        "fpbUnspecified",
        "fpbA",
        "fpbPg",
        "fpb79Pg",
        "fpb1012Pg",
        "fpb13",
        "fpb16",
        "fpb18",
        "fpbX18",
        "fpbXx",
        "fpbUnrated",
        "fpb10",
      ]).describe(
        "The video's rating from South Africa's Film and Publication Board.",
      ).optional(),
      fpbRatingReasons: z.array(
        z.enum([
          "fpbRatingReasonUnspecified",
          "fpbBlasphemy",
          "fpbLanguage",
          "fpbNudity",
          "fpbPrejudice",
          "fpbSex",
          "fpbViolence",
          "fpbDrugs",
          "fpbSexualViolence",
          "fpbHorror",
          "fpbCriminalTechniques",
          "fpbImitativeActsTechniques",
        ]),
      ).describe(
        "Reasons that explain why the video received its FPB (South Africa) rating.",
      ).optional(),
      fskRating: z.enum([
        "fskUnspecified",
        "fsk0",
        "fsk6",
        "fsk12",
        "fsk16",
        "fsk18",
        "fskUnrated",
      ]).describe(
        "The video's Freiwillige Selbstkontrolle der Filmwirtschaft (FSK - Germany) rating.",
      ).optional(),
      grfilmRating: z.enum([
        "grfilmUnspecified",
        "grfilmK",
        "grfilmE",
        "grfilmK12",
        "grfilmK13",
        "grfilmK15",
        "grfilmK17",
        "grfilmK18",
        "grfilmUnrated",
      ]).describe("The video's rating in Greece.").optional(),
      icaaRating: z.enum([
        "icaaUnspecified",
        "icaaApta",
        "icaa7",
        "icaa12",
        "icaa13",
        "icaa16",
        "icaa18",
        "icaaX",
        "icaaUnrated",
      ]).describe(
        "The video's Instituto de la Cinematografía y de las Artes Audiovisuales (ICAA - Spain) rating.",
      ).optional(),
      ifcoRating: z.enum([
        "ifcoUnspecified",
        "ifcoG",
        "ifcoPg",
        "ifco12",
        "ifco12a",
        "ifco15",
        "ifco15a",
        "ifco16",
        "ifco18",
        "ifcoUnrated",
      ]).describe(
        "The video's Irish Film Classification Office (IFCO - Ireland) rating. See the IFCO website for more information.",
      ).optional(),
      ilfilmRating: z.enum([
        "ilfilmUnspecified",
        "ilfilmAa",
        "ilfilm12",
        "ilfilm14",
        "ilfilm16",
        "ilfilm18",
        "ilfilmUnrated",
      ]).describe("The video's rating in Israel.").optional(),
      incaaRating: z.enum([
        "incaaUnspecified",
        "incaaAtp",
        "incaaSam13",
        "incaaSam16",
        "incaaSam18",
        "incaaC",
        "incaaUnrated",
      ]).describe(
        "The video's INCAA (Instituto Nacional de Cine y Artes Audiovisuales - Argentina) rating.",
      ).optional(),
      kfcbRating: z.enum([
        "kfcbUnspecified",
        "kfcbG",
        "kfcbPg",
        "kfcb16plus",
        "kfcbR",
        "kfcbUnrated",
      ]).describe(
        "The video's rating from the Kenya Film Classification Board.",
      ).optional(),
      kijkwijzerRating: z.enum([
        "kijkwijzerUnspecified",
        "kijkwijzerAl",
        "kijkwijzer6",
        "kijkwijzer9",
        "kijkwijzer12",
        "kijkwijzer16",
        "kijkwijzer18",
        "kijkwijzerUnrated",
      ]).describe(
        "The video's NICAM/Kijkwijzer rating from the Nederlands Instituut voor de Classificatie van Audiovisuele Media (Netherlands).",
      ).optional(),
      kmrbRating: z.enum([
        "kmrbUnspecified",
        "kmrbAll",
        "kmrb12plus",
        "kmrb15plus",
        "kmrbTeenr",
        "kmrbR",
        "kmrbUnrated",
      ]).describe(
        "The video's Korea Media Rating Board (영상물등급위원회) rating. The KMRB rates videos in South Korea.",
      ).optional(),
      lsfRating: z.enum([
        "lsfUnspecified",
        "lsfSu",
        "lsfA",
        "lsfBo",
        "lsf13",
        "lsfR",
        "lsf17",
        "lsfD",
        "lsf21",
        "lsfUnrated",
      ]).describe("The video's rating from Indonesia's Lembaga Sensor Film.")
        .optional(),
      mccaaRating: z.enum([
        "mccaaUnspecified",
        "mccaaU",
        "mccaaPg",
        "mccaa12a",
        "mccaa12",
        "mccaa14",
        "mccaa15",
        "mccaa16",
        "mccaa18",
        "mccaaUnrated",
      ]).describe(
        "The video's rating from Malta's Film Age-Classification Board.",
      ).optional(),
      mccypRating: z.enum([
        "mccypUnspecified",
        "mccypA",
        "mccyp7",
        "mccyp11",
        "mccyp15",
        "mccypUnrated",
      ]).describe(
        "The video's rating from the Danish Film Institute's (Det Danske Filminstitut) Media Council for Children and Young People.",
      ).optional(),
      mcstRating: z.enum([
        "mcstUnspecified",
        "mcstP",
        "mcst0",
        "mcstC13",
        "mcstC16",
        "mcst16plus",
        "mcstC18",
        "mcstGPg",
        "mcstUnrated",
      ]).describe("The video's rating system for Vietnam - MCST").optional(),
      mdaRating: z.enum([
        "mdaUnspecified",
        "mdaG",
        "mdaPg",
        "mdaPg13",
        "mdaNc16",
        "mdaM18",
        "mdaR21",
        "mdaUnrated",
      ]).describe(
        "The video's rating from Singapore's Media Development Authority (MDA) and, specifically, it's Board of Film Censors (BFC).",
      ).optional(),
      medietilsynetRating: z.enum([
        "medietilsynetUnspecified",
        "medietilsynetA",
        "medietilsynet6",
        "medietilsynet7",
        "medietilsynet9",
        "medietilsynet11",
        "medietilsynet12",
        "medietilsynet15",
        "medietilsynet18",
        "medietilsynetUnrated",
      ]).describe(
        "The video's rating from Medietilsynet, the Norwegian Media Authority.",
      ).optional(),
      mekuRating: z.enum([
        "mekuUnspecified",
        "mekuS",
        "meku7",
        "meku12",
        "meku16",
        "meku18",
        "mekuUnrated",
      ]).describe(
        "The video's rating from Finland's Kansallinen Audiovisuaalinen Instituutti (National Audiovisual Institute).",
      ).optional(),
      menaMpaaRating: z.enum([
        "menaMpaaUnspecified",
        "menaMpaaG",
        "menaMpaaPg",
        "menaMpaaPg13",
        "menaMpaaR",
        "menaMpaaUnrated",
      ]).describe(
        "The rating system for MENA countries, a clone of MPAA. It is needed to prevent titles go live w/o additional QC check, since some of them can be inappropriate for the countries at all. See b/33408548 for more details.",
      ).optional(),
      mibacRating: z.enum([
        "mibacUnspecified",
        "mibacT",
        "mibacVap",
        "mibacVm6",
        "mibacVm12",
        "mibacVm14",
        "mibacVm16",
        "mibacVm18",
        "mibacUnrated",
      ]).describe(
        "The video's rating from the Ministero dei Beni e delle Attività Culturali e del Turismo (Italy).",
      ).optional(),
      mocRating: z.enum([
        "mocUnspecified",
        "mocE",
        "mocT",
        "moc7",
        "moc12",
        "moc15",
        "moc18",
        "mocX",
        "mocBanned",
        "mocUnrated",
      ]).describe("The video's Ministerio de Cultura (Colombia) rating.")
        .optional(),
      moctwRating: z.enum([
        "moctwUnspecified",
        "moctwG",
        "moctwP",
        "moctwPg",
        "moctwR",
        "moctwUnrated",
        "moctwR12",
        "moctwR15",
      ]).describe(
        "The video's rating from Taiwan's Ministry of Culture (文化部).",
      ).optional(),
      mpaaRating: z.enum([
        "mpaaUnspecified",
        "mpaaG",
        "mpaaPg",
        "mpaaPg13",
        "mpaaR",
        "mpaaNc17",
        "mpaaX",
        "mpaaUnrated",
      ]).describe(
        "The video's Motion Picture Association of America (MPAA) rating.",
      ).optional(),
      mpaatRating: z.enum(["mpaatUnspecified", "mpaatGb", "mpaatRb"]).describe(
        "The rating system for trailer, DVD, and Ad in the US. See http://movielabs.com/md/ratings/v2.3/html/US_MPAAT_Ratings.html.",
      ).optional(),
      mtrcbRating: z.enum([
        "mtrcbUnspecified",
        "mtrcbG",
        "mtrcbPg",
        "mtrcbR13",
        "mtrcbR16",
        "mtrcbR18",
        "mtrcbX",
        "mtrcbUnrated",
      ]).describe(
        "The video's rating from the Movie and Television Review and Classification Board (Philippines).",
      ).optional(),
      nbcRating: z.enum([
        "nbcUnspecified",
        "nbcG",
        "nbcPg",
        "nbc12plus",
        "nbc15plus",
        "nbc18plus",
        "nbc18plusr",
        "nbcPu",
        "nbcUnrated",
      ]).describe(
        "The video's rating from the Maldives National Bureau of Classification.",
      ).optional(),
      nbcplRating: z.enum([
        "nbcplUnspecified",
        "nbcplI",
        "nbcplIi",
        "nbcplIii",
        "nbcplIv",
        "nbcpl18plus",
        "nbcplUnrated",
      ]).describe("The video's rating in Poland.").optional(),
      nfrcRating: z.enum([
        "nfrcUnspecified",
        "nfrcA",
        "nfrcB",
        "nfrcC",
        "nfrcD",
        "nfrcX",
        "nfrcUnrated",
      ]).describe("The video's rating from the Bulgarian National Film Center.")
        .optional(),
      nfvcbRating: z.enum([
        "nfvcbUnspecified",
        "nfvcbG",
        "nfvcbPg",
        "nfvcb12",
        "nfvcb12a",
        "nfvcb15",
        "nfvcb18",
        "nfvcbRe",
        "nfvcbUnrated",
      ]).describe(
        "The video's rating from Nigeria's National Film and Video Censors Board.",
      ).optional(),
      nkclvRating: z.enum([
        "nkclvUnspecified",
        "nkclvU",
        "nkclv7plus",
        "nkclv12plus",
        "nkclv16plus",
        "nkclv18plus",
        "nkclvUnrated",
      ]).describe(
        "The video's rating from the Nacionãlais Kino centrs (National Film Centre of Latvia).",
      ).optional(),
      nmcRating: z.enum([
        "nmcUnspecified",
        "nmcG",
        "nmcPg",
        "nmcPg13",
        "nmcPg15",
        "nmc15plus",
        "nmc18plus",
        "nmc18tc",
        "nmcUnrated",
      ]).describe(
        "The National Media Council ratings system for United Arab Emirates.",
      ).optional(),
      oflcRating: z.enum([
        "oflcUnspecified",
        "oflcG",
        "oflcPg",
        "oflcM",
        "oflcR13",
        "oflcR15",
        "oflcR16",
        "oflcR18",
        "oflcUnrated",
        "oflcRp13",
        "oflcRp16",
        "oflcRp18",
      ]).describe(
        "The video's Office of Film and Literature Classification (OFLC - New Zealand) rating.",
      ).optional(),
      pefilmRating: z.enum([
        "pefilmUnspecified",
        "pefilmPt",
        "pefilmPg",
        "pefilm14",
        "pefilm18",
        "pefilmUnrated",
      ]).describe("The video's rating in Peru.").optional(),
      rcnofRating: z.enum([
        "rcnofUnspecified",
        "rcnofI",
        "rcnofIi",
        "rcnofIii",
        "rcnofIv",
        "rcnofV",
        "rcnofVi",
        "rcnofUnrated",
      ]).describe(
        "The video's rating from the Hungarian Nemzeti Filmiroda, the Rating Committee of the National Office of Film.",
      ).optional(),
      resorteviolenciaRating: z.enum([
        "resorteviolenciaUnspecified",
        "resorteviolenciaA",
        "resorteviolenciaB",
        "resorteviolenciaC",
        "resorteviolenciaD",
        "resorteviolenciaE",
        "resorteviolenciaUnrated",
      ]).describe("The video's rating in Venezuela.").optional(),
      rtcRating: z.enum([
        "rtcUnspecified",
        "rtcAa",
        "rtcA",
        "rtcB",
        "rtcB15",
        "rtcC",
        "rtcD",
        "rtcUnrated",
      ]).describe(
        "The video's General Directorate of Radio, Television and Cinematography (Mexico) rating.",
      ).optional(),
      rteRating: z.enum([
        "rteUnspecified",
        "rteGa",
        "rteCh",
        "rtePs",
        "rteMa",
        "rteUnrated",
      ]).describe("The video's rating from Ireland's Raidió Teilifís Éireann.")
        .optional(),
      russiaRating: z.enum([
        "russiaUnspecified",
        "russia0",
        "russia6",
        "russia12",
        "russia16",
        "russia18",
        "russiaUnrated",
      ]).describe(
        "The video's National Film Registry of the Russian Federation (MKRF - Russia) rating.",
      ).optional(),
      skfilmRating: z.enum([
        "skfilmUnspecified",
        "skfilmG",
        "skfilmP2",
        "skfilmP5",
        "skfilmP8",
        "skfilmUnrated",
      ]).describe("The video's rating in Slovakia.").optional(),
      smaisRating: z.enum([
        "smaisUnspecified",
        "smaisL",
        "smais7",
        "smais12",
        "smais14",
        "smais16",
        "smais18",
        "smaisUnrated",
      ]).describe("The video's rating in Iceland.").optional(),
      smsaRating: z.enum([
        "smsaUnspecified",
        "smsaA",
        "smsa7",
        "smsa11",
        "smsa15",
        "smsaUnrated",
      ]).describe(
        "The video's rating from Statens medieråd (Sweden's National Media Council).",
      ).optional(),
      tvpgRating: z.enum([
        "tvpgUnspecified",
        "tvpgY",
        "tvpgY7",
        "tvpgY7Fv",
        "tvpgG",
        "tvpgPg",
        "pg14",
        "tvpgMa",
        "tvpgUnrated",
      ]).describe("The video's TV Parental Guidelines (TVPG) rating.")
        .optional(),
      ytRating: z.enum(["ytUnspecified", "ytAgeRestricted"]).describe(
        "A rating that YouTube uses to identify age-restricted content.",
      ).optional(),
    }).describe(
      "Ratings schemes. The country-specific ratings are mostly for movies and shows. LINT.IfChange",
    ).optional(),
    countryRestriction: z.object({
      allowed: z.boolean().describe(
        "The value of allowed indicates whether the access to the policy is allowed or denied by default.",
      ).optional(),
      exception: z.array(z.string()).describe(
        "A list of region codes that identify countries where the default policy do not apply.",
      ).optional(),
    }).describe("Rights management policy for YouTube resources.").optional(),
    definition: z.enum(["sd", "hd"]).describe(
      "The value of definition indicates whether the video is available in high definition or only in standard definition.",
    ).optional(),
    dimension: z.string().describe(
      "The value of dimension indicates whether the video is available in 3D or in 2D.",
    ).optional(),
    duration: z.string().describe(
      "The length of the video. The tag value is an ISO 8601 duration in the format PT#M#S, in which the letters PT indicate that the value specifies a period of time, and the letters M and S refer to length in minutes and seconds, respectively. The # characters preceding the M and S letters are both integers that specify the number of minutes (or seconds) of the video. For example, a value of PT15M51S indicates that the video is 15 minutes and 51 seconds long.",
    ).optional(),
    hasCustomThumbnail: z.boolean().describe(
      "Indicates whether the video uploader has provided a custom thumbnail image for the video. This property is only visible to the video uploader.",
    ).optional(),
    licensedContent: z.boolean().describe(
      "The value of is_license_content indicates whether the video is licensed content.",
    ).optional(),
    projection: z.enum(["rectangular", "360"]).describe(
      "Specifies the projection format of the video.",
    ).optional(),
    regionRestriction: z.object({
      allowed: z.array(z.string()).describe(
        "A list of region codes that identify countries where the video is viewable. If this property is present and a country is not listed in its value, then the video is blocked from appearing in that country. If this property is present and contains an empty list, the video is blocked in all countries.",
      ).optional(),
      blocked: z.array(z.string()).describe(
        "A list of region codes that identify countries where the video is blocked. If this property is present and a country is not listed in its value, then the video is viewable in that country. If this property is present and contains an empty list, the video is viewable in all countries.",
      ).optional(),
    }).describe("DEPRECATED Region restriction of the video.").optional(),
  }).describe("Details about the content of a YouTube Video.").optional(),
  fileDetails: z.object({
    audioStreams: z.array(z.object({
      bitrateBps: z.string().describe(
        "The audio stream's bitrate, in bits per second.",
      ).optional(),
      channelCount: z.number().int().describe(
        "The number of audio channels that the stream contains.",
      ).optional(),
      codec: z.string().describe("The audio codec that the stream uses.")
        .optional(),
      vendor: z.string().describe(
        "A value that uniquely identifies a video vendor. Typically, the value is a four-letter vendor code.",
      ).optional(),
    })).describe(
      "A list of audio streams contained in the uploaded video file. Each item in the list contains detailed metadata about an audio stream.",
    ).optional(),
    bitrateBps: z.string().describe(
      "The uploaded video file's combined (video and audio) bitrate in bits per second.",
    ).optional(),
    container: z.string().describe(
      "The uploaded video file's container format.",
    ).optional(),
    creationTime: z.string().describe(
      "The date and time when the uploaded video file was created. The value is specified in ISO 8601 format. Currently, the following ISO 8601 formats are supported: - Date only: YYYY-MM-DD - Naive time: YYYY-MM-DDTHH:MM:SS - Time with timezone: YYYY-MM-DDTHH:MM:SS+HH:MM",
    ).optional(),
    durationMs: z.string().describe(
      "The length of the uploaded video in milliseconds.",
    ).optional(),
    fileName: z.string().describe(
      "The uploaded file's name. This field is present whether a video file or another type of file was uploaded.",
    ).optional(),
    fileSize: z.string().describe(
      "The uploaded file's size in bytes. This field is present whether a video file or another type of file was uploaded.",
    ).optional(),
    fileType: z.enum([
      "video",
      "audio",
      "image",
      "archive",
      "document",
      "project",
      "other",
    ]).describe(
      "The uploaded file's type as detected by YouTube's video processing engine. Currently, YouTube only processes video files, but this field is present whether a video file or another type of file was uploaded.",
    ).optional(),
    videoStreams: z.array(z.object({
      aspectRatio: z.number().describe(
        "The video content's display aspect ratio, which specifies the aspect ratio in which the video should be displayed.",
      ).optional(),
      bitrateBps: z.string().describe(
        "The video stream's bitrate, in bits per second.",
      ).optional(),
      codec: z.string().describe("The video codec that the stream uses.")
        .optional(),
      frameRateFps: z.number().describe(
        "The video stream's frame rate, in frames per second.",
      ).optional(),
      heightPixels: z.number().int().describe(
        "The encoded video content's height in pixels.",
      ).optional(),
      rotation: z.enum([
        "none",
        "clockwise",
        "upsideDown",
        "counterClockwise",
        "other",
      ]).describe(
        "The amount that YouTube needs to rotate the original source content to properly display the video.",
      ).optional(),
      vendor: z.string().describe(
        "A value that uniquely identifies a video vendor. Typically, the value is a four-letter vendor code.",
      ).optional(),
      widthPixels: z.number().int().describe(
        "The encoded video content's width in pixels. You can calculate the video's encoding aspect ratio as width_pixels / height_pixels.",
      ).optional(),
    })).describe(
      "A list of video streams contained in the uploaded video file. Each item in the list contains detailed metadata about a video stream.",
    ).optional(),
  }).describe(
    "Describes original video file properties, including technical details about audio and video streams, but also metadata information like content length, digitization time, or geotagging information.",
  ).optional(),
  id: z.string().describe(
    "The ID that YouTube uses to uniquely identify the video.",
  ).optional(),
  liveStreamingDetails: z.object({
    activeLiveChatId: z.string().describe(
      "The ID of the currently active live chat attached to this video. This field is filled only if the video is a currently live broadcast that has live chat. Once the broadcast transitions to complete this field will be removed and the live chat closed down. For persistent broadcasts that live chat id will no longer be tied to this video but rather to the new video being displayed at the persistent page.",
    ).optional(),
    actualEndTime: z.string().describe(
      "The time that the broadcast actually ended. This value will not be available until the broadcast is over.",
    ).optional(),
    actualStartTime: z.string().describe(
      "The time that the broadcast actually started. This value will not be available until the broadcast begins.",
    ).optional(),
    concurrentViewers: z.string().describe(
      "The number of viewers currently watching the broadcast. The property and its value will be present if the broadcast has current viewers and the broadcast owner has not hidden the viewcount for the video. Note that YouTube stops tracking the number of concurrent viewers for a broadcast when the broadcast ends. So, this property would not identify the number of viewers watching an archived video of a live broadcast that already ended.",
    ).optional(),
    scheduledEndTime: z.string().describe(
      "The time that the broadcast is scheduled to end. If the value is empty or the property is not present, then the broadcast is scheduled to continue indefinitely.",
    ).optional(),
    scheduledStartTime: z.string().describe(
      "The time that the broadcast is scheduled to begin.",
    ).optional(),
  }).describe("Details about the live streaming metadata.").optional(),
  localizations: z.record(
    z.string(),
    z.object({
      description: z.string().describe(
        "Localized version of the video's description.",
      ).optional(),
      title: z.string().describe("Localized version of the video's title.")
        .optional(),
    }),
  ).describe(
    "The localizations object contains localized versions of the basic details about the video, such as its title and description.",
  ).optional(),
  monetizationDetails: z.object({
    access: z.object({
      allowed: z.boolean().describe(
        "The value of allowed indicates whether the access to the policy is allowed or denied by default.",
      ).optional(),
      exception: z.array(z.string()).describe(
        "A list of region codes that identify countries where the default policy do not apply.",
      ).optional(),
    }).describe("Rights management policy for YouTube resources.").optional(),
  }).describe("Details about monetization of a YouTube Video.").optional(),
  paidProductPlacementDetails: z.object({
    hasPaidProductPlacement: z.boolean().describe(
      "This boolean represents whether the video contains Paid Product Placement, Studio equivalent: https://screenshot.googleplex.com/4Me79DE6AfT2ktp.png",
    ).optional(),
  }).describe(
    "Details about paid content, such as paid product placement, sponsorships or endorsement, contained in a YouTube video and a method to inform viewers of paid promotion. This data can only be retrieved by the video owner.",
  ).optional(),
  player: z.object({
    embedHeight: z.string().optional(),
    embedHtml: z.string().describe(
      "An  tag that embeds a player that will play the video.",
    ).optional(),
    embedWidth: z.string().describe("The embed width").optional(),
  }).describe("Player to be used for a video playback.").optional(),
  processingDetails: z.object({
    editorSuggestionsAvailability: z.string().describe(
      "This value indicates whether video editing suggestions, which might improve video quality or the playback experience, are available for the video. You can retrieve these suggestions by requesting the suggestions part in your videos.list() request.",
    ).optional(),
    fileDetailsAvailability: z.string().describe(
      "This value indicates whether file details are available for the uploaded video. You can retrieve a video's file details by requesting the fileDetails part in your videos.list() request.",
    ).optional(),
    processingFailureReason: z.enum([
      "uploadFailed",
      "transcodeFailed",
      "streamingFailed",
      "other",
    ]).describe(
      "The reason that YouTube failed to process the video. This property will only have a value if the processingStatus property's value is failed.",
    ).optional(),
    processingIssuesAvailability: z.string().describe(
      "This value indicates whether the video processing engine has generated suggestions that might improve YouTube's ability to process the the video, warnings that explain video processing problems, or errors that cause video processing problems. You can retrieve these suggestions by requesting the suggestions part in your videos.list() request.",
    ).optional(),
    processingProgress: z.object({
      partsProcessed: z.string().describe(
        "The number of parts of the video that YouTube has already processed. You can estimate the percentage of the video that YouTube has already processed by calculating: 100 * parts_processed / parts_total Note that since the estimated number of parts could increase without a corresponding increase in the number of parts that have already been processed, it is possible that the calculated progress could periodically decrease while YouTube processes a video.",
      ).optional(),
      partsTotal: z.string().describe(
        "An estimate of the total number of parts that need to be processed for the video. The number may be updated with more precise estimates while YouTube processes the video.",
      ).optional(),
      timeLeftMs: z.string().describe(
        "An estimate of the amount of time, in millseconds, that YouTube needs to finish processing the video.",
      ).optional(),
    }).describe("Video processing progress and completion time estimate.")
      .optional(),
    processingStatus: z.enum([
      "processing",
      "succeeded",
      "failed",
      "terminated",
    ]).describe(
      "The video's processing status. This value indicates whether YouTube was able to process the video or if the video is still being processed.",
    ).optional(),
    tagSuggestionsAvailability: z.string().describe(
      "This value indicates whether keyword (tag) suggestions are available for the video. Tags can be added to a video's metadata to make it easier for other users to find the video. You can retrieve these suggestions by requesting the suggestions part in your videos.list() request.",
    ).optional(),
    thumbnailsAvailability: z.string().describe(
      "This value indicates whether thumbnail images have been generated for the video.",
    ).optional(),
  }).describe(
    "Describes processing status and progress and availability of some other Video resource parts.",
  ).optional(),
  projectDetails: z.object({}).describe(
    "DEPRECATED. b/157517979: This part was never populated after it was added. However, it sees non-zero traffic because there is generated client code in the wild that refers to it [1]. We keep this field and do NOT remove it because otherwise V3 would return an error when this part gets requested [2]. [1] https://developers.google.com/resources/api-libraries/documentation/youtube/v3/csharp/latest/classGoogle_1_1Apis_1_1YouTube_1_1v3_1_1Data_1_1VideoProjectDetails.html [2] http://google3/video/youtube/src/python/servers/data_api/common.py?l=1565-1569&rcl=344141677",
  ).optional(),
  recordingDetails: z.object({
    location: z.object({
      altitude: z.number().describe(
        "Altitude above the reference ellipsoid, in meters.",
      ).optional(),
      latitude: z.number().describe("Latitude in degrees.").optional(),
      longitude: z.number().describe("Longitude in degrees.").optional(),
    }).describe("Geographical coordinates of a point, in WGS84.").optional(),
    locationDescription: z.string().describe(
      "The text description of the location where the video was recorded.",
    ).optional(),
    recordingDate: z.string().describe(
      "The date and time when the video was recorded.",
    ).optional(),
  }).describe("Recording information associated with the video.").optional(),
  snippet: z.object({
    categoryId: z.string().describe(
      "The YouTube video category associated with the video.",
    ).optional(),
    channelId: z.string().describe(
      "The ID that YouTube uses to uniquely identify the channel that the video was uploaded to.",
    ).optional(),
    channelTitle: z.string().describe(
      "Channel title for the channel that the video belongs to.",
    ).optional(),
    defaultAudioLanguage: z.string().describe(
      "The default_audio_language property specifies the language spoken in the video's default audio track.",
    ).optional(),
    defaultLanguage: z.string().describe(
      "The language of the videos's default snippet.",
    ).optional(),
    description: z.string().describe(
      "The video's description. @mutable youtube.videos.insert youtube.videos.update",
    ).optional(),
    liveBroadcastContent: z.enum(["none", "upcoming", "live", "completed"])
      .describe(
        'Indicates if the video is an upcoming/active live broadcast. Or it\'s "none" if the video is not an upcoming/active live broadcast.',
      ).optional(),
    localized: z.object({
      description: z.string().describe(
        "Localized version of the video's description.",
      ).optional(),
      title: z.string().describe("Localized version of the video's title.")
        .optional(),
    }).describe("Localized versions of certain video properties (e.g. title).")
      .optional(),
    publishedAt: z.string().describe(
      "The date and time when the video was uploaded.",
    ).optional(),
    tags: z.array(z.string()).describe(
      "A list of keyword tags associated with the video. Tags may contain spaces.",
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
    title: z.string().describe(
      "The video's title. @mutable youtube.videos.insert youtube.videos.update",
    ).optional(),
  }).describe(
    "Basic details about a video, including title, description, uploader, thumbnails and category.",
  ).optional(),
  statistics: z.object({
    commentCount: z.string().describe("The number of comments for the video.")
      .optional(),
    dislikeCount: z.string().describe(
      "The number of users who have indicated that they disliked the video by giving it a negative rating.",
    ).optional(),
    favoriteCount: z.string().describe(
      "The number of users who currently have the video marked as a favorite video.",
    ).optional(),
    likeCount: z.string().describe(
      "The number of users who have indicated that they liked the video by giving it a positive rating.",
    ).optional(),
    viewCount: z.string().describe(
      "The number of times the video has been viewed.",
    ).optional(),
  }).describe(
    "Statistics about the video, such as the number of times the video was viewed or liked.",
  ).optional(),
  status: z.object({
    containsSyntheticMedia: z.boolean().describe(
      "Indicates if the video contains altered or synthetic media.",
    ).optional(),
    embeddable: z.boolean().describe(
      "This value indicates if the video can be embedded on another website. @mutable youtube.videos.insert youtube.videos.update",
    ).optional(),
    failureReason: z.enum([
      "conversion",
      "invalidFile",
      "emptyFile",
      "tooSmall",
      "codec",
      "uploadAborted",
    ]).describe(
      "This value explains why a video failed to upload. This property is only present if the uploadStatus property indicates that the upload failed.",
    ).optional(),
    license: z.enum(["youtube", "creativeCommon"]).describe(
      "The video's license. @mutable youtube.videos.insert youtube.videos.update",
    ).optional(),
    madeForKids: z.boolean().optional(),
    privacyStatus: z.enum(["public", "unlisted", "private"]).describe(
      "The video's privacy status.",
    ).optional(),
    publicStatsViewable: z.boolean().describe(
      "This value indicates if the extended video statistics on the watch page can be viewed by everyone. Note that the view count, likes, etc will still be visible if this is disabled. @mutable youtube.videos.insert youtube.videos.update",
    ).optional(),
    publishAt: z.string().describe(
      "The date and time when the video is scheduled to publish. It can be set only if the privacy status of the video is private..",
    ).optional(),
    rejectionReason: z.enum([
      "copyright",
      "inappropriate",
      "duplicate",
      "termsOfUse",
      "uploaderAccountSuspended",
      "length",
      "claim",
      "uploaderAccountClosed",
      "trademark",
      "legal",
    ]).describe(
      "This value explains why YouTube rejected an uploaded video. This property is only present if the uploadStatus property indicates that the upload was rejected.",
    ).optional(),
    selfDeclaredMadeForKids: z.boolean().optional(),
    uploadStatus: z.enum([
      "uploaded",
      "processed",
      "failed",
      "rejected",
      "deleted",
    ]).describe("The status of the uploaded video.").optional(),
  }).describe(
    "Basic details about a video category, such as its localized title. Next Id: 19",
  ).optional(),
  suggestions: z.object({
    editorSuggestions: z.array(
      z.enum([
        "videoAutoLevels",
        "videoStabilize",
        "videoCrop",
        "audioQuietAudioSwap",
      ]),
    ).describe(
      "A list of video editing operations that might improve the video quality or playback experience of the uploaded video.",
    ).optional(),
    processingErrors: z.array(
      z.enum([
        "audioFile",
        "imageFile",
        "projectFile",
        "notAVideoFile",
        "docFile",
        "archiveFile",
        "unsupportedSpatialAudioLayout",
      ]),
    ).describe(
      "A list of errors that will prevent YouTube from successfully processing the uploaded video video. These errors indicate that, regardless of the video's current processing status, eventually, that status will almost certainly be failed.",
    ).optional(),
    processingHints: z.array(
      z.enum([
        "nonStreamableMov",
        "sendBestQualityVideo",
        "sphericalVideo",
        "spatialAudio",
        "vrVideo",
        "hdrVideo",
      ]),
    ).describe(
      "A list of suggestions that may improve YouTube's ability to process the video.",
    ).optional(),
    processingWarnings: z.array(
      z.enum([
        "unknownContainer",
        "unknownVideoCodec",
        "unknownAudioCodec",
        "inconsistentResolution",
        "hasEditlist",
        "problematicVideoCodec",
        "problematicAudioCodec",
        "unsupportedVrStereoMode",
        "unsupportedSphericalProjectionType",
        "unsupportedHdrPixelFormat",
        "unsupportedHdrColorMetadata",
        "problematicHdrLookupTable",
      ]),
    ).describe(
      "A list of reasons why YouTube may have difficulty transcoding the uploaded video or that might result in an erroneous transcoding. These warnings are generated before YouTube actually processes the uploaded video file. In addition, they identify issues that are unlikely to cause the video processing to fail but that might cause problems such as sync issues, video artifacts, or a missing audio track.",
    ).optional(),
    tagSuggestions: z.array(z.object({
      categoryRestricts: z.array(z.string()).describe(
        "A set of video categories for which the tag is relevant. You can use this information to display appropriate tag suggestions based on the video category that the video uploader associates with the video. By default, tag suggestions are relevant for all categories if there are no restricts defined for the keyword.",
      ).optional(),
      tag: z.string().describe("The keyword tag suggested for the video.")
        .optional(),
    })).describe(
      "A list of keyword tags that could be added to the video's metadata to increase the likelihood that users will locate your video when searching or browsing on YouTube.",
    ).optional(),
  }).describe(
    "Specifies suggestions on how to improve video content, including encoding hints, tag suggestions, and editor suggestions.",
  ).optional(),
  topicDetails: z.object({
    relevantTopicIds: z.array(z.string()).describe(
      "Similar to topic_id, except that these topics are merely relevant to the video. These are topics that may be mentioned in, or appear in the video. You can retrieve information about each topic using Freebase Topic API.",
    ).optional(),
    topicCategories: z.array(z.string()).describe(
      "A list of Wikipedia URLs that provide a high-level description of the video's content.",
    ).optional(),
    topicIds: z.array(z.string()).describe(
      "A list of Freebase topic IDs that are centrally associated with the video. These are topics that are centrally featured in the video, and it can be said that the video is mainly about each of these. You can retrieve information about each topic using the Freebase Topic API.",
    ).optional(),
  }).describe("Freebase topic information related to the video.").optional(),
  part: z.string().describe(
    "The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. Note that not all parts contain properties that can be set when inserting or updating a video. For example, the statistics object encapsulates statistics that YouTube calculates for a video and does not contain values that you can set or modify. If the parameter value specifies a part that does not contain mutable values, that part will still be included in the API response.",
  ).optional(),
  autoLevels: z.string().describe(
    "Should auto-levels be applied to the upload.",
  ).optional(),
  notifySubscribers: z.string().describe(
    "Notify the channel subscribers about the new video. As default, the notification is enabled.",
  ).optional(),
  onBehalfOfContentOwner: z.string().describe(
    "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
  ).optional(),
  onBehalfOfContentOwnerChannel: z.string().describe(
    "This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel.",
  ).optional(),
  stabilize: z.string().describe("Should stabilize be applied to the upload.")
    .optional(),
});

/** Swamp extension model for Google Cloud YouTube Data Videos. Registered at `@swamp/gcp/youtube/videos`. */
export const model = {
  type: "@swamp/gcp/youtube/videos",
  version: "2026.05.19.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A *video* resource represents a YouTube video.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a videos",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["part"] !== undefined) params["part"] = String(g["part"]);
        const body: Record<string, unknown> = {};
        if (g["ageGating"] !== undefined) body["ageGating"] = g["ageGating"];
        if (g["contentDetails"] !== undefined) {
          body["contentDetails"] = g["contentDetails"];
        }
        if (g["fileDetails"] !== undefined) {
          body["fileDetails"] = g["fileDetails"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["liveStreamingDetails"] !== undefined) {
          body["liveStreamingDetails"] = g["liveStreamingDetails"];
        }
        if (g["localizations"] !== undefined) {
          body["localizations"] = g["localizations"];
        }
        if (g["monetizationDetails"] !== undefined) {
          body["monetizationDetails"] = g["monetizationDetails"];
        }
        if (g["paidProductPlacementDetails"] !== undefined) {
          body["paidProductPlacementDetails"] =
            g["paidProductPlacementDetails"];
        }
        if (g["player"] !== undefined) body["player"] = g["player"];
        if (g["processingDetails"] !== undefined) {
          body["processingDetails"] = g["processingDetails"];
        }
        if (g["projectDetails"] !== undefined) {
          body["projectDetails"] = g["projectDetails"];
        }
        if (g["recordingDetails"] !== undefined) {
          body["recordingDetails"] = g["recordingDetails"];
        }
        if (g["snippet"] !== undefined) body["snippet"] = g["snippet"];
        if (g["statistics"] !== undefined) body["statistics"] = g["statistics"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["suggestions"] !== undefined) {
          body["suggestions"] = g["suggestions"];
        }
        if (g["topicDetails"] !== undefined) {
          body["topicDetails"] = g["topicDetails"];
        }
        if (g["autoLevels"] !== undefined) body["autoLevels"] = g["autoLevels"];
        if (g["notifySubscribers"] !== undefined) {
          body["notifySubscribers"] = g["notifySubscribers"];
        }
        if (g["onBehalfOfContentOwner"] !== undefined) {
          body["onBehalfOfContentOwner"] = g["onBehalfOfContentOwner"];
        }
        if (g["onBehalfOfContentOwnerChannel"] !== undefined) {
          body["onBehalfOfContentOwnerChannel"] =
            g["onBehalfOfContentOwnerChannel"];
        }
        if (g["stabilize"] !== undefined) body["stabilize"] = g["stabilize"];
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
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
      description: "Get a videos",
      arguments: z.object({
        identifier: z.string().describe("The name of the videos"),
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
      description: "Update videos attributes",
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
        if (g["ageGating"] !== undefined) body["ageGating"] = g["ageGating"];
        if (g["contentDetails"] !== undefined) {
          body["contentDetails"] = g["contentDetails"];
        }
        if (g["fileDetails"] !== undefined) {
          body["fileDetails"] = g["fileDetails"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["liveStreamingDetails"] !== undefined) {
          body["liveStreamingDetails"] = g["liveStreamingDetails"];
        }
        if (g["localizations"] !== undefined) {
          body["localizations"] = g["localizations"];
        }
        if (g["monetizationDetails"] !== undefined) {
          body["monetizationDetails"] = g["monetizationDetails"];
        }
        if (g["paidProductPlacementDetails"] !== undefined) {
          body["paidProductPlacementDetails"] =
            g["paidProductPlacementDetails"];
        }
        if (g["player"] !== undefined) body["player"] = g["player"];
        if (g["processingDetails"] !== undefined) {
          body["processingDetails"] = g["processingDetails"];
        }
        if (g["projectDetails"] !== undefined) {
          body["projectDetails"] = g["projectDetails"];
        }
        if (g["recordingDetails"] !== undefined) {
          body["recordingDetails"] = g["recordingDetails"];
        }
        if (g["snippet"] !== undefined) body["snippet"] = g["snippet"];
        if (g["statistics"] !== undefined) body["statistics"] = g["statistics"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["suggestions"] !== undefined) {
          body["suggestions"] = g["suggestions"];
        }
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
    delete: {
      description: "Delete the videos",
      arguments: z.object({
        identifier: z.string().describe("The name of the videos"),
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
      description: "Sync videos state from GCP",
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
    get_rating: {
      description: "get rating",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["id"] !== undefined) params["id"] = String(g["id"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "youtube.videos.getRating",
            "path": "youtube/v3/videos/getRating",
            "httpMethod": "GET",
            "parameterOrder": ["id"],
            "parameters": {
              "id": { "location": "query", "required": true },
              "onBehalfOfContentOwner": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    rate: {
      description: "rate",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["id"] !== undefined) params["id"] = String(g["id"]);
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
        params["rating"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "youtube.videos.rate",
            "path": "youtube/v3/videos/rate",
            "httpMethod": "POST",
            "parameterOrder": ["id", "rating"],
            "parameters": {
              "id": { "location": "query", "required": true },
              "rating": { "location": "query", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    report_abuse: {
      description: "report abuse",
      arguments: z.object({
        comments: z.any().optional(),
        language: z.any().optional(),
        reasonId: z.any().optional(),
        secondaryReasonId: z.any().optional(),
        videoId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["comments"] !== undefined) body["comments"] = args["comments"];
        if (args["language"] !== undefined) body["language"] = args["language"];
        if (args["reasonId"] !== undefined) body["reasonId"] = args["reasonId"];
        if (args["secondaryReasonId"] !== undefined) {
          body["secondaryReasonId"] = args["secondaryReasonId"];
        }
        if (args["videoId"] !== undefined) body["videoId"] = args["videoId"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "youtube.videos.reportAbuse",
            "path": "youtube/v3/videos/reportAbuse",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": { "onBehalfOfContentOwner": { "location": "query" } },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
