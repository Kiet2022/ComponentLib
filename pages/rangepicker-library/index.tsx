import { DateCell, DateRangePicker, RangePicker } from "@/components/rangePicker";
import TestDate from "@/components/rangePicker/testDate";
import { useEffect, useState } from "react";

export default function RangePickerPage() {
  const data = [
    1500, 2000, 2100, 2350, 2600, 2720, 2890, 2900, 2910, 3001, 3250, 3600,
    3670, 3900, 4800, 4801, 4900, 5000,
  ];
  const [date, setDate] = useState<string[]>();
  const [filteredData, setFilteredData] = useState(data);
  function onFilter(start: number, end: number) {
    let newFilteredData = data.filter((d) => {
      if (d >= start && d <= end) {
        return d;
      }
    });
    setFilteredData(newFilteredData);
  }
  
  useEffect(()=>{
    console.log('date', date)
  }, [date])
  return (
    <div className="flex flex-col  h-lvh bg-black  pt-10 gap-4 pl-4">
      <DateRangePicker onApply={setDate} />

      <RangePicker label="Pick Range" onApplyRange={onFilter} minValue={200} />
      <div className="border-2 border-white w-40">
        <table className="w-full">
          <thead className="bg-black text-white font-bold">
            <tr>
              <th>Value</th>
            </tr>
          </thead>
          <tbody className="rounded-b-lg">
            {filteredData.length > 0 ? (
              filteredData.map((data) => (
                <tr key={data} className="odd:bg-slate-50 even:bg-slate-300 ">
                  <td>{data}</td>
                </tr>
              ))
            ) : (
              <tr className="bg-slate-50 ">
                <td>Data not found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
