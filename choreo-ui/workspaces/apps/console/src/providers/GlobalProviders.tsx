import { type PluginManifest } from "@open-choreo/plugin-core";
import { GlobalStateProvider } from "@open-choreo/choreo-context";
import { coreExtensionPoints } from "@open-choreo/plugin-core";
import { WrapperExtensionMounter } from "@open-choreo/plugin-core";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router";

export const GlobalProviders = async ({
  children,
}: {
  children: React.ReactNode;
  pluginRegistry: PluginManifest[];
}) => {
  return (
    <BrowserRouter basename="/">
      <GlobalStateProvider
      // pluginRegistry={pluginRegistry} basePath={window.configs.apiServerBaseUrl}
      >
        <WrapperExtensionMounter
          extentionPoint={coreExtensionPoints.globalProvider}
        >
          <IntlProvider locale="en">{children}</IntlProvider>
        </WrapperExtensionMounter>
      </GlobalStateProvider>
    </BrowserRouter>
  );
};
