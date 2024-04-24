import { createSlice } from '@reduxjs/toolkit';
import { getAvalaibleCreneau } from '../../services/RendezVousService';


const initialState = {
  rendezObjet: 10,
  rendezDispos: [],
  loading: false,
  error: null,
  started : false,
};

export const RendezSlice = createSlice({
  name: 'rendezVous',
  initialState,
  reducers: {

    fetchRendezsStart(state) {
      
      state.loading = true;
      state.started = true
      state.error = null;
    },
    fetchRendezsReset(state) {
      state.started=false
      state.loading = false;
      state.rendezDispos=null
      state.error = null;
    },
    fetchRendezsSuccess(state, action) {
      state.rendezDispos = action.payload;
      state.loading = false;

    },
    fetchRendezsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchRendezsStart, fetchRendezsSuccess, fetchRendezsFailure ,fetchRendezsReset} = RendezSlice.actions;

export const fetchRendezs = (centre, date, creneau) => async (dispatch) => {
  
  dispatch(fetchRendezsStart());
  try {
    console.log('e=on est loooooooo',centre)

    const Rendezs = await getAvalaibleCreneau(centre, date, creneau);
    //const Rendezs = response.data; // Supposons que les données des centres se trouvent dans la propriété data de la réponse HTTP

    const normalizedRendezs = Rendezs.map((Rendez) => ({
      id:Rendez.id,
      nom: Rendez.nom,
      date :Rendez.date,
      heureDebut: Rendez.heureDebut,
      heureFin: Rendez.heureFin,
      capacite: Rendez.capacite,
      // Ajoutez d'autres propriétés si nécessaire
    }));
   // console.log('e=on est laaaaaaaaaa',normalizedCenters)
    dispatch(fetchRendezsSuccess(normalizedRendezs));
  } catch (error) {
    dispatch(fetchRendezsFailure(error.message));
  }
};

export const selectRendezs = (state) => state.rendezVous?.rendezDispos || [];
export const selectLoading = (state) => state.rendezVous.loading;
export const selectError = (state) => state.rendezVous.error ;
export const selectStared = (state) => state.rendezVous.started ;

export default RendezSlice.reducer;



