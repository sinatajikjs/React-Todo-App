import styles from "./Todo.module.css";
import { useState, createRef, useContext } from "react";
import { dispatchContext } from "../TodoApp/TodoApp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";

const Todo = ({ task }) => {
  const dispatch = useContext(dispatchContext);
  const [InputValue, setInputValue] = useState(task.title);
  const changeHandler = (e) => {
    setInputValue(e.target.value);
  };
  const clickHandler = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };
  const blurHandler = (e) => {
    e.preventDefault();
    inputRef.current.disabled = true;
    dispatch({ type: "edit", inputValue: InputValue, id: task.id });
  };
  const deleteHandler = (id) => {
    dispatch({ type: "delete", id: id });
  };
  const checkHandler = (id) => {
    dispatch({ type: "check", id: id });
  };
  const inputRef = createRef();
  return (
    <div
      className={`${styles.taskContainer} ${
        task.isChecked ? styles.taskContainerChecked : null
      }`}
      key={task.id}
    >
      <section className={styles.title}>
        <span className={styles.checkBox}>
          <input
            onClick={() => checkHandler(task.id)}
            className={styles.fakeCheckBox}
            type="checkbox"
            defaultChecked={task.isChecked}
          />
          <FontAwesomeIcon className={styles.checkIcon} icon={faCheck} />
        </span>
        <form
          onClick={clickHandler}
          onSubmit={blurHandler}
          onBlur={blurHandler}
        >
          <input
            ref={inputRef}
            onChange={changeHandler}
            defaultValue={task.title}
            disabled={true}
            type="text"
            className={`${styles.input} ${
              task.isChecked ? styles.inputChecked : null
            }`}
          />
        </form>
      </section>
      <FontAwesomeIcon
        onClick={() => deleteHandler(task.id)}
        className={styles.trash}
        icon={faTrash}
      />
    </div>
  );
};

export default Todo;
