import React from "react";
import { projectOverviewMainExtensionPoint } from "@open-choreo/overviews";
import { type PluginExtension } from "@open-choreo/plugin-core";
import { componentListMainExtensionPoint } from "../ComponentListPage/ComponentList";
const ComponentListPanel = React.lazy(() => import("./ComponentListPanel"));

export const componentListPanel: PluginExtension = {
  extensionPoint: projectOverviewMainExtensionPoint,
  component: ComponentListPanel,
  key: "component-list-panel",
  when: "project != null",
};

export const projectOverviewComponentListPanel: PluginExtension = {
  extensionPoint: componentListMainExtensionPoint,
  component: ComponentListPanel,
  key: "component-list-project-overview-panel",
  when: "project != null",
};
