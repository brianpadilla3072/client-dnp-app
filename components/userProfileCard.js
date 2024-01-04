import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlobalContentext } from '../context';
import { Button as RNButton } from 'react-native'; // Cambia el nombre del import a RNButton


const UserProfileCard = () => {
    const { removeToken,user } = useContext(GlobalContentext);
    const userL = JSON.parse(user)
    console.log(userL)
    return (
      <View style={styles.outerDiv} key={userL.userid}>
        <View style={styles.innerDiv}>
          <View style={styles.front}>
            <View style={styles.frontBkgPhoto}></View>
            <View style={styles.frontFacePhoto}></View>
            <View style={styles.frontText}>
              <Text style={styles.title}> {userL.name} {userL.surnsme}</Text>
              <Text style={styles.title}>{userL.email}</Text>
               <Text style={styles.title}>{userL.rol}</Text>
                <Text style={styles.title}>{userL.dob}</Text>
                 <Text style={styles.title}>{userL.userid}</Text>
            </View>
  
            <RNButton
              title="Cerrar sesión"
              onPress={removeToken}
              buttonStyle={styles.btnCerrarSeccion}
            />
          </View>
        </View>
      </View>
    );
  };
  

const styles = StyleSheet.create({
    outerDiv: {
        flex: 1,
        width: "95%",
        height: "100%",
        margin: 10,
        alignSelf: 'center',
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
        height: "25%",
        width: "100%", // Cambiado para ocupar el 100% del ancho
        backgroundColor: '#D493',
        borderTopStartRadius: 18,
        borderTopEndRadius: 18,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,



    },
    frontFacePhoto: {
        height: 150,
        width: 150,
        backgroundColor: "#ff2",
        marginTop: -70,
        borderRadius: 75, // Cambiado para que sea el 50% del ancho y alto
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
        width:400,
    },
    btnCerrarSeccion: {
        backgroundColor: "#ff2",
        color: "#fff",
    },
});

export default UserProfileCard;
