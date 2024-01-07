import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, FlatList, View, Text, TouchableOpacity, Modal, ScrollView, RefreshControl } from 'react-native';
import { Button } from 'react-native-paper';
import { GlobalContentext } from '../context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../ENV';
import CardDevocionales from '../components/CardDevocionales';
import SuperComponent from '../components/publicarDevocional'; // Importa el componente para usuarios "super"
import EditorComponent from '../components/publicarDevocional'; // Importa el componente para usuarios "editor"

const Devocionales = () => {
    // Obtener el usuario del contexto global
    const { user } = useContext(GlobalContentext);
    
    // Estados locales
    const [data, setData] = useState([]);                // Estado para la lista de devocionales
    const [modalVisible, setModalVisible] = useState(false);  // Estado para la visibilidad del modal
    const [selectedItem, setSelectedItem] = useState(null);  // Estado para el ítem seleccionado
    const [isRefreshing, setIsRefreshing] = useState(false); // Estado para el control de actualización
    const [error, setError] = useState(null);              // Estado para manejar errores
    const [userExists, setUserExists] = useState(false);   // Nuevo estado para verificar si el usuario existe
    const userLocal = userExists ? JSON.parse(user) : null; // Inicializar userLocal solo si userExists es true

    // Efecto secundario para obtener datos iniciales y verificar la existencia del usuario
    useEffect(() => {
        fetchData();
        // Actualizar el estado cuando el usuario no es nulo
        setUserExists(user !== null);
    }, [user]);

    // Función para obtener datos (devocionales) desde almacenamiento local o API
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

    // Función para manejar la acción de "tirar para actualizar"
    const onRefresh = () => {
        setIsRefreshing(true);
        fetchData();
    };

    // Función para abrir el modal con un ítem seleccionado
    const openModal = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setModalVisible(false);
        setSelectedItem(null);
    };

    // Renderizar el componente
    return (
        <View style={styles.container}>
            {/* Mostrar mensaje de error si existe */}
            {error && <Text style={styles.errorText}>{error}{}</Text>}



            {/* Renderizar componente específico según el rol del usuario */}
            {userLocal?.rol !== null && (
                <View>
                    {/* Switch para manejar distintos tipos de usuarios */}
                    {userLocal?.rol === 'super' && <SuperComponent />}
                    {userLocal?.rol === 'editor' && <EditorComponent />}
                </View>
            )}

            {/* Lista de devocionales con posibilidad de "tirar para actualizar" */}
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

            {/* Modal que se muestra cuando un ítem está seleccionado */}
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
                                {/* Botón para cerrar el modal */}
                                <TouchableOpacity style={styles.closeButtonContainer} onPress={closeModal}>
                                    <Button icon="arrow-left" style={styles.closeButtonIcon} />
                                </TouchableOpacity>
                                {/* Título y descripción del ítem seleccionado */}
                                <Text style={styles.modalTitle}>{selectedItem.title}</Text>
                                <Text>{selectedItem.description}</Text>
                                {/* Otra información del ítem */}
                            </View>
                        </ScrollView>
                    </View>
                </Modal>
            )}
        </View>
    );
};

// Estilos del componente
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
    userText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'green',
        marginVertical: 10,
    },
});

// Exportar el componente
export default Devocionales;
