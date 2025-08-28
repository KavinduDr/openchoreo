import React, { useEffect } from "react";
import CoreAuthProvider, { AuthContext } from "./AuthContext";
import { AuthProviderProps } from "./types";

const AuthProvider: React.FC<AuthProviderProps> = ({ provider, children }) => {
  const authContext = React.useContext(AuthContext);

  useEffect(() => {
    // Auto login with the provided provider
    if (authContext && !authContext.user) {
      authContext.login(provider.id, provider.config).catch(console.error);
    }
  }, [authContext, provider]);

  return (
    <CoreAuthProvider>
      {children}
    </CoreAuthProvider>
  );
};

export default AuthProvider;
