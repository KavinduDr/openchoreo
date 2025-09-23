import React, { useMemo } from "react";
import {
  useBuildPlanes,
  useBuilds,
  useComponentBindings,
  useCreateWorkload,
  useDeploymentPipeline,
  useEnvironments,
  useWorkloads,
} from "@open-choreo/choreo-context";
import { PageLayout } from "@open-choreo/common-views";
import { Button } from "@open-choreo/design-system";
import { logger } from "@open-choreo/logging";
import {
  useComponentHandle,
  useOrgHandle,
  useProjectHandle,
} from "@open-choreo/plugin-core";
import { EnvCardBase } from "@open-choreo/resource-views";
import { getEnvCardStateMachine } from "@open-choreo/state-machine";
import { EnrichedEnvironment } from "../types/types";
import EnvCard from "./EnvCard";

const stateMachine = getEnvCardStateMachine();
logger.log("###", stateMachine.id);

export default function Deployment() {
  const orgHandle = useOrgHandle();
  const projectHandle = useProjectHandle();
  const componentHandle = useComponentHandle();
  const { builds } = useBuilds(orgHandle, projectHandle, componentHandle);
  const { buildPlanes } = useBuildPlanes(orgHandle);
  const { bindings } = useComponentBindings(
    orgHandle,
    projectHandle,
    componentHandle,
  );
  const { deploymentPipeline } = useDeploymentPipeline(
    orgHandle,
    projectHandle,
  );
  const { workloads } = useWorkloads(orgHandle, projectHandle, componentHandle);
  const { createWorkload } = useCreateWorkload(
    orgHandle,
    projectHandle,
    componentHandle,
  );
  const { environments } = useEnvironments(orgHandle);

  const enrichedEnvironments: EnrichedEnvironment[] = useMemo(
    () =>
      environments?.map((env) => ({
        ...env,
        binding: bindings?.data?.items?.find(
          (binding) => binding.environment === env.name,
        ),
        targetEnvironments: deploymentPipeline?.promotionPaths?.find(
          (path) => path.sourceEnvironmentRef === env.name,
        )?.targetEnvironmentRefs,
      })),
    [environments, bindings?.data?.items, deploymentPipeline?.promotionPaths],
  );

  const sortedEnrichedEnvironments = useMemo(() => {
    const scoreBoard = new Map<string, number>();
    const updateScoreBoard = (env: EnrichedEnvironment) => {
      scoreBoard.set(env.name, (scoreBoard.get(env.name) || 0) + 1);
      env.targetEnvironments?.forEach((te) => {
        updateScoreBoard(enrichedEnvironments?.find((e) => e.name === te.name));
      });
    };
    enrichedEnvironments?.forEach(updateScoreBoard);
    return enrichedEnvironments?.sort((b, a) => {
      return (scoreBoard.get(b.name) || 0) - (scoreBoard.get(a.name) || 0);
    });
  }, [enrichedEnvironments]);

  logger.log("###", {
    enrichedEnvironments,
    deploymentPipeline,
    environments,
    workloads,
    builds,
    buildPlanes,
    bindings,
  });

  return (
    <PageLayout title="Deployments" testId="deployments-page">
      <EnvCardBase envName="Builds">
        <Button
          onClick={() =>
            createWorkload({
              containers: {
                main: {
                  image: "nginx:latest",
                },
              },
              endpoints: {},
              owner: {
                componentName: componentHandle,
                projectName: projectHandle,
              },
            })
          }
        >
          Create Workload
        </Button>
      </EnvCardBase>
      {sortedEnrichedEnvironments?.map((env) => (
        <EnvCard key={env.name} env={env} />
      ))}
    </PageLayout>
  );
}
