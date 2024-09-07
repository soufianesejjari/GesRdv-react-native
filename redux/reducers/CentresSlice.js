import { createSlice } from '@reduxjs/toolkit'
import { fetchCenters as centerSearch } from '../../services/centreService'

const initialState = {
  isStartFetch: false,
  value: 10,
  centerss: [],
  loading: false,
  error: null
}

export const centerSlice = createSlice({
  name: 'centers',
  initialState,
  reducers: {
    fetchCentersStart (state) {
      state.isStartFetch = true
      state.loading = true
      state.error = null
    },
    fetchCentersSuccess (state, action) {
      state.centerss = action.payload
      // console.log("zzzzzzzzzzzzzzzzzzzzzzzz",action.payload)
      state.loading = false
    },
    fetchCentersFailure (state, action) {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const { fetchCentersStart, fetchCentersSuccess, fetchCentersFailure } =
  centerSlice.actions

export const fetchCenters = () => async (dispatch) => {
  dispatch(fetchCentersStart())
  try {
    const response = await centerSearch()
    const centers = response.data // Supposons que les données des centres se trouvent dans la propriété data de la réponse HTTP
    console.log('e=on est loooooooo centres', centers)

    const normalizedCenters = centers.map((center) => ({
      id: center.id,
      nom: center.nom,
      adresse: center.adresse,
      email: center.email,
      telephone: center.telephone
      // Ajoutez d'autres propriétés si nécessaire
    }))
    // console.log('e=on est laaaaaaaaaa',normalizedCenters)
    dispatch(fetchCentersSuccess(normalizedCenters))
  } catch (error) {
    dispatch(fetchCentersFailure(error.message))
  }
}

export const selectCenters = (state) => state.centers.centerss
export const selectLoading = (state) => state.centers.loading
export const selectError = (state) => state.centers.error
export const selectIsStartFetch = (state) => state.centers.isStartFetch

export default centerSlice.reducer
