import Balance from "@/src/components/PageCage/Balance"
import { CSN, ETH } from "@/src/constants/tokens"
import styles from "./assets.module.scss"

export default function Assets(): React.ReactElement {
    return (
        <div className={styles.root}>
            <h3>Your balances:</h3>
            <Balance token={ETH.symbol} />
            <Balance token={CSN.symbol} />
        </div>
    )
}
