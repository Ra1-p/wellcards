import { FC } from 'react';
import CustomInput from '../../../components/CustomInput';
import "./CryptoAdress.scss"
interface CryptoAdressProps {
    adress: string
    crypto: string
}

const CryptoAdress: FC<CryptoAdressProps> = ({adress, crypto}) => {
    return (
        <div className='crypto-adress'>
            <span className="crypto-adress__text">Adress</span>
            <CustomInput width="100%" label='' readonly={true} value={adress}/>
            <span className="crypto-adress__text">Expected arrival</span>
            <span className="crypto-adress__text-semi-bold">15 network confirmations</span>
            <span className="crypto-adress__text">Minimum deposit</span>
            <span className="crypto-adress__text semi-bold">$10</span>
            <ul className="crypto-adress__list">
                <li className="list-item">Send only <span className="crypto-adress__text-bold">USDT</span> to this deposit address</li>
                <li className="list-item">Ensure the network is <span className="crypto-adress__text-bold">{crypto}</span></li>
            </ul>
        </div>
     );
}

export default CryptoAdress;