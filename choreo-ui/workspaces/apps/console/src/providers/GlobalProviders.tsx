import { PluginProvider, type PluginManifest } from "@open-choreo/plugin-core";
import { coreExtensionPoints } from "@open-choreo/plugin-core";
import { WrapperExtensionMounter } from "@open-choreo/plugin-core";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router";


export const GlobalProviders = async ({ children, pluginRegistry }: { children: React.ReactNode, pluginRegistry: PluginManifest[] }) => {
    return (
        <BrowserRouter basename="/">
            <PluginProvider pluginRegistry={pluginRegistry} basePath={window.configs.apiServerBaseUrl}>
                <WrapperExtensionMounter extentionPoint={coreExtensionPoints.globalProvider} >
                    <IntlProvider locale="en">
                        {children}
                    </IntlProvider>
                </WrapperExtensionMounter>
            </PluginProvider>
        </BrowserRouter>
    );
};