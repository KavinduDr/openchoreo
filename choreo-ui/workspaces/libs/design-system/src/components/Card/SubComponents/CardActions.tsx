import React from 'react';
import {
  CardActions as MuiCardActions,
  styled,
  SxProps,
  Theme,
} from '@mui/material';

interface CardActionsProps {
  children: React.ReactNode;
  testId: string;
  noBorder?: boolean;
  sx?: SxProps<Theme>;
}

const StyledCardActions = styled(MuiCardActions)<{ noBorder?: boolean }>(({ theme, noBorder }) => ({
  padding: theme.spacing(1),
  '&:last-child': {
    paddingBottom: theme.spacing(1),
  },
  display: 'flex',
  gap: theme.spacing(1),
  paddingTop: theme.spacing(3),
  borderTop: noBorder ? 'none' : `1px solid ${theme.palette.grey[100]}`,
}));

export const CardActions = ({
  children,
  testId,
  sx,
  noBorder,
  ...rest
}: CardActionsProps) => (
  <StyledCardActions data-cyid={`${testId}-card-actions`} sx={sx} noBorder={noBorder} {...rest}>
    {children}
  </StyledCardActions>
);
