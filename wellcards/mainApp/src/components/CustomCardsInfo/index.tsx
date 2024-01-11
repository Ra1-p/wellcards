import { PropsWithChildren } from "react";
import "./CustomCardsInfo.scss";
type CustomCardsInfoProps = {
  title: string;
  size: "big" | "medium" | "small";
};

export default function CustomCardsInfo ({
  title,
  size,
  children,
}: PropsWithChildren<CustomCardsInfoProps>) {
  const activeCards = 44;
  const freezeCards = 0;
  const closedCards = 6;

  const handleStyles = () => {
    if (children) return { paddingBottom: 0 };
  };
  const handleItemStyles = () => {
    if (children) return { width: "90px", height: "50px" };
  };

  return (
    <div
      style={handleStyles()}
      className={`cards-info cards-info__${size} block`}
    >
      <div className='cards-info-header'>
        <span className='cards-info__title'>{title}</span>
        <span className='cards-info__cards-num'>
          All cards {activeCards + freezeCards + closedCards}
        </span>
      </div>
      <div className='cards-info__list'>
        <div
          style={handleItemStyles()}
          className='cards-info__list__item item_active'
        >
          <span className='cards-info__list__item__title'>Active</span>
          <span className='cards-info__list__item__number'>{activeCards}</span>
        </div>
        <div
          style={handleItemStyles()}
          className='cards-info__list__item item_freeze'
        >
          <span className='cards-info__list__item__title'>Freeze</span>
          <span className='cards-info__list__item__number'>{freezeCards}</span>
        </div>
        <div
          style={handleItemStyles()}
          className='cards-info__list__item item_closed'
        >
          <span className='cards-info__list__item__title'>Closed</span>
          <span className='cards-info__list__item__number'>{closedCards}</span>
        </div>
      </div>
      {children && <div className='cards-info__children'>{children}</div>}
    </div>
  );
}
