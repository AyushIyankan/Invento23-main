// todo: remove this component and use Summary component instead maybe

import { AnimatePresence, m } from 'framer-motion'
import { useState } from 'react'

import { EventType } from '../../api/schema'
import Button from '../../components/Button'
import { ItemCard } from '../../components/Card'
import { isEmpty } from '../../utils/index'

type CollectAndSubmitProps = {
    item: EventType | Record<string, never>
    toggled?: boolean
    // removeItem: (id: string) => void
    // addItem: (item: Item) => void
    onFinalSubmit?: () => void
    isGroup?: boolean
    onRemove?: () => void
    onToggle?: () => void
}

export default function CollectAndSubmit({
    item,
    toggled = false,
    onToggle,
    // removeItem,
    // addItem,
    onFinalSubmit,
    onRemove,
    isGroup: group = false,
}: CollectAndSubmitProps) {
    const [, setSelectedindex] = useState(0)

    const isEmptyItem = isEmpty(item)

    const itemCardGroup = (
        <ItemCard
            title={item.name}
            itemId={item._id}
            date={item.date}
            fee={Number(item.regFee) || Number(item.regFeeTeam)}
            image={item.photo?.secure_url || '/static/natya.jpg'}
            actionType="togglable"
            actions={[
                () => {
                    onToggle && onToggle()
                },
                () => {
                    onRemove && onRemove()
                    onToggle && onToggle()
                },
            ]}
            selected={toggled}
            onClick={() => {
                setSelectedindex(Number(item._id))
            }}
            mode="collect"
            group={group}
            maxParticipants={group ? item.maxParticipants || 0 : 0}
        />
    )

    const itemCardRegular = (
        <ItemCard
            title={item.name}
            itemId={item._id}
            date={item.date}
            fee={Number(item.regFee) || Number(item.regFeeTeam)}
            image={item.photo?.secure_url || '/static/natya.jpg'}
            actionType="nonTogglable"
            action={() => onRemove && onRemove()}
            selected={true}
            onClick={() => {
                setSelectedindex(Number(item._id))
            }}
            mode="collect"
            group={group}
            maxParticipants={group ? item.maxParticipants || 0 : 0}
        />
    )

    return (
        <>
            <h3 className="text-black ff-serif fw-400">Booking Summary</h3>
            <div className="form__eventsWrap form__summaryWrap grid">
                {!isEmptyItem ? (
                    <div className="grid">
                        <AnimatePresence mode="popLayout">
                            {group ? itemCardGroup : itemCardRegular}
                        </AnimatePresence>
                        <Button
                            type="submit"
                            className="btn btn--link btn--save text-white ff-serif btn--checkout"
                            onClick={() => {
                                onFinalSubmit && onFinalSubmit()
                            }}
                        >
                            Proceed to the Final Step
                        </Button>
                    </div>
                ) : (
                    <m.p
                        className="bucket-no-item-fallback t-center ff-serif text-grey capitalize"
                        exit={{ opacity: 0 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {' '}
                        select some events{' '}
                    </m.p>
                )}
            </div>
        </>
    )
}
