// centerService.js

import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL } from './ConfigService'

// Fonction pour récupérer tous les centres depuis l'API
export const fetchCreneaux = async () => {
  console.log('fetching')
  data = await axios.get(`${API_URL}/creneaux`, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzb3VmaWFuZUBzLmNvbSIsImlhdCI6MTcxMzA0OTA2OSwicm9sZXMiOlsiVVNFUiJdLCJleHAiOjE3MTM3NDkwNjl9.cZMuljXzFm1T6TIiGy2YTQb_06uEvHUuePXS7Z9XqmM' // Utilisez le token stocké dans localStorage
    }
  })
  console.log('finish')

  console.log(data)
  return data
}
