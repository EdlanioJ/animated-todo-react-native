import {
  Box,
  HStack,
  Icon,
  Input,
  useColorModeValue,
  useToken,
} from 'native-base';
import React, { useCallback, useRef, useState } from 'react';
import _ from 'lodash';

import {
  NativeSyntheticEvent,
  Pressable,
  TextInputChangeEventData,
} from 'react-native';
import { PanGestureHandlerProps } from 'react-native-gesture-handler';

import Feather from '@expo/vector-icons/Feather';

import AnimatedCheckBox from '../AnimatedCheckBox';
import AnimatedTaskLabel from '../AnimatedTaskLabel';
import SwipeableView from '../SwipeableView';

interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  isDone: boolean;
  isEditing: boolean;
  onToggleCheckBox?: () => void;
  onPressLabel?: () => void;
  onRemove?: () => void;
  onChangeSubject?: (subject: string) => void;
  subject: string;
}

const TaskItem: React.FC<Props> = ({
  isDone,
  isEditing,
  onToggleCheckBox,
  subject,
  onPressLabel,
  onChangeSubject,
  onRemove,
  simultaneousHandlers,
}) => {
  const [text, setText] = useState(subject);

  const highlightColor = useToken(
    'colors',
    useColorModeValue('blue.500', 'blue.400')
  );
  const boxStroke = useToken(
    'colors',
    useColorModeValue('muted.300', 'muted.500')
  );

  const checkmarkColor = useToken(
    'colors',
    useColorModeValue('white', 'white')
  );

  const activeTextColor = useToken(
    'colors',
    useColorModeValue('darkText', 'lightText')
  );
  const doneTextColor = useToken(
    'colors',
    useColorModeValue('muted.400', 'muted.600')
  );

  const handleChangeText = useCallback(
    _.debounce((value: string) => {
      setText(value);
    }, 200),
    []
  );
  const handleSubmit = () => {
    onChangeSubject && onChangeSubject(text);
  };

  return (
    <SwipeableView
      simultaneousHandlers={simultaneousHandlers}
      onSwipeLeft={onRemove}
      backView={
        <Box
          w="full"
          h="full"
          bg="red.500"
          alignItems="flex-end"
          justifyContent="center"
          pr={4}
        >
          <Icon color="white" as={<Feather name="trash-2" />} size="sm" />
        </Box>
      }
    >
      <HStack
        alignItems="center"
        w="full"
        px={4}
        py={2}
        bg={useColorModeValue('warmGray.50', 'primary.900')}
      >
        <Box width={30} height={30} mr={2}>
          <Pressable onPress={onToggleCheckBox}>
            <AnimatedCheckBox
              highlightColor={highlightColor}
              checkmarkColor={checkmarkColor}
              boxOutlineColor={boxStroke}
              checked={isDone}
            />
          </Pressable>
        </Box>
        {isEditing ? (
          <Input
            placeholder="Task"
            defaultValue={subject}
            variant="unstyled"
            fontSize={19}
            px={1}
            py={0}
            autoFocus
            blurOnSubmit
            onChangeText={handleChangeText}
            onBlur={handleSubmit}
            onSubmitEditing={handleSubmit}
          />
        ) : (
          <AnimatedTaskLabel
            textColor={activeTextColor}
            inactiveTextColor={doneTextColor}
            strikethrough={isDone}
            onPress={onPressLabel}
          >
            {subject}
          </AnimatedTaskLabel>
        )}
      </HStack>
    </SwipeableView>
  );
};

export default TaskItem;
