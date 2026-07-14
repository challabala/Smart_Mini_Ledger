import axiosInstance from './axiosInstance';

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
      id: string;
      fullName: string;
      email: string;
      createdAt: string;
    };
  };
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
      id: string;
      fullName: string;
      email: string;
      createdAt: string;
    };
  };
}

export interface MeResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      fullName: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export const authApi = {
  async register(data: any): Promise<RegisterResponse> {
    const res = await axiosInstance.post<RegisterResponse>('/auth/register', data);
    return res.data;
  },

  async login(data: any): Promise<LoginResponse> {
    const res = await axiosInstance.post<LoginResponse>('/auth/login', data);
    return res.data;
  },

  async logout(): Promise<void> {
    await axiosInstance.post('/auth/logout');
  },

  async getMe(): Promise<MeResponse> {
    const res = await axiosInstance.get<MeResponse>('/auth/me');
    return res.data;
  }
};
