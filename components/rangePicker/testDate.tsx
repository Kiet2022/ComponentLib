import { useEffect, useState } from "react";

export default function TestDate() {
  const [date, setDate] = useState<any>();

  useEffect(() => {
    let res = document.getElementById("result") as HTMLSpanElement;
    res.innerHTML = date;
    
    let d = new Date(2024,2,5);
    let w = d.getDay();
    let dres = document.getElementById('date') as HTMLSpanElement;
    dres.innerHTML = d.toLocaleDateString()
  }, [date]);

  return (
    <div>
      <input
        type="date"
        id="dateInp"
        onChange={(e) => setDate(e.target.value)}
      />
      <div className="p-2 bg-white">
        <span>Input: </span>
        <span id="result"></span>
      </div>
      <div className="p-2 bg-white">
        <span>Date Type: </span>
        <span id="date"></span>
      </div>
    </div>
  );
}
