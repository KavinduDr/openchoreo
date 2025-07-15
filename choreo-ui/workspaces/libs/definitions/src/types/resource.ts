export interface OrganizationItem {
    name: string;
    createdAt: string;
    description: string;
    displayName: string;
    namespace: string;
    status: string;
  }
  
  
  export interface ProjectItem {
    createdAt: string;
    deploymentPipeline: string;
    description: string;
    displayName: string;
    name: string;
    orgName: string;
    status: string;
  }

  export interface ComponentItem {
    displayName: string;
    name: string;
    type: string;
    projectName: string;
    description: string;
    orgName: string;
    repositoryUrl: string;
    branch: string;
    createdAt: string;
    status: string;
  }

  export interface ComponentItem {
    displayName: string;
    name: string;
    type: string;
    projectName: string;
    description: string;
    orgName: string;
    repositoryUrl: string;
    branch: string;
    createdAt: string;
    status: string;
  }

  export type Resource = OrganizationItem | ProjectItem | ComponentItem;
  