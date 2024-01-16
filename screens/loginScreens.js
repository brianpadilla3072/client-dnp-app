import React, { useState, useContext } from 'react';
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
  const { setToken, setUser } = useContext(GlobalContentext); // Utilizando el contexto correcto

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

      if (!response.ok) {
        throw new Error(responseData?.error || 'Error en el inicio de sesión');
      }

      // Extraer el token de la respuesta
      const { token } = responseData;
      const { user } = responseData;
      setToken(token);
      setUser(JSON.stringify(user));
    } catch (error) {
      Alert.alert('Error', error.message || 'Error en el inicio de sesión');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/icon.png')} // Agrega la ruta correcta de tu imagen
          style={styles.logo}
        />
         <Text style={styles.title}>Ingresa a tu cuenta</Text>
      </View>
      
      <View style={{ width: '100%' }}>
        <TextInput
          autoCompleteType="email"
          style={styles.input}
          placeholder="Correo Electronico"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          autoCompleteType="password"
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => Alert.alert('Perdiste tu contraseña?')}>
        <Text style={{ color: '#3182CE', fontSize: 14, fontWeight: '600' }}>Perdiste tu contraseña? </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
      
        <Text style={styles.buttonText}>Ingresar</Text>
      
    </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 10,
    width: 300,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoContainer: {
    maxWidth: 300,
    width: '100%',
    marginBottom: 32,
    alignItems: 'center',
  },
  logo: {
    height: 72,
    width: 72,
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  title: {
    marginTop: 6,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
   button: {
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fba007"
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  }

});

export default LoginScreen;
