import React from 'react';
import { StyleSheet} from 'react-native';
import MainStack from './navigation/MainStack';
import { NavigationContainer } from '@react-navigation/native';
export default function App() {
  return (
      
    <NavigationContainer>
    <MainStack />
  </NavigationContainer>  );
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

