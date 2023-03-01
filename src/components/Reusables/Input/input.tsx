import Cross from "@/src/components/Reusables/Svg/Cross"
import styles from "./input.module.scss"
import clsx from "clsx"
import COLORS from "@/src/constants/colors"

export interface IInput {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any
    onClear?: (e: React.MouseEvent<HTMLDivElement>) => any
    color?: string
    variant?: string
    shape?: string
    size?: string
    fullWidth?: boolean
    className?: string | string[]
    isLoading?: boolean
    style?: React.CSSProperties
    active?: boolean
    href?: string
    form?: string
    children?: any
    placeholder?: string
    type?: string
    value?: string
    id?: string
    name?: string
}

export default function Input({
    onClear,
    type,
    placeholder,
    onChange,
    value,
    className,
    id,
    name,
}: IInput): React.ReactElement {
    return (
        <div className={clsx(styles.root, className)}>
            <div className={styles.clearInput} onClick={onClear}>
                <Cross color={COLORS.brown} />
            </div>
            <input
                className={styles.input}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                id={id}
                name={name}
            ></input>
        </div>
    )
}
