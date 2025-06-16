import React from 'react';
import { StyledNavItem } from './NavItem.styled';
import { Box, Typography } from '@mui/material';
import { useChoreoTheme } from '@design-system/theme';

export interface NavItemProps {
  /** The content to be rendered within the component */
  title?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** The icon to be rendered within the component */
  icon?: React.ReactNode;
  /** The icon to be rendered within the component when selected */
  selectedIcon?: React.ReactNode;
  /** The icon to be rendered within the component when disabled */
  disabledIcon?: React.ReactNode;
  /** The icon to be rendered within the component when hovered */
  hoverIcon?: React.ReactNode;
  /** Whether the component is selected */
  isSelected?: boolean;
  /** Whether the component is expanded */
  isExpanded?: boolean;
}

/**
 * NavItem component
 * @component
 */
export const NavItem = React.forwardRef<HTMLDivElement, NavItemProps>(
  (
    {
      className,
      onClick,
      disabled = false,
      title,
      icon,
      selectedIcon,
      disabledIcon,
      hoverIcon,
      isSelected,
      isExpanded,
      ...props
    },
    ref
  ) => {
    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (!disabled && onClick) {
          onClick(event);
        }
      },
      [disabled, onClick]
    );
    const theme = useChoreoTheme();
    return (
      <StyledNavItem
        disabled={disabled}
        onClick={handleClick}
        {...props}
        isSelected={isSelected}
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap={theme.spacing(1)}
          width={isExpanded ? '100%' : 'auto'}
        >
          <Typography variant="body1">
            {isSelected ? selectedIcon : icon}
          </Typography>
          {isExpanded && <Typography variant="body1">{title}</Typography>}
        </Box>
      </StyledNavItem>
    );
  }
);

NavItem.displayName = 'NavItem';
