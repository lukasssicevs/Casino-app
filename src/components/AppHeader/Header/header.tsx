"use client"

import { useEffect, useState, useRef, useContext } from "react"
import { AppContext } from "@/app/app"
import Navigation from "../Navigation"
import MenuButton from "../MenuButton"
import Networks from "../Networks"
import Connect from "../Connect"
import Image from "next/image"
import Link from "next/link"
import styles from "./header.module.scss"
import useMediaQueries from "@/src/hooks/useMediaQueries"
import { useOnClickOutside } from "usehooks-ts"

export default function Header(): React.ReactElement {
    const {
        state: { CMSData },
        setState,
    } = useContext(AppContext)
    const { isTablet } = useMediaQueries()
    const [headerState, setHeaderState] = useState(!isTablet)
    const ref = useRef(null)

    useOnClickOutside(ref, () => isTablet && setHeaderState(false))

    useEffect(() => {
        setHeaderState(!isTablet)
    }, [isTablet])

    return (
        <header className={styles.root} ref={ref}>
            <Link href="/">
                <Image
                    src={`https:${CMSData.logo.image.fields.file.url}`}
                    alt="logo"
                    width={150}
                    height={100}
                />
            </Link>
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
