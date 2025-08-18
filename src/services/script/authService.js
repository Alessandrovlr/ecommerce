// services/authService.js
import axios from 'axios';

export const loginService = async (username, password) => {
  try {
    const response = await axios.get('http://localhost:3000/login', {
      nome: username,
      senha: password,
    });

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Erro ao fazer login.',
    };
  }
};
