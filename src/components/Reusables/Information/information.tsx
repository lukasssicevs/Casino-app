import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import styles from "./information.module.scss"
import clsx from "clsx"
import { Document } from "@contentful/rich-text-types"

interface IProps {
    className?: string
    description: Document
}

export default function Information({
    className,
    description,
}: IProps): React.ReactElement {
    return (
        <div className={clsx(styles.root, className)}>
            {documentToReactComponents(description)}
        </div>
    )
}
