import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'; // Ícones para as tabs
import HomeScreen from '../screens/HomeScreen'; // Certifique-se de que as telas estão no caminho correto
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PedidosScreen from '../screens/PedidosScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Perfil') {
            iconName = 'person';
          } else if (route.name === 'Configurações') {
            iconName = 'settings';
          } else if (route.name === 'Pedidos') {
            iconName = 'list-alt';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200ee',  // Cor do ícone ativo
        tabBarInactiveTintColor: 'gray',  // Cor do ícone inativo
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
      <Tab.Screen name="Configurações" component={SettingsScreen} />
      <Tab.Screen name="Pedidos" component={PedidosScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
