import { createSlice } from '@reduxjs/toolkit';
import { getAvalaibleCreneau, saveRendezVous } from '../../services/RendezVousService';


const initialState = {
  succes :false,
  rendezObjet: null,
  loading: false,
  error: null,
};

export const AddRendezSlice = createSlice({
  name: 'addRendezVous',
  initialState,
  reducers: {

    fetchaddRendezsStart(state) {
      
      state.loading = true;
      state.error = null;
    },
    fetchaddRendezsSuccess(state, action) {
      state.rendezObjet = action.payload;
      state.loading = false;
      state.succes=true

    },
    fetchaddRendezsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchaddRendezsFinale(state) {
      state.loading = false;
      state.error=null;
      state.succes=false
    },
  },
});

export const { fetchaddRendezsStart, fetchaddRendezsSuccess, fetchaddRendezsFailure ,fetchaddRendezsFinale} = AddRendezSlice.actions;

export const fetchaddRendez = (centre, date, creneau) => async (dispatch) => {
  dispatch(fetchaddRendezsStart());
  try {
    console.log('Nous sommes dans la création du rendez-vous :', centre, date, creneau);

    const addRendez = await saveRendezVous({ centreSante_Id: centre, crenea_Id: creneau, dateRendezVous: date });
    
    // Si la création du rendez-vous réussit, on dispatch l'action de succès
    dispatch(fetchaddRendezsSuccess(addRendez));
  } catch (error) {
    if (error.response) {
      // Si une réponse a été reçue du serveur, afficher le message d'erreur renvoyé par l'API
      console.error('Erreur lors de la création du rendez-vous:', error.response.data);
      dispatch(fetchaddRendezsFailure(error.response.data));
    } else {
      // Si aucune réponse n'a été reçue du serveur, afficher l'erreur générique
      console.error('Erreur lors de la création du rendez-vousg:', error.message);
      dispatch(fetchaddRendezsFailure(error.message));
    }
  }
};


export const selectRendez = (state) => state.addRendezVous?.rendezObjet || [];
export const selectLoadingAdd = (state) => state.addRendezVous.loading;
export const selectErrorAdd = (state) => state.addRendezVous.error ;
export const selectSuccesAdd = (state) => state.addRendezVous.succes ;

export default AddRendezSlice.reducer;