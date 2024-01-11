import "./CustomInput.scss";

export default function CustomInput({
  width,
  height,
  placeholder,
  label,
  name,
  type,
  labelMargin,
  onChange,
  onBlur,
  ref,
  readonly,
  value,
}: CustomInputProps) {
  return (
    <label style={{ width, height }} className={`custom-input__label`}>
      {label}
      <input
        name={name}
        ref={ref}
        readOnly={readonly}
        value={value}
        style={{ marginTop: labelMargin }}
        type={type}
        placeholder={placeholder}
        className={`custom-input`}
        onChange={onChange}
        onBlur={onBlur}
      >
      </input>
    </label>
  );
}
