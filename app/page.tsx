import Heading from "@/src/components/Reusables/Heading"
import WatchToken from "@/src/components/PageHome/WatchToken"
import Introduction from "@/src/components/PageHome/Introduction"
import ContactForm from "@/src/components/PageHome/ContactForm"
import Cross from "@/src/components/Reusables/Svg/Cross"
import contentfulClient from "@/src/cms/client"
import COLORS from "@/src/constants/colors"
import { CMS } from "@/src/cms/entries"
import { Asset } from "contentful"
import { Document } from "@contentful/rich-text-types"

async function getHomeData() {
    const { fields } = await contentfulClient.getEntry(CMS.home)
    return fields
}

interface HomeCMSFields {
    heading: string
    mainDescription: Document
    tokenImage: Asset
    watchTokenInfo: Document
    contactFormMessage: Document
}

export default async function Home() {
    const {
        heading,
        mainDescription,
        tokenImage,
        watchTokenInfo,
        contactFormMessage,
    } = (await getHomeData()) as HomeCMSFields

    return (
        <main>
            <Heading heading={heading} />
            <WatchToken
                tokenImage={tokenImage}
                watchTokenInfo={watchTokenInfo}
            />
            <Introduction mainDescription={mainDescription} />
            <Cross color={COLORS.darkGray} style={{ cursor: "default" }} />
            <ContactForm contactFormMessage={contactFormMessage} />
        </main>
    )
}
