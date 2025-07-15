import { ComponentItem, type ProjectItem, type Resource } from "../types/resource";

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

export function getResourceDeploymentPipeline(resource: ProjectItem) {
  return resource?.deploymentPipeline || "";
}

export function getResourceName(resource: Resource) {
  return resource?.name || "";
}

export function getComponentType(component: ComponentItem) {
  return component?.type || "";
}