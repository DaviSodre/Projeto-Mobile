import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        password,
      });
      Alert.alert('Sucesso', response.data.message);
      navigation.navigate('Home'); // Navegar para a tela inicial após registro
    } catch (error) {
      Alert.alert('Erro', error.response?.data?.message || 'Erro ao registrar');
    }
  };

  return (
    <View>
      <Text>Usuário:</Text>
      <TextInput value={username} onChangeText={setUsername} />
      <Text>Senha:</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Registrar" onPress={handleRegister} />
      <Button title="Já tenho conta" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default RegisterScreen;
