import classnames from "classnames";
import s from "./Input.module.scss";

export function Input({ type, placeholder, value, onChange, multiple }) {
  return (
    <div
      className={classnames({
        [s.combinedInput]: multiple,
        [s.pseudoInput]: !multiple
      })}
    >
      <input
        type={type}
        min="1"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
    </div>
  );
}
