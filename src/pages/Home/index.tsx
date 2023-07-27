import Crowstealers from './Crowstealers'
import { Hero } from './Hero'
import { Rewind } from './Rewind'

export default function Home() {
    return (
        <>
            <div className="flow main-wrapper grid">
                <Hero />
                <Crowstealers />
            </div>
            <Rewind />
        </>
    )
}
