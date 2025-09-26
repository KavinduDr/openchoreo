import { FullPageLoader, PresetErrorPage } from "@open-choreo/common-views";
import { Route, Routes } from "react-router";
import { useExtentions } from "../../hooks";
import { PluginExtensionPoint } from "../../plugin-types";

interface RouteExtensionMounterProps {
  extensionPoint: PluginExtensionPoint;
}

export function RouteExtensionMounter(props: RouteExtensionMounterProps) {
  console.log("props: ", props);
  const { extensionPoint } = props;
  const pageEntriesOrgLevel = useExtentions(extensionPoint);
  console.log("pageEntriesOrgLevel: ", pageEntriesOrgLevel);
  return (
    <Routes>
      {pageEntriesOrgLevel.extensions
        .filter(
          (
            extension,
          ): extension is import("../../plugin-types").PluginExtensionRoute =>
            "pathPattern" in extension,
        )
        .map(({ pathPattern, component: Component }) => (
          <Route key={pathPattern} path={pathPattern} element={<Component />} />
        ))}
      {pageEntriesOrgLevel.isLoading && (
        <Route path="*" element={<FullPageLoader />} />
      )}
      <Route path="*" element={<PresetErrorPage preset="404" />} />
    </Routes>
  );
}
