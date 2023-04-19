import { ReactComponent as HeroLogo } from '../../assets/svg/saptha_bg.svg'

export function Hero() {
    return (
        <div className="hero flex flex-col">
            <div className="crumb-wrap flex">
                <p className="fw-900 ff-serif text-white">
                    invento / <span className="text-magenta">saptha</span>
                </p>
            </div>
            <div className="hero__heading__container grid">
                <h1 className="heading--main uppercase fw-400 fs-900 ff-days-one text-white">
                    saptha
                </h1>
                <div className="hero__logo--container">
                    <HeroLogo className="hero__logo" />
                </div>
            </div>
        </div>
    )
}
