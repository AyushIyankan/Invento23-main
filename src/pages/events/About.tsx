import { ReactComponent as SapthaLogo } from '../../assets/svg/saptha_bg.svg'

export function About() {
    return (
        <section
            className="saptha__about ff-serif fw-400 grid text-white
        grid-2-col
        "
        >
            <SapthaLogo className="saptha__logo" />
            <div className="saptha__about__text">
                <h3 className="fs-650 fw-400">About our events</h3>
                <p>
                    Our tech events are designed to ignite your curiosity, elevate your
                    skills, and connect you with the forefront of technological
                    advancements. Join us at our Tech Fest and be a part of an
                    electrifying atmosphere where innovation knows no bounds. Whether
                    you&apos;re a tech wizard, a curious learner, or simply someone
                    intrigued by the digital era, our tech events have something
                    spectacular in store for you. Get ready to unravel the future!
                </p>
            </div>
        </section>
    )
}
