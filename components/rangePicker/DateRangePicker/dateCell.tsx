import { twMerge } from "tailwind-merge";
import { EDateCellDisplayStatus, IDateCell } from "./type";

  export function DateCell({
    value,
    isWeekend = false,
    display = "default",
    disable = false,
    onClick,
  }: IDateCell) {
    const generalStyle =
      "h-8 w-8 row-center rounded-full font-bold text-sm bg-transparent border-2 border-transparent ";
    const dayStyle = {
      weekend:
        "text-red-500 hover:text-red hover:border-red-200 hover:bg-red-100  active:bg-red-300",
      weekday:
        "hover:text-black hover:border-slate-200 hover:bg-slate-100  active:bg-slate-300",
    };
  
    const statusStyle = {
      [EDateCellDisplayStatus.DEFAULT]: "",
      [EDateCellDisplayStatus.BLUR]: "opacity-30",
      [EDateCellDisplayStatus.SELECTED]: "text-white bg-blue-600",
      [EDateCellDisplayStatus.HIGHTLIGHTED]: "text-black bg-blue-100",
      [EDateCellDisplayStatus.MARKED]: "border border-slate-400",
    };

    const style = twMerge(
      generalStyle,  
      dayStyle[isWeekend ? "weekend" : "weekday"],
      statusStyle[display],  
      disable
        ? "opacity-30 border-none bg-transparent hover:bg-transparent active:bg-transparent"
        : ""
    );
  
    const onHandleClick = () => {
      if (onClick) {
        onClick();
      }
    }
  
    return (
      <div className="h-fit w-fit">
        <button className={style} disabled={disable} onClick={onHandleClick}>
          <span>{value && value instanceof Date&& value.getDate()}</span>
        </button>
      </div>
    );
  }
  