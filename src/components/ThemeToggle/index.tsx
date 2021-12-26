import React from 'react';
import { HStack, Switch, Text, useColorMode } from 'native-base';

const ThemeToggle: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack space={2} alignItems={'center'}>
      <Text>Dark</Text>
      <Switch isChecked={colorMode === 'light'} onToggle={toggleColorMode} />
      <Text>Light</Text>
    </HStack>
  );
};

export default ThemeToggle;
