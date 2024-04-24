import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import LoginComponent from './screens/authentification/Login';
import { useNavigation } from '@react-navigation/native';
import Inscription from './screens/authentification/SingUp';
import { checkIfLoggedIn, selectIsAuthenticated, selectIsAdmin } from './redux/reducers/authSlice';
import { selectIsStartFetch, fetchCenters, selectCenters, selectLoading, selectError } from './redux/reducers/CentresSlice';
import MyTabs from './screens/nav/Nav';
import ConfirmationRenderVous from './screens/rdv/ConfirmationRenderVous';
import AlertSaveRendezVous from './screens/rdv/AlertSaveRendezVous';
import CenterDetailScreen from './screens/CenterDetaillScreen';
import { store } from './redux/store';
import MenuAdmin from './screens/admin/MenuAdmin';
import CentreModifie from './screens/admin/CentreModifie';
import { NavigationContainer } from '@react-navigation/native';


export default function Main() {

  const navigation=useNavigation()
  const centers = useSelector(selectCenters);
  const isAdmin = useSelector(selectIsAdmin);
  const loadingCentres = useSelector(selectLoading);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isStartFetch = useSelector(selectIsStartFetch);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(checkIfLoggedIn()); // Check if logged in
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isAuthenticated && !loadingCentres && !isStartFetch) {
      dispatch(fetchCenters()); // Fetch centers if authenticated, not already loading, and centers are empty
    }
  }, [isAuthenticated, loadingCentres, centers]);

  const Stack = createStackNavigator();

  // Automatically navigate based on authentication status
  useEffect(() => {
    if (!isAuthenticated) {
      // If not authenticated, navigate to the Login screen
      navigation.navigate('Login');
    } else if (isAdmin) {
      // If authenticated as admin, navigate to the admin menu
      
      navigation.navigate('MenuAdmin');
    } else {
      // If authenticated as a regular user, navigate to the main tabs
      navigation.navigate('nav');
    }
  }, [isAuthenticated, isAdmin]);

  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="nav" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="nav" component={MyTabs} />
          <Stack.Screen name="Login" component={LoginComponent} />
          <Stack.Screen name="SingUp" component={Inscription} />
          <Stack.Screen name="AlertSaveRendezVous" component={AlertSaveRendezVous} />
          <Stack.Screen name="ConfirmationRenderVous" component={ConfirmationRenderVous} />
          <Stack.Screen name="CenterDetails" component={CenterDetailScreen} />
          <Stack.Screen name="CentreModifie" component={CentreModifie} />
          <Stack.Screen name="MenuAdmin" component={MenuAdmin} />
        </Stack.Navigator>
       
    </Provider>
  );
}
