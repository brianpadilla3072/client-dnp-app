/**construir:   eas build --platform android --profile preview */
import React from 'react';
import { StyleSheet } from 'react-native';
import MainStack from './navigation/MainStack';
import { NavigationContainer } from '@react-navigation/native';
import ContextProvider  from './context'; // Cambié la importación
export default function App() {
  return (
    <ContextProvider >
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </ContextProvider >
  );
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: '#456543',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    fontSize: 25,
  }
});

