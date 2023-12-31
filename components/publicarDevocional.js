import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';

const PublicarDevocional = () => {
  const [devocionalText, setDevocionalText] = useState('');

  const handlePublicar = () => {
    // Aquí puedes implementar la lógica para publicar el devocional
    console.log('Texto a publicar:', devocionalText);
    // También puedes enviar devocionalText a tu servidor, base de datos, etc.
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          multiline
          placeholder="Escribe tu devocional..."
          value={devocionalText}
          onChangeText={setDevocionalText}
        />
        <TouchableOpacity
          style={[styles.btnPublicar, { opacity: devocionalText.trim() ? 1 : 0.5 }]}
          onPress={handlePublicar}
          disabled={!devocionalText.trim()} // Desactiva el botón si no hay texto o solo hay espacios en blanco
        >
          <Text style={styles.btnText}>Publicar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    width: '95%',
    height: 300,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.20,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
    padding: 20,
    justifyContent: 'space-between',
  },
  input: {
    height: '75%',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    marginBottom: 9,
    textAlignVertical: 'top',
  },
  btnPublicar: {
    backgroundColor: '#4CAF56',
    padding: 10,
    borderRadius: 7,
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PublicarDevocional;
