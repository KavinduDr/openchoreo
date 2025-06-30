import React, { useMemo } from "react";
import { PluginExtensionType } from "../../../plugin-types";
import { Route, Routes } from "react-router";
import { usePluginRegistry } from "../../Providers";

export function useRouteExtentions() {
  const pluginRegistry = usePluginRegistry();
  const routes = useMemo(() => {
    const pageEntries = pluginRegistry.flatMap((plugin) =>
      plugin.extensions
        .filter((entry) => entry.type === PluginExtensionType.PAGE)
        .map((entry) => ({
          path: entry.path,
          element: <entry.component />,
        })),
    );

    return (
      <Routes>
        {pageEntries.map((page) => (
          <Route
            key={page.path}
            path={page.path + "/:subpath"}
            element={page.element}
          />
        ))}
      </Routes>
    );
  }, [pluginRegistry]);

  return routes;
}
