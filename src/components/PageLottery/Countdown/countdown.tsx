"use client"

import { useMemo } from "react"
import Timer from "react-countdown"
import styles from "./countdown.module.scss"

export default function Countdown(): React.ReactElement {
    const date = useMemo(() => {
        let now = new Date()
        let resetTime = new Date(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            20,
            0,
            0,
            0
        )
        if (resetTime < now) {
            return resetTime.setUTCDate(resetTime.getUTCDate() + 1)
        } else {
            return resetTime.getTime()
        }
    }, [])

    return (
        <div className={styles.root}>
            <div className={styles.counterText}>Payout in</div>
            <Timer className={styles.counterValue} date={date} />
        </div>
    )
}
