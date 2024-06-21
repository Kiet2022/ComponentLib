import { ReactNode, useState } from "react";
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

const buttonStyle: {[key:string] :string} = {
  [VARIANT.DEFAULT]: `w-fit h-fit hover:text-emerald-500 disabled:text-grey-30/80`,
  [VARIANT.PRIMARY]: `w-fit h-fit rounded-lg hover:bg-mint-300 hover:text-black disabled:bg-grey-md disabled:text-white/50`,
  [VARIANT.SECONDARY]: `w-fit h-fit rounded-lg bg-grey-20 hover:bg-mint-300 hover:text-black active:bg-grey-20 disabled:bg-grey-md disabled:text-white/50`,
};

const buttonSize: {[key:string] :string} = {
  [SIZE.SMALL]: ` text-base font-bold py-2.5 px-5 min-w-12 min-h-12 `,
  [SIZE.LARGE]: ` text-lg font-bold py-3 px-6 min-w-14 min-h-14 `,
  [SIZE.EXTRA]: ` text-xl font-bold py-4 px-6 min-w-16 min-h-16 `,
};

function getButtonTheme(variant: string, theme: string) {
  if (variant === VARIANT.PRIMARY) {
    return theme === THEME.WHITE ? "bg-white text-black active:bg-white border border-black" : "bg-black active:bg-grey-20 text-white active:text-white";
  }
  return theme === THEME.WHITE ? "text-black active:text-grey-15" : "text-white active:text-white";
}

export default function getButtonStyle(variant: string, theme: string, size: string){
    return `${buttonStyle[variant]} ${getButtonTheme(variant, theme)} ${buttonSize[size]}`;
}
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
  theme = 'white',
  size = 'sm',
  onClick,
  leftIcon,
  rightIcon,
}) => {
  let buttonStyle = getButtonStyle(variant, theme, size);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  if(loading){
    setIsProcessing(true);
  }
  console.log("dis "+ disabled)
  return (
    <button className={buttonStyle} disabled={ disabled}>
      {label ? (
        <div className="gap-2 flex flex-row ">
          <p className="pt-0.5">{leftIcon}</p><p>{label}</p><p className="pt-0.5">{rightIcon}</p>          
        </div>
      ) : (
        <div className=" flex flex-row !py-0 !px-0">
          <p className="pt-0.5">{leftIcon}</p>
          <p className="pt-0.5">{rightIcon}</p>     
        </div>
      )}
    </button>
  );
};

export { Button };
