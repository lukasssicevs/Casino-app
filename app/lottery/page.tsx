import Heading from "@/src/components/Reusables/Heading"
import Countdown from "@/src/components/PageLottery/Countdown"
import Lottery from "@/src/components/PageLottery/Lottery"
import LotteryInfo from "@/src/components/PageLottery/LotteryInfo"
import SectionTemplate from "@/src/components/Fallbacks/SectionTemplate"
import contentfulClient from "@/src/cms/client"
import { CMS } from "@/src/cms/entries"
import { Document } from "@contentful/rich-text-types"

async function getLotteryData() {
    const { fields } = await contentfulClient.getEntry(CMS.lottery)
    return fields
}

interface LotteryCMSFields {
    heading: string
    description: Document
}

export default async function LotteryPage() {
    const { heading, description } =
        (await getLotteryData()) as LotteryCMSFields

    return (
        <SectionTemplate description={description}>
            <Heading heading={heading} />
            <Countdown />
            <Lottery />
            <LotteryInfo />
        </SectionTemplate>
    )
}
