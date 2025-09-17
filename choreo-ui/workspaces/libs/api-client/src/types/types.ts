import {
  type Organization as OrganizationDef,
  type Project as ProjectDef,
  type Component as ComponentDef,
  BuildPlane,
  Build,
  Binding,
  DeploymentPipeline,
  WorkloadSpec,
  Environment,
  DataPlane,
  ComponentObserver,
  ApplyResourceResponse,
  DeleteResourceResponse,
} from "@open-choreo/definitions";

export interface OrganizationListData {
  items: OrganizationDef[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface OrganizationList {
  success: boolean;
  data: OrganizationListData;
}

export interface OrganizationResponse {
  success: boolean;
  data: OrganizationDef;
}

export interface ProjectListData {
  items: ProjectDef[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface ProjectList {
  success: boolean;
  data: ProjectListData;
}

export interface ProjectResponse {
  success: boolean;
  data: ProjectDef;
}

export interface ComponentResponse {
  success: boolean;
  data: ComponentDef;
}

export interface ComponentListData {
  items: ComponentDef[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface ComponentList {
  success: boolean;
  data: ComponentListData;
}

export interface BuildPlaneListData {
  items: BuildPlane[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface BuildPlaneList {
  success: boolean;
  data: BuildPlaneListData;
}

export interface BuildListData {
  items: Build[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface BuildList {
  success: boolean;
  data: BuildListData;
}

export interface ComponentBindingListData {
  items: Binding[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface ComponentBindingList {
  success: boolean;
  data: ComponentBindingListData;
}

export interface ComponentBindingResponse {
  success: boolean;
  data: Binding;
}

export interface DeploymentPipelineResponse {
  success: boolean;
  data: DeploymentPipeline;
}

export interface WorkloadListData {
  items: WorkloadSpec[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface WorkloadList {
  success: boolean;
  data: WorkloadListData;
}

export interface WorkloadResponse {
  success: boolean;
  data: WorkloadSpec;
}

export interface EnvironmentListData {
  items: Environment[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface EnvironmentList {
  success: boolean;
  data: EnvironmentListData;
}

export interface EnvironmentResponse {
  success: boolean;
  data: Environment;
}

export interface DataPlaneListData {
  items: DataPlane[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface DataPlaneList {
  success: boolean;
  data: DataPlaneListData;
}

export interface DataPlaneResponse {
  success: boolean;
  data: DataPlane;
}

export interface ComponentObserverResponse {
  success: boolean;
  data: ComponentObserver;
}

export interface ApplyResponse {
  success: boolean;
  data: ApplyResourceResponse;
}

export interface DeleteResponse {
  success: boolean;
  data: DeleteResourceResponse;
}

// Promote Component Response - returns list of created bindings
export interface PromoteComponentResponse {
  success: boolean;
  data: ComponentBindingListData;
}
