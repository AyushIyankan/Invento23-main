import type { LegacyRef, MutableRefObject, RefCallback } from 'react'

export function webpLoader(initialSource: string) {
    const split = initialSource.split('.')
    split.pop()
    split.push('webp')
    const str = split.join('.')
    return str
}

export function mergeRefs<T = any>(
    ...refs: MutableRefObject<T>[] | LegacyRef<T>[]
): RefCallback<T> {
    return (val) => {
        refs.forEach((ref) => {
            if (typeof ref === 'function') {
                ref(val)
            }
            if (ref != null) (ref as MutableRefObject<T | null>).current = val
        })
    }
}
