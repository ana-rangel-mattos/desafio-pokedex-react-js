import styles from "./Button.module.css";

function Button({ onClick, disabled, children }) {
  return (
    <button
      onClick={onClick}
      className={styles.btn}
      disabled={disabled || false}
    >
      {children}
    </button>
  );
}

export default Button;
