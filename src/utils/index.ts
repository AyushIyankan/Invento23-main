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

export const transformDate = (date: string) => {
    const v = new Date(date)
    const result = v.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })

    return result
}

export const transformTime = (time: string) => {
    const v = new Date(time)
    const result = v.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
    })

    return result
}
