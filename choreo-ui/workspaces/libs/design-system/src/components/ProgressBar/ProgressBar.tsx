import React from 'react';
import { StyledProgressBar } from './ProgressBar.styled';

export type ProgressBarVariant =
  | 'determinate'
  | 'indeterminate'
  | 'buffer'
  | 'query';

export type ProgressBarColor = 'primary' | 'secondary' | 'inherit';

export type ProgressBarHeight = 'small' | 'medium' | 'large';

export interface ProgressBarProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
  disabled?: boolean;
  variant?: ProgressBarVariant;
  color?: ProgressBarColor;
  value?: number;
  valueBuffer?: number;
  height?: ProgressBarHeight;
  sx?: React.CSSProperties;
  [key: string]: any;
}

/**
 * ProgressBar component
 * @component
 */
export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      children,
      className,
      onClick,
      height = 'small',
      color = 'primary',
      variant = 'indeterminate',
      disabled = false,
      ...props
    },
    ref
  ) => {
    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (!disabled && onClick) {
          onClick(event);
        }
      },
      [disabled, onClick]
    );

    return (
      <StyledProgressBar
        ref={ref}
        className={className}
        color={color}
        variant={variant}
        onClick={handleClick}
        disabled={disabled}
        height={height}
        {...props}
      />
    );
  }
);

ProgressBar.displayName = 'ProgressBar';
