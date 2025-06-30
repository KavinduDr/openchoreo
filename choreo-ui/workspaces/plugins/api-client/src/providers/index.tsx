import {
  type PluginExtension,
  PluginExtensionType,
} from "@open-choreo/plugin-core";
import React from "react";
const ApiClientProvider = React.lazy(() => import("./ApiClientProvider"));

export const provider: PluginExtension = {
  type: PluginExtensionType.PROVIDER,
  extentionPointId: "global",
  key: "api-client",
  component: ApiClientProvider,
};
