import { HTMLMotionProps, motion, Variants } from 'framer-motion'
import { useState } from 'react'

import { ToggleButton } from '../Button'
import { ImgWithFallback } from '../ImgWithFallback'
interface ICardProps extends HTMLMotionProps<'div'> {
    bgUrl: string
    title: string
}

const parentVariants: Variants = {
    rest: {
        transition: {
            duration: 2,
            type: 'tween',
            ease: 'easeIn',
        },
    },
    hover: {
        transition: {
            duration: 0.4,
            type: 'tween',
            ease: 'easeOut',
        },
    },
}

const textVariants: Variants = {
    rest: {
        opacity: 0,
        y: '-50%',
    },
    hover: {
        opacity: 1,
        y: '0%',
    },
}

export default function Card({ bgUrl, title, ...rest }: ICardProps) {
    return (
        <motion.div
            {...rest}
            className="event-card"
            whileHover="hover"
            initial="rest"
            animate="rest"
        >
            <motion.div className="event-card-img" variants={parentVariants}>
                <ImgWithFallback src={bgUrl} imgDescription="card-placeholder" />
            </motion.div>
            <motion.div className="event-card-title" variants={textVariants}>
                <p className="ff-days-one fw-300 text-white uppercase">{title}</p>
            </motion.div>
        </motion.div>
    )
}

type ItemCardProps = {
    image: string
    title: string
    date: string
    fee: number
    selected: boolean
    onClick: () => void
} & (
    | {
          actionType: 'togglable'
          actions: [() => void, () => void]
      }
    | {
          actionType: 'nonTogglable'
          action: () => void
      }
)

export function ItemCard({ image, title, date, fee, ...props }: ItemCardProps) {
    const [loading, setLoading] = useState(false)
    //TODO: Restructure this
    return (
        <div className="itemCard ">
            <div className="itemCard_details grid">
                <div className="wrap-img flex">
                    <img src={`${image}`} alt={`${title}`} />
                </div>
                <h3 className="text-black underline ff-serif fw-400">{title}</h3>

                <p className="ff-serif text-black fw-400 detail-fee">
                    Registration Fee: {fee}
                </p>
                <p className="ff-serif text-black fw-400 detail-date"> Date: {date}</p>

                <ToggleButton
                    selected={props.selected}
                    toggle={props.onClick}
                    // actionTrue={}
                    actionTrue={
                        props.actionType === 'togglable' ? props.actions[0] : props.action
                    }
                    actionFalse={
                        props.actionType === 'togglable' ? props.actions[1] : props.action
                    }
                    isLoading={loading}
                />
            </div>
        </div>
    )
}
