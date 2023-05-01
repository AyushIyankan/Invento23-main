import { PropsWithChildren } from 'react'

interface ItemGroup {
    title: string
}

export function ItemGroup({ title, children }: PropsWithChildren<ItemGroup>) {
    return (
        <div className="centeredContainer wrap-group">
            <fieldset name={title} className="group-container">
                <legend className="group-title text-black fw-400 ff-serif">
                    {title}
                </legend>
                <div className="group">{children}</div>
            </fieldset>
        </div>
    )
}
