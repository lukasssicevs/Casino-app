import Heading from "@/src/components/Reusables/Heading"
import SectionTemplate from "@/src/components/Fallbacks/SectionTemplate"
import contentfulClient from "@/src/cms/client"
import { CMS } from "@/src/cms/entries"
import { Document } from "@contentful/rich-text-types"

async function getRouletteData() {
    const { fields } = await contentfulClient.getEntry(CMS.roulette)
    return fields
}

interface RouletteCMSFields {
    heading: string
    description: Document
}

export default async function RoulettePage() {
    const { heading, description } =
        (await getRouletteData()) as RouletteCMSFields

    return (
        <SectionTemplate description={description}>
            <Heading heading={heading} />
            <h2 style={{ marginBlock: "100px" }}>Coming soon...</h2>
        </SectionTemplate>
    )
}
