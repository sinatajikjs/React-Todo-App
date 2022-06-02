import TodoList from "../TodoList/TodoList";
import React, { useReducer, createContext } from "react";
import TodoForm from "../TodoForm/TodoForm";
import styles from "./TodoApp.module.css";

export const TasksContext = createContext();
export const dispatchContext = createContext();

const TodoApp = () => {
  const initialState = [];
  const reducer = (state, action) => {
    switch (action.type) {
      case "submit": {
        const newTask = {
          id: Date.now(),
          title: action.inputValue,
          isChecked: false,
        };
        return [...state, newTask];
      }
      case "edit": {
        const targetIndex = state.findIndex((task) => task.id === action.id);
        const targetTask = { ...state[targetIndex] };
        targetTask.title = action.inputValue;
        const tasks = [...state];
        tasks[targetIndex] = targetTask;
        return tasks;
      }
      case "delete": {
        const filtered = state.filter((task) => task.id !== action.id);
        return filtered;
      }
      case "check": {
        const targetIndex = state.findIndex((task) => task.id === action.id);
        const targetTask = { ...state[targetIndex] };
        targetTask.isChecked = !targetTask.isChecked;
        const tasks = [...state];
        tasks[targetIndex] = targetTask;
        return tasks;
      }
    }
  };
  const [Tasks, dispatch] = useReducer(reducer, initialState);

  return (
    <TasksContext.Provider value={Tasks}>
      <dispatchContext.Provider value={dispatch}>
        <div className={styles.container}>
          <h1>Today's tasks</h1>
          <TodoList />
          <TodoForm />
        </div>
      </dispatchContext.Provider>
    </TasksContext.Provider>
  );
};

export default TodoApp;
