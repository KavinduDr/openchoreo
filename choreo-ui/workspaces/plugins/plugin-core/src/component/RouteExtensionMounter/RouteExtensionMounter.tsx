import { Route, Routes } from "react-router";
import { PluginExtensionPoint } from "../../plugin-types";
import { useExtentions } from "../../hooks";
import { PresetErrorPage } from "@open-choreo/common-views";

interface RouteExtensionMounterProps {
  extensionPoint: PluginExtensionPoint;
}

export function RouteExtensionMounter(props: RouteExtensionMounterProps) {
  const { extensionPoint } = props;
  const pageEntriesOrgLevel = useExtentions(extensionPoint);
  return (
    <Routes>
      {pageEntriesOrgLevel
        .filter(
          (
            extension,
          ): extension is import("../../plugin-types").PluginExtensionRoute =>
            "pathPattern" in extension,
        )
        .map(({ pathPattern, component: Component }) => (
          <Route key={pathPattern} path={pathPattern} element={<Component />} />
        ))}
      <Route path="*" element={<PresetErrorPage preset="404" />} />
    </Routes>
  );
}
