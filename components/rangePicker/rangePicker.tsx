import { useState } from "react";
import Icon from "../icons/icon";
import { useOutsideClick } from "@/shared";

interface IRangePicker {
  label: string;
  minValue?: number;
  maxValue?: number;
  onApplyRange?: (start: number, end: number) => void;
}

export function RangePicker({
  label,
  minValue,
  maxValue,
  onApplyRange,
}: IRangePicker) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const ref = useOutsideClick(() => {
    setIsOpenMenu(false);
  });

  function onApply() {
    let startInput = document.getElementById("startValue") as HTMLInputElement;
    let endInput = document.getElementById("endValue") as HTMLInputElement;

    if (minValue) {
      if (Number(startInput.value) < minValue) {
        startInput.value = minValue.toString();
      }
      if (Number(endInput.value) < minValue) {
        endInput.value = minValue.toString();
      }
    }
    if (maxValue) {
      if (Number(startInput.value) > maxValue) {
        startInput.value = maxValue.toString();
      }
      if (Number(endInput.value) > maxValue) {
        endInput.value = maxValue.toString();
      }
    }
    let start = Number(startInput.value)
    let end = Number(endInput.value)
    if (end < start) {
      return;
    }
    if (onApplyRange) {
      onApplyRange(Number(start), Number(end));
    }
  }

  return (
    <div ref={ref}>
      <div
        onClick={() => setIsOpenMenu(!isOpenMenu)}
        className="border flex px-2 w-[150px] h-12 rounded-lg bg-white border border-slate-800"
      >
        <div className="w-full h-full row-center text-lg">{label}</div>
        <Icon name="chevron-down" className="w-12 h-12" />
      </div>
      <div className="relative">
        <div
          className={`absolute top-2 w-[200px] bg-white rounded-lg border border-slate-800 ${
            isOpenMenu ? "visible" : "invisible"
          }`}
        >
          <div className="flex justify-center p-4">
            <div className="flex items-center border-2 border-slate-300 rounded-full h-10 w-60">
              <div className="flex items-center rounded-full hover:bg-slate-200 h-full mr-1">
                <input
                  type="number"
                  name="startValue"
                  id="startValue"
                  defaultValue={minValue ? minValue : 0}
                  className="input w-full text-center "
                />
              </div>
              {" - "}
              <div className="flex items-center rounded-full hover:bg-slate-200 h-full ml-1">
                <input
                  type="number"
                  name="endValue"
                  id="endValue"
                  defaultValue={maxValue ? maxValue : 0}
                  className="input w-full text-center rounded-full hover:bg-slate-200 h-full"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-2 p-4">
            <button
              onClick={() => setIsOpenMenu(false)}
              className="grey-btn px-3 py-2 rounded-full text-base "
            >
              Cancel
            </button>
            <button
              onClick={onApply}
              className="primary-btn px-3 py-2 rounded-full  text-base "
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
