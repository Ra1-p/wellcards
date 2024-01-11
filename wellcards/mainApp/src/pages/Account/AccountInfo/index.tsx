import AccountInfoItem from './AccountInfoItem';
import "./AccountInfo.scss"
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

export default function AccountInfo() {
    const {username, telegram, firstName, lastName} = useSelector((state: RootState) => state.userSliceReducer)
    const infoItems = [
        { title: "Name", text: username, editable: false , fieldName: "username"},
        { title: "First name", text: firstName, editable: true, fieldName: "firstName" },
        { title: "Last name", text: lastName, editable: true, fieldName: "lastName" },
        { title: "Telegram", text: telegram, editable: true, fieldName: "telegram" }
    ]
    return (
        <div className='profile-info'>
            <span className="title">Profile Information</span>
            {infoItems.map(i => (
                <AccountInfoItem {...i}/>
            ))}
        </div>
    )
}