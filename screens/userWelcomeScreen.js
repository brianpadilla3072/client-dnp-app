import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useContext } from 'react';
import { GlobalContentext } from '../context';

export default function WelcomeScreen() {
  const { removeToken, token } = useContext(GlobalContentext);
  console.log('Token:', token);

  return (
    <View style={styles.container}>
      <Text>WelcomeScreen</Text>
      <Button title="Cerrar sesión" onPress={removeToken} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
