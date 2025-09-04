import { Box, BoxProps, styled } from "@mui/material";
import { ComponentType } from "react";


export interface StyledTableOxygenProps {
  disabled?: boolean;
}

export const StyledTableOxygen: ComponentType<StyledTableOxygenProps & BoxProps> = styled(Box)<BoxProps & StyledTableOxygenProps>(({ disabled, theme }) => ({
  opacity: disabled ? 0.5 : 1,
  cursor: disabled ? 'not-allowed' : 'pointer',
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

