import { useCallback, useEffect, useState } from 'react'

type Sizes = {
    width: number
    height: number
}

export default function useElementDimension<T extends HTMLElement = HTMLDivElement>(): [
    elementCallback: (node: T | null) => void,
    dimensions: Sizes,
] {
    const [ref, setRef] = useState<T | null>(null)
    const [dimensions, setDimensions] = useState<Sizes>({
        width: 0,
        height: 0,
    })

    const szCallback = useCallback(() => {
        setDimensions({
            width: ref?.offsetWidth || 0,
            height: ref?.offsetHeight || 0,
        })
    }, [ref?.offsetHeight, ref?.offsetWidth])

    useEffect(() => {
        window.addEventListener('resize', szCallback)

        return () => {
            window.removeEventListener('resize', szCallback)
        }
    }, [szCallback])

    useEffect(() => {
        szCallback()
    }, [ref?.offsetHeight, ref?.offsetWidth])

    return [setRef, dimensions]
}
