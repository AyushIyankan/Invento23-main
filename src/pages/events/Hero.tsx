import { ReactComponent as EventsText } from '../../assets/svg/eventstext.svg'
import { ReactComponent as InventoLogo } from '../../assets/svg/invento__logo-outline-full.svg'

export function Hero() {
    return (
        <div className="saptha__hero flex flex-col  pt-m-4-6">
            <div className="crumb-wrap flex">
                <p className="fw-900 ff-serif text-white">
                    invento / <span className="text-magenta">events</span>
                </p>
            </div>
            <div className="saptha__hero__heading__container grid">
                <h1 className="heading--main flex">
                    <span className="sr-only">saptha</span>
                    <EventsText className="heading--events" />
                </h1>
                <div className="saptha__hero__logo--container">
                    <InventoLogo className="hero__logo hero__logo--events" />
                </div>
            </div>
        </div>
    )
}
