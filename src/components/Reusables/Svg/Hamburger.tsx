interface IProps {
    color?: string
}

const Hamburger = ({ color }: IProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22.917" height="20">
            <g transform="translate(1.042 1.042)">
                <path
                    d="M 0 0 L 20.868 0 M 0 8.954 L 20.868 8.954 M 0 17.909 L 20.868 17.909"
                    fill="transparent"
                    strokeWidth="5"
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray=""
                ></path>
            </g>
        </svg>
    )
}
export default Hamburger
