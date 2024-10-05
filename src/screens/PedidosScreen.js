import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PedidosScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Esta é a tela de Pedidos</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PedidosScreen;
