import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function Component() {
  return (
    <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
      
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 16, color: '#333333', marginBottom: 8 }}>Título</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#cccccc',
              borderRadius: 4,
              paddingVertical: 8,
              paddingHorizontal: 12,
              fontSize: 16,
              color: '#333333',
            }}
            placeholder="Ingrese el título"
            placeholderTextColor="#999999"
            required
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 16, color: '#333333', marginBottom: 8 }}>Imagen de Portada</Text>
          {/* Reemplaza la entrada de archivo con un componente de selección de imagen apropiado */}
          {/* Por ejemplo, puedes usar la biblioteca 'react-native-image-picker' */}
          {/* Instálala ejecutando: npm install react-native-image-picker */}
          {/* Impórtala y úsala según corresponda */}
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#cccccc',
              borderRadius: 4,
              paddingVertical: 8,
              paddingHorizontal: 12,
              fontSize: 16,
              color: '#333333',
            }}
            placeholder="Selecciona la imagen de portada"
            placeholderTextColor="#999999"
            editable={false} // Deshabilita la edición por simplicidad
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 16, color: '#333333', marginBottom: 8 }}>Contenido</Text>
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
            required
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#4b7bec',
            borderRadius: 4,
            paddingVertical: 12,
            alignItems: 'center',
          }}
          onPress={() => {
            // Maneja la presentación del formulario
          }}
        >
          <Text style={{ fontSize: 18, color: '#ffffff' }}>Publicar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
