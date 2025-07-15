import {
  useChoreoTheme,
  Box,
  NavItemExpandableSubMenu,
  ImageChoreo,
} from '@open-choreo/design-system';
import React, { useState } from 'react';
import { Header, Sidebar, ContentArea, Footer } from './components';

export interface MainLayoutProps {
  children?: React.ReactNode;
  rightSidebar?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  testId?: string;
  menuItems?: NavItemExpandableSubMenu[];
  selectedMenuItem?: string;
  onMenuItemClick: (menu: string) => void;
}

export const MainLayout = React.forwardRef<HTMLDivElement, MainLayoutProps>(
  (
    {
      children,
      className,
      header,
      rightSidebar,
      footer,
      menuItems,
      selectedMenuItem,
      onMenuItemClick,
    },
    ref
  ) => {
    const theme = useChoreoTheme();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
      <Box
        ref={ref}
        className={className}
        display="flex"
        flexDirection="column"
        height="100vh"
        width="100%"
        backgroundColor={theme.pallet.background.default}
      >
        <Header
          isSidebarOpen={isSidebarOpen}
          onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <ImageChoreo height={30} width={140} />
          {header}
        </Header>
        <Box flexGrow={1} flexDirection="row" display="flex" overflow="hidden">
          {menuItems && (
            <Sidebar
              menuItems={menuItems}
              selectedMenuItem={selectedMenuItem}
              onMenuItemClick={onMenuItemClick}
              isSidebarOpen={isSidebarOpen}
            />
          )}
          <Box flexGrow={1} flexDirection="column" display="flex">
            <ContentArea rightSidebar={rightSidebar}>{children}</ContentArea>
            <Footer>{footer}</Footer>
          </Box>
        </Box>
      </Box>
    );
  }
);

MainLayout.displayName = 'MainLayout';
