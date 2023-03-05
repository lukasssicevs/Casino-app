"use client"

import { useContext } from "react"
import { AppContext } from "@/app/app"
import Button from "../../Reusables/Button"
import styles from "./connect.module.scss"
import { CONNECT } from "./constants"
import { truncate } from "@/src/utils/truncate"
import { ENotification } from "@/src/types/Notification"

interface IProps {
    headerState: boolean
}

export default function Connect({ headerState }: IProps): React.ReactElement {
    const {
        state: { provider, connection, signerAddress },
        setState,
    } = useContext(AppContext)

    const connect = async () => {
        if (provider) {
            try {
                const accounts = await provider?.send("eth_requestAccounts", [])

                if (accounts[0]) {
                    const signer = provider?.getSigner(accounts[0])
                    setState((prevState) => ({
                        ...prevState,
                        signer: signer,
                        signerAddress: accounts[0],
                        connection: true,
                    }))
                } else {
                    console.log("No account returned or user denied access.")
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            setState((prevState) => ({
                ...prevState,
                notification: ENotification.noWallet,
            }))
        }
    }

    return (
        <Button
            onClick={connect}
            className={styles.root}
            style={{
                display: headerState ? "flex" : "none",
                cursor: !provider ? "not-allowed" : "pointer",
            }}
        >
            {connection ? truncate(signerAddress) : CONNECT}
        </Button>
    )
}
