import { FC } from "react";
import home from "../../assets/home.svg";
import plus from "../../assets/plus.svg";
import transactions from "../../assets/transactions.svg";
import returns from "../../assets/returns.svg";
import card from "../../assets/card.svg";
import topUp from "../../assets/topup.svg";
import teamTransfer from "../../assets/teamtransfer.svg";
import balance from "../../assets/balance.svg";
import wallet from "../../assets/wallet.svg";
import account from "../../assets/account.svg";
import "./Navbar.scss";
import CustomNavLink from "../CustomNavLink";

const Navbar: FC = () => {
  return (
    <nav className='nav'>
      <ul className='nav-menu'>
        <li className="nav-menu__first-item">
          <CustomNavLink className='nav-menu__item' to='/'>
            <img src={home} alt='' className='nav-menu__item__img' />
            <span className='nav-menu__item__title'>Dashboard</span>
          </CustomNavLink>
        </li>
        <li>
          <CustomNavLink to='/cards' className='nav-menu__item'>
            <img src={card} alt='' className='nav-menu__img' />
            <span className='nav-menu__item__title'>Cards</span>
          </CustomNavLink>
        </li>
        <ul className='subnav-menu'>
          <li>
            <CustomNavLink className='subnav-menu__item' to='/cards/issue'>
              <img src={plus} alt='' className='nav-menu__img' />
              <span className='subnav-menu__title'>Issue cards</span>
            </CustomNavLink>
          </li>
          <li>
            <CustomNavLink
              to='/cards/transactions'
              className='subnav-menu__item'
            >
              <img src={transactions} alt='' className='nav-menu__img' />
              <span className='subnav-menu__title'>Transactions</span>
            </CustomNavLink>
          </li>
          <li>
            <CustomNavLink to='/cards/returns' className='subnav-menu__item'>
              <img src={returns} alt='' className='nav-menu__img' />
              <span className='subnav-menu__title'>Returns</span>
            </CustomNavLink>
          </li>
        </ul>
        <li>
          <CustomNavLink className='nav-menu__item' to='/wallet'>
            <img src={wallet} alt='' className='nav-menu__item__img' />
            <span className='nav-menu__item__title'>Wallet</span>
          </CustomNavLink>
        </li>
        <ul className='subnav-menu'>
          <li>
            <CustomNavLink to='/wallet/top-up' className='subnav-menu__item'>
              <img src={topUp} alt='' className='nav-menu__img' />
              <span className='subnav-menu__title'>Top up</span>
            </CustomNavLink>
          </li>
          <li>
            <CustomNavLink
              to='/wallet/team-transfer'
              className='subnav-menu__item'
            >
              <img src={teamTransfer} alt='' className='nav-menu__img' />
              <span className='subnav-menu__title'>Team transfer</span>
            </CustomNavLink>
          </li>
          <li>
            <CustomNavLink to='/wallet/activity' className='subnav-menu__item'>
              <img src={balance} alt='' className='nav-menu__img' />
              <span className='subnav-menu__title'>Balance activity</span>
            </CustomNavLink>
          </li>
        </ul>
        <li>
          <CustomNavLink className='nav-menu__item' to='/account'>
            <img src={account} alt='' className='nav-menu__item__img' />
            <span className='nav-menu__item__title'>Account</span>
          </CustomNavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;