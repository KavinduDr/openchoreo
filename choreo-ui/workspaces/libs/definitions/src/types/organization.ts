// Organization-related types based on OpenAPI schema

export interface Organization {
  name: string;
  displayName: string;
  description: string;
  namespace: string;
  createdAt: string;
  status: string;
}

export interface ListOrganization {
  items: Organization[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface DataPlane {
  name: string;
  namespace: string;
  displayName: string;
  description: string;
  registryPrefix: string;
  registrySecretRef: string;
  kubernetesClusterName: string;
  apiServerURL: string;
  publicVirtualHost: string;
  organizationVirtualHost: string;
  observerURL: string;
  observerUsername: string;
  createdAt: string;
  status: string;
}

export interface ListDataPlane {
  items: DataPlane[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface Environment {
  name: string;
  namespace: string;
  displayName: string;
  description: string;
  dataPlaneRef: string;
  isProduction: boolean;
  dnsPrefix: string;
  createdAt: string;
  status: string;
}

export interface ListEnvironment {
  items: Environment[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface BuildPlane {
  name: string;
  namespace: string;
  displayName: string;
  description: string;
  kubernetesClusterName: string;
  apiServerURL: string;
  observerURL: string;
  observerUsername: string;
  createdAt: string;
  status: string;
}

export interface BuildTemplate {
  name: string;
  parameters: BuildTemplateParameter[];
  createdAt: string;
}

export interface BuildTemplateParameter {
  name: string;
  default: string;
}

export interface ListBuildTemplate {
  items: BuildTemplate[];
  totalCount: number;
  page: number;
  pageSize: number;
}

// Create requests for organization-related resources
export interface CreateDataPlaneRequest {
  name: string;
  displayName?: string;
  description?: string;
  registryPrefix: string;
  registrySecretRef?: string;
  kubernetesClusterName: string;
  apiServerURL: string;
  caCert: string;
  clientCert: string;
  clientKey: string;
  publicVirtualHost: string;
  organizationVirtualHost: string;
  observerURL?: string;
  observerUsername?: string;
  observerPassword?: string;
}

export interface CreateEnvironmentRequest {
  name: string;
  displayName?: string;
  description?: string;
  dataPlaneRef?: string;
  isProduction: boolean;
  dnsPrefix?: string;
}
