import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Switch, Vibration } from 'react-native';

const SettingsScreen = ({ navigation }) => {
  
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  // Função para lidar com a ativação/desativação do modo escuro
  

  // Função para lidar com a ativação/desativação das notificações
  const toggleNotifications = () => {
    setIsNotificationsEnabled((previousState) => !previousState);
    if (!isNotificationsEnabled) {
      Vibration.vibrate(); // Faz o celular vibrar quando ativar notificações
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>


      {/* Opção para Ativar/Desativar as Notificações */}
      <View style={styles.setting}>
        <Text style={styles.text}>Ativar notificações</Text>
        <Switch
          value={isNotificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
  },
});

export default SettingsScreen;
