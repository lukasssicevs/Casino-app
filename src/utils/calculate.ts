import { ethers } from "ethers"

const { parseEther, formatEther, parseUnits, formatUnits } = ethers.utils

export const parse = {
    CSN: (amount: string) => parseUnits(amount, 4).toString(),
    ETH: (amount: string) => parseEther(amount).toString(),
}

export const format = {
    CSN: (amount: string) => formatUnits(amount, 4).toString(),
    ETH: (amount: string) => formatEther(amount).toString(),
}

export const convert = {
    CSN_ETH: (CSN: string) => (Number(CSN) / 1e4).toString(),
}
