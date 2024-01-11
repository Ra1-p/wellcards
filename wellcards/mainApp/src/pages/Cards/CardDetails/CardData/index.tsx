import { useState } from "react";
import hideCard from "../../../../assets/hideCard.svg";
import showCard from "../../../../assets/showCard.svg";
import copyCard from "../../../../assets/copyCard.svg";
import visa from "../../../../assets/visa.svg";
import masterCard from "../../../../assets/master-card.svg";

import "./CardData.scss";

import {
  copyTextToClipboard,
  padNumber,
  splitCardNum,
} from "../../../../utils/utils";
import CustomInput from "../../../../components/CustomInput";
import CommandsSelect from "../../../../components/CommandsSelect";

const cardsIcons = {
  visa,
  masterCard,
};

type CardType = {
  num: number;
  type: "visa" | "masterCard";
  exp: {
    month: number;
    year: number;
  };
  cvv: number;
  bin: number;
  memo: string;
  user: string;
};

export default function CardData() {
  const card: CardType = {
    num: 4567789089769990,
    type: "visa",
    exp: {
      month: 12,
      year: 24,
    },
    bin: 236578,
    cvv: 356,
    user: "user1234567890@gmail.com",
    memo: "1",
  };
  const [show, setShow] = useState(false);
  const expDate = show
    ? `${padNumber(card.exp.month)}/${card.exp.year}`
    : "·· / ··";
  const cardNumArr = splitCardNum(card.num);
  const lastDigits = cardNumArr[cardNumArr.length - 1];

  return (
    <div className='card-data'>
      <div className='card-data__header'>
        <span>Cards Memo:{card.memo}</span>
        <div className='card-data__controls'>
          <button onClick={() => setShow(!show)} className='card-data__button'>
            <img width='21' height='21' src={show ? showCard : hideCard} />
          </button>
          <button
            onClick={() =>
              copyTextToClipboard(`${card.num} ${expDate} ${card.cvv}`)
            }
            className='card-data__button'
          >
            <img width='21' height='21' src={copyCard} />
          </button>
        </div>
      </div>
      <div className='card-data__num'>
        <img width='70' height='21' src={cardsIcons[card.type]} />
        {show ? cardNumArr.join(" ") : `****    ****    ****    ${lastDigits}`}
      </div>
      <div className='card-data__body'>
        <CustomInput
          labelMargin='16px'
          width='130px'
          label='BIN'
          value={card.bin}
          readonly
        />
        <CustomInput
          labelMargin='16px'
          width='135px'
          label='Expiry Date'
          value={expDate}
          readonly
        />
        <CustomInput
          labelMargin='16px'
          width='110px'
          label='CVV'
          value={show ? card.cvv : "···"}
          readonly
        />
        <CustomInput width='234px' value={card.user} readonly />
        <CommandsSelect
          options={[
            { text: "Active", value: "active" },
            { text: "Freeze", value: "freeze" },
            { text: "Closed", value: "closed" },
          ]}
          width='156px'
        />
      </div>
    </div>
  );
}
