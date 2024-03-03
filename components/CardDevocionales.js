import React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';

const CardDevocionales = React.memo(({ title, description, icon }) => (
  <Card style={styles.cardDevocionales}>
    <Card.Title
      title={title}
      titleStyle={styles.cardTitle} // Agrega este estilo para el título
      left={() => <Avatar.Icon icon={icon} style={styles.iconPerfil} />} // Agrega este estilo para el icono
    />
    <Card.Content style={{ flex: 1 }}>
      <View style={{ height: 40 }}>
        <WebView
          style={{ backgroundColor: '#0000' }}
          source={{ html: `<div style="font-size: 3rem">${description}</div>` }}
        />
      </View>
      {/* <Text variant="bodyMedium">{dedscription}</Text> */}
    </Card.Content>
    <Card.Actions>
      <Button>Leer mas</Button>
    </Card.Actions>
  </Card>
), (prevProps, nextProps) => {
  // Esta función personalizada define si el componente debe volver a renderizarse
  // Puedes ajustarla según tus necesidades específicas
  return (
    prevProps.title === nextProps.title &&
    prevProps.description === nextProps.description &&
    prevProps.icon === nextProps.icon
  );
});

const styles = StyleSheet.create({
  cardDevocionales: {
    flex: 1,
    margin: 4,
    // Ajusta este valor según sea necesario
  },
  iconPerfil: {
    width: 40,
    height: 40,
    backgroundColor: "#fba007"

    //backgroundColor: 'white', // Añade un fondo blanco para separar visualmente el icono del título
  },
  cardTitle: {
    marginStart: -5, // Ajusta este valor para agregar margen entre el título y el icono
  },
});

export default CardDevocionales;
