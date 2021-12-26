import React from 'react';
import { Fab, Icon, useColorModeValue, VStack } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';

import TaskList from '../../components/TaskList';
import AnimatedColorBox from '../../components/AnimatedColorBox';
import Masthead from '../../components/Masthead';
import NavBar from '../../components/NavBar';
import { useTask } from '../../context/task';

export default function MainScreen() {
  const { addTaskItem, state } = useTask();
  function handleAddTaskItem() {
    addTaskItem();
  }
  return (
    <AnimatedColorBox
      bg={useColorModeValue('warmGray.50', 'primary.900')}
      flex={1}
    >
      <Masthead
        title="What's up, Edlanio!"
        image={require('../../assets/masthead.png')}
      >
        <NavBar />
      </Masthead>
      <VStack
        flex={1}
        space={1}
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        mt="-20px"
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        pt="20px"
      >
        <TaskList />
      </VStack>
      {state.editingItemId === null && (
        <Fab
          position="absolute"
          renderInPortal={false}
          size="sm"
          icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
          colorScheme={useColorModeValue('blue', 'darkBlue')}
          bg={useColorModeValue('blue.500', 'blue.400')}
          onPress={handleAddTaskItem}
        />
      )}
    </AnimatedColorBox>
  );
}
