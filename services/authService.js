import axios from 'axios';
import { API_URL } from './ConfigService';



const authService = {
  login: async (credentials) => {
    try {
      console.log("est ; ",credentials)

      const response = await axios.post(`${API_URL}/auth/connexion`, credentials);
      console.log("data ; ",response.data)

      return response.data;
    } catch (error) {
      console.log('Error logging in:', error);
      throw error;
    }
  },
  registre: async (credentials) => {
    try {
      console.log("est Registre; ",credentials)

      const response = await axios.post(`${API_URL}/auth/inscreption`, credentials);
      console.log("data ; ",response.data)

      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },
 /*  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/inscreption`, userData);
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }, */
};

export default authService;
