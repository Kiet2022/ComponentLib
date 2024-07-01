import { useOutsideClick } from "@/shared";
import { useEffect, useState } from "react";
import Icon from "../icons/icon";
import { useDebouncedCallback } from "use-debounce";
import { twMerge } from "tailwind-merge";

export interface IDropdown {
  options: string[];
  onHandleChange?: (data: string[]) => void;
}

export function MultipleSelect({ options, onHandleChange }: IDropdown) {
  const [items, setItems] = useState<string[]>([]);
  const [searchItem, setSearchItem] = useState<string[]>(options);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const ref = useOutsideClick(() => {
    setIsOpenMenu(false);
  });

  const searchDebounceValue = useDebouncedCallback((value) => {
    if (value === "") {
      setSearchItem(options);
      return;
    }
    let filteredItems = options.filter((item) =>
      item.toLowerCase().includes(value)
    );
    setSearchItem(filteredItems);
  }, 1000);

  function onHandleSelectItem(item: string) {
    if (!items.includes(item)) {
      let newSelectedItems = [...items];
      newSelectedItems.push(item);
      setItems(newSelectedItems)
      setIsOpenMenu(false);
    }
  }

  function onRemoveSelectedItem(item: string) {
    let newArrItem = items.filter((i) => i !== item);
    setItems(newArrItem);
  }

  function onSelectedChange() {
    if (onHandleChange) {
      console.log('change')
      onHandleChange(items);
    }
  }

  useEffect(() => {
    onSelectedChange();
  }, [items]);

  return (
    <div className=" first:mb-2" ref={ref}>
      {/* ////////RESULTS BAR////////// */}
      <div className="flex" onClick={() => setIsOpenMenu(!isOpenMenu)}>
        <div className=" rounded-l-full w-10 h-20 bg-white"></div>
        <div className="relative flex items-center gap-2 w-[400px] bg-white h-20 style-scroll-b overflow-scroll ">
          {items?.map((i) => (
            <div key={i} className="w-fit">
              <div className="row-center gap-2 min-w-16 rounded-full py-2 px-4  text-slate-400 border-2 border-slate-300 hover:border-mint-300 font-bold bg-slate-200">
                <div>{i}</div>
                <div className="relative">
                  <button
                    onClick={() => onRemoveSelectedItem(i)}
                    className=" hover:bg-slate-400 active:bg-slate-500 text-center w-6 h-6 rounded-full bg-slate-300 text-slate-50"
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className=" rounded-r-full w-10 h-20 bg-white"></div>
      </div>
      {/* /////////DROPDOWN LIST////// */}
      <div className={`relative w-full  ${isOpenMenu ? "visible" : "hidden"}`}>
        <div className={`absolute top-2  list w-full border-0 rounded-lg`}>
          {/* ////////SEARCH BAR////////// */}
          <div className="p-2 border-0 border-b-2 border-b-grey-90 rounded-t-lg">
            <div className="w-full row-center px-2 border-b-2 border-r-2  h-12 rounded-lg  border-0 hover:bg-grey-90 focus-within:bg-slate-200 focus-within:border-slate-400">
              <input
                type="text"
                className="input"
                placeholder="Search"
                onChange={(e) => searchDebounceValue(e.target.value)}
              />
              <Icon name="search" />
            </div>
          </div>

          {/* ////////OPTIONS BAR////////// */}

          <ul className="list w-full border-0 rounded-b-lg max-h-[300px] overflow-y-scroll style-scroll-b">
            {searchItem?.length === 0 ? (
              <div className="w-full h-12 bg-slate-300 row-center text-slate-100 font-bold text-lg rounded-b-lg">
                Data not found!
              </div>
            ) : (
              searchItem?.map((i) => (
                <li
                  key={i}
                  onClick={() => onHandleSelectItem(i)}
                  className={twMerge("last:rounded-b-lg px-2 hover:bg-slate-200 px-2", (items.includes(i) ? 'bg-slate-100' : '')) }
                >
                  <div className="group/item relative flex items-center h-12 w-full">
                    <span className="text-lg">{i}</span>
                    {items.includes(i) && (
                      <button
                        onClick={() => onRemoveSelectedItem(i)}
                        className="absolute right-0 invisible group-hover/item:visible font-bold text-lg text-red-100 bg-red-400 rounded-full px-2"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
