import Button from '../../components/Button'
import { ItemCard } from '../../components/Card'

interface ISummaryProps<T> {
    bucket: T[]
}

export function Summary<T extends { id: string; image: string }>({
    bucket,
}: ISummaryProps<T>) {
    const bucketItems = bucket.map((item) => {
        return (
            <ItemCard
                key={item?.id}
                title="Item"
                date="22/03/22"
                fee={200}
                image={item?.image}
                actionType="nonTogglable"
            />
        )
    })

    return (
        <>
            <h3 className="text-black ff-serif fw-400">Booking Summary</h3>
            <div className="form__eventsWrap grid">
                <div>{bucketItems}</div>
                <Button
                    type="internalUrl"
                    to="/checkout"
                    classNames="btn btn--link btn--save text-white ff-serif btn--checkout"
                >
                    Checkout
                </Button>
            </div>
        </>
    )
}
