import {
  BasePathPatterns,
  type PluginExtension,
  coreExtensionPoints,
} from "@open-choreo/plugin-core";
import {
  MenuOverviewFilledIcon,
  MenuOverviewIcon,
} from "@open-choreo/design-system";

export const projectOverviewNavigation: PluginExtension = {
  extentionPoint: coreExtensionPoints.projectNavigation,
  icon: () => <MenuOverviewIcon fontSize="inherit" />,
  iconSelected: () => <MenuOverviewFilledIcon fontSize="inherit" />,
  path: "",
  name: "Overview",
  pathPattern: BasePathPatterns.PROJECT_LEVEL,
};

export const componentOverviewNavigation: PluginExtension = {
  extentionPoint: coreExtensionPoints.componentNavigation,
  icon: () => <MenuOverviewIcon fontSize="inherit" />,
  iconSelected: () => <MenuOverviewFilledIcon fontSize="inherit" />,
  path: "",
  name: "Overview",
  pathPattern: BasePathPatterns.COMPONENT_LEVEL,
};

export const orgOverviewNavigation: PluginExtension = {
  extentionPoint: coreExtensionPoints.orgNavigation,
  icon: () => <MenuOverviewIcon fontSize="inherit" />,
  iconSelected: () => <MenuOverviewFilledIcon fontSize="inherit" />,
  path: "",
  name: "Overview",
  pathPattern: BasePathPatterns.ORG_LEVEL,
};
