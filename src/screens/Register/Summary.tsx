import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import Button from '../../components/Button'
import { ItemCard } from '../../components/Card'
import { useStore } from '../../store'
export function Summary() {
    const { items: bucket, removeItem } = useStore((state) => state)
    const [selectedindex, setSelectedindex] = useState(0)

    const bucketItems = bucket.map((item) => (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            key={`wrapper-` + item._id}
            transition={{ type: 'spring' }}
        >
            <ItemCard
                mode="show"
                itemId={item._id}
                group={item.participationType === 'group' ? true : false}
                maxParticipants={
                    item.participationType === 'group' ? item.members.length : 0
                }
                key={item?._id}
                title={item.name}
                date={item.date}
                fee={Number(item.regFee)}
                image={item?.image || '/static/natya.jpg'}
                actionType="nonTogglable"
                action={() => removeItem(item._id)}
                selected={true}
                onClick={() => {
                    setSelectedindex(Number(item._id))
                    // setisFilled((state) => !state)
                }}
            />
        </motion.div>
    ))
    return (
        <>
            <h3 className="text-black ff-serif fw-400">Booking Summary</h3>
            <div className="form__eventsWrap form__summaryWrap grid">
                <AnimatePresence>
                    {bucket.length ? (
                        <motion.div
                            className="grid"
                            // exit={{ opacity: 0, scale: 0.8 }}
                            // initial={{ opacity: 0, scale: 0.8 }}
                            // animate={{ opacity: 1, scale: 1 }}
                        >
                            <div
                                className="form__eventsSummary grid"
                                data-filled={bucket.length && true}
                            >
                                <AnimatePresence mode="popLayout">
                                    {bucketItems}
                                </AnimatePresence>
                            </div>
                            <Button
                                type="internalUrl"
                                to="/checkout"
                                classNames="btn btn--link btn--save text-white ff-serif btn--checkout"
                            >
                                Checkout
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.p
                            className="bucket-no-item-fallback t-center ff-serif text-grey capitalize"
                            exit={{ opacity: 0 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {' '}
                            select some events{' '}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}
