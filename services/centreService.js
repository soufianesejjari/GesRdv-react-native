import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from './ConfigService';

// Fonction pour récupérer tous les centres depuis l'API
export const fetchCenters = async () => {
  const token = await AsyncStorage.getItem('token');
  try {
    const response = await axios.get(`${API_URL}/centres`, {
      headers: {
        Authorization: `Bearer ${token}` // Utilisez le token stocké dans AsyncStorage
      }
    });
    console.log("end ," ,response.status)

    return response;
  } catch (error) {
    console.log("end ,error" )

    console.error('Erreur lors de la récupération des centres:', error);
    throw error;
  }
};

// Fonction pour récupérer les informations d'un centre spécifique
export const fetchCentreInfo = async ({id}) => {
  const token = await AsyncStorage.getItem('token');
  try {
    const response = await axios.get(`${API_URL}/centres/${id}`, {
      headers: {
        Authorization: `Bearer ${token}` // Utilisez le token stocké dans AsyncStorage
      }
    });
    return response;
  } catch (error) {
    console.error(`Erreur lors de la récupération des informations du centre avec l'ID ${id}:`, error);
    throw error;
  }
};

// Fonction pour récupérer tous les centres côté admin
export const getAllCentres = async () => {
  const token = await AsyncStorage.getItem('token');
  try {
    const response = await axios.get(`${API_URL}/centres`, {
      headers: {
        Authorization: `Bearer ${token}` // Utilisez le token stocké dans AsyncStorage
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de tous les centres:', error);
    throw error;
  }
};

// Fonction pour mettre à jour un centre
export const updateCentre = async (id, centreData) => {
  const token = await AsyncStorage.getItem('token');
  try {
    const response = await axios.put(`${API_URL}/centres/${id}`, centreData, {
      headers: {
        Authorization: `Bearer ${token}` // Utilisez le token stocké dans AsyncStorage
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du centre avec l'ID ${id}:`, error);
    throw error;
  }
};
export default createCentre= async (centreData) => {
  try {
    const response = await axios.post(`${API_URL}/centres`, centreData,{
      headers: {
        Authorization: `Bearer ${token}` // Utilisez le token stocké dans AsyncStorage
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating centre:', error);
    throw error;
  }
}

// Fonction pour supprimer un centre
export const deleteCentre = async (id) => {
  const token = await AsyncStorage.getItem('token');
  try {
    await axios.delete(`${API_URL}/centres/${id}`, {
      headers: {
        Authorization: `Bearer ${token}` // Utilisez le token stocké dans AsyncStorage
      }
    });
  } catch (error) {
    console.error(`Erreur lors de la suppression du centre avec l'ID ${id}:`, error);
    throw error;
  }
};
