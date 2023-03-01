export const truncate = (string: any) =>
    `${string?.slice(0, 5)}...${string?.slice(-4)}`
