import { createSlice } from '@reduxjs/toolkit';
import { fetchCenters as centerSearch } from '../../services/centreService';

const initialState = {
  selectedCrenau: {},
  crenaux: [],
  loading: false,
  error: null,
};

export const centerSlice = createSlice({
  name: 'centers',
  initialState,
  reducers: {

    fetchCentersStart(state) {
      
      state.loading = true;
      state.error = null;
    },
    fetchCentersSuccess(state, action) {
      state.loading = false;
      state.centerss = action.payload;
    },
    fetchCentersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchCentersStart, fetchCentersSuccess, fetchCentersFailure } = centerSlice.actions;

export const fetchCenters = () => async (dispatch) => {
  
  dispatch(fetchCentersStart());
  try {
    console.log('e=on est loooooooo')

    const response = await centerSearch();
    const centers = response.data; // Supposons que les données des centres se trouvent dans la propriété data de la réponse HTTP

    const normalizedCenters = centers.map((center) => ({
      id: center.id,
      name: center.prenom,
      address: center.email,
      phone: center.telephone,
      // Ajoutez d'autres propriétés si nécessaire
    }));
   // console.log('e=on est laaaaaaaaaa',normalizedCenters)
    dispatch(fetchCentersSuccess(normalizedCenters));
  } catch (error) {
    dispatch(fetchCentersFailure(error.message));
  }
};

export const selectCenters = (state) => state.centers?.centerss || [];
export const selectLoading = (state) => state.centers.loading;
export const selectError = (state) => state.centers.error;

export default centerSlice.reducer;