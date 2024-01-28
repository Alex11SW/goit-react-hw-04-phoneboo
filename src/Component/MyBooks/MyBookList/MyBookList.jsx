import styles from "./my-book-list.module.css";

const MyBookList = ({ items, deleteBook }) => {
  if (!Array.isArray(items)) {
    // Если items не является массивом, выводим сообщение об ошибке и возвращаем null
    console.error("Items is not an array:", items);
    return null;
  }
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
