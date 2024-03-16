import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');

  const handleRegister = (e) => {
    e.stopPropagation();
    // Lógica de registro aquí
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/icon.png')} // Agrega la ruta correcta de tu imagen
            style={styles.logo}
          />
          <Text style={styles.title}>Crea tu cuenta</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            onChangeText={(text) => setFirstName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Segundo nombre"
            onChangeText={(text) => setSecondName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            onChangeText={(text) => setLastName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Dirección de correo electrónico"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar contraseña"
            secureTextEntry
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <View style={styles.dateOfBirthContainer}>
            <TextInput
              style={styles.dateInput}
              placeholder="Día"
              keyboardType="numeric"
              onChangeText={(text) => setBirthDay(text)}
            />
            <TextInput
              style={styles.dateInput}
              placeholder="Mes"
              keyboardType="numeric"
              onChangeText={(text) => setBirthMonth(text)}
            />
            <TextInput
              style={styles.dateInput}
              placeholder="Año"
              keyboardType="numeric"
              onChangeText={(text) => setBirthYear(text)}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.forgotPassword} onPress={handleRegister}>
          <Text style={styles.forgotPasswordText}>¿Ya tienes una cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </ScrollView>
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
  formContainer: {
    width: '100%',
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 12,
  },
  dateOfBirthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dateInput: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 8,
  },
  button: {
    backgroundColor: '#4A5568',
    borderRadius: 4,
    paddingVertical: 12,
    marginTop: 24,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 24,
  },
  forgotPasswordText: {
    color: '#3182CE',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default RegisterScreen;
