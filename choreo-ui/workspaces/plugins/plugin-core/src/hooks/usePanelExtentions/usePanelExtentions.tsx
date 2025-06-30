import { useMemo } from "react";
import {
  PluginExtensionType,
  PluginExtensionPanel,
} from "../../../plugin-types";
import { usePluginRegistry } from "../../Providers";

export function usePanelExtentions(extentionPointId: string) {
  const pluginRegistry = usePluginRegistry();
  const entries: PluginExtensionPanel[] = useMemo(
    () =>
      pluginRegistry.flatMap(
        (plugin) =>
          plugin.extensions.filter(
            (entry) =>
              entry.type === PluginExtensionType.PANEL &&
              entry.extentionPointId === extentionPointId,
          ) as PluginExtensionPanel[],
      ),
    [pluginRegistry, extentionPointId],
  );
  return entries;
}
