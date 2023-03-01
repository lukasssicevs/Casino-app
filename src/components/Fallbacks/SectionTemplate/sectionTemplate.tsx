"use client"

import { useContext } from "react"
import { AppContext } from "@/app/app"
import NoProvider from "../NoProvider"
import NoConnection from "../NoConnection"
import InfoSvg from "@/src/components/Reusables/Svg/Info"
import Information from "../../Reusables/Information"
import styles from "./sectionTemplate.module.scss"
import { Document } from "@contentful/rich-text-types"

interface IProps {
    children: React.ReactNode
    description: Document
}

export default function SectionTemplate({
    children,
    description,
}: IProps): React.ReactElement {
    const {
        state: { connection, provider, CMSData },
    } = useContext(AppContext)

    const renderSection = () => {
        switch (true) {
            case !provider:
                return (
                    <div className={styles.description}>
                        <NoProvider
                            installDescription={CMSData?.installDescription}
                        />
                    </div>
                )
            case !connection:
                return (
                    <div className={styles.description}>
                        <NoConnection
                            connectionDescription={
                                CMSData?.connectionDescription
                            }
                        />
                    </div>
                )
            default:
                return children
        }
    }

    return (
        <main>
            {renderSection()}
            <div className={styles.pageInfoWrapper}>
                <InfoSvg className={styles.infoIcon} />
                <Information
                    className={styles.info}
                    description={description}
                />
            </div>
        </main>
    )
}
