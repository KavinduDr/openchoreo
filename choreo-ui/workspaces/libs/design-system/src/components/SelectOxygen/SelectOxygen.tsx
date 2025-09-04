import React from 'react';
import { StyledSelectOxygen } from './SelectOxygen.styled';

export interface SelectOxygenProps {
  /** The content to be rendered within the component */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** Whether the component is disabled */
  disabled?: boolean;
}

/**
 * SelectOxygen component
 * @component
 */
export const SelectOxygen = React.forwardRef<HTMLDivElement, SelectOxygenProps>(
  ({ children, className, onClick, disabled = false, ...props }, ref) => {
    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (!disabled && onClick) {
          onClick(event);
        }
      },
      [disabled, onClick]
    );

    return (
      <StyledSelectOxygen
        ref={ref}
        className={className}
        onClick={handleClick}
        disabled={disabled}
        {...props}
      >
        {children}
      </StyledSelectOxygen>
    );
  }
);

SelectOxygen.displayName = 'SelectOxygen';
