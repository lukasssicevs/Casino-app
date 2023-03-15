import { AppContext } from "@/app/app"
import { useContext, useRef } from "react"
import Cross from "@/src/components/Reusables/Svg/Cross"
import Link from "next/link"
import styles from "./notification.module.scss"
import COLORS from "@/src/constants/colors"
import { truncate } from "@/src/utils/truncate"
import { useOnClickOutside } from "usehooks-ts"
import { ENotification } from "@/src/types/Notification"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export default function Notification(): React.ReactElement {
    const {
        state: {
            notification,
            explorer,
            lastTxHash,
            lotteryAllowance,
            CMSData: {
                notifications: {
                    waiting,
                    confirmed,
                    insufficientFunds,
                    inappropriateAmount,
                    exceedingWithdrawal,
                    insufficientAllowance,
                    noWallet,
                },
            },
        },
        setState,
    } = useContext(AppContext)
    const ref = useRef(null)

    useOnClickOutside(ref, () =>
        setState((prevState) => ({
            ...prevState,
            notification: ENotification.none,
        }))
    )
    console.log(<div></div>)

    const renderNotification = () => {
        switch (notification) {
            case ENotification.waiting:
                return waiting
            case ENotification.confirmed:
                return (
                    <>
                        {confirmed}
                        <Link
                            href={`${explorer}/tx/${lastTxHash}`}
                            target="_blank"
                        >
                            {truncate(lastTxHash)}
                        </Link>
                    </>
                )

            case ENotification.insufficientFunds:
                const parsedText = documentToReactComponents(insufficientFunds)
                return parsedText
            case ENotification.inappropriateAmount:
                return inappropriateAmount
            case ENotification.exceedingWithdrawal:
                return exceedingWithdrawal
            case ENotification.insufficientAllowance:
                return (
                    <>
                        {insufficientAllowance}
                        {lotteryAllowance}
                    </>
                )
            case ENotification.noWallet:
                return noWallet
            default:
                return ENotification.none
        }
    }

    return (
        <div
            className={notification ? styles.notification : styles.none}
            ref={ref}
        >
            <Cross
                className={styles.cross}
                color={COLORS.brown}
                onClick={() =>
                    setState((prevState) => ({
                        ...prevState,
                        notification: ENotification.none,
                    }))
                }
            />
            <h4>{renderNotification()}</h4>
        </div>
    )
}
