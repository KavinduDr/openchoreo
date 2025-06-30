// Main client
export { ChoreoClient } from './core/client';
export type { ChoreoApiClient } from './core/client';

// Configuration and utilities
export { defaultConfig, ApiError } from './core/config';
export type { ApiConfig } from './core/config';

// Individual API modules
export { generalApi } from './api/general';
export type { GeneralApi } from './api/general';

export { projectsApi } from './api/projects';
export type { ProjectsApi } from './api/projects';

export { componentsApi } from './api/components';
export type { ComponentsApi } from './api/components';

export { deploymentsApi } from './api/deployments';
export type { DeploymentsApi } from './api/deployments';

// Types
export type {
  Condition,
  Metadata,
  Project,
  ProjectList,
  Component,
  ComponentList,
  Deployment,
  DeploymentList,
  EndpointsResponse,
} from './types/types';

// Default export
import { ChoreoClient } from './core/client';
export default ChoreoClient;
