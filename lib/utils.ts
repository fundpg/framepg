import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const FPG_ICON_URL = 'https://i.imgur.com/693bMHN.png';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
