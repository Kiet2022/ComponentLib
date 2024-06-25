import SpinnerIcon from "@/public/assets/icons/SpinnerIcon";
import { ReactNode } from "react";

interface ButtonProps {
  label?: string;
  disabled?: boolean;
  loading?: boolean;
  variant?: "default" | "primary-white" | "primary-dark" | "secondary-dark";
  size?: "sm" | "lg" | "xl";
  onClick?: () => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}

enum EVARIANT {
  DEFAULT = "default",
  PRIMARY_WHITE = "primary-white",
  PRIMARY_DARK = "primary-dark",
  SECONDARY_DARK = "secondary-dark",
}

const Button: React.FC<ButtonProps> = ({
  label,
  disabled = false,
  loading,
  variant = "default",
  size = "sm",
  onClick,
  leftIcon,
  rightIcon,
  className,
  ...props
}) => {
  const buttonSize: { [key: string]: string } = {
    sm: ` text-base font-bold py-2 px-4 min-w-10 min-h-10 `,
    lg: ` text-lg font-bold py-3 px-6 min-w-14 min-h-14 `,
    xl: ` text-xl font-bold py-4 px-6 min-w-16 min-h-16 `,
  };
  const baseButton = `w-fit h-fit flex flex-row items-center justify-center gap-2 box-border ${buttonSize[size]} ${className}`;

  const buttonStyle: { [key: string]: string } = {
    [EVARIANT.DEFAULT]: `hover:text-mint-300 disabled:text-grey-30/80 ${
      loading && "disabled:text-grey-90"
    }   ${baseButton}`,
    [EVARIANT.PRIMARY_WHITE]: `hover:bg-mint-300 hover:text-black rounded-lg  bg-white text-black active:bg-white ${
      loading
        ? "disabled:bg-grey-90 disabled:text-grey-50"
        : "disabled:bg-grey-50 disabled:text-grey-90"
    }  ${baseButton}`,
    [EVARIANT.PRIMARY_DARK]: `hover:bg-mint-300 hover:text-black rounded-lg   bg-black active:bg-grey-20 text-white active:text-white ${
      loading
        ? "disabled:bg-grey-20 disabled:text-white"
        : "disabled:bg-grey-50 disabled:text-grey-90"
    } ${baseButton}`,
    [EVARIANT.SECONDARY_DARK]: `hover:bg-mint-300 hover:text-black rounded-lg text-white bg-grey-20   active:bg-grey-20 ${
      loading
        ? "disabled:bg-grey-30 disabled:text-grey-90"
        : "disabled:bg-grey-50 disabled:text-grey-90"
    }  ${baseButton}`,
  };

  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      className={buttonStyle[variant]}
    >
      {loading && <SpinnerIcon/>}
      {leftIcon && <span>{leftIcon}</span>}
      {label}
      {rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};

export { Button };
