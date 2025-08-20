import { apiRequest, type ApiConfig } from "../core/config";
import { BuildList, type BuildPlaneList } from "../types/types";
import { type BuildPlane, type Build } from "@open-choreo/definitions";

export interface BuildsApi {
  listBuildPlanes(orgName: string, projectName: string, config?: ApiConfig): Promise<BuildPlaneList>;
  getBuildPlane(
    orgName: string,
    projectName: string,
    buildId: string,
    config?: ApiConfig
  ): Promise<{ success: boolean; data: BuildPlane }>;
  getBuild(
    orgName: string,
    projectName: string,
    buildId: string,
    config?: ApiConfig
  ): Promise<{ success: boolean; data: Build }>;
  listBuilds(
    orgName: string,
    projectName: string,
    config?: ApiConfig
  ): Promise<BuildList>;
}

export const buildsApi: BuildsApi = {
  /**
   * List all build planes
   * @param orgName - Name of the organization
   * @param projectName - Name of the project
   * @param config - Optional API configuration
   * @returns Promise<BuildPlaneList> - List of all build planes
   */
  async listBuildPlanes(
    orgName: string,
    projectName: string,
    config?: ApiConfig
  ): Promise<BuildPlaneList> {
    const encodedOrgName = encodeURIComponent(orgName);
    const encodedProjectName = encodeURIComponent(projectName);
    return apiRequest<BuildPlaneList>(
      `/api/v1/orgs/${encodedOrgName}/projects/${encodedProjectName}/build-planes`,
      { method: "GET" },
      config
    );
  },

  /**
   * Get build plane details
   * @param orgName - Name of the organization
   * @param projectName - Name of the project
   * @param buildId - ID of the build plane
   * @param config - Optional API configuration
   * @returns Promise<{ success: boolean; data: BuildPlane }> - Build plane details
   */
  async getBuildPlane(
    orgName: string,
    projectName: string,
    buildId: string,
    config?: ApiConfig
  ): Promise<{ success: boolean; data: BuildPlane }> {
    const encodedOrgName = encodeURIComponent(orgName);
    const encodedProjectName = encodeURIComponent(projectName);
    const encodedBuildId = encodeURIComponent(buildId);
    return apiRequest<{ success: boolean; data: BuildPlane }>(
      `/api/v1/orgs/${encodedOrgName}/projects/${encodedProjectName}/build-planes/${encodedBuildId}`,
      { method: "GET" },
      config
    );
  },

  /**
   * Get build details
   * @param orgName - Name of the organization
   * @param projectName - Name of the project
   * @param buildId - ID of the build
   * @param config - Optional API configuration
   * @returns Promise<{ success: boolean; data: Build }> - Build details
   */
  async getBuild(
    orgName: string,
    projectName: string,
    buildId: string,
    config?: ApiConfig
  ): Promise<{ success: boolean; data: Build }> {
    const encodedOrgName = encodeURIComponent(orgName);
    const encodedProjectName = encodeURIComponent(projectName);
    const encodedBuildId = encodeURIComponent(buildId);
    return apiRequest<{ success: boolean; data: Build }>(
      `/api/v1/orgs/${encodedOrgName}/projects/${encodedProjectName}/builds/${encodedBuildId}`,
      { method: "GET" },
      config
    );
  },

  /**
   * List all builds
   * @param orgName - Name of the organization
   * @param projectName - Name of the project
   * @param config - Optional API configuration
   * @returns Promise<BuildList> - List of all builds
   */
  async listBuilds(
    orgName: string,
    projectName: string,
    config?: ApiConfig
  ): Promise<BuildList> {
    const encodedOrgName = encodeURIComponent(orgName);
    const encodedProjectName = encodeURIComponent(projectName);
    return apiRequest<BuildList>(
      `/api/v1/orgs/${encodedOrgName}/projects/${encodedProjectName}/builds`,
      { method: "GET" },
      config
    );
  },
};
