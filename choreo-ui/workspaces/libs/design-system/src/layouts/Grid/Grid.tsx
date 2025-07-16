import React from 'react';
import { Grid as MuiGrid } from '@mui/material';

export interface GridProps {
  children?: React.ReactNode;
  className?: string;
  spacing?:
    | number
    | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
}

/**
 * Grid component
 * @component
 */
export const GridContainer = React.forwardRef<HTMLDivElement, GridProps>(
  ({ children, className, spacing = 2 }, ref) => {
    return (
      <MuiGrid
        container
        ref={ref}
        className={className}
        component={'div'}
        spacing={spacing}
      >
        {children}
      </MuiGrid>
    );
  }
);

GridContainer.displayName = 'GridContainer';

export interface GridItemProps {
  children?: React.ReactNode;
  className?: string;
  size?: GridSize | { [key in Breakpoint]: GridSize };
}

type GridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * GridItem component
 * @component
 */
export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({ children, className, size }, ref) => {
    return (
      <MuiGrid ref={ref} className={className} size={size}>
        {children}
      </MuiGrid>
    );
  }
);

GridItem.displayName = 'GridItem';
