// PedidosScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { fetchLoggedUserData } from '../api'; // Ajuste o caminho

const PedidosScreen = () => {
  const [orders, setOrders] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userData = await fetchLoggedUserData();
        
        if (!userData) {
          Alert.alert('Usuário não logado', 'Você precisa estar logado para ver seus pedidos.');
          return;
        }
  
        setUsername(userData.username);
  
        const ordersData = JSON.parse(await SecureStore.getItemAsync('orders')) || {};
        const userOrders = ordersData[username] || [];
        setOrders(userOrders);
  
        // Log para verificar a estrutura dos pedidos
        console.log('Pedidos do usuário:', userOrders);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      }
    };
  
    fetchOrders();
  }, []);

  const removeOrder = async (orderId) => {
    const ordersData = JSON.parse(await SecureStore.getItemAsync('orders')) || {};
    ordersData[username] = ordersData[username].filter(order => order.id !== orderId);
    await SecureStore.setItemAsync('orders', JSON.stringify(ordersData));
    
    // Atualiza o estado
    setOrders(ordersData[username]);
    Alert.alert('Pedido Removido', 'O pedido foi removido com sucesso!');
  };

  const renderOrder = ({ item }) => (
    <View style={styles.orderContainer}>
      <Text style={styles.orderTitle}>{item.title}</Text>
      <Text style={styles.orderDescription}>{item.description}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.removeButton} 
          onPress={() => removeOrder(item.id)}
        >
          <Text style={styles.buttonText}>Remover</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.payButton}
          onPress={() => Alert.alert('Função Pagar', 'A funcionalidade de pagamento ainda não está implementada.')}
        >
          <Text style={styles.buttonText}>Pagar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meus Pedidos</Text>
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id.toString()} // Convertendo id para string se necessário
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderContainer: {
    backgroundColor: '#6200ee',
    padding: 20,
    borderRadius: 10,
    marginBottom: 16,
  },
  orderTitle: {
    color: '#fff',
    fontSize: 18,
  },
  orderDescription: {
    color: '#fff',
    marginVertical: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  removeButton: {
    backgroundColor: '#d32f2f',
    padding: 10,
    borderRadius: 5,
  },
  payButton: {
    backgroundColor: '#388e3c',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default PedidosScreen;
