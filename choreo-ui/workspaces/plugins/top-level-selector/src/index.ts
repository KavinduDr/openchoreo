import { type PluginManifest } from "@open-choreo/plugin-core";

import { panel } from "./panel";

export const levelSelectorPlugin = {
  name: "Top Level Selector",
  description: "Top Level Selector",
  extensions: [panel],
} as PluginManifest;
