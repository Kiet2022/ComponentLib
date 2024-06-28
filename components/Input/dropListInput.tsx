import CheckedHeroIcon from "@/public/assets/icons/CheckedHeroIcon";
import ErrorSignHeroIcon from "@/public/assets/icons/ErrorSignHeroIcon";
import SpinnerIcon from "@/public/assets/icons/SpinnerIcon";
import React, { ChangeEvent, useState } from "react";
import { IInputProps, IPhoneCode } from "./types";
import { getInputState, inputStateStyle, phoneCodes, useOutsideClick } from "./constants";
import { twMerge } from "tailwind-merge";

export const DropListInput = ({
  label,
  disabled = false,
  loading,
  isValid,
  className,
  error,
  success,
  ...props
}: IInputProps) => {
  const [inputValue, setInputValue] = useState<
    string | number | readonly string[] | undefined
  >(props.value ? props.value : "");
  const [selectedCountry, setSelectedCountry] = useState<IPhoneCode>(
    phoneCodes[0]
  );
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const ref = useOutsideClick(() => {
    setIsOpenMenu(false);
  });

  const inputState = getInputState(error, inputValue)
  const inputStyle = twMerge(
    "input-box",
    className,
    inputStateStyle[inputState]
  );
  
  function formatInputData(data: string): string {
    // const isNumeric = (char: string) => /^[+-]?\d+(\.\d+)?$/.test(char);
    const isNumeric = (char: string) => /^\d$/.test(char);
    const isCountryCode = (str: string) => /^(\d{1,3})$/.test(str);
    let formattedData = "";

    if (isNumeric(data[data.length - 1])) {
      formattedData = data;
    } else {
      formattedData = data.substring(0, data.length - 1);
    }

    if (data.length <= 3 && isCountryCode(data)) {
      phoneCodes.forEach((c, index) => {
        if (c.code === Number(data)) {
          formattedData = `+${data}`;
          setSelectedCountry(phoneCodes[index]);
        }
      });
    }
    return formattedData;
  }

  function onSelectOpt(countryIndex: number) {
    setSelectedCountry(phoneCodes[countryIndex]);
    setIsOpenMenu(false);

    setInputValue(`+${phoneCodes[countryIndex].code}`);
  }

  function onHandleChange(e: ChangeEvent<HTMLInputElement>) {
    e.target.value = formatInputData(e.target.value);
    setInputValue(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  }

  return (
    <div className="my-4" ref={ref}>
      <div className="h-4 text-white mb-2">
        {label && label}
        {props.required && (
          <span className={error ? "text-red-500" : "text-green-500"}> *</span>
        )}
      </div>
      {/* ////BODY///// */}
      <div
        className={
          inputStyle
        }
      >
        <div>
          <button
            type="button"
            className={`w-20 flex gap-2 text-white
              border-0 border-r-2  active:border-mint-300 rounded-r-none rounded-lg ${inputState === 'default' ? 'border-r-grey-20': (inputState === 'error' )?'border-r-red-500': 'border-emerald-500'}`}
            onClick={() => setIsOpenMenu(true)}
          >
            <img
              src={selectedCountry.iconUrl}
              alt={selectedCountry.country}
              width={30}
            />
            +{selectedCountry.code}
          </button>
          <div className="relative">
            <ul
              className={`absolute top-0 left-[-8px] border-2 bg-white text-black rounded-lg w-fit rounded-lg
                          flex flex-col justify-evenly items-start ${
                            isOpenMenu ? "visible" : "hidden"
                          }`}
            >
              {phoneCodes.map((p, index) => (
                <li
                  key={p.code}
                  className="flex flex-row bg-inherit hover:bg-slate-200 w-full h-10 
                            first:rounded-t-lg last:rounded-b-lg justify-start items-center gap-2 px-2"
                  onClick={() => onSelectOpt(index)}
                >
                  <img src={p.iconUrl} alt={`${p.country} flag`} width={30} />
                  <span>
                    (+{p.code})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <input
          {...props}
          autoComplete="off"
          disabled={loading || disabled}
          value={inputValue}
          onChange={(e) => {
            onHandleChange(e);
          }}
          className="input"
          
        />
      </div>
      {/* ////END BODY///// */}
      <div className="text-red-500">
        {error && (
          <span className="flex flex-row gap-2 items-center">
            <ErrorSignHeroIcon className="w-4 pt-1" />
            {error}
          </span>
        )}
      </div>
      <div className="text-green-500">
        {success && (
          <span className="flex flex-row gap-2 items-center">
            <CheckedHeroIcon className="w-4 pt-1" />
            {success}
          </span>
        )}
      </div>
      <div className="text-green-500">
        {loading && (
          <span className="flex flex-row gap-2 items-center">
            <SpinnerIcon className="w-4 pt-1" />
            Processing...
          </span>
        )}
      </div>
    </div>
  );
};
