import { NavItemExpandableSubMenu } from "@open-choreo/design-system";
import React, { useMemo } from "react";
import {
  PluginExtensionNavigation,
  PluginExtensionPoint,
  PluginExtensionPanel,
  PluginExtensionProvider,
  PluginExtensionRoute,
} from "../../plugin-types";
import {
  usePathMatchComponent,
  usePathMatchProject,
  usePathMatchOrg,
  // useComponentType,
} from "@open-choreo/choreo-context";
import { usePluginRegistry } from "../../Providers";
// import { useMatch, useParams } from "react-router";

// Helper to get current context
function GetCurrentContext() {
  const componentMatch = usePathMatchComponent();
  const projectMatch = usePathMatchProject();
  const orgMatch = usePathMatchOrg();
  // const componentType = useComponentType();

  if (componentMatch) return "component";
  if (projectMatch) return "project";
  if (orgMatch) return "org";
  return "global";
}

export function useMainNavExtentions(
  extensionPoint: PluginExtensionPoint,
  rootPath: string
) {
  const pluginRegistry = usePluginRegistry();
  const context = GetCurrentContext();
  const navigationEntries: NavItemExpandableSubMenu[] = useMemo(
    () =>
      pluginRegistry.flatMap((plugin) =>
        (
          plugin.extensions.filter(
            (entry) =>
              entry.extensionPoint.id === extensionPoint.id &&
              entry.extensionPoint.type === extensionPoint.type &&
              (!entry.when || entry.when === context)
          ) as PluginExtensionNavigation[]
        ).map(
          (entry) =>
            ({
              title: entry.name,
              id: entry.name,
              icon: <entry.icon />,
              selectedIcon: <entry.iconSelected />,
              href: rootPath + entry.path,
              pathPattern: entry.pathPattern,
              subMenuItems: entry.submenu?.map((submenu) => ({
                title: submenu.name,
                id: submenu.name,
                icon: <submenu.icon />,
                selectedIcon: <submenu.iconSelected />,
                href: rootPath + entry.path + submenu.path,
                pathPattern: submenu.pathPattern,
              })),
            } as NavItemExpandableSubMenu)
        )
      ),
    [pluginRegistry, extensionPoint, rootPath, context]
  );

  return navigationEntries;
}

export function useExtentions(extensionPoint: PluginExtensionPoint) {
  const extentionPointType = extensionPoint.type;
  const pluginRegistry = usePluginRegistry();
  const context = GetCurrentContext();

  // Move all useMemo calls outside of the switch statement to avoid conditional hooks
  const filteredExtensions = useMemo(
    () =>
      pluginRegistry.flatMap((plugin) =>
        plugin.extensions.filter(
          (entry) =>
            entry.extensionPoint.id === extensionPoint.id &&
            entry.extensionPoint.type === extensionPoint.type &&
            (!entry.when || entry.when === context)
        )
      ),
    [pluginRegistry, extensionPoint, context]
  );

  switch (extentionPointType) {
    case "panel":
      return filteredExtensions as PluginExtensionPanel[];
    case "provider":
      return filteredExtensions as PluginExtensionProvider[];
    case "route":
      return filteredExtensions as PluginExtensionRoute[];
    default:
      throw new Error(`Unknown extension point type: ${extentionPointType}`);
  }
}
