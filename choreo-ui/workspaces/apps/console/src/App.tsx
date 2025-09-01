import { ThemeProvider, Box } from "@open-choreo/design-system";
import { Suspense, useEffect } from "react";
import {
  RouteExtensionMounter,
  coreExtensionPoints,
} from "@open-choreo/plugin-core";
import React from "react";
import { Route, Routes } from "react-router";
import { PresetErrorPage, FullPageLoader } from "@open-choreo/common-views";
import { useColorMode } from "@open-choreo/choreo-context";
import { PathsPatterns } from "@open-choreo/choreo-context";
import { useAuth } from "@open-choreo/auth-core";

// Lazy load the MainLayout component
const MainLayout = React.lazy(() =>
  import("./layouts/MainLayout").then((module) => ({
    default: module.MainLayout,
  }))
);

export default function App() {
  // TODO: Add a proper suspence fallback
  const { colorMode } = useColorMode();

  const { refresh } = useAuth();

  useEffect(() => {
    // Handle OAuth callback
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const state = urlParams.get("state");

      // If we have OAuth callback parameters, refresh auth state
      if (code || state) {
        console.log("Handling OAuth callback...");
        try {
          await refresh();
        } catch (error) {
          console.error("Failed to handle OAuth callback:", error);
        }
      }
    };

    handleCallback();
  }, [refresh]);

  return (
    <ThemeProvider mode={colorMode}>
      <Box width="100vw" height="100vh">
        <Suspense fallback={<FullPageLoader />}>
          <MainLayout>
            <Routes>
              <Route
                path={PathsPatterns.COMPONENT_LEVEL}
                element={
                  <RouteExtensionMounter
                    extensionPoint={coreExtensionPoints.componentLevelPage}
                  />
                }
              />
              <Route
                path={PathsPatterns.PROJECT_LEVEL}
                element={
                  <RouteExtensionMounter
                    extensionPoint={coreExtensionPoints.projectLevelPage}
                  />
                }
              />
              <Route
                path={PathsPatterns.ORG_LEVEL}
                element={
                  <RouteExtensionMounter
                    extensionPoint={coreExtensionPoints.orgLevelPage}
                  />
                }
              />
              <Route
                path={"/*"}
                element={
                  <RouteExtensionMounter
                    extensionPoint={coreExtensionPoints.globalPage}
                  />
                }
              />
              <Route path="*" element={<PresetErrorPage preset="404" />} />
            </Routes>
          </MainLayout>
        </Suspense>
      </Box>
    </ThemeProvider>
  );
}
