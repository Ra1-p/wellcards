import { FC, useEffect } from "react";
import CustomButton from "../../../components/CustomButton";
import CustomCheckbox from "../../../components/CustomCheckbox";
import "./CardsCommands.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  changeAllSelected,
  changeCardsStatus,
  changeCurrentStatus,
  changeSelectNumber,
  initMaxSelectedCount,
} from "../../../redux/slices/cardSlice";
import CommandsSelect from "../../../components/CommandsSelect";

const CardsCommands: FC = () => {
  const dispatch = useDispatch();
  const cardsState = useSelector((state: RootState) => state.cardSliceReducer);
  useEffect(() => {
    dispatch(initMaxSelectedCount());
  }, []);

  return (
    <div className='cards-commands block'>
      <CommandsSelect
        options={[
          { text: "Active", value: "active" },
          { text: "Freeze", value: "freeze" },
          { text: "Closed", value: "closed" },
        ]}
        label='Cards commands'
        width='222px'
        onChange={(value) => {
          (value === "active" || value === "freeze" || value === "closed") &&
            dispatch(changeCurrentStatus(value));
        }}
      />
      <span className='cards-count'>
        {cardsState.selection.selectedCount}/
        {cardsState.selection.maxSelectedCount}
      </span>
      <CustomButton
        size='big'
        background='transparent'
        onClick={() => dispatch(changeCardsStatus())}
      >
        Export
      </CustomButton>
      <CustomCheckbox
        size="big"
        label='Select all'
        onChange={() => {
          dispatch(changeAllSelected());
          dispatch(changeSelectNumber("all"));
        }}
        checked={cardsState.selection.isAllSelected}
      />
    </div>
  );
};

export default CardsCommands;
