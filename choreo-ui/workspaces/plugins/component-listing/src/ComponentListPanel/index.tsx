import { type PluginExtension } from "@open-choreo/plugin-core";
import React from "react";
const ComponentListPanel = React.lazy(() => import("./ComponentListPanel"));
import { projectOverviewMainExtensionPoint } from "@open-choreo/overviews";
import { componentListMainExtensionPoint } from "../ComponentListPage/ComponentList";

export const componentListPanel: PluginExtension = {
  extensionPoint: projectOverviewMainExtensionPoint,
  component: ComponentListPanel,
  key: "component-list-panel",
  when: "project",
};

export const projectOverviewComponentListPanel: PluginExtension = {
  extensionPoint: componentListMainExtensionPoint,
  component: ComponentListPanel,
  key: "component-list-project-overview-panel",
  when: "project",
};
