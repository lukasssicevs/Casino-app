"use client"

import Link from "next/link"
import styles from "./navigation.module.scss"
import { PAGES } from "@/src/constants/pages"
import useMediaQueries from "@/src/hooks/useMediaQueries"
import useLoaded from "@/src/hooks/useLoaded"
import clsx from "clsx"

interface IProps {
    headerState: boolean
    setHeaderState: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Navigation({
    headerState,
    setHeaderState,
}: IProps): React.ReactElement {
    const loaded = useLoaded()
    const { isTablet } = useMediaQueries()
    return (
        <nav
            className={clsx(styles.root, headerState && loaded && styles.flex)}
        >
            <ul className={styles.navigation}>
                {PAGES.map((page) => (
                    <li
                        key={page.path}
                        className={styles.navItem}
                        onClick={() => isTablet && setHeaderState(false)}
                    >
                        <Link href={`/${page.path}`} className={styles.path}>
                            {page.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
