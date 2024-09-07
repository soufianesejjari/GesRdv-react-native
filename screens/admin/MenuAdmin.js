import { createDrawerNavigator } from '@react-navigation/drawer'
import Dashboard from './dashboard'
import AddCentre from './AddCentre'
import Elements from './Elements'
import { useState } from 'react'
import Profile from '../Profile'

const Drawer = createDrawerNavigator()
function MenuAdmin () {
  const [columns, setColumns] = useState([
    'nom',
    'adresse',
    'email',
    'telephone'
    // Ajoutez d'autres propriétés si nécessaire
  ])
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: '#37C2D0',
        drawerContentContainerStyle: { marginTop: 50 },
        itemStyle: {
          marginVertical: 5,

          fontSize: 16 // Change the font size of the text
        } // Add vertical margin between items
      }}
    >
      <Drawer.Screen name='Dashboard' component={Dashboard} />
      <Drawer.Screen
        name='Centers'
        component={Elements}
        initialParams={{ columnss: columns }}
      />

      <Drawer.Screen name='Ajoutez Centre ' component={AddCentre} />
      <Drawer.Screen name='Profile ' component={Profile} />
    </Drawer.Navigator>
  )
}
export default MenuAdmin
