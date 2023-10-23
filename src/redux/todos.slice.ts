import { createSlice } from '@reduxjs/toolkit';
import type { Action, PayloadAction } from '@reduxjs/toolkit';
import type { StateType, Todo } from '../types';

const STORAGE_KEY = 'react-redux-todo';

const initialState: StateType = {
  todos: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as Todo[],
  editedId: 0,
  filter: 'all',
};

export const todosSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    addTodo: (state: StateType, action: PayloadAction<string>) => {
      if (action.payload) {
        state.todos = [
          ...state.todos,
          {
            id: Date.now(),
            title: action.payload,
            completed: false,
          },
        ];
      }
    },
    toggleAll: (state: StateType, action: PayloadAction<boolean>) => {
      state.todos = [
        ...state.todos.map((todo: Todo) => {
          return {
            id: todo.id,
            title: todo.title,
            completed: action.payload,
          };
        }),
      ];
    },
    setEditedId: (state: StateType, action: PayloadAction<number>) => {
      state.editedId = action.payload;
    },
    updateTodo: (state: StateType, action: PayloadAction<Todo>) => {
      if (action.payload.id) {
        state.todos = [
          ...state.todos.map((el: Todo) => {
            return el.id !== action.payload.id
              ? { ...el }
              : {
                  id: action.payload.id,
                  title: action.payload.title,
                  completed: action.payload.completed,
                };
          }),
        ];
      }
    },
    removeTodo: (state: StateType, action: PayloadAction<number>) => {
      if (action.payload) {
        state.todos = [
          ...state.todos.filter((el: Todo) => el.id !== action.payload),
        ];
      }
    },
    setFilter: (state: StateType, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    removeCompleted: (state: StateType, action: Action) => {
      if (
        action &&
        state.todos.filter((el: Todo) => el.completed === true).length > 0
      ) {
        state.todos = [
          ...state.todos.filter((el: Todo) => el.completed !== true),
        ];
      }
    },
    saveToLocal: (state: StateType, action: Action) => {
      if (action) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
      }
    },
  },
});

export const {
  addTodo,
  toggleAll,
  setEditedId,
  updateTodo,
  removeTodo,
  setFilter,
  removeCompleted,
  saveToLocal,
} = todosSlice.actions;

export default todosSlice.reducer;
