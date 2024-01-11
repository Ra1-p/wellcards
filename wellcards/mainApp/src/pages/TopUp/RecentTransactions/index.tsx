import CustomButton from '../../../components/CustomButton';
import TransationInfo from './TransactionInfo';
import "./RecentTransactions.scss"

export default function RecentTransactions() {
    return (
        <div className="recent-transactions">
            <div className="recent-transactions__title">Recent transtactions</div>
            <div className="recent-transactions-main block">
                <div className="header">
                    <span className="header__title">Date</span>
                    <input type="date" />
                    <CustomButton size='small' background='transparent'>Export</CustomButton>
                </div>
                <table className='recent-transactions__table'>
                    <thead>
                        <th>TX ID</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Network</th>
                        <th>Notes</th>
                    </thead>
                    <tbody>
                        <TransationInfo />
                        <TransationInfo />
                        <TransationInfo />
                    </tbody>
                </table>
            </div>
        </div>
    )
}