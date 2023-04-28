import { ReactComponent as HeroLogo } from '../../assets/svg/saptha_bg.svg'

export function Hero() {
    return (
        <div className="saptha__hero flex flex-col">
            <div className="crumb-wrap flex">
                <p className="fw-900 ff-serif text-white">
                    invento / <span className="text-magenta">events</span>
                </p>
            </div>
            <div className="saptha__hero__heading__container grid">
                <h1 className="heading--main flex">
                    <span className="sr-only">events</span>
                </h1>
                <div className="saptha__hero__logo--container">
                    <HeroLogo className="saptha__hero__logo" />
                </div>
            </div>
        </div>
    )
}
