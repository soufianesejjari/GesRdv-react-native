import { createSlice } from '@reduxjs/toolkit';
import authService from '../../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAdmin:false,
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    loginStart(state) {
      state.isAdmin=false,
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginAdmin(state) {
      state.isAdmin = true;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.isAdmin = false;

    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout,loginAdmin } = authSlice.actions;

export const login = (credentials) => async (dispatch) => {

  dispatch(loginStart());
  try {
    const { mail, userName, token ,roles } = await authService.login(credentials);;
  console.log("chhhhhhhhhhhhof", roles)

    await AsyncStorage.setItem('token', token); // Storing token in AsyncStorage
    await AsyncStorage.setItem('roles', roles); // Storing token in AsyncStorage

    const isAdmin = roles.includes("ADMIN");
    if(isAdmin){
      console.log('admindddddddddd')
      await AsyncStorage.setItem('role', "ADMIN"); // Storing token in AsyncStorage

      dispatch(loginAdmin())
    }
    else {
      console.warn("rrrrrrrrrrrrrrrrr",roles)

    }

 //   const user = console.log("user est ",token)

    await AsyncStorage.setItem('token', token); // Storing token in AsyncStorage
    await AsyncStorage.setItem('mail', mail); 
    await AsyncStorage.setItem('userName', userName); 
    dispatch(loginSuccess(token));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};
export const inscreption = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const  { mail, userName, token }  = await authService.registre(credentials);
  
    await AsyncStorage.setItem('mail', mail); 
    await AsyncStorage.setItem('userName', userName); 
    await AsyncStorage.setItem('token', token); 
    await AsyncStorage.setItem('role', "USER"); 

    dispatch(loginSuccess(token));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

// Function to check if user is logged in
export const checkIfLoggedIn = () => async (dispatch) => {
  const token = await AsyncStorage.getItem('token');
  const roles = await AsyncStorage.getItem('roles');


  if (token) {
const isAdmins=  await AsyncStorage.getItem('role' ); 
if(isAdmins=="ADMIN"){
  dispatch(loginAdmin())
}
else{
  console.log('he is not admin')

}
    console.log("token est  ",token)
    dispatch(loginSuccess({ token }));
  }
};
export const fetchlougOut = () => async (dispatch) => {
  console.log('start')

  await AsyncStorage.removeItem('token', null); // Storing token in AsyncStorage
  await AsyncStorage.removeItem('mail', null); 
  await AsyncStorage.removeItem('userName', null); 
  await AsyncStorage.removeItem('role', null); 
  await AsyncStorage.removeItem('roles', null); 

  console.log("lougout")
  if (token) {
    console.log("token est  ",token)
    dispatch(logout());
  }
};
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectIsAdmin = (state) => state.auth.isAdmin;

export default authSlice.reducer;
