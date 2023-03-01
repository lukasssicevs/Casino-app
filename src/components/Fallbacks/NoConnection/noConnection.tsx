import { AppContext } from "@/app/app"
import { useContext } from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Document } from "@contentful/rich-text-types"

interface IProps {
    connectionDescription: Document
}

export default function NoConnection({
    connectionDescription,
}: IProps): React.ReactElement {
    const { state, setState } = useContext(AppContext)
    return <div>{documentToReactComponents(connectionDescription)}</div>
}
