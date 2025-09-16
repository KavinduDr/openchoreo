import { AuthContextProvider } from "@open-choreo/auth-core";
// import type { AuthClientConfig } from "@open-choreo/auth-core/";s
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
  //   clientID: "a6Sf_moAUbIPX2JZ440djfunA94a",
  //   baseUrl: "https://api.asgardeo.io/t/starkindustriesdemo", // Required by interface
  //   // domain: "https://api.asgardeo.io/t/starkindustriesdemo", // Used for provider config
  //   signInRedirectURL: `http://localhost:4000/sign-in`,
  //   signOutRedirectURL: "http://localhost:4000/organization/default",
  //   scope: ["openid", "profile", "email"],
  //   autoRefresh: true,
  //   checkInterval: 5,
  // };

  // const firebaseConfig: AuthClientConfig = {
  //   provider: "firebase",
  //   apiKey: "AIzaSyB-4NMohSeu-BpuaDN05-ljj9H_uJRm-fE",
  //   authDomain: "contact-manager-23087.firebaseapp.com",
  //   projectId: "contact-manager-23087",
  //   storageBucket: "contact-manager-23087.firebasestorage.app",
  //   messagingSenderId: "318523868384",
  //   appId: "1:318523868384:web:69c00e6b1dc7b40adf7c85",
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
