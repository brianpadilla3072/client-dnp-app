import React, { useState,useContext  } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { baseUrl } from '../ENV';
import { GlobalContentext } from "../context"; // Corrige la importación



const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useContext(GlobalContentext); // Utilizando el contexto correcto


  const handleLogin = async () => {
    try {
      // Validaciones básicas
      if (!email || !password) {
        throw new Error('Por favor, ingrese correo y contraseña.');
      }

      // Lógica de inicio de sesión aquí
      const response = await fetch(`${baseUrl}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (!response.ok) {
        throw new Error(responseData?.error || 'Error en el inicio de sesión');
       
      }

      // Extraer el token de la respuesta
      const { token } = responseData;
      setToken(token);
    } catch (error) {
      Alert.alert('Error', error.message || 'Error en el inicio de sesión');

    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'URL_DE_TU_LOGO' }}
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
