import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';

const FechaComponent = ({ date, title, description }) => {
  const formattedDate = getFormattedDate(date);

  return (
    <View style={styles.container}>
      <View style={styles.diaContainer}>
        <Text style={styles.diaText}>{formattedDate}</Text>
      </View>
      <View style={styles.tituloContainer}>
        <Text style={styles.tituloText}>{title}</Text>
        <Text style={styles.descripcionText}>{description}</Text>
      </View>
    </View>
  );
};

const getFormattedDate = (date) => {
  // Formatear la fecha utilizando moment.js
  const formattedDate = moment(date).format('DD');
  return formattedDate;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F8E9DB',
    borderRadius: 40,
    backgroundColor: 'F8E9DB',
  },
  diaContainer: {
    flex: 1,
    marginRight: 0,
    textAlign: 'auto',
    alignItems:"center", // Centra el texto horizontalmente
  },
  diaText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F0B079',
  },
  tituloContainer: {
    flex: 2,
    marginLeft: 8,
  },
  tituloText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descripcionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default FechaComponent;
