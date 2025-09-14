const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    retryCount = 0
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    };

    // If body is FormData, remove the Content-Type header
    // and let the browser set it automatically with the correct boundary.
    if (config.body instanceof FormData) {
      delete (config.headers as Record<string, string>)['Content-Type'];
    }

    // Add auth token if available
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data; // The backend already sends a consistent ApiResponse format
    } catch (error) {
      console.error('API request failed:', error instanceof Error ? error.message : error);

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  // Auth endpoints
  async register(userData: {
    fullname: string;
    username: string;
    email: string;
    password: string;
    avatar?: File;
  }): Promise<ApiResponse> {
    const formData = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value);
      }
    });

    return this.request('/auth/signup', {
      method: 'POST',
      body: formData,
    });
  }

  async login(credentials: {
    emailOrUsername: string;
    password: string;
  }): Promise<ApiResponse> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
       credentials: 'include'
    });
  }

  async logout(): Promise<ApiResponse> {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // File upload utility
  async uploadFile(file: File, folder: string = 'general'): Promise<{ success: boolean; url?: string; error?: string }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    try {
      const response = await this.request('/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.success && response.data) {
        return { success: true, url: (response.data as any).url };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      return { success: false, error: 'Upload failed' };
    }
  }

  // Portfolio endpoints
  async getPortfolio(): Promise<ApiResponse> {
    return this.request(`/portfolios`, {credentials: 'include'});
  }

  async updatePortfolio(portfolioData: any): Promise<ApiResponse> {
    return this.request('/portfolios', {
      method: 'PUT',
      body: JSON.stringify(portfolioData),
    });
  }

  async browsePortfolios(params?: {
    page?: number;
    limit?: number;
    search?: string;
    skills?: string;
    userType?: string;
  }): Promise<ApiResponse> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const queryString = queryParams.toString();
    const endpoint = `/portfolios/browse${queryString ? `?${queryString}` : ''}`;

    return this.request(endpoint);
  }

  async getFeaturedPortfolios(): Promise<ApiResponse> {
    return this.request('/portfolios/featured');
  }

  // Project management
  async addProject(projectData: any): Promise<ApiResponse> {
    return this.request('/portfolios/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  }

  async updateProject(projectId: string, projectData: any): Promise<ApiResponse> {
    return this.request(`/portfolios/projects/${projectId}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    });
  }

  async deleteProject(projectId: string): Promise<ApiResponse> {
    return this.request(`/portfolios/projects/${projectId}`, {
      method: 'DELETE',
    });
  }

  // User endpoints
  async getCurrentUser(): Promise<ApiResponse> {
    // Backend exposes GET /api/users for current user
    return this.request('/users', {credentials: 'include' });
  }

  async updateUser(userData: any): Promise<ApiResponse> {
    // Backend expects PATCH /api/users
    return this.request('/users', {
      method: 'PATCH',
      body: JSON.stringify(userData),
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;