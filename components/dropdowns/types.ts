import { ReactNode } from "react";

export interface IDropdown extends  React.AllHTMLAttributes<HTMLDivElement>{
    leftIcon: ReactNode;
    rightIcon: ReactNode;
}