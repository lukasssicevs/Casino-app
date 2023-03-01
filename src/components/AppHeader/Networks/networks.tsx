"use client"

import { useContext, useState, useEffect, useRef } from "react"
import { AppContext } from "@/app/app"
import Button from "../../Reusables/Button"
import Arrow from "@/src/components/Reusables/Svg/Arrow"
import styles from "./networks.module.scss"
import clsx from "clsx"
import { NETWORKS } from "@/src/constants/networks"
import { INetwork } from "@/src/types/Network"
import useMediaQueries from "@/src/hooks/useMediaQueries"
import { useOnClickOutside } from "usehooks-ts"

interface IProps {
    headerState: boolean
}

export default function Networks({ headerState }: IProps): React.ReactElement {
    const { state, setState } = useContext(AppContext)
    const [dropdown, setDropdown] = useState(false)
    const { isTablet, isDesktop } = useMediaQueries()
    const ref = useRef(null)

    useOnClickOutside(ref, () => setDropdown(false))

    useEffect(() => {
        setDropdown(false)
    }, [isTablet, isDesktop])

    const switchNetwork = async (network: INetwork) => {
        if (state.provider && window.ethereum) {
            const { chainId, chainName, rpcUrl } = network
            try {
                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: chainId }],
                })
                setState((prevState) => ({
                    ...prevState,
                    chain: chainName,
                }))
            } catch (switchError: any) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    try {
                        await window.ethereum.request({
                            method: "wallet_addEthereumChain",
                            params: [
                                {
                                    chainId: chainId,
                                    chainName: chainName,
                                    rpcUrls: [rpcUrl],
                                },
                            ],
                        })

                        setState((prevState) => ({
                            ...prevState,
                            chain: chainName,
                        }))
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
        }
    }
    return (
        <div ref={ref}>
            <Button
                className={styles.networkBtn}
                onClick={() => setDropdown(!dropdown)}
                style={{
                    display: headerState ? "flex" : "none",
                    cursor: !state.provider ? "not-allowed" : "pointer",
                }}
                isDisabled={!state.provider}
            >
                <div className={styles.networkBtnText}>{state.network}</div>
                <Arrow
                    condition={dropdown}
                    up={styles.arrowUp}
                    down={styles.arrowDown}
                />
            </Button>
            <div
                className={styles.networksDropdown}
                style={{ display: dropdown ? "block" : "none" }}
            >
                {headerState &&
                    NETWORKS.map((network) => (
                        <div
                            key={network.chainId}
                            className={clsx(
                                styles.network,
                                state.chainId === network.chainId &&
                                    styles.selectedNetwork
                            )}
                            onClick={() => switchNetwork(network)}
                        >
                            {network.chainName}
                        </div>
                    ))}
            </div>
        </div>
    )
}
