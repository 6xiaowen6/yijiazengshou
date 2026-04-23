// API configuration and service functions
const API_BASE_URL = 'http://localhost:3001/api';

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  message?: string;
}

export interface CalculationRules {
  demandRules: Array<{
    range: string;
    factor: number;
    description: string;
  }>;
  timeSlotRules: Array<{
    slot: string;
    factor: number;
    description: string;
  }>;
  mileageRules: Array<{
    range: string;
    factor: number;
    description: string;
  }>;
  weatherRules: Array<{
    condition: string;
    factor: number;
    description: string;
  }>;
}

export interface EarningsCalculation {
  originalCommissionRate: number;
  originalCommission: number;
  originalIncome: number;
  demandFactor: number;
  timeSlotFactor: number;
  mileageFactor: number;
  weatherFactor: number;
  newCommissionRate: number;
  newCommission: number;
  newIncome: number;
  earnings: number;
  earningsRate: number;
}

// API service class
class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Authentication APIs
  async sendVerificationCode(phone: string): Promise<ApiResponse> {
    return this.request('/auth/sendCode', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    });
  }

  async login(phone: string, code: string): Promise<AuthResponse> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ phone, code }),
    });
  }

  // Calculation APIs
  async getCalculationRules(): Promise<ApiResponse<CalculationRules>> {
    return this.request('/calculate/rules');
  }

  async calculateEarnings(data: {
    distance: number;
    revenue: number;
    timeSlot: string;
    weather: string;
  }): Promise<ApiResponse<EarningsCalculation>> {
    return this.request('/calculate/earnings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Health check
  async healthCheck(): Promise<ApiResponse> {
    return this.request('/health', {
      method: 'GET',
    });
  }
}

// Create and export API service instance
export const apiService = new ApiService(API_BASE_URL);

// Export types
export type { ApiService };