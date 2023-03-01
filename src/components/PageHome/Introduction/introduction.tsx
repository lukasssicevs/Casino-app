import styles from "./introduction.module.scss"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Document } from "@contentful/rich-text-types"

interface IProps {
    mainDescription: Document
}

export default function Introduction({
    mainDescription,
}: IProps): React.ReactElement {
    return (
        <div className={styles.root}>
            {documentToReactComponents(mainDescription)}
        </div>
    )
}
