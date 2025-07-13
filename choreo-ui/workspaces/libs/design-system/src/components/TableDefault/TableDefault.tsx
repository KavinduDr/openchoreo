import React from 'react';
import { StyledTable } from './TableDefault.styled';

export interface TableDefaultProps {
  children?: React.ReactNode;
  className?: string;
  variant: 'dark' | 'default' | 'white';
  testId?: string;
}

export const TableDefault = React.forwardRef<
  HTMLTableElement,
  TableDefaultProps
>(({ children, className, variant = 'default', testId = undefined }, ref) => {
  return (
    <StyledTable
      ref={ref}
      className={className}
      variant={variant}
      data-testid={testId}
    >
      {children}
    </StyledTable>
  );
});

TableDefault.displayName = 'TableDefault';
