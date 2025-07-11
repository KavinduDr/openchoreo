import React from 'react';
import { StyledTooltip } from './Tooltip.styled';
import { Box, Divider, Link, Typography } from '@mui/material';

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
  /**
   * The content of the component
   */
  children?: React.ReactNode;
  /**
   * Additional className for the component
   */
  className?: string;
  /**
   * arrow to the tooltip
   */
  arrow?: boolean;
  /**
   * placement of the tooltip
   */
  placement?: tooltipPlacement;
  /**
   * title of the tooltip
   */
  title?: React.ReactNode;
  heading?: string;
  /**
   * Optional click handler
   */
  onClick?: (event: React.MouseEvent) => void;
  /**
   * content of the tooltip
   */
  content?: React.ReactNode;
  /**
   * example to be displayed in the tooltip
   */
  example?: React.ReactNode;
  action?: { link: string; text: string };
  /**
   * sx prop for styling
   */
  sx?: React.CSSProperties;
}

/**
 * Tooltip component
 * @component
 */
export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ children, className, onClick, ...props }, ref) => {
    const { content, example, action, ...styledTooltipProps } = props;

    const infoTooltipFragment = (
      <Box p={0.5}>
        {props.title && (
          <Box mb={props.content ? 1 : 0}>
            <Typography variant="h5">{props.title}</Typography>
          </Box>
        )}
        {props.content && (
          <Box>
            <Typography variant="body2">{props.content}</Typography>
          </Box>
        )}
        {(props.example || props.action) && <Divider className="divider" />}
        {props.example && (
          <Typography variant="body2">Eg: {props.example}</Typography>
        )}
        {props.action && (
          <Link href={props.action.link} target="_blank" rel="noreferrer">
            {props.action.text}
          </Link>
        )}
      </Box>
    );

    if (!children) return null;

    return (
      <StyledTooltip
        ref={ref}
        className={className}
        arrow={styledTooltipProps.arrow}
        placement={styledTooltipProps.placement || 'bottom'}
        title={infoTooltipFragment}
        {...styledTooltipProps}
      >
        {React.isValidElement(children) ? (
          React.cloneElement(children, {
            ...props,
          })
        ) : (
          <span>{children}</span>
        )}
      </StyledTooltip>
    );
  }
);

Tooltip.displayName = 'Tooltip';
