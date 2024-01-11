import "./CardDetails.scss";
import BreadCrumbs from "../../components/BreadCrumbs";
import CardData from "./CardData";
import CardBalance from "./CardBalance";
import CardTransactions from "./CardTransactions";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useParams } from "react-router-dom";

export default function CardDetails() {
  const {id} = useParams()
  const card = useSelector((state: RootState) => (
    state.cardSliceReducer.cards.find(c => c.card_id === id)
  ))
  if (card) {

  }
  return card ? (
    <div className='card-details-page'>
      <BreadCrumbs currentPage='Card details' mainPage='Cards' />
      <div className=' card-details-page__layout'>
        <CardData card={card}/>
        <CardBalance balance={card.available}/>
      </div>
      <div className='card-details-page__subbreadcrumbs'>
        {">"} Transactions
      </div>
      <CardTransactions />
    </div>
  ) : <>Card is not defined</>;
}
