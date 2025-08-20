import { type PluginManifest } from "@open-choreo/plugin-core";
import { componentDetails } from "./ComponentDetails";
import { componentList } from "./ComponentListPage";
import {
  componentListPanel,
  projectOverviewComponentListPanel,
} from "./ComponentListPanel";
import { componentSummary } from "./ComponentSummary";
import { componentListNavigation } from "./NavItems";

export const componentListingPlugin = {
  name: "Component Listing Plugin",
  description: "List down selected project's components",
  extensions: [
    componentList,
    componentListNavigation,
    componentListPanel,
    projectOverviewComponentListPanel,
    componentSummary,
    componentDetails,
  ],
} as PluginManifest;
