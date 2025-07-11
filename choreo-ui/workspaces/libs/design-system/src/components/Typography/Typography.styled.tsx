import { Typography, TypographyProps, styled } from '@mui/material';
import { ComponentType } from 'react';

export interface StyledTypographyProps {
  monospace?: boolean;
}

export const StyledTypography: ComponentType<
  StyledTypographyProps & TypographyProps
> = styled(Typography)<TypographyProps & StyledTypographyProps>(
  ({ monospace }) => ({
    fontFamily: monospace ? 'monospace' : "'Gilmer'",
  })
);
