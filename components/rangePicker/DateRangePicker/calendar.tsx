import { useEffect, useState } from "react";
import { ICalendar, IDateCell } from "./type";
import { DateCell } from "./dateCell";
import { twMerge } from "tailwind-merge";

export function Calendar({
  time = new Date(),
  onSelected,
  selectedRangeStart,
  selectedRangeEnd,
  onHover,
  linkedDate,
}: Readonly<ICalendar>) {
  const currentDate = new Date();
  const [daysData, setDaysData] = useState<IDateCell[]>([]);
  const [calendarDate, setCalendarDate] = useState(time);
  let m = calendarDate.getMonth();
  let y = calendarDate.getFullYear();
  let firstDayOfMonth = new Date(y, m, 1);
  let lastDayOfMonth = new Date(y, m + 1, 0);
  let firstDayOfMonthWeekIndex = firstDayOfMonth.getDay();
  let daysOfMonth = lastDayOfMonth.getDate();

  const getCalendarBodyData = () => {
    let data: IDateCell[] = [];
    let currentDayValue = 1 - firstDayOfMonthWeekIndex;

    for (let weekIndex = 0; weekIndex < 6; weekIndex++) {
      for (let dayIndex = 0; dayIndex <= 6; dayIndex++) {
        let dayData: IDateCell = getDateCellStatus(currentDayValue, dayIndex);
        data.push(dayData);
        currentDayValue++;
      }
    }
    return data;
  };

  const getDateCellStatus = (
    cellValue: number,
    dayIndex: number
  ): IDateCell => {
    let dayData: IDateCell = {};
    let isWeekend = !!(dayIndex === 0 || dayIndex === 6);
    let date = new Date(y, m, cellValue);

    ////GENERAL
    dayData.value = date;
    dayData.isWeekend = isWeekend;
    dayData.disable = !!(
      m === currentDate.getMonth() && cellValue > currentDate.getDate()
    );

    /////DISPLAY(BLUR OR MARKED) AND ONCLICK FUNCTION
    if (
      date.getTime() < firstDayOfMonth.getTime() ||
      date.getTime() > lastDayOfMonth.getTime()
    ) {
      dayData.display = "blur";
      dayData.onClick = () => {
        setCalendarDate(date);
        onHandleSelectedDay(date);
      };
    } else {
      if (date.toDateString() === currentDate.toDateString()) {
        dayData.display = "marked";
      }
      dayData.onClick = () => {
        onHandleSelectedDay(date);
      };
    }

    /////DISPLAY(HIGLIGHT OR SELECTED)
    dayData = setHighLightedCell(dayData, date, cellValue);
    return dayData;
  };

  const setHighLightedCell = (
    cell: IDateCell,
    date: Date,
    cellIndex: number
  ): IDateCell => {
    if (cellIndex < 1 || cellIndex > daysOfMonth) {
      return cell;
    }
    if (selectedRangeStart !== undefined) {
      if (
        date.toDateString() == selectedRangeEnd?.toDateString() ||
        date.toDateString() == selectedRangeStart?.toDateString()
      ) {
        cell.display = "selected";
        return cell;
      }

      if (selectedRangeEnd !== undefined) {
        if (date > selectedRangeStart && date < selectedRangeEnd) {
          if (
            date?.getDate() > selectedRangeStart?.getDate() ||
            date?.getDate() < selectedRangeEnd?.getDate()
          ) {
            cell.display = "highlighted";
          }
        }
      }
    }
    return cell;
  };

  const onHandleSelectedDay = (day: Date) => {
    if (onSelected) {
      onSelected(day);
    }
  };

  const isDayInMonth = (date: Date): boolean => {
    if (
      firstDayOfMonth.getTime() <= date.getTime() &&
      date.getTime() <= lastDayOfMonth.getTime()
    ) {
      return true;
    }
    return false;
  };

  const cellStyle = (value?: Date, display?: string) => {
    let general = "px-1 h-fit border border-transparent";
    if (value === undefined || selectedRangeStart === undefined) {
      return general;
    }
    if (!isDayInMonth(value)) {
      return general;
    }
    ////DISPLAY(HOVER)
    if (selectedRangeEnd === undefined && selectedRangeStart !== undefined) {
      let hoverStyle = "";

      if (linkedDate && value) {
        let linkValue = linkedDate.getTime();
        let startValue = selectedRangeStart.getTime();
        let currentValue = value.getTime();

        let min = linkValue > startValue ? startValue : linkValue;
        let max = linkValue == min ? startValue : linkValue;
        if (min <= currentValue && currentValue <= max) {
          hoverStyle = "border-black  border-x-transparent ";
          let expandStyle = "";
          if (value.toDateString() === linkedDate.toDateString()) {
            if (value.toDateString() === selectedRangeStart.toDateString()) {
              return twMerge(
                general,
                hoverStyle,
                "rounded-full px-0 mx-1 border-x-black"
              );
            }
            expandStyle =
              min === linkValue
                ? "rounded-l-full pl-0 ml-1 border-l-black"
                : "rounded-r-full pr-0 mr-1 border-r-black";
          } else if (
            value.toDateString() === selectedRangeStart.toDateString()
          ) {
            expandStyle =
              max === linkValue
                ? "rounded-l-full pl-0 ml-1 border-l-black "
                : "rounded-r-full pr-0 mr-1 border-r-black";
          }
          hoverStyle = twMerge(hoverStyle, expandStyle);
          if (value.getDay() === 0 || value.getDate() === 1) {
            hoverStyle = twMerge(
              hoverStyle,
              "rounded-l-full pl-0 ml-1 border-l-black"
            );
          }
          if (value.getDay() === 6 || value.getDate() === daysOfMonth) {
            hoverStyle = twMerge(
              hoverStyle,
              "rounded-r-full pr-0 mr-1 border-r-black"
            );
          }
        }
      }
      return twMerge(general, hoverStyle);
    }

    //SELECTED && HIGHLIGHTED
    if (display === "highlighted") {
      let style = "bg-blue-100 ";
      if (value.getDay() === 0 || value.getDate() === 1) {
        style += "rounded-l-full pl-0 ml-1";
      }
      if (value.getDay() === 6 || value.getDate() === daysOfMonth) {
        style += " rounded-r-full pr-0 mr-1";
      }
      return twMerge(general, style);
    } else if (display === "selected") {
      if (
        value &&
        selectedRangeStart &&
        value.toDateString() === selectedRangeStart.toDateString()
      ) {
        return twMerge(general, "bg-blue-100 rounded-l-full pl-0 ml-1");
      } else {
        return twMerge(general, "bg-blue-100 rounded-r-full pr-0 mr-1");
      }
    }
    return general;
  };

  useEffect(() => {
    setCalendarDate(time);
    let newData = getCalendarBodyData();
    setDaysData(newData);
  }, [calendarDate, time, selectedRangeEnd, selectedRangeStart, linkedDate]);
  return (
    <div className="w-fit bg-white ">
      <div>
        <div
          id="calendar-header"
          className="grid grid-cols-7 gap-2 text-center"
        >
          <span className="text-sm font-bold">Su</span>
          <span className="text-sm font-bold">Mo</span>
          <span className="text-sm font-bold">Tu</span>
          <span className="text-sm font-bold">We</span>
          <span className="text-sm font-bold">Th</span>
          <span className="text-sm font-bold">Fr</span>
          <span className="text-sm font-bold">Sa</span>
        </div>
        <div id="calendar-body" className="grid grid-cols-7 gap-y-2">
          {daysData.map((day, index) => (
            <div
              key={day.value?.toDateString()}
              className={cellStyle(day.value, day.display)}
              onMouseEnter={() => {
                if (onHover) {
                  if (!day.disable || day.display !=='blur') {
                    onHover(day.value);
                  }
                }
              }}
            >
              <DateCell
                value={day.value}
                display={day.display}
                disable={day.disable}
                isWeekend={day.isWeekend}
                onClick={day.onClick}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
