import { styled, Tooltip, TooltipProps } from '@mui/material';
import React from 'react';

export interface StyledTooltipProps extends TooltipProps {
  disabled?: boolean;
}

const StyledTooltipBase = styled(Tooltip, {
  shouldForwardProp: (prop) => !['disabled'].includes(prop as string),
})<StyledTooltipProps>(({ theme }) => ({
  '& .MuiTooltip-tooltip': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    fontSize: theme.typography.body2.fontSize,
    fontFamily: theme.typography.fontFamily,
  },
  '.divider': {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.grey[100],
  },
  '.buttonLink': {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    marginTop: theme.spacing(1.5),
    textDecoration: 'none',
  },
  '.dividerDark': {
    backgroundColor: theme.palette.grey[500],
  },
  '.exampleContent': {
    fontWeight: 100,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  '.exampleContentDark': {
    color: theme.palette.grey[100],
  },
  '.exampleContentLight': {
    color: theme.palette.secondary.dark,
  },
}));

export const StyledTooltip = React.forwardRef<HTMLDivElement, StyledTooltipProps>(
  (props, ref) => <StyledTooltipBase {...props} ref={ref} />
);

StyledTooltip.displayName = 'StyledTooltip';
