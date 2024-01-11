import "./LoginForm.scss";
import CustomInput from "../../../components/CustomInput";
import { NavLink } from "react-router-dom";
import AuthButton from "../../../components/AuthButton";
import { useState } from "react";
import { login } from "../../../redux/slices/userSlice";
import { useAppDispatch } from "../../../redux/store";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch()

  return (
    <div className='form-wrapper'>
      <form className='form'>
        <h2 className='form__title'>Welcome to Wellcards</h2>
        <div className="form__inputs">
          <CustomInput
            type='text'
            labelMargin='14px'
            width='307px'
            label='Enter your username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <CustomInput
            type='password'
            labelMargin='14px'
            width='307px'
            label='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className='form__forgot'>Forgot password?</button>
        <AuthButton height='54px' width='308px' onClick={(e) => {
          e.preventDefault()
          dispatch(login({ username, password }))
        }}>
          Login
        </AuthButton>
      </form>
      <NavLink className='link' to='/register'>
        Sing up
      </NavLink>
    </div>
  );
}
