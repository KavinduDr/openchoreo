import { type OrganizationItem, type ProjectItem, type ComponentItem } from "@open-choreo/definitions";

export interface OrganizationListData {
  items: OrganizationItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface OrganizationList {
  success: boolean;
  data: OrganizationListData;
}

export interface Organization {
  success: boolean;
  data: OrganizationItem;
}

export interface ProjectListData {
  items: ProjectItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface ProjectList {
  success: boolean;
  data: ProjectListData;
}

export interface Project {
  success: boolean;
  data: ProjectItem;
}

export interface Component {
  success: boolean;
  data: ComponentItem;
}


export interface ComponentListData {
  items: ComponentItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface ComponentList {
  success: boolean;
  data: ComponentListData;
}
