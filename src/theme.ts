import { ColorMode, extendTheme, StorageManager } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

const config = {
  useSystemColorMode: false,
  initialColorMode: 'light',
};

const colors = {
  primary: {
    50: '#EEF2F6',
    100: '#CFD9E7',
    200: '#B1C1D8',
    300: '#92A9C9',
    400: '#7491B9',
    500: '#5578AA',
    600: '#446088',
    700: '#334866',
    800: '#223044',
    900: '#111822',
  },
};

const THEME_NAME = '@todo:theme';
export const colorModeManager: StorageManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem(THEME_NAME);
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      console.log(e);
      return 'light';
    }
  },
  set: async (value: ColorMode) => {
    try {
      //@ts-ignore
      await AsyncStorage.setItem(THEME_NAME, value);
    } catch (e) {
      console.log(e);
    }
  },
};

export default extendTheme({ config, colors });
