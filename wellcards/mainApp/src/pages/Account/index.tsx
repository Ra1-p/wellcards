import "./Account.scss";
import AccountInfo from "./AccountInfo";
import AccountPages from "./AccountPages";

export default function Account() {
  return (
    <div className="profile-block">
      <AccountPages />
      <AccountInfo />
    </div>
  )
}
