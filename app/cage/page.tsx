import Cage from "@/src/components/PageCage/Cage"
import Assets from "@/src/components/PageCage/Assets"
import Heading from "@/src/components/Reusables/Heading"
import SectionTemplate from "@/src/components/Fallbacks/SectionTemplate"
import contentfulClient from "@/src/cms/client"
import { CMS } from "@/src/cms/entries"
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
            <Assets />
        </SectionTemplate>
    )
}
