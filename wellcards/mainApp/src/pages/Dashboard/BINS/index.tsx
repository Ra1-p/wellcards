import "./BINS.scss";
import visa from "../../../assets/visa.svg";
import masterCard from "../../../assets/master-card.svg";

const cardsIcons = { visa, masterCard };

type BIN = {
  card: "visa" | "masterCard";
  number: string;
};

const availableBins: BIN[] = [
  {
    card: "visa",
    number: "567890",
  },
  {
    card: "masterCard",
    number: "567890",
  },
  {
    card: "masterCard",
    number: "567890",
  },
];

const privateBins: BIN[] = [
  {
    card: "masterCard",
    number: "xxxxxx",
  },
  {
    card: "masterCard",
    number: "xxxxxx",
  },
  {
    card: "masterCard",
    number: "xxxxxx",
  },
];
export default function BINS() {
  return (
    <div className='bins'>
      <div className='bins__title'>BINS</div>
      <div className='bins__layout'>
        <div className='bins__column column'>
          <div className='column__title'>Available BINs</div>
          <ul className='column__list'>
            {availableBins.map((bin, index) => (
              <li className='column__item' key={index}>
                <img src={cardsIcons[bin.card]} />#{bin.number}
              </li>
            ))}
          </ul>
        </div>
        <div className='bins__column column'>
          <div className='column__title'>Private BINs </div>
          <ul className='column__list'>
            {privateBins.map((bin, index) => (
              <li className='column__item' key={index}>
                <img src={cardsIcons[bin.card]} />#{bin.number}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
