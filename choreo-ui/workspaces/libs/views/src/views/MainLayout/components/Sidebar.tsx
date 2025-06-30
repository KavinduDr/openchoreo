import {
  useChoreoTheme,
  useMediaQuery,
  Box,
  MenuExpandIcon,
  MenuCollapseIcon,
  NavItemExpandableSubMenu,
} from '@open-choreo/design-system';
import React, { useState } from 'react';
import { MenuItem } from './MenuItem';
import { debounce } from 'lodash';

export interface SidebarProps {
  menuItems?: NavItemExpandableSubMenu[];
  selectedMenuItem?: string;
  onMenuItemClick: (menuItem: string) => void;
  isSidebarOpen?: boolean;
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ menuItems, selectedMenuItem, onMenuItemClick, isSidebarOpen }, ref) => {
    const theme = useChoreoTheme();
    const isMobile = useMediaQuery('md', 'down');
    const [isExpanded, setIsExpanded] = useState(false);
    const [isExpandSaved, setIsExpandSaved] = useState(false);
    const isFullWidth = isExpanded || isExpandSaved;
    const handleExpandWithDebouce = debounce((state: boolean) => {
      setIsExpanded(state);
    }, 300);
    return (
      <Box height="100%" display="flex" position="relative" ref={ref}>
        {(isMobile || !isExpandSaved) && <Box width={theme.spacing(8)} />}
        <Box
          backgroundColor={theme.pallet.primary.main}
          position={isMobile || !isExpandSaved ? 'absolute' : 'relative'}
          transition={theme.transitions.create(['display', 'width'], {
            duration: 300,
          })}
          width={
            isMobile && !isSidebarOpen
              ? 0
              : !isFullWidth && !isMobile
                ? theme.spacing(8)
                : theme.spacing(30)
          }
          overflow="hidden"
          height="100%"
          maxWidth={theme.spacing(40)}
          justifyContent="space-between"
          display="flex"
          flexDirection="column"
        >
          <Box
            padding={theme.spacing(0.8)}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="flex-start"
            gap={theme.spacing(0.5)}
            onMouseEnter={() => handleExpandWithDebouce(true)}
            onMouseLeave={() => handleExpandWithDebouce(false)}
          >
            {menuItems?.map((item) => (
              <>
                <MenuItem
                  href={item.href}
                  id={item.id}
                  title={item.title}
                  selectedIcon={item.selectedIcon}
                  icon={item.icon}
                  onClick={(id) => onMenuItemClick(id)}
                  isExpanded={isFullWidth || isMobile}
                  selectedKey={selectedMenuItem}
                  subMenuItems={item.subMenuItems}
                />
              </>
            ))}
          </Box>
          <Box borderTop="small" borderColor={theme.pallet.primary.light}>
            <MenuItem
              id="menu-item-collapse"
              title="Collapse"
              selectedIcon={<MenuCollapseIcon fontSize="inherit" />}
              icon={
                isExpandSaved ? (
                  <MenuCollapseIcon fontSize="inherit" />
                ) : (
                  <MenuExpandIcon fontSize="inherit" />
                )
              }
              onClick={() => setIsExpandSaved(!isExpandSaved)}
              isExpanded={isFullWidth}
            />
          </Box>
        </Box>
      </Box>
    );
  }
);

Sidebar.displayName = 'Sidebar';
