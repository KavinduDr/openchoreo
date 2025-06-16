import { alpha, Box, BoxProps, styled } from '@mui/material';
import { ComponentType } from 'react';

export interface StyledNavItemProps {
  disabled?: boolean;
  isSelected?: boolean;
}

export const StyledNavItem: ComponentType<StyledNavItemProps & BoxProps> =
  styled(Box)<BoxProps & StyledNavItemProps>(
    ({ disabled, theme, isSelected }) => ({
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      backgroundColor: isSelected
        ? alpha(theme.palette.common.white, 0.2)
        : 'transparent',
      padding: theme.spacing(1.5, 1.875),
      borderRadius: theme.spacing(0.5125),
      color: theme.palette.common.white,
      transition: theme.transitions.create(['background-color'], {
        duration: theme.transitions.duration.short,
      }),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.3),
      },
    })
  );
