import { apiRequest, ApiConfig } from '../core/config';
import { type Project, type ProjectList } from '../types/types';

export interface ProjectsApi {
  listProjects(orgName: string, config?: ApiConfig): Promise<ProjectList>;
  getProject(orgName: string, projectName: string, config?: ApiConfig): Promise<Project>;
}

export const projectsApi: ProjectsApi = {
  /**
   * List all projects
   * @param orgName - Name of the organization
   * @param config - Optional API configuration
   * @returns Promise<ProjectList> - List of all projects
   */
  async listProjects(orgName: string, config?: ApiConfig): Promise<ProjectList> {
    const encodedOrgName = encodeURIComponent(orgName);
    return apiRequest<ProjectList>(`/api/v1/orgs/${encodedOrgName}/projects`, { method: 'GET' }, config);
  },

  /**
   * Get project details
   * @param orgName - Name of the organization
   * @param projectName - Name of the project
   * @param config - Optional API configuration
   * @returns Promise<Project> - Project details
   */
  async getProject(orgName: string, projectName: string, config?: ApiConfig): Promise<Project> {
    const encodedProjectName = encodeURIComponent(projectName);
    const encodedOrgName = encodeURIComponent(orgName);
    return apiRequest<Project>(`/api/v1/orgs/${encodedOrgName}/projects/${encodedProjectName}`, { method: 'GET' }, config);
  },
}; 