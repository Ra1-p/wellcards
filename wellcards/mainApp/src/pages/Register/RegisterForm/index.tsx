import "./RegisterForm.scss";
import CustomInput from "../../../components/CustomInput";
import CustomCheckbox from "../../../components/CustomCheckbox";
import AuthButton from "../../../components/AuthButton";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { register } from "../../../redux/slices/userSlice";
import { useAppDispatch } from "../../../redux/store";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [telegram, setTelegram] = useState("");
  const dispatch = useAppDispatch()

  return (
    <div className='reg-form-wrapper'>
      <form className='reg-form'>
        <div className='reg-form__text'>
          <h2 className='reg-form__title'>Sign up</h2>
          <h3 className='reg-form__subtitle'>
            Welcome! Fill fields below to create an account
          </h3>
        </div>
        <div className='reg-form__person-info'>
          <CustomInput
            labelMargin='10px'
            width='192px'
            label=' Enter your first name'
          />
          <CustomInput
            labelMargin='10px'
            width='190px'
            label=' Enter your last name'
          />
        </div>
        <CustomInput
          type='text'
          labelMargin='10px'
          width='100%'
          label=' Enter your username'
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
          }}
        />
        <CustomInput
          type='password'
          labelMargin='10px'
          width='100%'
          label=' Enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <CustomInput
          labelMargin='10px'
          width='100%'
          label='Telegram'
          value={telegram}
          onChange={(e) => setTelegram(e.target.value)} />

        <div className='reg-form__inner-wrapper'>
          <CustomCheckbox
            size="big"
            auth={true}
            label={
              <span>
                By signing up, you agree to our{" "}
                <a target='_blank' href='#'>
                  Terms of Use
                </a>{" "}
                and{" "}
                <a target='_blank' href='#'>
                  Privacy Policy
                </a>
              </span>
            }
          />
          <AuthButton width='375px' height='66px' onClick={(e) => {
            e.preventDefault()
            dispatch(register({ username, password, telegram }))
          }}>
            Sign up
          </AuthButton>
        </div>
      </form>
      <div className='reg-form__inner-text'>
        Already have an account?{" "}
        <NavLink className='reg-link' to='/login'>
          Log in
        </NavLink>
      </div>
    </div>
  );
}
