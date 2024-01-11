type CustomElementProps = {
  fz?: string; //font-size
  fw?: string; //font-weight
  lh?: string; //line-height
  width?: string;
  height?: string;
  onClick?: React.MouseEventHandler;
};

type CustomInputProps = {
  type?: React.HTMLInputTypeAttribute;
  label?: string | JSX.Element;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  ref?: React.LegacyRef<HTMLInputElement>;
  name?: string;
  value?: string | number;
  labelMargin?: string;
  placeholder?: string;
  readonly?: boolean;
} & CustomElementProps;

type CustomSelectProps = {
  label?: string | JSX.Element;
  onChange?: (value: string) => void;
  value?: string;
  options: OptionType[];
} & CustomElementProps;

type OptionType = {
  text: string;
  value: string;
};

type CustomCheckboxProps = {
  size: "big" | "small",
  checked?: boolean;
  auth?: boolean;
} & CustomElementProps &
  Pick<CustomInputProps, "onChange" | "value" | "label">;
