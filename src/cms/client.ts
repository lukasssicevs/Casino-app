import { createClient } from "contentful"

const contentfulClient = createClient({
    space: process.env.CONTENTFUL_SPACE || "",
    environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
    accessToken: process.env.CONTENTFUL_TOKEN || "",
})

export default contentfulClient
