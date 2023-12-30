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
    
    height: 250, // Ajusta la altura según tus necesidades
    overflow: 'hidden',
    padding:0,
    margin: 10,
    width:"96%",
    borderRadius: 20, 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.20,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default Portada;
