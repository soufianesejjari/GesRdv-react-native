import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducers/CounterSlice'
import  centerSlice  from './reducers/CentresSlice'
import authSlice from './reducers/authSlice'
import  RendezSlice  from './reducers/RdvSlice'
import AddRendezSlice from './reducers/AddRendezSlice'
import  centerInfoSlice  from './reducers/CenterInfoSlice'

export const store = configureStore({
  reducer: {
    addRendezVous:AddRendezSlice,
    auth:authSlice,
    centerInfo: centerInfoSlice,
    centers: centerSlice,
    rendezVous: RendezSlice,
    counter: counterReducer,
  },
})