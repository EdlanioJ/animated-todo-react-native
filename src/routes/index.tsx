import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './app.routes';

const Routes: React.FC = ({ children }) => {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
};

export default Routes;
