import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from './ConfigService';

export const getAvalaibleCreneau = async (centreId, date, creneau) => {
  try {
    const token = await AsyncStorage.getItem('token'); 

    let url = `${API_URL}/rendezvous/search?centre=${centreId}&date=${date}`;
    if (creneau) {
      url += `&creneau=${creneau}`;
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 204) {
      return null; // Return null when HttpStatus.NO_CONTENT is received
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching available slots:', error);
    throw error;
  }
};

export const saveRendezVous = async (rendezVousDto) => {
  
    let url = `${API_URL}/rendezvous`;

    const token = await AsyncStorage.getItem('token'); 
       const response = await axios.post(url,rendezVousDto, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data

};