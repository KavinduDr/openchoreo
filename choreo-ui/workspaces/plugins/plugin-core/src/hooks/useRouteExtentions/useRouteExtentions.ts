import React, { useMemo } from "react";
import { PluginExtensionPoint, PluginExtensionRoute } from "../../plugin-types";
import { usePluginRegistry } from "../../Providers";

export function useRouteExtentions(extentionPoint: PluginExtensionPoint) {
  const pluginRegistry = usePluginRegistry();
  return useMemo(() => {
    return pluginRegistry.flatMap(
      (plugin) =>
        plugin.extensions.filter(
          (entry) =>
            entry.extentionPoint.id === extentionPoint.id &&
            entry.extentionPoint.type === extentionPoint.type,
        ) as PluginExtensionRoute[],
    );
  }, [pluginRegistry, extentionPoint]);
}
