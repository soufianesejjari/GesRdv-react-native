import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SearchSlotsScreen from '../PrincipaleSearch';
import Center from '../Center';
import Profile from '../Profile';
import CentersScreen from '../CentersScreen';
import MenuAdmin from '../admin/MenuAdmin';
import { secondColor } from '../ConfigTheme';




const Tab = createBottomTabNavigator();

const MyTabs = () => {

  const tabBarOptions = {
    
    tabBarInactiveBackgroundColor :  '#8ecae6', 

    tabBarActiveBackgroundColor :  '#8ecae6', 
    activeTintColor: secondColor, // Couleur de l'icône active
    inactiveTintColor:  '#023047', // Couleur de l'icône inactive
    labelStyle: {
      fontSize: 15, // Taille du texte
      fontWeight: 'bold', // Poids de la police du texte
    },
   // tabBarStyle: {  backgroundColor:  '#8ecae6', 
  //},

 
  };
  const screenOpp = {
    tabBarInactiveBackgroundColor :  '#e8ecf4', 

    tabBarActiveBackgroundColor :  '#e8ecf4', 
    activeTintColor:  '#fb8500',
    inactiveTintColor: '#023047', 
    labelStyle: {
      fontSize: 15, 
      fontWeight: 'bold', 
    },
   // tabBarStyle: {  backgroundColor: isDarkMode ? '#1F2937' : '#8ecae6', 
  //},

 
  };

  return (
    <Tab.Navigator initialRouteName="Home"   tabBarOptions={tabBarOptions} screenOptions={screenOpp}>
      <Tab.Screen
        name="Home"
        component={SearchSlotsScreen}
        options={{
          headerShown:false ,
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
  {/*     <Tab.Screen
        name="Centers"
        component={MenuAdmin}
        options={{
          headerShown:false ,

          tabBarLabel: 'Places',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map" color={color} size={size} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Centers"
        component={CentersScreen}
        options={{
          headerShown:false ,

          tabBarLabel: 'Centers',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="format-list-bulleted" color={color} size={size} />
          ),
        }}
      />
       
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown:false ,

          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MyTabs;
