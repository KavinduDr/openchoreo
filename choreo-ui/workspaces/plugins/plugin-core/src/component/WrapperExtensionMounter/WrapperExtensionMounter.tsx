import React, { useCallback } from "react";
import { useExtentions } from "../../hooks/useExtensions";
import { PluginExtensionPoint } from "../../plugin-types";

export interface WrapperExtensionMounterProps {
  extensionPoint: PluginExtensionPoint;
  children: React.ReactNode;
}

export function WrapperExtensionMounter(props: WrapperExtensionMounterProps) {
  const { extensionPoint, children } = props;
  const extentions = useExtentions(extensionPoint);
  // Create nested providers by reducing the extensions array
  const nestedProviders = useCallback(() => {
    return extentions.reduceRight((acc, extension) => {
      const ProviderComponent = extension.component as React.ComponentType<{
        children: React.ReactNode;
      }>;
      return (
        <ProviderComponent key={extension.extensionPoint.id}>
          {acc}
        </ProviderComponent>
      );
    }, children);
  }, [extentions, children]);

  return <>{nestedProviders()}</>;
}
