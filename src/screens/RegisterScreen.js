import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import { registerUser } from '../api'; 
import { useNavigation } from '@react-navigation/native';
import * as Crypto from 'expo-crypto'; // Importando expo-crypto

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigation = useNavigation();

  // Função para criptografar a senha
  const encryptPassword = async (password) => {
    const hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
    return hash;
  };

  const handleRegister = async () => {
    try {
      // Criptografar a senha antes de registrar
      const encryptedPassword = await encryptPassword(password);

      // Envia o nome de usuário, email e senha criptografada para o backend
      const response = await registerUser(username, email, encryptedPassword);
      setMessage(response.message);

      // Navega para a tela de Login após o registro
      navigation.navigate('Login');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome de Usuário"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Registrar" onPress={handleRegister} />
      {/* Mensagem de erro ou sucesso */}
      {message ? <Text>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    width: '100%',
  },
});

export default RegisterScreen;
