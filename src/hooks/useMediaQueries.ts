import { useMediaQuery } from "@react-hook/media-query"

export default function useMediaQueries(): {
    isMobile: boolean
    isTablet: boolean
    isDesktop: boolean
} {
    const isMobile = useMediaQuery(`(max-width: 600px)`)
    const isTablet = useMediaQuery(`(max-width: 960px)`)
    const isDesktop = useMediaQuery(`(min-width: 1280px)`)

    return { isMobile, isTablet, isDesktop }
}
