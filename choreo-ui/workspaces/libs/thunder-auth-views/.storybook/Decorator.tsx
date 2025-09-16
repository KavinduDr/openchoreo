// import { Box, FormControl, Radio, RadioGroup, FormControlLabel, IconButton, Container, Card } from '@mui/material';
import React, { useState } from 'react';
import { Decorator } from '@storybook/react';
import { useDarkMode } from 'storybook-dark-mode'
import { ThemeProvider } from '@open-choreo/design-system';
import './fonts/fonts.css'
import { BrowserRouter } from 'react-router';
import { IntlProvider } from 'react-intl';
import { AuthContextProvider } from '@open-choreo/auth-core';

export const withTheme: Decorator = (Story) => {
  const isDark = useDarkMode();

  return (
    <ThemeProvider mode={isDark ? 'dark' : 'light'}>
      <BrowserRouter >
        <AuthContextProvider config={{
          provider: "thunder",
          apiKey: "",
          authDomain: "",
          projectId: "",
          storageBucket: "",
          messagingSenderId: "",
          appId: "",
        }}>
          <IntlProvider locale="en">
            <Story />
          </IntlProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}; 