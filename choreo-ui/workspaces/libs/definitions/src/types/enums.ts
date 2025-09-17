// All enum types used across the application

// Binding and deployment related enums
export enum BindingStatus {
  IN_PROGRESS = "InProgress",
  ACTIVE = "Active",
  FAILED = "Failed",
  SUSPENDED = "Suspended",
  NOT_YET_DEPLOYED = "NotYetDeployed",
}

export enum ReleaseState {
  ACTIVE = "Active",
  SUSPEND = "Suspend",
  UNDEPLOY = "Undeploy",
}

// Build related enums
export enum BuildStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  FAILED = "failed",
}

// Workload endpoint types
export enum WorkloadEndpointType {
  HTTP = "HTTP",
  REST = "REST",
  GRPC = "gRPC",
  GRAPHQL = "GraphQL",
  WEBSOCKET = "Websocket",
  TCP = "TCP",
  UDP = "UDP",
}

// Workload connection types
export enum WorkloadConnectionType {
  API = "api",
}

// Apply/Delete operation results
export enum ResourceOperation {
  CREATED = "created",
  UPDATED = "updated",
  UNCHANGED = "unchanged",
  DELETED = "deleted",
  NOT_FOUND = "not_found",
}

// Observer connection method types
export enum ObserverConnectionType {
  BASIC_AUTH = "basic_auth",
  BEARER_TOKEN = "bearer_token",
}
