interface IProps {
    condition?: boolean
    up?: string
    down?: string
}

const Arrow = ({ condition, up, down }: IProps) => (
    <svg
        className={condition ? up : down}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 192.71 106.36"
    >
        <g id="Layer_2">
            <g id="Layer_1-2">
                <path d="M96.36,82.21,17.07,2.93A10,10,0,0,0,2.93,17.07l86.36,86.36a10,10,0,0,0,14.14,0l86.35-86.36A10,10,0,0,0,175.64,2.93Z" />
            </g>
        </g>
    </svg>
)

export default Arrow
