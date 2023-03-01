"use client"

import { useEffect, useState, useRef } from "react"
import Navigation from "../Navigation"
import MenuButton from "../MenuButton"
import Networks from "../Networks"
import Connect from "../Connect"
import Image from "next/image"
import styles from "./header.module.scss"
import useMediaQueries from "@/src/hooks/useMediaQueries"
import { useOnClickOutside } from "usehooks-ts"

export default function Header(): React.ReactElement {
    const { isTablet } = useMediaQueries()
    const [headerState, setHeaderState] = useState(!isTablet)
    const ref = useRef(null)

    useOnClickOutside(ref, () => isTablet && setHeaderState(false))

    useEffect(() => {
        setHeaderState(!isTablet)
    }, [isTablet])

    return (
        <header className={styles.root} ref={ref}>
            <Image
                src="https://icon-library.com/images/casino-icon/casino-icon-15.jpg"
                alt="logo"
                width={70}
                height={70}
            />
            <Navigation
                headerState={headerState}
                setHeaderState={setHeaderState}
            />
            <Connect headerState={headerState} />
            <Networks headerState={headerState} />
            {isTablet && (
                <MenuButton
                    headerState={headerState}
                    setHeaderState={setHeaderState}
                />
            )}
        </header>
    )
}
