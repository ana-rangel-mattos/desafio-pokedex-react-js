import styles from "./CloseButton.module.css";

function CloseButton({ onClick, children }) {
  return (
    <button className={styles.closeBtn} onClick={onClick}>
      {children}
    </button>
  );
}

export default CloseButton;
