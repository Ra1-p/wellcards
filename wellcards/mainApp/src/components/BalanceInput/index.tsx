import classNames from "./BalanceInput.module.scss";

type BalanceInputProps = {
  symbolPadding?: string;
  small?: boolean;
} & CustomInputProps;

export default function BalanceInput({
  small,
  symbolPadding,
  label,
  onChange,
  width,
  value,
  placeholder,
  labelMargin,
}: BalanceInputProps) {
  const labelClassName = [
    classNames["balance-input__label"],
    small && classNames["small"],
  ];
  return (
    <label style={{ width: width }} className={labelClassName.join(" ")}>
      {label}
      <span className={classNames["balance-input__symbol"]}>$</span>
      <input
        value={value}
        style={{ marginTop: labelMargin, paddingLeft: symbolPadding }}
        type='number'
        min={20}
        placeholder={placeholder}
        className={classNames["balance-input"]}
        onChange={onChange}
      />
    </label>
  );
}
