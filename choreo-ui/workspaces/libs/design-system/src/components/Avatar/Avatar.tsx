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
  color?: colorVariant;
  /**
   * Optional click handler
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
  variant?: avatarVariant;
  /**
   * The sx prop for custom styles
   */
  sx?: React.CSSProperties;
  /**
   * Additional props for MUI Avatar
   */
  [key: string]: any;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ children, ...props }, ref) => {
    return (
      <StyledAvatar ref={ref} {...props}>
        {children}
      </StyledAvatar>
    );
  }
);

Avatar.displayName = 'Avatar';
