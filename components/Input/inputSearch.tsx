import React, { ChangeEvent, useState } from "react";
import { twMerge } from "tailwind-merge";
import Icon from "../Icon/icon";
import { IInputProps } from "./types";
import { getInputState, inputStateStyle } from "./constants";

export function InputSearch({
  label,
  disabled = false,
  loading,
  isValid,
  className,
  error,
  ...props
}: IInputProps) {
  const [inputValue, setInputValue] = useState<
    string | number | readonly string[] | undefined
  >(props.value ? props.value : "");

  const inputStyle = twMerge(
    "input-box",
    className,
    inputStateStyle[getInputState(error, inputValue)]
  );
  console.log('search er ', error)
  function onHandleChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  }
  return (
    <div className="my-4">
      <div className="h-4 text-white mb-2">{label && label}</div>
      <div className={inputStyle}>
        <Icon name="search" className="mr-2" />
        <input
          {...props}
          type="search"
          disabled={loading || disabled}
          className="input"
          onChange={(e) => {
            onHandleChange(e);
          }}
        />
      </div>
      <div className={"text-red-500 h-4 flex flex-row"}>{error && error}</div>
    </div>
  );
}
