import { ReactNode } from "react";

export interface IPhoneCode {
  code: number;
  country: string;
  iconUrl: string;
}

export interface IInputProps extends React.AllHTMLAttributes<HTMLInputElement> {
  label?: string;
  disabled?: boolean;
  loading?: boolean;
  isValid?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  error?: string | null;
  success?: string | null;
  wordLimit?: number;
  externalCounting?: boolean;
}

export interface ITextAreaProps
  extends React.AllHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  disabled?: boolean;
  loading?: boolean;
  isValid?: boolean;
  className?: string;
  error?: string | null;
  success?: string | null;
  wordLimit?: number;
  externalCounting?: boolean;
}
