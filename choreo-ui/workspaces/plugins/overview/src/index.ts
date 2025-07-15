import { type PluginManifest } from "@open-choreo/plugin-core";
import {
  componentOverviewNavigation,
  orgOverviewNavigation,
  projectOverviewNavigation,
} from "./NavItems";
import { orgOverview } from "./OrgOverview";
import { projectOverview } from "./ProjectOverview";
import { componentOverview } from "./ComponentOverview";

export { organizationOverviewMainExtensionPoint } from "./OrgOverview";
export { projectOverviewMainExtensionPoint } from "./ProjectOverview";
export { componentOverviewMainExtensionPoint } from "./ComponentOverview";

export const overviewPlugin = {
  name: "Overview",
  description: "Overview plugin",
  extensions: [
    componentOverviewNavigation,
    orgOverviewNavigation,
    projectOverviewNavigation,
    orgOverview,
    projectOverview,
    componentOverview,
  ],
} as PluginManifest;
