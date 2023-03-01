"use client"

import { useEffect, useState, useContext } from "react"
import { AppContext } from "@/app/app"
import styles from "./lotteryInfo.module.scss"
import { INIT_STATS } from "./constants"
import { format } from "@/src/utils/calculate"
import { truncate } from "@/src/utils/truncate"

export default function LotteryInfo(): React.ReactElement {
    const {
        state: { signerAddress, lotteryContract, notification },
    } = useContext(AppContext)

    const [currentState, setCurrentState] = useState<{
        [key: string]: string
    }>({
        Pooled: INIT_STATS,
        Stake: INIT_STATS,
    })

    const [previousState, setPreviousState] = useState<{
        [key: string]: string
    }>({
        Prize: INIT_STATS,
        Winner: INIT_STATS,
        Participants: INIT_STATS,
    })

    useEffect(() => {
        lotteryContract &&
            lotteryContract.on("PreviousPayout", () => {
                getTotalPooled()
                getStake()
                getWinner()
                getPrize()
                getParticipants()
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lotteryContract])

    useEffect(() => {
        if (signerAddress && lotteryContract) {
            getTotalPooled()
            getStake()
            getWinner()
            getPrize()
            getParticipants()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signerAddress, lotteryContract, notification])

    const getWinner = async () => {
        const events = await lotteryContract?.queryFilter("PreviousWinner")
        const winner = events?.pop()?.args?.[0]
        const concatWinner = truncate(winner)
        setPreviousState((prevState) => ({
            ...prevState,
            Winner: concatWinner,
        }))
    }

    const getPrize = async () => {
        const events = await lotteryContract?.queryFilter("PreviousPayout")
        const unformattedPayout = events?.pop()?.args?.toString()
        const previousPayout =
            unformattedPayout && format.CSN(unformattedPayout)
        previousPayout &&
            setPreviousState((prevState) => ({
                ...prevState,
                Prize: previousPayout,
            }))
    }

    const getParticipants = async () => {
        const events = await lotteryContract?.queryFilter(
            "PreviousParticipation"
        )
        const participants = events?.pop()?.args?.toString()
        participants &&
            setPreviousState((prevState) => ({
                ...prevState,
                Participants: participants,
            }))
    }

    const getTotalPooled = async () => {
        const totalPooled = await lotteryContract?.totalFunds()
        const formattedPool = format.CSN(totalPooled.toString())
        setCurrentState((prevState) => ({
            ...prevState,
            Pooled: formattedPool,
        }))
    }

    const getStake = async () => {
        const stake = await lotteryContract?.fundsOf(signerAddress)
        const formattedStake = format.CSN(stake.toString())
        setCurrentState((prevState) => ({
            ...prevState,
            Stake: formattedStake,
        }))
    }

    return (
        <div className={styles.root}>
            {Object.keys(currentState).map((key) => (
                <div className={styles.information} key={key}>
                    <div className={styles.left}>{key}</div>
                    <div className={styles.right}>{currentState[key]}</div>
                </div>
            ))}
            <div className={styles.previous}>
                <h2>Previous round results:</h2>
                {Object.keys(previousState).map((key) => (
                    <div className={styles.information} key={key}>
                        <div className={styles.left}>{key}</div>
                        <div className={styles.right}>{previousState[key]}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
