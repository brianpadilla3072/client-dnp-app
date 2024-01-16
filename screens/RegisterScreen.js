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
import { baseUrl } from "../ENV";

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
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async () => {
    try {
      // Validaciones básicas
      if (!firstName || !lastName || !email || !birthDay || !birthMonth || !birthYear || !password || !confirmPassword) {
        throw new Error('Todos los campos son obligatorios');
      }

      if (password !== confirmPassword) {
        throw new Error('Las contraseñas no coinciden');
      }

      // Convertir la fecha de nacimiento a milisegundos
      const dobInMilliseconds = new Date(`${birthYear}/${birthMonth}/${birthDay}`).getTime();

      // Realizar la lógica de registro aquí
      const response = await fetch(`${baseUrl}/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          dob: dobInMilliseconds, // Enviar dob en milisegundos
          password,
        }),
      });
      // ...

      // Limpiar los campos después del registro exitoso
      setFirstName('');
      setSecondName('');
      setLastName('');
      setEmail('');
      setBirthDay('');
      setBirthMonth('');
      setBirthYear('');
      setPassword('');
      setConfirmPassword('');
      setError('');
      setSuccessMessage('Registro exitoso');

      // Realizar cualquier acción adicional después del registro exitoso
      // Manejar la respuesta
      const responseData = await response.json();

      // Verificar si la solicitud fue exitosa
      if (!response.ok) {
        throw new Error(responseData.error || 'Error en la solicitud de registro');
      }
      // ...

    } catch (error) {
      setError(error.message);
      console.error(error.message);
      setSuccessMessage(''); // Limpiar el mensaje de éxito en caso de error
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
      showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/icon.png')} // Agrega la ruta correcta de tu imagen
            style={styles.logo}
          />
          <Text style={styles.title}>Crea tu cuenta</Text>
        </View>
        <View style={styles.formContainer}>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Segundo nombre"
            value={secondName}
            onChangeText={(text) => setSecondName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Dirección de correo electrónico"
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
          <TextInput
            style={styles.input}
            placeholder="Confirmar contraseña"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <View style={styles.dateOfBirthContainer}>
            <TextInput
              style={styles.dateInput}
              placeholder="Día"
              keyboardType="numeric"
              value={birthDay}
              onChangeText={(text) => setBirthDay(text)}
            />
            <TextInput
              style={styles.dateInput}
              placeholder="Mes"
              keyboardType="numeric"
              value={birthMonth}
              onChangeText={(text) => setBirthMonth(text)}
            />
            <TextInput
              style={styles.dateInput}
              placeholder="Año"
              keyboardType="numeric"
              value={birthYear}
              onChangeText={(text) => setBirthYear(text)}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: "#fba007",
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
  error: {
    color: 'red',
    marginBottom: 10,
  },
  successMessage: {
    color: 'green',
    marginBottom: 10,
  },
});

export default RegisterScreen;
