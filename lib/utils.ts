import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { createClient, convertViemChainToRelayChain, MAINNET_RELAY_API, TESTNET_RELAY_API } from '@reservoir0x/relay-sdk'
import { mainnet } from 'viem/chains'

export const FPG_ICON_URL = 'https://i.imgur.com/693bMHN.png';
export const DAIMO_BASE_URL = `https://daimo.com/l/account/`
export const FPG_BANNER_URL = 'https://i.imgur.com/Ag60nbm.png';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

createClient({
  baseApiUrl: MAINNET_RELAY_API,
  chains: [convertViemChainToRelayChain(mainnet)]
});