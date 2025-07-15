import { useChoreoTheme, Box } from '@open-choreo/design-system';
import React from 'react';

export interface FooterProps {
  children?: React.ReactNode;
}

export const Footer = React.forwardRef<HTMLDivElement, FooterProps>(
  ({ children }, ref) => {
    const theme = useChoreoTheme();

    return (
      <Box
        ref={ref}
        height={theme.spacing(5.5)}
        borderTop="small"
        borderColor={theme.pallet.grey[200]}
      >
        {children}
      </Box>
    );
  }
);

Footer.displayName = 'Footer';
