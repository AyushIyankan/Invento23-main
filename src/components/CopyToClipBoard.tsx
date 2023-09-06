import React, { PropsWithChildren, ReactNode, useEffect, useState } from 'react'

import CopyToClipboardButton from './CopyToClipboardButton'

export default function CopyToClipBoard({
    children,
}: PropsWithChildren & { children: ReactNode }) {
    const [copiedText, setCopiedText] = useState('')

    useEffect(() => {
        let text = ''

        React.Children.forEach(children, (child) => {
            if (typeof child === 'string') {
                text += child
            } else if (React.isValidElement(child)) {
                const nestedChildren = child.props.children
                if (typeof nestedChildren === 'string') {
                    text += nestedChildren
                }
            }
        })
        setCopiedText(text)
    }, [children])

    return (
        <div className="wrap-cp flex flex-center">
            {/* <span className="d-b">9048538487@jupiteraxis</span> */}
            {children}
            <CopyToClipboardButton textToCopy={copiedText} />
        </div>
    )
}
