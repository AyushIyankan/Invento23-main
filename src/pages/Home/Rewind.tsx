import {
    motion,
    useAnimationFrame,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
    wrap,
} from 'framer-motion'
import { useRef } from 'react'

import Slider from '../../components/Slider'
import { SLIDERITEMS } from './data'

const RewindText = () => {
    return (
        <div className="rewind-text-container" style={{}}>
            <div className="lg flex">
                <h3 className="ff-gothic uppercase stroked-text fw-400">
                    rewinding invento 2020 ✦{' '}
                </h3>
            </div>
            <div className="sm flex">
                <h4 className="ff-gothic uppercase">Rewinding invento ✦</h4>
                <h4 aria-hidden className="ff-gothic uppercase fw-400">
                    Rewinding invento ✦
                </h4>
                <h4 aria-hidden className="ff-gothic uppercase fw-400">
                    Rewinding invento ✦
                </h4>
                {/* <h4 aria-hidden className="ff-gothic uppercase fw-400">
                Rewinding invento ✦
            </h4> */}
            </div>
        </div>
    )
}
const RewindMarquee = () => {
    // const { scrollYProgress } = useScroll()
    // const x = useTransform(scrollYProgress, [0, 1], [0, 600])

    const { scrollY } = useScroll()

    const baseX = useMotionValue(0)

    const scrollVelocity = useVelocity(scrollY)

    const smoothFactor = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 300,
    })

    const velocityFactor = useTransform(smoothFactor, [0, 1000], [0, 5], {
        clamp: false,
    })

    const x = useTransform(baseX, (val) => `${wrap(-20, -45, val)}%`)

    const directionFactor = useRef<number>(1)

    useAnimationFrame((time, delta) => {
        let moveBy = directionFactor.current * -5 * (delta / 1000)

        if (velocityFactor.get() > 0) {
            directionFactor.current = 1
        }

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1
        }

        if (velocityFactor.get() !== 0) {
            moveBy += directionFactor.current * moveBy * velocityFactor.get()
            baseX.set(baseX.get() + moveBy)
        }
    })

    return (
        // <motion.div className="marquee marquee--rewind" style={{ x }}>
        //     <div className="marquee__group">
        //         <RewindText />
        //     </div>
        //     <div aria-hidden className="marquee__group">
        //         <RewindText />
        //     </div>
        // </motion.div>

        <motion.div className="parallax">
            <motion.div className="scroller" style={{ x }}>
                <motion.span>
                    <RewindText />
                </motion.span>
                <motion.span aria-hidden>
                    <RewindText />
                </motion.span>
                <motion.span aria-hidden>
                    <RewindText />
                </motion.span>
            </motion.div>
        </motion.div>
    )
}

export function Rewind() {
    return (
        <div className="wrap-rewind mh-full">
            <div className="wrap-sliders">
                <RewindMarquee />
                <div className="wrap-slider">
                    <Slider images={SLIDERITEMS} />
                </div>
                <div className="wrap-sliders">
                    <RewindMarquee />
                    <div className="wrap-slider">
                        <Slider images={SLIDERITEMS} />
                    </div>
                </div>
            </div>
        </div>
    )
}
