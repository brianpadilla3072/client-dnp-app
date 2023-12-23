import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const Ajustes = () => {
  return (
    <View style={styles.container}>
      <Text>Ajustes</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24, // Ajusta este valor según sea necesario
  },
});

export default Ajustes;
