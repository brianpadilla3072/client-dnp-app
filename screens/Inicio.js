import React from "react";
import { View,Text, Button,StyleSheet } from "react-native";
const Inicio = () => {  

  
    return (
      // ...
      <View style={styles.container}>
        <Text>inicio</Text>
      </View>
      // ...
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 24,
      justifyContent: 'center',
      alignItems: 'center', // Ajusta este valor según sea necesario
    },
  });
export default Inicio