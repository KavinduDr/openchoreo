import { type PluginManifest } from "@open-choreo/plugin-core";

import { navigation } from "./nav-items";
import { page } from "./pages";

export const overviewPlugin = {
  name: "Overview",
  description: "Overview plugin",
  extensions: [navigation, page],
} as PluginManifest;
