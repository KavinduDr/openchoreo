import {
  type PluginExtension,
  coreExtensionPoints,
} from "@open-choreo/plugin-core";
import ComponentOverview from "./ComponentOverview";
export { componentOverviewMainExtensionPoint } from "./ComponentOverview";

export const componentOverview: PluginExtension = {
  extensionPoint: coreExtensionPoints.componentLevelPage,
  component: ComponentOverview,
  pathPattern: "",
  when: "component",
};
