import { type PluginManifest } from "@open-choreo/plugin-core";
// import { GlobalStateProvider } from "@open-choreo/choreo-context";
import { coreExtensionPoints } from "@open-choreo/plugin-core";
import {
  WrapperExtensionMounter,
  PluginProvider,
} from "@open-choreo/plugin-core";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router";
import ApiClientProvider from "@open-choreo/choreo-context/dist/src/providers/ApiClientProvider";

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
            extentionPoint={coreExtensionPoints.globalProvider}
          >
            <IntlProvider locale="en">{children}</IntlProvider>
          </WrapperExtensionMounter>
        </PluginProvider>
      </ApiClientProvider>
    </BrowserRouter>
  );
};
