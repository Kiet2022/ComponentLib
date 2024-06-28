import { IPhoneCode } from "./types";

export const phoneCodes: IPhoneCode[] = [
  {
    code: 1,
    country: "American",
    iconUrl: "/assets/flags/4x3/us.svg",
  },
  {
    code: 84,
    country: "Vietnam",
    iconUrl: "assets/flags/4x3/vn.svg",
  },
  {
    code: 7,
    country: "Russia",
    iconUrl: "assets/flags/4x3/ru.svg",
  },
  {
    code: 39,
    country: "Italy",
    iconUrl: "assets/flags/4x3/it.svg",
  },
  {
    code: 86,
    country: "China",
    iconUrl: "assets/flags/4x3/cn.svg",
  },
];

export const getInputState = (
  error: string | null|undefined,
  inputValue: string | number | readonly string[] | undefined
) => {
  return error === null ? (inputValue ? "success" : "default") : "error";
};
export const inputStateStyle = {
  default: "",
  error: "border-red-500 bg-red-500/30",
  success: "border-green-500 bg-green-500/30",
};
