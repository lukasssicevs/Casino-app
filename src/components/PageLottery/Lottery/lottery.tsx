"use client"

import { useContext, useEffect, useState } from "react"
import { AppContext } from "@/app/app"
import Button from "@/src/components/Reusables/Button"
import Input from "@/src/components/Reusables/Input"
import styles from "./lottery.module.scss"
import { parse, format } from "@/src/utils/calculate"
import { checkAppropriateness } from "@/src/utils/rules"
import { ENotification } from "@/src/types/Notification"
import { MIN_ENTRANCE_AMOUNT } from "./constants"

export default function Lottery(): React.ReactElement {
    const {
        state: {
            signerAddress,
            lotteryContract,
            CSNContract,
            provider,
            CSNBalance,
        },
        setState,
    } = useContext(AppContext)

    const [allowance, setAllowance] = useState("")
    const [amount, setAmount] = useState("")

    useEffect(() => {
        lotteryContract && CSNContract && checkAllowance()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lotteryContract, CSNContract])

    const checkAllowance = async () => {
        const allowance = await CSNContract?.allowance(
            signerAddress,
            lotteryContract?.address
        )
        setAllowance(format.CSN(allowance.toString()))
    }

    const getStake = async () => {
        const userFunds = await lotteryContract?.fundsOf(signerAddress)
        const formattedFunds = format.CSN(userFunds.toString())
        return formattedFunds
    }

    const allow = async () => {
        if (checkAppropriateness(amount, MIN_ENTRANCE_AMOUNT, CSNBalance)) {
            try {
                const approveTx = await CSNContract?.approve(
                    lotteryContract?.address,
                    parse.CSN(amount.toString())
                )

                setState((prevState) => ({
                    ...prevState,
                    notification: ENotification.waiting,
                }))

                provider?.once(approveTx.hash, () => {
                    setState((prevState) => ({
                        ...prevState,
                        notification: ENotification.confirmed,
                        lastTxHash: approveTx.hash,
                    }))

                    checkAllowance()
                })
            } catch (error) {
                console.log(error)
            }
        } else {
            setState((prevState) => ({
                ...prevState,
                notification: !checkAppropriateness(amount, MIN_ENTRANCE_AMOUNT)
                    ? ENotification.inappropriateAmount
                    : ENotification.insufficientFunds,
            }))
            setAmount("")
        }
    }

    const fund = async () => {
        if (checkAppropriateness(amount, MIN_ENTRANCE_AMOUNT, allowance)) {
            try {
                const fundTx = await lotteryContract?.fund(parse.CSN(amount))

                setState((prevState) => ({
                    ...prevState,
                    notification: ENotification.waiting,
                }))

                provider?.once(fundTx.hash, () => {
                    setState((prevState) => ({
                        ...prevState,
                        notification: ENotification.confirmed,
                        lastTxHash: fundTx.hash,
                    }))
                    setAmount("")
                    checkAllowance()
                })
            } catch (error) {
                console.log(error)
            }
        } else {
            setState((prevState) => ({
                ...prevState,
                notification: !checkAppropriateness(amount, MIN_ENTRANCE_AMOUNT)
                    ? ENotification.inappropriateAmount
                    : ENotification.insufficientAllowance,
                lotteryAllowance: allowance,
            }))
            setAmount("")
        }
    }

    const withdraw = async () => {
        const userStake = await getStake()
        if (
            checkAppropriateness(amount) &&
            checkAppropriateness(amount, "0", userStake)
        ) {
            try {
                const withdrawTx = await lotteryContract?.withdraw(
                    parse.CSN(amount.toString())
                )

                setState((prevState) => ({
                    ...prevState,
                    notification: ENotification.waiting,
                }))

                provider?.once(withdrawTx.hash, () => {
                    setState((prevState) => ({
                        ...prevState,
                        notification: ENotification.confirmed,
                        lastTxHash: withdrawTx.hash,
                    }))
                    setAmount("")
                })
            } catch (error) {
                console.log(error)
            }
        } else {
            setState((prevState) => ({
                ...prevState,
                notification: !checkAppropriateness(amount)
                    ? ENotification.inappropriateAmount
                    : ENotification.exceedingWithdrawal,
            }))
            setAmount("")
        }
    }

    return (
        <div className={styles.root}>
            <Input
                type="number"
                placeholder="0.0000"
                onChange={(e: any) => setAmount(e.target.value)}
                onClear={() => setAmount("")}
                value={amount}
                className={styles.lotteryInput}
            />
            <div className={styles.lotteryAction}>
                {Number(allowance) <= MIN_ENTRANCE_AMOUNT ? (
                    <Button className={styles.approve} onClick={allow}></Button>
                ) : (
                    <Button className={styles.fund} onClick={fund}>
                        FUND
                    </Button>
                )}
                <Button className={styles.withdraw} onClick={withdraw}>
                    WITHDRAW
                </Button>
            </div>
        </div>
    )
}
