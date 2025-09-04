import { ComponentType } from 'react';
import { Box, BoxProps, styled } from '@mui/material';

export interface StyledBoxOxygenProps {
  disabled?: boolean;
}

export const StyledBoxOxygen: ComponentType<StyledBoxOxygenProps & BoxProps> =
  styled(Box)<BoxProps & StyledBoxOxygenProps>(({ disabled, theme }) => ({
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  }));
