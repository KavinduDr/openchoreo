import React from 'react';
// import { StyledTableOxygen } from './TableOxygen.styled';
import { Table } from '@oxygen-ui/react';

export interface TableOxygenProps {
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
 * TableOxygen component
 * @component
 */
export const TableOxygen = React.forwardRef<HTMLDivElement, TableOxygenProps>(
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
      <Table
        ref={ref as React.Ref<HTMLTableElement>}
        className={className}
        onClick={handleClick as React.MouseEventHandler<HTMLTableElement>}
        {...props}
      >
        {children}
      </Table>
    );
  }
);

TableOxygen.displayName = 'TableOxygen';
