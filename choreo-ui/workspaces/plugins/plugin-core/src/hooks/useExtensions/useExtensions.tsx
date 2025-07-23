import { NavItemExpandableSubMenu } from "@open-choreo/design-system";
import React, { useMemo } from "react";
import {
  PluginExtensionNavigation,
  PluginExtensionPoint,
  PluginExtensionPanel,
  PluginExtensionProvider,
  PluginExtensionRoute,
  PathsPatterns,
} from "../../plugin-types";
import { usePluginRegistry } from "../../Providers";
import { useMatch, useParams } from "react-router";

export function useMainNavExtentions(
  extensionPoint: PluginExtensionPoint,
  rootPath: string,
) {
  const pluginRegistry = usePluginRegistry();
  const navigationEntries: NavItemExpandableSubMenu[] = useMemo(
    () =>
      pluginRegistry.flatMap((plugin) =>
        (
          plugin.extensions.filter(
            (entry) =>
              entry.extensionPoint.id === extensionPoint.id &&
              entry.extensionPoint.type === extensionPoint.type,
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
            }) as NavItemExpandableSubMenu,
        ),
      ),
    [pluginRegistry, extensionPoint, rootPath],
  );

  return navigationEntries;
}

function PanelExtentions(extensionPoint: PluginExtensionPoint) {
  const pluginRegistry = usePluginRegistry();
  const entries: PluginExtensionPanel[] = useMemo(
    () =>
      pluginRegistry.flatMap(
        (plugin) =>
          plugin.extensions.filter(
            (entry) =>
              entry.extensionPoint.id === extensionPoint.id &&
              entry.extensionPoint.type === extensionPoint.type,
          ) as PluginExtensionPanel[],
      ),
    [pluginRegistry, extensionPoint],
  );
  return entries;
}

function ProviderExtentions(extensionPoint: PluginExtensionPoint) {
  const pluginRegistry = usePluginRegistry();
  const entries: PluginExtensionProvider[] = useMemo(
    () =>
      pluginRegistry.flatMap(
        (plugin) =>
          plugin.extensions.filter(
            (entry) =>
              entry.extensionPoint.id === extensionPoint.id &&
              entry.extensionPoint.type === extensionPoint.type,
          ) as PluginExtensionProvider[],
      ),
    [pluginRegistry, extensionPoint],
  );
  return entries;
}

function RouteExtentions(extensionPoint: PluginExtensionPoint) {
  const pluginRegistry = usePluginRegistry();
  return useMemo(() => {
    return pluginRegistry.flatMap(
      (plugin) =>
        plugin.extensions.filter(
          (entry) =>
            entry.extensionPoint.id === extensionPoint.id &&
            entry.extensionPoint.type === extensionPoint.type,
        ) as PluginExtensionRoute[],
    );
  }, [pluginRegistry, extensionPoint]);
}

export function useUrlParams() {
  return useParams<{
    orgHandle: string;
    projectHandle: string;
    componentHandle: string;
    page: string;
    subPage: string;
  }>();
}

export function usePathMatchOrg() {
  return useMatch(PathsPatterns.ORG_LEVEL);
}

export function useOrgHandle() {
  const match = usePathMatchOrg();
  return match?.params?.orgHandle;
}

export function useProjectHandle() {
  const match = usePathMatchProject();
  return match?.params?.projectHandle;
}

export function useComponentHandle() {
  const match = usePathMatchComponent();
  return match?.params?.componentHandle;
}

export function usePathMatchProject() {
  return useMatch(PathsPatterns.PROJECT_LEVEL);
}

export function usePathMatchComponent() {
  return useMatch(PathsPatterns.COMPONENT_LEVEL);
}

export function useHomePath() {
  const orgMatch = usePathMatchOrg();
  const projectMatch = usePathMatchProject();
  const componentMatch = usePathMatchComponent();
  return useMemo(() => {
    if (componentMatch?.params) {
      const { orgHandle, projectHandle, componentHandle } =
        componentMatch.params;
      return `/organization/${orgHandle}/project/${projectHandle}/component/${componentHandle}`;
    }
    if (projectMatch?.params) {
      const { orgHandle, projectHandle } = projectMatch.params;
      return `/organization/${orgHandle}/project/${projectHandle}`;
    }
    if (orgMatch?.params) {
      const { orgHandle } = orgMatch.params;
      return `/organization/${orgHandle}`;
    }
    return `/`;
  }, [orgMatch, projectMatch, componentMatch]);
}

export function useExtentions(extensionPoint: PluginExtensionPoint) {
  const extentionPointType = extensionPoint.type;
  switch (extentionPointType) {
    case "panel":
      return PanelExtentions(extensionPoint);
    case "provider":
      return ProviderExtentions(extensionPoint);
    case "route":
      return RouteExtentions(extensionPoint);
    default:
      throw new Error(`Unknown extension point type: ${extentionPointType}`);
  }
}
