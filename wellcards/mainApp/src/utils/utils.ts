export const padNumber = (num: number) => {
  return num.toString().padStart(2, "0");
};

export const splitCardNum = (num: number) => {
  const cardArr = num.toString().split("");
  let subStr = "";
  const arr: string[] = [];
  cardArr.forEach((item, index) => {
    subStr += item;
    if ((index + 1) % 4 === 0) {
      arr.push(subStr);
      subStr = "";
    }
  });

  return arr;
};

export const copyTextToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const capitalize = (str: string): string => {
  return str[0].toUpperCase() + str.slice(1);
};
