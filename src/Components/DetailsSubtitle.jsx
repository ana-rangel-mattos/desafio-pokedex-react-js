import styles from "./DetailsSubtitle.module.css";

function DetailsSubtitle({ children }) {
  return <strong className={styles.subtitle}>{children}</strong>;
}

export default DetailsSubtitle;
