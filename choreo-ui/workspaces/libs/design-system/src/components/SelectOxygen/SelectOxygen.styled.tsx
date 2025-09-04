import { Box, BoxProps, styled } from "@mui/material";
import { ComponentType } from "react";


export interface StyledSelectOxygenProps {
  disabled?: boolean;
}

export const StyledSelectOxygen: ComponentType<StyledSelectOxygenProps & BoxProps> = styled(Box)<BoxProps & StyledSelectOxygenProps>(({ disabled, theme }) => ({
  opacity: disabled ? 0.5 : 1,
  cursor: disabled ? 'not-allowed' : 'pointer',
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

