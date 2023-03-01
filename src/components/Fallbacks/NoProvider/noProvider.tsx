import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Document } from "@contentful/rich-text-types"

interface IProps {
    installDescription: Document
}

export default function NoProvider({
    installDescription,
}: IProps): React.ReactElement {
    return <div>{documentToReactComponents(installDescription)}</div>
}
