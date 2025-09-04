import React, { ReactNode } from 'react';
// import { StyledBoxOxygen } from './BoxOxygen.styled';
import { Box } from '@oxygen-ui/react';

export interface BoxOxygenProps {
  children?: ReactNode;
  className?: string;
  testId?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
  disabled?: boolean;
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';

  // Style props
  backgroundColor?: string;
  height?: string | number;
  width?: string | number;
  display?: 'flex' | 'block' | 'inline-block' | 'grid' | 'inline-grid';
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  padding?: string | number;
  margin?: string | number;
  border?: 'small' | 'medium';
  borderBottom?: 'small' | 'medium';
  borderTop?: 'small' | 'medium';
  borderLeft?: 'small' | 'medium';
  borderRight?: 'small' | 'medium';
  borderColor?: string;
  borderRadius?: string | number;
  boxShadow?: string;
  cursor?: 'pointer' | 'default' | 'not-allowed';
  color?: string;
  transition?: string;
  minHeight?: string | number;
  maxHeight?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  flexGrow?: string | number;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  gap?: string | number;
  zIndex?: string | number;
}

/**
 * BoxOxygen component
 * @component
 */
export const BoxOxygen = React.forwardRef<HTMLDivElement, BoxOxygenProps>(
  ({ children, className, onMouseEnter, onMouseLeave, ...rest }) => {
    return (
      <Box
        className={className}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...rest}
      >
        {children}
      </Box>
    );
  }
);

BoxOxygen.displayName = 'BoxOxygen';
