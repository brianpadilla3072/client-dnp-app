import React, { useState, useEffect, useContext } from "react";
import { GlobalContentext } from '../context';
import { ScrollView, RefreshControl, View, Text, StyleSheet } from "react-native";
import Portada from "../components/portada";
import BtnAdd from '../components/btnAdd'; // Importa el componente para usuarios "super"
import { useNavigation } from '@react-navigation/native';
import EventService from '../services/EventService';

const Inicio = () => {
  const navigation = useNavigation();

  const { user } = useContext(GlobalContentext);
  const [eventData, setEventData] = useState(null);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const userLocal = userExists ? JSON.parse(user) : null;

  useEffect(() => {
    fetchData();
    setUserExists(user !== null);
  }, [user]);

  const formatDate = (data) => {
    if (data && data.date) {
      const timestamp = Math.max(0, data.date);
      const dateObject = new Date(timestamp);
  
      if (isNaN(dateObject.getUTCDate()) || isNaN(dateObject.getUTCMonth()) || isNaN(dateObject.getUTCFullYear())) {
        console.error('Fecha inválida:', data.date);
        return null; // Devolver null en caso de fecha inválida
      }
  
      const day = ('0' + dateObject.getUTCDate()).slice(-2);
      const month = ('0' + (dateObject.getUTCMonth() + 1)).slice(-2);
      const year = dateObject.getUTCFullYear();
  
      return {
        day,
        month,
        year,
      };
    }
  };
  
  
  
  
  
  
  
  

  const fetchData = async () => {
    try {
      setIsRefreshing(true);

      const result = await EventService.fetchEventData();
      setEventData(result);
      setError(null);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      setEventData([]); // O manejar de otra forma según tus necesidades
      setError('Error al obtener datos. Intente nuevamente.');
    } finally {
      setIsRefreshing(false);
    }
  };

  const onRefresh = () => {
    fetchData();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <Portada imageUrl='https://scontent.fbhi1-1.fna.fbcdn.net/v/t39.30808-6/243184090_957574888306933_308468127860268102_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=783fdb&_nc_eui2=AeHwBXejKjpDWrVYMZDdHnzZq8eDXEVSzcSrx4NcRVLNxAItI8BBlRPP8RBsceujiG8y-T14Am2gcZFps_SEGu7Y&_nc_ohc=iKLN6bT17e8AX9h455R&_nc_ht=scontent.fbhi1-1.fna&oh=00_AfAF3wbdvZELbG0mLuqZapOHBIwfjIAUeGXgT7sk6CpGxQ&oe=65A7C241' />

        {eventData && eventData.map((data, i) => (
          <View key={data.eventId} style={styles.eventContainer}>
            <View style={styles.date}>
            {console.log(data)}
              {console.log(formatDate(data)?.day)}
              <Text>{formatDate(data).day}</Text>
            </View>
            <View style={styles.title}>
              <Text>{data.name}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      {userLocal?.rol !== null && (
        <View>
          {userLocal?.rol === 'super' && (
            <BtnAdd onPressHandler={() => navigation.navigate('Nuevo Evento')} />
          )}
          {userLocal?.rol === 'editor' && (
            <BtnAdd onPressHandler={() => navigation.navigate('Nuevo Evento')} />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingTop: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  container: {
    flex: 1,
    marginTop: 24,
    width:"100%",
    
  },
  eventContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 9,
    margin: 4,
    backgroundColor: "#FFF",
    height: 100, // Cambiado a porcentaje
    width:"95%",
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
  date: {
    alignItems:"center",
    fontSize: 10,
    fontWeight: 'bold',
    width: '25%', // Cambiado a porcentaje
  },
  title: {
    
    fontSize: 18,
    marginLeft: 10,
    width: '80%', // Cambiado a porcentaje
  },
});

export default Inicio;
