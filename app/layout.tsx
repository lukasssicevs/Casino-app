import "../src/styles/globals.scss"
import Header from "@/src/components/AppHeader/Header"
import AppContextProvider from "./app"
import contentfulClient from "@/src/cms/client"
import { CMS } from "@/src/cms/entries"
import { Document } from "@contentful/rich-text-types"
import { INotifications } from "@/src/types/CMSData"
import { Suspense } from "react"

async function getCMSData() {
    const {
        fields: { installDescription },
    }: { fields: { installDescription: Document } } =
        await contentfulClient.getEntry(CMS.installDesc)
    const {
        fields: { connectionDescription },
    }: { fields: { connectionDescription: Document } } =
        await contentfulClient.getEntry(CMS.connectionDesc)
    const { fields: notifications }: { fields: INotifications } =
        await contentfulClient.getEntry(CMS.notifications)

    return {
        installDescription,
        connectionDescription,
        notifications,
    }
}

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    const CMSData = await getCMSData()

    return (
        <html lang="en">
            <head />
            <body>
                <AppContextProvider CMSData={CMSData}>
                    <Header />
                    {children}
                </AppContextProvider>
            </body>
        </html>
    )
}
