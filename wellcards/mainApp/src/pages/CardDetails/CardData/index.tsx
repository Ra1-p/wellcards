import { useState } from "react";
import hideCard from "../../../assets/hideCard.svg";
import showCard from "../../../assets/showCard.svg";
import copyCard from "../../../assets/copyCard.svg";
import "./CardData.scss";
import {
  copyTextToClipboard,
  padNumber,
  splitCardNum,
} from "../../../utils/utils";
import CustomInput from "../../../components/CustomInput";
import visa from "../../../assets/visa.svg";
import masterCard from "../../../assets/master-card.svg";
import CommandsSelect from "../../../components/CommandsSelect";
import { CardInfo } from "../../../redux/slices/cardSlice";

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

interface CardDataProps {
  card: CardInfo,
}

export default function CardData({card}: CardDataProps) {
  const cardData: CardType = {
    num: Number(card.card_number),
    type: "masterCard",
    exp: {
      month: Number(card.expiry_month),
      year: Number(card.expiry_year),
    },
    cvv: Number(card.cvv),
    bin: 54054255,
    memo: card.nick_name,
    user: card.user.username,
  }
  const [show, setShow] = useState(false);
  const expDate = show
    ? `${padNumber(cardData.exp.month)}/${cardData.exp.year}`
    : "·· / ··";
  const cardNumArr = splitCardNum(cardData.num);
  const lastDigits = cardNumArr[cardNumArr.length - 1];

  return (
    <div className='card-data'>
      <div className='card-data__header'>
        <span>Cards Memo:{cardData.memo}</span>
        <div className='card-data__controls'>
          <button onClick={() => setShow(!show)} className='card-data__button'>
            <img width='21' height='21' src={show ? showCard : hideCard} />
          </button>
          <button
            onClick={() =>
              copyTextToClipboard(`${cardData.num} ${expDate} ${card.cvv}`)
            }
            className='card-data__button'
          >
            <img width='21' height='21' src={copyCard} />
          </button>
        </div>
      </div>
      <div className='card-data__num'>
        <img width='70' height='21' src={cardsIcons[cardData.type]} />
        {show ? cardNumArr.join(" ") : `****    ****    ****    ${lastDigits}`}
      </div>
      <div className='card-data__body'>
        <CustomInput
          labelMargin='16px'
          width='130px'
          label='BIN'
          value={cardData.bin}
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
        <CustomInput width='234px' value={cardData.user} readonly />
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
