import classNames from "./CustomCheckbox.module.scss";

export default function CustomCheckbox({
  size,
  auth,
  label,
  checked,
  onChange,
}: CustomCheckboxProps) {
  const labelClassNames = [classNames["checkbox__label"]];
  if (label === ".") {
    labelClassNames.push(classNames['checkbox__label_hidden'])
  }
  const markClassNames = [classNames[`checkbox__mark`], classNames[`checkbox__mark_${size}`]];
  if (auth) {
    labelClassNames.push(classNames["checkbox__auth-label"]);
    markClassNames.push(classNames["checkbox__auth-mark"]);
  }
  return (
    <label className={labelClassNames.join(" ")}>
      <input
        checked={checked}
        className={classNames["checkbox"]}
        type='checkbox'
        onChange={onChange}
      />
      <div className={markClassNames.join(" ")}></div>
      {label}
    </label>
  );
}
