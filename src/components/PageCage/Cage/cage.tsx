"use client"

import { useContext, useState } from "react"
import { AppContext } from "@/app/app"
import Input from "../../Reusables/Input"
import Button from "../../Reusables/Button"
import styles from "./cage.module.scss"
import { checkAppropriateness } from "@/src/utils/rules"
import { parse, convert } from "@/src/utils/calculate"
import { ENotification } from "@/src/types/Notification"

export default function Cage(): React.ReactElement {
    const {
        state: { signerAddress, CSNContract, provider, ETHBalance, CSNBalance },
        setState,
    } = useContext(AppContext)
    const [amount, setAmount] = useState("")

    const mintCSN = async () => {
        const mintAmount = parse.CSN(amount)
        const ethRequired = convert.CSN_ETH(amount)
        const weiRequired = parse.ETH(ethRequired)

        if (checkAppropriateness(amount) && ethRequired <= ETHBalance) {
            try {
                const mintTx = await CSNContract?.mint(
                    signerAddress,
                    mintAmount,
                    {
                        value: weiRequired,
                    }
                )
                setState((prevState) => ({
                    ...prevState,
                    notification: ENotification.waiting,
                }))

                provider?.once(mintTx.hash, () => {
                    setState((prevState) => ({
                        ...prevState,
                        notification: ENotification.confirmed,
                        lastTxHash: mintTx.hash,
                    }))
                    setAmount("")
                })
            } catch (e) {
                console.log(e)
                setAmount("")
            }
        } else {
            setState((prevState) => ({
                ...prevState,
                notification:
                    Number(amount) < 0
                        ? ENotification.inappropriateAmount
                        : ENotification.insufficientFunds,
            }))
            setAmount("")
        }
    }

    const burnCSN = async () => {
        if (checkAppropriateness(amount, "0", CSNBalance)) {
            try {
                const burnAmount = parse.CSN(amount)
                const burnTx = await CSNContract?.burn(burnAmount)

                setState((prevState) => ({
                    ...prevState,
                    notification: ENotification.waiting,
                }))

                provider?.once(burnTx.hash, () => {
                    setState((prevState) => ({
                        ...prevState,
                        notification: ENotification.confirmed,
                        lastTxHash: burnTx.hash,
                    }))
                    setAmount("")
                })
            } catch (e) {
                console.log(e)
                setAmount("")
            }
        } else {
            setState((prevState) => ({
                ...prevState,
                notification:
                    Number(amount) < 0
                        ? ENotification.inappropriateAmount
                        : ENotification.insufficientFunds,
            }))
            setAmount("")
        }
    }

    return (
        <div className={styles.root}>
            <Input
                type="number"
                placeholder="0.0000"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAmount(e.target.value)
                }
                onClear={() => setAmount("")}
                value={amount}
                className={styles.cageInput}
            />
            <div className={styles.cageAction}>
                <Button className={styles.mint} onClick={mintCSN}>
                    GET CSN
                </Button>
                <Button className={styles.burn} onClick={burnCSN}>
                    BURN CSN
                </Button>
            </div>
        </div>
    )
}
