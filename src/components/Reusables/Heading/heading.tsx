import styles from "./heading.module.scss"

interface IProps {
    heading: string
}

export default function Heading({ heading }: IProps): React.ReactElement {
    return <div className={styles.root}>{heading}</div>
}
