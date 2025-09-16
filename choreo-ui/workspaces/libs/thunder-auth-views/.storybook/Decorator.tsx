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
          apiKey: "AIzaSyB-4NMohSeu-BpuaDN05-ljj9H_uJRm-fE",
          authDomain: "contact-manager-23087.firebaseapp.com",
          projectId: "contact-manager-23087",
          storageBucket: "contact-manager-23087.firebasestorage.app",
          messagingSenderId: "318523868384",
          appId: "1:318523868384:web:69c00e6b1dc7b40adf7c85",
        }}>
          <IntlProvider locale="en">
            <Story />
          </IntlProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}; 