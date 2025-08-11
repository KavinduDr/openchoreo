import React from 'react';
import { StyledRadioIndicator } from './Radio.styled';
import { RadioProps } from '@mui/material';

export const RadioIndicator = React.forwardRef<HTMLDivElement, RadioProps>(
  (props) => {
    return (
      <StyledRadioIndicator
        {...props}
        disableRipple={true}
        disableFocusRipple={true}
        disableTouchRipple={true}
      />
    );
  }
);

RadioIndicator.displayName = 'RadioIndicator';
