import React from 'react';
import { StyledRadioIndicator } from './Radio.styled';
import { RadioProps } from '@mui/material';
import { colorVariant } from './Radio.styled';

export interface RadioIndicatorProps extends RadioProps {
  color?: colorVariant;
}

export const RadioIndicator = React.forwardRef<
  HTMLDivElement,
  RadioIndicatorProps
>((props: RadioIndicatorProps, _ref) => {
  return (
    <StyledRadioIndicator
      {...props}
      disableRipple={true}
      disableFocusRipple={true}
      disableTouchRipple={true}
    />
  );
});

RadioIndicator.displayName = 'RadioIndicator';
