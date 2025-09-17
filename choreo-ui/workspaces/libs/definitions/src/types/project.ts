// Project-related types based on OpenAPI schema

export interface Project {
  name: string;
  orgName: string;
  displayName: string;
  description: string;
  deploymentPipeline: string;
  createdAt: string;
  status: string;
}

export interface ListProject {
  items: Project[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface DeploymentPipeline {
  name: string;
  displayName: string;
  description: string;
  orgName: string;
  createdAt: string;
  status: string;
  promotionPaths: PromotionPath[];
}

export interface PromotionPath {
  sourceEnvironmentRef: string;
  targetEnvironmentRefs: TargetEnvironmentRef[];
}

export interface TargetEnvironmentRef {
  name: string;
  requiresApproval: boolean;
  isManualApprovalRequired: boolean;
}

// Create requests for project-related resources
export interface CreateProjectRequest {
  name: string;
  displayName?: string;
  description?: string;
  deploymentPipeline?: string;
}
