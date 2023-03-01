import Hamburger from "@/src/components/Reusables/Svg/Hamburger"
import Cross from "@/src/components/Reusables/Svg/Cross"
import styles from "./menuButton.module.scss"
import COLORS from "@/src/constants/colors"

interface IProps {
    headerState: boolean
    setHeaderState: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MenuButton({
    headerState,
    setHeaderState,
}: IProps): React.ReactElement {
    return (
        <div
            className={styles.root}
            onClick={() => setHeaderState(!headerState)}
        >
            {headerState ? (
                <Cross color={COLORS.brown} />
            ) : (
                <Hamburger color={COLORS.brown} />
            )}
        </div>
    )
}
