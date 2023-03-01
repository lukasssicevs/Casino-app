import Cage from "@/src/components/PageCage/Cage"
import Heading from "@/src/components/Reusables/Heading"
import Balance from "@/src/components/PageCage/Balance"
import SectionTemplate from "@/src/components/Fallbacks/SectionTemplate"
import contentfulClient from "@/src/cms/client"
import { CMS } from "@/src/cms/entries"
import { CSN, ETH } from "@/src/constants/tokens"
import { Document } from "@contentful/rich-text-types"

async function getCageData() {
    const { fields } = await contentfulClient.getEntry(CMS.cage)
    return fields
}

interface CageCMSFields {
    heading: string
    description: Document
}

export default async function CagePage() {
    const { heading, description } = (await getCageData()) as CageCMSFields

    return (
        <SectionTemplate description={description}>
            <Heading heading={heading} />
            <Cage />
            <h2>Your balances:</h2>
            <Balance token={ETH.symbol} />
            <Balance token={CSN.symbol} />
        </SectionTemplate>
    )
}
