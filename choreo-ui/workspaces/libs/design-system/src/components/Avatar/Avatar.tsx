import React from 'react';
import { StyledAvatar } from './Avatar.styled';

export type colorVariant =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';
export type avatarVariant = 'circular' | 'rounded' | 'square';
export type avatarBackgroundColorVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';

export type sizeVariant = 'small' | 'medium' | 'large' | 'extraLarge';

export interface AvatarProps {
  children?: React.ReactNode;
  className?: string;
  color?: colorVariant;
  onClick?: (event: React.MouseEvent) => void;
  disabled?: boolean;
  width?: string | number;
  height?: string | number;
  variant?: avatarVariant;
  sx?: React.CSSProperties;
  [key: string]: any;
  size: sizeVariant;
  testId: string;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ children, ...props }, ref) => {
    return (
      <StyledAvatar ref={ref} {...props} data-size={props.size}>
        {children}
      </StyledAvatar>
    );
  }
);

Avatar.displayName = 'Avatar';
