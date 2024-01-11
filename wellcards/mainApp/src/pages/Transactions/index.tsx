import BreadCrumbs from "../../components/BreadCrumbs";
import TransactionsSearch from "./TransactionsSearch";
import TransactionTable from "./TransactionTable";
import "./Transactions.scss";
export default function Transactions() {
  return (
    <div className='transactions-page'>
      <BreadCrumbs currentPage='Transactions' mainPage='Cards' />
      <TransactionsSearch />
      <TransactionTable />
    </div>
  );
}
