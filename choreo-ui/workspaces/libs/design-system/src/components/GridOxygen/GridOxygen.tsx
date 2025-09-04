import React from 'react';
// import { StyledGridOxygen } from './GridOxygen.styled';
import { Grid } from '@oxygen-ui/react';

export interface GridOxygenProps {
  children?: React.ReactNode;
  className?: string;
  spacing?:
    | number
    | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
}

/**
 * GridOxygen component
 * @component
 */
export const GridOxygen = React.forwardRef<HTMLDivElement, GridOxygenProps>(
  ({ children, className, spacing = 2, ...props }, ref) => {
    return (
      <Grid ref={ref} className={className} spacing={spacing} {...props}>
        {children}
      </Grid>
    );
  }
);

GridOxygen.displayName = 'GridOxygen';
