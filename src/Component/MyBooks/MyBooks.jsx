import { useState, useEffect, useCallback } from "react";
import { nanoid } from "nanoid";
import MyBookForm from "./MyBookForm/MyBookForm.jsx";
import MyBookList from "./MyBookList/MyBookList.jsx";
import styles from "./my-books.module.css";

const MyBooks = () => {
  const initialBooks = JSON.parse(localStorage.getItem("my-books")) || [
    { id: nanoid(), name: "Rosie Simpson", number: "459-12-56" },
    { id: nanoid(), name: "Hermione Kline", number: "443-89-12" },
    { id: nanoid(), name: "Eden Clements", number: "645-17-79" },
    { id: nanoid(), name: "Annie Copeland", number: "227-91-26" },
  ];
  const [books, setBooks] = useState(initialBooks);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("my-books", JSON.stringify(books));
  }, [books]);
  const isDublicate = ({ name, number }) => {
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
  };

  const addBook = (data) => {
    if (isDublicate(data)) {
      return alert(`${data.name}:${data.number} is already in contacts.`);
    }
    setBooks((prevBooks) => {
      const newBook = {
        id: nanoid(),
        ...data,
      };
      return [...prevBooks, newBook];
    });
  };
  const deleteBook = useCallback((id) => {
    setBooks((prevBooks) => prevBooks.filter((item) => item.id !== id));
  }, []);

  const changeFilter = useCallback(({ target }) => setFilter(target.value), []);

  const getFilterdBooks = () => {
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
  };
  const items = getFilterdBooks();
  return (
    <div className={styles.wrapper}>
      <MyBookForm onSubmit={addBook} />
      <div className={styles.listWrapper}>
        <h2>Contacts</h2>
        <p>Find contacts by name</p>
        <input onChange={changeFilter} name="filter" placeholder="Search" />
        <MyBookList items={items} deleteBook={deleteBook} />
      </div>
    </div>
  );
};

export default MyBooks;
