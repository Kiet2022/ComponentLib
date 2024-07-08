export interface ITable<T> {
  data: T[];
  columns: ITableColumn<T>[];
  width?: string | number;
  height?: string | number;

  pagingOptions?: number[];
  defaultPaging?: number;

  sorting?: boolean;
  paging?: boolean;
  scrolling?: boolean;
  filtering?: boolean;
  onChange?: (data: T[]) => void;
  //////FUTURE
  /*
    ordering?: boolean;
    topToolbar?: boolean;
    bottomToolbar?: boolean;
  */
}

export interface ITableColumn<T> {
  columnKey: keyof T;
  header: string;
  width: string;
  cellValue?: string;
  filterRule?:
    | "include"
    | "equal"
    | "equalIgnoreCase"
    | "range"
    | "date"
    | "dateRange";
}
//////FUTURE/////////


