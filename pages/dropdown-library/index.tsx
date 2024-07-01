import { MultipleSelect } from "@/components";
import { useState } from "react";

export default function DropdownLibraryPage() {
  const options = [
    "Math",
    "Physics",
    "Literature",
    "Chemistry",
    "English",
    "Geography",
    "History",
  ];
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  function onChangeSelectedItem(data: string[]) {
    setSelectedItems(data);
  }
  return (
    <div className="flex flex-col pt-10 items-center h-lvh  bg-black scroll-p-0 scroll-m-0">
      <div className="bg-mint-300 w-full">
        <span>Selected Items: </span>
        {selectedItems &&
          selectedItems.map((i) => (
            <span key={i} className="mr-2">
              {i}
            </span>
          ))}
      </div>
      <MultipleSelect options={options} onHandleChange={onChangeSelectedItem} />
      <div className="bg-mint-300 w-full">Check Check Chek</div>
    </div>
  );
}
