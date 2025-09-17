import { bindingsApi, type BindingsApi } from "../api/bindings";
import { BuildsApi, buildsApi } from "../api/build";
import { componentsApi, type ComponentsApi } from "../api/components";
import { dataPlanesApi, type DataPlanesApi } from "../api/dataplanes";
import {
  deploymentPipelineApi,
  type DeploymentPipelineApi,
} from "../api/deployment-pipeline";
import { environmentsApi, type EnvironmentsApi } from "../api/environents";
import { healthApi, type HealthApi } from "../api/health";
import { observerApi, type ObserverApi } from "../api/observer";
import { organizationApi, type OrganizationApi } from "../api/organization";
import { projectsApi, type ProjectsApi } from "../api/projects";
import { resourceOpsApi, type ResourceOpsApi } from "../api/resource-ops";
import { workloadsApi, type WorkloadsApi } from "../api/workloads";
import { type ApiConfig, defaultConfig } from "./config";

export interface ChoreoApiClient
  extends ProjectsApi,
  ComponentsApi,
  OrganizationApi,
  BindingsApi,
  BuildsApi,
  DeploymentPipelineApi,
  WorkloadsApi,
  EnvironmentsApi,
  DataPlanesApi,
  ObserverApi,
  HealthApi,
  ResourceOpsApi {
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

  // Projects API methods
  listProjects = (orgName: string) =>
    projectsApi.listProjects(orgName, this.config);
  getProject = (orgName: string, projectName: string) =>
    projectsApi.getProject(orgName, projectName, this.config);
  createProject = (
    orgName: string,
    data: Parameters<typeof projectsApi.createProject>[1],
  ) => projectsApi.createProject(orgName, data, this.config);

  // Components API methods
  listProjectComponents = (orgName: string, projectName: string) =>
    componentsApi.listProjectComponents(orgName, projectName, this.config);
  getComponent = (
    orgName: string,
    projectName: string,
    componentName: string,
  ) =>
    componentsApi.getComponent(
      orgName,
      projectName,
      componentName,
      this.config,
    );
  createComponent = (
    orgName: string,
    projectName: string,
    data: Parameters<typeof componentsApi.createComponent>[2],
  ) => componentsApi.createComponent(orgName, projectName, data, this.config);
  promoteComponent = (
    orgName: string,
    projectName: string,
    componentName: string,
    data: Parameters<typeof componentsApi.promoteComponent>[3],
  ) =>
    componentsApi.promoteComponent(
      orgName,
      projectName,
      componentName,
      data,
      this.config,
    );

  // Organization API methods
  listOrganizations = () => organizationApi.listOrganizations(this.config);
  getOrganization = (orgHandle: string) =>
    organizationApi.getOrganization(orgHandle, this.config);
  listBuildPlanes = (orgName: string) =>
    buildsApi.listBuildPlanes(orgName, this.config);
  listBuilds = (orgName: string, projectName: string, componentName: string) =>
    buildsApi.listBuilds(orgName, projectName, componentName, this.config);
  postBuild = (
    orgName: string,
    projectName: string,
    componentName: string,
    commit?: string,
  ) =>
    buildsApi.postBuild(
      orgName,
      projectName,
      componentName,
      commit,
      this.config,
    );

  // Bindings API methods
  listComponentBindings = (
    orgName: string,
    projectName: string,
    componentName: string,
    environments?: string[],
  ) =>
    bindingsApi.listComponentBindings(
      orgName,
      projectName,
      componentName,
      environments,
      this.config,
    );
  updateComponentBinding = (
    orgName: string,
    projectName: string,
    componentName: string,
    bindingName: string,
    data: Parameters<typeof bindingsApi.updateComponentBinding>[4],
  ) =>
    bindingsApi.updateComponentBinding(
      orgName,
      projectName,
      componentName,
      bindingName,
      data,
      this.config,
    );

  // Deployment Pipeline API methods
  getDeploymentPipeline = (orgName: string, projectName: string) =>
    deploymentPipelineApi.getDeploymentPipeline(
      orgName,
      projectName,
      this.config,
    );

  // Workloads API methods
  listWorkloads = (
    orgName: string,
    projectName: string,
    componentName: string,
  ) =>
    workloadsApi.listWorkloads(
      orgName,
      projectName,
      componentName,
      this.config,
    );
  createWorkload = (
    orgName: string,
    projectName: string,
    componentName: string,
    data: Parameters<typeof workloadsApi.createWorkload>[3],
  ) =>
    workloadsApi.createWorkload(
      orgName,
      projectName,
      componentName,
      data,
      this.config,
    );

  // Environments API methods
  listEnvironments = (orgName: string) =>
    environmentsApi.listEnvironments(orgName, this.config);
  createEnvironment = (
    orgName: string,
    data: Parameters<typeof environmentsApi.createEnvironment>[1],
  ) => environmentsApi.createEnvironment(orgName, data, this.config);
  getEnvironment = (orgName: string, envName: string) =>
    environmentsApi.getEnvironment(orgName, envName, this.config);

  // DataPlanes API methods
  listDataPlanes = (orgName: string) =>
    dataPlanesApi.listDataPlanes(orgName, this.config);
  createDataPlane = (
    orgName: string,
    data: Parameters<typeof dataPlanesApi.createDataPlane>[1],
  ) => dataPlanesApi.createDataPlane(orgName, data, this.config);
  getDataPlane = (orgName: string, dpName: string) =>
    dataPlanesApi.getDataPlane(orgName, dpName, this.config);

  // Observer API methods
  getRuntimeObserverUrl = (
    orgName: string,
    projectName: string,
    componentName: string,
    environmentName: string,
  ) =>
    observerApi.getRuntimeObserverUrl(
      orgName,
      projectName,
      componentName,
      environmentName,
      this.config,
    );
  getBuildObserverUrl = (
    orgName: string,
    projectName: string,
    componentName: string,
  ) =>
    observerApi.getBuildObserverUrl(
      orgName,
      projectName,
      componentName,
      this.config,
    );

  // Health API methods
  health = () => healthApi.health(this.config);
  ready = () => healthApi.ready(this.config);

  // Resource Ops methods
  applyResource = (body: Parameters<typeof resourceOpsApi.applyResource>[0]) =>
    resourceOpsApi.applyResource(body, this.config);
  deleteResource = (
    body: Parameters<typeof resourceOpsApi.deleteResource>[0],
  ) => resourceOpsApi.deleteResource(body, this.config);
}
