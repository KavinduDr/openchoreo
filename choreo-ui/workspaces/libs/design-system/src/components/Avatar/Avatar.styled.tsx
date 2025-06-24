import { Avatar as MUIAvatar, styled } from '@mui/material';
import { ComponentType } from 'react';

export type colorVariant =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';
export type avatarVariant = 'circular' | 'rounded';
export type avatarBackgroundColorVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';

export type avatarSizeVariant = 'small' | 'medium' | 'large' | 'extraLarge';

export interface AvatarProps {
  children?: React.ReactNode;
  testId: string;
  className?: string;
  color?: colorVariant;
  onClick?: (event: React.MouseEvent) => void;
  disabled?: boolean;
  width?: string | number;
  height?: string | number;
  size?: avatarSizeVariant;
  variant?: avatarVariant;
  sx?: React.CSSProperties;
  [key: string]: any;
}

export const StyledAvatar: ComponentType<AvatarProps> = styled(
  MUIAvatar
)<AvatarProps>(({
  theme,
  variant = 'circular',
  color = 'primary',
  disabled = false,
  height,
  width,
  size,
}) => {
  const getBorderRadius = () => {
    switch (variant) {
      case 'circular':
        return '50%';
      case 'rounded':
        return '8px';
      default:
        return '50%';
    }
  };
  const getBackgroundColor = () => {
    switch (color) {
      case 'primary':
        return theme.palette.primary.main;
      case 'secondary':
        return theme.palette.secondary.light;
      case 'error':
        return theme.palette.error.main;
      case 'warning':
        return theme.palette.warning.main;
      case 'info':
        return theme.palette.info.main;
      case 'success':
        return theme.palette.success.main;
      default:
        return theme.palette.primary.main;
    }
  };
  const getColor = () => {
    switch (color) {
      case 'primary':
        return theme.palette.primary.contrastText;
      case 'secondary':
        return theme.palette.primary.dark;
      case 'error':
        return theme.palette.error.contrastText;
      case 'warning':
        return theme.palette.warning.contrastText;
      case 'info':
        return theme.palette.info.contrastText;
      case 'success':
        return theme.palette.success.contrastText;
      default:
        return theme.palette.primary.contrastText;
    }
  };
  const getSize = () => {
    switch (size) {
      case 'small':
        return {
          width: theme.spacing(2.5),
          height: theme.spacing(2.5),
          fontSize: theme.typography.h6.fontSize,
          fontWeight: theme.typography.h6.fontWeight,
          lineHeight: 1,
          '& svg': {
            fontSize: theme.spacing(1.25),
          },
        };
      case 'medium':
        return {
          width: theme.spacing(4),
          height: theme.spacing(4),
          fontSize: theme.typography.h5.fontSize,
          fontWeight: theme.typography.h5.fontWeight,
          lineHeight: 1,
          '& svg': {
            fontSize: theme.spacing(1.75),
          },
        };
      case 'large':
        return {
          width: theme.spacing(5),
          height: theme.spacing(5),
          fontSize: theme.typography.h4.fontSize,
          fontWeight: theme.typography.h4.fontWeight,
          lineHeight: 1,
          '& svg': {
            fontSize: theme.spacing(2.5),
          },
        };
      case 'extraLarge':
        return {
          width: theme.spacing(10),
          height: theme.spacing(10),
          fontSize: theme.typography.h1.fontSize,
          fontWeight: theme.typography.h1.fontWeight,
          lineHeight: 1,
          '& svg': {
            fontSize: theme.spacing(4),
          },
        };
      default:
        return {
          width: theme.spacing(4),
          height: theme.spacing(4),
          fontSize: theme.typography.h5.fontSize,
          fontWeight: theme.typography.h5.fontWeight,
          lineHeight: 1,
          '& svg': {
            fontSize: theme.spacing(1.75),
          },
        };
    }
  };
  const sizeStyles = getSize();

  return {
    borderRadius: getBorderRadius(),
    backgroundColor: getBackgroundColor(),
    opacity: disabled ? 0.5 : 1,
    color: getColor(),
    cursor: disabled ? 'not-allowed' : 'pointer',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...sizeStyles,
    ...(width && { width }),
    ...(height && { height }),
  };
});
