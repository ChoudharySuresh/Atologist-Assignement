import styles from "./signup-page.module.scss";
export default function Input({
  label,
  placeholder,
  type,
  value,
  onChange,
  error,
}) {
  return (
    <div className={styles.input_container}>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <p className={styles.error_text}>{error}</p>}
    </div>
  );
}
