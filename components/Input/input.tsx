import CheckedHeroIcon from "@/public/assets/icons/CheckedHeroIcon";
import ErrorSignHeroIcon from "@/public/assets/icons/ErrorSignHeroIcon";
import SpinnerIcon from "@/public/assets/icons/SpinnerIcon";
import React, { ChangeEvent, useState } from "react";
import { twMerge } from "tailwind-merge";
import { IInputProps } from "./types";
import { getInputState, inputStateStyle } from "./constants";

export const Input = ({
  label,
  disabled = false,
  loading,
  isValid,
  leftIcon,
  rightIcon,
  className,
  error,
  success,
  ...props
}: IInputProps) => {
  const [inputValue, setInputValue] = useState<
    string | number | readonly string[] | undefined
  >(props.value ? props.value : "");



  const inputStyle = twMerge(
    "input-box",
    className,
    inputStateStyle[getInputState(error, inputValue)]
  );
  function onHandleChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  }
  return (
    <div className="my-4">
      <div className="h-4 text-white mb-2">
        {label && label}
        {props.required && (
          <span className={error ? "text-red-500" : "text-green-500"}> *</span>
        )}
      </div>

      <div className={inputStyle}>
        {leftIcon && <div className="mr-2">{leftIcon}</div>}
        <input
          {...props}
          autoComplete="off"
          disabled={loading || disabled}
          className="input"
          onChange={(e) => {
            onHandleChange(e);
          }}
        />
        {rightIcon && <div className="ml-2">{rightIcon} </div>}
      </div>

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
