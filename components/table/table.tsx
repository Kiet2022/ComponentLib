import { ReactNode, useEffect, useState } from "react";
import { ITable } from "./type";
import { InputSearch } from "../inputs";
import { Button } from "../buttons";
import { DropdownSelect } from "../dropdowns";

export function CustomTable<T>({
  columns,
  data,
  width,
  height,
  sorting = true,
  pagingOptions,
  defaultPaging = pagingOptions ? pagingOptions[0] : data.length,
  // scrolling = true,
  // ordering = true,
  paging = false,
  filtering = true,
}: Readonly<ITable<T>>) {
  const [displayData, setDisplayData] = useState<T[]>(data);
  const [page, setPage] = useState<number>(1);
  const [sortedState, setSortedState] = useState<{
    state: "none" | "ascending" | "descending";
    column: keyof T;
  }>({ state: "none", column: columns[0].columnKey });
  const [filterState, setFilterState] = useState<IFilter[]>(
    columns.map((col) => {
      return {
        filterKey: "",
        state: "none",
        columnKey: col.columnKey,
        rule: col.filterRule ? col.filterRule : "include",
      };
    })
  );
  const [pageRow, setPageRow] = useState<number>(defaultPaging);

  const changeSortedState = (key: keyof T) => {
    const state =
      sortedState.state === "none"
        ? "ascending"
        : sortedState.state === "ascending"
        ? "descending"
        : "none";
    setSortedState({ state: state, column: key });
  };
  interface IFilter {
    filterKey: string;
    state: "none" | "all" | "column";
    columnKey: keyof T;
    rule:    | "include"
    | "equal"
    | "equalIgnoreCase"
    | "range"
    | "date"
    | "dateRange";
  }
  /////FILTER///////

  const updateFilterState = (colIndex: number, filterKey: string) => {
    let newState = [...filterState];
    newState[colIndex].filterKey = filterKey;
    setFilterState(newState);
  };

  const filterAll = (filterKey: string) => {
    let newData: T[] = [...data];
    newData = newData.filter((d) => {
      for (const column of columns) {
        let cellData: string = String(d[column.columnKey]);
        if (cellData.includes(filterKey)) {
          return d;
        }
      }
    });
    console.log('new data: ', newData)
    setDisplayData(newData);
  };
  const filterInRange = (data: T[], filter: IFilter): T[] => {
    let newData: T[] = [...data];
    newData = newData.filter((d) => {
      let cellData: string = String(d[filter.columnKey]);
      if (cellData === filter.filterKey) {
        return d;
      }
    });
    return newData;
  };

  const filterIsEqual = (data: T[], filter: IFilter): T[] => {
    let newData: T[] = [...data];
    newData = newData.filter((d) => {
      let cellData: string = String(d[filter.columnKey]);
      if (cellData === filter.filterKey) {
        return d;
      }
    });
    return newData;
  };

  const filterIsEqualIgnoreCase = (data: T[], filter: IFilter): T[] => {
    let newData: T[] = [...data];
    newData = newData.filter((d) => {
      let cellData: string = String(d[filter.columnKey]);
      if (cellData == filter.filterKey) {
        return d;
      }
    });
    return newData;
  };

  const filterInclude = (data: T[], filter: IFilter): T[] => {
    let newData: T[] = [...data];
    newData = newData.filter((d) => {
      let cellData: string = String(d[filter.columnKey]);
      if (cellData.includes(filter.filterKey)) {
        return d;
      }
    });
    return newData;
  };

  useEffect(() => {
    let newDisplay = [...data];
    for (const filter of filterState) {
      if (filter.filterKey.length == 0) continue;

      switch (filter.rule) {
        case "include":
          newDisplay = filterInclude(newDisplay, filter);
          break;
        case "equal":
          newDisplay = filterIsEqual(newDisplay, filter);
          break;
        case "equalIgnoreCase":
          newDisplay = filterIsEqualIgnoreCase(newDisplay, filter);
          break;
        default:
          break;
      }
    }
    setDisplayData(newDisplay);
  }, [filterState]);
  /////SORTED//////

  useEffect(() => {
    switch (sortedState.state) {
      case "none":
        setDisplayData(data);
        break;
      case "ascending":
        setDisplayData(
          displayData.toSorted((a, b) => {
            let first = a[sortedState.column];
            let second = b[sortedState.column];
            if (typeof first === "string" && typeof second === "string") {
              return first.localeCompare(second);
            } else if (
              typeof first === "number" &&
              typeof second === "number"
            ) {
              return first - second;
            }
            return 0;
          })
        );
        break;
      case "descending":
        setDisplayData(
          displayData.toSorted((a, b) => {
            let first = b[sortedState.column];
            let second = a[sortedState.column];
            if (typeof first === "string" && typeof second === "string") {
              return first.localeCompare(second);
            } else if (
              typeof first === "number" &&
              typeof second === "number"
            ) {
              return first - second;
            }
            return 0;
          })
        );
        break;
    }
  }, [sortedState]);
  ////PAGING//////
  const initialPagingData = (): ReactNode => {
    let pageData: ReactNode = displayData.map((data, index) => {
      let startIndex = (page - 1) * pageRow;
      let endIndex = page * pageRow - 1;
      if (startIndex <= index && index <= endIndex) {
        return (
          <tr key={index} className="even:bg-slate-200">
            {columns.map((col, colIndex) => (
              <td
                key={`${index}_${colIndex}`}
                className={`border-x-slate-400 border px-2 first:border-l-0 last:border-r-0 w-[${col.width}]`}
              >
                {data[col.columnKey] && (data[col.columnKey] as string)}
              </td>
            ))}
          </tr>
        );
      }
    });
    return pageData;
  };
  useEffect(() => {
    setPage(1);
  }, [displayData]);
  return (
    <div
      className={`${width !== null ? `w-[${width}]` : "w-fit"} ${
        height !== null ? `w-[${height}]` : "h-fit"
      }`}
    >
      {/* //////////HEAD//////// */}
      <div className="flex justify-between min-h-2 w-full bg-white rounded-t-xl p-4">
        <div className="leftTopToolBar"></div>
        <div className="rightTopToolBar">
          <InputSearch
            className="box-white"
            onChange={(e) => filterAll((e.target as HTMLInputElement).value)}
          />
        </div>
      </div>
      {/* //////////TABLE/////// */}
      <div className="overflow-x-auto">
        <table className="bg-transparent  table-fixed">
          <thead className="min-h-12 w-fit ">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className={`py-2 bg-white w-[${col.width}]`}>
                  <div className="col-center">
                    <div id="headerBox" className="row-center">
                      <span className=" w-fit p-1 whitespace-nowrap">
                        {col.header}
                      </span>
                      {sorting &&
                        (sortedState.column !== col.columnKey ||
                          sortedState.state === "none") && (
                          <button
                            onClick={() => changeSortedState(col.columnKey)}
                          >
                            &#8593;&#8595;
                          </button>
                        )}
                      {sorting &&
                        sortedState.column === col.columnKey &&
                        sortedState.state === "ascending" && (
                          <button
                            onClick={() => changeSortedState(col.columnKey)}
                          >
                            &#8595;
                          </button>
                        )}
                      {sorting &&
                        sortedState.column === col.columnKey &&
                        sortedState.state === "descending" && (
                          <button
                            onClick={() => changeSortedState(col.columnKey)}
                          >
                            &#8593;
                          </button>
                        )}
                    </div>
                    <div id="filterBox">
                      {filtering && (
                        <div className="px-2">
                          <InputSearch
                            className="box-white w-full"
                            value={filterState[index].filterKey}
                            onChange={(e) => {
                              updateFilterState(
                                index,
                                (e.target as HTMLInputElement).value
                              );
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white ">
            {displayData &&
              !paging &&
              displayData.map((d, rowIndex) => (
                <tr key={rowIndex} className="even:bg-slate-200">
                  {columns.map((col, colIndex) => (
                    <td
                      key={`${rowIndex}_${colIndex}`}
                      className={`border-x-slate-400 border px-2 first:border-l-0 last:border-r-0 w-[${col.width}]`}
                    >
                      {d[col.columnKey] && (d[col.columnKey] as string)}
                    </td>
                  ))}
                </tr>
              ))}

            {displayData && paging && initialPagingData()}

            {displayData.length == 0 && (
              <tr>
                <td
                  className="text-center h-20 border-0 border-y border-slate-400 text-5xl font-bold font-semibold text-slate-300"
                  colSpan={columns.length}
                >
                  No Data!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="min-h-2 w-full bg-white rounded-b-xl p-4">
        {paging && (
          <div>
            <div className="flex justify-end gap-4 my-2 ">
              <span>{"rows per page: "}</span>
              <DropdownSelect
                options={pagingOptions ? pagingOptions : [defaultPaging]}
                onSelected={(value) => setPageRow(Number(value))}
              />
            </div>
            <div className="flex justify-center gap-4">
              <Button
                variant="primary-white"
                size="sm"
                label="< Previous"
                className="border border-black "
                disabled={page == 1}
                onClick={() => setPage(page - 1)}
              />
              <div className="row-center gap-4 font-bold">
                <span>{`Page ${page} of ${Math.ceil(
                  displayData.length / pageRow
                )}`}</span>
              </div>
              <Button
                variant="primary-white"
                size="sm"
                label="Next >"
                className="border border-black "
                disabled={page == Math.ceil(data.length / pageRow)}
                onClick={() => setPage(page + 1)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
