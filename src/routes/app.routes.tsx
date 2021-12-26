import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainScreen from '../screens/MainScreen';
import AboutScreen from '../screens/AboutScreen';
import SideBar from '../components/SideBar';

const Drawer = createDrawerNavigator();

function AppRoutes() {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      drawerContent={(props) => <SideBar {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'back',
        overlayColor: '#00000000',
      }}
    >
      <Drawer.Screen name="Main" component={MainScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  );
}

export default AppRoutes;
