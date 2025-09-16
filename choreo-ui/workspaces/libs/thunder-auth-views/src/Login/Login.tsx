import { useState } from 'react';
import { useAuth } from '@open-choreo/auth-core';
import {
  Button,
  ButtonContainer,
  Card,
  CardContent,
  CardHeading,
  TextInput,
} from '@open-choreo/design-system';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = () => {
    console.log('Logging in with', { username, password });
    // Pass username as email parameter since the interface expects email
    login(username, password).catch((err) => {
      console.error('Login failed:', err);
    });
  };

  return (
    <Card testId="login">
      <CardHeading title="Login Card" testId="login" />
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
      </CardContent>
    </Card>
  );
}
