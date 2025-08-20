import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export interface User {
  password: string;
  id: number;
  name: string;
  email: string;
  activate: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const authService = {
  async login(data: LoginData): Promise<{ user?: User; error?: string }> {
    try {
      const response = await api.get(`/users?activate=all`);
      const users: User[] = response.data;
      
      const user = users.find(u => u.email === data.email);
      
      if (!user) {
        return { error: 'Usuário não encontrado. Por favor, cadastre-se.' };
      }

      if (user.password !== data.password) {
        return { error: 'Senha incorreta. Tente novamente.' };
      }
      
      if (!user.activate) {
        return { error: 'Usuário desativado. Entre em contato com o suporte.' };
      }
      
      return { user };
    } catch (error) {
      return { error: 'Erro ao fazer login. Tente novamente.' };
    }
  },

  async register(data: RegisterData): Promise<{ user?: User; error?: string }> {
    try {
      const response = await api.post('/users', data);
      return { user: response.data };
    } catch (error) {
      return { error: 'Erro ao fazer cadastro. Tente novamente.' };
    }
  }
};
