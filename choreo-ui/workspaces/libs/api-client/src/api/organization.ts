import { apiRequest, ApiConfig } from '../core/config';
import { type OrganizationList } from '../types/types';

export interface OrganizationApi {
  listOrganizations(config?: ApiConfig): Promise<OrganizationList>;
}

export const organizationApi: OrganizationApi = {
  async listOrganizations(config?: ApiConfig): Promise<OrganizationList> {
    return apiRequest<OrganizationList>(`/api/v1/orgs`, { method: 'GET' }, config);
  },
}; 