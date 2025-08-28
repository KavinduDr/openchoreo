import { Box, BoxProps, styled } from "@mui/material";
import { ComponentType } from "react";


export interface StyledOxygenUiProps {
  disabled?: boolean;
}

export const StyledOxygenUi: ComponentType<StyledOxygenUiProps & BoxProps> = styled(Box)<BoxProps & StyledOxygenUiProps>(({ disabled, theme }) => ({
  opacity: disabled ? 0.5 : 1,
  cursor: disabled ? 'not-allowed' : 'pointer',
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

