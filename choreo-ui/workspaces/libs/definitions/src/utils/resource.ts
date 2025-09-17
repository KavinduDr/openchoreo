import {
  type Build,
  type Component,
  type Project,
  type Organization,
  type Binding,
  BuildStatus,
  BindingStatus,
  ReleaseState,
} from "../types";

// Union type for all resource types
export type Resource = Organization | Project | Component;

export function getResourceDisplayName(resource: Resource) {
  return resource?.displayName || resource?.name;
}

export function getResourceDescription(resource: Resource) {
  return resource?.description || "";
}

export function getResourceCreatedAt(resource: Resource) {
  return resource?.createdAt || "";
}

export function getResourceStatus(resource: Resource) {
  return resource?.status || "";
}

export function getResourceDeploymentPipeline(resource: Project) {
  return resource?.deploymentPipeline || "";
}

export function getResourceName(resource: Resource) {
  return resource?.name || "";
}

export function getComponentType(component: Component) {
  return component?.type || "";
}

export function isBindingInProgress(binding: Binding) {
  return binding.status.status === BindingStatus.IN_PROGRESS;
}

export function isBuildInProgress(build: Build) {
  return build.status === BuildStatus.IN_PROGRESS;
}

export function isReleaseStateActive(releaseState: ReleaseState) {
  return releaseState === ReleaseState.ACTIVE;
}
