"use client"

import { useContext } from "react"
import { AppContext } from "@/app/app"
import Button from "../../Reusables/Button"
import styles from "./connect.module.scss"
import { CONNECT } from "./constants"
import { truncate } from "@/src/utils/truncate"

interface IProps {
    headerState: boolean
}

export default function Connect({ headerState }: IProps): React.ReactElement {
    const {
        state: { provider, connection, signerAddress },
        setState,
    } = useContext(AppContext)

    const connect = async () => {
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
    }

    return (
        <Button
            onClick={connect}
            className={styles.root}
            style={{
                display: headerState ? "flex" : "none",
                cursor: !provider ? "not-allowed" : "pointer",
            }}
            isDisabled={!provider}
        >
            {connection ? truncate(signerAddress) : CONNECT}
        </Button>
    )
}
