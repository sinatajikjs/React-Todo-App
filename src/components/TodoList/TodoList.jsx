import { useContext } from "react";
import Todo from "../Todo/Todo";
import { TasksContext } from "../TodoApp/TodoApp";
import styles from "./TodoList.module.css";

const TodoList = () => {
  const Tasks = useContext(TasksContext);
  return (
    <div className={styles.todoList}>
      {Tasks.length ? (
        Tasks.map((task) => <Todo task={task} key={task.id} />)
      ) : (
        <div className={styles.emptyTasks}>There is not any tasks yet!</div>
      )}
    </div>
  );
};

export default TodoList;
