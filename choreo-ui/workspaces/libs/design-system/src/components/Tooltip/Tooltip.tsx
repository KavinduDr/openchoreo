import React from 'react';
import { StyledTooltip } from './Tooltip.styled';

export type tooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export interface TooltipProps {
  children?: React.ReactElement;
  className?: string;
  arrow?: boolean;
  placement?: tooltipPlacement;
  title?: string;
  disabled?: boolean;
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ children, arrow, placement, title, disabled }, ref) => {
    if (!children) return null;
    return (
      <StyledTooltip
        ref={ref}
        arrow={arrow}
        placement={placement || 'bottom'}
        title={title}
        disabled={disabled}
      >
        {children}
      </StyledTooltip>
    );
  }
);

Tooltip.displayName = 'Tooltip';
