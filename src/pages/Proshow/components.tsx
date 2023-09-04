import { Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { EventType } from '../../api/schema'
import { formSchema } from '../../screens/Register/schema'
import { useDetailStore, useStore } from '../../store'

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
    const combination = events.find((e) => e._id === '64f5cce00c2af52411604550')
    return (
        <Fragment>
            <h2 className="main-heading">Day Pass</h2>
            <div className="events">
                <h3 className="sub-heading">Single Day</h3>
                <div className="cards">
                    {events.map((event) => {
                        if (event !== combination) {
                            return <Card key={event._id} event={event} />
                        }
                        return null
                    })}
                </div>
                <h3 className="sub-heading">Combo pass</h3>
                {combination && (
                    <div className="cards">
                        <Card event={combination} />
                    </div>
                )}
                <div className="div-pay">
                    <p className="pay">Amount Payable: {totalAmount} Rs</p>
                    <button onClick={proceedTopayment} className="pay-button">
                        Proceed to payment
                    </button>
                </div>
            </div>
        </Fragment>
    )
}

type CardProps = {
    event: EventType
}

function Card({ event }: CardProps) {
    const formattedDate = new Date(event.date).toLocaleDateString()

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
            <img src={event.photo?.secure_url} alt={event.name} />
            <div className="heading">
                <h4>{event.name}</h4>
            </div>
            <div className="fee">
                <p>Registration Fee: {event.regFee}</p>
            </div>
            <div className="date">
                <p>Date: {formattedDate}</p>
            </div>
            <div className="ticket">
                <p>No. of Tickets:</p>
                <div>
                    <button onClick={decrTicket}>-</button>
                    <div>
                        <p>{itemExists?.ticketBooked ?? 0}</p>
                    </div>
                    <button onClick={addTicket}>+</button>
                </div>
            </div>
            <div className="add">
                <button onClick={addToCart}>{itemExists ? <DeleteSvg /> : '+'}</button>
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
