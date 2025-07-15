import { ApiConfig, defaultConfig } from './config';
import { projectsApi, type ProjectsApi } from '../api/projects';
import { componentsApi, type ComponentsApi } from '../api/components';
import { organizationApi, type OrganizationApi } from '../api/organization';

export interface ChoreoApiClient extends ProjectsApi, ComponentsApi, OrganizationApi {
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
    console.log("configs", this.config);
    this.config = { ...this.config, ...config };
  }

  // Projects API methods
  listProjects = (orgName: string) => projectsApi.listProjects(orgName, this.config);
  getProject = (orgName: string, projectName: string) => projectsApi.getProject(orgName, projectName, this.config);

  // Components API methods
  listProjectComponents = (orgName: string, projectName: string) => componentsApi.listProjectComponents(orgName, projectName, this.config);
  getComponent = (orgName: string, projectName: string, componentName: string) => componentsApi.getComponent(orgName, projectName, componentName, this.config);

  // Organization API methods
  listOrganizations = () => organizationApi.listOrganizations(this.config);
} 