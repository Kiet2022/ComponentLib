import { IChip } from "./types";

export function Chip({
  content,
  closeAble,
  clickAble,
  leftIcon,
  rightIcon,
  ...props
}: IChip) {
  return (
    <div className="min-w-16 rounded-l-full w-fit rounded-r-full py-2 px-4  text-slate-400 border-2 border-slate-300 hover:border-mint-300 font-bold bg-slate-200">
      <span>{leftIcon && leftIcon}</span>
      <span>{content}</span>
      <span>{rightIcon && rightIcon}</span>
    </div>
  );
}
