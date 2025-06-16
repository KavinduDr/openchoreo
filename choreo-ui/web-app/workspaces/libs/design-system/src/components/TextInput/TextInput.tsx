import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import { QuestionIcon, InfoIcon } from '@design-system/Icons';
import {
  StyledTextField,
  StyledFormControl,
  HeadingWrapper,
} from './TextInput.styled';

export interface TextInputProps {
  /**
   * Label for the text input
   */
  label?: string;
  /**
   * Current value of the text input
   */
  value: string;
  /**
   * Optional tooltip text
   */
  tooltip?: string;
  /**
   * Helper text to display
   */
  helperText?: string;
  /**
   * Error message to display
   */
  error?: boolean;
  /**
   * Test ID for cypress
   */
  testId: string;
  /**
   * Callback when text changes
   */
  onChange: (text: string) => void;
  /**
   * If true, the text input will be disabled
   */
  disabled?: boolean;
  /**
   * Additional className for the component
   */
  className?: string;

  /**
   * Size of the text input
   */
  size?: 'small' | 'medium';
  /**
   * If true, the text input will be full width
   */
  fullWidth?: boolean;
  /**
   * Placeholder text for the text input
   */
  placeholder?: string;
}

export const TextInput = React.forwardRef<HTMLDivElement, TextInputProps>(
  (
    {
      label,
      tooltip,
      value,
      error,
      testId,
      onChange,
      disabled,
      className,
      helperText,
      size = 'small',
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    return (
      <StyledFormControl ref={ref} className={className}>
        {label && (
          <HeadingWrapper>
            <Typography>{label}</Typography>
            {tooltip && (
              <Tooltip title={tooltip}>
                <QuestionIcon fontSize="inherit" />
              </Tooltip>
            )}
          </HeadingWrapper>
        )}
        <StyledTextField
          size={size}
          data-cyid={testId}
          variant="outlined"
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
            onChange(evt.target.value)
          }
          value={value}
          disabled={disabled}
          slotProps={{
            inputLabel: {
              shrink: false,
            },
          }}
          error={!!error}
          helperText={
            helperText && (
              <Box display="flex" alignItems="center" gap={0.5}>
                <InfoIcon fontSize="inherit" />
                {helperText}
              </Box>
            )
          }
          fullWidth={fullWidth}
          {...props}
        />
      </StyledFormControl>
    );
  }
);

TextInput.displayName = 'TextInput';
