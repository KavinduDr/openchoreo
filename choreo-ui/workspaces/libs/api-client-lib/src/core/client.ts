import { ApiConfig, defaultConfig } from './config';
import { generalApi, GeneralApi } from '../api/general';
import { projectsApi, ProjectsApi } from '../api/projects';
import { componentsApi, ComponentsApi } from '../api/components';
import { deploymentsApi, DeploymentsApi } from '../api/deployments';

export interface ChoreoApiClient extends GeneralApi, ProjectsApi, ComponentsApi, DeploymentsApi {
  config: ApiConfig;
  setConfig(config: Partial<ApiConfig>): void;
}

export class ChoreoClient implements ChoreoApiClient {
  public config: ApiConfig;

  constructor(config: Partial<ApiConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
  }

  /**
   * Update the API configuration
   * @param config - Partial configuration to merge with current config
   */
  setConfig(config: Partial<ApiConfig>): void {
    this.config = { ...this.config, ...config };
  }

  // General API methods
  listEndpoints = generalApi.listEndpoints;

  // Projects API methods
  listProjects = projectsApi.listProjects;
  getProject = projectsApi.getProject;

  // Components API methods
  listProjectComponents = componentsApi.listProjectComponents;
  getComponent = componentsApi.getComponent;

  // Deployments API methods
  listComponentDeployments = deploymentsApi.listComponentDeployments;
  getDeployment = deploymentsApi.getDeployment;
} 