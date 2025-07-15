import {
  type PluginExtension,
  coreExtensionPoints,
} from "@open-choreo/plugin-core";
import OrgOverview from "./OrgOverview";
export {
  organizationOverviewMainExtensionPoint,
  organizationOverviewSecondaryExtensionPoint,
} from "./OrgOverview";
export const orgOverview: PluginExtension = {
  extentionPoint: coreExtensionPoints.orgLevelPage,
  component: OrgOverview,
  pathPattern: "",
};
