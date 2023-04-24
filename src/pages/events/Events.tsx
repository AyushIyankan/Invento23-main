import { About } from './About'
import { Competitions } from './Competitions'
import { Expo } from './Expo'
import { GeneralEvents } from './GeneralEvents'
import { Hero } from './Hero'
import { PreEvents } from './PreEvents'
import { WorkShops } from './Workshops'

export default function Events() {
    return (
        <>
            <div className="bg--container">
                <div className="bg--full--saptha"></div>
            </div>
            <Hero />
            <About />
            <WorkShops />
            <Competitions />
            <Expo />
            <PreEvents />
            <GeneralEvents />
        </>
    )
}
