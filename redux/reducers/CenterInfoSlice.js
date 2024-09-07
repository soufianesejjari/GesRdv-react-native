import { createSlice } from '@reduxjs/toolkit'
import { fetchCentreInfo } from '../../services/centreService'

const initialState = {
  center: null,
  loading: false,
  error: null,
  start: false
}

export const centerInfoSlice = createSlice({
  name: 'centerInfo',
  initialState,
  reducers: {
    fetchCenterStart (state) {
      state.start = true
      state.loading = true
      state.error = null
    },
    fetchCenterSuccess (state, action) {
      state.center = action.payload
      // console.log("zzzzzzzzzzzzzzzzzzzzzzzz",action.payload)
      state.loading = false
    },
    fetchCenterFailure (state, action) {
      state.loading = false
      state.error = action.payload
    },
    fetchCenterrelaod (state) {
      state.loading = false
      state.start = false
    }
  }
})

export const {
  fetchCenterStart,
  fetchCenterSuccess,
  fetchCenterFailure,
  fetchCenterrelaod
} = centerInfoSlice.actions

export const fetchCenterInfo = (id) => async (dispatch) => {
  dispatch(fetchCenterStart())
  try {
    console.log('e=on est loooooooop')

    const response = await fetchCentreInfo(id)
    const center = response.data // Supposons que les données des centres se trouvent dans la propriété data de la réponse HTTP

    // console.log('e=on est laaaaaaaaaa',normalizedCenters)
    dispatch(fetchCenterSuccess(center))
  } catch (error) {
    dispatch(fetchCenterFailure(error.message))
  }
}

export const selectCenter = (state) => state.centerInfo?.center || null
export const selectLoadingCenter = (state) => state.centerInfo.loading
export const selectError = (state) => state.centerInfo.error

export default centerInfoSlice.reducer
