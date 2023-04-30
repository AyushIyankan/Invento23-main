import { useEffect, useState } from 'react'

export function useScrollPosition() {
    const [scrollPosition, setScrollPosition] = useState(0)

    useEffect(() => {
        function updateScrollPos() {
            const current = window.scrollY
            const scrollHeight = document.body.scrollHeight - window.innerHeight

            if (!scrollHeight) return
            const progress = +(current / scrollHeight).toFixed(2) * 100
            setScrollPosition(progress)
        }

        window.addEventListener('scroll', updateScrollPos)

        return () => {
            window.removeEventListener('scroll', updateScrollPos)
        }
    }, [])
    return scrollPosition
}
