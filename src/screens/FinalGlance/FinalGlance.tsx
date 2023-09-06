import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import Button from '../../components/Button'
import { ItemCard } from '../../components/Card'
import GenericTable from '../../components/GenericTable'
import { ImgWithFallback } from '../../components/ImgWithFallback'
import Picker from '../../components/Picker'
import { useDetailStore, useStore } from '../../store'
import { usePickerStore } from '../../store'
import { dataUrlToFile } from '../../utils'
export default function FinalGlance() {
    const { items, removeItem } = useStore((store) => store)
    const { personalDetails } = useDetailStore((store) => store)
    const { name, email, phone, college, referral = '' } = personalDetails
    const navigate = useNavigate()
    const [, setSelectedindex] = useState(0)
    const { reset } = useStore((store) => store)
    const { pickerState } = usePickerStore((store) => store)
    const [error] = useState('')

    const [price] = useState(() => {
        return items.reduce((acc, item) => {
            return acc + Number(item.updatedPrice ?? Number(item.regFee))
        }, 0)
    })

    const [hasGroupEvents] = useState(() => {
        return items.some((item) => item.participationType === 'group')
    })

    // useEffect(() => {
    //     if (verificationShot) {
    //         setError('')
    //     } else {
    //         setError('Please upload the payment proof')
    //     }
    // }, [verificationShot, error])

    const groupMembersByEvent = items.reduce((acc, item) => {
        if (item.participationType === 'group' && item?.members) {
            acc.push({
                eventName: item.name,
                members: item.members.filter((member) => member !== ''),
            })
        }
        return acc
    }, [] as { eventName: string; members: string[] }[])

    async function handleSubmit() {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('phone', phone)
        if (referral) formData.append('referalCode', referral)
        if (college) formData.append('college', college)
        // formData.append('referral', referral)

        formData.append('totalAmount', String(price))

        let participants: string[] = []
        const orderEvents = items.map((item) => {
            if (item.participationType === 'group' && item?.members) {
                participants = [...item.members]
            }
            return {
                event: item._id,
                participants: participants,
            }
        })

        formData.append('orderEvents', JSON.stringify(orderEvents))
        const verificationImg = localStorage.getItem('verificationShot')

        if (verificationImg) {
            const file = await dataUrlToFile(verificationImg, `${name}-verificationShot`)
            // console.log(file)
            formData.append('paymentProof', file, file.name)
            localStorage.removeItem('verificationShot')
        }

        // console.log(formData)

        navigate('/status?state=submitting')

        const res = await fetch(import.meta.env.VITE_API_BASE_URL + 'order/create', {
            method: 'POST',
            body: formData,
        })

        if (!res.ok) {
            toast.error('Something went wrong')
            navigate('/status?state=error', { state: { error: 'Internal Server Error' } })
            return
        }

        const data = await res.json()

        if (data.success) {
            // debugger
            toast.success('Order placed successfully')
            reset()
            localStorage.removeItem('verificationShot')
            navigate('/status?state=success')
        } else {
            // debugger
            toast.error('Something went wrong')
            navigate('/status?state=error', { state: { error: data?.message } })
        }
    }

    return (
        <div className="formParentWrap centeredContainer flow side-padding light-scheme mh-full checkout_main final_main">
            <div>
                <p className="text-black ff-serif pt-sm text-review final_text">
                    Please review your details and selected events below before proceeding
                    to submission.
                </p>
                <h2 className="FormHeading text-black fw-400 ff-serif">
                    Personal Information
                </h2>
                <div className="FormWrap bg-white checkout__personalWrap text-black ff-serif flow">
                    <h3 className="capitalize">{name}</h3>
                    <p>{college}</p>
                    <p>{email}</p>
                    <p>{phone}</p>
                    {referral && <p>Referall Id: {referral}</p>}
                </div>
            </div>
            <div className="">
                <h3 className="text-black ff-serif fw-400">Selected events</h3>
            </div>
            <div className="form__eventsWrap bg-white flow grid">
                {items.map((item, i) => (
                    <div
                        key={item._id + i}
                        className="wrap-itemCard_final"
                        style={{
                            backgroundColor: '#f5f5f5',
                            borderRadius: 'inherit',
                            marginBottom: '10px',
                        }}
                    >
                        <ItemCard
                            mode="show"
                            itemId={item._id}
                            imgId={item.imageId}
                            group={item.participationType === 'group' ? true : false}
                            maxParticipants={
                                item.participationType === 'group' && item?.members
                                    ? item.members.length
                                    : 0
                            }
                            key={item?._id}
                            title={item.name}
                            date={item.date}
                            renderPriceSlot={() => (
                                <p className="text-black ff-serif">
                                    &#8377;{item.updatedPrice ?? Number(item.regFee)}
                                </p>
                            )}
                            fee={item.updatedPrice ?? Number(item.regFee)}
                            image={item?.image || '/static/natya.jpg'}
                            actionType="nonTogglable"
                            action={() => removeItem(item._id)}
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
                    </div>
                ))}
            </div>
            {hasGroupEvents && (
                <div className="group-members-view text-black">
                    <h3 className="ff-serif fw-400">Review the Group members by event</h3>
                    <div className="form__eventsWrap bg-white flow">
                        <GenericTable
                            data={groupMembersByEvent}
                            columns={[
                                {
                                    key: 'eventName',
                                    header: 'Event Name',
                                },
                                { key: 'members', header: 'Members' },
                            ]}
                        />
                    </div>
                </div>
            )}
            <div className="text-black ff-serif">
                {price > 0 && <h3 className="text-black ff-serif fw-400">Payment</h3>}
            </div>

            <div className="form__eventsWrap bg-white flow grid">
                {price > 0 && (
                    <div className="text-black ff-serif flow">
                        <p>
                            Please pay the total amount of <strong>&#8377;{price}</strong>{' '}
                            to the following UPI address and upload the screenshot of the
                            payment in this step.
                        </p>
                        <p>
                            <span
                                className="ff-serif text-black d-b"
                                style={{ marginBottom: '1rem' }}
                            >
                                click the id below to open the upi app or scan the qr code
                                to make the payment
                            </span>
                            <strong>UPI ID: </strong>
                            <Button
                                type="externalUrl"
                                className="btn text-black "
                                href="upi://pay?pa=9048538487@jupiteraxis&pn=Azrin Raj&cu=INR"
                                onClick={() => toast.info(`Opened the UPI app`)}
                                style={{
                                    textTransform: 'none',
                                }}
                            >
                                9048538487@jupiteraxis
                            </Button>
                        </p>
                        <div className="final_qr flex flex-col flex-center">
                            <p>
                                <strong>QR Code: </strong>
                            </p>
                            <ImgWithFallback
                                src="/static/inv_qr.jpg"
                                imgDescription="qr to make the payment"
                            />
                        </div>
                        <Picker />
                    </div>
                )}
                <div className="checkout_btn_wrap flex flex-col">
                    <Button
                        type="button"
                        className="btn btn--go-back ff-serif"
                        onClick={() => navigate(-1)}
                        style={{
                            textTransform: 'capitalize',
                        }}
                    >
                        Go Back
                    </Button>
                    <Button
                        type="button"
                        className="btn btn--checkout ff-serif"
                        style={{
                            textTransform: 'none',
                        }}
                        disabled={price > 0 && !pickerState.filled}
                        onClick={() => handleSubmit()}
                    >
                        Submit
                    </Button>
                    {price > 0 &&
                        (error.length > 0 ||
                            (!pickerState.filled && (
                                <p className="text-red text-sm">
                                    Please upload the payment proof
                                </p>
                            )))}
                </div>
            </div>
        </div>
    )
}
