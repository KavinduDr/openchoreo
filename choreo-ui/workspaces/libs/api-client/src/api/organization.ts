import { apiRequest } from '../core/config';
import type { ApiConfig } from '../core/config';
import { type OrganizationList } from '../types/types';

export interface OrganizationApi {
  listOrganizations(config?: ApiConfig): Promise<OrganizationList>;
  getOrganization(orgHandle: string, config?: ApiConfig): Promise<Organization>;
}

export const organizationApi: OrganizationApi = {
  async listOrganizations(config?: ApiConfig): Promise<OrganizationList> {
    return apiRequest<OrganizationList>(`/api/v1/orgs`, { method: 'GET' }, config);
  },
  
  async getOrganization(orgHandle: string, config?: ApiConfig): Promise<Organization> {
    return apiRequest<Organization>(`/api/v1/orgs/${orgHandle}`, { method: 'GET' }, config);
  },
}; 

