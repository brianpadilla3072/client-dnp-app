import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Portada = ({ imageUrl }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 250, // Ajusta la altura según tus necesidades
    overflow: 'hidden',
    padding:4,
    borderRadius:40,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default Portada;
