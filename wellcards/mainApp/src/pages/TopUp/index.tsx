import { FC } from 'react';
import BreadCrumbs from '../../components/BreadCrumbs';
import CustomSelect from '../../components/CustomSelect';
import CryptoAdress from './CryptoAdress';
import RecentTransactions from './RecentTransactions';
import "./TopUp.scss"

const TopUp: FC = () => {
    const adress = "TOPUEMI92WuRBMSiWBC4AkTgAwCmkTyeUd"
    const crypto = "TRON"

    return (
        <div className="topup">
            <BreadCrumbs mainPage='Wallet' currentPage='Top top up'/>
            <div className="topup-main block">
                <div className="topup-main__crypto">
                    <div className="title">By Crypto</div>
                    <CustomSelect label='Choose Network'
                        width='100%'
                        options={[
                            { text: "Select network", value: "null" },
                            { text: "TRON",value: "TRON" },
                            { text: "BSC", value: "BSC" },
                            { text: "ETH", value: "ETH" },
                        ]}
                    />
                </div>
                <CryptoAdress adress={adress} crypto={crypto}/>
            </div>
            <RecentTransactions />
        </div>
    );
}

export default TopUp;