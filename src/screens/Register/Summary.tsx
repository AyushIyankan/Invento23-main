import { AnimatePresence, m } from 'framer-motion'
import { useState } from 'react'

import Button from '../../components/Button'
import { ItemCard } from '../../components/Card'
import { useStore } from '../../store'
export function Summary() {
    const { items: bucket, removeItem } = useStore((state) => state)
    const [selectedindex, setSelectedindex] = useState(0)

    const bucketItems = bucket.map((item) => (
        <m.div
            key={`wrapper-` + item._id}
            initial={{ scale: 0 }}
            animate={{
                scale: 1,
                transition: {
                    // delay: 0.2,
                    type: 'spring',
                },
            }}
            exit={{
                // scale: 0,
                opacity: 0,
                transition: {
                    type: 'spring',
                    // duration: 0.9,
                },
            }}
            layout
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
        </m.div>
    ))
    return (
        <>
            <h3 className="text-black ff-serif fw-400">Booking Summary</h3>
            <div className="form__eventsWrap form__summaryWrap grid">
                {/* <AnimatePresence mode="sync"> */}
                {bucket.length ? (
                    <div className="grid">
                        <AnimatePresence mode="popLayout">{bucketItems}</AnimatePresence>
                        <Button
                            type="internalUrl"
                            to="/final"
                            classNames="btn btn--link btn--save text-white ff-serif btn--checkout"
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
                {/* </AnimatePresence> */}
            </div>
        </>
    )
}
