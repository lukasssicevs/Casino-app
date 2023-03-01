interface IProps {
    onClick?: (e: React.MouseEvent<SVGSVGElement>) => any
    className?: string
    color?: string
}

const Cross = ({ className, color, onClick }: IProps) => {
    return (
        <svg
            className={className}
            onClick={onClick}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            cursor="pointer"
        >
            <g transform="translate(1.042 1.042)">
                <path
                    d="M 0 0 L 17.909 17.909 M 17.909 0 L 0 17.909"
                    stroke={color}
                    strokeWidth="4"
                ></path>
            </g>
        </svg>
    )
}

export default Cross
