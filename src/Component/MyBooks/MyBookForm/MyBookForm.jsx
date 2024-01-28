import { useState, useMemo, memo, useCallback } from "react";
import { nanoid } from "nanoid";
import styles from "./my-book-form.module.css";

const INITIAL_STATE = {
  contacts: [],
  name: "",
  number: "",
};
const MyBookForm = ({ onSubmit }) => {
  const [state, setState] = useState({ ...INITIAL_STATE });
  const bookTitleId = useMemo(() => nanoid(), []);
  const bookAuthorId = useMemo(() => nanoid(), []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    if (name === "number") {
      let formattedNumber = value.replace(/\D/g, "");
      if (formattedNumber.length > 2) {
        formattedNumber = formattedNumber.replace(/(\d{3})(\d{2})/, "$1-$2");
      }
      if (formattedNumber.length > 5) {
        formattedNumber = formattedNumber.replace(
          /(\d{3})-(\d{2})(\d{2})/,
          "$1-$2-$3"
        );
      }
      setState({
        ...state,
        [name]: formattedNumber,
      });
    } else {
      setState({
        ...state,
        [name]: value,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...state });
    reset();
  };
  const reset = useCallback(() => {
    setState({ ...INITIAL_STATE });
  }, []);

  const { name, number } = state;
  return (
    <div className={styles.books}>
      <h1>Phonebook</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor={bookTitleId}>Name</label>
          <input
            value={name}
            onChange={handleChange}
            id={bookTitleId}
            type="text"
            name="name"
            placeholder="Name"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor={bookAuthorId}>Number</label>
          <input
            value={number}
            onChange={handleChange}
            id={bookAuthorId}
            type="tel"
            pattern="[0-9-]*"
            name="number"
            placeholder="Number"
            required
          />
        </div>
        <button type="submit">Add contact</button>
      </form>
    </div>
  );
};

export default memo(MyBookForm);
