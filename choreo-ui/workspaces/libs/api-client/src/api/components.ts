import {
  CreateComponentRequest,
  PromoteComponentRequest,
} from "@open-choreo/definitions";
import { apiRequest, type ApiConfig } from "../core/config";
import {
  type ComponentResponse,
  type ComponentList,
  type PromoteComponentResponse,
} from "../types/types";

export interface ComponentsApi {
  listProjectComponents(
    orgName: string,
    projectName: string,
    config?: ApiConfig,
  ): Promise<ComponentList>;
  getComponent(
    orgName: string,
    projectName: string,
    componentName: string,
    config?: ApiConfig,
  ): Promise<ComponentResponse>;
  createComponent(
    orgName: string,
    projectName: string,
    data: CreateComponentRequest,
    config?: ApiConfig,
  ): Promise<ComponentResponse>;
  promoteComponent(
    orgName: string,
    projectName: string,
    componentName: string,
    data: PromoteComponentRequest,
    config?: ApiConfig,
  ): Promise<PromoteComponentResponse>;
}

export const componentsApi: ComponentsApi = {
  /**
   * List project components
   * @param orgName - Name of the organization
   * @param projectName - Name of the project
   * @param config - Optional API configuration
   * @returns Promise<ComponentList> - List of components in the project
   */
  async listProjectComponents(
    orgName: string,
    projectName: string,
    config?: ApiConfig,
  ): Promise<ComponentList> {
    const encodedProjectName = encodeURIComponent(projectName);
    return apiRequest<ComponentList>(
      `/api/v1/orgs/${orgName}/projects/${encodedProjectName}/components`,
      { method: "GET" },
      config,
    );
  },

  /**
   * Get component details
   * @param orgName - Name of the organization
   * @param projectName - Name of the project
   * @param componentName - Name of the component
   * @param config - Optional API configuration
   * @returns Promise<ComponentResponse> - Component details
   */
  async getComponent(
    orgName: string,
    projectName: string,
    componentName: string,
    config?: ApiConfig,
  ): Promise<ComponentResponse> {
    const encodedProjectName = encodeURIComponent(projectName);
    const encodedComponentName = encodeURIComponent(componentName);
    return apiRequest<ComponentResponse>(
      `/api/v1/orgs/${orgName}/projects/${encodedProjectName}/components/${encodedComponentName}`,
      { method: "GET" },
      config,
    );
  },

  async createComponent(
    orgName: string,
    projectName: string,
    data: CreateComponentRequest,
    config?: ApiConfig,
  ): Promise<ComponentResponse> {
    const encodedProjectName = encodeURIComponent(projectName);
    return apiRequest<ComponentResponse>(
      `/api/v1/orgs/${orgName}/projects/${encodedProjectName}/components`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
      config,
    );
  },

  /**
   * Promote component to next environment
   * @param orgName - Name of the organization
   * @param projectName - Name of the project
   * @param componentName - Name of the component
   * @param data - Promotion request data with source and target environments
   * @param config - Optional API configuration
   * @returns Promise<PromoteComponentResponse> - List of created bindings for target environment(s)
   */
  async promoteComponent(
    orgName: string,
    projectName: string,
    componentName: string,
    data: PromoteComponentRequest,
    config?: ApiConfig,
  ): Promise<PromoteComponentResponse> {
    const encodedProjectName = encodeURIComponent(projectName);
    const encodedComponentName = encodeURIComponent(componentName);
    return apiRequest<PromoteComponentResponse>(
      `/api/v1/orgs/${orgName}/projects/${encodedProjectName}/components/${encodedComponentName}/promote`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
      config,
    );
  },
};
