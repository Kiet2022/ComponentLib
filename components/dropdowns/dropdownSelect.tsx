import { useOutsideClick } from "@/shared";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { IDropdown } from "./type";

export function DropdownSelect({
  options,
  defaultValue,
  onSelected,
}: IDropdown) {
  const [item, setItem] = useState<any>(defaultValue? defaultValue: options[0]);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const ref = useOutsideClick(() => {
    setIsOpenMenu(false);
  });

  function onHandleSelectItem(item: string | number) {
    setItem(item);
    setIsOpenMenu(false);
  }

  function onSelectedChange() {
    if (onSelected) {
      onSelected(item);
    }
  }

  useEffect(() => {
    onSelectedChange();
  }, [item]);

  return (
    <div className=" first:mb-2" ref={ref}>
      {/* ////////RESULTS BAR////////// */}
      <div
        className="flex bg-white w-fit  rounded-lg px-2 border border-black "
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      >
        <span>{item}</span>
      </div>
      {/* /////////DROPDOWN LIST////// */}
      <div className={`relative   ${isOpenMenu ? "visible" : "hidden"}`}>
        <div className={`absolute top-2  list w-fit border-0 rounded-lg`}>
          {/* ////////OPTIONS BAR////////// */}

          <ul className="list w-fit   border border-black rounded-lg max-h-[300px] overflow-y-auto style-scroll-b">
            {options &&
              options?.map((i) => (
                <li
                  key={i}
                  onClick={() => onHandleSelectItem(i)}
                  className={twMerge(
                    " px-2 hover:bg-slate-200 px-2",
                    item == i ? "bg-slate-100" : ""
                  )}
                >
                  <div className="group/item relative flex items-center h-12 w-full">
                    <span className="text-lg">{i}</span>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
