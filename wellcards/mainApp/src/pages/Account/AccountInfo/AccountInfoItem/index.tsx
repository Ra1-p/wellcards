import CustomButton from "../../../../components/CustomButton"
import "./AccountInfoItem.scss"
import {useState} from "react"
import { changeMe } from '../../../../redux/slices/userSlice';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../../redux/store';

interface AccountInfoItem {
    editable: boolean,
    title: string,
    text: string,
    fieldName: string,
}

export default function AccoundInfoItem({ editable, title, text, fieldName }: AccountInfoItem) {
    const [isEdit, setIsEdit] = useState(false);
    const [contentText, setContentText] = useState(text);
    const dispatch = useAppDispatch()
    const userInfo = useSelector((state: RootState) => state.userSliceReducer)

    let {telegram, firstName, lastName} = userInfo;

    return (
        <div className='info-item'>
            <div className='info-item-main'>
                <div className="title">{title}</div>
                {isEdit ?
                <input
                type="email"
                className="info-input"
                autoFocus
                onBlur={() => {
                    setIsEdit(false)
                    switch (fieldName) {
                        case "telegram":
                            telegram = contentText
                            break;
                        case "lastName":
                            lastName = contentText
                            break;
                        case "firstName":
                            firstName = contentText;
                            break;
                    }
                    dispatch(changeMe({telegram, first_name: firstName, last_name: lastName}))
                }}
                value={contentText}
                onChange={(e) => setContentText(e.target.value)}></input>
                :
                <div className="text">{contentText}</div>}
            </div>
            {editable && (<CustomButton size='small' background='transparent' onClick={() => setIsEdit(!isEdit)}>Edit</CustomButton>)}
        </div>
    )
}