import { Box } from "@open-choreo/design-system";
import { usePanelExtentions } from "../../hooks";

export interface ExtentionMounterCommonProps {
  extentionPointId: string;
}

export function ExtentionMounter(props: ExtentionMounterCommonProps) {
  const { extentionPointId } = props;
  const extentions = usePanelExtentions(extentionPointId);
  return (
    <Box testId={`extention-mounter-${extentionPointId}`}>
      {extentions.map((entry) => (
        <entry.component key={entry.key} />
      ))}
    </Box>
  );
}
