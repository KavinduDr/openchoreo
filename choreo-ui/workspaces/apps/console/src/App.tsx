import { ThemeProvider, Box } from "@open-choreo/design-system";
import { Suspense } from "react";
import {
  RouteExtensionMounter,
  coreExtensionPoints,
} from "@open-choreo/plugin-core";
import React from "react";
import { Route, Routes } from "react-router";
import { PresetErrorPage, FullPageLoader } from "@open-choreo/common-views";
import { useColorMode } from "@open-choreo/choreo-context";
import { PathsPatterns } from "@open-choreo/choreo-context";

// Lazy load the MainLayout component
const MainLayout = React.lazy(() =>
  import("./layouts/MainLayout").then((module) => ({
    default: module.MainLayout,
  }))
);

export default function App() {
  // TODO: Add a proper suspence fallback
  const { colorMode } = useColorMode();
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
