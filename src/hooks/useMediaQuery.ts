import { useEffect, useState } from 'react'

export function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const queryList = window.matchMedia(query)

        function handleChange(e: MediaQueryListEvent) {
            setMatches(e.matches)
        }

        queryList.addEventListener('change', handleChange)

        return () => {
            queryList.removeEventListener('change', handleChange)
        }
    }, [matches])

    return matches
}
