import { PropsWithChildren, useId } from 'react'

import { ReactComponent as AccordionDown } from '../../assets/svg/accordion-down.svg'
import { ReactComponent as AccordionUp } from '../../assets/svg/accordion-up.svg'
import { useToggle } from '../../hooks'

interface AccordionProps {
    title: string
}

export function Accordion({ title, children }: PropsWithChildren<AccordionProps>) {
    const [state, toggle] = useToggle(false)

    const accordionId = useId()

    return (
        <div className="accordion">
            <div className="accordion-panel">
                <h2 id={`panel-heading-${accordionId}`}>
                    <button
                        className="accordion-trigger flex"
                        aria-controls={`panel-content-${accordionId}`}
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
                <AccordionItem visibility={state} accordionId={accordionId}>
                    {children}
                </AccordionItem>
            </div>
        </div>
    )
}

interface IAccordionItem {
    visibility: boolean
    accordionId: string
}

export function AccordionItem({
    visibility,
    accordionId,
    children,
}: PropsWithChildren<IAccordionItem>) {
    return (
        <div
            className="accordion-content"
            id={`panel-content-${accordionId}`}
            aria-labelledby={`panel-heading-${accordionId}`}
            role="region"
            data-visible={visibility}
        >
            {children}
        </div>
    )
}
