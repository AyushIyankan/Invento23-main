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

    const item: Variants = {
        hidden: {
            opacity: 0,
            x: -50,
        },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: {
                ease: 'easeInOut',
                duration: 0.5,
                staggerChildren: 0.2,
                delay: i * 0.2,
            },
        }),
    }

    return (
        <div className="wrap-crowdstealers" ref={containerRef}>
            <h3 className="ff-gothic uppercase fw-400 side-padding">
                Crowd stealers
                <m.span
                    key={emotes[emote]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {emotes[emote]}
                </m.span>
            </h3>
            <div className="crowdstealers flex">
                <MEventCard
                    date="sept 15"
                    imgSrc="/static/landing/six-eight-lg.jpg"
                    title="six eight"
                    borderColor="hsl(313, 88%, 53%)"
                    variants={item}
                    initial="hidden"
                    whileInView={'visible'}
                    viewport={{ once: true }}
                    custom={0}
                />
                <MEventCard
                    date="sept 16"
                    imgSrc="/static/landing/avial_band.jpg"
                    title="the avial band"
                    borderColor="hsl(56, 100%, 78%)"
                    variants={item}
                    initial="hidden"
                    whileInView={'visible'}
                    textColor="#000"
                    viewport={{ once: true }}
                    custom={1}
                />
            </div>
        </div>
        // <div></div>
    )
}
