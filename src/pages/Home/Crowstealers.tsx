import { motion, Variants } from 'framer-motion'

import { MEventCard } from '../../components/Card'

export default function Crowstealers() {
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
        <div className="wrap-crowdstealers">
            <h3 className="ff-gothic uppercase fw-400">Crowd stealers 🎤</h3>
            <motion.div
                className="crowdstealers grid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={container}
                // viewport={{ once: true }}
                // initial={{ opacity: 0, x: -50 }}
                // whileInView={{ opacity: 1, x: 0 }}
                // transition={{ staggerChildren: 0.8, delayChildren: 10 }}
            >
                <MEventCard
                    date="June 24"
                    imgSrc="/static/landing/stock-ev.jpg"
                    title="the avial band"
                    color="hsl(56, 100%, 78%)"
                    variants={item}
                />
                <MEventCard
                    date="June 24"
                    imgSrc="/static/landing/stock-ev.jpg"
                    title="benny dayal"
                    color="hsl(313, 88%, 53%)"
                    variants={item}
                />
                <MEventCard
                    date="June 24"
                    imgSrc="/static/landing/stock-ev.jpg"
                    title="the nandi sisters"
                    color="hsl(186, 71%, 46%)"
                    variants={item}
                />
            </motion.div>
        </div>
    )
}
