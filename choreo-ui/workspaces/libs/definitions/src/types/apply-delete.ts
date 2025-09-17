export enum Operation {
  CREATED = "created",
  UPDATED = "updated",
  UNCHANGED = "unchanged",
  DELETED = "deleted",
  NOT_FOUND = "not_found",
}

export interface ApplyResourceResponse {
  apiVersion?: string;
  kind?: string;
  name?: string;
  namespace?: string;
  operation?: Operation;
}

export interface DeleteResourceResponse {
  apiVersion?: string;
  kind?: string;
  name?: string;
  namespace?: string;
  operation?: Operation;
}
