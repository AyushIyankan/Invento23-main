import type { LegacyRef, MutableRefObject, RefCallback } from 'react'

export async function webpLoader(initialSource: string) {
    if (initialSource.startsWith('/')) {
        const split = initialSource.split('.')
        split.pop()
        split.push('webp')
        const str = split.join('.')
        return str
    }

    const res = await fetch(initialSource)
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    return url
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

export async function dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {
    const res = await fetch(dataUrl)
    const blob = await res.blob()
    return new File([blob], fileName, {
        // type: 'image/png'
        // type: blob.type
        type: dataUrl.match(/^data:(.+);base64/)?.[1],
    })
}

export function isEmpty(obj: { [key: string]: any }) {
    if (Object.keys(obj).length === 0 && obj.constructor === Object) {
        return true
    }
    return false
}
