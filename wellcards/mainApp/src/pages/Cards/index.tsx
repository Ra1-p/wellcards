import "./Cards.scss"
import CardsCommands from './CardsCommands/CardsCommands';
import CardsList from './CardsList/CardsList';
import CardsSearch from './CardsSearch/CardsSearch';

const Cards = () => {

    return (
        <div className='cards'>
            <CardsSearch />
            <CardsCommands />
            <CardsList/>
        </div>

    )
}

export default Cards
