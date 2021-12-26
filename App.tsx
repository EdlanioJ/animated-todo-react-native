import { NativeBaseProvider } from 'native-base';
import React from 'react';
import TaskProvider from './src/context/task';

import Routes from './src/routes';
import MainScreen from './src/screens/MainScreen';
import theme from './src/theme';

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <TaskProvider>
        <Routes />
      </TaskProvider>
    </NativeBaseProvider>
  );
}
