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
                <h3 className="fs-650 fw-400">About Saptha</h3>
                <p>
                    A captivating cultural extravaganza with a blend of art from across
                    the nation. Presenting performances from professional communities
                    across the state. An assortment of intriguing events held in venues
                    across our campus, is something to cater to all tastes. Saptha
                    promises to be an exhilarating experience leaving you elated from
                    beginning to end.
                </p>
            </div>
        </section>
    )
}
