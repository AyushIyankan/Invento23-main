import { About } from './About'
import { GroupEvents } from './GroupEvents'
import { Hero } from './Hero'
import { Spotlight } from './spotlight'

export default function Saptha() {
    return (
        <>
            {' '}
            <div className="bg--container">
                {/* <div className="bg--box"></div> */}
                <div className="bg--full--saptha"></div>
                {/* <div className="bg--box"></div> */}
            </div>
            <Hero />
            <About />
            <Spotlight />
            <GroupEvents />
        </>
    )
}
