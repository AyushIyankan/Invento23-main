import { ReactComponent as HeroLogo } from '../../assets/svg/saptha_bg.svg'
import { ReactComponent as SapthaText } from '../../assets/svg/sapthatext.svg'

export function Hero() {
    return (
        <div className="saptha__hero flex flex-col  pt-m-4-6">
            <div className="saptha_marquee">
                <div className="marquee">
                    <ul className="marquee__inner">
                        <li className="marquee__part">
                            Spot registrations start at 9:30 ·
                        </li>
                        <li className="marquee__part">
                            Spot registrations start at 9:30 ·
                        </li>
                        <li className="marquee__part">
                            Spot registrations start at 9:30 ·
                        </li>
                        <li className="marquee__part">
                            Spot registrations start at 9:30 ·
                        </li>
                        <li className="marquee__part">
                            Spot registrations start at 9:30 ·
                        </li>
                        <li className="marquee__part">
                            Spot registrations start at 9:30 ·
                        </li>
                        <li className="marquee__part">
                            Spot registrations start at 9:30 ·
                        </li>
                        <li className="marquee__part">
                            Spot registrations start at 9:30 ·
                        </li>
                        <li className="marquee__part">
                            Spot registrations start at 9:30 ·
                        </li>
                        <li className="marquee__part">
                            Spot registrations start at 9:30 ·
                        </li>
                    </ul>
                </div>
            </div>
            <div className="crumb-wrap flex">
                <p className="fw-900 ff-serif text-white invento-saptha">
                    invento / <span className="text-magenta">saptha</span>
                </p>
            </div>
            <div className="saptha__hero__heading__container grid">
                <h1 className="heading--main flex">
                    <span className="sr-only">saptha</span>
                    <SapthaText className="heading" />
                </h1>
                <div className="saptha__hero__logo--container">
                    <HeroLogo className="hero__logo hero__logo--saptha" />
                </div>
            </div>
        </div>
    )
}
