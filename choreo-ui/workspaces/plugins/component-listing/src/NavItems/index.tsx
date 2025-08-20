import { BasePathPatterns } from "@open-choreo/choreo-context";
import {
  MenuComponentsFilledIcon,
  MenuComponentsIcon,
} from "@open-choreo/design-system";
import {
  type PluginExtension,
  coreExtensionPoints,
} from "@open-choreo/plugin-core";

export const componentListNavigation: PluginExtension = {
  extensionPoint: coreExtensionPoints.projectNavigation,
  icon: () => <MenuComponentsIcon fontSize="inherit" />,
  iconSelected: () => <MenuComponentsFilledIcon fontSize="inherit" />,
  path: "/components",
  name: "Components",
  pathPattern: BasePathPatterns.PROJECT_LEVEL + "/components",
  when: "project != null",
};
