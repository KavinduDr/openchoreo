import { Box, BoxProps, styled } from "@mui/material";
import { ComponentType } from "react";


export interface StyledAvatarOxygenProps {
  disabled?: boolean;
}

export const StyledAvatarOxygen: ComponentType<StyledAvatarOxygenProps & BoxProps> = styled(Box)<BoxProps & StyledAvatarOxygenProps>(({ disabled, theme }) => ({
  opacity: disabled ? 0.5 : 1,
  cursor: disabled ? 'not-allowed' : 'pointer',
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

