import { useEffect } from "react";
import styles from "./toast.module.scss";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto-hide after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <span className={styles.toast_message}>{message}</span>
      <button onClick={onClose} className={styles.toast_close}>
        &times;
      </button>
    </div>
  );
}
