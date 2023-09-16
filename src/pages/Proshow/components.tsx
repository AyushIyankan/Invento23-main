import { AdvancedImage } from '@cloudinary/react'
import { Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { EventType } from '../../api/schema'
import { cld } from '../../App'
import Button from '../../components/Button'
import { formSchema } from '../../screens/Register/schema'
import { useDetailStore, useStore } from '../../store'
import { getCloudNameFromUrl, transformDate } from '../../utils'

type CardsProp = {
    events: EventType[]
}

export function EventsUI({ events }: CardsProp) {
    const { reset, items } = useStore()
    const { personalDetails } = useDetailStore()
    const navigate = useNavigate()

    useEffect(() => {
        reset()
    }, [])

    let totalAmount = 0

    items.forEach((item) => {
        totalAmount += (item.ticketBooked ?? 0) * (item.regFee ?? 0)
    })

    function proceedTopayment() {
        const parsedSchema = formSchema.safeParse(personalDetails)
        if (items.length > 0 && parsedSchema.success) {
            navigate('/final')
        } else if (items.length === 0) {
            toast('Please add tickets')
        } else {
            toast('Please enter your personal details')
        }
    }
    return (
        <Fragment>
            <h2 className="main-heading">Day Pass</h2>
            <div className="events">
                <h3 className="sub-heading">Single Day</h3>
                <div className="cards">
                    {events.map((event) => {
                        if (event.isAvailable) {
                            return <Card key={event._id} event={event} />
                        }
                        return null
                    })}
                </div>
                <div className="div-pay flex flex-col flex-center">
                    <p className="pay">Amount Payable: &#8377;{totalAmount}</p>
                    <Button
                        type="button"
                        // classNames="btn"
                        onClick={proceedTopayment}
                        className="pay-button ff-serif"
                    >
                        Proceed to payment
                    </Button>
                </div>
            </div>
        </Fragment>
    )
}

type CardProps = {
    event: EventType
}

function Card({ event }: CardProps) {
    const { addItem, removeItem, items, changeTicketCount } = useStore()
    const itemExists = items.find((e) => e._id === event._id)

    function insertItem() {
        if (itemExists) return
        addItem({
            _id: event?._id,
            name: event.name,
            participationType: 'solo',
            date: event.date,
            regFee: event.regFee || event.regFeeTeam,
            image: event.photo?.secure_url || '/static/natya.jpg',
            imageId: event.photo?.id,
            ticketBooked: 1,
            updatedPrice: event.regFee,
            type: event.eventType,
        })
    }

    function addTicket() {
        if (itemExists && itemExists.ticketBooked && itemExists.ticketBooked <= 9) {
            changeTicketCount(itemExists._id, itemExists.ticketBooked + 1)
        } else if (!itemExists) {
            insertItem()
        }
    }
    function decrTicket() {
        if (itemExists && itemExists.ticketBooked && itemExists.ticketBooked >= 2) {
            changeTicketCount(itemExists._id, itemExists.ticketBooked - 1)
        } else if (
            itemExists &&
            itemExists.ticketBooked &&
            itemExists.ticketBooked === 1
        ) {
            removeItem(itemExists._id)
        }
    }

    function addToCart() {
        if (itemExists?.ticketBooked && itemExists?.ticketBooked > 0) {
            removeItem(event._id)
        } else {
            insertItem()
        }
    }

    return (
        <div className="card">
            <div className="wrap-img">
                {/* <img src={event.photo?.secure_url} alt={event.name} /> */}
                <AdvancedImage
                    cldImg={cld
                        .setConfig({
                            cloud: {
                                cloudName:
                                    getCloudNameFromUrl(event.photo?.secure_url || '') ??
                                    'inventov23',
                            },
                        })
                        .image(event.photo?.id || '')
                        .quality('auto')
                        .format('auto')}
                />
            </div>
            <div className="heading">
                <h4
                    style={{
                        fontWeight: 'bold',
                    }}
                >
                    {event.name}
                </h4>
            </div>
            <div className="fee">
                <p>
                    Offer price: {event.regFee} <span className="discount">599</span>
                </p>
            </div>
            <div className="date">
                <p>
                    Date:{' '}
                    {event.name.toLowerCase() === 'combo'
                        ? '15/09/2023, 16/09/2023'
                        : transformDate(event.date)}
                </p>
            </div>
            <div className="ticket">
                <p>No. of Tickets:</p>
                <div>
                    <Button type="button" className="btn btn--toggle" onClick={addTicket}>
                        +
                    </Button>
                    <div>
                        <p>{itemExists?.ticketBooked ?? 0}</p>
                    </div>
                    <Button
                        type="button"
                        className="btn btn--toggle"
                        onClick={decrTicket}
                    >
                        -
                    </Button>
                </div>
            </div>
            <div className="add">
                <Button type="button" className="btn btn--toggle" onClick={addToCart}>
                    {itemExists ? <DeleteSvg /> : '+'}
                </Button>
            </div>
        </div>
    )
}

function DeleteSvg() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="mdi:delete">
                <path
                    id="Vector"
                    d="M15.8332 3.33333H12.9165L12.0832 2.5H7.9165L7.08317 3.33333H4.1665V5H15.8332M4.99984 15.8333C4.99984 16.2754 5.17543 16.6993 5.48799 17.0118C5.80055 17.3244 6.22448 17.5 6.6665 17.5H13.3332C13.7752 17.5 14.1991 17.3244 14.5117 17.0118C14.8242 16.6993 14.9998 16.2754 14.9998 15.8333V5.83333H4.99984V15.8333Z"
                    fill="#353535"
                />
            </g>
        </svg>
    )
}
