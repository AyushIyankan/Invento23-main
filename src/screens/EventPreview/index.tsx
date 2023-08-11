import { useEffect } from 'react'
// import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import Button from '../../components/Button'
import useEventQuery from '../../hooks/useEventQuery'
import { transformDate, transformTime } from '../../utils'
import { NotFound } from '../NotFound'

function ScrollToTopOnMount() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return null
}

export default function EventPreview() {
    const { id = '232' } = useParams<{ id: string }>()

    const event = useEventQuery(id)

    if (event.error || !event.data?.event) return <NotFound />

    const {
        name,
        date,
        time,
        description,
        rules,
        photo: { secure_url },
        prizeMoney,
        isOnline,
        department,
        contactNameFirst,
        contactNameSecond,
        contactNumberFirst,
        contactNumberSecond,
    } = event.data.event

    const eventRules = rules.map((rule, i) => <li key={`${i}-${id}`}>{rule}</li>)
    const prizesWorth = Object.values(prizeMoney).reduce((acc, curr) => acc + curr, 0)

    return (
        <>
            <ScrollToTopOnMount />
            <section className="eventPreview">
                <div className="bg__container grid">
                    <div
                        className="bg--full bg--full--preview"
                        data-bg={secure_url}
                    ></div>

                    <p className="eventPreview__title ff-days-one fw-400 text-white uppercase ">
                        {name}
                    </p>
                </div>
                <div className="eventPreview__content panel--bg mh-full grid">
                    <div className="eventPreview__about text-white ff-serif centeredContainer side-padding flow">
                        <h4 className="fw-500 fs-650">About {name}</h4>
                        <p className="eventPreview__description">{description}</p>
                        <div className="flow">
                            <span className="d-b">Date: {transformDate(date)}</span>
                            <span className="d-b">Time: {transformTime(time)}</span>
                            <span className="d-b">
                                Prizes worth: {prizesWorth > 0 ? prizesWorth : 'TBA'}
                            </span>
                            <span className="d-b">
                                Mode: {isOnline ? 'Online' : 'Offline'}
                            </span>
                            <span className="d-b">
                                Hosted by: {department} department
                            </span>
                            <span className="d-b">
                                <h5 className="ff-days-one">Contacts: </h5>
                                <div className="flow contact-wrap">
                                    {contactNameFirst && contactNumberFirst && (
                                        <span className="d-b">
                                            {contactNameFirst} - {''}
                                            <a
                                                className="text-white text-decoration-none"
                                                href={`tel:${contactNumberFirst}`}
                                            >
                                                {contactNumberFirst}
                                            </a>
                                        </span>
                                    )}
                                    {contactNameSecond && contactNumberSecond && (
                                        <span className="d-b">
                                            {contactNameSecond} - {contactNumberSecond}
                                        </span>
                                    )}
                                </div>
                            </span>
                            <Button
                                type="internalUrl"
                                to={'/register'}
                                classNames={`text-magenta btn d-ib btn--link btn--register_event gradient-borders`}
                            >
                                register now
                            </Button>
                        </div>
                    </div>
                    <div className="eventPreview__rules text-white ff-serif centeredContainer side-padding">
                        <h4 className="fs-650 fw-500">Rules and Regulations</h4>
                        {rules.length === 0 ? (
                            <p>No rules found.</p>
                        ) : (
                            <ul className="flow">{eventRules}</ul>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}
