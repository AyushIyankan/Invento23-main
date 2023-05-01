import { NavLink } from 'react-router-dom'

import Nathya from '../../assets/images/compressed/natya_large.jpg'
import Card from '../../components/Card'

export default function EventPreview() {
    return (
        <section className="eventPreview">
            <Card className="card__lg" title="Natya" bgUrl={Nathya} />
            <div
                className="eventPreview__about text-white ff-serif
            "
            >
                <h4 className="fw-500">About Natya</h4>
                <p className="eventPreview__description">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias minima
                    reiciendis vel quo dolore dolor in laboriosam et, repellendus
                    exercitationem quos quis fugit. Sunt error delectus odit libero
                    perferendis tenetur! Unde ratione, possimus nobis maiores quia error
                    illum sint sunt adipisci quos autem, nisi iste quibusdam, in
                    provident. Voluptates voluptatem, quaerat temporibus nobis inventore
                    labore earum incidunt fugiat sit aspernatur?
                </p>
                <div>
                    <span className="d-b">Date: 22-06-2023</span>
                    <span className="d-b">Prizes worth: 10k</span>
                </div>
                <NavLink to={'/register'} className={`btn btn--link btn--register_event`}>
                    register now
                </NavLink>
            </div>
            <div className="eventPreview__rules text-white ff-serif"></div>
        </section>
    )
}
