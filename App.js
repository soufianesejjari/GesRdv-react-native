import 'react-native-gesture-handler';

import { StyleSheet, Text, View } from 'react-native';

import { Provider, useDispatch, useSelector } from 'react-redux'; 
import { store } from './redux/store';

import {checkIfLoggedIn, selectIsAuthenticated } from './redux/reducers/authSlice';
import Main from './main';
import { NavigationContainer } from '@react-navigation/native';
// Création du store Redux avec le rootReducer à l'aide de configureStore

export default function App() {
 
  return (
    <Provider store={store}>
      <NavigationContainer>
      <Main/>


      </NavigationContainer>
 </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
