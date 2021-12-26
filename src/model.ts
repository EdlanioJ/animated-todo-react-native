import React from 'react';

export interface Task {
  id: string;
  subject: string;
  done: boolean;
}

export interface TaskState {
  tasks: Task[];
  taskIsLoading: boolean;
  editingItemId: string | null;
  upload: boolean;
}

export type TaskAction =
  | { type: 'ADD_TASK'; payload: { task: Task } }
  | { type: 'LOAD_TASK'; payload: { tasks: Task[] } }
  | { type: 'SET_EDITING_ID'; payload: { id: string } }
  | { type: 'TOGGLE_TASK'; payload: { task: Task } }
  | { type: 'UPDATE_TASK_SUBJECT'; payload: { task: Task; subject: string } }
  | { type: 'REMOVE_TASK'; payload: { id: string } };

export interface TaskContextData {
  state: TaskState;
  addTaskItem: () => void;
  toggleTaskItem: (task: Task) => void;
  changeTaskItemSubject: (task: Task, subject: string) => void;
  pressTaskItemLabel: (id: string) => void;
  removeTaskItem: (id: string) => void;
}
