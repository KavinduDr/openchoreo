import React from 'react';
import { StyledIconButton } from './IconButton.styled';
import { useTheme } from '@mui/material/styles';

export type iconButtonVariant = 'circular' | 'rounded' | 'square'; // not anymore in mui v7
export type iconButtonColorVariant =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';
export type iconButtonSizeVariant = 'tiny' | 'small' | 'medium';
export type edgeVariant = 'start' | 'end' | false;

export interface IconButtonProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
  disabled?: boolean;
  edge?: edgeVariant;
  color?: iconButtonColorVariant;
  testId: string;
  variant?: iconButtonVariant;
  size?: iconButtonSizeVariant;
  disableRipple?: boolean;
  disableFocusRipple?: boolean;
  disableTouchRipple?: boolean;
  sx?: React.CSSProperties;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      children,
      disableRipple = true,
      disableFocusRipple = true,
      disableTouchRipple = true,
      size = 'medium',
      ...props
    },
    ref
  ) => (
    <StyledIconButton
      ref={ref}
      theme={useTheme()}
      onClick={props.disabled ? undefined : props.onClick}
      disableRipple={disableRipple}
      disableFocusRipple={disableFocusRipple}
      disableTouchRipple={disableTouchRipple}
      disabled={props.disabled}
      data-size={size}
      {...props}
    >
      {children}
    </StyledIconButton>
  )
);

IconButton.displayName = 'IconButton';
