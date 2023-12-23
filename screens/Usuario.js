import React from 'react';
import { StyleSheet, Button, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Usuario = () => {
  const navigation = useNavigation();

  const goToAjustes = () => {
    navigation.navigate('ajustes');
  };

  return (
    <View style={styles.container}>
      <Button title="Ir a Ajustes" onPress={goToAjustes} />
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

export default Usuario;
