import styles from "./heading.module.scss"

interface IProps {
    heading: string
}

export default function Heading({ heading }: IProps): React.ReactElement {
    return <h1 className={styles.root}>{heading}</h1>
}
