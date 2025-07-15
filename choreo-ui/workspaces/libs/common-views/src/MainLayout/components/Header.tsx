import {
  useChoreoTheme,
  useMediaQuery,
  Box,
  MenuExpandIcon,
  MenuCollapseIcon,
  IconButton,
} from '@open-choreo/design-system';
import React from 'react';

export interface HeaderProps {
  children?: React.ReactNode;
  isSidebarOpen?: boolean;
  onSidebarToggle?: () => void;
}

export const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ children, isSidebarOpen, onSidebarToggle }, ref) => {
    const theme = useChoreoTheme();
    const isMobile = useMediaQuery('md', 'down');

    return (
      <Box
        ref={ref}
        boxShadow={theme.shadows[1]}
        height={theme.spacing(8)}
        backgroundColor={theme.pallet.background.default}
        display="flex"
        flexDirection="row"
        borderBottom="small"
        alignItems="center"
        borderColor={theme.pallet.grey[200]}
      >
        {isMobile && (
          <IconButton testId="menuOpen" onClick={onSidebarToggle}>
            {isSidebarOpen ? (
              <MenuCollapseIcon fontSize="inherit" />
            ) : (
              <MenuExpandIcon fontSize="inherit" />
            )}
          </IconButton>
        )}
        <Box flexGrow={1} overflow='hidden' display='flex' alignItems='center'>
          {children}
        </Box>
      </Box>
    );
  }
);

Header.displayName = 'Header';
