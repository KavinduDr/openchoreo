import React from 'react';
import { StyledRadioCard } from './RadioCard.styled';
import {
  Box,
  FormControlLabel,
  RadioProps as MUIRadioProps,
  Typography,
} from '@mui/material';
import { Checkbox } from '../Checkbox';
import { RadioIndicator } from '../Radio/RadioIndicator';

export interface RadioCardProps
  extends Pick<MUIRadioProps, 'disabled' | 'value'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  maxWidth?: number | string;
  indicator?: boolean;
  content?: React.ReactNode;
  actions?: React.ReactNode;
  active?: boolean;
  testId: string;
  iconPlacement?: 'top' | 'center';
  enableCheckboxMode?: boolean;
  onToggleSelect?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * RadioCard component
 * @component
 */
export const RadioCard = React.forwardRef<HTMLDivElement, RadioCardProps>(
  (
    {
      title,
      description,
      disabled,
      value,
      icon,
      maxWidth = '100%',
      indicator = false,
      content,
      actions,
      active = false,
      testId,
      iconPlacement = 'top',
      enableCheckboxMode = false,
      onToggleSelect,
      ...props
    },
    _ref
  ) => {
    const cardLabel = (
      <Box
        data-radioCardContent={true}
        data-radioCardContentCenter={iconPlacement === 'center'}
        data-radioCardContentTop={iconPlacement === 'top'}
        data-testid={testId}
      >
        {icon && <Box className="radioCardIcon">{icon}</Box>}

        <Box data-radioCardDetail={true} data-radioCardDetailWithIcon={icon}>
          <Box className="radioCardHeading">
            {title && (
              <Box className="radioCardTitle">
                <Typography variant="h4">{title}</Typography>
              </Box>
            )}
            {actions && <Box className="radioCardActions">{actions}</Box>}
          </Box>
          {description && (
            <Typography color="secondary" variant="body1">
              {description}
            </Typography>
          )}
          {content && <Box className="radioDetailContent">{content}</Box>}
        </Box>
      </Box>
    );

    // Only render radio/checkbox as control when NOT showing indicator
    const actionItem =
      indicator && !actions ? (
        enableCheckboxMode ? (
          <Checkbox
            checked={active}
            testId={testId}
            onChange={onToggleSelect}
          />
        ) : (
          <RadioIndicator color="primary" />
        )
      ) : (
        // Render invisible radio for form functionality
        <RadioIndicator color="primary" style={{ display: 'none' }} />
      );

    return (
      <StyledRadioCard className="radioCard" maxWidth={maxWidth}>
        <FormControlLabel
          data-radioLabelRoot={true}
          data-radioLabelRootActive={active}
          data-radioLabelRootIndicator={indicator && !actions}
          data-radioLabelDisabled={disabled}
          disabled={disabled}
          value={value}
          control={actionItem}
          label={cardLabel}
        />

        {/* Render indicator in top right corner when indicator=true and no actions */}
        {indicator &&
          !actions &&
          (enableCheckboxMode ? (
            <Checkbox
              checked={active}
              testId={testId}
              onChange={onToggleSelect}
              data-checkboxIndicator={true}
              data-checkboxIndicatorVisible={true}
              data-checkboxIndicatorCenter={iconPlacement === 'center'}
              data-checkboxIndicatorTop={iconPlacement === 'top'}
            />
          ) : (
            <RadioIndicator
              color="primary"
              data-radioIndicator={true}
              data-radioIndicatorVisible={true}
              data-radioIndicatorCenter={iconPlacement === 'center'}
              data-radioIndicatorTop={iconPlacement === 'top'}
            />
          ))}
      </StyledRadioCard>
    );
  }
);

RadioCard.displayName = 'RadioCard';
