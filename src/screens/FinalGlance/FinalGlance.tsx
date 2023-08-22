import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

import Button from '../../components/Button'
import { ItemCard } from '../../components/Card'
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
    const [selectedindex, setSelectedindex] = useState(0)

    const { pickerState, setPickerState } = usePickerStore((store) => store)
    const [error, setError] = useState('')

    const [price] = useState(() => {
        return items.reduce((acc, item) => acc + Number(item.regFee), 0)
    })

    // useEffect(() => {
    //     if (verificationShot) {
    //         setError('')
    //     } else {
    //         setError('Please upload the payment proof')
    //     }
    // }, [verificationShot, error])

    async function handleSubmit() {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('phone', phone)
        if (referral) formData.append('referalCode', referral)
        if (college) formData.append('college', college)
        // formData.append('referral', referral)

        formData.append('totalAmount', String(price))

        const orderEvents = items.map((item) => {
            let participants: string[] = []
            if (item.participationType === 'group') {
                participants = item.members.reduce<string[]>((acc, member, ndx) => {
                    return [...acc, member[`member-${ndx + 1}`]]
                }, [])
            }

            return {
                event: item._id,
                participants: item.participationType === 'group' ? participants : [],
            }
        })

        formData.append('orderEvents', JSON.stringify(orderEvents))
        const verificationImg = localStorage.getItem('verificationShot')

        if (verificationImg) {
            const file = await dataUrlToFile(verificationImg, `${name}-verificationShot`)
            console.log(file)
            formData.append('paymentProof', file, file.name)
            localStorage.removeItem('verificationShot')
        }

        console.log(formData)

        navigate('/status?state=submitting')

        const res = await fetch(import.meta.env.VITE_API_BASE_URL + 'order/create', {
            method: 'POST',
            body: formData,
        })

        const data = await res.json()

        if (data.success) {
            toast.success('Order placed successfully')
            navigate('/status?state=success')
        }
    }

    return (
        <div className="formParentWrap centeredContainer flow side-padding light-scheme mh-full checkout_main">
            <div>
                <p className="text-black ff-serif pt-sm text-review">
                    Please check the details below and click on submit to complete your
                    registration
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
                {items.map((item) => (
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
                ))}
            </div>
            <div className="text-black ff-serif">
                <h3 className="text-black ff-serif fw-400">Payment</h3>
            </div>

            <div className="form__eventsWrap bg-white flow grid">
                <div className="text-black ff-serif flow">
                    <p>
                        Please pay the total amount of <strong>&#8377;{price}</strong> to
                        the following UPI address and upload the screenshot of the payment
                        in this step.
                    </p>
                    <p>
                        <strong>UPI ID: </strong>
                        <Button
                            type="externalUrl"
                            className="btn text-black"
                            href="upi://pay?pa=917025150086@federal&pn=MUHAMMED RASHID PJ&cu=INR"
                            onClick={() => toast.info(`Opened the UPI app`)}
                        >
                            917025150086@federal
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
                        disabled={!pickerState.filled}
                        onClick={() => handleSubmit()}
                    >
                        Submit
                    </Button>
                    {error.length > 0 ||
                        (!pickerState.filled && (
                            <p className="text-red text-sm">
                                Please upload the payment proof
                            </p>
                        ))}
                </div>
            </div>
        </div>
    )
}
