import React from 'react';
import { StyledRadioGroup } from './RadioGroup.styled';
import { RadioGroupProps as MuiRadioGroupProps } from '@mui/material';

export interface RadioGroupProps extends MuiRadioGroupProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
  disabled?: boolean;
  row?: boolean;
  testId: string;
  direction?: 'row' | 'column';
  sx?: React.CSSProperties;
}

/**
 * RadioGroup component
 * @component
 */
export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ children, className, onClick, disabled = false, ...props }) => {
    return (
      <StyledRadioGroup
        className={className}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        row={props.row}
        {...props}
      >
        {disabled
          ? React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child as React.ReactElement<any>, {
                  disabled: true,
                });
              }
              return child;
            })
          : children}
      </StyledRadioGroup>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
