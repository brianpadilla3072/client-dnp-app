import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Portada from "../components/portada";
import { baseUrl } from "../ENV";

const Inicio = () => {
  const [fechaData, setFechaData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    // Opciones de formato para la fecha
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
  
    // Crear una nueva instancia de Date con la cadena de fecha
    const dateObject = new Date(dateString);
  
    // Utilizar toLocaleDateString para obtener la fecha formateada
    // 'es-ES' indica el idioma español
    const formattedDate = dateObject.toLocaleDateString('es-ES', options);
  
    // Obtener el día, mes y año por separado
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1; // Sumar 1 porque los meses comienzan desde 0
    const year = dateObject.getFullYear();
  
    // Devolver un objeto con las propiedades deseadas
    return {
      formattedDate,
      day,
      month,
      year,
    };
  };
  
  
  const fetchData = async () => {
    try {
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
      console.log(result)
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
    }
  };

  return (
    <View style={styles.container}>
      <Portada imageUrl="https://th.bing.com/th/id/OIP.YL5bOMKzdMkrFD4OYX7z2AHaEK?rs=1&pid=ImgDetMain" />

      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        {fechaData && fechaData.map((data, i) => (
          <View key={i} style={styles.fechaContainer}>
            <View>

            <Text style={styles.date}>{formatDate(data.date).day}</Text>
            </View>
            <Text style={styles.title}>{data.tittle}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingTop: 10, // Ajusta según sea necesario
    justifyContent: "flex-start", // Posiciona el contenido en la parte superior
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
    padding:4,
    margin:4,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    marginLeft: 10, // Espaciado entre la fecha y el título
  },
});

export default Inicio;
