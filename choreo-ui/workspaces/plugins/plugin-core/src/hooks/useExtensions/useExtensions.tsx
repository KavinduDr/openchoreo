import { useMemo } from "react";
import { NavItemExpandableSubMenu } from "@open-choreo/design-system";
import { useMatch, useParams } from "react-router";
import {
  PluginExtensionNavigation,
  PluginExtensionPoint,
  PluginExtensionPanel,
  PluginExtensionProvider,
  PluginExtensionRoute,
} from "../../plugin-types";
import { PathsPatterns } from "../../plugin-types/paths";
import { useFilteredExtensions } from "../../services";

export function useMainNavExtentions(
  extensionPoint: PluginExtensionPoint,
  rootPath: string,
) {
  const filteredExtensions = useFilteredExtensions(extensionPoint);
  // console.log(filteredExtensions); // isLoading is coming
  const navigationEntries: NavItemExpandableSubMenu[] = useMemo(
    () =>
      (filteredExtensions.extensions as PluginExtensionNavigation[]).map(
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
    [filteredExtensions, rootPath],
  );

  return navigationEntries;
}

function PanelExtentions(extensionPoint: PluginExtensionPoint) {
  const filteredExtensions = useFilteredExtensions(extensionPoint);
  return {
    extensions: filteredExtensions.extensions as PluginExtensionPanel[],
    isLoading: filteredExtensions.isLoading,
    hasData: filteredExtensions.hasData,
  };
}

function ProviderExtentions(extensionPoint: PluginExtensionPoint) {
  const filteredExtensions = useFilteredExtensions(extensionPoint);
  return {
    extensions: filteredExtensions.extensions as PluginExtensionProvider[],
    isLoading: filteredExtensions.isLoading,
    hasData: filteredExtensions.hasData,
  };
}

function RouteExtentions(extensionPoint: PluginExtensionPoint) {
  const filteredExtensions = useFilteredExtensions(extensionPoint);
  return {
    extensions: filteredExtensions.extensions as PluginExtensionRoute[],
    isLoading: filteredExtensions.isLoading,
    hasData: filteredExtensions.hasData,
  };
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
