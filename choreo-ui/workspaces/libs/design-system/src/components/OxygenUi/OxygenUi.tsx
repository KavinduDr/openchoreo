import React from 'react';
import { Button } from '@oxygen-ui/react';

export interface OxygenUiProps {
  /** The content to be rendered within the component */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Whether the component is disabled */
  disabled?: boolean;
}

/**
 * OxygenUi component
 * @component
 */
export const OxygenUi = React.forwardRef<HTMLButtonElement, OxygenUiProps>(
  ({ children, className, onClick, disabled = false, ...props }, ref) => {
    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!disabled && onClick) {
          onClick(event);
        }
      },
      [disabled, onClick]
    );

    return (
      <Button
        ref={ref}
        className={className}
        onClick={handleClick}
        disabled={disabled}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

OxygenUi.displayName = 'OxygenUi';
