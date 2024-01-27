import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../ENV';

class DevocionalesService {
  static async fetchData() {
    try {
      const storedData = await AsyncStorage.getItem('devocionalesData');
      if (storedData) {
        return JSON.parse(storedData);
      }

      const response = await axios.get(`${baseUrl}/devotional`);
      const result = response.data;

      await AsyncStorage.setItem('devocionalesData', JSON.stringify(result));

      return result;
    } catch (error) {
      console.error('Error al obtener datos:', error);

      const storedData = await AsyncStorage.getItem('devocionalesData');
      if (storedData) {
        return JSON.parse(storedData);
      } else {
        throw new Error('Error al obtener datos. Intente nuevamente.');
      }
    }
  }
}

export default DevocionalesService;
