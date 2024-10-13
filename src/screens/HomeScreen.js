import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { fetchLoggedUserData } from '../api'; // Importe a função que você criou para buscar os dados do usuário

const HomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  console.log('Nome de usuário armazenado:', username);
 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchLoggedUserData(); // Usa a nova função para buscar dados do usuário
        if (userData) {
          setUsername(userData.username); // Armazena o nome de usuário
          setName(userData.nome || ''); // Armazena o nome de usuário
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bem-vindo(a) {name}!</Text>
      <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Cadastro2', { username, title: 'Perfil' })}>
        <Icon name="person" size={30} color="#fff" />
        <Text style={styles.boxText}>Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Loja', {username})}>
        <Icon name="store" size={30} color="#fff" /> 
        <Text style={styles.boxText}>Loja</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Configurações')}>
        <Icon name="settings" size={30} color="#fff" />
        <Text style={styles.boxText}>Configurações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Pedidos', {username})}>
        <Icon name="list-alt" size={30} color="#fff" />
        <Text style={styles.boxText}>Pedidos</Text>
      </TouchableOpacity>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200ee',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '90%',
  },
  boxText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default HomeScreen;
