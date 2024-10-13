import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import { loginUser } from '../api'; 
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState(''); // Email permanece como está
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigation = useNavigation(); 

  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password); // Passando email
      setMessage(response.message);
      navigation.navigate('Home'); 
    } catch (error) {
      setMessage(error.message); 
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email" // Placeholder continua Email
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
