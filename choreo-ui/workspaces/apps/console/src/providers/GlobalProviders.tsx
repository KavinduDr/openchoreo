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
  return (
    <BrowserRouter basename="/">
      <ApiClientProvider basePath={window.configs?.apiServerBaseUrl || ""}>
        <PluginProvider pluginRegistry={pluginRegistry}>
          <WrapperExtensionMounter
            extensionPoint={coreExtensionPoints.globalProvider}
          >
            <IntlProvider locale="en">{children}</IntlProvider>
          </WrapperExtensionMounter>
        </PluginProvider>
      </ApiClientProvider>
    </BrowserRouter>
  );
};
