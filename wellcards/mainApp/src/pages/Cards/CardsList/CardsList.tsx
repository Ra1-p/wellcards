import { changeSelected, changeSelectNumber, getCards } from "../../../redux/slices/cardSlice"
import CustomCheckbox from "../../../components/CustomCheckbox"
import "./CardsList.scss"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../../../redux/store"
import { useEffect } from "react"

const CardsList= () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getCards());
    }, [])
    const cards = useSelector((state: RootState) => state.cardSliceReducer.cards)

    return (
        <div className="cards-list block">
            <table className="cards-list__table">
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>Card</th>
                        <th>Balance</th>
                        <th>User</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {cards.map(card => (
                        card.isShown &&
                        <tr key={card.number}>
                            <td>
                            <CustomCheckbox
                                    size={"small"}
                                        label="." // . - значит, что checkbox без подписи, при этом не теряя своих стилей
                                        checked={card.isSelected}
                                        onChange={() => {
                                            dispatch(changeSelected(card));
                                            dispatch(changeSelectNumber(card.isSelected));
                                        }}
                                    />
                            </td>
                            <Link to={`/cards/${card.card_id}`}><td>#{card.number}</td></Link>
                            <Link to={`/cards/${card.card_id}`}><td>${card.available}</td></Link>
                            <Link to={`/cards/${card.card_id}`}><td>{card.user.username}</td></Link>
                            <Link to={`/cards/${card.card_id}`}><td>{card.status}</td></Link>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}

export default CardsList