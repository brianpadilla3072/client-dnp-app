import React, { useState, useEffect } from "react";
import { ScrollView, RefreshControl, View, Text, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Portada from "../components/portada";
import { baseUrl } from "../ENV";

const Inicio = () => {
  const [fechaData, setFechaData] = useState(null);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleDateString('es-ES', options);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    return {
      formattedDate,
      day,
      month,
      year,
    };
  };

  const fetchData = async () => {
    try {
      setIsRefreshing(true);

      const storedData = await AsyncStorage.getItem('fechasData');

      if (storedData) {
        setFechaData(JSON.parse(storedData));
        setError(null);
      }

      const response = await fetch(`${baseUrl}/event`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setFechaData(result);
      setError(null);

      await AsyncStorage.setItem('fechasData', JSON.stringify(result));
    } catch (error) {
      console.error('Error al obtener datos:', error);

      const storedData = await AsyncStorage.getItem('fechasData');

      if (storedData) {
        setFechaData(JSON.parse(storedData));
        setError('Sin conexión');
      } else {
        setError('Error al obtener datos. Intente nuevamente.');
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  const onRefresh = () => {
    fetchData();
  };

  return (
    <View style={styles.container}>
      <Portada imageUrl="https://th.bing.com/th/id/OIP.YL5bOMKzdMkrFD4OYX7z2AHaEK?rs=1&pid=ImgDetMain" />

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
        {fechaData && fechaData.map((data, i) => (
          <View key={i} style={styles.fechaContainer}>
            <View style={styles.date}>
              <Text>{formatDate(data.date).day}</Text>
            </View>
            <View style={styles.title}>
              <Text>{data.tittle}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
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
  },
  fechaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 9,
    margin: 4,
    backgroundColor: "#FF4",
    height: 100,
    width: '95%', // Cambiado a porcentaje
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '20%', // Cambiado a porcentaje
  },
  title: {
    fontSize: 18,
    marginLeft: 10,
    width: '80%', // Cambiado a porcentaje
  },
});

export default Inicio;
