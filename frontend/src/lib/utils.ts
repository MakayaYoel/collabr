import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateString(str: string, length: number) : string {
  return str.length > length ? str.slice(0, length) + '...' : str;
};