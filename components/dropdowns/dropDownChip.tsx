import { useOutsideClick } from "@/shared";
import { useState } from "react";
import { InputSearch } from "../inputs";
import Icon from "../icons/icon";
import { Chip } from "../chips";

export function DropdownChip() {
  const [items, setItems] = useState<string[]>([
    "Math",
    "Physics",
    "Literature",
    "Chemistry",
    "English",
    "Geography",
    "History",
  ]);
  const [selectedItemIndexes, setSelectedItemIndexs] = useState<number[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const ref = useOutsideClick(() => {
    setIsOpenMenu(false);
  });

  function onHandleSelectItem(index: number) {
    console.log("select ", index, " ", selectedItemIndexes);
    if (!selectedItemIndexes?.includes(index)) {
      const newArray = [...selectedItemIndexes, index];
      setSelectedItemIndexs(newArray);
      console.log("new ", selectedItemIndexes);
    }
  }

  return (
    <div className=" first:mb-2" ref={ref}>
      {/* ////////SEARCH BAR////////// */}
      <div
        className="relative style-scroll-b relative w-[400px] h-20 flex overflow-x-auto gap-4 overflow-hidden overflow-clip items-center  px-2 rounded-lg bg-white"
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      >
        {selectedItemIndexes?.map((i) => (
          <div key={i} className="w-fit">
            <Chip content={items[i]} />
          </div>
        ))}
      </div>
      {/* /////////DROPDOWN LIST////// */}
      <div className={`relative w-full  ${isOpenMenu ? "visible" : "hidden"}`}>
        <div className={`absolute top-2  list w-full border-0 rounded-lg`}>
          <div className="p-2 border-0 border-b-2 border-b-grey-90 rounded-t-lg">
            <div className="w-full flex items-center px-2 border-b-2 border-r-2  h-12 rounded-lg  border-0 hover:bg-grey-90 focus-within:bg-slate-200 focus-within:border-slate-400">
              <input type="text" className="input" placeholder="Search" />
              <Icon name="search" />
            </div>
          </div>

          <ul className={`list w-full border-0 rounded-b-lg`}>
            {items?.map((i, index) => (
              <li
                key={index}
                onClick={() => onHandleSelectItem(index)}
                className="list-item last:rounded-b-lg  px-2"
              >
                {" "}
                <span>{i}</span>{" "}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
