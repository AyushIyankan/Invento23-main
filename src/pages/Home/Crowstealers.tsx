import { m, useInView, Variants } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import { MEventCard } from '../../components/Card'

export default function Crowstealers() {
    // todo: use actual svgs
    const emotes = ['🥁', '🎤', '🎙️', '🎵']
    const [emote, setEmote] = useState(0)

    const containerRef = useRef<HTMLDivElement>(null)

    const isInView = useInView(containerRef)

    useEffect(() => {
        if (!isInView) return

        // if (emote > emotes.length - 1) {
        //     const timeout = setTimeout(() => setEmote(0), 2000)
        //     return () => {
        //         clearInterval(timeout)
        //     }
        // }

        const timeout = setTimeout(() => {
            setEmote((s) => (s === emotes.length - 1 ? 0 : s + 1))
        }, 2000)

        return () => {
            clearInterval(timeout)
        }
    }, [emote, isInView])

    const container: Variants = {
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                when: 'beforeChildren',
                staggerChildren: 0.2,
                delay: 0.3,
                default: { ease: 'easeInOut' },
            },
        },
        hidden: {
            opacity: 0,
            x: -50,
            transition: {
                staggerChildren: 0.5,
                when: 'afterChildren',
                delayChildren: 0.5,
            },
        },
    }

    const item: Variants = {
        hidden: {
            opacity: 0,
            x: -50,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                ease: 'easeInOut',
            },
        },
    }

    return (
        <div className="wrap-crowdstealers" ref={containerRef}>
            {/* <h3 className="ff-gothic uppercase fw-400">
                Crowd stealers
                <motion.span
                    key={emotes[emote]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {emotes[emote]}
                </motion.span>
            </h3>
            <motion.div
                className="crowdstealers grid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={container}
            > */}
            {/* <MEventCard
                    date="TBA"
                    imgSrc="/static/landing/stock-ev.jpg"
                    title="the avial band"
                    color="hsl(56, 100%, 78%)"
                    variants={item}
                />
                <MEventCard
                    date="TBA"
                    imgSrc="/static/landing/stock-ev.jpg"
                    title="benny dayal"
                    color="hsl(313, 88%, 53%)"
                    variants={item}
                />
                <MEventCard
                    date="TBA"
                    imgSrc="/static/landing/stock-ev.jpg"
                    title="the nandi sisters"
                    color="hsl(186, 71%, 46%)"
                    variants={item}
                /> */}
            {/* </motion.div> */}
        </div>
    )
}
