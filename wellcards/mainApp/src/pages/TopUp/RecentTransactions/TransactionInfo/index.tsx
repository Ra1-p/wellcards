import copy from "../../../../assets/copy.svg"
import "./TransactionInfo.scss"

export default function TransationInfo() {
    return (
        <tr>
            <td>a1075db55d416d3ca199f55...</td>
            <td>
                <div className="date-time">
                    <span className='date'>Jun 27, 2023</span>
                    <span className='time'>19:00:01</span>
                </div>
            </td>
            <td>
                40 USDT
            </td>
            <td>
                <span className='address'>
                    jgtyfYvytvuTF985HGYYJNi...
                    <img src={copy} alt="" />
                </span>
            </td>
            <td>
                <span className="status status__success">Success</span>
            </td>
            <td>
                TRON
            </td>
            <td>
                Token transfer
            </td>
        </tr>
    )
}