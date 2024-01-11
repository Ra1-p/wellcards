import "./Balance.scss";
import CustomButtonLink from "../../../components/CustomButtonLink";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export default function Balance() {
  const {available, reserved, spend} = useSelector((state: RootState) => state.userSliceReducer.balance)
  return (

    <div className='balance'>
      <div className='balance__title'>Balance</div>
      <div className='balance__body'>
        <div>
          <div className='balance__sum'>${available}</div>
          <div className='balance__text'>Available</div>
        </div>
        <div>
          <div className='balance__sum'>${reserved}</div>
          <div className='balance__text'>Reserved</div>
        </div>
        <div>
          <div className='balance__sum'>${spend}</div>
          <div className='balance__text'>Spend</div>
        </div>
      </div>
      <div className='balance__button'>
        <CustomButtonLink background='filled' to='/wallet/top-up'>
          To top up
        </CustomButtonLink>
      </div>
    </div>
  );
}
