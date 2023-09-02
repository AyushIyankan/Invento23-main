import { AnimatePresence, m } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import Button from '../../components/Button'
import { ItemCard } from '../../components/Card'
import { Item, useDetailStore } from '../../store'
import { formSchema } from './schema'

interface Props {
    bucket: Item[] | []
    onRemove: (id: string) => void
    onFinalProceed?: () => void
    // maybe think of a better way to do this
    mode?: 'collect' | 'show'
}

export function Summary({ bucket, onRemove, onFinalProceed, mode }: Props) {
    const { personalDetails } = useDetailStore((state) => state)
    const [, setSelectedindex] = useState(0)
    const navigate = useNavigate()

    const checkout = () => {
        const data = formSchema.safeParse(personalDetails)

        if (bucket.length === 0) {
            toast.error('Please select some events', {
                progressStyle: {
                    backgroundColor: 'tomato',
                },
            })
            return
        } else if (!data.success) {
            toast.error('Please enter your personal details correctly', {
                progressStyle: {
                    backgroundColor: 'tomato',
                },
            })
            return
        }
        navigate('/final')
    }

    let bucketItems = null

    if (bucket.length) {
        bucketItems = bucket.map((item) => (
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
                    mode={mode || 'show'}
                    itemId={item._id}
                    group={item.participationType === 'group' ? true : false}
                    maxParticipants={
                        item.participationType === 'group' && item?.members
                            ? item.members?.length
                            : 0
                    }
                    key={item?._id}
                    title={item.name}
                    date={item.date}
                    fee={Number(item.regFee)}
                    image={item?.image || '/static/natya.jpg'}
                    imgId={item.imageId || ''}
                    actionType="nonTogglable"
                    action={() => onRemove(item._id)}
                    selected={true}
                    onClick={() => {
                        setSelectedindex(Number(item._id))
                        // setisFilled((state) => !state)
                    }}
                    calcPriceMode={
                        item.name.toLowerCase() === 'natya' ||
                        item.name.toLowerCase() === 'taksati'
                            ? 'calcOnInput'
                            : 'normal'
                    }
                />
            </m.div>
        ))
    }
    return (
        <>
            <h3 className="text-black ff-serif fw-400">Booking Summary</h3>
            <div className="form__eventsWrap form__summaryWrap grid">
                {bucket.length ? (
                    <div className="grid">
                        <AnimatePresence mode="popLayout">{bucketItems}</AnimatePresence>
                        <Button
                            type="submit"
                            className="btn btn--link btn--save text-white ff-serif btn--checkout"
                            onClick={() => {
                                onFinalProceed && onFinalProceed()
                                checkout()
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
