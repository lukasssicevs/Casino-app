"use client"

import Image from "next/image"
import styles from "./watchToken.module.scss"
import { AppContext } from "@/app/app"
import { useContext } from "react"
import { CSN_ADDRESS } from "@/src/constants/contracts"
import { CSN } from "@/src/constants/tokens"
import { ENotification } from "@/src/types/Notification"
import { TSupportedNetwork } from "@/src/types/Networks"
import { Document } from "@contentful/rich-text-types"
import { Asset } from "contentful"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

interface IProps {
    tokenImage: Asset
    watchTokenInfo: Document
}

export default function AddToken({
    tokenImage,
    watchTokenInfo,
}: IProps): React.ReactElement {
    const {
        state: { chainId },
        setState,
    } = useContext(AppContext)

    const watchCSN = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({
                    method: "wallet_watchAsset",
                    params: {
                        type: CSN.type,
                        options: {
                            address: CSN_ADDRESS[chainId as TSupportedNetwork],
                            symbol: CSN.symbol,
                            decimals: CSN.decimals,
                            image: `https:${tokenImage.fields.file.url}`,
                        },
                    },
                })
            } catch (error) {
                console.log(error)
            }
        } else {
            setState((prevState) => ({
                ...prevState,
                notification: ENotification.noWallet,
            }))
        }
    }

    return (
        <div className={styles.root}>
            <Image
                className={styles.img}
                src={`https:${tokenImage.fields.file.url}`}
                width={100}
                height={100}
                alt="Add CSN to wallet"
                onClick={watchCSN}
            />
            <div className={styles.info}>
                {documentToReactComponents(watchTokenInfo)}
            </div>
        </div>
    )
}
