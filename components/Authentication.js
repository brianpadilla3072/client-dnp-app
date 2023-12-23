import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Authentication from '../components/Authentication';

const Inicio = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función que se ejecutará cuando el usuario inicie sesión
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <View>
          <Text>Bienvenido a la aplicación!</Text>
          {/* Aquí agregarías el contenido de la pantalla principal */}
        </View>
      ) : (
        <Authentication onLogin={handleLogin} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Inicio;
