import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importando o ícone do Material Icons

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.box}>
        <Icon name="person" size={30} color="#fff" />
        <Text style={styles.boxText}>Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box}>
        <Icon name="settings" size={30} color="#fff" />
        <Text style={styles.boxText}>Configurações</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box}>
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
