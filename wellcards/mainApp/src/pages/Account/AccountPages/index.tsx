import { Link } from 'react-router-dom';
import "./AccountPages.scss"
import accountImg from "../../../assets/account.svg"
import securityImg from "../../../assets/security.svg"

export default function AccountPages() {
    return (
        <div className="account-pages block">
            <ul className="account-pages-list">
                <li className="page">
                    <a href="#">
                        <img src={accountImg} alt="" />
                        Profile Information
                    </a>
                </li>
                <li className="subpage">
                    <Link to="/security">
                        <img src={securityImg} alt="" />
                        Security
                    </Link>
                </li>
            </ul>
        </div>

    )
}