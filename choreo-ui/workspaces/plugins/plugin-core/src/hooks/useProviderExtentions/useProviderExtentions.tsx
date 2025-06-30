import { useMemo } from "react";
import {
  PluginExtensionType,
  PluginExtensionProvider,
} from "../../../plugin-types";
import { usePluginRegistry } from "../../Providers";

export function useExtentionProviders(extentionPointId: string) {
  const pluginRegistry = usePluginRegistry();
  const entries: PluginExtensionProvider[] = useMemo(
    () =>
      pluginRegistry.flatMap(
        (plugin) =>
          plugin.extensions.filter(
            (entry) =>
              entry.type === PluginExtensionType.PROVIDER &&
              entry.extentionPointId === extentionPointId,
          ) as PluginExtensionProvider[],
      ),
    [pluginRegistry, extentionPointId],
  );
  return entries;
}
