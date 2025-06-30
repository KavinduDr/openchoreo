import React, { useCallback } from "react";
import { useExtentionProviders } from "../../hooks/useProviderExtentions";

export interface ExtentionProviderMounterProps {
  extentionPointId: string;
  children: React.ReactNode;
}

export function ExtentionProviderMounter(props: ExtentionProviderMounterProps) {
  const { extentionPointId, children } = props;
  const extentions = useExtentionProviders(extentionPointId);
  // Create nested providers by reducing the extensions array
  const nestedProviders = useCallback(() => {
    return extentions.reduceRight((acc, extension) => {
      const ProviderComponent = extension.component;
      return <ProviderComponent key={extension.key}>{acc}</ProviderComponent>;
    }, children);
  }, [extentions, children]);

  return <>{nestedProviders()}</>;
}
