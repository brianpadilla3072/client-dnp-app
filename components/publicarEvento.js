import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { baseUrl } from "../ENV";
import { GlobalContentext } from '../context';
import { useNavigation } from '@react-navigation/native';

export default function PostComponent() {
  const navigation = useNavigation();
  const { token } = useContext(GlobalContentext);
  const [name, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const handlePublish = async (e) => {
    e.stopPropagation();
    try {
      // Combina día, mes y año en una única cadena de fecha
      const dateMilliseconds = new Date(`${year}-${month}-${day}`).getTime();


      const postData = {
        date: dateMilliseconds,
        name: name,
        description: description,
      };
      console.log(dateMilliseconds)

      const response = await fetch(`${baseUrl}/event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        console.log('Publicación exitosa');
        navigation.goBack();
      } else {
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
            value={name}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 16, color: 'darkslategray', marginBottom: 8 }}>Descripción</Text>
          <TextInput
            style={{
              height: 310,
              borderWidth: 1,
              borderColor: '#cccccc',
              borderRadius: 16,
              paddingVertical: 8,
              paddingHorizontal: 12,
              fontSize: 16,
              color: '#333333',
              textAlignVertical: 'top',
            }}
            placeholder="Ingrese el contenido"
            placeholderTextColor="#999999"
            multiline
            numberOfLines={4}
            onChangeText={text => setDescription(text)}
            value={description}
            required
          />
        </View>
        <Text style={{ fontSize: 16, color: 'darkslategray', marginBottom: 8 }}>Dia Del Evento</Text>
        <View style={{ flexDirection: 'row', marginBottom: 16 }}>
          {/* Entrada para el día */}
          <TextInput
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#cccccc',
              borderRadius: 4,
              paddingVertical: 8,
              paddingHorizontal: 12,
              fontSize: 16,
              color: 'darkslategray',
              marginRight: 8,
            }}
            placeholder="Día"
            placeholderTextColor="#999999"
            onChangeText={text => setDay(text)}
            value={day}
            keyboardType="numeric"

          />
          {/* Entrada para el mes */}
          <TextInput
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#cccccc',
              borderRadius: 4,
              paddingVertical: 8,
              paddingHorizontal: 12,
              fontSize: 16,
              color: 'darkslategray',
              marginRight: 8,
            }}
            placeholder="Mes"
            placeholderTextColor="#999999"
            onChangeText={text => setMonth(text)}
            value={month}
            keyboardType="numeric"

          />
          {/* Entrada para el año */}
          <TextInput
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#cccccc',
              borderRadius: 4,
              paddingVertical: 8,
              paddingHorizontal: 12,
              fontSize: 16,
              color: 'darkslategray',
            }}
            placeholder="Año"
            placeholderTextColor="#999999"
            onChangeText={text => setYear(text)}
            keyboardType="numeric"
            value={year}
          />
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
