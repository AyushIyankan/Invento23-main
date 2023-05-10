import { PropsWithChildren } from 'react'

import { ReactComponent as AccordionDown } from '../../assets/svg/accordion-down.svg'
import { ReactComponent as AccordionUp } from '../../assets/svg/accordion-up.svg'
import { useToggle } from '../../hooks'

interface AccordionProps {
    title: string
}

export function Accordion({ title, children }: PropsWithChildren<AccordionProps>) {
    const [state, toggle] = useToggle(false)

    return (
        <div className="accordion">
            <div className="accordion-panel flex flex-col">
                <h2 id="panel-heading">
                    <button
                        className="accordion-trigger flex"
                        aria-controls="panel-content"
                        aria-expanded={state}
                        onClick={toggle}
                    >
                        <span
                            className={`${
                                state ? 'text-black' : 'text-grey'
                            } fw-400 ff-serif`}
                        >
                            {title}
                        </span>
                        {state ? (
                            <AccordionUp aria-hidden />
                        ) : (
                            <AccordionDown aria-hidden />
                        )}
                    </button>
                </h2>
                <AccordionItem visibility={state}>{children}</AccordionItem>
            </div>
        </div>
    )
}

interface IAccordionItem {
    visibility: boolean
}

export function AccordionItem({
    visibility,
    children,
}: PropsWithChildren<IAccordionItem>) {
    return (
        <div
            className="accordion-content"
            id="panel-content"
            aria-labelledby="panel-heading"
            role="region"
            data-visible={visibility}
        >
            {children}
        </div>
    )
}
