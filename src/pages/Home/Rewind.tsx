import {
    motion,
    useAnimationFrame,
    useMotionValue,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
    wrap,
} from 'framer-motion'
import { useRef } from 'react'

import { ReactComponent as Heart } from '../../assets/svg/heart.svg'
import { ReactComponent as InventoLogo } from '../../assets/svg/invento__logo-outline-small.svg'
import { ReactComponent as Spinner } from '../../assets/svg/spinner.svg'
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

    const shouldReduceMotion = useReducedMotion()

    const x = shouldReduceMotion
        ? 0
        : useTransform(baseX, (val) => `${wrap(-20, -45, val)}%`)

    const directionFactor = useRef<number>(1)

    useAnimationFrame((time, delta) => {
        // factor * baseVelocity * delta in time
        let moveBy = directionFactor.current * 5 * (delta / 1000)

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
    const constraintRef = useRef<HTMLDivElement>(null)
    return (
        <div className="wrap-rewind mh-full">
            <div className="wrap-sliders group-wrapper group--top" ref={constraintRef}>
                <RewindMarquee />
                <Heart className="heart-sm" />
                <motion.div
                    className="invento-sm"
                    // initial={{ opacity: 0 }}
                    whileHover={{ rotate: 360, cursor: 'grabbing' }}
                    transition={{ type: 'spring', duration: 5, bounce: 0.6 }}
                    drag
                    dragConstraints={constraintRef}
                >
                    <InventoLogo />
                </motion.div>
                <div className="wrap-slider slider--top">
                    <Slider images={SLIDERITEMS} />
                </div>
                <div className="wrap-sliders group-wrapper group--bottom">
                    <RewindMarquee />
                    <motion.div
                        className="spinner-sm"
                        whileHover={{ rotate: 360 }}
                        transition={{
                            type: 'spring',
                            stiffness: 56,
                            mass: 3,
                            damping: 4.1,
                        }}
                    >
                        <Spinner />
                    </motion.div>

                    <div className="wrap-slider slider--bottom">
                        <Slider images={SLIDERITEMS} />
                    </div>
                </div>
            </div>
        </div>
    )
}
