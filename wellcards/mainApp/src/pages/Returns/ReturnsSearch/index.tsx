import "./ReturnsSearch.scss";
import CustomInput from "../../../components/CustomInput";
import CustomSelect from "../../../components/CustomSelect";
import CustomButton from "../../../components/CustomButton";

export default function ReturnsSearch() {
  return (
    <div className='returns-search'>
      <form>
        <div className='returns-search__filters'>
          <CustomInput width='341px' placeholder='Search' label='TX Search' />
          <CustomSelect
            width='170px'
            options={[
              {
                text: "All BINs",
                value: "all",
              },
              {
                text: "456787",
                value: "456787",
              },
              {
                text: "987345",
                value: "987345",
              },
              {
                text: "324567",
                value: "324567",
              },
            ]}
            label='BIN'
          />
          <CustomSelect
            width='170px'
            options={[
              {
                text: "All time",
                value: "all",
              },
              {
                text: "Past 30 days",
                value: "30",
              },
              {
                text: "Last 7 days",
                value: "7",
              },
              {
                text: "Today",
                value: "1",
              },
            ]}
            label='Date'
          />
          <CustomSelect
            width='215px'
            options={[
              {
                text: "All users",
                value: "all",
              },
              {
                text: "user1234567890@gmail",
                value: "user1234567890@gmail",
              },
            ]}
            label='User'
          />
        </div>
        <div className='returns-search__buttons'>
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
