import "./SpendTable.scss";

type SpendInfo = {
  userName: string;
  email: string;
  spendSum: number;
  declineRate: number;
};

export default function SpendTable() {
  const spendArr: SpendInfo[] = new Array(6).fill({
    userName: "Max Lapko",
    email: "user1234567890@gmail.com",
    spendSum: 68.3,
    declineRate: 54.56,
  });

  return (
    <span className='spend-table__wrapper'>
      <table className='spend-table'>
        <caption className='spend-table__title'>Spend</caption>
        <thead className='spend-table__head'>
          <tr className='spend-table__row'>
            <td className='spend-table__cell cell cell_user-name'>Username</td>
            <td className='spend-table__cell cell cell_email'>Email</td>
            <td className='spend-table__cell cell cell_sum'>Spend</td>
            <td className='spend-table__cell cell cell cell_rate'>
              Decline rate
            </td>
          </tr>
        </thead>
        <tbody className='spend-table__body'>
          {spendArr.map((info, index) => (
            <tr className='spend-table__row' key={index}>
              <td className='spend-table__cell cell cell_user-name'>
                {info.userName}
              </td>
              <td className='spend-table__cell'>{info.email}</td>
              <td className='spend-table__cell'>
                $ {info.spendSum.toFixed(2)}
              </td>
              <td className='spend-table__cell'>
                {info.declineRate.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </span>
  );
}
