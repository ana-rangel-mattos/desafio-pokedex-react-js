import styles from "./DetailsField.module.css";

function DetailsField({ children }) {
  return <div className={styles.fields}>{children}</div>;
}

export default DetailsField;
