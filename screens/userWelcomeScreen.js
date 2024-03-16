import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { GlobalContentext } from '../context';
import UserProfileCard from '../components/userProfileCard';


export default function WelcomeScreen() {
  const { removeToken, removeUser } = useContext(GlobalContentext);

  const handleLogout = (e) => {
    e.stopPropagation();
    removeToken();
    removeUser();
  };
  return (
    <View style={styles.container}>
      <UserProfileCard />
      <TouchableOpacity
        style={[styles.touchableOpacity]}
        onPress={handleLogout}
      >
        <Text style={[styles.buttonText,]}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableOpacity: {
    justifyContent: 'center',
    alignItems: "center",
    width: "40%",
    height: 40,
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#fff', // Ajusta el color de fondo según tus necesidades
    margin: 10,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.20,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#000', // Ajusta el color del texto según tus necesidades
    fontSize: 12,
    fontWeight: 'bold',
  },
});
