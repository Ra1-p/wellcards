import "./TransactionTable.scss";
import { capitalize, padNumber } from "../../../utils/utils";

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

type AmountType = {
  currency: string;
  amount: number;
};

type TransactionType = {
  txId: string;
  bin: number;
  cardNum: number;
  memo: string;
  user: string;
  date: Date;
  amount: AmountType[];
  charge: number;
  status: "success" | "pending" | "reserved";
  merchant: string;
  txType: string;
};

type DateCellProps = {
  date: Date;
};

type AmountCellProps = {
  amount: AmountType[];
};

function DateCell({ date }: DateCellProps) {
  return (
    <>
      <div>
        {`${monthes[date.getMonth()]} ${padNumber(date.getDate())}, 
        ${date.getFullYear()}`}
      </div>
      <div className='cell__time'>
        {`${padNumber(date.getHours())}:${padNumber(
          date.getMinutes()
        )}:${padNumber(date.getSeconds())}`}
      </div>
    </>
  );
}

function AmountCell({ amount }: AmountCellProps) {
  return (
    <>
      <div>
        -{amount[0].currency}
        {amount[0].amount}
      </div>
      <div className='cell__amount'>
        {" "}
        -{amount[1].currency}
        {amount[1].amount}
      </div>
    </>
  );
}

export default function TransactionTable() {
  const transactions: TransactionType[] = new Array(2).fill({
    txId: "dfg3dfg3dfg3dfg3dfg3dfg3",
    bin: 356789,
    cardNum: 6097,
    user: "user1234567890@gmail.com",
    memo: "bing",
    date: new Date(),
    amount: [
      {
        currency: "$",
        amount: 7.55,
      },
      {
        currency: "$",
        amount: 5.55,
      },
    ],
    charge: 0.77,
    status: "reserved",
    merchant: "TikTok Ads",
    txType: "Authorization",
  });
  return transactions.length === 0 ? (
    <div className="transactions__text">No transactions</div>
  ) : (
    <table className='transactions'>
      <thead className='transactions__head'>
        <tr className='transactions__row'>
          <td className='transactions__cell cell'>TX ID</td>
          <td className='transactions__cell cell'>Bin</td>
          <td className='transactions__cell cell'>Card #</td>
          <td className='transactions__cell cell'>Card Memo, User</td>
          <td className='transactions__cell cell'>Date</td>
          <td className='transactions__cell cell'>Ammount</td>
          <td className='transactions__cell cell'>TX Charge</td>
          <td className='transactions__cell cell'>TX Status</td>
          <td className='transactions__cell cell'>Merchant</td>
          <td className='transactions__cell cell'>TX Type</td>
        </tr>
      </thead>
      <tbody className='transactions__body'>
        {transactions.map((transaction, index) => (
          <tr className='transactions__row' key={index}>
            <td className='transactions__cell cell'>
              {transaction.txId.slice(0, 4)}...
            </td>
            <td className='transactions__cell cell'>
              <span className='cell__bordered'>{transaction.bin}</span>
            </td>
            <td className='transactions__cell cell'>
              <span className='cell__bordered'>#{transaction.cardNum}</span>
            </td>
            <td className='transactions__cell cell'>
              <div>{transaction.memo}</div>

              <div> {transaction.user}</div>
            </td>
            <td className='transactions__cell cell'>
              <DateCell date={transaction.date} />
            </td>
            <td className='transactions__cell cell'>
              <AmountCell amount={transaction.amount} />
            </td>
            <td className='transactions__cell cell'>${transaction.charge}</td>
            <td className='transactions__cell cell'>
              <span
                className={`cell__status status status_${transaction.status}`}
              >
                {capitalize(transaction.status)}
              </span>
            </td>
            <td className='transactions__cell cell'>{transaction.merchant}</td>
            <td className='transactions__cell cell'>{transaction.txType}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
