import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../ENV';

class EventService {
  static async fetchEventData() {
    try {
      const storedData = await AsyncStorage.getItem('eventData');

      if (storedData) {
        return JSON.parse(storedData);
      }

      const response = await axios.get(`${baseUrl}/event`);

      if (response.status === 200) {
        const result = response.data;
        await AsyncStorage.setItem('eventData', JSON.stringify(result));
        return result;
      } else {
        // Devolver null en lugar de lanzar un error directamente
        return null;
      }
    } catch (error) {
      console.error('Error al obtener datos:', error);

      const storedData = await AsyncStorage.getItem('eventData');

      if (storedData) {
        return JSON.parse(storedData);
      } else {
        // Devolver null en lugar de lanzar un error directamente
        return null;
      }
    }
  }
}

export default EventService;
