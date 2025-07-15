import { Box } from "@open-choreo/design-system";
import { usePanelExtentions } from "../../hooks";
import { PluginExtensionPoint } from "../../plugin-types";

export interface PanelExtensionMounterCommonProps {
  extentionPoint: PluginExtensionPoint;
}

export function PanelExtensionMounter(props: PanelExtensionMounterCommonProps) {
  const { extentionPoint } = props;
  const extentions = usePanelExtentions(extentionPoint);
  return (
    <Box testId={`extention-mounter-${extentionPoint.id}`}>
      {extentions.map((entry) => (
        <entry.component key={entry.key} />
      ))}
    </Box>
  );
}
