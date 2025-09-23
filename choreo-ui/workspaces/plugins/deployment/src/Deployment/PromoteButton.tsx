import React from "react";
import {
  usePromoteComponent,
  useUpdateComponentBinding,
} from "@open-choreo/choreo-context";
import { ReleaseState, TargetEnvironmentRef } from "@open-choreo/definitions";
import { Button, PromoteIcon } from "@open-choreo/design-system";
import { logger } from "@open-choreo/logging";
import {
  useOrgHandle,
  useProjectHandle,
  useComponentHandle,
} from "@open-choreo/plugin-core";
import { EnrichedEnvironment } from "../types/types";

export interface PromoteButtonProps {
  fromEnv: EnrichedEnvironment;
  toEnv: TargetEnvironmentRef;
}
export function PromoteButton({ fromEnv, toEnv }: PromoteButtonProps) {
  const orgHandle = useOrgHandle();
  const projectHandle = useProjectHandle();
  const componentHandle = useComponentHandle();
  const { updateBinding: updateTargetBinding } = useUpdateComponentBinding(
    orgHandle,
    projectHandle,
    componentHandle,
    fromEnv?.name,
  );
  const { promoteComponent, loading, data } = usePromoteComponent(
    orgHandle,
    projectHandle,
    componentHandle,
  );
  const handlePromote = async () => {
    try {
      // Use the new promote component API
      promoteComponent({
        sourceEnv: fromEnv.name,
        targetEnv: toEnv.name,
      });
    } catch (error) {
      logger.error("Failed to promote component:", error);
      // Fallback to the old method
      updateTargetBinding({ releaseState: ReleaseState.ACTIVE });
    }
  };

  logger.log("PC", data);
  return (
    <Button
      testId="promote-button"
      endIcon={<PromoteIcon />}
      size="small"
      onClick={handlePromote}
      disabled={loading}
    >
      {loading ? "Promoting..." : "Promote"}
    </Button>
  );
}
