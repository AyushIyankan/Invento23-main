import Crowstealers from './Crowstealers'
import { Hero } from './Hero'
import { Rewind } from './Rewind'

export default function Home() {
    return (
        <div className="main-wrapper grid flow">
            <Hero />
            <Crowstealers />
            <Rewind />
        </div>
    )
}
