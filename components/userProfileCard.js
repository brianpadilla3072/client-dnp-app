import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GlobalContentext } from '../context';

const UserProfileCard = () => {
  const { user } = useContext(GlobalContentext);
  const userL = user ? JSON.parse(user) : {};


  return (
    <View style={styles.outerDiv} key={userL ? userL.userid : null}>
      <View style={styles.innerDiv}>
        <View style={styles.front}>
          <View style={styles.frontBkgPhoto}></View>
          <View style={styles.frontFacePhoto}></View>

          <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 8 }}>{userL.name} {userL.surname}</Text>
          <Text style={{ color: '#888', marginTop: 4 }}>{userL.email}</Text>
          <View style={{ flexDirection: 'row', marginTop: 8 }}>
            <TouchableOpacity style={styles.touchableOpacity} >
              <Text style={styles.buttonText}>Editar Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchableOpacity} >
              <Text style={styles.buttonText}>Cambiar Contraseña</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerDiv: {
    flex: 1,
    width: '95%',
    height: '100%',
    margin: 10,
    alignSelf: 'center',
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  innerDiv: {
    flex: 1,
    borderRadius: 5,
    borderRadius: 18,
  },
  front: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    borderRadius: 18,
  },
  frontBkgPhoto: {
    height: '25%',
    width: '100%',
    backgroundColor: '#D493',
    borderTopStartRadius: 18,
    borderTopEndRadius: 18,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  frontFacePhoto: {
    height: 150,
    width: 150,
    backgroundColor: '#ff2',
    marginTop: -70,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  frontText: {
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    width: 400,
  },
  touchableOpacity: {
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
  btnCerrarSeccion: {
    backgroundColor: '#ff2',
    color: '#fff',
  },
});

export default UserProfileCard;
