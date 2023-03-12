interface IProps {
    condition?: boolean
    up?: string
    down?: string
}

const Arrow = ({ condition, up, down }: IProps) => (
    <svg
        className={condition ? down : up}
        viewBox="0 0 121 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <line
            x1="2.66359"
            y1="55.394"
            x2="60.6636"
            y2="3.39401"
            stroke="white"
            stroke-width="7"
        />
        <line
            y1="-3.5"
            x2="77.8974"
            y2="-3.5"
            transform="matrix(0.744569 0.667545 0.667545 -0.744569 63 6)"
            stroke="white"
            stroke-width="7"
        />
    </svg>
)

export default Arrow
