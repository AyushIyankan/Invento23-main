import { HTMLMotionProps, motion, Variants } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useGroupStore } from '../../store'
// import { useMediaQuery } from '../../hooks'
import { transformDate } from '../../utils'
import { ToggleButton } from '../Button'
import { FormInput } from '../Form'
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

const touchTextVariants: Variants = {
    rest: {
        opacity: 1,
        y: '0%',
    },
}

export default function Card({ bgUrl, title, ...rest }: ICardProps) {
    // Fix this not working
    // const isMobile = useMediaQuery('(min-width: 48em)')
    //debugger
    return (
        <motion.div
            {...rest}
            className="event-card"
            whileHover="hover"
            initial="rest"
            animate="rest"
        >
            <motion.div
                className="event-card-img"
                // variants={!isMobile ? parentVariants : undefined}
            >
                <ImgWithFallback src={bgUrl} imgDescription="card-placeholder" />
            </motion.div>
            <motion.div
                className="event-card-title"
                // variants={!isMobile ? textVariants : touchTextVariants}
            >
                <p className="ff-days-one fw-300 text-white uppercase">{title}</p>
            </motion.div>
        </motion.div>
    )
}

type ItemCardPropsBase = {
    image: string
    title: string
    date: string
    fee: number
    selected: boolean
    itemId: string
    onClick: () => void
}

type TogglableAction = {
    actionType: 'togglable'
    actions: [() => void, () => void]
}

type NonTogglableAction = {
    actionType: 'nonTogglable'
    action: () => void
}

type GroupItem = {
    group: true
    maxParticipants: number
}

type IndividualItem = {
    group: false
}

type ItemCardProps = ItemCardPropsBase &
    (TogglableAction | NonTogglableAction) &
    (GroupItem | IndividualItem)

export function ItemCard({ itemId, image, title, date, fee, ...props }: ItemCardProps) {
    const { addMembers, groups } = useGroupStore((state) => state)
    const [loading] = useState(false)

    const [defaultValue] = useState(() => {
        const defaultValues = groups?.[itemId]?.reduce((acc, val) => {
            const key = Object.keys(val)[0]
            return {
                ...acc,
                [key]: val[key],
            }
        }, {})
        return defaultValues || {}
    })

    const { register, handleSubmit } = useForm<{
        [key: string]: string
    }>({
        defaultValues: defaultValue,
    })

    const isGroup = props.group && props.maxParticipants > 0

    return (
        <div className="itemCard ">
            <div className="itemCard_details grid">
                <div className="wrap-img flex">
                    <img src={`${image}`} alt={`${title}`} />
                </div>
                <h3 className="text-black underline ff-serif fw-400">{title}</h3>

                <p className="ff-serif text-black fw-400 detail-fee">
                    {isGroup ? 'Team Registration Fee' : 'Registration Fee'}: {fee}
                </p>
                <p className="ff-serif text-black fw-400 detail-date">
                    {' '}
                    Date: {transformDate(date)}
                </p>

                <ToggleButton
                    selected={props.selected}
                    toggle={props.onClick}
                    actionTrue={
                        props.actionType === 'togglable' ? props.actions[0] : props.action
                    }
                    actionFalse={
                        props.actionType === 'togglable' ? props.actions[1] : props.action
                    }
                    isLoading={loading}
                />
            </div>
            {props.group && props.maxParticipants > 0 && (
                <form
                    className="itemCard_group grid mt-sm text-black ff-serif fw-400"
                    onSubmit={handleSubmit((data) => {
                        const members = Object.entries(data).map(([key, value]) => ({
                            [key]: value,
                        }))
                        addMembers(itemId, members)
                    })}
                >
                    {Array.from({ length: props.maxParticipants }).map((_, i) => (
                        <FormInput
                            key={itemId + i}
                            kind="input"
                            inputType="text"
                            label={`Enter Team Member ${i + 1}`}
                            register={register}
                            forEl={`member-${i + 1}`}
                            placeholder='e.g. "John Doe"'
                        />
                    ))}
                    <button type="submit" className="btn btn--toggle">
                        Save Changes
                    </button>
                </form>
            )}
        </div>
    )
}
