import { Box } from "@open-choreo/design-system";
import { MainLayout as BaseMainLayout } from "@open-choreo/common-views";
import { useMemo, useCallback } from "react";
import { matchPath, useLocation } from "react-router";
import {
  PanelExtensionMounter,
  coreExtensionPoints,
  useComponentHandle,
  useHomePath,
  useMainNavExtentions,
  useOrgHandle,
  useProjectHandle,
} from "@open-choreo/plugin-core";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

// Extracted components for better organization and performance
const LayoutHeader = React.memo(() => (
  <Box
    display="flex"
    flexDirection="row"
    justifyContent="space-between"
    alignItems="center"
    width="100%"
  >
    <PanelExtensionMounter extentionPoint={coreExtensionPoints.headerLeft} />
    <PanelExtensionMounter extentionPoint={coreExtensionPoints.headerRight} />
  </Box>
));

const LayoutFooter = React.memo(() => 
<Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" width="100%">
  <PanelExtensionMounter extentionPoint={coreExtensionPoints.footer} />
  </Box>);

const LayoutRightSidebar = React.memo(() => (
  <PanelExtensionMounter extentionPoint={coreExtensionPoints.sidebarRight} />
));

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const homePath = useHomePath();
  const orgHandle = useOrgHandle();

  const navigationEntriesProject = useMainNavExtentions(coreExtensionPoints.projectNavigation, homePath);
  const navigationEntriesComponent = useMainNavExtentions(coreExtensionPoints.componentNavigation, homePath);
  const navigationEntriesOrg = useMainNavExtentions(coreExtensionPoints.orgNavigation, homePath);
  const projectHandle = useProjectHandle();
  const componentHandle = useComponentHandle();


  const navigationEntries = useMemo(() => {
    if (componentHandle) {
      return navigationEntriesComponent;
    } else if (projectHandle) {
      return navigationEntriesProject;
    } else if (orgHandle) {
      return navigationEntriesOrg;
    }
    return [];
  }, [componentHandle, projectHandle, orgHandle, navigationEntriesComponent, navigationEntriesProject, navigationEntriesOrg]);




  // Memoize the processed menu items to prevent unnecessary re-computations
  const processedMenuItems = useMemo(() => {
    if (!orgHandle || !navigationEntries?.length) {
      return [];
    }
    return navigationEntries.map(mainEntry => ({
      ...mainEntry,
      href: typeof mainEntry.href === 'string' ? mainEntry.href : undefined,
      subMenuItems: mainEntry?.subMenuItems?.map(subEntry => ({
        ...subEntry,
        href: typeof subEntry.href === 'string' ? subEntry.href : undefined,
      }))
    }));
  }, [orgHandle, navigationEntries, homePath]);

  const selectedMenuItem = useMemo(() => {
    if (!navigationEntries?.length) {
      return "";
    }

    // First, check for submenu matches
    for (const entry of navigationEntries) {
      if (entry.subMenuItems?.length) {
        const matchingSubmenu = entry.subMenuItems.find(submenu =>
          matchPath(submenu.pathPattern, location.pathname)
        );
        if (matchingSubmenu) {
          return matchingSubmenu.id;
        }
      }
    }

    // Then check for main menu matches
    const matchingEntry = navigationEntries.find(entry =>
      matchPath(entry.pathPattern, location.pathname)
    );

    return matchingEntry?.id ?? "";
  }, [location.pathname, navigationEntries]);

  // Memoize the menu item click handler
  const handleMenuItemClick = useCallback((_menuId: string) => {
    // This function can be extended with additional logic if needed
    // For now, it's just a placeholder since the BaseMainLayout handles the selection
  }, []);

  return (
    <BaseMainLayout
      footer={<LayoutFooter />}
      header={<LayoutHeader />}
      menuItems={processedMenuItems}
      rightSidebar={<LayoutRightSidebar />}
      selectedMenuItem={selectedMenuItem}
      onMenuItemClick={handleMenuItemClick}
    >
      {children}
    </BaseMainLayout>
  );
}
