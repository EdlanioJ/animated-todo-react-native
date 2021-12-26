import { Task, TaskAction } from '../model';

export const addTask = (task: Task): TaskAction => ({
  type: 'ADD_TASK',
  payload: { task },
});

export const removeTask = (id: string): TaskAction => ({
  type: 'REMOVE_TASK',
  payload: { id },
});

export const toggleTask = (task: Task): TaskAction => ({
  type: 'TOGGLE_TASK',
  payload: { task },
});

export const setEditingID = (id: string): TaskAction => ({
  type: 'SET_EDITING_ID',
  payload: { id },
});

export const loadTasks = (tasks: Task[]): TaskAction => ({
  type: 'LOAD_TASK',
  payload: { tasks },
});

export const updateTaskSubject = ({
  task,
  subject,
}: {
  task: Task;
  subject: string;
}): TaskAction => {
  return {
    type: 'UPDATE_TASK_SUBJECT',
    payload: { subject, task },
  };
};
