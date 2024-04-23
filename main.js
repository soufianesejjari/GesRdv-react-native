import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './redux/reducers';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Centers from './screens/Center';
import { store } from './redux/store';
import CenterDetailScreen from './screens/CenterDetaillScreen';
import SearchSlotsScreen from './screens/PrincipaleSearch';
import LoginComponent from './screens/authentification/Login';
import Inscription from './screens/authentification/SingUp';
import { checkIfLoggedIn, selectIsAuthenticated ,selectIsAdmin} from './redux/reducers/authSlice';
import { useEffect, useState } from 'react';
import {selectIsStartFetch, fetchCenters, selectCenters, selectLoading, selectError} from  './redux/reducers/CentresSlice';
import MyTabs from './screens/nav/Nav';
import ConfirmationRenderVous from './screens/rdv/ConfirmationRenderVous';
import AlertSaveRendezVous from './screens/rdv/AlertSaveRendezVous';
import Dashboard from './screens/admin/dashboard';
import GestionCentres from './screens/admin/GestionCentres';
import Elements from './screens/admin/Elements';
import CentreModifie from './screens/admin/CentreModifie';
import AddCentre from './screens/admin/AddCentre';
import MenuAdmin from './screens/admin/MenuAdmin';

export default function Main() {
  const centers = useSelector(selectCenters);
  const isAdmin = useSelector(selectIsAdmin);

  const loadingCentres = useSelector(selectLoading);
  const error = useSelector(selectError);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isStartFetch = useSelector(selectIsStartFetch);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Initial loading state

  useEffect(() => {
    const fetchData = async () => {
      dispatch(checkIfLoggedIn()); // Check if logged in
      setLoading(false); // Update loading state after checks
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isAuthenticated && !loadingCentres && !isStartFetch) {
   //   console.log('boucle',centers)

      dispatch(fetchCenters()); // Fetch centers if authenticated, not already loading, and centers are empty
    }
  }, [isAuthenticated, loadingCentres, centers]);

  const Stack = createStackNavigator();


  return (
    <Provider store={store}>  
    <StatusBar style="auto" />
    {loading ? ( // Conditionally render loading indicator
      <Text>Loading...</Text>
    ) : (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="nav" screenOptions={{ headerShown: false }}>
          {isAuthenticated ? (
            isAdmin ? (
              <Stack.Screen name="nav" component={MenuAdmin} />
            ) : (
              <Stack.Screen name="nav" component={MyTabs} />
            )
          ) : (
            <Stack.Screen name="Login" component={LoginComponent} />
          )}
          <Stack.Screen name="SingUp" component={Inscription} />
          <Stack.Screen name="AlertSaveRendezVous" component={AlertSaveRendezVous} />
          <Stack.Screen name="ConfirmationRenderVous" component={ConfirmationRenderVous} />
          <Stack.Screen name="CenterDetails" component={CenterDetailScreen} />
          <Stack.Screen name="CentreModifie" component={CentreModifie} />         
           <Stack.Screen name="lougout" component={LoginComponent} />

        </Stack.Navigator>
      </NavigationContainer>
    )}
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
