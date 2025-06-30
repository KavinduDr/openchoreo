import { NavItemExpandableSubMenu } from "@open-choreo/design-system";
import React, { useMemo } from "react";
import { PluginExtensionType } from "../../../plugin-types";
import { usePluginRegistry } from "../../Providers";

export function useMainNavExtentions() {
  const pluginRegistry = usePluginRegistry();
  const navigationEntries: NavItemExpandableSubMenu[] = useMemo(
    () =>
      pluginRegistry.flatMap((plugin) =>
        plugin.extensions
          .filter((entry) => entry.type === PluginExtensionType.NAVIGATION)
          .map(
            (entry) =>
              ({
                title: entry.name,
                id: entry.name,
                icon: <entry.icon />,
                selectedIcon: <entry.iconSelected />,
                href: entry.path,
                subMenuItems: entry.submenu?.map((submenu) => ({
                  title: submenu.name,
                  id: submenu.name,
                  icon: <submenu.icon />,
                  selectedIcon: <submenu.iconSelected />,
                  href: submenu.path,
                })),
              }) as NavItemExpandableSubMenu,
          ),
      ),
    [pluginRegistry],
  );

  return navigationEntries;
}
