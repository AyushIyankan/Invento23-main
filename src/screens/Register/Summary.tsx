import { useState } from 'react'
import { animated, useTransition } from 'react-spring'

import Button from '../../components/Button'
import { ItemCard } from '../../components/Card'
import { useStore } from '../../store'
export function Summary() {
    const { items: bucket, removeItem } = useStore((state) => state)
    const [selectedindex, setSelectedindex] = useState(0)

    const transitions = useTransition(bucket, {
        from: { opacity: 0.3, y: '-100%' },
        enter: { opacity: 1, y: '0%' },
        leave: { opacity: 0, y: '100%' },
    })

    const bucketItems = transitions((style, item) => (
        <animated.div style={style}>
            <ItemCard
                key={item?.id}
                title="Item"
                date="22/03/22"
                fee={200}
                image={item?.image}
                actionType="nonTogglable"
                action={() => removeItem(item.id)}
                selected={true}
                onClick={() => setSelectedindex(Number(item.id))}
            />
        </animated.div>
    ))

    return (
        <>
            <h3 className="text-black ff-serif fw-400">Booking Summary</h3>
            <div className="form__eventsWrap form__summaryWrap grid">
                <div
                    className="form__eventsSummary grid"
                    data-filled={bucket.length && true}
                >
                    {bucketItems}
                </div>
                {bucket.length === 0 ? (
                    <p className="bucket-no-item-fallback t-center ff-serif text-grey capitalize">
                        {' '}
                        select some events{' '}
                    </p>
                ) : (
                    <Button
                        type="internalUrl"
                        to="/checkout"
                        classNames="btn btn--link btn--save text-white ff-serif btn--checkout"
                    >
                        Checkout
                    </Button>
                )}
            </div>
        </>
    )
}
