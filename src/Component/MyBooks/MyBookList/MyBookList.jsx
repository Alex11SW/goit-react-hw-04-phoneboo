import styles from "./my-book-list.module.css";

const MyBookList = ({ items, deleteBook }) => {
  const elements = items.map(({ id, name, number }) => (
    <li key={id}>
      {name}: {number}
      <button
        className={styles.delbutton}
        onClick={() => deleteBook(id)}
        type="button"
      >
        Delete
      </button>
    </li>
  ));
  return (
    <div className={styles.list}>
      <ul>{elements}</ul>
    </div>
  );
};

export default MyBookList;
