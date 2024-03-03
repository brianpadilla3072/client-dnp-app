import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { baseUrl } from "../ENV";
import { GlobalContentext } from '../context';
import { useNavigation } from '@react-navigation/native';
import TextEditor from './TextEditor';

export default function PostComponent() {
  const navigation = useNavigation();
  const { token, user } = useContext(GlobalContentext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const handleDescription = (descriptionText) => {
    setDescription(descriptionText)
  }

  const handlePublish = async () => {
    try {
      const userObj = JSON.parse(user);
      const userId = userObj.userId; // Utiliza la propiedad correcta según tu objeto de usuario
      const postData = {
        userId: userId,
        title: title,
        description: description,
      };

      const response = await fetch(`${baseUrl}/devotional`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`, // Incluye el token en el encabezado de Autorización
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        // Publicación exitosa, realiza las acciones necesarias
        console.log('Publicación exitosa');
        navigation.goBack();

      } else {
        // Error en la publicación, maneja según sea necesario
        console.error('Error al publicar:', response.status);
      }
    } catch (error) {
      console.error('Error al publicar:', error.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 16, color: 'darkslategray', marginBottom: 8 }}>Título</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#cccccc',
              borderRadius: 4,
              paddingVertical: 8,
              paddingHorizontal: 12,
              fontSize: 16,
              color: 'darkslategray',
            }}
            placeholder="Ingrese el título"
            placeholderTextColor="#999999"
            onChangeText={text => setTitle(text)}
            value={title}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 16, color: 'darkslategray', marginBottom: 8 }}>Contenido</Text>
          <TextEditor handleChange={handleDescription} />
          {/* <TextInput
            style={{
              height: 310,
              borderWidth: 1,
              borderColor: '#cccccc',
              borderRadius: 16,
              paddingVertical: 8,
              paddingHorizontal: 12,
              fontSize: 16,
              color: '#33333',
              textAlignVertical: 'top',
            }}
            placeholder="Ingrese el contenido"
            placeholderTextColor="#999999"
            multiline
            numberOfLines={4}
            onChangeText={text => setDescription(text)}
            value={description}
            required
          /> */}
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#4b7bec',
            borderRadius: 4,
            paddingVertical: 12,
            alignItems: 'center',
          }}
          onPress={handlePublish}
        >
          <Text style={{ fontSize: 18, color: '#ffffff' }}>Publicar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
