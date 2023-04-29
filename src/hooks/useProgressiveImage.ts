import { useEffect, useState } from 'react'

export function useProgressiveImage(src: string) {
    const [loadedSrc, setLoadedSrc] = useState<string | null>(null)

    useEffect(() => {
        const image = new Image()
        image.src = src
        image.onload = () => setLoadedSrc(src)
    }, [src])

    return loadedSrc
}
