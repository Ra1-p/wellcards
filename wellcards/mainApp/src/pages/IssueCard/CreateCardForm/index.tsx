import "./CreateCardForm.scss";
import CustomSelect from "../../../components/CustomSelect";
import CustomInput from "../../../components/CustomInput";
import BalanceInput from "../../../components/BalanceInput";
import CustomButton from "../../../components/CustomButton";
import { RootState, useAppDispatch } from "../../../redux/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { addCard } from "../../../redux/slices/cardSlice";

export default function CreateCardForm() {
  const [balance, setBalance] = useState("0");
  // const [bin, setBin] = useState("");
  const [memo, setMemo] = useState("");

  const {username} = useSelector((state: RootState) => state.userSliceReducer);
  const dispatch = useAppDispatch()

  return (
    <div className='create-form'>
      <form>
        <span className='create-form__all-cards'>All cards 50</span>
        <div className='create-form__inputs'>
          <CustomSelect
            width='250px'
            options={[
              {
                text: username,
                value: username,
              },
            ]}
            label='User'
          />
          <CustomSelect
            width='250px'
            options={[
              {
                text: "54054255",
                value: "54054255",
              },
            ]}
            label='BIN'
          />
          <CustomInput
            width='250px'
            placeholder='Optional'
            label='Cards Memo (optional)'
            onChange={(e: any) => setMemo(e.target.value)}
            value={memo}
          />
          <BalanceInput
          label='Card balance'
          width='250px'
          onChange={(e: any) => setBalance(e.target.value)}
          value={balance}
          />
        </div>
        {/* <CustomCheckbox label='Max transaction amount = Card balance' size="big"/> */}
        <div className='create-form__buttons'>
          <CustomButton size='big' background='filled' onClick={() => {
              dispatch(addCard(balance))

            }}>
            Create cards
          </CustomButton>
          <CustomButton size='big' background='transparent'>
            Clear
          </CustomButton>
        </div>
      </form>
    </div>
  );
}
