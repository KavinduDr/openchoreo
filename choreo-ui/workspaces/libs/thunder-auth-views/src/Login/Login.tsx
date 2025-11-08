import { useState } from 'react';
import { useAuth } from '@open-choreo/auth-core';
import {
  Box,
  Button,
  ButtonContainer,
  Card,
  CardContent,
  CardHeading,
  GridContainer,
  TextInput,
} from '@open-choreo/design-system';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = () => {
    console.log('Logging in with', { username, password });
    // Pass username as password parameter since the interface expects password
    login(username, password).catch((err) => {
      console.error('Login failed:', err);
    });
  };

  return (
    <GridContainer>
      <Box padding={16} width="100%" display="flex">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <Card testId="login">
            <CardHeading title="Login" testId="login" />
            <CardContent>
              <TextInput
                label="Username"
                value={username}
                testId="username-input"
                onChange={function (text: string): void {
                  setUsername(text);
                }}
              />
              <TextInput
                label="Password"
                type="password"
                value={password}
                testId="password-input"
                onChange={function (text: string): void {
                  setPassword(text);
                }}
              />
              <Box margin={8}>
                <ButtonContainer testId="login-buttons" align="space-between">
                  <Button onClick={handleLogin}>Login</Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setUsername('');
                      setPassword('');
                    }}
                  >
                    Cancel
                  </Button>
                </ButtonContainer>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </GridContainer>
  );
}
