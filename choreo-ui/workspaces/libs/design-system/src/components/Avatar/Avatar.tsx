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
  testId?: string;
  ref?: React.RefObject<HTMLDivElement>;
}

export function Avatar({ children, ...props }: AvatarProps) {
  return <StyledAvatar {...props}>{children}</StyledAvatar>;
}

Avatar.displayName = 'Avatar';
