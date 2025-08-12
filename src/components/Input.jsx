import styles from "./signup-page.module.scss";
export default function Input({ label, placeholder, type }) {
  return (
    <div className={styles.input_container}>
      <label>{label}</label>
      <input type={type} placeholder={placeholder} />
    </div>
  );
}
