"use client"

import styles from "./button.module.scss"
import clsx from "clsx"

export interface IButton {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => any
    color?: string
    variant?: string
    shape?: string
    size?: string
    fullWidth?: boolean
    className?: string
    isLoading?: boolean
    style?: React.CSSProperties
    active?: boolean
    href?: string
    form?: string
    children?: any
    isDisabled?: any
    type?: any
}

export default function Button({
    onClick,
    style,
    isDisabled,
    children,
    className,
    type,
}: IButton): React.ReactElement {
    return (
        <button
            className={clsx(styles.root, className)}
            onClick={onClick}
            style={style}
            disabled={isDisabled}
            type={type}
        >
            {children}
        </button>
    )
}
