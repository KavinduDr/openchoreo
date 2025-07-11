import React from 'react';
import {
  StyledCardForm,
  StyledCardFormHeader,
  StyledCardFormContent,
} from './CardForm.styled';

export interface CardFormProps {
  children?: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  disabled?: boolean;
  testId?: string;
}

/**
 * CardForm component
 * @component
 */
export const CardForm = React.forwardRef<HTMLDivElement, CardFormProps>(
  (
    {
      children,
      header,
      className,
      onClick,
      disabled = false,
      testId,
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
      <StyledCardForm
        ref={ref}
        className={className}
        onClick={handleClick}
        disabled={disabled}
        data-cyid={testId}
        {...props}
      >
        {header && <StyledCardFormHeader>{header}</StyledCardFormHeader>}
        <StyledCardFormContent>{children}</StyledCardFormContent>
      </StyledCardForm>
    );
  }
);

CardForm.displayName = 'CardForm';
