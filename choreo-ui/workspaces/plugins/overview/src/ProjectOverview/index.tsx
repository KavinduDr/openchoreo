import {
  type PluginExtension,
  coreExtensionPoints,
} from "@open-choreo/plugin-core";
import ProjectOverview from "./ProjectOverview";
export { projectOverviewMainExtensionPoint } from "./ProjectOverview";

export const projectOverview: PluginExtension = {
  extentionPoint: coreExtensionPoints.projectLevelPage,
  component: ProjectOverview,
  pathPattern: "",
};
