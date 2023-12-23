import React, { useState } from 'react';
import { StyleSheet, FlatList, View, Text, TouchableOpacity, Modal } from 'react-native';
import CardDevocionales from '../components/CardDevocionales';
import jsonData from '../data.json';

const Devocionales = () => {
  const data = jsonData.data;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => openModal(item)}
            style={styles.cardContainer}
            activeOpacity={1} // Evita el cambio de opacidad al ser presionado
          >
            <CardDevocionales
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          </TouchableOpacity>
        )}
      />

      {selectedItem && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            {selectedItem && (
              <>
                <Text>{selectedItem.title}</Text>
                <Text>{selectedItem.description}</Text>
                <TouchableOpacity onPress={closeModal}>
                  <Text>Cerrar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    padding: 16,
  },
  cardContainer: {
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 16,
  },
});

export default Devocionales;
