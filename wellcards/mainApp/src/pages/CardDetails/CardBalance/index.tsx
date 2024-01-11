import { useState } from "react";
import "./CardBalance.scss";
import CustomCheckbox from "../../../components/CustomCheckbox";
import BalanceInput from "../../../components/BalanceInput";
import CustomButton from "../../../components/CustomButton";

interface CardBalanceProps {
  balance: number;
}

export default function CardBalance({balance}: CardBalanceProps) {
  const [checked, setChecked] = useState(false);
  const available = balance;

  return (
    <div className='card-balance'>
      <div className='card-balance__title'>Balance</div>
      <div className='card-balance__amount'>
        <div>
          <div className='card-balance__sum'>${available}</div>
          <div className='card-balance__text'>Available</div>
        </div>
        {/* <div>
          <div className='card-balance__sum'> ${spend}</div>
          <div className='card-balance__text'>Spend</div>
        </div> */}
      </div>
      <BalanceInput labelMargin="6px" small width='206px' label='Max transaction amount' />
      <CustomCheckbox
        size="big"
        checked={checked}
        onChange={() => setChecked(!checked)}
        label='Max transaction amount = Card balance'
      />
      <div className='card-balance__buttons'>
        <CustomButton size='big' background='filled'>
          + To top up
        </CustomButton>
        <CustomButton size='big' background='filled'>
          - To withdrawal
        </CustomButton>
      </div>
    </div>
  );
}
