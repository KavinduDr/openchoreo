export interface Condition {
  lastTransitionTime: string;
  message: string;
  observedGeneration: number;
  reason: string;
  status: string;
  type: string;
}

export interface Metadata {
  annotations?: {
    'core.choreo.dev/description'?: string;
    'core.choreo.dev/display-name'?: string;
  };
  name: string;
  namespace: string;
  labels?: {
    'core.choreo.dev/name'?: string;
    'core.choreo.dev/organization'?: string;
    'core.choreo.dev/project'?: string;
    'core.choreo.dev/component'?: string;
    'core.choreo.dev/deployment-track'?: string;
    'core.choreo.dev/environment'?: string;
  };
  continue?: string;
  resourceVersion?: string;
}

export interface Project {
  apiVersion: string;
  kind: string;
  metadata: Metadata;
  spec: {
    deploymentPipelineRef?: string;
  };
  status: {
    conditions: Condition[];
  };
}

export interface ProjectList {
  apiVersion: string;
  kind: string;
  items: Project[];
  metadata: Metadata;
}

export interface Component {
  apiVersion: string;
  kind: string;
  metadata: Metadata;
  spec: {
    source?: {
      gitRepository?: {
        url: string;
      };
      containerRegistry?: {
        imageName: string;
      };
    };
    type?: string;
  };
  status: {
    conditions: Condition[];
  };
}

export interface ComponentList {
  apiVersion: string;
  kind: string;
  items: Component[];
  metadata: Metadata;
}

export interface Deployment {
  apiVersion: string;
  kind: string;
  metadata: Metadata;
  spec: {
    deploymentArtifactRef?: string;
  };
  status: {
    conditions: Condition[];
  };
}

export interface DeploymentList {
  apiVersion: string;
  kind: string;
  items: Deployment[];
  metadata: Metadata;
}

export interface EndpointsResponse {
  paths: string[];
} 