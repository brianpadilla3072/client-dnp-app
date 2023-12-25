import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import FechaComponent from "../components/fechas";
import Portada from "../components/portada";
import { baseUrl } from "../ENV";


const Inicio = () => {
  const [fechaData, setFechaData] = useState(null);

  useEffect(() => {
    // Realizar la petición GET al servidor o API
    fetch(`${baseUrl}/event`)
      .then(response => response.json())
      .then(result => setFechaData(result))
      .catch(error => console.error('Error al obtener datos:', error));
  }, []);

  return (
    <View style={styles.container}>
      <Portada  imageUrl="https://th.bing.com/th/id/OIP.YL5bOMKzdMkrFD4OYX7z2AHaEK?rs=1&pid=ImgDetMain" />
      
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false} // Para ocultar la barra de desplazamiento vertical
      >
        {fechaData && fechaData.map((data,i) => (
          <FechaComponent
            key={i}
            date={data.date}
            title={data.title}
            description={data.description}
          />
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
});

export default Inicio;
