import React from 'react';
import { StyledButtonGroup } from './ButtonGroup.styled';

export type colorVariant = 'primary' | 'secondary';
export type buttonVariant = 'outlined' | 'contained';
export type sizeVariant = 'tiny' | 'small' | 'medium';

export interface ButtonGroupProps {
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
  disabled?: boolean;
  testId: string;
  color?: colorVariant;
  variant?: buttonVariant;
  size?: sizeVariant;
}

/**
 * ButtonGroup component
 * @component
 */
export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    { className, onClick, disabled = false, size = 'medium', ...props },
    ref
  ) => {
    return (
      <StyledButtonGroup
        ref={ref}
        className={className}
        disabled={disabled}
        size={size === 'tiny' ? 'small' : size}
        data-color={props.color}
        data-variant={props.variant}
        data-contained={props.variant === 'contained'}
        data-contained-primary={
          props.variant === 'contained' && props.color === 'primary'
        }
        data-contained-secondary={
          props.variant === 'contained' && props.color === 'secondary'
        }
        data-size={size}
        data-cyid={`${props.testId}-button-group`}
        {...props}
      />
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';
