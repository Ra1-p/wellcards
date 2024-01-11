import { useState } from "react";
import {
  copyTextToClipboard,
  padNumber,
  splitCardNum,
} from "../../../utils/utils";
import "./RecentCards.scss";
import hideCard from "../../../assets/hideCard.svg";
import showCard from "../../../assets/showCard.svg";
import copyCard from "../../../assets/copyCard.svg";

type CardType = {
  num: number;
  exp: {
    month: number;
    year: number;
  };
  cvv: number;
};

type CardIssueType = {
  date: Date;
  bin: number;
  card: CardType;
  memo: string;
  balance: number;
  user: string;
};

type DateCellProps = {
  date: Date;
};

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

function CardCell({ card }: { card: CardType }) {
  const [show, setShow] = useState(false);
  const expDate = `${padNumber(card.exp.month)}/${card.exp.year}`;
  const cardNumArr = splitCardNum(card.num);
  const lastDigits = cardNumArr[cardNumArr.length - 1];
  const cardInfo = show
    ? `${cardNumArr.join(" ")} ${expDate} ${card.cvv}`
    : `**** **** **** ${lastDigits} ·· / ·· ···`;

  return (
    <span className='cell__card'>
      {cardInfo}
      <div className='cell__button-wrapper'>
        <button className='cell__button' onClick={() => setShow(!show)}>
          <img width='15' height='15' src={show ? hideCard : showCard} />
        </button>
        <button
          onClick={() =>
            copyTextToClipboard(`${card.num} ${expDate} ${card.cvv}`)
          }
          className='cell__button'
        >
          <img src={copyCard} />
        </button>
      </div>
    </span>
  );
}

export default function RecentCards() {
  const cardIssues: CardIssueType[] = new Array(7).fill({
    date: new Date(),
    bin: 356789,
    card: {
      num: 1234567812341453,
      exp: {
        month: 2,
        year: 22,
      },
      cvv: 123,
    },
    memo: "royal traffic",
    balance: 10.1,
    user: "user1234567890@gmail.com",
  });
  return (
    <div className='recent-cards__element'>
      <div className='recent-cards__title'>Recent cards</div>

      <table className='recent-cards'>
        <thead className='recent-cards__head'>
          <tr className='recent-cards__row'>
            <td className='recent-cards__cell cell'>Date</td>
            <td className='recent-cards__cell cell'>Bin</td>
            <td className='recent-cards__cell cell'>Card #</td>
            <td className='recent-cards__cell cell'>Card Memo</td>
            <td className='recent-cards__cell cell'>Balance</td>
            <td className='recent-cards__cell cell'>User</td>
          </tr>
        </thead>
        <tbody className='recent-cards__body'>
          {cardIssues.map((cardIssue, index) => (
            <tr className='recent-cards__row' key={index}>
              <td className='recent-cards__cell cell'>
                <DateCell date={cardIssue.date} />
              </td>
              <td className='recent-cards__cell cell'>
                <span className='cell__bin'>{cardIssue.bin}</span>
              </td>
              <td className='recent-cards__cell cell'>
                <CardCell card={cardIssue.card} />
              </td>
              <td className='recent-cards__cell cell'>{cardIssue.memo}</td>
              <td className='recent-cards__cell cell'>
                <span className='cell__balance'>
                  {" "}
                  ${cardIssue.balance.toFixed(2)}
                </span>
              </td>
              <td className='recent-cards__cell cell'>{cardIssue.user}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
