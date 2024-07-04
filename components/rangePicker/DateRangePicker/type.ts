export interface IDateRangePicker {
  onApply?: (range: string[]) => void;
}

export interface ICalendar {
  time?: Date;
  onSelected?: (date: Date) => void;
  selectedRangeStart?: Date;
  selectedRangeEnd?: Date;
  linkedDate?: Date;
  onHover?: (date: Date|undefined) => void;
  
}

export interface IDateCell {
  value?: Date;
  isWeekend?: boolean;
  display?: "default" | "blur" | "selected" | "highlighted" | "marked";
  disable?: boolean;
  onClick?: () => void;
}

export enum EDateCellDisplayStatus {
  DEFAULT = "default",
  BLUR = "blur",
  SELECTED = "selected",
  HIGHTLIGHTED = "highlighted",
  MARKED = "marked",
}
