import { useSelector } from "react-redux";
import CustomButtonLink from "../../../components/CustomButtonLink";
import { RootState } from "../../../redux/store";
import "./Updates.scss";


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

export default function Updates() {
  const today = new Date();
  const {available, reserved, spend} = useSelector((state: RootState) => state.userSliceReducer.balance)
  return (
    <div className='updates'>
      <div className='updates__header'>
        <div className='updates__title'>Updated</div>
        <div className='updates__date'>{`${
          monthes[today.getMonth()]
        } ${today.getDate()}, ${today.getFullYear()}`}</div>
      </div>
      <div className='updates__body'>
        <div>
          <div className='updates__available'>${available}</div>
          <div className='updates__text'>Available</div>
        </div>
        <div className='updates__other'>
          <div>
            <div className='updates__sum'>${available}</div>
            <div className='updates__text'>Balance</div>
          </div>
          <div>
            <div className='updates__sum'>${reserved}</div>
            <div className='updates__text'>Reserved</div>
          </div>
          <div>
            <div className='updates__sum'>${spend}</div>
            <div className='updates__text'>Spend</div>
          </div>
        </div>
        <div>
          <CustomButtonLink background='filled' to='wallet/top-up'>
            To top up
          </CustomButtonLink>
        </div>
      </div>
    </div>
  );
}
