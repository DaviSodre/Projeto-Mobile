import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../src/screens/LoginScreen'; // Ajuste o caminho conforme necessário

test('LoginScreen renders correctly', () => {
  const { getByText } = render(
    <NavigationContainer>
      <LoginScreen />
    </NavigationContainer>
  );

  expect(getByText('Festas Encantadas & Cia')).toBeTruthy();
});
