import CheckedHeroIcon from "@/public/assets/icons/CheckedHeroIcon";
import ErrorSignHeroIcon from "@/public/assets/icons/ErrorSignHeroIcon";
import SpinnerIcon from "@/public/assets/icons/SpinnerIcon";
import React, { ChangeEvent, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ITextAreaProps } from "./types";
import { getInputState, inputStateStyle } from "./constants";

export const TextArea = ({
  label,
  disabled = false,
  loading,
  isValid,
  className,
  error = null,
  success,
  wordLimit,
  externalCounting = true,
  ...props
}: ITextAreaProps) => {
  const [inputValue, setInputValue] = useState<
    string | number | readonly string[] | undefined
  >(props.value ? props.value : "");
  const [wordCount, setWordCount] = useState(0);

  const inputStyle = twMerge(
    "input-box box-black relative pb-4",
    className,
    inputStateStyle[getInputState(error, inputValue)]
  );

  function onHandleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    if (wordLimit && e.target.value.length > wordLimit) {
      e.target.value = e.target.value.substring(0, e.target.value.length - 1);
      return;
    }
    if (props.onChange) {
      props.onChange(e);
    }
    setInputValue(e.target.value);
    setWordCount(e.target.value.length);
  }

  return (
    <div>
      {/* ///////TOP LABEL/////// */}
      <div className="text-white mb-2 relative">
        {label && label}
        {props.required && (
          <span className={error ? "text-red-500" : "text-green-500"}> *</span>
        )}
        {wordLimit && externalCounting && (
          <span className="opacity-80 right-0 absolute text-sm">
            {wordCount} / {wordLimit}
          </span>
        )}
      </div>

      {/* ////BODY///// */}
      <div className={inputStyle}>
        <textarea
          {...props}
          autoComplete="off"
          className="input text-wrap mb-4"
          disabled={loading || disabled}
          onChange={onHandleChange}
        />
        {wordLimit && !externalCounting && (
          <div className="opacity-80 bottom-1 left-4 text-sm absolute">
            {wordCount} / {wordLimit}
          </div>
        )}
      </div>

      {/* ///////UNDER NOTIFY///////// */}
      <div className="h-5">
        <div className="text-red-500 relative">
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
