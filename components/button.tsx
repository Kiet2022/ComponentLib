import { ReactNode, useState } from "react";

interface ButtonProps {
  label?: string;
  disabled?: boolean;
  loading?: boolean;
  variant?: "default" | "primary" | "secondary";
  theme?: "dark" | "white";
  size?: "sm" | "lg" | "xl";
  onClick?: () => void;

  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  label,
  disabled = false,
  loading,
  variant = "default",
  theme = "white",
  size = "sm",
  onClick,
  leftIcon,
  rightIcon,
}) => {
  enum VARIANT {
    DEFAULT = "default",
    PRIMARY = "primary",
    SECONDARY = "secondary",
  }

  enum THEME {
    DARK = "dark",
    WHITE = "white",
  }

  enum SIZE {
    SMALL = "sm",
    LARGE = "lg",
    EXTRA = "xl",
  }

  const buttonStyle: { [key: string]: string } = {
    [VARIANT.DEFAULT]: `w-fit h-fit !p-0  hover:text-emerald-500 disabled:text-grey-30/80 ${
      loading && "disabled:text-grey-90"
    }`,
    [VARIANT.PRIMARY]: `w-fit h-fit rounded-lg hover:bg-mint-300 hover:text-black disabled:bg-grey-md disabled:text-white/50`,
    [VARIANT.SECONDARY]: `w-fit h-fit rounded-lg bg-grey-20 hover:bg-mint-300 hover:text-black active:bg-grey-20 disabled:bg-grey-md disabled:text-white/50 ${
      loading && "disabled:bg-grey-90 disabled:text-black/50"
    }`,
  };

  const buttonSize: { [key: string]: string } = {
    [SIZE.SMALL]: ` text-base font-bold py-2 px-4 min-w-10 min-h-10 `,
    [SIZE.LARGE]: ` text-lg font-bold py-3 px-6 min-w-14 min-h-14 `,
    [SIZE.EXTRA]: ` text-xl font-bold py-4 px-6 min-w-16 min-h-16 `,
  };

  function getButtonTheme(variant: string, theme: string) {
    if (variant === VARIANT.PRIMARY) {
      return theme === THEME.WHITE
        ? `bg-white text-black active:bg-white ${
            loading && "disabled:bg-grey-90 disabled:text-black/50"
          }`
        : `bg-black active:bg-grey-20 text-white active:text-white ${
          loading && "disabled:bg-grey-20"
        }`;
    }
    return theme === THEME.WHITE
      ? "text-black active:text-grey-15"
      : "text-white active:text-white";
  }

  function getButtonStyle(variant: string, theme: string, size: string) {
    return (
      "flex flex-row  items-center justify-center gap-2 box-border " +
      `${buttonStyle[variant]}  ${getButtonTheme(variant, theme)}  ${
        buttonSize[size]
      }`
    );
  }
  const btnStyle = getButtonStyle(variant, theme, size);
  const iconSize = size === "sm" ? "w-4" : size === "lg" ? "w-6" : "w-8";

  if (!label) {
    return (
      <button className={btnStyle + " !p-0"} disabled={disabled} onClick={onClick}>
        {leftIcon && <div className={iconSize}>{leftIcon}</div>}
        {rightIcon && <div className={iconSize}>{rightIcon}</div>}
      </button>
    );
  }

  if (loading) {
    return (
      <button className={btnStyle} disabled={loading} onClick={onClick}>
        Loading...
      </button>
    );
  }
  return (
    <button className={btnStyle} disabled={disabled} onClick={onClick}>
      {leftIcon && <div className={iconSize}>{leftIcon}</div>}
      {label}
      {rightIcon && <div className={iconSize}>{rightIcon}</div>}
    </button>
  );
};

export { Button };
