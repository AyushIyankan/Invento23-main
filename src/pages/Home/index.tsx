import Crowstealers from './Crowstealers'
import { Hero } from './Hero'
import { Rewind } from './Rewind'

export default function Home() {
    return (
        <>
            <Hero />
            <div className="flow main-wrapper grid">
                <Crowstealers />
            </div>
            <Rewind />
        </>
    )
}
