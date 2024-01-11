import "./CardDetails.scss";
import BreadCrumbs from "../../../components/BreadCrumbs";
import CardData from "./CardData";
import CardBalance from "./CardBalance";
import CardTransactions from "./CardTransactions";

export default function CardDetails() {
  return (
    <div className='card-details-page'>
      <BreadCrumbs currentPage='Card details' mainPage='Cards' />
      <div className=' card-details-page__layout'>
        <CardData />
        <CardBalance />
      </div>
      <div className='card-details-page__subbreadcrumbs'>
        {">"} Transactions
      </div>
      <CardTransactions />
    </div>
  );
}
