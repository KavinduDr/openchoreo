import { apiRequest, ApiConfig } from '../core/config';
import { Deployment, DeploymentList } from '../types/types';

export interface DeploymentsApi {
  listComponentDeployments(
    projectName: string, 
    componentName: string, 
    config?: ApiConfig
  ): Promise<DeploymentList>;
  
  getDeployment(
    projectName: string, 
    componentName: string, 
    deploymentName: string, 
    config?: ApiConfig
  ): Promise<Deployment>;
}

export const deploymentsApi: DeploymentsApi = {
  /**
   * List component deployments
   * @param projectName - Name of the project
   * @param componentName - Name of the component
   * @param config - Optional API configuration
   * @returns Promise<DeploymentList> - List of deployments for the component
   */
  async listComponentDeployments(
    projectName: string, 
    componentName: string, 
    config?: ApiConfig
  ): Promise<DeploymentList> {
    const encodedProjectName = encodeURIComponent(projectName);
    const encodedComponentName = encodeURIComponent(componentName);
    return apiRequest<DeploymentList>(
      `/api/v1/projects/${encodedProjectName}/components/${encodedComponentName}/deployments`, 
      { method: 'GET' }, 
      config
    );
  },

  /**
   * Get deployment details
   * @param projectName - Name of the project
   * @param componentName - Name of the component
   * @param deploymentName - Name of the deployment
   * @param config - Optional API configuration
   * @returns Promise<Deployment> - Deployment details
   */
  async getDeployment(
    projectName: string, 
    componentName: string, 
    deploymentName: string, 
    config?: ApiConfig
  ): Promise<Deployment> {
    const encodedProjectName = encodeURIComponent(projectName);
    const encodedComponentName = encodeURIComponent(componentName);
    const encodedDeploymentName = encodeURIComponent(deploymentName);
    return apiRequest<Deployment>(
      `/api/v1/projects/${encodedProjectName}/components/${encodedComponentName}/deployments/${encodedDeploymentName}`, 
      { method: 'GET' }, 
      config
    );
  },
}; 