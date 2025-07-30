import { type PluginManifest } from "@open-choreo/plugin-core";
import { projectListPanel } from "./ProjectListPanel";

export const projectListingPlugin = {
  name: "Project Listing Plugin",
  description: "List down selected organization's projects",
  extensions: [projectListPanel],
} as PluginManifest;
