import Placeholder from '../../assets/images/card_placeholder.jpg'
import { ProfileCard } from '../../components/Card'

export function AboutUs() {
    return (
        <div className="wrap-aboutUs mh-full">
            <section className="aboutUs">
                <h3 className="ff-serif fw-500 text-white striked-heading">The team</h3>
                <p className="text-white ff-serif fw-400">
                    Meet our team of creators, designers, and world-class problem solvers
                </p>

                <div className="cards grid">
                    <ProfileCard
                        designation="Head of ops"
                        imageUrl={Placeholder}
                        name="John Doe"
                    />

                    <ProfileCard
                        designation="Head of ops"
                        imageUrl={Placeholder}
                        name="John Doe"
                    />
                    <ProfileCard
                        designation="Head of ops"
                        imageUrl={Placeholder}
                        name="John Doe"
                    />
                    <ProfileCard
                        designation="Head of ops"
                        imageUrl={Placeholder}
                        name="John Doe"
                    />
                    <ProfileCard
                        designation="Head of ops"
                        imageUrl={Placeholder}
                        name="John Doe"
                    />
                    <ProfileCard
                        designation="Head of ops"
                        imageUrl={Placeholder}
                        name="John Doe"
                    />
                    <ProfileCard
                        designation="Head of ops"
                        imageUrl={Placeholder}
                        name="John Doe"
                    />
                    <ProfileCard
                        designation="Head of ops"
                        imageUrl={Placeholder}
                        name="John Doe"
                    />
                    <ProfileCard
                        designation="Head of ops"
                        imageUrl={Placeholder}
                        name="John Doe"
                    />
                    <ProfileCard
                        designation="Head of ops"
                        imageUrl={Placeholder}
                        name="John Doe"
                    />
                </div>
            </section>
        </div>
    )
}
