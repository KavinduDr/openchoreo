import { apiRequest, ApiConfig } from '../core/config';
import { Project, ProjectList } from '../types/types';

export interface ProjectsApi {
  listProjects(config?: ApiConfig): Promise<ProjectList>;
  getProject(projectName: string, config?: ApiConfig): Promise<Project>;
}

export const projectsApi: ProjectsApi = {
  /**
   * List all projects
   * @param config - Optional API configuration
   * @returns Promise<ProjectList> - List of all projects
   */
  async listProjects(config?: ApiConfig): Promise<ProjectList> {
    return apiRequest<ProjectList>('/api/v1/projects', { method: 'GET' }, config);
  },

  /**
   * Get project details
   * @param projectName - Name of the project
   * @param config - Optional API configuration
   * @returns Promise<Project> - Project details
   */
  async getProject(projectName: string, config?: ApiConfig): Promise<Project> {
    const encodedProjectName = encodeURIComponent(projectName);
    return apiRequest<Project>(`/api/v1/projects/${encodedProjectName}`, { method: 'GET' }, config);
  },
}; 