import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Registrar from "../screens/RegisterScreen"
import Iniciar from "./loginScreens.js"
const Usuario = () => {
  const navigation = useNavigation();

  const goToAjustes = () => {
    navigation.navigate('ajustes');
  };

  return (
    <View style={styles.container}>
      {/* <Registrar/> */}
      <Iniciar/>
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
