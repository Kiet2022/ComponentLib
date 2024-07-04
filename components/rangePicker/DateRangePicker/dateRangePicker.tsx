import { useState } from "react";
import Icon from "../../icons/icon";
import { useOutsideClick } from "@/shared";
import { Calendar } from "./calendar";
import { IDateRangePicker } from "./type";
import { twMerge } from "tailwind-merge";

export function DateRangePicker({ onApply }: Readonly<IDateRangePicker>) {
  const monthName = [
    "January",
    "February",
    "March",
    "April",
    " May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const ref = useOutsideClick(() => {
    setIsOpenMenu(false);
  });
  const [hoveredDate, setHoveredDate] = useState<Date | undefined>();
  const [endTime, setEndTime] = useState<Date>();
  const [startTime, setStartTime] = useState<Date>();
  const [rightCalendar, setRightCalendar] = useState(new Date());
  const [leftCalendar, setLeftCalendar] = useState(
    new Date(rightCalendar.getFullYear(), rightCalendar.getMonth(), 0)
  );

  const onHandleSelectedDate = (
    selectedDate: Date,
    isLeftSelected: boolean
  ) => {
    let calendar = isLeftSelected
      ? new Date(leftCalendar)
      : new Date(rightCalendar);

    if (selectedDate.getMonth() !== calendar.getMonth()) {
      calendar.setMonth(selectedDate.getMonth());

      if (isLeftSelected) {
        if (calendar.getMonth() !== new Date().getMonth()) {
          setLeftCalendar(calendar);
          if (calendar.getMonth() == rightCalendar.getMonth()) {
            let newRight = new Date(
              rightCalendar.getFullYear(),
              rightCalendar.getMonth() + 1,
              1
            );
            setRightCalendar(newRight);
          }
        }
      } else {
        setRightCalendar(calendar);
        if (calendar.getMonth() == leftCalendar.getMonth()) {
          let newLeft = new Date(
            leftCalendar.getFullYear(),
            leftCalendar.getMonth() - 1,
            1
          );
          setLeftCalendar(newLeft);
        }
      }
    } else {
      onHandleChangeRange(selectedDate);
    }
  };

  const onHandleChangeRange = (value: Date) => {
    if (startTime) {
      if (endTime) {
        setStartTime(value);
        setEndTime(undefined);
      } else if (value < startTime) {
        setEndTime(startTime);
        setStartTime(value);
      } else {
        setEndTime(value);
      }
    } else {
      setStartTime(value);
    }
  };

  const onChangeMonth = (isToLeft: boolean) => {
    if (isToLeft) {
      setRightCalendar(leftCalendar);
      setLeftCalendar(
        new Date(leftCalendar.getFullYear(), leftCalendar.getMonth() - 1)
      );
    } else {
      setLeftCalendar(rightCalendar);
      setRightCalendar(
        new Date(rightCalendar.getFullYear(), rightCalendar.getMonth() + 1)
      );
    }
  };

  const onHandleApply = () => {
    if (startTime !== undefined && endTime !== undefined) {
      if (onApply) {
        let data: string[] = [formatDate(startTime), formatDate(endTime)];
        onApply(data);
      }
    }
  };
  const formatDate = (date: Date | undefined) => {
    if (date === undefined) {
      return "";
    }
    let year = date?.getFullYear();
    let m = date.getMonth() + 1;
    let month = m < 10 ? `0${m}` : m;
    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    return `${year}-${month}-${day}`;
  };

  return (
    <div ref={ref}>
      <div
        onClick={() => setIsOpenMenu(true)}
        className={twMerge(
          "row-center font-bold w-fit h-12 rounded-lg bg-white border border-slate-800",
          isOpenMenu ? "bg-blue-200 text-blue-600" : ""
        )}
      >
        <div className="w-12">
          <Icon name="calendar" size={40} className="w-fit pl-2" />
        </div>

        <div className="row-center rounded-full hover:bg-slate-200 focus-within:bg-slate-200 h-full w-32 mx-2">
          <input
            type="date"
            name="startDate"
            id="startDate"
            className="input"
            value={formatDate(startTime)}
            onChange={(e) => setStartTime(new Date(e.target.value))}
          />
        </div>
        <div>{" - "}</div>
        <div className="row-center rounded-full hover:bg-slate-200 focus-within:bg-slate-200 h-full w-32 mx-2">
          <input
            type="date"
            name="endDate"
            id="endDate"
            className="input"
            value={formatDate(endTime)}
            onChange={(e) => setEndTime(new Date(e.target.value))}
          />
        </div>
      </div>
      <div className="relative">
        <div
          className={`absolute top-2  bg-white rounded-lg border border-slate-800 ${
            isOpenMenu ? "visible" : "invisible"
          }`}
        >
          {/* //////////HEADER//////////// */}
          <div className="flex justify-between px-10 pt-4">
            <div className="flex gap-8 text-center text-2xl font-bold my-2">
              <button onClick={() => onChangeMonth(true)}>{" < "}</button>{" "}
              <div>
                {monthName[leftCalendar.getMonth()]}{" "}
                {leftCalendar.getFullYear()}
              </div>
            </div>

            <div className="flex gap-8 text-center text-2xl font-bold my-2">
              <div>
                {monthName[rightCalendar.getMonth()]}{" "}
                {rightCalendar.getFullYear()}
              </div>
              <button onClick={() => onChangeMonth(false)}>{" > "}</button>
            </div>
          </div>
          {/* ////////////BODY///////// */}
          <div className="flex gap-12 p-4 w-fit">
            {/* /////////LEFT CALENDAR//////// */}

            <Calendar
              time={leftCalendar}
              onSelected={(date) => {
                onHandleSelectedDate(date, true);
              }}
              selectedRangeStart={startTime}
              selectedRangeEnd={endTime}
              linkedDate={hoveredDate}
              onHover={setHoveredDate}
            />

            {/* /////////RIGHT CALENDAR//////// */}

            <Calendar
              time={rightCalendar}
              onSelected={(date) => {
                onHandleSelectedDate(date, false);
              }}
              selectedRangeStart={startTime}
              selectedRangeEnd={endTime}
              linkedDate={hoveredDate}
              onHover={setHoveredDate}
            />
          </div>
          {/* /////////FOOTER//////// */}
          <div className="flex justify-end gap-2 p-4">
            <button
              onClick={() => setIsOpenMenu(false)}
              className="grey-btn px-3 py-2 rounded-full text-base "
            >
              Cancel
            </button>
            <button
              onClick={onHandleApply}
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
