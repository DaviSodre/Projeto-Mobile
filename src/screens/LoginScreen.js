import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Importando o gradiente
import { loginUser } from '../api'; 
import { useNavigation } from '@react-navigation/native';
import * as Crypto from 'expo-crypto'; 

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigation = useNavigation(); 

  const encryptPassword = async (password) => {
    const hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
    return hash;
  };

  const handleLogin = async () => {
    try {
      const encryptedPassword = await encryptPassword(password);
      const response = await loginUser(email, encryptedPassword);
      setMessage(response.message);
      navigation.navigate('Home'); 
    } catch (error) {
      setMessage(error.message); 
    }
  };

  return (
    <LinearGradient colors={['#87CEFA', '#1E90FF']} style={styles.container}> 
      

      <View style={styles.loginContainer}>
      <Text style={styles.title}>Festas Encantadas & Cia</Text>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          placeholder="Digite sua senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
      </View>

      
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#000', // Mudando a cor do texto para branco
  },
  loginContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fundo branco com leve transparência
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // Para Android
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginBottom: 8,
    color: '#000',
  },
  input: {
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,  // Para Android
  },
  button: {
    backgroundColor: '#1E90FF', // Azul escuro
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default LoginScreen;
