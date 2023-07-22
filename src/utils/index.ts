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

export function classUtil<T extends Record<string, boolean>>(
    conditionalObject: T,
    ...classArr: string[]
): string {
    const classList = Object.keys(conditionalObject).map((classItem) => {
        if (conditionalObject[classItem]) return classItem
    })

    return [...classArr, ...classList].join(' ')
}
