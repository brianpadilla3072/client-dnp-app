import React from "react";
import { StyleSheet, FlatList } from "react-native";
// Verifica que la ruta sea correcta
import CardDevocionales from '../components/CardDevocionales';
import jsonData from '../data.json';

const Devocionales = () => {
  const data = jsonData.data; // Accede a la propiedad "data" del JSON

  return (
    <FlatList
      style={styles.container}
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <CardDevocionales
          title={item.title}
          description={item.description}
          icon={item.icon}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    padding: 16,
    // Ajusta este valor según sea necesario
  },
});

export default Devocionales;
