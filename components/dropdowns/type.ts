export interface IDropdown extends React.AllHTMLAttributes<HTMLDivElement>{
    options: string[] | number[];
    defaultValue?: string | string[];
    onHandleChange?: (data: string[]) => void;
    onSelected?: (data: string) => void;
  }