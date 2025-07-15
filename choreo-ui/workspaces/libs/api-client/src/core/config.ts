export interface ApiConfig {
  baseUrl: string;
  headers?: Record<string, string>;
}

export const defaultConfig: ApiConfig = {
  baseUrl: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
};

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string,
    public response?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiRequest<T>(
  url: string,
  options: RequestInit = {},
  config: ApiConfig = defaultConfig
): Promise<T> {
  const fullUrl = `${config.baseUrl}${url}`;
  const fetchOptions: RequestInit = {
    ...options,
    headers: {
      ...config.headers,
      ...options.headers,
    },
  };

  const response = await fetch(fullUrl, fetchOptions);

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    let responseData;
    
    try {
      responseData = await response.json();
      errorMessage = responseData.message || errorMessage;
    } catch {
      // If response is not JSON, use the default error message
    }

    throw new ApiError(errorMessage, response.status, response.statusText, responseData);
  }

  // Handle empty responses
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  
  return response.text() as T;
} 