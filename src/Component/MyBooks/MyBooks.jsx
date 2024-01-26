import { Component } from "react";
import { nanoid } from "nanoid";
import MyBookForm from "./MyBookForm/MyBookForm.jsx";
import MyBookList from "./MyBookList/MyBookList.jsx";
import styles from "./my-books.module.css";

class MyBooks extends Component {
  state = {
    books: [
      { id: nanoid(), name: "Rosie Simpson", number: "459-12-56" },
      { id: nanoid(), name: "Hermione Kline", number: "443-89-12" },
      { id: nanoid(), name: "Eden Clements", number: "645-17-79" },
      { id: nanoid(), name: "Annie Copeland", number: "227-91-26" },
    ],
    // bookss: [{
    //     id: nanoid(),
    //     name: "fafop",
    //     number: "400-0003-332",
    // }],
    filter: "",
  };

  componentDidMount() {
    const books = JSON.parse(localStorage.getItem("my-books"));
    if (books?.length) {
      this.setState({
        books,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { books } = this.state;
    if (prevState.books !== books) {
      localStorage.setItem("my-books", JSON.stringify(books));
    }
  }

  isDublicate({ name, number }) {
    const { books } = this.state;
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();
    const dublicate = books.find((item) => {
      const normalizedCurrentName = item.name.toLowerCase();
      const normalizedCurrentNumber = item.number.toLowerCase();
      return (
        normalizedCurrentName === normalizedName &&
        normalizedCurrentNumber === normalizedNumber
      );
    });
    return Boolean(dublicate);
  }

  addBook = (data) => {
    if (this.isDublicate(data)) {
      return alert(`${data.name}:${data.number} is already in contacts.`);
    }
    this.setState(({ books }) => {
      const newBook = {
        id: nanoid(),
        ...data,
      };
      return {
        books: [...books, newBook],
      };
    });
  };
  deleteBook = (id) => {
    this.setState(({ books }) => {
      const newBooks = books.filter((item) => item.id !== id);

      return {
        books: newBooks,
      };
    });
  };

  changeFilter = ({ target }) => {
    this.setState({
      filter: target.value,
    });
  };

  getFilterdBooks() {
    const { filter, books } = this.state;
    if (!filter) {
      return books;
    }
    const normalizedFilter = filter.toLowerCase();
    const filteredBooks = books.filter(({ name, number }) => {
      const normalizedName = name.toLowerCase();
      const normalizedNumber = number.toLowerCase();

      return (
        normalizedName.includes(normalizedFilter) ||
        normalizedNumber.includes(normalizedFilter)
      );
    });
    return filteredBooks;
  }

  render() {
    const { addBook, deleteBook, changeFilter } = this;
    const books = this.getFilterdBooks();
    return (
      <div className={styles.wrapper}>
        <MyBookForm onSubmit={addBook} />
        <div className={styles.listWrapper}>
          <h2>Contacts</h2>
          <p>Find contacts by name</p>
          <input onChange={changeFilter} name="filter" placeholder="Search" />
          <MyBookList items={books} deleteBook={deleteBook} />
        </div>
      </div>
    );
  }
}

export default MyBooks;
