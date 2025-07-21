import React, { createContext, useContext } from "react";
import { PluginManifest } from "../../plugin-types";

export interface PluginProviderValue {
  pluginRegistry: PluginManifest[];
}

export interface PluginProviderProps {
  children: React.ReactNode;
  pluginRegistry: PluginManifest[];
}

const PluginContext = createContext<PluginProviderValue>({
  pluginRegistry: [],
});

export function PluginProvider({
  pluginRegistry,
  children,
}: PluginProviderProps) {
  return (
    <PluginContext.Provider value={{ pluginRegistry }}>
      {children}
    </PluginContext.Provider>
  );
}

export function usePluginRegistry() {
  const { pluginRegistry } = useContext(PluginContext);
  return pluginRegistry;
}

// export function useBasePath() {
//   const { basePath } = useContext(PluginContext);
//   return basePath;
// }
