export function webpLoader(initialSource: string) {
    const split = initialSource.split('.')
    split.pop()
    split.push('webp')
    const str = split.join('.')
    return str
}
