import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const BtnAdd = ({ onPressHandler }) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPressHandler}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 16,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#FFA500',
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 65,
    height: 65,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default BtnAdd;
