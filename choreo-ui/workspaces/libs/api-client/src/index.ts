// Export all the types
export type * from "./types/types";

// Main client
export { ChoreoClient } from "./core/client";
export type { ChoreoApiClient } from "./core/client";

// Configuration and utilities
export { defaultConfig, ApiError } from "./core/config";
export type { ApiConfig } from "./core/config";

// Individual API modules
export { projectsApi } from "./api/projects";
export type { ProjectsApi } from "./api/projects";

export { componentsApi } from "./api/components";
export type { ComponentsApi } from "./api/components";

export { organizationApi } from "./api/organization";
export type { OrganizationApi } from "./api/organization";

export { buildsApi } from "./api/build";
export type { BuildsApi } from "./api/build";

export { bindingsApi } from "./api/bindings";
export type { BindingsApi } from "./api/bindings";

export { deploymentPipelineApi } from "./api/deployment-pipeline";
export type { DeploymentPipelineApi } from "./api/deployment-pipeline";

export { workloadsApi } from "./api/workloads";
export type { WorkloadsApi } from "./api/workloads";

export { environmentsApi } from "./api/environents";
export type { EnvironmentsApi } from "./api/environents";

export { dataPlanesApi } from "./api/dataplanes";
export type { DataPlanesApi } from "./api/dataplanes";

export { observerApi } from "./api/observer";
export type { ObserverApi } from "./api/observer";

export { healthApi } from "./api/health";
export type { HealthApi } from "./api/health";

export { resourceOpsApi } from "./api/resource-ops";
export type { ResourceOpsApi } from "./api/resource-ops";

// Types
export type {
  OrganizationList,
  OrganizationListData,
  OrganizationResponse,
  ProjectResponse,
  ProjectList,
  ComponentResponse,
  ComponentList,
  BuildList,
  BuildPlaneList,
  BuildListData,
  BuildPlaneListData,
  ComponentBindingList,
  ComponentBindingListData,
  ComponentBindingResponse,
  DeploymentPipelineResponse,
  WorkloadList,
  WorkloadResponse,
  EnvironmentList,
  EnvironmentResponse,
  DataPlaneList,
  DataPlaneResponse,
  ComponentObserverResponse,
  ApplyResponse,
  DeleteResponse,
  PromoteComponentResponse,
} from "./types/types";

// Default export
import { ChoreoClient } from "./core/client";
export default ChoreoClient;
