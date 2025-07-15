import { apiRequest, ApiConfig } from '../core/config';
import { type Component, type ComponentList } from '../types/types';

export interface ComponentsApi {
  listProjectComponents(orgName: string, projectName: string, config?: ApiConfig): Promise<ComponentList>;
  getComponent(orgName: string, projectName: string, componentName: string, config?: ApiConfig): Promise<Component>;
}

export const componentsApi: ComponentsApi = {
  /**
   * List project components
   * @param orgName - Name of the organization
   * @param projectName - Name of the project
   * @param config - Optional API configuration
   * @returns Promise<ComponentList> - List of components in the project
   */
  async listProjectComponents(orgName: string, projectName: string, config?: ApiConfig): Promise<ComponentList> {
    const encodedProjectName = encodeURIComponent(projectName);
    return apiRequest<ComponentList>(`/api/v1/orgs/${orgName}/projects/${encodedProjectName}/components`, { method: 'GET' }, config);
  },

  /**
   * Get component details
   * @param orgName - Name of the organization
   * @param projectName - Name of the project
   * @param componentName - Name of the component
   * @param config - Optional API configuration
   * @returns Promise<Component> - Component details
   */
  async getComponent(orgName: string, projectName: string, componentName: string, config?: ApiConfig): Promise<Component> {
    const encodedProjectName = encodeURIComponent(projectName);
    const encodedComponentName = encodeURIComponent(componentName);
    return apiRequest<Component>(`/api/v1/orgs/${orgName}/projects/${encodedProjectName}/components/${encodedComponentName}`, { method: 'GET' }, config);
  },
}; 