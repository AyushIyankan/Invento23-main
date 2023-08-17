import { AnimatePresence, m } from 'framer-motion'
import { PropsWithChildren, useId } from 'react'

import { ReactComponent as AccordionUp } from '../../assets/svg/accordion-up.svg'
import { useToggle } from '../../hooks'

interface AccordionProps {
    title: string
}

export function Accordion({ title, children }: PropsWithChildren<AccordionProps>) {
    const [state, toggle] = useToggle(false)

    const accordionId = useId()

    return (
        <div className="accordion" data-state={state ? 'open' : 'close'}>
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
                        <AccordionUp aria-hidden className="accordion-state-icon" />
                    </button>
                </h2>
                <AnimatePresence initial={false}>
                    {state && (
                        <AccordionItem visibility={state} accordionId={accordionId}>
                            {children}
                        </AccordionItem>
                    )}
                </AnimatePresence>
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
        <m.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            // variants={{
            //     open: { opacity: 1, height: 'auto' },
            //     collapsed: { opacity: 0, height: 0 },
            // }}
            variants={{
                open: { opacity: 1, gridTemplateRows: '1fr' },
                collapsed: { opacity: 0, gridTemplateRows: '0fr' },
            }}
            // transition={{ duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] }}
            transition={{ duration: 0.6 }}
            className="accordion-content"
            id={`panel-content-${accordionId}`}
            aria-labelledby={`panel-heading-${accordionId}`}
            role="region"
            data-visible={visibility}
        >
            <m.div
                variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
                transition={{ duration: 0.5 }}
            >
                {children}
            </m.div>
        </m.div>
    )
}
