import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL } from './ConfigService'

export const getStats = async () => {
  const token = await AsyncStorage.getItem('token')
  try {
    const url = `${API_URL}/stats`
    console.log(url)
    console.log(token)

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (error) {
    console.error('Error fetching ', error)
    throw error
  }
}
