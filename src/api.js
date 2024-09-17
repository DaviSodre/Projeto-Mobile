import axios from 'axios';

// Defina a URL do seu backend aqui
const API_URL = 'http://localhost:5000';

// Função para registrar um usuário
export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, password });
    return response.data; // Dados da resposta do servidor
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao registrar');
  }
};

// Função para fazer login
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data; // Dados da resposta do servidor, incluindo o token
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao fazer login');
  }
};
