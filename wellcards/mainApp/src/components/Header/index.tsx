import "./Header.scss";
import logo from "../../assets/logo.svg";
import { logout } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {balance, username} = useSelector((state: RootState) => state.userSliceReducer)

  return (
    <header className='header'>
      <div className='logo'>
        <img src={logo} alt='Wellcards logotype' className='logo-img' />
        <span className='logo-text'>WELLCARDS</span>
      </div>
      <div className='account-info'>
        <div className='account-info__wallet'>
          <span className='account-info__title'>Wallet balance</span>
          <span className='wallet__balance'>${balance.available}</span>
        </div>
        <div className='account-info__profile'>
          <div className='profile__main-info'>
            <div className='account-info__title'>Profile</div>
            <span className='profile-name'>{username}</span>
          </div>
          <button onClick = {() => {
            dispatch(logout())
            navigate("/login/")
            }}className='profile__logout-btn'>Log out</button>
        </div>
      </div>
    </header>
  );
};

export default Header;