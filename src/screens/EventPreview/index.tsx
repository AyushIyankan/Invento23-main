import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

function ScrollToTopOnMount() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return null
}

export default function EventPreview() {
    return (
        <>
            <ScrollToTopOnMount />
            <section className="eventPreview">
                <div className="bg__container grid">
                    <div className="bg--full bg--full--preview"></div>

                    <p className="eventPreview__title ff-days-one fw-400 text-white uppercase ">
                        Natya
                    </p>
                </div>
                <div className="eventPreview__content panel--bg mh-full grid">
                    <div className="eventPreview__about text-white ff-serif centeredContainer side-padding flow">
                        <h4 className="fw-500 fs-650">About Natya</h4>
                        <p className="eventPreview__description">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                            Alias minima reiciendis vel quo dolore dolor in laboriosam et,
                            repellendus exercitationem quos quis fugit. Sunt error
                            delectus odit libero perferendis tenetur! Unde ratione,
                            possimus nobis maiores quia error illum sint sunt adipisci
                            quos autem, nisi iste quibusdam, in provident. Voluptates
                            voluptatem, quaerat temporibus nobis inventore labore earum
                            incidunt fugiat sit aspernatur?
                        </p>
                        <div className="flow">
                            <span className="d-b">Date: 22-06-2023</span>
                            <span className="d-b">Prizes worth: 10k</span>
                            <NavLink
                                to={'/register'}
                                className={`text-magenta btn d-ib btn--link btn--register_event`}
                            >
                                register now
                            </NavLink>
                        </div>
                    </div>
                    <div className="eventPreview__rules text-white ff-serif centeredContainer side-padding">
                        <h4 className="fs-650 fw-500">Rules and Regulations</h4>
                        <ul className="flow">
                            <li>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                Beatae, repudiandae!
                            </li>
                            <li>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                Beatae, repudiandae!
                            </li>
                            <li>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                Beatae, repudiandae!
                            </li>
                            <li>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                Beatae, repudiandae!
                            </li>
                            <li>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                Beatae, repudiandae!
                            </li>
                            <li>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                Beatae, repudiandae!
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}
