import React from 'react';
import { StyledChip } from './Chip.styled';
import { SxProps, Theme } from '@mui/material';

export type colorVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';
export type chipVariant = 'filled' | 'outlined';
export type sizeVariant = 'small' | 'medium' | 'large';

export interface ChipProps {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  label?: string;
  color?: colorVariant;
  variant?: chipVariant;
  size?: sizeVariant;
  testId: string;
  sx?: SxProps<Theme>;
  [key: string]: any;
}

/**
 * Chip component
 * @component
 */
export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      children,
      className,
      disabled = false,
      size = 'medium',
      variant = 'filled',
      color = 'default',
      ...props
    },
    ref
  ) => {
    return (
      <StyledChip
        ref={ref}
        {...props}
        size={size}
        variant={variant === 'filled' ? 'filled' : 'outlined'}
        color={color}
        label={props.label}
        className={className}
        disabled={disabled}
        data-cyid={`${props.testId}-chip`}
      >
        {children}
      </StyledChip>
    );
  }
);

Chip.displayName = 'Chip';
