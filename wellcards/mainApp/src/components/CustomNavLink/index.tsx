import { PropsWithChildren } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import "./CustomNavLink.scss";

type CustomNavLinkProps = {
  className: string;
  to: string;
};

export default function CustomNavLink({
  className,
  children,
  to,
}: PropsWithChildren<CustomNavLinkProps>) {
  const location = useLocation();
  const { id } = useParams();
  const handleActive = (props: { isActive: boolean; isPending: boolean }) => {
    if (
      (props.isActive && location.pathname === to) ||
      (to === "/cards" && id)
    ) {
      return `${className} active`;
    }
    return className;
  };

  return (
    <NavLink className={handleActive} to={to}>
      {children}
    </NavLink>
  );
}
