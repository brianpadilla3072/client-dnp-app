import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Login from "../screens/RegisterScreen"

const Usuario = () => {
  const navigation = useNavigation();

  const goToAjustes = () => {
    navigation.navigate('ajustes');
  };

  return (
    <View style={styles.container}>
      <Login/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Usuario;
