import axios from 'axios';
import { baseUrl } from '../ENV';

const AuthService = {
  register: async (userData) => {
    try {
      const response = await axios.post(`${baseUrl}/user/signup`, userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error en la solicitud de registro');
    }
  },
};

export default AuthService;