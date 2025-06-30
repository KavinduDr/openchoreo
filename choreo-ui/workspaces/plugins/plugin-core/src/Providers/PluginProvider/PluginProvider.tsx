import React, { createContext, useContext } from "react";
import { PluginManifest } from "../../../plugin-types";

export interface PluginProviderValue {
  pluginRegistry: PluginManifest[];
  basePath: string;
}

export interface PluginProviderProps {
  children: React.ReactNode;
  pluginRegistry: PluginManifest[];
  basePath?: string;
}

const PluginContext = createContext<PluginProviderValue>({
  pluginRegistry: [],
  basePath: "localhost:3000",
});

export function PluginProvider({
  pluginRegistry,
  children,
  basePath,
}: PluginProviderProps) {
  return (
    <PluginContext.Provider value={{ pluginRegistry, basePath }}>
      {children}
    </PluginContext.Provider>
  );
}

export function usePluginRegistry() {
  const { pluginRegistry } = useContext(PluginContext);
  return pluginRegistry;
}

export function useBasePath() {
  const { basePath } = useContext(PluginContext);
  return basePath;
}
