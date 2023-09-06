import { useState } from 'react'

/* eslint-disable no-console */
export default function useCopyToClipboard(): [
    (text: string) => Promise<boolean>,
    string | null,
] {
    const [copiedText, setCopiedText] = useState<string | null>(null)

    const copyToClipBoard = async (text: string) => {
        if (!navigator?.clipboard) {
            console.warn('Clipboard not available')
            return false
        }

        try {
            await navigator.clipboard.writeText(text)
            setCopiedText(text)
            return true
        } catch (error) {
            console.error('Failed to copy!', error)
            setCopiedText(null)
            return false
        }
    }

    return [copyToClipBoard, copiedText]
}
