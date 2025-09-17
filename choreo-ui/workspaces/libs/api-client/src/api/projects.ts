import { CreateProjectRequest } from "@open-choreo/definitions";
import { apiRequest, type ApiConfig } from "../core/config";
import { type ProjectResponse, type ProjectList } from "../types/types";

export interface ProjectsApi {
  listProjects(orgName: string, config?: ApiConfig): Promise<ProjectList>;
  getProject(
    orgName: string,
    projectName: string,
    config?: ApiConfig,
  ): Promise<ProjectResponse>;
  createProject(
    orgName: string,
    data: CreateProjectRequest,
    config?: ApiConfig,
  ): Promise<ProjectResponse>;
}

export const projectsApi: ProjectsApi = {
  /**
   * List all projects
   * @param orgName - Name of the organization
   * @param config - Optional API configuration
   * @returns Promise<ProjectList> - List of all projects
   */
  async listProjects(
    orgName: string,
    config?: ApiConfig,
  ): Promise<ProjectList> {
    const encodedOrgName = encodeURIComponent(orgName);
    return apiRequest<ProjectList>(
      `/api/v1/orgs/${encodedOrgName}/projects`,
      { method: "GET" },
      config,
    );
  },

  /**
   * Get project details
   * @param orgName - Name of the organization
   * @param projectName - Name of the project
   * @param config - Optional API configuration
   * @returns Promise<ProjectResponse> - Project details
   */
  async getProject(
    orgName: string,
    projectName: string,
    config?: ApiConfig,
  ): Promise<ProjectResponse> {
    const encodedProjectName = encodeURIComponent(projectName);
    const encodedOrgName = encodeURIComponent(orgName);
    return apiRequest<ProjectResponse>(
      `/api/v1/orgs/${encodedOrgName}/projects/${encodedProjectName}`,
      { method: "GET" },
      config,
    );
  },

  /**
   * Create a new project
   */
  async createProject(
    orgName: string,
    data: CreateProjectRequest,
    config?: ApiConfig,
  ): Promise<ProjectResponse> {
    const encodedOrgName = encodeURIComponent(orgName);
    return apiRequest<ProjectResponse>(
      `/api/v1/orgs/${encodedOrgName}/projects`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
      config,
    );
  },
};
