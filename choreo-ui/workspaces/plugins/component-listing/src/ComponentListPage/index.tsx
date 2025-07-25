import {
  type PluginExtension,
  coreExtensionPoints,
} from "@open-choreo/plugin-core";
import ComponentList from "./ComponentList";

export const componentList: PluginExtension = {
  extensionPoint: coreExtensionPoints.projectLevelPage,
  component: ComponentList,
  pathPattern: "/components",
  when: "project",
};
