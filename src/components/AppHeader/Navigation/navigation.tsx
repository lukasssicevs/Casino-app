"use client"

import Link from "next/link"
import styles from "./navigation.module.scss"
import { PAGES } from "@/src/constants/pages"
import useMediaQueries from "@/src/hooks/useMediaQueries"

interface IProps {
    headerState: boolean
    setHeaderState: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Navigation({
    headerState,
    setHeaderState,
}: IProps): React.ReactElement {
    const { isTablet } = useMediaQueries()
    return (
        <nav
            className={styles.root}
            style={{ display: headerState ? "flex" : "none" }}
        >
            <ul className={styles.navigation}>
                {PAGES.map((page) => (
                    <li
                        key={page.path}
                        className={styles.navItem}
                        onClick={() => isTablet && setHeaderState(false)}
                    >
                        <Link href={`/${page.path}`} className={styles.paths}>
                            {page.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
