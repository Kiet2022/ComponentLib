import { CustomTable, ITable, ITableColumn } from "@/components/table";
import { useState } from "react";
import { dataUser, User } from "./data.mock";

export default function TableLibrary() {
  //   const [data, setData] = useState<User[]>(dataUser);

  const columns: ITableColumn<User>[] = [
    {
      columnKey: "id",
      header: "Id",
      width: '150px'
    },
    {
      columnKey: "username",
      header: "User",
      width: '150px'
    },
    {
      columnKey: "password",
      header: "Pass",
      width: '150px'
    },
    {
      columnKey: "firstName",
      header: "First Name",
      width: '150px'
    },
    {
      columnKey: "lastName",
      header: "Last Name",
      width: '150px'
    },
    {
      columnKey: "maidenName",
      header: "Maiden Name Super Long Long Header",
      width: '150px'
    },
    {
      columnKey: "gender",
      header: "Gender",
      width: '150px'
    },
    {
      columnKey: "age",
      header: "Age",
      width: '150px'
    },
    {
      columnKey: "birthDate",
      header: "Birthday",
      width: '150px'
    },
    {
      columnKey: "phone",
      header: "Phone",
      width: '150px'
    },
    {
      columnKey: "email",
      header: "Email",
      width: '150px'
    },
  ];
  const data: ITable<User> = {
    data: dataUser,
    columns: columns,
  };

  return (
    <div className="bg-black h-fit p-4">
      <CustomTable data={dataUser} columns={columns} paging={true} pagingOptions={[1,2,5,10]} width={'5'}/>
      
      {/* {data.data.map((user, index) => (
        <div
          key={index}
          className="flex text-white gap-2 p-2 rounded-lg border-white border-2 m-2 flex-wrap"
        >
          {data.columns.map((col, colIndex) => (
            <div key={colIndex} className="flex">
              <span>{col.columnKey}</span>
              <span>{":  "}</span>
              <span>{user[col.columnKey]}</span>
            </div>
          ))}
        </div>
      ))} */}
    </div>
  );
}
