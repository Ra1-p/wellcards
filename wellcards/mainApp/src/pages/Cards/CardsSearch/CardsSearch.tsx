import { FC } from "react";
import CustomSelect from "../../../components/CustomSelect";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import "./CardsSearch.scss";
import { useDispatch } from "react-redux";
import {
  changeSearchField,
  clearSearchFileds,
} from "../../../redux/slices/cardSlice";
// import { RootState } from "../../../redux/store";
// import { useSelector } from "react-redux";

const CardsSearch: FC = () => {
  const dispatch = useDispatch();
  // const searchFields = useSelector(
  //   (state: RootState) => state.cardSliceReducer.searchFields
  // );

  return (
    <div className='search-container'>
      <h1 className='search-title'>Cards</h1>
      <div className='search block'>
        <div className='search-fields'>
          <div className='search-field'>
            <div className='search-field__item'>
              <CustomInput
                width='386px'
                placeholder='Search via last 4 digits of the card # or Memo'
                label='Cards Search'
                type='text'
                onChange={(e) => {
                  const objToDispatch = {
                    field: "main",
                    value: e.currentTarget.value,
                  };
                  dispatch(changeSearchField(objToDispatch));
                }}
              />
            </div>
            <div className='search-field__item'>
              <CustomSelect
                options={[
                  { text: "ALL BINs", value: "all" },
                  { text: "456787", value: "456787" },
                  { text: "987345", value: "987345" },
                  { text: "324567", value: "324567" },
                ]}
                label='BIN'
                width='221px'
                onChange={(value) => {
                  const objToDispatch = {
                    field: "bin",
                    value: null as null | string,
                  };

                  if (value && !value.includes("all")) {
                    objToDispatch.value = value;
                  }
                  dispatch(changeSearchField(objToDispatch));
                }}
              />
            </div>
            <div className='search-field__item__container'>
              {" "}
              <div className='search-field__item'>
                <CustomSelect
                  options={[
                    { text: "All users", value: "all" },
                    { text: "message@gmail.com", value: "test" },
                    { text: "user133134@gmail.com", value: "test1" },
                    { text: "user1331345@gmail.com", value: "test2" },
                  ]}
                  label='Users'
                  width='191px'
                  onChange={(value) => {
                    const objToDispatch = {
                      field: "user",
                      value: null as null | string,
                    };
                    if (value && !value?.toLowerCase().includes("all")) {
                      objToDispatch.value = value;
                    }
                    dispatch(changeSearchField(objToDispatch));
                  }}
                />
              </div>
              <div className='search-field__item'>
                <CustomSelect
                  options={[
                    { text: "All", value: "all" },
                    { text: "Active", value: "active" },
                    { text: "Freeze", value: "freeze" },
                    { text: "Closed", value: "closed" },
                  ]}
                  label='Status'
                  width='191px'
                  onChange={(value) => {
                    const objToDispatch = {
                      field: "status",
                      value: null as null | string,
                    };

                    if (value && !value?.toLowerCase().includes("all")) {
                      objToDispatch.value = value;
                    }
                    dispatch(changeSearchField(objToDispatch));
                  }}
                />
              </div>
            </div>
          </div>
          <div className='buttons'>
            <CustomButton
              size='big'
              background='filled'
              // onClick={() => dispatch(search())}
            >
              Show cards
            </CustomButton>
            <CustomButton
              size='big'
              background='transparent'
              onClick={() => dispatch(clearSearchFileds())}
            >
              Clear
            </CustomButton>
          </div>
        </div>
        <div className='commands'></div>
        <span className='cards__amount'>All cards: 33</span>
      </div>
    </div>
  );
};

export default CardsSearch;
