import React from "react";
import { AuthProvider as CoreAuthProvider } from "./AuthContext";
import { getProvider } from "./providers";
import { AuthProviderProps } from "./types";

export const AuthProvider: React.FC<AuthProviderProps> = ({
  provider,
  config,
  children,
}) => {
  const ProviderImpl = getProvider(provider) as React.ComponentType<any>;

  if (!ProviderImpl) {
    throw new Error(
      `Auth provider "${provider}" not found. Make sure it's registered in providers/index.ts`,
    );
  }

  return (
    <CoreAuthProvider>
      <ProviderImpl config={config}>{children}</ProviderImpl>
    </CoreAuthProvider>
  );
};
