"use client"

import React, { createContext, useEffect, useState } from "react"
import Notification from "@/src/components/Reusables/Notification"
import {
    NETWORKS,
    SUPPORTED_NETWORKS,
    NO_NETWORK,
} from "@/src/constants/networks"
import {
    LOTTERY_ADDRESS,
    LOTTERY_ABI,
    CSN_ADDRESS,
    CSN_ABI,
} from "@/src/constants/contracts"
import { CSN, ETH } from "@/src/constants/tokens"
import { ethers } from "ethers"
import { format } from "@/src/utils/calculate"
import { IAppContext, IAppState } from "@/src/types/App"
import { ICMSData } from "@/src/types/CMSData"
import { ENotification } from "@/src/types/Notification"
import { TSupportedNetwork } from "@/src/types/Networks"

declare global {
    interface Window {
        ethereum: any
    }
}

export const AppContext = createContext({} as IAppContext)

export default function AppContextProvider({
    children,
    CMSData,
}: {
    children: React.ReactNode
    CMSData: ICMSData
}): React.ReactElement {
    const [state, setState] = useState<IAppState>({
        notification: ENotification.none,
        chainId: NETWORKS[1].chainId,
        network: NO_NETWORK,
        CSNBalance: CSN.initBalance,
        ETHBalance: ETH.initBalance,
        CMSData: CMSData,
    })

    useEffect(() => {
        if (window.ethereum) {
            setState((prevState) => ({
                ...prevState,
                provider: new ethers.providers.Web3Provider(window.ethereum),
            }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (state.provider) {
            const { ethereum } = window
            ethereum.on("accountsChanged", checkConnection)
            ethereum.on("accountsChanged", initContracts)
            ethereum.on("accountsChanged", checkNetwork)
            ethereum.on("chainChanged", checkNetwork)
            checkConnection()
            checkNetwork()
            initContracts()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.provider])

    useEffect(() => {
        const getETHBalance = async () => {
            if (state.signerAddress && state.signerAddress && state.provider) {
                try {
                    const balance = await state.provider.getBalance(
                        state.signerAddress as string
                    )
                    const formattedBalance = format.ETH(balance.toString())
                    setState((prevState) => ({
                        ...prevState,
                        ETHBalance: formattedBalance,
                    }))
                } catch (error) {
                    console.log(error)
                    setState((prevState) => ({
                        ...prevState,
                        ETHBalance: ETH.initBalance,
                    }))
                }
            } else {
                setState((prevState) => ({
                    ...prevState,
                    ETHBalance: ETH.initBalance,
                }))
            }
        }

        const getCSNBalance = async () => {
            if (state.CSNContract && state.signerAddress) {
                try {
                    const balance = await state.CSNContract.balanceOf(
                        state.signerAddress
                    )
                    const formattedBalance = format.CSN(balance.toString())
                    setState((prevState) => ({
                        ...prevState,
                        CSNBalance: formattedBalance,
                    }))
                } catch (error) {
                    console.log(error)
                    setState((prevState) => ({
                        ...prevState,
                        CSNBalance: CSN.initBalance,
                    }))
                }
            } else {
                setState((prevState) => ({
                    ...prevState,
                    CSNBalance: CSN.initBalance,
                }))
            }
        }

        getETHBalance()
        getCSNBalance()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        state.CSNContract,
        state.signerAddress,
        state.chainId,
        state.notification,
        state.provider,
    ])

    const checkConnection = async () => {
        if (state.provider) {
            const addresses = await state.provider.listAccounts()
            // it doesn't create metamask popup
            if (addresses.length) {
                setState((prevState) => ({
                    ...prevState,
                    connection: true,
                    signerAddress: addresses[0],
                }))
            } else {
                setState((prevState) => ({
                    ...prevState,
                    connection: false,
                }))
            }
        }
    }

    const checkNetwork = async () => {
        const { ethereum } = window
        if (ethereum) {
            const currentNetworkId = await ethereum.request({
                method: "eth_chainId",
            })

            // Switch to Goerli while still in testing phase
            const addresses = await state.provider.listAccounts()
            if (currentNetworkId !== NETWORKS[1].chainId && addresses.length) {
                try {
                    await ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: NETWORKS[1].chainId }],
                    })
                    setState((prevState) => ({
                        ...prevState,
                        chain: NETWORKS[1].chainName,
                    }))
                } catch (switchError: any) {
                    // This error code indicates that the chain has not been added to MetaMask.
                    if (switchError.code === 4902) {
                        try {
                            await ethereum.request({
                                method: "wallet_addEthereumChain",
                                params: [
                                    {
                                        chainId: NETWORKS[1].chainId,
                                        chainName: NETWORKS[1].chainName,
                                        rpcUrls: [NETWORKS[1].rpcUrl],
                                    },
                                ],
                            })

                            setState((prevState) => ({
                                ...prevState,
                                chain: NETWORKS[1].chainName,
                            }))
                        } catch (error) {
                            console.log(error)
                        }
                    }
                }
            }

            let isKnownChain

            NETWORKS.forEach((network) => {
                if (network.chainId === currentNetworkId) {
                    setState((prevState) => ({
                        ...prevState,
                        network: network.chainName,
                        chainId: currentNetworkId,
                        explorer: network.explorer,
                    }))
                    isKnownChain = true
                }
            })

            !isKnownChain &&
                setState((prevState) => ({
                    ...prevState,
                    network: "Unknown...",
                    chainId: currentNetworkId,
                    explorer: "",
                }))
        } else {
            setState((prevState) => ({
                ...prevState,
                network: NO_NETWORK,
            }))
        }
    }

    const initContracts = async () => {
        if (state.provider && SUPPORTED_NETWORKS.includes(state.chainId)) {
            const addresses = await state.provider.listAccounts()
            const signer = state.provider.getSigner(addresses[0])
            setState((prevState) => ({
                ...prevState,
                CSNContract: new ethers.Contract(
                    CSN_ADDRESS[state.chainId as TSupportedNetwork],
                    CSN_ABI,
                    signer
                ),
                lotteryContract: new ethers.Contract(
                    LOTTERY_ADDRESS[state.chainId as TSupportedNetwork],
                    LOTTERY_ABI,
                    signer
                ),
            }))
        }
    }

    return (
        <AppContext.Provider value={{ state, setState }}>
            <Notification />
            {children}
        </AppContext.Provider>
    )
}
