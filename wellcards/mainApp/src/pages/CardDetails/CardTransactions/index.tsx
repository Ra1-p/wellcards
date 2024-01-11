import "./CardTransactions.scss";
import CustomSelect from "../../../components/CustomSelect";
import CustomButton from "../../../components/CustomButton";
import "./CardTransactions.scss";
export default function CardTransactions() {
  return (
    <div>
      <form className='card-transactions'>
        <div className='card-transactions__filters'>
          <CustomSelect
            width='240px'
            label='Date'
            options={[
              { text: "All time", value: "all" },
              { text: "Past 30 dayse", value: "30" },
              { text: "Last 7 days", value: "7" },
              { text: "Today", value: "1" },
            ]}
          />
          <CustomSelect
            width='240px'
            label='TX Status'
            options={[
              { text: "All TX Status", value: "all" },
              { text: "Success", value: "success" },
              { text: "Pending", value: "pending" },
              { text: "Reserverd", value: "reserved" },
            ]}
          />
          <CustomSelect
            width='240px'
            label='TX Type'
            options={[
              { text: "All transactions", value: "all" },
              { text: "Authorization", value: "authorization" },
            ]}
          />
        </div>
        <div className="card-transactions__controls">
          <CustomButton background='filled' size='big'>
            Show transactions
          </CustomButton>
          <CustomButton background='transparent' size='big'>
            Clear
          </CustomButton>
        </div>
      </form>
    </div>
  );
}
