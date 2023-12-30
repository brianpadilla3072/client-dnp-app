import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, Text, TouchableOpacity, Modal, ScrollView, RefreshControl } from 'react-native';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../ENV';

import CardDevocionales from '../components/CardDevocionales';

const Devocionales = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('devocionalesData');

      if (storedData) {
        setData(JSON.parse(storedData));
        setError(null);
      }

      const response = await fetch(`${baseUrl}/devotional`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setData(result);
      setError(null);

      await AsyncStorage.setItem('devocionalesData', JSON.stringify(result));
    } catch (error) {
      console.error('Error al obtener datos:', error);

      const storedData = await AsyncStorage.getItem('devocionalesData');

      if (storedData) {
        setData(JSON.parse(storedData));
        setError('Sin conexión');
      } else {
        setError('Error al obtener datos. Intente nuevamente.');
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchData();
  };

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
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => openModal(item)}
            style={styles.cardContainer}
            activeOpacity={1}
          >
            <CardDevocionales
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }
      />

      {selectedItem && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <ScrollView>
              <View style={styles.modalContent}>
                <TouchableOpacity style={styles.closeButtonContainer} onPress={closeModal}>
                  <Button icon="arrow-left" style={styles.closeButtonIcon} />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>{selectedItem.title}</Text>
                <Text>{selectedItem.description}</Text>
                {/* Otra información del item */}
              </View>
            </ScrollView>
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
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  modalContent: {
    padding: 16,
    width: '100%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    flex: 1,
  },
  closeButtonContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonIcon: {
    width: 24,
    height: 24,
  },
  errorText: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Devocionales;
