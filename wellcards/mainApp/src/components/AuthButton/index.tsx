import { PropsWithChildren } from "react";
import "./AuthButton.scss";

type AuthButtonProps = {
  width: string;
  height: string;
  onClick: (e: any) => void
};

export default function AuthButton({
  width,
  height,
  children,
  onClick,
}: PropsWithChildren<AuthButtonProps>) {
  return (
    <button className='auth-button' style={{ width, height }} onClick={onClick}>
      {children}
    </button>
  );
}
