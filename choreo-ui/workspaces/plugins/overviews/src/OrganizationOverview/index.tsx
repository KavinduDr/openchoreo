import {
  type PluginExtension,
  coreExtensionPoints,
} from "@open-choreo/plugin-core";
import OrganizationOverview from "./OrganizationOverview";

export {
  organizationOverviewMainExtensionPoint,
  organizationOverviewSecondaryExtensionPoint,
} from "./OrganizationOverview";

export const organizationOverview: PluginExtension = {
  extensionPoint: coreExtensionPoints.orgLevelPage,
  component: OrganizationOverview,
  pathPattern: "",
  when: "org",
};
