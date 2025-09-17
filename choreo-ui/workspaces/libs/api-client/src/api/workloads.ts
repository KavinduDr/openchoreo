import { WorkloadSpec } from "@open-choreo/definitions";
import { apiRequest, type ApiConfig } from "../core/config";
import type { WorkloadList, WorkloadResponse } from "../types/types";

export interface WorkloadsApi {
  listWorkloads(
    orgName: string,
    projectName: string,
    componentName: string,
    config?: ApiConfig,
  ): Promise<WorkloadList>;
  createWorkload(
    orgName: string,
    projectName: string,
    componentName: string,
    data: WorkloadSpec,
    config?: ApiConfig,
  ): Promise<WorkloadResponse>;
}

export const workloadsApi: WorkloadsApi = {
  /**
   * Get all workloads for a component
   * @param orgName - Name of the organization
   * @param projectName - Name of the project
   * @param componentName - Name of the component
   * @param config - Optional API configuration
   * @returns Promise<WorkloadList> - List of workloads for the component
   */
  async listWorkloads(
    orgName: string,
    projectName: string,
    componentName: string,
    config?: ApiConfig,
  ): Promise<WorkloadList> {
    const encodedOrgName = encodeURIComponent(orgName);
    const encodedProjectName = encodeURIComponent(projectName);
    const encodedComponentName = encodeURIComponent(componentName);
    return apiRequest<WorkloadList>(
      `/api/v1/orgs/${encodedOrgName}/projects/${encodedProjectName}/components/${encodedComponentName}/workloads`,
      { method: "GET" },
      config,
    );
  },

  /**
   * Create a new workload for a component
   * @param orgName - Name of the organization
   * @param projectName - Name of the project
   * @param componentName - Name of the component
   * @param data - Workload data to create
   * @param config - Optional API configuration
   * @returns Promise<WorkloadResponse> - Created workload details
   */
  async createWorkload(
    orgName: string,
    projectName: string,
    componentName: string,
    data: WorkloadSpec,
    config?: ApiConfig,
  ): Promise<WorkloadResponse> {
    const encodedOrgName = encodeURIComponent(orgName);
    const encodedProjectName = encodeURIComponent(projectName);
    const encodedComponentName = encodeURIComponent(componentName);
    return apiRequest<WorkloadResponse>(
      `/api/v1/orgs/${encodedOrgName}/projects/${encodedProjectName}/components/${encodedComponentName}/workloads`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      },
      config,
    );
  },
};
