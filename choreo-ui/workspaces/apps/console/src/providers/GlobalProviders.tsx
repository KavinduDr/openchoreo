import { AuthContextProvider } from "@open-choreo/auth-core";
import type { ThunderConfig } from "@open-choreo/auth-core/dist/src/types";
import { ApiClientProvider } from "@open-choreo/choreo-context";
import {
  coreExtensionPoints,
  WrapperExtensionMounter,
  PluginProvider,
  type PluginManifest,
} from "@open-choreo/plugin-core";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router";

export const GlobalProviders = ({
  children,
  pluginRegistry,
}: {
  children: React.ReactNode;
  pluginRegistry: PluginManifest[];
}) => {
  // const authConfig: AuthClientConfig = {
  //   provider: "asgardeo",
  //   clientID: "your asgardeo client id",
  //   baseUrl: "your asgardeo base url",
  //   // domain: "your asgardeo domain",
  //   signInRedirectURL: `http://localhost:4000/sign-in`,
  //   signOutRedirectURL: "http://localhost:4000/organization/default",
  //   scope: ["openid", "profile", "email"],
  //   autoRefresh: true,
  //   checkInterval: 5,
  // };

  // const firebaseConfig: AuthClientConfig = {
  //   provider: "firebase",
  //   apiKey: "your firebase api key",
  //   authDomain: "your firebase auth domain",
  //   projectId: "your firebase project id",
  //   storageBucket: "your firebase storage bucket",
  //   messagingSenderId: "your firebase messaging sender id",
  //   appId: "your firebase app id",
  // };

  const thunderProviderConfig: ThunderConfig = {
    provider: "thunder",
    apiKey: "your-thunder-api-key",
    authDomain: "your-thunder-auth-domain",
    projectId: "your-thunder-project-id",
    storageBucket: "your-thunder-storage-bucket",
    messagingSenderId: "your-thunder-messaging-sender-id",
    appId: "your-thunder-app-id",
    scope: ["openid", "profile", "email"],
  };

  return (
    <BrowserRouter basename="/">
      <ApiClientProvider basePath={window.configs?.apiServerBaseUrl || ""}>
        <AuthContextProvider config={thunderProviderConfig}>
          <PluginProvider pluginRegistry={pluginRegistry}>
            <WrapperExtensionMounter
              extensionPoint={coreExtensionPoints.globalProvider}
            >
              <IntlProvider locale="en">{children}</IntlProvider>
            </WrapperExtensionMounter>
          </PluginProvider>
        </AuthContextProvider>
      </ApiClientProvider>
    </BrowserRouter>
  );
};
