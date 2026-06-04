// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

/**
 * Mini Shai-Hulud supply chain scanner — checks deno.lock and
 * package-lock.json files for the 317 npm packages compromised in the
 * May 2026 "Mini Shai-Hulud" attack.
 *
 * Source: https://safedep.io/mini-shai-hulud-strikes-again-314-npm-packages-compromised/
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";

// ---------------------------------------------------------------------------
// Compromised package database
// ---------------------------------------------------------------------------

const COMPROMISED: Record<string, Set<string>> = {};

function c(name: string, ...versions: string[]) {
  COMPROMISED[name] = new Set(versions);
}

c("ai-figure", "0.5.0", "0.6.0");
c("amapcn", "0.2.2", "0.3.2");
c("@antv/a8", "0.1.1", "0.2.1");
c("@antv/adjust", "0.3.5", "0.4.5");
c("@antv/algorithm", "0.2.26", "0.3.26");
c("@antv/async-hook", "2.3.9", "2.4.9");
c("@antv/attr", "0.4.5", "0.5.5");
c("@antv/ava", "3.5.1", "3.6.1");
c("@antv/ava-react", "3.4.2", "3.5.2");
c("@antv/awards", "0.1.9", "0.2.9");
c("@antv/calendar-heatmap", "1.2.2", "1.3.2");
c("@antv/chart-linter", "1.2.6", "1.3.6");
c("@antv/chart-node-g6", "0.1.4", "0.2.4");
c("@antv/chart-visualization-skills", "0.2.3", "0.3.3");
c("@antv/ckb", "2.1.4", "2.2.4");
c("@antv/color-schema", "0.3.3", "0.4.3");
c("@antv/color-util", "2.1.6", "2.2.6");
c("@antv/component", "2.2.11", "2.3.11");
c("@antv/coord", "0.5.7", "0.6.7");
c("@antv/d3-color", "1.1.0", "1.2.0");
c("@antv/d3-interpolate", "1.1.3", "1.2.3");
c("@antv/data-samples", "1.1.1", "1.2.1");
c("@antv/data-set", "0.12.8", "0.13.8");
c("@antv/data-wizard", "2.1.4", "2.2.4");
c("@antv/dipper-component", "0.1.4", "0.2.4");
c("@antv/dipper-hooks", "0.3.1", "0.4.1");
c("@antv/dipper-map", "1.1.10", "1.2.10");
c("@antv/dom-util", "2.1.4", "2.2.4");
c("@antv/dumi-theme-antv", "0.10.4", "0.9.4");
c("@antv/dw-analyzer", "1.2.5", "1.3.5");
c("@antv/dw-random", "1.2.7", "1.3.7");
c("@antv/dw-transform", "1.2.7", "1.3.7");
c("@antv/dw-util", "1.2.4", "1.3.4");
c("@antv/event-emitter", "0.2.3", "0.3.3");
c("@antv/expr", "1.1.2", "1.2.2");
c("@antv/f2", "5.15.0", "5.16.0");
c("@antv/f2-algorithm", "5.8.0", "5.9.0");
c("@antv/f2-canvas", "1.1.5", "1.2.5");
c("@antv/f2-context", "0.1.1", "0.2.1");
c("@antv/f2-graphic", "0.1.16", "0.2.16");
c("@antv/f2-my", "4.1.52", "4.2.52");
c("@antv/f2-react", "5.15.0", "5.16.0");
c("@antv/f2-site", "4.1.42", "4.2.42");
c("@antv/f2-vue", "4.1.33", "4.2.33");
c("@antv/f2-wordcloud", "5.15.0", "5.16.0");
c("@antv/f2-wx", "4.1.51", "4.2.51");
c("@antv/f6", "0.1.19", "0.2.19");
c("@antv/f6-alipay", "0.1.7", "0.2.7");
c("@antv/f6-core", "0.1.2", "0.2.2");
c("@antv/f6-element", "0.1.1", "0.2.1");
c("@antv/f6-hammerjs", "0.1.2", "0.2.2");
c("@antv/f6-plugin", "1.1.6", "1.2.6");
c("@antv/f6-ui", "1.1.3", "1.2.3");
c("@antv/f6-wx", "0.1.7", "0.2.7");
c("@antv/f-charts", "0.1.0", "0.2.0");
c("@antv/f-engine", "1.11.0", "1.12.0");
c("@antv/f-lottie", "1.11.0", "1.12.0");
c("@antv/f-my", "1.11.0", "1.12.0");
c("@antv/f-react", "1.11.0", "1.12.0");
c("@antv/f-test-utils", "1.1.9", "1.2.9");
c("@antv/f-vue", "1.11.0", "1.12.0");
c("@antv/f-wx", "1.11.0", "1.12.0");
c("@antv/g2", "5.5.8", "5.6.8");
c("@antv/g2-brush", "0.1.2", "0.2.2");
c("@antv/g2-extension-3d", "0.3.0", "0.4.0");
c("@antv/g2-extension-ava", "0.3.0", "0.4.0");
c("@antv/g2-extension-plot", "0.3.2", "0.4.2");
c("@antv/g2plot", "2.5.35", "2.6.35");
c("@antv/g2plot-schemas", "1.3.2", "1.4.2");
c("@antv/g2-plugin-slider", "2.2.1", "2.3.1");
c("@antv/g2-ssr", "0.3.0", "0.4.0");
c("@antv/g", "6.4.1", "6.5.1");
c("@antv/g6", "5.2.1", "5.3.1");
c("@antv/g6-alipay", "0.1.1", "0.2.1");
c("@antv/g6-cli", "0.1.4", "0.2.4");
c("@antv/g6-core", "0.10.24", "0.9.24");
c("@antv/g6-editor", "1.3.0", "1.4.0");
c("@antv/g6-element", "0.10.25", "0.9.25");
c("@antv/g6-extension-3d", "0.2.23", "0.3.23");
c("@antv/g6-extension-react", "0.3.7", "0.4.7");
c("@antv/g6-mobile", "0.2.2", "0.3.2");
c("@antv/g6-pc", "0.10.25", "0.9.25");
c("@antv/g6-plugin", "0.10.25", "0.9.25");
c("@antv/g6-plugin-map-view", "0.1.4", "0.2.4");
c("@antv/g6-plugins", "1.1.9", "1.2.9");
c("@antv/g6-react-node", "1.5.8", "1.6.8");
c("@antv/g6-ssr", "0.2.1", "0.3.1");
c("@antv/g6-wx", "0.1.1", "0.2.1");
c("@antv/gatsby-theme", "0.2.0", "0.3.0");
c("@antv/g-base", "0.6.16", "0.7.16");
c("@antv/g-camera-api", "2.1.45", "2.2.45");
c("@antv/g-canvas", "2.3.0", "2.4.0");
c("@antv/g-canvaskit", "1.2.1", "1.3.1");
c("@antv/g-compat", "1.1.11", "1.2.11");
c("@antv/g-components", "2.1.42", "2.2.42");
c("@antv/g-css-layout-api", "1.1.38", "1.2.38");
c("@antv/g-css-typed-om-api", "1.1.38", "1.2.38");
c("@antv/g-device-api", "1.7.13", "1.8.13");
c("@antv/g-dom-mutation-observer-api", "2.1.42", "2.2.42");
c("@antv/geo-coord", "1.1.8", "1.2.8");
c("@antv/g-gesture", "3.1.42", "3.2.42");
c("@antv/gi-assets-advance", "2.6.22", "2.7.22");
c("@antv/gi-assets-algorithm", "2.4.19", "2.5.19");
c("@antv/gi-assets-basic", "2.5.40", "2.6.40");
c("@antv/gi-assets-galaxybase", "1.3.15", "1.4.15");
c("@antv/gi-assets-graphscope", "2.2.15", "2.3.15");
c("@antv/gi-assets-hugegraph", "1.2.15", "1.3.15");
c("@antv/gi-assets-janusgraph", "1.2.15", "1.3.15");
c("@antv/gi-assets-neo4j", "2.2.15", "2.3.15");
c("@antv/gi-assets-scene", "2.3.21", "2.4.21");
c("@antv/gi-assets-tugraph", "2.2.15", "2.3.15");
c("@antv/gi-assets-tugraph-analytics", "0.3.15", "0.4.15");
c("@antv/gi-assets-xlab", "0.2.30", "0.3.30");
c("@antv/gi-cli", "1.3.11", "1.4.11");
c("@antv/gi-common-components", "1.4.16", "1.5.16");
c("@antv/g-image-exporter", "1.1.42", "1.2.42");
c("@antv/gi-mock-data", "1.1.5", "1.2.5");
c("@antv/gi-public-data", "1.1.1", "1.2.1");
c("@antv/gi-sdk", "3.1.0", "3.2.0");
c("@antv/gi-sdk-app", "1.3.10", "1.4.10");
c("@antv/gi-theme-antd", "0.7.11", "0.8.11");
c("@antv/github-config-cli", "0.2.0", "0.3.0");
c("@antv/g-layout-blocklike", "1.8.49", "1.9.49");
c("@antv/g-lite", "2.8.0", "2.9.0");
c("@antv/gl-matrix", "2.8.1", "2.9.1");
c("@antv/g-lottie-player", "1.2.1", "1.3.1");
c("@antv/g-math", "3.2.0", "3.3.0");
c("@antv/g-mobile", "1.2.5", "1.3.5");
c("@antv/g-mobile-canvas", "1.2.1", "1.3.1");
c("@antv/g-mobile-canvas-element", "1.1.42", "1.2.42");
c("@antv/g-mobile-svg", "1.2.1", "1.3.1");
c("@antv/g-mobile-webgl", "1.2.1", "1.3.1");
c("@antv/g-pattern", "2.1.42", "2.2.42");
c("@antv/g-perf", "1.1.0", "1.2.0");
c("@antv/g-plugin-3d", "2.2.1", "2.3.1");
c("@antv/g-plugin-a11y", "1.5.1", "1.6.1");
c("@antv/g-plugin-annotation", "1.3.0", "1.4.0");
c("@antv/g-plugin-box2d", "2.2.1", "2.3.1");
c("@antv/g-plugin-canvaskit-renderer", "2.4.1", "2.5.1");
c("@antv/g-plugin-canvas-path-generator", "2.2.26", "2.3.26");
c("@antv/g-plugin-canvas-picker", "2.4.1", "2.5.1");
c("@antv/g-plugin-canvas-renderer", "2.6.1", "2.7.1");
c("@antv/g-plugin-control", "2.2.1", "2.3.1");
c("@antv/g-plugin-css-select", "2.2.1", "2.3.1");
c("@antv/g-plugin-device-renderer", "2.7.1", "2.8.1");
c("@antv/g-plugin-dom-interaction", "2.2.31", "2.3.31");
c("@antv/g-plugin-dragndrop", "2.2.1", "2.3.1");
c("@antv/g-plugin-gesture", "2.2.1", "2.3.1");
c("@antv/g-plugin-gpgpu", "1.10.20", "1.11.20");
c("@antv/g-plugin-html-renderer", "2.4.1", "2.5.1");
c("@antv/g-plugin-image-loader", "2.4.1", "2.5.1");
c("@antv/g-plugin-matterjs", "2.2.1", "2.3.1");
c("@antv/g-plugin-mobile-interaction", "1.1.42", "1.2.42");
c("@antv/g-plugin-physx", "2.2.1", "2.3.1");
c("@antv/g-plugin-rough-canvas-renderer", "2.2.1", "2.3.1");
c("@antv/g-plugin-rough-svg-renderer", "2.2.1", "2.3.1");
c("@antv/g-plugin-svg-picker", "2.1.46", "2.2.46");
c("@antv/g-plugin-svg-renderer", "2.5.1", "2.6.1");
c("@antv/g-plugin-webgl-device", "1.10.17", "1.11.17");
c("@antv/g-plugin-webgl-renderer", "1.1.26", "1.2.26");
c("@antv/g-plugin-webgpu-device", "1.10.17", "1.11.17");
c("@antv/g-plugin-yoga", "2.4.1", "2.5.1");
c("@antv/g-plugin-zdog-canvas-renderer", "2.2.1", "2.3.1");
c("@antv/g-plugin-zdog-svg-renderer", "2.2.1", "2.3.1");
c("@antv/gpt-vis", "1.1.0", "1.2.0");
c("@antv/gpt-vis-ssr", "0.4.7", "0.5.7");
c("@antv/graphin", "3.1.5", "3.2.5");
c("@antv/graphin-components", "2.5.1", "2.6.1");
c("@antv/graphin-graphscope", "1.1.5", "1.2.5");
c("@antv/graphin-icons", "1.1.0", "1.2.0");
c("@antv/graphlib", "2.1.4", "2.2.4");
c("@antv/g-shader-components", "2.1.0", "2.2.0");
c("@antv/g-svg", "2.2.1", "2.3.1");
c("@antv/g-web-animations-api", "2.2.32", "2.3.32");
c("@antv/g-web-components", "2.2.1", "2.3.1");
c("@antv/g-webgl", "2.2.1", "2.3.1");
c("@antv/g-webgl-compute", "0.1.1", "0.2.1");
c("@antv/g-webgpu", "2.2.1", "2.3.1");
c("@antv/g-webgpu-compiler", "0.8.2", "0.9.2");
c("@antv/g-webgpu-core", "0.8.2", "0.9.2");
c("@antv/g-webgpu-engine", "0.8.2", "0.9.2");
c("@antv/g-webgpu-raytracer", "0.6.1", "0.7.1");
c("@antv/g-webgpu-unitchart", "0.6.1", "0.7.1");
c("@antv/hierarchy", "0.8.1", "0.9.1");
c("@antv/infographic", "0.3.19", "0.4.19");
c("@antv/insight-component", "1.1.0", "1.2.0");
c("@antv/interaction", "0.2.5", "0.3.5");
c("@antv/istanbul", "0.1.0", "0.2.0");
c("@antv/knowledge", "1.2.4", "1.3.4");
c("@antv/l7", "2.26.10", "2.27.10");
c("@antv/l7-component", "2.26.10", "2.27.10");
c("@antv/l7-composite-layers", "0.18.1", "0.19.1");
c("@antv/l7-core", "2.26.10", "2.27.10");
c("@antv/l7-district", "2.4.12", "2.5.12");
c("@antv/l7-draw", "3.2.5", "3.3.5");
c("@antv/l7-editor", "1.2.13", "1.3.13");
c("@antv/l7-extension-g-layer", "1.1.0", "1.2.0");
c("@antv/l7-layers", "2.26.10", "2.27.10");
c("@antv/l7-leaflet", "1.1.2", "1.2.2");
c("@antv/l7-map", "2.26.10", "2.27.10");
c("@antv/l7-mapkit", "0.6.0", "0.7.0");
c("@antv/l7-maps", "2.26.10", "2.27.10");
c("@antv/l7-mini", "2.21.8", "2.22.8");
c("@antv/l7-pass", "1.1.0", "1.2.0");
c("@antv/l7plot", "0.6.11", "0.7.11");
c("@antv/l7plot-component", "0.1.11", "0.2.11");
c("@antv/l7-react", "2.5.3", "2.6.3");
c("@antv/l7-renderer", "2.26.10", "2.27.10");
c("@antv/l7-scene", "2.26.10", "2.27.10");
c("@antv/l7-source", "2.26.10", "2.27.10");
c("@antv/l7-three", "2.26.10", "2.27.10");
c("@antv/l7-utils", "2.26.10", "2.27.10");
c("@antv/larkmap", "1.6.1", "1.7.1");
c("@antv/layout-gpu", "1.2.7", "1.3.7");
c("@antv/layout-wasm", "1.5.2", "1.6.2");
c("@antv/li-aiearth-assets", "0.5.7", "0.6.7");
c("@antv/li-analysis-assets", "1.10.1", "1.11.1");
c("@antv/li-core-assets", "1.4.7", "1.5.7");
c("@antv/li-editor", "1.7.1", "1.8.1");
c("@antv/li-p2", "1.10.2", "1.9.2");
c("@antv/li-sam-assets", "0.2.4", "0.3.4");
c("@antv/li-sdk", "1.6.1", "1.7.1");
c("@antv/lite-insight", "2.2.1", "2.3.1");
c("@antv/matrix-util", "3.1.4", "3.2.4");
c("@antv/mcp-server-antv", "0.2.8", "0.3.8");
c("@antv/mcp-server-chart", "0.10.10", "0.11.10");
c("@antv/my-f2", "2.2.7", "2.3.7");
c("@antv/my-f2-pc", "0.2.1", "0.3.1");
c("@antv/narrative-text-editor", "0.3.20", "0.4.20");
c("@antv/narrative-text-schema", "0.4.7", "0.5.7");
c("@antv/narrative-text-vis", "0.4.16", "0.5.16");
c("@antv/path-util", "3.1.1", "3.2.1");
c("@antv/react-g", "2.2.1", "2.3.1");
c("@antv/s2", "2.8.1", "2.9.1");
c("@antv/s2-react", "2.4.1", "2.5.1");
c("@antv/s2-react-components", "2.2.2", "2.3.2");
c("@antv/s2-ssr", "0.2.1", "0.3.1");
c("@antv/s2-vue", "2.3.0", "2.4.0");
c("@antv/sam", "0.3.0", "0.4.0");
c("@antv/scale", "0.6.2", "0.7.2");
c("@antv/semantic-release-pnpm", "1.1.4", "1.2.4");
c("@antv/smart-color", "0.3.1", "0.4.1");
c("@antv/stat", "0.1.2", "0.2.2");
c("@antv/t8", "0.4.0", "0.5.0");
c("@antv/thumbnails", "2.1.0", "2.2.0");
c("@antv/thumbnails-component", "2.1.0", "2.2.0");
c("@antv/torch", "1.1.6", "1.2.6");
c("@antv/translator", "1.1.1", "1.2.1");
c("@antv/util", "3.4.11", "3.5.11");
c("@antv/vendor", "1.1.11", "1.2.11");
c("@antv/vis-predict-engine", "0.2.1", "0.3.1");
c("@antv/webgpu-graph", "1.1.0", "1.2.0");
c("@antv/word-scale-chart", "0.4.4", "0.5.4");
c("@antv/wx-f2", "2.2.1", "2.3.1");
c("@antv/x6", "3.2.7", "3.3.7");
c("@antv/x6-angular-shape", "3.1.1", "3.2.1");
c("@antv/x6-common", "2.1.17", "2.2.17");
c("@antv/x6-components", "0.11.7", "0.12.7");
c("@antv/x6-geometry", "2.1.5", "2.2.5");
c("@antv/x6-plugin-clipboard", "2.2.6", "2.3.6");
c("@antv/x6-plugin-dnd", "2.2.1", "2.3.1");
c("@antv/x6-plugin-export", "2.2.6", "2.3.6");
c("@antv/x6-plugin-history", "2.3.4", "2.4.4");
c("@antv/x6-plugin-keyboard", "2.3.3", "2.4.3");
c("@antv/x6-plugin-minimap", "2.1.7", "2.2.7");
c("@antv/x6-plugin-scroller", "2.1.10", "2.2.10");
c("@antv/x6-plugin-selection", "2.3.2", "2.4.2");
c("@antv/x6-plugin-snapline", "2.2.7", "2.3.7");
c("@antv/x6-plugin-stencil", "2.2.5", "2.3.5");
c("@antv/x6-plugin-transform", "2.2.8", "2.3.8");
c("@antv/x6-react", "0.2.26", "0.3.26");
c("@antv/x6-react-components", "2.1.9", "2.2.9");
c("@antv/x6-react-shape", "3.1.1", "3.2.1");
c("@antv/x6-vector", "1.5.2", "1.6.2");
c("@antv/x6-vue3-shape", "1.1.0", "1.2.0");
c("@antv/x6-vue-shape", "3.1.2", "3.2.2");
c("@antv/xflow", "2.2.13", "2.3.13");
c("@antv/xflow-core", "1.1.55", "1.2.55");
c("@antv/xflow-diff", "1.1.0", "1.2.0");
c("@antv/xflow-extension", "1.1.55", "1.2.55");
c("@antv/xflow-hook", "1.1.55", "1.2.55");
c("ast-plugin", "0.1.7", "0.2.7");
c("babel-plugin-version", "0.3.3", "0.4.3");
c("boring-avatars-vanilla", "1.1.2", "1.2.2");
c("byte-parser", "1.1.0", "1.2.0");
c("canvas-nest.js", "2.1.4", "2.2.4");
c("echarts-for-react", "3.0.7", "3.1.7", "3.2.7");
c("filesize.js", "2.1.0", "2.2.0");
c("fixed-round", "1.1.2", "1.2.2");
c("gantt-for-react", "0.3.0", "0.4.0");
c("jest-canvas-mock", "2.5.3", "2.6.3", "2.7.3");
c("jest-date-mock", "1.0.11", "1.1.11", "1.2.11");
c("jest-electron", "0.2.12", "0.3.12");
c("jest-expect", "0.1.1", "0.2.1");
c("jest-less-loader", "0.3.0", "0.4.0");
c("jest-random-mock", "1.1.0", "1.2.0");
c("jest-url-loader", "0.2.0", "0.3.0");
c("limit-size", "0.2.4", "0.3.4");
c("lint-md", "0.3.0", "0.4.0");
c("lint-md-cli", "0.2.2", "0.3.2");
c("@lint-md/cli", "2.1.0", "2.2.0");
c("@lint-md/core", "2.1.0", "2.2.0");
c("@lint-md/parser", "0.1.14", "0.2.14");
c("mcp-echarts", "0.8.1", "0.9.1");
c("mcp-mermaid", "0.5.1", "0.6.1");
c("miz", "1.1.1", "1.2.1");
c("onfire.js", "2.1.1", "2.2.1");
c("react-adsense", "0.2.0", "0.3.0");
c("relationship.js", "1.3.9", "1.4.9");
c("ribbon.js", "1.1.2");
c("size-sensor", "1.0.4", "1.1.4", "1.2.4");
c("slice.js", "1.2.1", "1.3.1");
c("timeago.js", "4.1.2", "4.2.2");
c("timeago-react", "3.1.7", "3.2.7");
c("uri-parse", "1.1.0", "1.2.0");
c("word-width", "1.1.1", "1.2.1");
c("xmorse", "1.1.0", "1.2.0");

export { COMPROMISED };

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------

const GlobalArgsSchema = z.object({
  lockfilePath: z
    .string()
    .optional()
    .describe(
      "Default path to a deno.lock or package-lock.json file to scan",
    ),
});

const PackageResultSchema = z.object({
  name: z.string(),
  version: z.string(),
  status: z.enum(["clean", "COMPROMISED"]),
});

const ScanResultSchema = z.object({
  scanTimestamp: z.string(),
  lockfilePath: z.string(),
  lockfileFormat: z.enum(["deno.lock", "package-lock.json"]),
  totalPackages: z.number(),
  compromisedCount: z.number(),
  cleanCount: z.number(),
  packages: z.array(PackageResultSchema),
});

// ---------------------------------------------------------------------------
// Lockfile parsers
// ---------------------------------------------------------------------------

interface PackageEntry {
  name: string;
  version: string;
}

function parseDenoLock(raw: string): PackageEntry[] {
  const lock = JSON.parse(raw);
  const entries: PackageEntry[] = [];
  const npm: Record<string, unknown> = lock.npm ?? {};
  for (const key of Object.keys(npm)) {
    const lastAt = key.lastIndexOf("@");
    if (lastAt <= 0) continue;
    const name = key.substring(0, lastAt);
    const version = key.substring(lastAt + 1).split("_")[0];
    entries.push({ name, version });
  }
  return entries;
}

interface PkgLockDep {
  version?: string;
  dependencies?: Record<string, PkgLockDep>;
}

function parsePackageLock(raw: string): PackageEntry[] {
  const lock = JSON.parse(raw) as {
    packages?: Record<string, { version?: string }>;
    dependencies?: Record<string, PkgLockDep>;
  };
  const entries: PackageEntry[] = [];
  const seen = new Set<string>();

  if (lock.packages) {
    for (const [key, val] of Object.entries(lock.packages)) {
      if (!key || !val.version) continue;
      const name = key.replace(/^.*node_modules\//, "");
      const id = `${name}@${val.version}`;
      if (!seen.has(id)) {
        seen.add(id);
        entries.push({ name, version: val.version });
      }
    }
  } else if (lock.dependencies) {
    const walkDeps = (deps: Record<string, PkgLockDep>) => {
      for (const [name, dep] of Object.entries(deps)) {
        if (dep.version) {
          const id = `${name}@${dep.version}`;
          if (!seen.has(id)) {
            seen.add(id);
            entries.push({ name, version: dep.version });
          }
        }
        if (dep.dependencies) {
          walkDeps(dep.dependencies);
        }
      }
    };
    walkDeps(lock.dependencies);
  }

  return entries;
}

function detectFormat(path: string): "deno.lock" | "package-lock.json" {
  const basename = path.split("/").pop() ?? "";
  if (basename === "package-lock.json") return "package-lock.json";
  if (basename === "deno.lock") return "deno.lock";
  throw new Error(
    `Unsupported lockfile format: ${basename}. Expected deno.lock or package-lock.json`,
  );
}

function checkPackage(
  name: string,
  version: string,
): "clean" | "COMPROMISED" {
  const versions = COMPROMISED[name];
  if (!versions) return "clean";
  return versions.has(version) ? "COMPROMISED" : "clean";
}

export {
  checkPackage,
  detectFormat,
  type PackageEntry,
  parseDenoLock,
  parsePackageLock,
};

// ---------------------------------------------------------------------------
// Model
// ---------------------------------------------------------------------------

type MethodContext = {
  globalArgs: { lockfilePath?: string };
  logger: { info: (msg: string) => void };
  writeResource: (
    specName: string,
    instanceName: string,
    data: unknown,
  ) => Promise<unknown>;
};

export const model = {
  type: "@swamp/cve/mini-shai-hulud",
  version: "2026.06.04.1",
  globalArguments: GlobalArgsSchema,
  upgrades: [
    {
      toVersion: "2026.06.04.1",
      description: "Copyright and branding update to Elder Swamp Club, Inc. " +
        "No code, schema, or behavior change.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  reports: [
    "@swamp/cve/mini-shai-hulud-report",
  ],
  resources: {
    scanResult: {
      description:
        "Scan results for a lockfile checked against the Mini Shai-Hulud compromised package list",
      schema: ScanResultSchema,
      lifetime: "infinite" as const,
      garbageCollection: 20,
    },
  },
  methods: {
    scan: {
      description:
        "Scan a deno.lock or package-lock.json for packages compromised in the May 2026 Mini Shai-Hulud npm supply chain attack",
      arguments: z.object({
        lockfilePath: z
          .string()
          .optional()
          .describe(
            "Override the lockfile path from global args",
          ),
      }),
      execute: async (
        args: { lockfilePath?: string },
        context: MethodContext,
      ) => {
        const lockfilePath = args.lockfilePath ??
          context.globalArgs.lockfilePath;
        if (!lockfilePath) {
          throw new Error(
            "lockfilePath is required. Pass --input lockfilePath=./deno.lock",
          );
        }
        const raw = await Deno.readTextFile(lockfilePath);
        const format = detectFormat(lockfilePath);
        const entries = format === "deno.lock"
          ? parseDenoLock(raw)
          : parsePackageLock(raw);

        entries.sort((a, b) => a.name.localeCompare(b.name));

        const packages = entries.map((e) => ({
          name: e.name,
          version: e.version,
          status: checkPackage(e.name, e.version) as "clean" | "COMPROMISED",
        }));

        const compromisedCount = packages.filter(
          (p) => p.status === "COMPROMISED",
        ).length;

        const result = {
          scanTimestamp: new Date().toISOString(),
          lockfilePath,
          lockfileFormat: format,
          totalPackages: packages.length,
          compromisedCount,
          cleanCount: packages.length - compromisedCount,
          packages,
        };

        context.logger.info(
          `Scanned ${lockfilePath}: ${packages.length} packages, ${compromisedCount} compromised`,
        );

        const label = lockfilePath.replace(/[\/\\\.]+/g, "-").replace(
          /^-+|-+$/g,
          "",
        );
        const handle = await context.writeResource(
          "scanResult",
          label,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
  },
};
