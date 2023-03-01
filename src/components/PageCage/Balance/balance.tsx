"use client"

import { useContext } from "react"
import { AppContext } from "@/app/app"
import styles from "./balance.module.scss"

interface IProps {
    token: string
}

export default function Balance({ token }: IProps): React.ReactElement {
    const {
        state: { ETHBalance, CSNBalance },
    } = useContext(AppContext)

    const renderBalance = () => {
        switch (token) {
            case "ETH":
                return ETHBalance

            case "CSN":
                return CSNBalance

            default:
                return "0"
        }
    }

    return (
        <div className={styles.root}>
            <div className={styles.balanceText}>{token}</div>
            <div className={styles.balanceValue}>
                {Number(renderBalance()).toFixed(4)}
            </div>
        </div>
    )
}
