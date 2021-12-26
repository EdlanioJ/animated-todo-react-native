import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import shortid from 'shortid';

import { Task, TaskAction, TaskContextData, TaskState } from '../model';
import {
  addTask,
  loadTasks,
  removeTask,
  setEditingID,
  toggleTask,
  updateTaskSubject,
} from '../actions/task';

const TaskContext = createContext({} as TaskContextData);

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'LOAD_TASK': {
      const { tasks } = action.payload;

      return {
        ...state,
        taskIsLoading: false,
        upload: false,
        tasks: [...state.tasks, ...tasks],
      };
    }
    case 'ADD_TASK': {
      const { task } = action.payload;
      const prevData = [...state.tasks];

      return {
        ...state,
        upload: false,
        tasks: [task, ...prevData],
        editingItemId: action.payload.task.id,
      };
    }
    case 'REMOVE_TASK': {
      const { id } = action.payload;

      const tasks = state.tasks.filter((task) => task.id !== id);

      return {
        ...state,
        upload: true,
        tasks,
      };
    }
    case 'UPDATE_TASK_SUBJECT': {
      const { subject, task } = action.payload;
      const tasks = [...state.tasks];
      const index = state.tasks.indexOf(task);

      tasks[index] = {
        ...task,
        subject: subject,
      };

      return { ...state, upload: true, tasks, editingItemId: null };
    }
    case 'SET_EDITING_ID': {
      const { id } = action.payload;

      return { ...state, upload: false, editingItemId: id };
    }
    case 'TOGGLE_TASK': {
      const { task } = action.payload;
      const tasks = [...state.tasks];
      const index = state.tasks.indexOf(task);
      tasks[index] = {
        ...task,
        done: !task.done,
      };

      return { ...state, upload: true, tasks };
    }
    default:
      return state;
  }
}

const initialState: TaskState = {
  taskIsLoading: true,
  editingItemId: null,
  tasks: [],
  upload: false,
};

const TASK_COLLECTION = '@todo:task';
const TaskProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  useEffect(() => {
    async function loadTask() {
      const response = await AsyncStorage.getItem(TASK_COLLECTION);
      if (response === null) return;
      const tasks: Task[] = JSON.parse(response);
      dispatch(loadTasks(tasks));
    }

    loadTask();
  }, []);

  useEffect(() => {
    async function saveTask() {
      try {
        if (!state.upload) return;
        await AsyncStorage.setItem(
          TASK_COLLECTION,
          JSON.stringify(state.tasks)
        );
      } catch (error) {
        console.error(error);
      }
    }

    saveTask();
  }, [state.tasks]);

  const addTaskItem = useCallback(() => {
    const id = shortid.generate();
    const task: Task = {
      id,
      subject: '',
      done: false,
    };

    dispatch(addTask(task));
  }, [dispatch]);

  const toggleTaskItem = useCallback(
    (task: Task) => {
      dispatch(toggleTask(task));
    },
    [dispatch]
  );

  const changeTaskItemSubject = useCallback(
    (task: Task, subject: string) => {
      dispatch(updateTaskSubject({ task, subject }));
    },
    [dispatch]
  );

  const pressTaskItemLabel = useCallback(
    (id: string) => {
      dispatch(setEditingID(id));
    },
    [dispatch]
  );

  const removeTaskItem = useCallback(
    (id: string) => {
      dispatch(removeTask(id));
    },
    [dispatch]
  );

  return (
    <TaskContext.Provider
      value={{
        addTaskItem,
        changeTaskItemSubject,
        pressTaskItemLabel,
        removeTaskItem,
        toggleTaskItem,
        state,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export function useTask() {
  const context = useContext(TaskContext);
  return context;
}

export default TaskProvider;
