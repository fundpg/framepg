import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const FPG_ICON_URL = 'https://i.imgur.com/693bMHN.png';
export const DAIMO_BASE_URL = `https://daimo.com/l/account/`
export const FPG_BANNER_URL = 'https://i.imgur.com/Ag60nbm.png';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
