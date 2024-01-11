import {
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import classNames from "./CommandsSelect.module.scss";

export default function CommandsSelect({
  options,
  label,
  width,
  onChange,
}: PropsWithChildren<CustomSelectProps>) {
  const placeholder = "All commands";
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  const closeSelect = () => setIsOpen(false);

  const toggleOpenState: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const changeOption = (option: OptionType) => {
    setSelectedOption(option);
    onChange && onChange(option.value);
  };

  const handleOptionClassName = (value: string) => {
    const currentOptionClassNameArr = [
      classNames["select__command-option"],
      classNames[`option_${value}`],
    ];
    return currentOptionClassNameArr.join(" ");
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
        {selectedOption ? selectedOption.text : placeholder}
        <span className={classNames["select__arrow"]}>{">"}</span>
        {isOpen && (
          <ul className={classNames["select__options"]}>
            {options.map((option, index) => {
              return (
                <li
                  onClick={() => changeOption(option)}
                  className={handleOptionClassName(option.value)}
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
