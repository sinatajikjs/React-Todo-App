import { useContext, useState } from "react";
import styles from "./TodoForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { dispatchContext } from "../TodoApp/TodoApp";
const TodoForm = () => {
  const dispatch = useContext(dispatchContext);
  const [InputValue, setInputValue] = useState("");
  const [ErrorRender, setErrorRender] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (InputValue) {
      dispatch({ type: "submit", inputValue: InputValue });
      setInputValue("");
    } else {
      setErrorRender(true);
      setTimeout(() => {
        setErrorRender(false);
      }, 2000);
    }
  };
  const changeHandler = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div>
      <section
        className={`${styles.error} ${ErrorRender ? styles.errorEnable : null}`}
      >
        <span className={styles.iconContainer}>
          <FontAwesomeIcon className={styles.icon} icon={faXmark} />
        </span>
        <p>Please Enter a Task</p>
      </section>
      <form onSubmit={submitHandler} className={styles.form}>
        <input
          placeholder="Write a task"
          className={styles.input}
          value={InputValue}
          type="text"
          onChange={changeHandler}
        />
        <button className={styles.button} type="submit">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
