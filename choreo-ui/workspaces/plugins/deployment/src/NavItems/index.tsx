import { BasePathPatterns } from "@open-choreo/choreo-context";
import {
  MenuDeployFilledIcon,
  MenuDeployIcon,
} from "@open-choreo/design-system";
import {
  type PluginExtension,
  coreExtensionPoints,
} from "@open-choreo/plugin-core";

export const deploymentMenu: PluginExtension = {
  extensionPoint: coreExtensionPoints.componentNavigation,
  icon: () => <MenuDeployIcon fontSize="inherit" />,
  iconSelected: () => <MenuDeployFilledIcon fontSize="inherit" />,
  path: "/deploy",
  name: "Deployment",
  pathPattern: `${BasePathPatterns.COMPONENT_LEVEL}/deploy`,
};
