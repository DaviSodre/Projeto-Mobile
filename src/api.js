import * as SecureStore from 'expo-secure-store';

// Função para registrar um usuário
export async function createUser(data) {
  try {
    // Armazena os dados do usuário no SecureStore
    await SecureStore.setItemAsync(data.username, JSON.stringify(data));
  } catch (error) {
    throw new Error('Erro ao registrar o usuário: ' + error.message);
  }
}

// Função para registrar um usuário
export const registerUser = async (username, email, password) => {
  try {
    const storedUsers = JSON.parse(await SecureStore.getItemAsync('users')) || {};

    // Verifica se o nome de usuário já existe
    if (storedUsers[username]) {
      throw new Error('Nome de usuário já existe');
    }

    // Verifica se o email já existe
    const emailExists = Object.values(storedUsers).some(user => user.email === email);
    if (emailExists) {
      throw new Error('Email já registrado');
    }

    // Armazena o novo usuário
    storedUsers[username] = { email, password };
    await SecureStore.setItemAsync('users', JSON.stringify(storedUsers));

    return { message: 'Usuário registrado com sucesso' };
  } catch (error) {
    throw new Error('Erro ao registrar o usuário: ' + error.message);
  }
};


// Login
// Função para fazer login
export const loginUser = async (username, password) => {
  try {
    const users = await SecureStore.getItemAsync('users');
    const parsedUsers = users ? JSON.parse(users) : {};

     // Log de verificação

    // Verifique se o usuário existe
    const userData = parsedUsers[username];

    if (userData) {
      // Compare a senha
      if (userData.password === password) {
        return { message: 'Login bem-sucedido' };
      } else {
        throw new Error('Credenciais incorretas');
      }
    } else {
      throw new Error('Usuário não encontrado');
    }
  } catch (error) {
    throw new Error('Erro ao fazer login: ' + error.message);
  }
};

// Função para limpar os dados de autenticação (opcional)
export const clearCredentials = async () => {
  try {
    await SecureStore.deleteItemAsync('username');
    await SecureStore.deleteItemAsync('email');
    await SecureStore.deleteItemAsync('password');
  } catch (error) {
    throw new Error('Erro ao limpar credenciais');
  }
};
