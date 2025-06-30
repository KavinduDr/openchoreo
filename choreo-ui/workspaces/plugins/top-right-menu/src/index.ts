import { type PluginManifest } from "@open-choreo/plugin-core";

import { panel } from "./panel";

export const topRightMenuPlugin = {
  name: "Top Right Menu",
  description: "Top Right Menu Plugin",
  extensions: [panel],
} as PluginManifest;
