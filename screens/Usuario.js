import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Registrar from "../screens/RegisterScreen";
import Iniciar from "./loginScreens.js";

const Usuario = () => {
  const navigation = useNavigation();
  const [isSignIn, setIsSignIn] = useState(false); // Estado para rastrear si es inicio de sesión o registro

  const goToAjustes = () => {
    navigation.navigate('ajustes');
  };

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  const Login = () => {
    return (
      <View>
        <Iniciar />
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 24 }}>
          <Text style={{ fontSize: 14 }}>¿No tienes una cuenta? </Text>
          <TouchableOpacity onPress={toggleForm}>
            <Text style={{ color: '#fba007', fontSize: 14, fontWeight: '600' }}>Registrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const SignIn = () => {
    return (
      <View>
        <Registrar />
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 24 }}>
          <Text style={{ fontSize: 14 }}>¿Ya tienes una cuenta? </Text>
          <TouchableOpacity onPress={toggleForm}>
            <Text style={{ color: '#fba007', fontSize: 14, fontWeight: '600' }}>Ingresar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isSignIn ? <SignIn /> : <Login />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    padding: 16,
  },
});

export default Usuario;
