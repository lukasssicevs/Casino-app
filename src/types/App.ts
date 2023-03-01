import { ethers } from "ethers"
import { ICMSData } from "./CMSData"

export interface IAppContext {
    state: IAppState
    setState: React.Dispatch<React.SetStateAction<IAppState>>
}

export interface IAppState {
    provider?: ethers.providers.Web3Provider | any
    connection?: boolean
    network?: string
    chainId: string
    explorer?: string
    signer?: ethers.providers.JsonRpcSigner
    CSNContract?: ethers.Contract
    lotteryContract?: ethers.Contract
    signerAddress?: string
    signersCSNBalance?: string
    lastTxHash?: string
    notification: string
    CMSData: ICMSData
    CSNBalance: string
    ETHBalance: string
    lotteryAllowance?: string
}
