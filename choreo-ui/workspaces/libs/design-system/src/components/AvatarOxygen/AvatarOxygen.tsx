import React from 'react';
import { Avatar } from '@oxygen-ui/react';
// import { StyledAvatar } from './Avatar.styled';

export type colorVariantOxygenAvatar =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';
export type avatarVariantOxygenAvatar = 'circular' | 'rounded' | 'square';
export type avatarBackgroundColorVariantOxygenAvatar =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';

export interface AvatarOxygenProps {
  /**
   * The content of the component
   */
  children?: React.ReactNode;
  /**
   * Additional className for the component
   */
  className?: string;
  /**
   * color variant of the avatar
   */
  color?: colorVariantOxygenAvatar;
  /**
   * Optional click handler if needed
   */
  onClick?: (event: React.MouseEvent) => void;
  /**
   * If true, the component will be disabled
   */
  disabled?: boolean;
  /**
   * width of the avatar
   */
  width?: string | number;
  /**
   * height of the avatar
   * */
  height?: string | number;
  /**
   * The variant of the component
   */
  variant?: avatarVariantOxygenAvatar;
  /**
   * The sx prop for custom styles
   */
  sx?: React.CSSProperties;
  /**
   * The testId for the component
   */
  testId?: string;
  /**
   * The ref for the component
   */
  ref?: React.RefObject<HTMLDivElement>;
}

export function AvatarOxygen({ children, ...props }: AvatarOxygenProps) {
  return <Avatar {...props}>{children}</Avatar>;
}

AvatarOxygen.displayName = 'AvatarOxygen';
