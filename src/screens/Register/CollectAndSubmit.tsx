// todo: remove this component and use Summary component instead maybe

import { AnimatePresence, m } from 'framer-motion'
import { useState } from 'react'
import { toast } from 'react-toastify'

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
    // onAdd?: () => void
    onRemove?: () => void
    onToggle?: () => void
    onGroupFormSubmit?: (data: Record<string, string>) => void
    calcPrice?: () => number
}

export default function CollectAndSubmit({
    item,
    toggled = false,
    onToggle,
    // removeItem,
    // addItem,
    // onAdd,
    onGroupFormSubmit,
    onFinalSubmit,
    onRemove,
    calcPrice,
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
            imgId={item.photo?.id || ''}
            actionType="togglable"
            // onGroupFormSubmit={(data) => {
            //     const gmembers = Object.entries(data).map(([, value]) => value)
            //     // addMembers(itemId, members)
            //     if (group) {
            //         setMembersForItem(event._id, gmembers)
            //     }
            // }}
            onGroupFormSubmit={onGroupFormSubmit}
            actions={[
                () => {
                    // onAdd && onAdd()
                    onToggle && onToggle()
                    toast.success(
                        'You have successfully added the event to your bucket.',
                        {
                            toastId: 'add-to-bucket',
                        },
                    )
                },
                () => {
                    //todo: add a confirmation dialog
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
            calcPriceMode={
                item?.name?.toLowerCase() === 'natya' ||
                item?.name?.toLowerCase() === 'taksati'
                    ? 'calcOnInput'
                    : 'normal'
            }
            calcPrice={calcPrice}
            minParticipants={
                item?.name?.toLowerCase() === 'natya'
                    ? 7
                    : item?.name?.toLowerCase() === 'taksati'
                    ? 8
                    : 0
            }
        />
    )

    const itemCardRegular = (
        <ItemCard
            title={item.name}
            itemId={item._id}
            date={item.date}
            fee={Number(item.regFee) || Number(item.regFeeTeam)}
            image={item.photo?.secure_url || '/static/natya.jpg'}
            imgId={item.photo?.id || ''}
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
                                // if (!group) onAdd && onAdd()
                                onFinalSubmit && onFinalSubmit()
                                // setTimeout(() => {
                                // }, 200)
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
