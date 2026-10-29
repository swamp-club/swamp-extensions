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

/**
 * The shapes brand shares with other extensions. The cards contract and the
 * presenter are @swamp/video's (copied: extensions can't import each other;
 * contract_test.ts pins them to core's). The stage is brand's own, for
 * @swamp/video/obs to read when it builds the OBS scene.
 *
 * @module
 */

import { z } from "zod";

const Card = z.object({
  path: z.string().min(1),
  seconds: z.number().positive(),
});

/** @swamp/video's cards contract (core `CardsResourceSchema`). */
export const CardsResourceSchema = z.object({
  intro: Card.optional(),
  outro: Card.optional(),
  lowerThird: Card.extend({ at: z.number().min(0) }).optional(),
  fastForwardBadge: z.object({ path: z.string().min(1) }).optional(),
});

/** @swamp/video/presenter's `presenter` resource. */
export const PresenterSchema = z.object({
  name: z.string(),
  title: z.string().default(""),
  handle: z.string().default(""),
  email: z.string().default(""),
  campaignUrl: z.string().default(""),
  cta: z.string().default(""),
  links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
});

export type Presenter = z.infer<typeof PresenterSchema>;

const Rect = z.object({
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
});

/**
 * Where the screen share, webcam and its ring sit, in stage pixels
 * (1920x1080); OBS scales them to its canvas.
 */
export const StageLayoutSchema = z.object({
  stageWidth: z.number(),
  stageHeight: z.number(),
  screen: Rect,
  camera: Rect,
  ring: Rect,
});

export type StageLayout = z.infer<typeof StageLayoutSchema>;
export type Rect = z.infer<typeof Rect>;

/** The `stage` resource: the studio look for OBS. */
export const StageSchema = z.object({
  dir: z.string(),
  /** Full-canvas backdrop behind the screen share. */
  backdropPath: z.string(),
  /** Seamless VP9-with-alpha loop of the ring around the webcam. */
  cameraRingPath: z.string(),
  /** White disc whose alpha cuts the webcam to a circle. */
  cameraMaskPath: z.string(),
  layout: StageLayoutSchema,
});
