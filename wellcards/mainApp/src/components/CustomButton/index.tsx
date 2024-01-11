import { PropsWithChildren } from "react";
import classNames from "./CustomButton.module.scss";

type CustomButtonProps = {
  size?: "big" | "medium" | "small";
  background: "filled" | "transparent";
  type?: "button" | "link",
  to?: string,
} & CustomElementProps;

export default function CustomButton({
  size,
  width,
  height,
  fw,
  fz,
  lh,
  type = "button",
  to,
  children,
  background,
  onClick,
}: PropsWithChildren<CustomButtonProps>) {
  const classNameArr = [
    classNames["button"],
    classNames[`button_${background}`],
  ];
  if (size) classNameArr.push(classNames[`button_${size}`]);
  return (
    <button
      style={{ width, height, fontSize: fz, fontWeight: fw, lineHeight: lh }}
      className={classNameArr.join(" ")}
      onClick={onClick}
    >
      {type == "link" ? <a className={classNames.link} href={to}>{children}</a> : children}
    </button>
  );
}
