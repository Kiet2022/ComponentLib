import CheckedHeroIcon from "@/public/assets/icons/CheckedHeroIcon";
import ErrorSignHeroIcon from "@/public/assets/icons/ErrorSignHeroIcon";
import EyeHeroIcon from "@/public/assets/icons/EyeHeroIcon";
import EyeSlashHeroIcon from "@/public/assets/icons/EyeSlashHeroIcon";
import SpinnerIcon from "@/public/assets/icons/SpinnerIcon";
import React, { ChangeEvent, useState } from "react";
import { twMerge } from "tailwind-merge";
import { IInputProps } from "./types";
import { getInputState, inputStateStyle } from "./constants";

export const InputPassword = ({
  label,
  disabled = false,
  loading,
  isValid,
  leftIcon,
  className,
  error,
  success,
  ...props
}: IInputProps) => {
  const [inputValue, setInputValue] = useState<
    string | number | readonly string[] | undefined
  >(props.value ? props.value : "");
  const [isHidePassword, setIsHidePassword] = useState(true);

  const inputStyle = twMerge(
    "input-box",
    className,
    inputStateStyle[getInputState(error, inputValue)]
  );

  function onHandleHideOrShowPassword() {
    if (isHidePassword) {
      props.type = "text";
      setIsHidePassword(false);
    } else {
      props.type = "password";
      setIsHidePassword(true);
    }
  }

  function onHandleChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  }
  return (
    <div >
      {/* ///////TOP LABEL/////// */}
      <div className="text-white mb-2">{label && label}</div>

      {/* ////BODY///// */}
      <div className={inputStyle}>
        {leftIcon && <div className="mr-2">{leftIcon}</div>}
        <input
          {...props}
          autoComplete="off"
          type={isHidePassword ? "password" : "text"}
          disabled={loading || disabled}
          className="input"
          onChange={(e) => {
            onHandleChange(e);
          }}
        />

        <button className="ml-2" onClick={onHandleHideOrShowPassword}>
          {isHidePassword ? (
            <EyeSlashHeroIcon className="text-white w-8" />
          ) : (
            <EyeHeroIcon className="text-white w-8" />
          )}
        </button>
      </div>

      {/* ///////UNDER NOTIFY///////// */}
      <div className="h-5">
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
    </div>
  );
};
