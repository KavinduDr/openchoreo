import { type PluginExtension } from "@open-choreo/plugin-core";
import { componentOverviewMainExtensionPoint } from "@open-choreo/overviews";
import React from "react";

const ComponentDetails = React.lazy(() => import("./ComponentDetails"));

export const componentDetails: PluginExtension = {
  extensionPoint: componentOverviewMainExtensionPoint,
  component: ComponentDetails,
  key: "component-details",
  when: "level === 'component' && type === 'WebApplication'",
};
