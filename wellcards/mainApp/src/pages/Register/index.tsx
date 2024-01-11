import "./Register.scss";
import Logo from "../../components/Logo";
import RegisterForm from "./RegisterForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../redux/store";

export default function Register() {
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state: RootState) => state.userSliceReducer.isAuth)

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn])

  return (
    <main className='register-main'>
      <div className='register-container'>
       <Logo/>
       <RegisterForm/>
      </div>
    </main>
  );
}
