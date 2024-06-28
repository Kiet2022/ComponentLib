import { ReactNode } from "react";

export interface IChip extends  React.AllHTMLAttributes<HTMLDivElement>{
    content: string;
    variant?: 'default';
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    closeAble?: boolean;
    clickAble?: boolean;
}