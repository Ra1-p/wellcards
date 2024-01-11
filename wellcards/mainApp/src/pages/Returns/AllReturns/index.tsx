import "./AllReturns.scss";
import { padNumber } from "../../../utils/utils";
import CustomButton from "../../../components/CustomButton";


const monthes = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

type ReturnTransactionType = {
  id: string;
  bin: number;
  cardNum: number;
  memo: string;
  date: Date;
  amount: { currency: string; amount: number };
  user: string;
};

type DateCellProps = {
  date: Date;
};

function DateCell({ date }: DateCellProps) {
  return (
    <div>
      <div>
        {`${monthes[date.getMonth()]} ${padNumber(date.getDate())}, 
        ${date.getFullYear()}`}
      </div>
      <div className='cell__time'>
        {`${padNumber(date.getHours())}:${padNumber(
          date.getMinutes()
        )}:${padNumber(date.getSeconds())}`}
      </div>
    </div>
  );
}

export default function AllReturns() {
  const returnTransactions: ReturnTransactionType[] = new Array(8).fill({
    id: "A167",
    bin: 356789,
    cardNum: 6097,
    memo: "bing",
    user: "user1234567890@gmail.com",
    date: new Date(),
    amount: {
      currency: "$",
      amount: 7.55,
    },
  });
  return returnTransactions.length === 0 ? (
    <div className='returns__text'>No transactions</div>
  ) : (
    <>
      <div className="returns__export">
        <div className="returns__all">All returns: {returnTransactions.length}</div>
        <CustomButton size='small' background='transparent'>
          Export
        </CustomButton>
      </div>
      <table className='returns'>
        <thead className='returns__head'>
          <tr className='returns__row'>
            <td className='returns__cell cell'>ID</td>
            <td className='returns__cell cell'>Bin</td>
            <td className='returns__cell cell'>Card #</td>
            <td className='returns__cell cell'>Card Memo</td>
            <td className='returns__cell cell'>Date</td>
            <td className='returns__cell cell'>Amount</td>
            <td className='returns__cell cell'>User</td>
          </tr>
        </thead>
        <tbody className='returns__body'>
          {returnTransactions.map((transaction, index) => (
            <tr className='returns__row' key={index}>
              <td className='returns__cell cell'>{transaction.id}</td>
              <td className='returns__cell cell'>
                <span className='cell__bordered'>{transaction.bin}</span>
              </td>
              <td className='returns__cell cell'>
                <span className='cell__bordered'>#{transaction.cardNum}</span>
              </td>
              <td className='returns__cell cell'>
                <div className='cell__memo'>{transaction.memo}</div>
              </td>
              <td className='returns__cell cell'>
                <DateCell date={transaction.date} />
              </td>
              <td className='returns__cell cell'>
                -{transaction.amount.currency}
                {transaction.amount.amount}
              </td>
              <td className='returns__cell cell'>{transaction.user}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
