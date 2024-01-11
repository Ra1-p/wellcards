import SpendTable from "./SpendTable";
import "./Dashboard.scss";
import Updates from "./Updates";
import BINS from "./BINS";
import TransferRequests from "./TransferRequests";
import CustomButtonLink from "../../components/CustomButtonLink";
import CustomCardsInfo from "../../components/CustomCardsInfo";

export default function Dashboard() {
  return (
    <div className='dashboard'>
      <div className='dashboard__layout'>
        <BINS></BINS>
        <CustomCardsInfo size='small' title='Cards'>
          <CustomButtonLink background='transparent' to='cards/issue'>
            Issue card
          </CustomButtonLink>
        </CustomCardsInfo>
        <TransferRequests />
      </div>
      <Updates />
      <SpendTable />
    </div>
  );
}
