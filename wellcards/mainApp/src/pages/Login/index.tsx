import "./Login.scss";
import Logo from "../../components/Logo";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state: RootState) => state.userSliceReducer.isAuth)

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn])

  return (
    <main className='login-main'>
      <div className='login-container'>
        <Logo />
        <LoginForm />
      </div>
    </main>
  );
}
