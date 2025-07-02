import React from 'react';
import { StyledIconButton } from './IconButton.styled';
import { useTheme } from '@mui/material/styles';

export type iconButtonColorVariant =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'success';
export type iconButtonSizeVariant = 'tiny' | 'small' | 'medium';
export type edgeVariant = 'start' | 'end' | false;
export type variant = 'contained' | 'subtle' | 'outlined' | 'text' | 'link';

export interface IconButtonProps {
  testId: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
  disabled?: boolean;
  edge?: edgeVariant;
  variant?: variant;
  rounded?: boolean;
  color?: iconButtonColorVariant;
  size?: iconButtonSizeVariant;
  isActive?: boolean;
  isInactive?: boolean;
  disableRipple?: boolean;
  disableFocusRipple?: boolean;
  disableTouchRipple?: boolean;
  sx?: React.CSSProperties;
  [key: string]: any;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, variant = 'contained', color = 'primary', ...props }, ref) => (
    <StyledIconButton
      ref={ref}
      theme={useTheme()}
      data-cyid={`${props.testId}-icon-button`}
      data-icon-button-variant={variant}
      data-icon-button-rounded={props.rounded}
      data-icon-button-active={props.isActive}
      data-icon-button-inactive={props.isInactive}
      data-icon-button-color={color}
      data-icon-button-primaryContained={
        variant === 'contained' && color === 'primary'
      }
      data-icon-button-primaryText={variant === 'text' && color === 'primary'}
      data-icon-button-primaryOutlined={
        variant === 'outlined' && color === 'primary'
      }
      data-icon-button-primarySubtle={
        variant === 'subtle' && color === 'primary'
      }
      data-icon-button-primaryLink={variant === 'link' && color === 'primary'}
      data-icon-button-secondaryContained={
        variant === 'contained' && color === 'secondary'
      }
      data-icon-button-secondaryText={
        variant === 'text' && color === 'secondary'
      }
      data-icon-button-secondaryOutlined={
        variant === 'outlined' && color === 'secondary'
      }
      data-icon-button-secondarySubtle={
        variant === 'subtle' && color === 'secondary'
      }
      data-icon-button-secondaryLink={
        variant === 'link' && color === 'secondary'
      }
      data-icon-button-errorContained={
        variant === 'contained' && color === 'error'
      }
      data-icon-button-errorText={variant === 'text' && color === 'error'}
      data-icon-button-errorOutlined={
        variant === 'outlined' && color === 'error'
      }
      data-icon-button-errorSubtle={variant === 'subtle' && color === 'error'}
      data-icon-button-errorLink={variant === 'link' && color === 'error'}
      data-icon-button-successContained={
        variant === 'contained' && color === 'success'
      }
      data-icon-button-successText={variant === 'text' && color === 'success'}
      data-icon-button-successOutlined={
        variant === 'outlined' && color === 'success'
      }
      data-icon-button-successSubtle={
        variant === 'subtle' && color === 'success'
      }
      data-icon-button-successLink={variant === 'link' && color === 'success'}
      data-icon-button-warningContained={
        variant === 'contained' && color === 'warning'
      }
      data-icon-button-warningText={variant === 'text' && color === 'warning'}
      data-icon-button-warningOutlined={
        variant === 'outlined' && color === 'warning'
      }
      data-icon-button-warningSubtle={
        variant === 'subtle' && color === 'warning'
      }
      data-icon-button-warningLink={variant === 'link' && color === 'warning'}
      onClick={props.disabled ? undefined : props.onClick}
      disabled={props.disabled}
      {...props}
    >
      {children}
    </StyledIconButton>
  )
);

IconButton.displayName = 'IconButton';
