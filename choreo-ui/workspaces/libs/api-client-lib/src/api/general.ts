import { apiRequest, ApiConfig } from '../core/config';
import { EndpointsResponse } from '../types/types';

export interface GeneralApi {
  listEndpoints(config?: ApiConfig): Promise<EndpointsResponse>;
}

export const generalApi: GeneralApi = {
  /**
   * List available endpoints
   * @param config - Optional API configuration
   * @returns Promise<EndpointsResponse> - List of available API endpoints
   */
  async listEndpoints(config?: ApiConfig): Promise<EndpointsResponse> {
    return apiRequest<EndpointsResponse>('/', { method: 'GET' }, config);
  },
}; 