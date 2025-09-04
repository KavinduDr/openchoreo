import { Box, BoxProps, styled } from "@mui/material";
import { ComponentType } from "react";


export interface StyledGridOxygenProps {
  disabled?: boolean;
}

export const StyledGridOxygen: ComponentType<StyledGridOxygenProps & BoxProps> = styled(Box)<BoxProps & StyledGridOxygenProps>(({ disabled, theme }) => ({
  opacity: disabled ? 0.5 : 1,
  cursor: disabled ? 'not-allowed' : 'pointer',
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

