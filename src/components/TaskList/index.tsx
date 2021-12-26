import React, { useRef } from 'react';
import { AnimatePresence, View } from 'moti';
import {
  PanGestureHandlerProps,
  ScrollView,
} from 'react-native-gesture-handler';

import { useTask } from '../../context/task';
import { Task } from '../../model';

import { makeStyledComponent } from '../../utils/styled';
import TaskItem from '../TaskItem';
import { HStack, Spinner, Text } from 'native-base';

const StyledView = makeStyledComponent(View);
const StyledScrollView = makeStyledComponent(ScrollView);

interface TaskItemProps
  extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  data: Task;
  isEditing: boolean;
}

export const EmptyTask: React.FC = () => {
  return (
    <StyledView
      w="full"
      alignItems="center"
      height="46px"
      from={{ opacity: 0, marginTop: -60 }}
      animate={{ opacity: 1, marginTop: 0 }}
      exit={{ opacity: 0, marginTop: -46 }}
    >
      <Text fontSize={12} fontWeight="bold" textTransform="uppercase">
        You have no tasks
      </Text>
    </StyledView>
  );
};
export const AnimatedTaskItem: React.FC<TaskItemProps> = ({
  data,
  isEditing,
  simultaneousHandlers,
}) => {
  const {
    changeTaskItemSubject,
    pressTaskItemLabel,
    removeTaskItem,
    toggleTaskItem,
  } = useTask();
  function handleToggleTaskItem() {
    toggleTaskItem(data);
  }

  async function handleChangeTaskItemSubject(subject: string) {
    changeTaskItemSubject(data, subject);
  }

  function handlePressTaskItemLabel() {
    pressTaskItemLabel(data.id);
  }

  function handleRemoveTaskItem() {
    removeTaskItem(data.id);
  }

  return (
    <StyledView
      w="full"
      from={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46,
      }}
      animate={{ opacity: 1, scale: 1, marginBottom: 0 }}
      exit={{ opacity: 0, scale: 0.5, marginBottom: -46 }}
    >
      <TaskItem
        simultaneousHandlers={simultaneousHandlers}
        subject={data.subject}
        isDone={data.done}
        isEditing={isEditing}
        onToggleCheckBox={handleToggleTaskItem}
        onChangeSubject={handleChangeTaskItemSubject}
        onPressLabel={handlePressTaskItemLabel}
        onRemove={handleRemoveTaskItem}
      />
    </StyledView>
  );
};

const TaskList: React.FC = () => {
  const { state } = useTask();
  const refScrollView = useRef(null);

  return (
    <StyledScrollView w="full" ref={refScrollView}>
      {state.taskIsLoading ? (
        <HStack w="full" justifyContent="center">
          <Spinner color="primary.500" size="sm" />
        </HStack>
      ) : (
        <AnimatePresence>
          {state.tasks.length === 0 ? (
            <EmptyTask />
          ) : (
            state.tasks.map((task) => (
              <AnimatedTaskItem
                key={task.id}
                data={task}
                simultaneousHandlers={refScrollView}
                isEditing={task.id === state.editingItemId}
              />
            ))
          )}
        </AnimatePresence>
      )}
    </StyledScrollView>
  );
};

export default TaskList;
