import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, FlatList, View, Text, TouchableOpacity, Modal, ScrollView, RefreshControl } from 'react-native';
import { Button } from 'react-native-paper';
import { GlobalContentext } from '../context';
import CardDevocionales from '../components/CardDevocionales';
import BtnAdd from '../components/btnAdd';
import { useNavigation } from '@react-navigation/native';
import DevocionalesService from '../services/DevocionalesService';
import WebView from 'react-native-webview';

const Devocionales = () => {
  const navigation = useNavigation();
  const { user } = useContext(GlobalContentext);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [userExists, setUserExists] = useState(false);
  const userLocal = userExists ? JSON.parse(user) : null;

  useEffect(() => {
    fetchData();
    setUserExists(user !== null);
  }, [user]);

  const fetchData = async () => {
    try {
      const result = await DevocionalesService.fetchData();
      setData(result);
      setError(null);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      setData([]); // O manejar de otra forma según tus necesidades
      setError('Error al obtener datos. Intente nuevamente.');
    } finally {
      setIsRefreshing(false);
    }
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchData();
  };

  const openModal = (e, item) => {
    e.stopPropagation();
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = (e) => {
    e.stopPropagation();
    setModalVisible(false);
    setSelectedItem(null);
  };

  const onPressHandler = (e) => {
    e.stopPropagation()
    navigation.navigate('Nuevo Devocional')
  }

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={(e) => openModal(e, item)}
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
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
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
                <TouchableOpacity
                  style={styles.closeButtonContainer}
                  onPress={closeModal}
                >
                  <Button icon="arrow-left" style={styles.closeButtonIcon} />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>{selectedItem.title}</Text>
                <View
                  style={{ height: 200 }}
                >
                  <WebView
                    style={{
                      flex: 1,
                      marginVertical: 8,
                    }}
                    source={{
                      html: `<div style="font-size: 2.5rem">
                    ${selectedItem.description}
                    </div>`,
                    }}
                  />
                </View>
                {/* <Text>{selectedItem.description}</Text> */}
              </View>
            </ScrollView>
          </View>
        </Modal>
      )}

      {userLocal?.rol !== null && (
        <View>
          {userLocal?.rol === 'super' && (
            <BtnAdd onPressHandler={onPressHandler} />
          )}
          {userLocal?.rol === 'editor' && (
            <BtnAdd onPressHandler={onPressHandler} />
          )}
        </View>
      )}
    </View>
  );
};

// Estilos del componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,

  },
  cardContainer: {
    marginBottom: 16,
    marginRight: 16,
    marginLeft: 16
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
  userText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'green',
    marginVertical: 10,
  },
});

// Exportar el componente
export default Devocionales;
