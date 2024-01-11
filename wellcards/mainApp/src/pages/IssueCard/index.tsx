import BreadCrumbs from "../../components/BreadCrumbs";
import "./IssueCard.scss";
import Balance from "./Balance";
import CreateCardForm from "./CreateCardForm";
import RecentCards from "./RecentCards";

export default function IssueCard() {
  return (
    <div className='issue-card'>
      <BreadCrumbs mainPage='Cards' currentPage='Issue cards' />
      <div className='issue-card__layout'>
        <CreateCardForm />
        <Balance />
      </div>
      <RecentCards />
    </div>
  );
}
