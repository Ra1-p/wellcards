import {
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import classNames from "./CustomSelect.module.scss";

export default function CustomSelect({
  options,
  label,
  width,
  onChange,
}: PropsWithChildren<CustomSelectProps>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<OptionType>(options[0]);

  const closeSelect = () => setIsOpen(false);

  const toggleOpenState: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const changeOption = (option: OptionType) => {
    setSelectedOption(option);
    onChange && onChange(option.value);
  };

  useEffect(() => {
    document.addEventListener("click", closeSelect);
    return () => document.removeEventListener("click", closeSelect);
  }, []);

  const selectClassNameArr = [classNames["select"]];
  if (isOpen) selectClassNameArr.push(classNames["select_open"]);
  return (
    <div>
      <div className={classNames["select__label"]}>{label}</div>
      <div
        onClick={toggleOpenState}
        className={selectClassNameArr.join(" ")}
        style={{ width }}
      >
        {selectedOption.text}
        <span className={classNames["select__arrow"]}>{">"}</span>
        {isOpen && (
          <ul className={classNames["select__options"]}>
            {options.map((option, index) => {
              return (
                <li
                  onClick={() => changeOption(option)}
                  className={classNames["select__option"]}
                  key={index}
                >
                  {option.text}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
