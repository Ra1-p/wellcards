import { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";
import classNames from "./CustomButtonLink.module.scss";

type CustomButtonLinkProps = {
  background: "filled" | "transparent";
  to: string;
} & CustomElementProps;

export default function CustomButtonLink({
  children,
  background,
  to,
}: PropsWithChildren<CustomButtonLinkProps>) {
  const className = `${classNames["link"]} ${classNames[`link_${background}`]}`;
  return (
    <NavLink to={to} className={className}>
      {children}
    </NavLink>
  );
}
