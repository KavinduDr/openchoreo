// Export all the types
export type * from './types/types';

// Main client
export { ChoreoClient } from './core/client';
export type { ChoreoApiClient } from './core/client';

// Configuration and utilities
export { defaultConfig, ApiError } from './core/config';
export type { ApiConfig } from './core/config';

// Individual API modules
export { projectsApi } from './api/projects';
export type { ProjectsApi } from './api/projects';

export { componentsApi } from './api/components';
export type { ComponentsApi } from './api/components';

export { organizationApi } from './api/organization';
export type { OrganizationApi } from './api/organization';

// Types
export type {
  OrganizationList,
  OrganizationListData,
  Organization,
  Project,
  ProjectList,
  Component,
  ComponentList,
} from './types/types';

// Default export
import { ChoreoClient } from './core/client';
export default ChoreoClient;
