// Component-related types based on OpenAPI schema
import {
  BindingStatus,
  ReleaseState,
  WorkloadEndpointType,
  WorkloadConnectionType,
} from "./enums";

export interface Component {
  name: string;
  displayName: string;
  description: string;
  type: string;
  projectName: string;
  orgName: string;
  createdAt: string;
  status: string;
  buildConfig?: BuildConfig;
  service?: Record<string, unknown>;
  webApplication?: Record<string, unknown>;
  scheduledTask?: Record<string, unknown>;
  api?: Record<string, unknown>;
  workload?: WorkloadSpec;
}

export interface ListComponent {
  items: Component[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface BuildConfig {
  repoUrl?: string;
  repoBranch?: string;
  componentPath?: string;
  buildTemplateRef?: string;
  buildTemplateParams?: TemplateParameter[];
}

export interface TemplateParameter {
  name: string;
  value: string;
}

// Binding types
export interface Binding {
  name: string;
  type: string;
  componentName: string;
  projectName: string;
  orgName: string;
  environment: string;
  status: ComponentBindingStatus;
  serviceBinding?: ServiceBinding;
  webApplicationBinding?: WebApplicationBinding;
  scheduledTaskBinding?: ScheduledTaskBinding;
}

export interface ListBinding {
  items: Binding[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface ComponentBindingStatus {
  reason: string;
  message: string;
  status: BindingStatus;
  lastTransitioned: string;
}

export interface ServiceBinding {
  endpoints: EndpointStatus[];
  image: string;
  releaseState: string;
}

export interface WebApplicationBinding {
  endpoints: EndpointStatus[];
  image: string;
  releaseState: string;
}

export interface ScheduledTaskBinding {
  image: string;
  releaseState: string;
}

export interface EndpointStatus {
  name: string;
  type: string;
  project?: ExposedEndpoint;
  organization?: ExposedEndpoint;
  public?: ExposedEndpoint;
}

export interface ExposedEndpoint {
  host: string;
  port: number;
  scheme: string;
  basePath: string;
  uri: string;
}

// Build types
export interface Build {
  name: string;
  uuid: string;
  componentName: string;
  projectName: string;
  orgName: string;
  commit: string;
  status: string;
  createdAt: string;
  image: string;
}

export interface ListBuild {
  items: Build[];
  totalCount: number;
  page: number;
  pageSize: number;
}

// Observer types
export interface ComponentObserver {
  observerUrl: string;
  connectionMethod: ObserverConnectionMethod;
  message: string;
}

export interface ObserverConnectionMethod {
  type: string;
  username?: string;
  password?: string;
  bearerToken?: string;
}

// Workload types (OpenAPI compliant)
export interface WorkloadSpec {
  owner: WorkloadOwner;
  containers?: Record<string, Container>;
  endpoints?: Record<string, WorkloadEndpoint>;
  connections?: Record<string, WorkloadConnection>;
}

export interface WorkloadOwner {
  projectName: string;
  componentName: string;
}

export interface Container {
  image: string;
  command?: string[];
  args?: string[];
  env?: EnvVar[];
}

export interface EnvVar {
  name: string;
  value: string;
}

export interface WorkloadEndpoint {
  type: WorkloadEndpointType;
  port: number;
  schema?: Schema;
}

export interface Schema {
  type?: string;
  content?: string;
}

export interface WorkloadConnection {
  type: WorkloadConnectionType;
  params?: Record<"endpoint" | "projectName" | "componentName", string>;
  inject: WorkloadConnectionInject;
}

export interface WorkloadConnectionInject {
  env: WorkloadConnectionEnvVar[];
}

export interface WorkloadConnectionEnvVar {
  name: string;
  value: string;
}

// Create and update requests
export interface CreateComponentRequest {
  name: string;
  displayName?: string;
  description?: string;
  type: string;
  buildConfig?: BuildConfig;
}

export interface PromoteComponentRequest {
  sourceEnv: string;
  targetEnv: string;
}

export interface UpdateBindingRequest {
  releaseState: ReleaseState;
}
