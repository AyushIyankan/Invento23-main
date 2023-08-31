import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { ReactComponent as InventoLogo } from '../assets/svg/invento__logo-outline-full.svg'
import Button from '../components/Button'

export default function Status() {
    const [searchParams] = useSearchParams()

    const status = searchParams.get('state')
    const navigate = useNavigate()

    useEffect(() => {
        if (status === 'success' || status === 'error') {
            setTimeout(() => {
                navigate('/')
            }, 4000)
        }
    }, [status])

    const success = (
        <div className="status--success flow ff-serif">
            <h1 className="status__title ff-serif fw-400">Registration Successful</h1>
            <p>
                Yayy! !!! 🎉🎉. <br /> You are now registered for Invento&apos;23
                <br /> You will receive an email shortly with your registration.
            </p>
            <p>Hold on while we redirect you to the home page &lt;3</p>
        </div>
    )

    const error = (
        <div className="status--success flow ff-serif">
            <h1 className="status__title ff-serif fw-400">Error</h1>
            <p>
                oops! something went wrong :&#40;
                <br /> Please try again later.
            </p>
            <p>Hold on while we redirect you to the home page &lt;3</p>
            <div className="wrap-buttons flex flex-center">
                <Button
                    to="/"
                    type="internalUrl"
                    classNames="btn btn--go-back text-black"
                >
                    Go Home
                </Button>
            </div>
        </div>
    )

    const failure = (
        <div className="status--success flow ff-serif">
            <h1 className="status__title ff-serif fw-400">Payment Failure</h1>
            <p>
                oops! something went wrong with your payment :&#40;
                <br /> Don’t worry, if your account is debited, it’ll come back in 1-2
                days.
            </p>
            <p>Hold on while we redirect you to the home page &lt;3</p>
            <div className="wrap-buttons flex flex-center">
                <Button
                    to="/"
                    type="internalUrl"
                    classNames="btn btn--go-back text-black"
                >
                    Go Home
                </Button>
                <Button
                    to="/checkout"
                    type="internalUrl"
                    classNames="btn btn--go-back text-black"
                >
                    Try Again
                </Button>
            </div>
        </div>
    )

    const submitting = (
        <div className="status--success flow ff-serif">
            <h1 className="status__title ff-serif fw-400 flex flex-center">
                Submitting <div className="dot-elastic"></div>
            </h1>
            <p>Hang on while we submit your registration details.</p>
        </div>
    )
    return (
        <section className="status__main bg-white text-black side-padding grid">
            <div className="centeredContainer wrapper grid">
                <InventoLogo className="status__logo" />
                {status === 'success' && success}
                {status === 'failure' && failure}
                {status === 'submitting' && submitting}
                {status === 'error' && error}
            </div>
        </section>
    )
}
