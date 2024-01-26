import { Component } from "react";
import { nanoid } from "nanoid";
import styles from "./my-book-form.module.css";

const INITIAL_STATE = {
  contacts: [],
  name: "",
  number: "",
};

class MyBookForm extends Component {
  bookTitleId = nanoid();
  bookAuthorId = nanoid();

  state = { ...INITIAL_STATE };

  handleChange = ({ target }) => {
    // const { name, value } = target;
    // this.setState({
    //     [name]: value
    // }
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
      this.setState({
        [name]: formattedNumber,
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state });
    this.reset();
  };
  reset() {
    this.setState({ ...INITIAL_STATE });
  }
  render() {
    const { bookTitleId, bookAuthorId, handleSubmit, handleChange } = this;
    const { name, number } = this.state;
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
  }
}

export default MyBookForm;
