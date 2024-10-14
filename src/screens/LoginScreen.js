import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import { loginUser } from '../api'; 
import { useNavigation } from '@react-navigation/native';
import * as Crypto from 'expo-crypto'; // Importando expo-crypto

const LoginScreen = () => {
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

  const handleLogin = async () => {
    try {
      // Criptografar a senha antes de tentar logar
      const encryptedPassword = await encryptPassword(password);

      // Envia o email e a senha criptografada para o backend
      const response = await loginUser(email, encryptedPassword);
      setMessage(response.message);
      navigation.navigate('Home'); 
    } catch (error) {
      setMessage(error.message); 
    }
  };

  return (
    <View style={styles.container}>
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
      <Button title="Login" onPress={handleLogin} />
      <Text></Text>
      <Button title="Registrar" onPress={() => navigation.navigate('Register')} />
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

export default LoginScreen;
