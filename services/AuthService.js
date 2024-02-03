import axios from 'axios';
import { baseUrl } from '../ENV';

const AuthService = {
  register: async (userData) => {
    try {
      const response = await axios.post(`${baseUrl}/user/signup`, userData);
      return response.data;
    } catch (error) {
      throw new Error(error.messagge || 'Error en la solicitud de registro');
    }
  },
  login: async (email, password) => {
    try {
      const response = await axios.post(`${baseUrl}/user/login`, {
        email,
        password,
      });

      if (!response.data || !response.data.token) {
        throw new Error('Token no encontrado en la respuesta');
      }

      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response?.data?.error || 'Error en el inicio de sesión');
     
    }
  }
};

export default AuthService;